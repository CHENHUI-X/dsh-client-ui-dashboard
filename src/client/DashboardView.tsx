/**
 * The dashboard view: one `conversation.view` tab entry that renders live
 * metrics of the current session. Reads everything through the framework
 * standard kit (`useSession` + `useProjection`) so it updates in real time as
 * session events land, with no host round-trips of its own.
 *
 * Request navigation uses the host openView callback and an exact tool-call address.
 */
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "@deepseek-ai/dsh-client-ui-primitives";
import type { ConversationNode, RunningToolCall } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale, ViewRuntimeKit } from "./compat";
import type { NS } from "./locales";
import { deriveMetrics } from "./metrics";
import type { DashboardMetrics, RequestDetail, RequestSample } from "./metrics";
import { DashboardIcon } from "./icons";
import { CHART_COLORS } from "./dashboard.css";
import { HudStrip, useHudData } from "./HudStrip";
import { BoardBody } from "./BoardView";
import type { BoardNavigation } from "./BoardView";
import { subagentEntriesOf } from "./board";
import type { SubagentEntryLike } from "./board";
import {
  AreaChart,
  HorizontalBars,
  ModelTimeline,
  RadialGauge,
  SeriesBars,
  StackedBar,
  compactNumber,
  exactNumber,
  formatMs,
  modelColor
} from "./charts";
import type { ChartDatum, RowDatum, SeriesDatum } from "./charts";

/**
 * 看板滚动记忆：按会话（sessionId）记录看板内部滚动容器的 scrollTop。
 * 仅存于页面生命周期（模块级内存 Map）——刷新页面即清空，因此重启
 * dsh 后端后看板默认从顶部开始；只有手动滚动才会写入，程序性恢复不回写。
 */
const scrollMemory = new Map<string, number>();

/** Stable empty fallbacks while the chat target has not published yet. */
const EMPTY_NODES: readonly ConversationNode[] = [];
const EMPTY_TURN_TIMINGS: ReadonlyMap<number, { readonly startTime: number; readonly endTime?: number }> = new Map();
const EMPTY_RUNNING_CALLS: readonly RunningToolCall[] = [];

export type DashboardViewProps = ViewRuntimeKit & PropsLocale<typeof NS> & BoardNavigation;

const STREAM_MAX_CHARS = 100;

type StreamingBlockLike = {
  text?: unknown;
  kind?: unknown;
  type?: unknown;
  name?: unknown;
  argsRaw?: unknown;
  block?: unknown;
};

type StreamingItem = {
  kind: "text" | "reasoning" | "tool-call" | "other";
  text: string;
  name?: string;
};

function gatherStreamFragments(input: unknown, out: StreamingItem[]): void {
  if (input === null || input === undefined) return;
  if (typeof input === "string") {
    out.push({ kind: "text", text: input });
    return;
  }
  if (typeof input !== "object") return;

  if (Array.isArray(input)) {
    for (const item of input) gatherStreamFragments(item, out);
    return;
  }

  const item = input as StreamingBlockLike & { blocks?: unknown[]; content?: unknown; contentBlocks?: unknown; output?: unknown; reason?: unknown };

  if (typeof item.text === "string") {
    const value = item.text as string;
    const kind = item.kind ?? item.type;
    if (kind === "reasoning") {
      out.push({ kind: "reasoning", text: value });
    } else if (kind === "tool-call") {
      out.push({ kind: "tool-call", text: value, name: typeof item.name === "string" ? item.name : undefined });
    } else {
      out.push({ kind: "text", text: value });
    }
    return;
  }

  const kind = item.kind ?? item.type;
  if (kind === "tool-call" && (typeof item.argsRaw === "string" || typeof item.name === "string")) {
    out.push({
      kind: "tool-call",
      text: typeof item.argsRaw === "string" ? item.argsRaw : "",
      name: typeof item.name === "string" ? item.name : undefined
    });
    return;
  }

  if (kind === "other" && item.block !== undefined) {
    let detail: string | undefined;
    if (typeof item.block === "string") {
      detail = item.block;
    } else {
      try {
        detail = JSON.stringify(item.block);
      } catch {
        detail = "[unserializable block]";
      }
    }
    if (detail !== undefined) out.push({ kind: "other", text: detail });
    return;
  }

  if (Array.isArray(item.blocks)) {
    gatherStreamFragments(item.blocks, out);
  }
  if (item.content !== undefined) {
    gatherStreamFragments(item.content, out);
  }
  if (item.contentBlocks !== undefined) {
    gatherStreamFragments(item.contentBlocks, out);
  }
  if (item.output !== undefined) {
    gatherStreamFragments(item.output, out);
  }
  if (item.reason !== undefined) {
    gatherStreamFragments(item.reason, out);
  }
}

function normalizeStreamText(input: string): string {
  return input.replace(/\r\n/g, "\n");
}

function compactStreamLine(input: string, maxChars: number): string {
  const normalized = normalizeStreamText(input).replace(/\s+/g, " ").trim();
  if (normalized.length === 0) return "";
  const chars = Array.from(normalized);
  if (chars.length <= maxChars) return normalized;
  return `${chars.slice(0, Math.max(1, maxChars - 1)).join("")}…`;
}

function currentStreamingItem(stream: readonly StreamingItem[]): StreamingItem | null {
  for (let i = stream.length - 1; i >= 0; i -= 1) {
    const item = stream[i];
    if (item !== undefined && (item.kind === "tool-call" || item.text.trim().length > 0)) return item;
  }
  return stream.at(-1) ?? null;
}

function extractStreamingBlocks(partial: unknown): StreamingItem[] {
  const blocks = (() => {
    if (partial === null || typeof partial !== "object") return [];
    if (Array.isArray((partial as { blocks?: unknown }).blocks)) return (partial as { blocks: unknown[] }).blocks;
    return [partial];
  })();

  const stream: StreamingItem[] = [];
  gatherStreamFragments(blocks, stream);
  return stream;
}

function summarizeStreamChars(stream: readonly StreamingItem[]): { text: number; reasoning: number } {
  let text = 0;
  let reasoning = 0;

  for (const item of stream) {
    if (item.kind === "reasoning") reasoning += item.text.length;
    else if (item.kind === "text") text += item.text.length;
  }

  return { text, reasoning };
}

/** Small "?" anchor that explains a metric on hover. */
function Hint(props: { label: string }): JSX.Element {
  return (
    <Tooltip label={props.label} side="top" delayMs={450} maxWidth={260}>
      <span className="dshd-hint" role="button" tabIndex={0} aria-label={props.label}>?</span>
    </Tooltip>
  );
}

/** Adaptive USD formatting: fewer decimals for larger amounts, never "$0.0000". */
function fmtCost(v: number | null): string {
  if (v === null) return "—";
  if (v <= 0) return "$0";
  if (v >= 1) return `$${v.toFixed(2)}`;
  // Only collapse to "<$0.0001" when the value truly rounds to zero at 4
  // decimals; anything ≥ $0.00005 keeps its exact figure (a $0.0099 request
  // must not read as "<$0.0001").
  if (v < 0.00005) return "<$0.0001";
  return `$${v.toFixed(4)}`;
}

/** Expand/collapse chevron (SVG, rotates 90° when open). */
function ChevronIcon(props: { open: boolean }): JSX.Element {
  return (
    <svg
      className="dshd-chevronSvg"
      data-open={props.open || undefined}
      viewBox="0 0 16 16"
      width="10"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Inline warning triangle (replaces the ⚠ emoji — semantic color via CSS). */
function WarnIcon(): JSX.Element {
  return (
    <svg className="dshd-warnIcon" viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" focusable="false">
      <path d="M8 2.4 14.3 13.4H1.7z" fill="currentColor" />
      <rect x="7.15" y="6.2" width="1.7" height="3.4" rx=".85" fill="var(--dsw-alias-bg-base)" />
      <circle cx="8" cy="11.3" r="1" fill="var(--dsw-alias-bg-base)" />
    </svg>
  );
}

function StatCard(props: {
  label: string;
  value: string;
  sub?: string;
  hint?: string;
  tone?: "accent" | "good" | "warn" | "bad" | "reasoning";
}): JSX.Element {
  const { label, value, sub, hint, tone } = props;
  return (
    <div className="dshd-stat">
      <div className="dshd-statLabel">
        {label}
        {hint !== undefined ? <Hint label={hint} /> : null}
      </div>
      <div
        className="dshd-statValue"
        data-accent={tone === "accent" ? true : undefined}
        data-good={tone === "good" ? true : undefined}
        data-warn={tone === "warn" ? true : undefined}
        data-bad={tone === "bad" ? true : undefined}
        data-reasoning={tone === "reasoning" ? true : undefined}
      >
        {value}
      </div>
      {sub !== undefined ? <div className="dshd-statSub" title={sub}>{sub}</div> : null}
    </div>
  );
}

function statusPill(status: RequestDetail["status"] | "compaction", t: DashboardViewProps["t"]): JSX.Element {
  return (
    <span className="dshd-statusPill" data-s={status}>
      {status === "running"
        ? t("stat.requests.running")
        : status === "error"
          ? t("stat.requests.error")
          : status === "compaction"
            ? t("stat.compactions")
            : t("stat.requests.completed")}
    </span>
  );
}

/** Expanded drill-down panel for one request row. */
function RequestDetailPanel(props: {
  detail: RequestDetail;
  t: DashboardViewProps["t"];
  onJump?: () => void;
}): JSX.Element {
  const { detail, t, onJump } = props;
  const uncached = Math.max(0, detail.inputTokens - detail.cacheReadTokens - detail.cacheWriteTokens);
  const tools = detail.promptToolNames.length > 0 ? detail.promptToolNames.join(" · ") : t("unknown");
  const startedLabel =
    detail.startedAt === null
      ? null
      : detail.status === "running"
        ? `${new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} · ${t("req.runningElapsed")} ${formatMs(Math.max(0, Date.now() - detail.startedAt))}`
        : new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <div className="dshd-detail">
      <div className="dshd-detailHead">
        <span className="dshd-detailTitle">{t("trend.request")}{detail.seq}</span>
        {detail.purpose === "compaction" ? (
          <span className="dshd-tag" data-k="compaction">{t("stat.compactions")}</span>
        ) : null}
        {detail.thinking ? <span className="dshd-tag" data-k="reasoning">{t("req.config.thinking")}</span> : null}
        {detail.retry > 0 ? (
          <span className="dshd-tag" data-k="error" title={detail.retryDelayMs === null ? undefined : `${t("req.config.provider")} delay ${formatMs(detail.retryDelayMs)}`}>
            {t("req.retryCount")} {detail.retry}/{detail.maxRetries}
            {detail.retryDelayMs !== null ? ` · ${formatMs(detail.retryDelayMs)}` : ""}
          </span>
        ) : null}
        {statusPill(detail.status, t)}
        <span className="dshd-chip">{t("req.turnStep")} {detail.turn}/{detail.step}</span>
        <span className="dshd-chip">{detail.durationMs === null ? t("unknown") : formatMs(detail.durationMs)}</span>
        {startedLabel !== null ? <span className="dshd-chip" title={t("req.startedAt")}>{startedLabel}</span> : null}
        {onJump !== undefined ? (
          <button type="button" className="dshd-jumpText" onClick={onJump}>{t("req.jumpTrajectory")} ↗</button>
        ) : null}
      </div>

      <div className="dshd-kv">
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.config.provider")}</span>
          <span className="dshd-kvValue" title={detail.provider ?? undefined}>{detail.provider ?? t("unknown")}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.model")}</span>
          <span className="dshd-kvValue" title={detail.model ?? undefined}>{detail.model ?? t("unknown")}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.config.temperature")}</span>
          <span className="dshd-kvValue">{detail.temperature === null ? t("unknown") : String(detail.temperature)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.config.maxTokens")}</span>
          <span className="dshd-kvValue">{detail.maxTokens === null ? t("unknown") : exactNumber(detail.maxTokens)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.config.effort")}</span>
          <span className="dshd-kvValue">{detail.reasoningEffort ?? t("unknown")}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.prompt.systemChars")}</span>
          <span className="dshd-kvValue">{detail.promptSystemChars === null ? t("unknown") : exactNumber(detail.promptSystemChars)}</span>
        </div>
      </div>

      <div className="dshd-kv">
        <div className="dshd-kvItem">
          <span className="dshd-kvKey" title={t("hint.uncached")}>{t("req.usage.uncached")}</span>
          <span className="dshd-kvValue">{exactNumber(uncached)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.usage.cacheRead")}</span>
          <span className="dshd-kvValue">{exactNumber(detail.cacheReadTokens)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.usage.cacheWrite")}</span>
          <span className="dshd-kvValue">{exactNumber(detail.cacheWriteTokens)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.usage.output")}</span>
          <span className="dshd-kvValue">{exactNumber(detail.outputTokens)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey">{t("req.usage.reasoning")}</span>
          <span className="dshd-kvValue">{exactNumber(detail.reasoningTokens)}</span>
        </div>
        <div className="dshd-kvItem">
          <span className="dshd-kvKey" title={t("hint.cost")}>{t("req.usage.cost")}</span>
          <span className="dshd-kvValue">{fmtCost(detail.costUsd)}</span>
        </div>
      </div>

      <div>
        <div className="dshd-kvKey">{t("req.prompt.tools")}</div>
        <div className="dshd-kvValue" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{tools}</div>
      </div>

      <div>
        <div className="dshd-kvKey" style={{ marginBottom: "4px" }}>{t("req.toolCalls")}</div>
        {detail.toolCalls.length === 0 ? (
          <div className="dshd-muted" style={{ fontSize: "11.5px", padding: "2px 0" }}>{t("req.noToolCalls")}</div>
        ) : (
          detail.toolCalls.map((call) => (
            <div key={call.callId} className="dshd-toolRow">
              <span className="dshd-toolName">{call.name}</span>
              <span className="dshd-toolArgs" title={call.argsRaw ?? undefined}>{call.argsRaw ?? ""}</span>
              {call.isError ? <span className="dshd-toolErr"><WarnIcon /></span> : null}
              <span className="dshd-toolDur">{call.durationMs === null ? t("unknown") : formatMs(call.durationMs)}</span>
            </div>
          ))
        )}
      </div>

      {detail.error !== null || detail.status === "error" ? (
        <div>
          <div className="dshd-kvKey" style={{ marginBottom: "4px" }}>{t("req.error")}</div>
          <div className="dshd-errorBox">{detail.error ?? t("req.errorMissing")}</div>
        </div>
      ) : null}
    </div>
  );
}

function TrendSection(props: {
  metrics: DashboardMetrics;
  t: DashboardViewProps["t"];
  onJump?: (seq: number) => void;
  jumpTo: (seq: number) => void;
  initialFilter: "all" | "error";
}): JSX.Element {
  const { metrics, t, onJump, jumpTo, initialFilter } = props;
  const detailsBySeq = useMemo(() => new Map(metrics.details.map((d) => [d.seq, d])), [metrics.details]);
  const [openSeq, setOpenSeq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<"all" | "running" | "complete" | "error">(initialFilter);
  const [newArrived, setNewArrived] = useState(false);
  const lastSeqRef = useRef<number | null>(null);
  /** Rows rendered per group before a "more rows exist" note (DOM cap for long sessions). */
  const GROUP_ROW_CAP = 20;
  const canJump = onJump !== undefined;
  const colCount = 8 + (canJump ? 1 : 0);

  // Download the current view's requests as JSON — respects filter, search and
  // the active view (exported flat, with the view/search written into the payload).
  const exportJson = (): void => {
    const payload = {
      exportedAt: new Date().toISOString(),
      filter,
      search: search.trim(),
      view,
      requests: searched.map((s) => {
        const d = detailsBySeq.get(s.seq);
        return {
          seq: s.seq,
          turn: s.turn,
          step: s.step,
          status: s.status,
          purpose: s.purpose,
          provider: s.provider,
          model: s.model,
          inputTokens: s.inputTokens,
          cacheReadTokens: s.cacheReadTokens,
          cacheWriteTokens: s.cacheWriteTokens,
          outputTokens: s.outputTokens,
          reasoningTokens: s.reasoningTokens,
          startedAt: s.startedAt,
          durationMs: s.durationMs,
          error: s.error,
          costUsd: d?.costUsd ?? null,
          reasoningEffort: d?.reasoningEffort ?? null,
          temperature: d?.temperature ?? null,
          retry: d?.retry ?? 0,
          toolCalls: d?.toolCalls ?? []
        };
      })
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-${view}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [view, setView] = useState<"table" | "turn" | "model" | "error">("table");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggleCollapsed = (key: string): void => setCollapsed((c) => ({ ...c, [key]: !(c[key] ?? false) }));

  const filtered = filter === "all" ? metrics.series : metrics.series.filter((s) => s.status === filter);
  // Search: seq / turn / model / error message / purpose / tool name.
  const q = search.trim().toLowerCase();
  const searched = q.length === 0 ? filtered : filtered.filter((s) => {
    const d = detailsBySeq.get(s.seq);
    return (
      String(s.seq).includes(q) ||
      String(s.turn).includes(q) ||
      (s.model ?? "").toLowerCase().includes(q) ||
      (s.error ?? "").toLowerCase().includes(q) ||
      (s.purpose ?? "").toLowerCase().includes(q) ||
      (d?.toolCalls ?? []).some((c) => c.name.toLowerCase().includes(q))
    );
  });
  const total = searched.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const rows = searched.slice(safePage * pageSize, safePage * pageSize + pageSize);

  // Grouped views share the same row renderer as the table.
  const renderRow = (s: RequestSample): JSX.Element => {
    const detail = detailsBySeq.get(s.seq);
    const open = openSeq === s.seq;
    const isError = s.status === "error";
    const jumpMode = canJump && !isError && (detail?.toolCalls.length ?? 0) > 0;
    return (
      <FragmentRow
        key={s.seq}
        open={open}
        colSpan={colCount}
        rowError={isError}
        rowTitle={
          isError
            ? t("req.rowHint.error")
            : jumpMode
              ? s.purpose === "compaction"
                ? t("req.rowHint.jumpCompaction")
                : t("req.rowHint.jump")
              : t("req.rowHint.expand")
        }
        onRowClick={() => {
          // Failed rows expand inline (the error IS the point);
          // other rows jump to the trajectory when available.
          if (jumpMode) jumpTo(s.seq);
          else setOpenSeq(open ? null : s.seq);
        }}
        onChevronClick={() => setOpenSeq(open ? null : s.seq)}
        cols={
          <>
            <td>
              <span
                className="dshd-chevron"
                data-open={open || undefined}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-label={open ? t("req.collapse") : t("req.expand")}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSeq(open ? null : s.seq);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenSeq(open ? null : s.seq);
                  }
                }}
              >
                <ChevronIcon open={open} />
              </span>
            </td>
            <td><span className="dshd-seq">{s.seq}</span></td>
            <td>{s.turn}/{s.step}</td>
            <td><span className="dshd-model" title={s.model ?? undefined}>{s.model ?? t("unknown")}</span></td>
            <td>{exactNumber(s.inputTokens)}</td>
            <td>{exactNumber(s.outputTokens)}</td>
            <td>{s.durationMs === null ? t("unknown") : formatMs(s.durationMs)}</td>
            <td>{s.purpose === "compaction" ? statusPill("compaction", t) : statusPill(s.status, t)}</td>
            {canJump ? (
              <td>
                <button
                  type="button"
                  className="dshd-jump"
                  disabled={(detail?.toolCalls.length ?? 0) === 0}
                  aria-label={t("req.jumpTrajectory")}
                  title={s.purpose === "compaction" ? t("req.jumpCompaction") : t("req.jumpTrajectory")}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpTo(s.seq);
                  }}
                >
                  ↗
                </button>
              </td>
            ) : null}
          </>
        }
        detail={
          open && detail !== undefined ? (
            <RequestDetailPanel
              detail={detail}
              t={t}
              onJump={canJump && (detail?.toolCalls.length ?? 0) > 0 ? () => jumpTo(s.seq) : undefined}
            />
          ) : null
        }
      />
    );
  };

  // Grouped views: bucket the searched rows, aggregate per group.
  const groups: { key: string; label: string; items: RequestSample[] }[] = (() => {
    if (view === "table") return [];
    const map = new Map<string, RequestSample[]>();
    for (const s of searched) {
      let key: string;
      if (view === "turn") key = `${t("turns.label")}${s.turn}`;
      else if (view === "model") key = s.model ?? t("unknown");
      else {
        // "By error" groups failed requests only, so the group count matches
        // the tab badge (and the "ok" bucket can't bury the real errors).
        if (s.status !== "error") continue;
        key = (s.error ?? "").trim().length > 0 ? (s.error as string) : t("unknown");
      }
      const list = map.get(key) ?? [];
      list.push(s);
      map.set(key, list);
    }
    return [...map.entries()]
      .map(([key, items]) => ({ key, label: key, items }))
      .sort((a, b) => b.items.length - a.items.length);
  })();

  // Badge counts for the filter pills and the view tabs (at-a-glance spread).
  const statusCounts = { all: metrics.series.length, running: 0, complete: 0, error: 0 };
  for (const s of metrics.series) statusCounts[s.status] += 1;
  const viewCounts = {
    table: total,
    turn: new Set(searched.map((s) => s.turn)).size,
    model: new Set(searched.map((s) => s.model ?? "")).size,
    error: new Set(searched.filter((s) => s.status === "error").map((s) => s.error ?? "")).size
  };

  // Detect genuinely new requests arriving while the user is off the first
  // page. Compare the newest request seq (not the row count, which also
  // changes on filter/search edits) and clear when back on page 0.
  useEffect(() => {
    const first = metrics.series[0];
    const newest = first === undefined ? null : first.seq;
    if (newest !== null && lastSeqRef.current !== null && newest > lastSeqRef.current && safePage > 0) {
      setNewArrived(true);
    }
    if (newest !== null) lastSeqRef.current = newest;
    if (safePage === 0) setNewArrived(false);
  }, [metrics.series, safePage]);

  // Page-number window (max 5 buttons, ellipsis outside).
  const pageWindow: (number | "…")[] = [];
  if (pageCount <= 5) {
    for (let i = 0; i < pageCount; i += 1) pageWindow.push(i);
  } else {
    const pages = new Set<number>([0, pageCount - 1, safePage - 1, safePage, safePage + 1]);
    let prev = -2;
    for (const p of [...pages].sort((a, b) => a - b)) {
      if (p < 0 || p >= pageCount) continue;
      if (p - prev > 1) pageWindow.push("…");
      pageWindow.push(p);
      prev = p;
    }
  }

  const display = metrics.series.slice(0, 60).reverse(); // oldest → newest for charts
  // Window-scoped aggregates for the trend headers: the per-request series is
  // the window, so totals/averages shown next to the charts use it too
  // (previously the whole-log projection values leaked in and mislabeled).
  const windowDurationMs = display.reduce(
    (sum, s) => sum + (s.status !== "running" && s.durationMs !== null ? s.durationMs : 0),
    0
  );
  const windowTtftAvgMs =
    metrics.assistantTtft.length > 0
      ? Math.round(metrics.assistantTtft.reduce((a, b) => a + b.ttftMs, 0) / metrics.assistantTtft.length)
      : null;
  const windowed = metrics.series.length > 60;
  const scopeNote = windowed ? ` · ${t("trend.scopeNote")} 60 ${t("pager.items")}` : "";
  const windowTitle = windowed ? t("trend.windowTotal") : t("trend.windowTotalAll");
  const tokenBars: SeriesDatum[] = display.map((s) => ({
    label: `${t("trend.request")}${s.seq}`,
    value: s.inputTokens,
    color: CHART_COLORS.input,
    status: s.status
  }));
  const outputBars: SeriesDatum[] = display.map((s) => ({
    label: `${t("trend.request")}${s.seq}`,
    value: s.outputTokens,
    color: CHART_COLORS.output,
    status: s.status
  }));
  // Duration bars keep a fixed semantic color (magenta, amber fallback) so
  // every trend chart is instantly distinguishable; model info lives in the
  // table column, the model-split card, and the model-switch stat. Running
  // requests are skipped (a 0 ms bar would look like "instant completion").
  const durationBars: SeriesDatum[] = display
    .filter((s) => s.status !== "running")
    .map((s) => ({
      label: `${t("trend.request")}${s.seq}`,
      value: s.durationMs ?? 0,
      color: CHART_COLORS.reasoning,
      status: s.status
    }));
  // Cache hit rate: skip running requests and zero-input samples — their 0%
  // would render as a misleading drop at the newest edge.
  const hitBars: SeriesDatum[] = display
    .filter((s) => s.status !== "running" && s.inputTokens > 0)
    .map((s) => ({
      label: `${t("trend.request")}${s.seq}`,
      value: Math.round((s.cacheReadTokens / s.inputTokens) * 100),
      color: CHART_COLORS.cacheRead,
      status: s.status
    }));
  const cacheWriteBars: SeriesDatum[] = display.map((s) => ({
    label: `${t("trend.request")}${s.seq}`,
    value: s.cacheWriteTokens,
    color: CHART_COLORS.cacheWrite,
    status: s.status
  }));
  const ttftBars: SeriesDatum[] = metrics.assistantTtft.slice(-60).map((s) => ({
    label: `${t("trend.request")}${s.seq}`,
    value: s.ttftMs,
    color: CHART_COLORS.reasoning
  }));
  // Per-turn billed input (compaction excluded) — context growth at a glance.
  const turnInputBars: SeriesDatum[] = metrics.turnInput.slice(-60).map((r) => ({
    label: `${t("turns.label")}${r.turn}`,
    value: r.inputTokens,
    color: CHART_COLORS.input
  }));
  const lastTurnDelta = metrics.turnInput.length > 1 ? metrics.turnInput[metrics.turnInput.length - 1]!.delta : null;
  // Activity-rate bars over minute buckets (oldest → newest).
  const bucketTime = (ms: number): string => new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const rateReqBars: SeriesDatum[] = metrics.throughput.map((b) => ({
    label: bucketTime(b.bucketMs),
    value: b.requests,
    color: CHART_COLORS.llm
  }));
  const rateTokenBars: SeriesDatum[] = metrics.throughput.map((b) => ({
    label: bucketTime(b.bucketMs),
    value: b.inputTokens + b.outputTokens,
    color: CHART_COLORS.input
  }));
  // Error-rate trend: failed requests per bucket (S4).
  const rateFailBars: SeriesDatum[] = metrics.throughput.map((b) => ({
    label: bucketTime(b.bucketMs),
    value: b.failed,
    color: CHART_COLORS.error
  }));
  const totalFailed = metrics.series.filter((s) => s.status === "error").length;
  // Context occupancy over the window: per-request input ÷ context window (S3).
  const contextOccBars: SeriesDatum[] = metrics.contextTrend
    .filter((c) => c.pct !== null)
    .map((c) => ({
      label: `${t("trend.request")}${c.seq}`,
      value: c.pct as number,
      color: CHART_COLORS.cacheWrite
    }));
  const occNowPct =
    metrics.pressure?.projectedTokens !== undefined &&
    metrics.pressure.contextWindow !== undefined &&
    metrics.pressure.contextWindow > 0
      ? Math.min(100, Math.round((metrics.pressure.projectedTokens / metrics.pressure.contextWindow) * 100))
      : null;
  // Compaction turns for the sawtooth annotation.
  const compactionTurns = [...new Set(metrics.compactionEffect.map((e) => e.turn))].sort((a, b) => a - b);
  // Reasoning share of output per request (0% when no reasoning reported).
  const reasoningShareBars: SeriesDatum[] = display
    .filter((s) => s.outputTokens > 0)
    .map((s) => ({
      label: `${t("trend.request")}${s.seq}`,
      value: Math.round((s.reasoningTokens / s.outputTokens) * 100),
      color: CHART_COLORS.reasoning,
      status: s.status
    }));
  const totalInput = metrics.series.reduce((sum, s) => sum + s.inputTokens, 0);
  const totalOutput = metrics.series.reduce((sum, s) => sum + s.outputTokens, 0);
  const totalCacheWrite = metrics.series.reduce((sum, s) => sum + s.cacheWriteTokens, 0);

  return (
    <div className="dshd-col">
      <details className="dshd-trendDetails"><summary><DashboardIcon name="analysis" />{t("dashboard.trends")}<span>{t("dashboard.trendsNote")}</span><DashboardIcon name="chevron" /></summary>
      <div className="dshd-trendGrid">
      <div className="dshd-seriesRow">
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheRead, display: "inline-block" }} />
            {t("trend.cacheHit")}
            <span className="dshd-seriesTotal">{metrics.cacheHitPercent === null ? "—" : `${metrics.cacheHitPercent}%`} <span className="dshd-scopeTag">{t("stat.scopeAll")}</span></span>
          </div>
          <AreaChart
            series={hitBars}
            height={76}
            color={CHART_COLORS.cacheRead}
            valueFormatter={(v) => `${v}%`}
            emptyLabel={t("empty.requests")}
            showMaxTag
           ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" }} />
            {t("trend.input")}
            <span className="dshd-seriesTotal" title={windowTitle}>{exactNumber(totalInput)}</span>
          </div>
          <SeriesBars series={tokenBars} height={76} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.output, display: "inline-block" }} />
            {t("trend.output")}
            <span className="dshd-seriesTotal" title={windowTitle}>{exactNumber(totalOutput)}</span>
          </div>
          <SeriesBars series={outputBars} height={76} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 2.5,
                background: CHART_COLORS.reasoning,
                display: "inline-block"
              }}
            />
            {t("trend.duration")}
            <span className="dshd-seriesTotal" title={windowTitle}>{formatMs(windowDurationMs)}</span>
          </div>
          <SeriesBars series={durationBars} height={76} valueFormatter={(v) => formatMs(v)} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
      </div>

      <div className="dshd-seriesRow">
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" }} />
            {t("trend.ttft")}
            <span className="dshd-seriesTotal" title={t("trend.ttftAvgNote")}>{windowTtftAvgMs === null ? "—" : `${formatMs(windowTtftAvgMs)} ${t("timing.avg")}`}</span>
          </div>
          <AreaChart
            series={ttftBars}
            height={76}
            color={CHART_COLORS.reasoning}
            valueFormatter={(v) => formatMs(v)}
            emptyLabel={t("empty.requests")}
            showMaxTag
           ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">
            {t("trend.newestRight")}{scopeNote}
            {metrics.ttftStats.p50 !== null ? (
              <span className="dshd-ttftStats">
                P50 {formatMs(metrics.ttftStats.p50)} · P95 {formatMs(metrics.ttftStats.p95 ?? 0)} · P99 {formatMs(metrics.ttftStats.p99 ?? 0)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" }} />
            {t("trend.turnInput")}
            {lastTurnDelta !== null ? (
              <span
                className={`dshd-delta ${lastTurnDelta > 0 ? "dshd-deltaUp" : lastTurnDelta < 0 ? "dshd-deltaDown" : ""}`}
                title={t("trend.deltaNote")}
              >
                {lastTurnDelta > 0 ? "+" : ""}{exactNumber(lastTurnDelta)}
              </span>
            ) : null}
          </div>
          <AreaChart series={turnInputBars} height={76} color={CHART_COLORS.input} valueFormatter={(v) => exactNumber(v)} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">
            {t("trend.newestRight")}{scopeNote}
            {compactionTurns.length > 0 ? (
              <span className="dshd-ttftStats">◆ {t("trend.compactionMarks")}: {compactionTurns.map((tn) => `${t("turns.label")}${tn}`).join("、")}</span>
            ) : null}
          </div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" }} />
            {t("trend.reasoningShare")}
          </div>
          <AreaChart
            series={reasoningShareBars}
            height={76}
            color={CHART_COLORS.reasoning}
            valueFormatter={(v) => `${v}%`}
            emptyLabel={t("empty.requests")}
            showMaxTag
           ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" }} />
            {t("trend.cacheWrite")}
            <span className="dshd-seriesTotal" title={windowTitle}>{exactNumber(totalCacheWrite)}</span>
          </div>
          <SeriesBars series={cacheWriteBars} height={76} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.newestRight")}{scopeNote}</div>
        </div>
      </div>

      {/* Activity rate (minute buckets over the window) */}
      <div className="dshd-seriesRow">
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.llm, display: "inline-block" }} />
            {t("trend.rateRequests")}
          </div>
          <SeriesBars series={rateReqBars} height={60} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.rateNote")}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" }} />
            {t("trend.rateTokens")}
          </div>
          <SeriesBars series={rateTokenBars} height={60} emptyLabel={t("empty.requests")} showMaxTag  ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.rateNote")}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.error, display: "inline-block" }} />
            {t("trend.rateFailed")}
            <span className="dshd-seriesTotal">{exactNumber(totalFailed)}</span>
          </div>
          <AreaChart
            series={rateFailBars}
            height={60}
            color={CHART_COLORS.error}
            valueFormatter={(v) => exactNumber(v)}
            emptyLabel={t("empty.requests")}
            showMaxTag
           ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("trend.rateNote")}</div>
        </div>
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" }} />
            {t("trend.contextOcc")}
            {occNowPct !== null ? <span className="dshd-seriesTotal">{occNowPct}%</span> : null}
          </div>
          <AreaChart
            series={contextOccBars}
            height={60}
            color={CHART_COLORS.cacheWrite}
            valueFormatter={(v) => `${v}%`}
            emptyLabel={t("empty.requests")}
            showMaxTag
           ariaLabel={t("aria.trend")} />
          <div className="dshd-axisHint">{t("hint.contextOccTrend")}</div>
        </div>
      </div>

      </div></details>
      <div className="dshd-viewTabs" role="group" aria-label={t("view.tabs.aria")}>
        {(["table", "turn", "model", "error"] as const).map((v) => (
          <button
            key={v}
            type="button"
            className="dshd-viewTab"
            data-current={view === v ? true : undefined}
            aria-pressed={view === v}
            onClick={() => {
              setView(v);
              setPage(0);
            }}
          >
            {t(`view.${v}`)}
            <span className="dshd-badge">{viewCounts[v]}</span>
          </button>
        ))}
      </div>

      <div className="dshd-filters" role="group" aria-label={t("req.filter.aria")}>
        {(["all", "running", "complete", "error"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className="dshd-filterBtn"
            data-current={filter === f ? true : undefined}
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setPage(0);
            }}
          >
            {t(`req.filter.${f}`)}
            <span className="dshd-badge">{statusCounts[f]}</span>
          </button>
        ))}
        <span className="dshd-spacer" />
        <input
          type="search"
          className="dshd-search"
          placeholder={t("req.searchPlaceholder")}
          value={search}
          aria-label={t("req.searchPlaceholder")}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        <button type="button" className="dshd-filterBtn" title={t("req.exportHint")} onClick={exportJson}>
          {t("req.export")}
        </button>
      </div>

      {view === "table" ? (
        <>
        <div className="dshd-tableWrap">
          <table className="dshd-table" aria-label={t("section.requests")}>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>{t("req.turnStep")}</th>
              <th>{t("req.model")}</th>
              <th>{t("trend.input")}</th>
              <th>{t("trend.output")}</th>
              <th>{t("trend.duration")}</th>
              <th>{t("req.status")}</th>
              {canJump ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map(renderRow)}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="dshd-tableEmpty">
                  {search.trim().length > 0 ? (
                    <>
                      {t("empty.search")}{" "}
                      <button
                        type="button"
                        className="dshd-clearFilter"
                        onClick={() => {
                          setSearch("");
                          setPage(0);
                        }}
                      >
                        {t("req.clearSearch")}
                      </button>
                    </>
                  ) : filter !== "all" ? (
                    <>
                      {t("empty.requestsFiltered")}{" "}
                      <button
                        type="button"
                        className="dshd-clearFilter"
                        onClick={() => {
                          setFilter("all");
                          setPage(0);
                        }}
                      >
                        {t("req.filter.all")}
                      </button>
                    </>
                  ) : (
                    t("empty.requestsTable")
                  )}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {total > 0 ? (
        <div className="dshd-pager">
          <span className="dshd-pagerInfo">
            {t("pager.page")} {safePage + 1}{t("pager.of")}{pageCount} · {total} {t("pager.items")}
          </span>
          <div className="dshd-pagerBtns">
            <button
              type="button"
              className="dshd-pageBtn"
              disabled={safePage === 0}
              aria-label={t("pager.prev")}
              onClick={() => setPage(safePage - 1)}
            >
              ‹
            </button>
            {pageWindow.map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="dshd-pageEllipsis">…</span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className="dshd-pageBtn"
                  data-current={p === safePage ? true : undefined}
                  aria-current={p === safePage ? "page" : undefined}
                  aria-label={`${t("pager.jumpTo")} ${p + 1}`}
                  onClick={() => setPage(p)}
                >
                  {p + 1}
                </button>
              )
            )}
            <button
              type="button"
              className="dshd-pageBtn"
              disabled={safePage >= pageCount - 1}
              aria-label={t("pager.next")}
              onClick={() => setPage(safePage + 1)}
            >
              ›
            </button>
          </div>
          {newArrived ? (
            <button type="button" className="dshd-newBtn" onClick={() => { setPage(0); setNewArrived(false); }}>
              {t("trend.newRequests")}
            </button>
          ) : null}
          <label className="dshd-pageSize">
            <span className="dshd-muted">{t("pager.perPage")}</span>
            <select
              value={pageSize}
              aria-label={t("pager.perPage")}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      ) : null}
      </>
      ) : (
        /* Grouped views: collapsible group headers + aggregated stats */
        <div className="dshd-groups">
          {groups.map((g) => {
            const gkey = `${view}:${g.key}`;
            const isCollapsed = collapsed[gkey] === true;
            let inSum = 0;
            let outSum = 0;
            let durSum = 0;
            let durN = 0;
            let errN = 0;
            for (const s of g.items) {
              inSum += s.inputTokens;
              outSum += s.outputTokens;
              if (s.durationMs !== null) {
                durSum += s.durationMs;
                durN += 1;
              }
              if (s.status === "error") errN += 1;
            }
            return (
              <div key={g.key} className="dshd-group">
                <button
                  type="button"
                  className="dshd-groupHead"
                  aria-expanded={!isCollapsed}
                  onClick={() => toggleCollapsed(gkey)}
                >
                  <span className="dshd-chevron" data-open={isCollapsed ? undefined : true}><ChevronIcon open={!isCollapsed} /></span>
                  <span className="dshd-groupName">{g.label}</span>
                  <span className="dshd-groupStats">
                    {g.items.length} {t("pager.items")} · {t("trend.input")} {compactNumber(inSum)} · {t("trend.output")} {compactNumber(outSum)}
                    {durN > 0 ? ` · ${t("trend.duration")} ${formatMs(Math.round(durSum / durN))}` : ""}
                    {errN > 0 ? ` · ! ${errN}` : ""}
                  </span>
                </button>
                {!isCollapsed ? (
                  <div className="dshd-groupBody">
                    <table className="dshd-table" aria-label={g.label}>
                      <thead>
                        <tr>
                          <th></th>
                          <th>#</th>
                          <th>{t("req.turnStep")}</th>
                          <th>{t("req.model")}</th>
                          <th>{t("trend.input")}</th>
                          <th>{t("trend.output")}</th>
                          <th>{t("trend.duration")}</th>
                          <th>{t("req.status")}</th>
                          {canJump ? <th></th> : null}
                        </tr>
                      </thead>
                      <tbody>{g.items.slice(0, GROUP_ROW_CAP).map(renderRow)}</tbody>
                    </table>
                    {g.items.length > GROUP_ROW_CAP ? (
                      <div className="dshd-axisHint">
                        {t("group.tailNote").replace("{n}", String(GROUP_ROW_CAP)).replace("{m}", String(g.items.length - GROUP_ROW_CAP))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
          {groups.length === 0 ? (
            search.trim().length > 0 ? (
              <div className="dshd-empty" style={{ padding: "22px 0" }}>
                {t("empty.search")}
                <button type="button" className="dshd-clearFilter" onClick={() => setSearch("")}>{t("req.clearSearch")}</button>
              </div>
            ) : filter !== "all" ? (
              <div className="dshd-empty" style={{ padding: "22px 0" }}>
                {t("empty.requestsFiltered")}
                <button type="button" className="dshd-clearFilter" onClick={() => setFilter("all")}>{t("req.filter.all")}</button>
              </div>
            ) : (
              <div className="dshd-empty" style={{ padding: "22px 0" }}>{t("empty.requestsTable")}</div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}

/** Row + optional expanded detail row (fragment keyed inside the map). */
function FragmentRow(props: {
  open: boolean;
  colSpan: number;
  rowError?: boolean;
  rowTitle: string;
  onRowClick: () => void;
  onChevronClick: () => void;
  cols: JSX.Element;
  detail: JSX.Element | null;
}): JSX.Element {
  return (
    <>
      <tr
        data-open={props.open || undefined}
        data-error={props.rowError || undefined}
        title={props.rowTitle}
        tabIndex={0}
        onClick={props.onRowClick}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            props.onRowClick();
          }
        }}
      >
        {props.cols}
      </tr>
      {props.detail !== null ? (
        <tr>
          <td colSpan={props.colSpan} style={{ padding: "0 8px 10px" }}>{props.detail}</td>
        </tr>
      ) : null}
    </>
  );
}

/** The loaded request sequence is the session's execution signature, not decorative telemetry. */
function RequestActivity({ samples, t }: { samples: readonly RequestSample[]; t: DashboardViewProps["t"] }): JSX.Element {
  const recent = samples.slice(0, 60).reverse();
  const maxDuration = Math.max(1, ...recent.map((sample) => sample.durationMs ?? 0));
  const hasDuration = recent.some((sample) => sample.durationMs !== null);
  if (recent.length === 0) return <div className="dshd-activityEmpty">{t("empty.requests")}</div>;
  return (
    <div className="dshd-activity">
      <div className="dshd-activityCaption"><span>{t("dashboard.activityCaption")}</span><span>{t("dashboard.slowest")} {hasDuration ? formatMs(maxDuration) : t("unknown")}</span></div>
      <div className="dshd-activityPlot" role="img" aria-label={t("dashboard.activityAria")}>
        {recent.map((sample) => (
          <span key={sample.seq} className="dshd-activitySample" data-status={sample.status}
            title={`#${sample.seq} ${sample.model ?? t("unknown")} / ${sample.durationMs === null ? t("stat.requests.running") : formatMs(sample.durationMs)}`}>
            <span style={{ height: `${Math.max(8, ((sample.durationMs ?? 0) / maxDuration) * 100)}%` }} />
          </span>
        ))}
      </div>
      <div className="dshd-activityAxis"><span>{recent[0] === undefined ? t("unknown") : `#${recent[0].seq}`}</span><span>{t("dashboard.activityOrder")}</span><span>{recent.at(-1) === undefined ? t("unknown") : `#${recent.at(-1)!.seq}`}</span></div>
    </div>
  );
}

/** Tool wall times are cumulative samples, not the session's elapsed time. */
export function ToolAnalysis({ metrics, t }: { metrics: DashboardMetrics; t: DashboardViewProps["t"] }): JSX.Element {
  const counts = new Map(metrics.toolHistogram.map((row) => [row.name, row]));
  const timings = new Map(metrics.toolDurationTop.map((row) => [row.name, row]));
  const tools = [...new Set([...counts.keys(), ...timings.keys()])].map((name) => ({
    name, count: counts.get(name), timing: timings.get(name)
  })).sort((a, b) => (b.timing?.totalMs ?? -1) - (a.timing?.totalMs ?? -1) || (b.count?.count ?? 0) - (a.count?.count ?? 0));
  const timed = tools.filter((row) => row.timing !== undefined && row.timing.totalMs > 0);
  const totalMs = timed.reduce((total, row) => total + row.timing!.totalMs, 0);
  const hasErrors = tools.some((row) => (row.count?.errorCount ?? 0) > 0);
  const questionMs = timed.find((row) => row.name === "ask_user_question")?.timing?.totalMs ?? 0;
  const allocation = [
    { label: t("analysis.interactive"), value: questionMs, color: "var(--dshd-wait-fill)" },
    { label: t("analysis.otherTools"), value: totalMs - questionMs, color: "var(--dshd-teal)" }
  ].filter((row) => row.value > 0);

  return <section className="dshd-toolAnalysis">
    <div className="dshd-analysisHeading">
      <div><h2>{t("analysis.focusTitle")}</h2><p>{t("analysis.toolSummary").replace("{calls}", exactNumber(metrics.toolCallCount)).replace("{tools}", String(tools.length))}</p></div>
      <Hint label={t("analysis.timingScope")} />
    </div>
    {timed.length > 0 && <div className="dshd-timeOverview">
      <div className="dshd-timeTotal"><span>{t("analysis.cumulativeTime")}</span><strong>{formatMs(totalMs)}</strong></div>
      <div className="dshd-allocation">
        <div className="dshd-allocationBar" role="img" aria-label={t("analysis.allocation")}>
          {allocation.map((row) => <span key={row.label} title={`${row.label}: ${formatMs(row.value)}`}
            style={{ flex: row.value, background: row.color }} />)}
        </div>
        <div className="dshd-allocationLegend">{allocation.map((row) => <span key={row.label}>
          <i style={{ background: row.color }} /><span>{row.label}</span><b>{formatMs(row.value)}</b>
        </span>)}</div>
      </div>
    </div>}
    {tools.length > 0 ? <div className="dshd-analysisTableScroll" tabIndex={0} role="region" aria-label={t("section.tools")}>
      <table className="dshd-analysisTable">
        <thead><tr>
          <th scope="col">{t("analysis.toolName")}</th>
          <th scope="col" aria-sort="descending" title={t("analysis.orderedByTime")}>{t("analysis.totalTime")} ↓</th>
          <th scope="col">{t("analysis.calls")}</th>
          <th scope="col">{t("analysis.avgTime")}</th>
          {hasErrors && <th scope="col">{t("stat.requests.error")}</th>}
        </tr></thead>
        <tbody>{tools.map((row) => <tr key={row.name} data-waiting={row.name === "ask_user_question"}>
          <th scope="row"><span className="dshd-toolName">{row.name}</span>{row.name === "ask_user_question" && <span className="dshd-waitingLabel">{t("analysis.includesWaiting")}</span>}</th>
          <td className="dshd-toolDuration" title={row.timing ? `${row.timing.calls} ${t("analysis.timedCalls")}` : undefined}>{row.timing ? formatMs(row.timing.totalMs) : "—"}</td>
          <td>{row.count ? exactNumber(row.count.count) : "—"}</td>
          <td>{row.timing ? formatMs(row.timing.avgMs) : "—"}</td>
          {hasErrors && <td data-error={(row.count?.errorCount ?? 0) > 0}>{row.count?.errorCount ?? "—"}</td>}
        </tr>)}</tbody>
      </table>
    </div> : <div className="dshd-muted">{t("analysis.noTools")}</div>}
    <div className="dshd-analysisFootnote"><span className="dshd-analysisScrollHint">{t("analysis.scrollTable")} </span>{t("analysis.timingScope")}</div>
  </section>;
}

/** The dashboard conversation-view entry. */
export function DashboardView(props: DashboardViewProps): JSX.Element {
  const { useSession, useConversation, useTrajectory, useProjection, useSessions, t, openView, sessionId } = props;
  // The bounded scrollport reserves the host composer's measured height;
  // the dashboard never opts into the host's floating-composer overlay mode.
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollHandlerRef = useRef<((ev: Event) => void) | null>(null);
  const restoringRef = useRef(false);
  const sessionRef = useRef(sessionId);
  sessionRef.current = sessionId;

  const bindRoot = useCallback((el: HTMLDivElement | null) => {
    const prev = rootRef.current;
    if (prev !== null && scrollHandlerRef.current !== null) {
      prev.removeEventListener("scroll", scrollHandlerRef.current);
    }
    rootRef.current = el;
    scrollHandlerRef.current = null;
    if (el === null) return;
    // 挂载时恢复该会话上次的位置；没有记忆则从顶部开始。
    restoringRef.current = true;
    el.scrollTop = scrollMemory.get(sessionRef.current) ?? 0;
    restoringRef.current = false;
    const onScroll = (): void => {
      if (restoringRef.current) return; // 只记手动滚动，程序性恢复不回写
      scrollMemory.set(sessionRef.current, el.scrollTop);
    };
    scrollHandlerRef.current = onScroll;
    el.addEventListener("scroll", onScroll, { passive: true });
  }, []);

  // 切走 tab（卸载）时保存最后一次手动建立的位置。
  useEffect(() => () => {
    const el = rootRef.current;
    if (el !== null) scrollMemory.set(sessionRef.current, el.scrollTop);
  }, []);
  // 0.2.x split the old merged Conversation snapshot: Session facts stay on
  // `useSession`, while Conversation targets (chat, trajectory) are read from
  // the Conversation view hooks. The chat target keeps the legacy slice the
  // dashboard derives its metrics from.
  const chat = useConversation((s) => s.views.get("chat"));
  const trajectory = useTrajectory((s) => s);
  const nodes = chat?.legacy.nodes ?? EMPTY_NODES;
  const turnTimings = chat?.legacy.turnTimings ?? EMPTY_TURN_TIMINGS;
  const partial = chat?.legacy.partial ?? null;
  const runningCalls = chat?.legacy.runningCalls ?? EMPTY_RUNNING_CALLS;
  const running = useSession((s) => s.running) === true;
  const hasMore = useSession((s) => s.hasMore) === true;
  // While a generation is running, tick once per second so the live stream
  // line and elapsed timers stay current even when session events are sparse.
  const [panel, setPanel] = useState<"overview" | "analysis" | "requests" | "agents">("overview");
  const [clock, setClock] = useState(0);
  const [requestFilter, setRequestFilter] = useState<"all" | "error">("all");
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setClock((c) => c + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const tokenUsage = useProjection("tokenUsage");
  const stats = useProjection("sessionStats");
  const context = useProjection("contextBreakdown");
  const pressure = useProjection("contextPressure");
  // HUD: goal / todos / board projections + the subagent catalog of this
  // session (the same data the board view renders, condensed into one strip).
  const goal = useProjection("goal");
  const todos = useProjection("todos");
  const board = useProjection("boardState");
  const subagents = useSessions((s) => subagentEntriesOf(s, sessionId));
  const hud = useHudData({ running, runningCalls, goal, todos, board, subagentEntries: subagents });

  const metrics = useMemo(
    () =>
      deriveMetrics(
        {
          running,
          snapshot: { turnTimings },
          nodes,
          requests: trajectory?.requests ?? [],
          tokenUsage,
          stats,
          context,
          pressure
        },
        Date.now()
      ),
    [running, nodes, turnTimings, trajectory, tokenUsage, stats, context, pressure, clock]
  );

  const hasData =
    metrics.turns > 0 ||
    metrics.steps > 0 ||
    metrics.requestCount > 0 ||
    metrics.inputTokens > 0 ||
    metrics.roles.total > 0;

  const detailsBySeq = useMemo(() => new Map(metrics.details.map((d) => [d.seq, d])), [metrics.details]);
  const jumpTo = (seq: number): void => {
    const call = detailsBySeq.get(seq)?.toolCalls[0];
    if (call !== undefined) openView("trajectory", call.callId);
  };

  // Context form label (opaque fallback for producer forms this build does not know).
  const formLabel = (f: string): string =>
    f === "instructions" ||
    f === "catalog" ||
    f === "snapshot" ||
    f === "notice" ||
    f === "relay" ||
    f === "recall"
      ? t(`contextForm.${f}`)
      : t("contextForm.opaque");

  const streamingBlocks = useMemo(() => extractStreamingBlocks(partial), [partial]);
  const streamed = useMemo(() => summarizeStreamChars(streamingBlocks), [streamingBlocks]);
  const liveItem = useMemo(() => currentStreamingItem(streamingBlocks), [streamingBlocks]);
  const livePreview = useMemo(
    () => compactStreamLine(liveItem?.text ?? "", STREAM_MAX_CHARS),
    [liveItem]
  );

  const tokenData: ChartDatum[] = [
    { label: t("req.usage.uncached"), value: Math.max(0, metrics.inputTokens - metrics.cacheReadTokens - metrics.cacheWriteTokens), color: CHART_COLORS.input },
    { label: t("tokens.cacheRead"), value: metrics.cacheReadTokens, color: CHART_COLORS.cacheRead },
    { label: t("tokens.cacheWrite"), value: metrics.cacheWriteTokens, color: CHART_COLORS.cacheWrite },
    // Billed output as reported (may include reasoning); reasoning is shown
    // separately as a StatCard so the bar total never double counts.
    { label: t("tokens.output"), value: metrics.outputTokens, color: CHART_COLORS.output }
  ];

  const roleData: ChartDatum[] = [
    { label: t("role.user"), value: metrics.roles.user, color: CHART_COLORS.input },
    { label: t("role.steering"), value: metrics.roles.steering, color: CHART_COLORS.steering },
    { label: t("role.assistant"), value: metrics.roles.assistant, color: CHART_COLORS.assistant },
    { label: t("role.system"), value: metrics.roles.system, color: CHART_COLORS.system },
    { label: t("role.tool"), value: metrics.roles.tool, color: CHART_COLORS.tool },
    { label: t("role.other"), value: metrics.roles.other, color: CHART_COLORS.other }
  ].filter((d) => d.value > 0);

  const contextData: ChartDatum[] = metrics.context
    ? [
        { label: t("context.system"), value: metrics.context.systemTokens, color: CHART_COLORS.system },
        { label: t("context.tools"), value: metrics.context.toolsTokens, color: CHART_COLORS.tools },
        { label: t("context.messages"), value: metrics.context.messageTokens, color: CHART_COLORS.messages }
      ]
    : [];

  const model = metrics.series.find((sample) => sample.model !== null)?.model ?? null;

  const errorRows: RowDatum[] = [
    { label: t("stat.turnErrors"), value: metrics.anomalies.turnErrors, color: CHART_COLORS.error },
    { label: t("stat.maxTokenHits"), value: metrics.anomalies.maxTokenHits, color: CHART_COLORS.cacheWrite },
    { label: t("stat.retries"), value: metrics.anomalies.modelRetries, color: CHART_COLORS.reasoning },
    { label: t("stat.interrupted"), value: metrics.anomalies.interrupted, color: CHART_COLORS.other },
    { label: t("stat.commands"), value: metrics.anomalies.commands, color: CHART_COLORS.steering }
  ].filter((r) => r.value > 0);

  const windowNote = `${t("role.windowNote")}${hasMore ? t("windowNote.more") : ""}`;

  const nowMs = Date.now();
  // Health signals: running requests that have been silent too long.
  const stuckRequests = metrics.series
    .filter((s) => s.status === "running" && s.startedAt !== null)
    .map((s) => ({ seq: s.seq, elapsed: Math.max(0, nowMs - (s.startedAt as number)) }))
    .filter((x) => x.elapsed > 60000);
  const stuckToolMs = 30000;

  const maxTurnMs = Math.max(1, ...metrics.turnDurations.map((td) => td.durationMs));

  const panels = ["overview", "analysis", "requests", "agents"] as const;
  return (
    <div ref={bindRoot} className="dshd-root" data-panel={panel}>
      <header className="dshd-dashboardHead">
        <div className="dshd-header">
          <span className="dshd-brandMark"><DashboardIcon name="pulse" /></span>
          <h1 className="dshd-title">{t("dashboard.title")}</h1>
        </div>
        <div className="dshd-navigation" role="group" aria-label={t("dashboard.navigation")}>
          {panels.map((item) => (
            <button key={item} type="button" className="dshd-navItem" aria-pressed={panel === item}
              onClick={() => { setRequestFilter("all"); setPanel(item); rootRef.current?.scrollTo({ top: 0 }); }}>
              <DashboardIcon name={item} />{t(`dashboard.${item}`)}
              {item === "requests" && metrics.failedRequests > 0 && <span className="dshd-navCount" data-error="true">{metrics.failedRequests}</span>}
              {item === "agents" && subagents.length > 0 && <span className="dshd-navCount">{subagents.length}</span>}
            </button>
          ))}
        </div>
        <div className="dshd-headerContext">
          <span className="dshd-sessionState" data-running={running}><span />{running ? t("hud.status.running") : t("hud.status.idle")}</span>
          {model !== null && <span className="dshd-modelBadge" title={model}>{model}</span>}
        </div>
      </header>
      {(panel === "overview" || panel === "agents") && <HudStrip data={hud} t={t} />}
      {!hasData && panel !== "agents" && <section className="dshd-emptyState"><DashboardIcon name="analysis" /><p>{t("empty")}</p></section>}
      {running ? (
        <div className="dshd-streamRow" role="status" aria-live="polite">
          <span className="dshd-streamDot" />
          <div className="dshd-streamBody">
            <div className="dshd-streamHead">
              <span className="dshd-streamText">
                {t("status.streaming")}
                {streamed.text > 0 ? ` ${exactNumber(streamed.text)} ${t("unit.char")}` : ""}
                {streamed.reasoning > 0 ? ` · ${t("tokens.reasoning")} ${exactNumber(streamed.reasoning)} ${t("unit.char")}` : ""}
              </span>
              {stuckRequests[0] !== undefined ? (
                <span className="dshd-streamWarn">
                  <span role="alert">{t("status.stuckAlert").replace("{n}", String(stuckRequests[0].seq))}</span>
                  {t("status.stuckTimer").replace("{s}", formatMs(stuckRequests[0].elapsed))}
                </span>
              ) : null}
              {runningCalls.at(-1) !== undefined ? (() => {
                const call = runningCalls.at(-1)!;
                const elapsed = Math.max(0, nowMs - call.time);
                return (
                  <span className={`dshd-streamTool${elapsed > stuckToolMs ? " dshd-streamWarn" : ""}`}>
                    {t("status.tool")} {call.name} · {formatMs(elapsed)}{runningCalls.length > 1 ? ` +${runningCalls.length - 1}` : ""}
                  </span>
                );
              })() : null}
            </div>
            <div className="dshd-streamLine" data-kind={liveItem?.kind ?? "empty"} aria-label={t("stream.liveOutput")} title={liveItem?.text || undefined}>
              <span className="dshd-streamMarker" aria-hidden="true">
                {liveItem?.kind === "reasoning" ? "Think" : liveItem?.kind === "text" ? "Output" : liveItem?.kind === "tool-call" ? "Tool" : "Live"}
              </span>
              <span className="dshd-streamSegmentLabel">
                {liveItem?.kind === "reasoning" ? t("stream.think") : liveItem?.kind === "text" ? t("stream.output") : liveItem?.kind === "tool-call" ? (liveItem.name || t("status.tool")) : t("stream.liveOutput")}
              </span>
              <span className="dshd-streamLineText">
                {livePreview || (liveItem?.kind === "reasoning" ? t("stream.onlyReasoning") : t("stream.fallback"))}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {panel === "overview" && hasData && <>
      <section className="dshd-sessionOverview" aria-label={t("section.overview")}>
        <div className="dshd-primaryMetric">
          <div className="dshd-recordHead">
            <div><h2>{t("dashboard.activityTitle")}</h2><p>{t("dashboard.activityNote")}</p></div>
            <div className="dshd-requestTotal"><strong className="dshd-heroValue">{exactNumber(metrics.requestCount)}</strong><span>{t("stat.requests")}</span><Hint label={t("hint.requests")} /></div>
          </div>
          <RequestActivity samples={metrics.series} t={t} />
          <div className="dshd-requestBreakdown">
            <span data-state="complete"><i />{metrics.completedRequests} {t("stat.requests.completed")}</span>
            <span data-state="running"><i />{metrics.runningRequests} {t("stat.requests.running")}</span>
            <button type="button" data-error={metrics.failedRequests > 0} onClick={() => { setRequestFilter(metrics.failedRequests > 0 ? "error" : "all"); setPanel("requests"); }}><i />{metrics.failedRequests} {t("stat.requests.error")}</button>
            <button type="button" className="dshd-openRequests" onClick={() => { setRequestFilter("all"); setPanel("requests"); }}>{t("dashboard.inspectRequests")}<DashboardIcon name="arrow" /></button>
          </div>
        </div>
        <aside className="dshd-sessionLedger" aria-label={t("dashboard.performance")}>
          <div className="dshd-ledgerHead"><DashboardIcon name="analysis" />{t("dashboard.performance")}</div>
          <StatCard label={t("stat.avgTtft")} value={metrics.avgTtftMs === null ? t("unknown") : formatMs(metrics.avgTtftMs)} hint={t("hint.avgTtft")} />
          <StatCard label={t("stat.decodeSpeed")} value={metrics.decodeTokensPerSec === null ? t("unknown") : `${Math.round(metrics.decodeTokensPerSec)} ${t("unit.tps")}`} hint={t("hint.decodeSpeed")} />
          <StatCard label={t("stat.cost")} value={fmtCost(metrics.costEstimateUsd.total)} hint={t("hint.cost")}
            sub={metrics.costEstimateUsd.unpricedRequests > 0 ? t("dashboard.unpriced").replace("{n}", String(metrics.costEstimateUsd.unpricedRequests)) : t("dashboard.costNote")} />
        </aside>
        <footer className="dshd-sessionFootnote"><span>{windowNote}</span><span>{metrics.turns} {t("stat.turns")}<b>/</b>{metrics.steps} {t("stat.steps")}</span></footer>
      </section>
      {/* Token usage */}
      <section className="dshd-card dshd-tokenPanel">
        <div className="dshd-cardHead">
          <DashboardIcon name="layers" /><span className="dshd-cardTitle">{t("section.tokens")}</span>
          <Hint label={`${t("tokens.formula")} · ${t("tokens.cacheNote")}`} />
        </div>
        <div className="dshd-tokenStats">
          <StatCard label={t("stat.inputTokens")} value={exactNumber(metrics.inputTokens)} hint={t("hint.inputTokens")} />
          <StatCard label={t("stat.outputTokens")} value={exactNumber(metrics.outputTokens)} hint={t("hint.outputTokens")} />
          {metrics.reasoningTokens > 0 && <StatCard
            label={t("stat.reasoningTokens")}
            value={exactNumber(metrics.reasoningTokens)}
            hint={t("hint.reasoningTokens")}
            sub={metrics.windowOutputTokens > 0 ? `${t("stat.reasoningShare")} ${Math.round((metrics.reasoningTokens / metrics.windowOutputTokens) * 100)}% (${t("role.windowNote")})` : undefined}
            tone="reasoning"
          />}
          <div className="dshd-cacheMetric">
            <span className="dshd-cacheRing" style={{ "--dshd-cache-angle": `${(metrics.cacheHitPercent ?? 0) * 3.6}deg` } as CSSProperties} aria-hidden="true" />
            <StatCard label={t("stat.cacheHitRate")} value={metrics.cacheHitPercent === null ? t("unknown") : `${metrics.cacheHitPercent}%`} hint={t("hint.cacheHitRate")} />
          </div>
        </div>
        <StackedBar data={tokenData} valueFormatter={(v) => exactNumber(v)} height={20} totalLabel={t("total")} />
      </section>

      <div className="dshd-grid2 dshd-overviewGrid">
        {/* Context pressure gauge + composition */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <DashboardIcon name="context" /><span className="dshd-cardTitle">{t("stat.contextOccupancy")}</span>
            <Hint label={t("hint.contextOccupancy")} />
          </div>
          {metrics.pressure?.projectedTokens === undefined || metrics.pressure.contextWindow === undefined ? (
            <div className="dshd-empty" style={{ padding: "22px 0" }}>{t("context.pressureMissing")}</div>
          ) : (
            <div className="dshd-gaugeRow">
              <div className="dshd-gaugeBox">
                <RadialGauge
                  value={metrics.pressure.projectedTokens}
                  max={metrics.pressure.contextWindow}
                  unit={t("unit.percent")}
                 ariaLabel={t("aria.gauge")} />
                <span className="dshd-gaugeLabel">
                  {exactNumber(metrics.pressure.projectedTokens)} / {exactNumber(metrics.pressure.contextWindow)}
                </span>
              </div>
              <div className="dshd-col" style={{ flex: 1, minWidth: 0 }}>
                {contextData.length === 0 ? (
                  <div className="dshd-empty">{t("context.note")}</div>
                ) : (
                  <StackedBar data={contextData} valueFormatter={(v) => exactNumber(v)} height={20} totalLabel={t("total")} />
                )}
              </div>
            </div>
          )}
        </section>

        {/* Timing */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <DashboardIcon name="clock" /><span className="dshd-cardTitle">{t("section.timing")}</span>
            <span className="dshd-cardHint">{t("stat.scopeAll")}</span>
          </div>
          <StackedBar
            data={[
              { label: t("timing.llm"), value: metrics.llmMs, color: CHART_COLORS.llm },
              { label: t("timing.tool"), value: metrics.toolMs, color: CHART_COLORS.toolTime }
            ]}
            valueFormatter={(v) => formatMs(v)}
            height={20}
            totalLabel={t("total")}
          />
          {metrics.ttftByCache.hitN + metrics.ttftByCache.missN > 0 ? (
            <div className="dshd-col">
              <div className="dshd-subTitle">{t("section.ttftByCache")}</div>
              <div className="dshd-kv">
                <div className="dshd-kvItem">
                  <span className="dshd-kvKey" style={{ color: "var(--dsw-alias-state-success-primary)" }}>
                    {t("ttftCache.hit")} ({metrics.ttftByCache.hitN})
                  </span>
                  <span className="dshd-kvValue">{metrics.ttftByCache.hitAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.hitAvgMs)}</span>
                </div>
                <div className="dshd-kvItem">
                  <span className="dshd-kvKey" style={{ color: "var(--dsw-alias-state-warn-primary)" }}>
                    {t("ttftCache.miss")} ({metrics.ttftByCache.missN})
                  </span>
                  <span className="dshd-kvValue">{metrics.ttftByCache.missAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.missAvgMs)}</span>
                </div>
              </div>
              <div className="dshd-muted" style={{ fontSize: 10.5 }}>{t("hint.ttftByCache")}</div>
            </div>
          ) : metrics.assistantTtft.length > 0 ? (
            <div className="dshd-muted" style={{ fontSize: 10.5 }}>{t("hint.ttftByCacheMiss")}</div>
          ) : null}
          {metrics.durationStats.sampleCount > 0 ? (
            <div className="dshd-col">
              <div className="dshd-subTitle">{t("section.durationDist")}</div>
              <div className="dshd-percRow">
                <span className="dshd-perc">P50 <b>{formatMs(metrics.durationStats.p50 ?? 0)}</b></span>
                <span className="dshd-perc">P95 <b>{formatMs(metrics.durationStats.p95 ?? 0)}</b></span>
                <span className="dshd-perc">P99 <b>{formatMs(metrics.durationStats.p99 ?? 0)}</b></span>
              </div>
              {(() => {
                const maxCount = Math.max(1, ...metrics.durationStats.buckets.map((b) => b.count));
                return (
                  <div className="dshd-hist">
                    {metrics.durationStats.buckets.map((b, i) => (
                      <div
                        key={i}
                        className="dshd-histCol"
                        title={`${formatMs(b.loMs)} – ${formatMs(b.hiMs)} · ${b.count}`}
                      >
                        <div
                          className="dshd-histBar"
                          style={{
                            height: `${b.count > 0 ? Math.max((b.count / maxCount) * 100, 8) : 0}%`,
                            background: CHART_COLORS.reasoning
                          }}
                        />
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : null}
        </section>

      </div>
      </>}
      {panel === "analysis" && hasData && <>
      <div className="dshd-analysisContext">
        <span>{t("analysis.loadedWindow")}<Hint label={windowNote} /></span>
        <span>{exactNumber(metrics.requestCount)} {t("models.requests")}</span>
        {metrics.retriedRequests > 0 && <span>{metrics.retriedRequests} {t("analysis.retries")}</span>}
        {metrics.failedRequests > 0 && <button type="button" onClick={() => { setRequestFilter("error"); setPanel("requests"); }}>{t("analysis.inspectErrors").replace("{n}", String(metrics.failedRequests))}<DashboardIcon name="requests" /></button>}
      </div>
      <div className="dshd-analysisWorkspace">
        <ToolAnalysis metrics={metrics} t={t} />
        <aside className="dshd-modelAnalysis">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("analysis.modelsTitle")}</span>
            {metrics.modelSwitchCount > 0 && <span className="dshd-cardHint">{metrics.modelSwitchCount} {t("stat.modelSwitches")}</span>}
          </div>
          <div className="dshd-modelList">
            {metrics.modelSplit.length === 0 && <div className="dshd-muted">{t("empty.requests")}</div>}
            {metrics.modelSplit.map((row) => <div className="dshd-modelDetail" key={`${row.provider}/${row.model}`}>
              <div className="dshd-modelIdentity"><span style={{ background: modelColor(row.model) }} /><strong>{row.model}</strong></div>
              <div className="dshd-modelProvider">{row.provider}</div>
              <dl className="dshd-modelFacts">
                <div><dt>{t("models.requests")}</dt><dd>{exactNumber(row.requests)}</dd></div>
                {row.errorCount > 0 && <div><dt>{t("stat.requests.error")}</dt><dd data-error="true">{row.errorCount}</dd></div>}
                <div><dt>{t("stat.inputTokens")}</dt><dd title={exactNumber(row.inputTokens)}>{compactNumber(row.inputTokens)}</dd></div>
                <div><dt>{t("stat.outputTokens")}</dt><dd title={exactNumber(row.outputTokens)}>{compactNumber(row.outputTokens)}</dd></div>
                <div><dt>{t("analysis.avgTime")}</dt><dd data-missing={row.avgDurationMs === null}>{row.avgDurationMs === null ? t("analysis.notReported") : formatMs(row.avgDurationMs)}</dd></div>
                <div><dt>{t("stat.avgTtft")}</dt><dd data-missing={row.avgTtftMs === null}>{row.avgTtftMs === null ? t("analysis.notReported") : formatMs(row.avgTtftMs)}</dd></div>
                <div><dt>{t("stat.cost")} <Hint label={t("hint.cost")} /></dt><dd data-missing={row.costUsd === null}>{row.costUsd === null ? t("analysis.notPriced") : fmtCost(row.costUsd)}</dd></div>
              </dl>
            </div>)}
          </div>
          {metrics.durationStats.sampleCount > 0 && <div className="dshd-analysisPercentiles">
            <span>{t("analysis.requestLatency")}</span>
            <span>P50 <b>{formatMs(metrics.durationStats.p50 ?? 0)}</b></span>
            <span>P95 <b>{formatMs(metrics.durationStats.p95 ?? 0)}</b></span>
          </div>}
          {metrics.modelSwitchCount > 0 && <ModelTimeline
            data={metrics.modelTimeline}
            switchSeqs={metrics.modelSwitchSeqs}
            emptyLabel={t("empty.requests")}
            onPick={openView !== undefined ? (seq) => jumpTo(seq) : undefined}
            note={metrics.modelTimeline.length > 60 ? `${t("trend.scopeNote")} 60 ${t("pager.items")}` : undefined}
            axisHint={t("trend.axisOldToNew")}
            ariaLabel={t("aria.modelTimeline")}
          />}
        </aside>
      </div>
      <div className="dshd-analysisSupport">
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.turns")}</span>
            <Hint label={t("hint.turnDurations")} />
          </div>
          {metrics.turnDurations.length === 0 ? <div className="dshd-muted">{t("unknown")}</div> : (
            <div className="dshd-turnList">
              {metrics.turnDurations.map((td) => (
                <div key={td.turn} className="dshd-turnRow" title={td.closed ? undefined : t("hint.turnOpen")}>
                  <span className="dshd-turnName">{t("turns.label")}{td.turn}{td.closed ? "" : " ~"}</span>
                  <span className="dshd-turnTrack"><span className="dshd-turnFill" style={{ width: `${td.durationMs / maxTurnMs * 100}%` }} /></span>
                  <span className="dshd-turnValue">{formatMs(td.durationMs)}</span>
                </div>
              ))}
            </div>
          )}
          {turnTimings.size > metrics.turnDurations.length && <div className="dshd-analysisFootnote">{t("hint.turnTail")}</div>}
        </section>

        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.messages")}</span>
            <span className="dshd-cardHint">{exactNumber(metrics.roles.total)} {t("analysis.messages")}</span>
          </div>
          {metrics.roles.total === 0 && <div className="dshd-muted">{t("unknown")}</div>}
          <div className="dshd-compositionBar" aria-hidden="true">{roleData.map((row) => <span key={row.label} style={{ flex: row.value, background: row.color }} />)}</div>
          <div className="dshd-compositionRows">{roleData.map((row) => <div key={row.label}>
            <span><i style={{ background: row.color }} />{row.label}</span>
            <strong>{exactNumber(row.value)}</strong>
            <span>{Math.round(row.value / metrics.roles.total * 100)}%</span>
          </div>)}</div>
        </section>

        {metrics.contextInjection.length > 0 && <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.contextInjection")}</span>
            <Hint label={t("hint.contextInjection")} />
          </div>
          <div className="dshd-injectionRows">{metrics.contextInjection.map((row) => <div key={`${row.label}/${row.form}/${row.role}`} title={row.role === "recall" ? t("contextRole.recall") : t("contextRole.inject")}>
            <div><strong>{row.label}</strong><span className="dshd-formBadge" data-f={row.form}>{formLabel(row.form)}</span></div>
            <span>{row.count} {t("analysis.injections")}<b>{compactNumber(row.chars)} {t("unit.char")}</b></span>
          </div>)}</div>
        </section>}

      </div>
      <details className="dshd-analysisDiagnostics">
        <summary>{t("analysis.diagnostics")}<span>{t("analysis.diagnosticsNote")}</span><DashboardIcon name="chevron" /></summary>
        <div className="dshd-analysisDiagnosticGrid">
        {/* Reasoning effort distribution */}
        {metrics.effortStats.some((e) => e.reasoningTokens > 0 || e.effort !== "default") ? (
          <section className="dshd-card">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.effort")}</span>
            </div>
            <div className="dshd-col">
              {metrics.effortStats.map((e) => (
                <div key={e.effort} className="dshd-errRow" title={t("hint.effort")}>
                  <span className="dshd-errMsg">{e.effort}</span>
                  <span className="dshd-neutralCount">
                    {exactNumber(e.requests)} · {compactNumber(e.reasoningTokens)} {t("tokens.reasoning")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Anomalies */}
        {errorRows.length > 0 ? (
          <section className="dshd-card dshd-diagnostic">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.errors")}</span>
            </div>
            <HorizontalBars data={errorRows} valueFormatter={(v) => exactNumber(v)} />
            {metrics.commandRows.length > 0 ? (
              <div className="dshd-col">
                <div className="dshd-subTitle">{t("section.commands")}</div>
                {metrics.commandRows.map((c) => (
                  <div key={c.name} className="dshd-errRow">
                    <span className="dshd-errMsg">{c.name}</span>
                    <span className="dshd-errCount">×{c.count}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {metrics.retriedRequests > 0 ? (
              <div className="dshd-subTitle" style={{ marginTop: 8 }}>
                {t("stat.retryWait")} {formatMs(metrics.retryWaitMs)} · {t("stat.retried")} {exactNumber(metrics.retriedRequests)}
              </div>
            ) : null}
            {metrics.failedStats.count > 0 && metrics.completedStats.count > 0 ? (
              <div className="dshd-subTitle" style={{ marginTop: 8 }}>
                {t("hint.failedProfile").replace("{a}", metrics.failedStats.avgDurationMs === null ? "—" : formatMs(metrics.failedStats.avgDurationMs)).replace("{b}", metrics.completedStats.avgDurationMs === null ? "—" : formatMs(metrics.completedStats.avgDurationMs))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* Error classification */}
        {metrics.topErrors.length > 0 ? (
          <section className="dshd-card dshd-diagnostic">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.errorTop")}</span>
            </div>
            <div className="dshd-col">
              {metrics.topErrors.map((e) => (
                <div key={e.message} className="dshd-errRow" title={e.message}>
                  <span className="dshd-errMsg">{e.message}</span>
                  <span className="dshd-errCount">×{e.count}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Compaction effect */}
        {metrics.compactionEffect.length > 0 ? (
          <section className="dshd-card dshd-diagnostic">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.compaction")}</span>
              <span className="dshd-cardHint">{t("hint.compactionEffect")}</span>
            </div>
            <div className="dshd-col">
              {metrics.compactionEffect.map((e) => (
                <div key={e.seq} className="dshd-compactRow" title={`${t("req.seq")} ${e.seq}`}>
                  <span className="dshd-compactSeq">{t("turns.label")}{e.turn}</span>
                  <span className="dshd-compactArrow">
                    {e.beforeTokens === null ? t("unknown") : exactNumber(e.beforeTokens)}
                    {" → "}
                    {e.afterTokens === null ? t("unknown") : exactNumber(e.afterTokens)}
                  </span>
                  {e.recoveredTokens !== null ? (
                    <span className="dshd-compactRecovered">
                      −{exactNumber(e.recoveredTokens)} ({e.recoveredPct}%)
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Agent-health diagnostics: loops / no-progress / tool storm */}
        {metrics.loops.length > 0 || metrics.noProgress.length > 0 || metrics.toolStorm.some((b) => b.calls > 0) ? (
          <section className="dshd-card dshd-diagnostic">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.health")}</span>
              <Hint label={t("hint.health")} />
            </div>
            <div className="dshd-col">
              {metrics.loops.map((l) => (
                <div key={`${l.name}${l.count}`} className="dshd-errRow" title={`${t("hint.loop")} ${l.seqs.join(", ")}`}>
                  <span className="dshd-healthTag" data-k="loop">{t("health.loop")}</span>
                  <span className="dshd-errMsg">{l.name}</span>
                  <span className="dshd-errCount">×{l.count}</span>
                </div>
              ))}
              {metrics.noProgress.map((p) => (
                <div key={p.seq} className="dshd-errRow" title={`${t("req.seq")} ${p.seq}`}>
                  <span className="dshd-healthTag" data-k="noProgress">{t("health.noProgress")}</span>
                  <span className="dshd-errMsg">{t("hint.noProgress")}</span>
                  <span className="dshd-errCount">
                    {t("turns.label")}{p.turn} · {p.outputTokens} {t("unit.tokens")} · {p.toolCalls} {t("req.toolCalls")}
                  </span>
                </div>
              ))}
            </div>
            {metrics.toolStorm.some((b) => b.calls > 0) ? (
              <div style={{ marginTop: 8 }}>
                <div className="dshd-subTitle">{t("trend.toolStorm")}</div>
                <SeriesBars
                  series={metrics.toolStorm.map((b) => ({
                    label: new Date(b.bucketMs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    value: b.calls,
                    color: CHART_COLORS.toolTime
                  }))}
                  height={54}
                  emptyLabel={t("empty.requests")}
                  showMaxTag
                 ariaLabel={t("aria.trend")} />
              </div>
            ) : null}
          </section>
        ) : null}
        </div>
      </details>
      </>}

      {/* Request trend */}
      {panel === "requests" && hasData && <section className="dshd-card dshd-requestCard">
        <div className="dshd-cardHead">
          <span className="dshd-cardTitle">{t("section.requests")}</span>
          <span className="dshd-cardHint">{windowNote}</span><Hint label={t("req.rowHint.expand")} />
        </div>
        <TrendSection metrics={metrics} t={t} onJump={jumpTo} jumpTo={jumpTo} initialFilter={requestFilter} />
      </section>}

      {panel === "agents" && <section className="dshd-agentPanel"><BoardBody {...props} /></section>}
    </div>
  );
}
