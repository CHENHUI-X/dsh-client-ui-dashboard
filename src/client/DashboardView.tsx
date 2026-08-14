/**
 * The dashboard view: one `conversation.view` tab entry that renders live
 * metrics of the current session. Reads everything through the framework
 * standard kit (`useSession` + `useProjection`) so it updates in real time as
 * session events land, with no host round-trips of its own.
 *
 * View linkage: when the conversation plugin's shared store handle is
 * declared on this entry (see client/index.ts), the renderer hands us the
 * shared `actions` seat — clicking a request row then switches to the
 * trajectory view and inspects the request's first tool call, exactly like
 * the chat view's own inspect handoff.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "@deepseek-ai/dsh-client-ui-primitives";
import type { ConvViewProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale, SnapshotSelectorHook } from "@deepseek-ai/dsh-client-ui-slots";
import type { NS } from "./locales";
import { deriveMetrics } from "./metrics";
import type { DashboardMetrics, RequestDetail, RequestSample } from "./metrics";
import { CHART_COLORS } from "./dashboard.css";
import {
  AreaChart,
  DonutChart,
  HorizontalBars,
  Legend,
  ModelTimeline,
  RadialGauge,
  SeriesBars,
  Sparkline,
  StackedBar,
  compactNumber,
  exactNumber,
  formatMs,
  modelColor
} from "./charts";
import type { ChartDatum, RowDatum, SeriesDatum } from "./charts";

/** The shared conversation store's action surface (structural subset). */
interface SharedChatActions {
  select(target: { turnSeq: number; stepSeq?: number; callId?: string; toolName?: string } | null): void;
  setDraft(text: string): void;
  setView(view: string | null): void;
  setInspect(target: { callId: string } | null): void;
}

export type DashboardViewProps = ConvViewProps &
  PropsLocale<typeof NS> & {
    useStore?: SnapshotSelectorHook<unknown>;
    actions?: SharedChatActions;
  };

/** Categorical palette for non-model series (tool names, commands): deterministic,
 *  distinct hues in every theme. Models use the shared `modelColor` hash so the
 *  model bars and the model timeline never disagree on a color. */
const TOOL_COLORS: readonly string[] = [
  "var(--dsw-alias-state-warn-primary)",
  "var(--dsw-alias-state-business-primary)",
  "var(--dsw-alias-state-success-primary)",
  "var(--dsw-alias-state-error-primary)",
  "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
  "color-mix(in srgb, var(--dsw-alias-state-error-primary) 60%, var(--dsw-alias-state-warn-primary) 40%)"
];

/** Small "?" anchor that explains a metric on hover. */
function Hint(props: { label: string }): JSX.Element {
  return (
    <Tooltip label={props.label} side="top" delayMs={450} maxWidth={260}>
      <span className="dshd-hint" role="button" tabIndex={0} aria-label={props.label}>?</span>
    </Tooltip>
  );
}

/** Adaptive USD formatting: fewer decimals for larger amounts, never "$0.0000". */
function fmtCost(v: number): string {
  if (v <= 0) return "$0";
  if (v >= 1) return `$${v.toFixed(2)}`;
  if (v >= 0.01) return `$${v.toFixed(4)}`;
  return "<$0.0001";
}

function StatCard(props: {
  label: string;
  value: string;
  sub?: string;
  hint?: string;
  tone?: "accent" | "good" | "warn" | "bad" | "reasoning";
  spark?: { values: readonly number[]; color: string; title?: string };
}): JSX.Element {
  const { label, value, sub, hint, tone, spark } = props;
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
      {spark !== undefined && spark.values.length >= 2 ? (
        <div className="dshd-statSpark" title={spark.title}>
          <Sparkline values={spark.values} color={spark.color} />
        </div>
      ) : null}
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
              {call.isError ? <span className="dshd-toolErr">⚠</span> : null}
              <span className="dshd-toolDur">{call.durationMs === null ? t("unknown") : formatMs(call.durationMs)}</span>
            </div>
          ))
        )}
      </div>

      {detail.error !== null ? (
        <div>
          <div className="dshd-kvKey" style={{ marginBottom: "4px" }}>{t("req.error")}</div>
          <div className="dshd-errorBox">{detail.error}</div>
        </div>
      ) : null}
    </div>
  );
}

function TrendSection(props: {
  metrics: DashboardMetrics;
  t: DashboardViewProps["t"];
  actions?: SharedChatActions;
  jumpTo: (seq: number) => void;
}): JSX.Element {
  const { metrics, t, actions, jumpTo } = props;
  const [openSeq, setOpenSeq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<"all" | "running" | "complete" | "error">("all");
  const [newArrived, setNewArrived] = useState(false);
  const lastSeqRef = useRef<number | null>(null);
  /** Rows rendered per group before a "more rows exist" note (DOM cap for long sessions). */
  const GROUP_ROW_CAP = 20;
  const canJump = actions !== undefined;
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
        const d = metrics.details.find((x) => x.seq === s.seq);
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
          costUsd: d?.costUsd ?? 0,
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
    const d = metrics.details.find((x) => x.seq === s.seq);
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
    const detail = metrics.details.find((d) => d.seq === s.seq);
    const open = openSeq === s.seq;
    const isError = s.status === "error";
    const jumpMode = canJump && !isError;
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
                ▸
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
              onJump={canJump ? () => jumpTo(s.seq) : undefined}
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
    color: CHART_COLORS.output
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
      <div className="dshd-seriesRow">
        <div className="dshd-seriesCol">
          <div className="dshd-seriesLabel">
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheRead, display: "inline-block" }} />
            {t("trend.cacheHit")}
            <span className="dshd-seriesTotal">{metrics.cacheHitPercent === null ? "—" : `${metrics.cacheHitPercent}%`}</span>
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
            <span style={{ width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.output, display: "inline-block" }} />
            {t("trend.rateFailed")}
            <span className="dshd-seriesTotal">{exactNumber(totalFailed)}</span>
          </div>
          <AreaChart
            series={rateFailBars}
            height={60}
            color={CHART_COLORS.output}
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
                  <span className="dshd-chevron" data-open={isCollapsed ? undefined : true}>▸</span>
                  <span className="dshd-groupName">{g.label}</span>
                  <span className="dshd-groupStats">
                    {g.items.length} {t("pager.items")} · {t("trend.input")} {compactNumber(inSum)} · {t("trend.output")} {compactNumber(outSum)}
                    {durN > 0 ? ` · ${t("trend.duration")} ${formatMs(Math.round(durSum / durN))}` : ""}
                    {errN > 0 ? ` · ⚠ ${errN}` : ""}
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

/** The dashboard conversation-view entry. */
export function DashboardView(props: DashboardViewProps): JSX.Element {
  const { useSession, useProjection, t, actions } = props;
  const trajectory = useSession((s) => s.views.get("trajectory"));
  const nodes = useSession((s) => s.chat.legacy.nodes);
  const turnTimings = useSession((s) => s.turnTimings);
  const running = useSession((s) => s.running) === true;
  const partial = useSession((s) => s.partial);
  const runningCalls = useSession((s) => s.runningCalls);
  const hasMore = useSession((s) => s.hasMore) === true;
  // While a generation is running, tick once per second so the live stream
  // line and elapsed timers stay current even when session events are sparse.
  const [clock, setClock] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setClock((c) => c + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const tokenUsage = useProjection("tokenUsage");
  const stats = useProjection("sessionStats");
  const context = useProjection("contextBreakdown");
  const pressure = useProjection("contextPressure");

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
    [running, nodes, turnTimings, trajectory, tokenUsage, stats, context, pressure]
  );

  const hasData =
    metrics.turns > 0 ||
    metrics.steps > 0 ||
    metrics.requestCount > 0 ||
    metrics.inputTokens > 0 ||
    metrics.roles.total > 0;

  // Trajectory handoff (shared by the request table and the model timeline): a compacted marker has no callId, so anchor to the
  // nearest tool call (see the detail comments below).
  const findAnchor = (seq: number): RequestDetail | undefined => {
    const own = metrics.details.find((d) => d.seq === seq);
    if (own !== undefined && own.toolCalls.length > 0) return own;
    const after = metrics.details
      .filter((d) => d.seq > seq && d.toolCalls.length > 0)
      .sort((a, b) => a.seq - b.seq)[0];
    const before = metrics.details
      .filter((d) => d.seq < seq && d.toolCalls.length > 0)
      .sort((a, b) => b.seq - a.seq)[0];
    if (after === undefined) return before;
    if (before === undefined) return after;
    return after.seq - seq <= seq - before.seq ? after : before;
  };

  const jumpTo = (seq: number): void => {
    if (actions === undefined) return;
    const detail = metrics.details.find((d) => d.seq === seq);
    if (detail === undefined) return;
    const anchor = findAnchor(seq);
    if (anchor !== undefined) {
      const call = anchor.toolCalls[0]!;
      actions.select({
        turnSeq: Math.max(1, anchor.turn),
        stepSeq: anchor.step,
        callId: call.callId
      });
      actions.setInspect({ callId: call.callId });
    } else {
      actions.select({ turnSeq: Math.max(1, detail.turn), stepSeq: detail.step });
      actions.setInspect(null);
    }
    actions.setView("trajectory");
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

  if (!hasData) {
    return (
      <div className="dshd-root">
        <div className="dshd-header">
          <div className="dshd-title">
            <span>{t("view.dashboard")}</span>
          </div>
          <span className="dshd-live" data-off={running ? undefined : true}>
            <span className="dshd-liveDot" />
            {running ? t("status.running") : t("status.idle")}
          </span>
        </div>
        <div className="dshd-empty">{t("empty")}</div>
      </div>
    );
  }

  const tokenData: ChartDatum[] = [
    { label: t("tokens.input"), value: Math.max(0, metrics.inputTokens - metrics.cacheReadTokens - metrics.cacheWriteTokens), color: CHART_COLORS.input },
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

  const model = metrics.series[0]?.model ?? null;

  const toolRows = metrics.toolHistogram.slice(0, 8).map((h, i) => ({
    label: h.name,
    value: h.count,
    color: TOOL_COLORS[i % TOOL_COLORS.length] ?? CHART_COLORS.llm,
    errorMark: h.errorCount > 0,
    sub: h.errorCount > 0 ? `${h.errorCount}/${h.count} (${Math.round((h.errorCount / Math.max(1, h.count)) * 100)}%)` : undefined
  }));

  const modelRows = metrics.modelSplit.map((m) => ({
    label: m.model,
    value: m.inputTokens + m.outputTokens,
    color: modelColor(m.model),
    title: `${m.provider} · avg duration ${m.avgDurationMs === null ? t("unknown") : formatMs(m.avgDurationMs)} · avg TTFT ${m.avgTtftMs === null ? t("unknown") : formatMs(m.avgTtftMs)} · ${m.errorCount} ${t("req.error")}`,
    sub: `${m.requests} ${t("models.requests")} · ${compactNumber(m.inputTokens)}→${compactNumber(m.outputTokens)} · ${fmtCost(m.costUsd)}${m.avgDurationMs !== null ? ` · ${formatMs(m.avgDurationMs)}` : ""}${m.errorCount > 0 ? ` · ${m.errorCount}⚠` : ""}`
  }));

  const errorRows: RowDatum[] = [
    { label: t("stat.turnErrors"), value: metrics.anomalies.turnErrors, color: CHART_COLORS.output },
    { label: t("stat.maxTokenHits"), value: metrics.anomalies.maxTokenHits, color: CHART_COLORS.cacheWrite },
    { label: t("stat.retries"), value: metrics.anomalies.modelRetries, color: CHART_COLORS.reasoning },
    { label: t("stat.interrupted"), value: metrics.anomalies.interrupted, color: CHART_COLORS.other },
    { label: t("stat.commands"), value: metrics.anomalies.commands, color: CHART_COLORS.steering }
  ].filter((r) => r.value > 0);

  const windowNote = `${t("role.windowNote")}${hasMore ? t("windowNote.more") : ""}`;

  // Streamed chars split by block kind (text vs reasoning).
  const streamed = (() => {
    if (partial === null) return { text: 0, reasoning: 0 };
    let text = 0;
    let reasoning = 0;
    for (const b of partial.blocks) {
      if (!("text" in b) || typeof b.text !== "string") continue;
      if (b.kind === "reasoning") reasoning += b.text.length;
      else if (b.kind === "text") text += b.text.length;
    }
    return { text, reasoning };
  })();
  const streamingChars = streamed.text + streamed.reasoning;
  const nowMs = Date.now();
  // Health signals: running requests that have been silent too long.
  const stuckRequests = metrics.series
    .filter((s) => s.status === "running" && s.startedAt !== null)
    .map((s) => ({ seq: s.seq, elapsed: Math.max(0, nowMs - (s.startedAt as number)) }))
    .filter((x) => x.elapsed > 60000);
  const stuckToolMs = 30000;

  const maxTurnMs = Math.max(1, ...metrics.turnDurations.map((td) => td.durationMs));

  // Sparkline feeds (oldest → newest window samples for the key StatCards).
  const windowSamples = metrics.series.slice(0, 60).reverse();
  const sparkInput = windowSamples.map((s) => s.inputTokens);
  const sparkOutput = windowSamples.map((s) => s.outputTokens);
  const sparkHit = windowSamples
    .filter((s) => s.inputTokens > 0)
    .map((s) => Math.round((s.cacheReadTokens / s.inputTokens) * 100));
  const sparkDuration = windowSamples
    .map((s) => s.durationMs)
    .filter((v): v is number => v !== null);

  // Sticky summary strip: core state always in view while scrolling.
  const summary: { label: string; value: string }[] = [
    { label: t("stat.requests"), value: exactNumber(metrics.requestCount) },
    { label: t("stat.requests.completed"), value: exactNumber(metrics.completedRequests) },
    { label: t("stat.requests.error"), value: exactNumber(metrics.failedRequests) }
  ];
  if (metrics.durationStats.p50 !== null) {
    summary.push({ label: "P50", value: formatMs(metrics.durationStats.p50) });
  }
  if (metrics.compactionRequests > 0) {
    summary.push({ label: t("stat.compactions"), value: exactNumber(metrics.compactionRequests) });
  }
  if (metrics.costEstimateUsd.total > 0) {
    summary.push({ label: t("stat.cost"), value: metrics.costEstimateUsd.total <= 0 ? "—" : fmtCost(metrics.costEstimateUsd.total) });
  }

  return (
    <div className="dshd-root">
      <div className="dshd-header">
        <div className="dshd-title">
          <span>{t("view.dashboard")}</span>
        </div>
        <span className="dshd-live" data-off={running ? undefined : true}>
          <span className="dshd-liveDot" />
          {running ? t("status.running") : t("status.idle")}
        </span>
        {model !== null ? <span className="dshd-chip" title={model}>{model}</span> : null}
        {metrics.modelSwitchCount > 0 ? (
          <span className="dshd-chip" title={t("hint.modelSwitches")}>{t("stat.modelSwitches")} ×{metrics.modelSwitchCount}</span>
        ) : null}
        <span className="dshd-spacer" />
        <span className="dshd-muted" style={{ fontSize: 11 }}>{windowNote}</span>
      </div>
      <div className="dshd-summary" role="complementary" aria-label={t("section.summary")}>
        {summary.map((s) => (
          <span key={s.label} className="dshd-summaryItem" title={s.label}>
            <span className="dshd-summaryLabel">{s.label}</span>
            <span className="dshd-summaryValue">{s.value}</span>
          </span>
        ))}
      </div>
      {running ? (
        <div className="dshd-streamRow">
          <span className="dshd-streamDot" />
          <span className="dshd-streamText">
            {t("status.streaming")}
            {streamed.text > 0 ? ` ${exactNumber(streamed.text)} ${t("unit.char")}` : ""}
            {streamed.reasoning > 0 ? ` · ${t("tokens.reasoning")} ${exactNumber(streamed.reasoning)} ${t("unit.char")}` : ""}
          </span>
          {stuckRequests.map((x) => (
            <span key={`stuck${x.seq}`} className="dshd-streamWarn">
              <span role="alert">{t("status.stuckAlert").replace("{n}", String(x.seq))}</span>
              {t("status.stuckTimer").replace("{s}", formatMs(x.elapsed))}
            </span>
          ))}
          {runningCalls.map((c) => {
            const elapsed = Math.max(0, nowMs - c.time);
            return (
              <span key={c.callId} className={`dshd-streamTool${elapsed > stuckToolMs ? " dshd-streamWarn" : ""}`}>
                {t("status.tool")} {c.name} · {formatMs(elapsed)}
              </span>
            );
          })}
        </div>
      ) : null}

      {/* Overview */}
      <section className="dshd-card">
        <div className="dshd-cardHead">
          <span className="dshd-cardTitle">{t("section.overview")}</span>
        </div>
        <div className="dshd-stats">
          <StatCard label={t("stat.turns")} value={exactNumber(metrics.turns)} hint={t("hint.turns")} />
          <StatCard label={t("stat.steps")} value={exactNumber(metrics.steps)} hint={t("hint.steps")} />
          <StatCard
            label={t("stat.requests")}
            value={exactNumber(metrics.requestCount)}
            hint={t("hint.requests")}
            sub={`${metrics.completedRequests} ${t("stat.requests.completed")} · ${metrics.runningRequests} ${t("stat.requests.running")} · ${metrics.failedRequests} ${t("stat.requests.error")}`}
            tone={metrics.failedRequests > 0 ? "warn" : undefined}
          />
          <StatCard label={t("stat.tools")} value={exactNumber(metrics.toolCallCount)} hint={t("hint.tools")} sub={metrics.toolErrorCount > 0 ? `${metrics.toolErrorCount} ${t("stat.toolErrors")} (${Math.round((metrics.toolErrorCount / Math.max(1, metrics.toolCallCount)) * 100)}%)` : undefined} tone={metrics.toolErrorCount > 0 ? "bad" : undefined} />
          <StatCard label={t("stat.compactions")} value={exactNumber(metrics.compactionRequests)} hint={t("hint.compactions")} />
          <StatCard
            label={t("stat.compactionRecovered")}
            value={metrics.compactionRecoveredTokens === null ? t("unknown") : compactNumber(metrics.compactionRecoveredTokens)}
            hint={t("hint.compactionRecovered")}
            sub={metrics.compactionRequests > 0 ? `${compactNumber(metrics.compactionRequests)} ${t("stat.compactions")}${metrics.compactionRecoveredItems === null ? "" : ` · ${compactNumber(metrics.compactionRecoveredItems)} ${t("stat.compactionItems")}`}` : undefined}
          />
          <StatCard label={t("stat.modelSwitches")} value={exactNumber(metrics.modelSwitchCount)} hint={t("hint.modelSwitches")} />
          <StatCard
            label={t("stat.cost")}
            value={metrics.costEstimateUsd.total <= 0 ? "—" : fmtCost(metrics.costEstimateUsd.total)}
            hint={t("hint.cost")}
            sub={metrics.costEstimateUsd.cacheSavings > 0 ? `${t("stat.costSavings")} ${fmtCost(metrics.costEstimateUsd.cacheSavings)}` : undefined}
          />
          <StatCard
            label={t("stat.totalDuration")}
            value={formatMs(metrics.totalDurationMs)}
            hint={t("hint.totalDuration")}
            spark={{ values: sparkDuration, color: CHART_COLORS.reasoning, title: t("trend.newestRight") }}
          />
          <StatCard
            label={t("stat.avgTtft")}
            value={metrics.avgTtftMs === null ? t("unknown") : formatMs(metrics.avgTtftMs)}
            hint={t("hint.avgTtft")}
            sub={metrics.ttftSteps > 0 ? `${metrics.ttftSteps} ${t("timing.ttft")} · ${t("stat.scopeAll")}` : undefined}
          />
          <StatCard
            label={t("stat.decodeSpeed")}
            value={metrics.decodeTokensPerSec === null ? t("unknown") : `${Math.round(metrics.decodeTokensPerSec)} ${t("unit.tps")}`}
            hint={t("hint.decodeSpeed")}
            sub={`${compactNumber(metrics.decodeTokens)} ${t("trend.output")} / ${formatMs(metrics.decodeMs)}`}
          />
        </div>
      </section>

      {/* Token usage */}
      <section className="dshd-card">
        <div className="dshd-cardHead">
          <span className="dshd-cardTitle">{t("section.tokens")}</span>
          <span className="dshd-cardHint">{t("tokens.formula")} · {t("tokens.cacheNote")}</span>
        </div>
        <div className="dshd-stats">
          <StatCard label={t("stat.inputTokens")} value={exactNumber(metrics.inputTokens)} hint={t("hint.inputTokens")} tone="accent" spark={{ values: sparkInput, color: CHART_COLORS.input, title: t("trend.newestRight") }} />
          <StatCard label={t("stat.outputTokens")} value={exactNumber(metrics.outputTokens)} hint={t("hint.outputTokens")} sub={metrics.reasoningTokens > 0 ? `${t("tokens.reasoning")} ${compactNumber(metrics.reasoningTokens)}` : undefined} spark={{ values: sparkOutput, color: CHART_COLORS.output, title: t("trend.newestRight") }} />
          <StatCard
            label={t("stat.reasoningTokens")}
            value={exactNumber(metrics.reasoningTokens)}
            hint={t("hint.reasoningTokens")}
            sub={metrics.windowOutputTokens > 0 ? `${t("stat.reasoningShare")} ${Math.round((metrics.reasoningTokens / metrics.windowOutputTokens) * 100)}% (${t("role.windowNote")})` : undefined}
            tone={metrics.reasoningTokens > 0 ? "reasoning" : undefined}
          />
          <StatCard label={t("stat.cacheHitRate")} value={metrics.cacheHitPercent === null ? t("unknown") : `${metrics.cacheHitPercent}${t("unit.percent")}`} hint={t("hint.cacheHitRate")} tone={metrics.cacheHitPercent !== null && metrics.cacheHitPercent >= 60 ? "good" : metrics.cacheHitPercent !== null && metrics.cacheHitPercent > 0 ? "accent" : undefined} sub={metrics.cacheHitPercent === null ? undefined : `${t("stat.cacheRead")} ${compactNumber(metrics.cacheReadTokens)} / ${t("stat.inputTokens")} ${compactNumber(metrics.inputTokens)}`} spark={{ values: sparkHit, color: CHART_COLORS.cacheRead, title: t("trend.newestRight") }} />
        </div>
        <StackedBar data={tokenData} valueFormatter={(v) => exactNumber(v)} height={20} totalLabel={t("total")} />
      </section>

      <div className="dshd-grid2">
        {/* Context pressure gauge + composition */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("stat.contextOccupancy")}</span>
            <span className="dshd-cardHint">{t("hint.contextOccupancy")}</span>
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

        {/* Context-injection sources */}
        {metrics.contextInjection.length > 0 ? (
          <section className="dshd-card">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.contextInjection")}</span>
              <span className="dshd-cardHint">{t("hint.contextInjection")}</span>
            </div>
            <div className="dshd-col">
              {metrics.contextInjection.map((c) => (
                <div
                  key={`${c.label}${c.form}`}
                  className="dshd-errRow"
                  title={`${c.role === "recall" ? t("contextRole.recall") : t("contextRole.inject")} · ${formLabel(c.form)}`}
                >
                  <span className="dshd-errMsg">
                    {c.label}
                    <span className="dshd-formBadge" data-f={c.form}>{formLabel(c.form)}</span>
                  </span>
                  <span className="dshd-errCount">
                    ×{c.count} · {compactNumber(c.chars)} {t("unit.char")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Messages */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.messages")}</span>
            <span className="dshd-cardHint">{windowNote}</span>
          </div>
          {metrics.roles.total === 0 ? (
            <div className="dshd-empty">{t("unknown")}</div>
          ) : (
            <div className="dshd-donutRow">
              <DonutChart data={roleData} centerValue={String(metrics.roles.total)} centerLabel={t("section.messages")}  ariaLabel={t("aria.donut")} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Legend data={roleData} percent />
              </div>
            </div>
          )}
        </section>

        {/* Timing */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.timing")}</span>
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

        {/* Turn durations */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.turns")}</span>
            <span className="dshd-cardHint">{t("hint.turnDurations")}</span>
          </div>
          {metrics.turnDurations.length === 0 ? (
            <div className="dshd-empty" style={{ padding: "18px 0" }}>{t("unknown")}</div>
          ) : (
            <div className="dshd-turnList">
              {metrics.turnDurations.map((td) => (
                <div key={td.turn} className="dshd-turnRow" title={td.closed ? undefined : t("hint.turnOpen")}>
                  <span className="dshd-turnName">{t("turns.label")}{td.turn}{td.closed ? "" : " ~"}</span>
                  <span className="dshd-turnTrack">
                    <span className="dshd-turnFill" style={{ width: `${(td.durationMs / maxTurnMs) * 100}%` }} />
                  </span>
                  <span className="dshd-turnValue">{formatMs(td.durationMs)}</span>
                </div>
              ))}
            </div>
          )}
          {turnTimings.size > metrics.turnDurations.length ? (
            <div className="dshd-muted" style={{ fontSize: 11, marginTop: 6 }}>{t("hint.turnTail")}</div>
          ) : null}
        </section>

        {/* Tool histogram */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.tools")}</span>
            <span className="dshd-cardHint">{t("tools.note")}</span>
          </div>
          <HorizontalBars data={toolRows} valueFormatter={(v) => exactNumber(v)} />
          {metrics.toolHistogram.length > 8 ? (
            <div className="dshd-muted" style={{ fontSize: 11 }}>{t("req.toolTail").replace("{n}", String(metrics.toolHistogram.length - 8))}</div>
          ) : null}
          {metrics.toolDurationTop.length > 0 ? (
            <div className="dshd-col">
              <div className="dshd-subTitle">{t("tools.durationTop")}</div>
              <HorizontalBars
                data={metrics.toolDurationTop.slice(0, 5).map((r, i) => ({
                  label: r.name,
                  value: r.totalMs,
                  color: TOOL_COLORS[i % TOOL_COLORS.length] ?? CHART_COLORS.llm,
                  sub: `${t("tools.avgDuration")} ${formatMs(r.avgMs)} · ${r.calls}`
                }))}
                valueFormatter={(v) => formatMs(v)}
              />
            </div>
          ) : null}
        </section>

        {/* Model usage */}
        <section className="dshd-card">
          <div className="dshd-cardHead">
            <span className="dshd-cardTitle">{t("section.models")}</span>
            <span className="dshd-cardHint">{t("hint.modelTimeline")}</span>
          </div>
          <HorizontalBars data={modelRows} valueFormatter={(v) => exactNumber(v)} subBelow />
          {metrics.modelSplit.length > 1 ? (
            <div style={{ marginTop: 8 }}>
              <StackedBar
                data={metrics.modelSplit.map((m) => ({ label: m.model, value: m.costUsd, color: modelColor(m.model) }))}
                valueFormatter={(v) => fmtCost(v)}
                height={20}
                totalLabel={t("section.modelCost")}
              />
              <div className="dshd-muted" style={{ fontSize: 10.5 }}>{t("hint.modelCost")}</div>
            </div>
          ) : null}
          {metrics.modelTimeline.length > 0 ? (
            <div style={{ marginTop: 10 }}>
              <ModelTimeline
                data={metrics.modelTimeline}
                switchSeqs={metrics.modelSwitchSeqs}
                emptyLabel={t("empty.requests")}
                onPick={actions !== undefined ? (seq) => jumpTo(seq) : undefined}
                note={metrics.modelTimeline.length > 60 ? `${t("trend.scopeNote")} 60 ${t("pager.items")}` : undefined}
                axisHint={t("trend.axisOldToNew")}
                ariaLabel={t("aria.modelTimeline")}
              />
            </div>
          ) : null}
        </section>

        {/* Anomalies */}
        {errorRows.length > 0 ? (
          <section className="dshd-card">
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
          <section className="dshd-card">
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
          <section className="dshd-card">
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

        {/* Reasoning effort distribution */}
        {metrics.effortStats.length > 0 ? (
          <section className="dshd-card">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.effort")}</span>
            </div>
            <div className="dshd-col">
              {metrics.effortStats.map((e) => (
                <div key={e.effort} className="dshd-errRow" title={t("hint.effort")}>
                  <span className="dshd-errMsg">{e.effort}</span>
                  <span className="dshd-errCount">
                    {exactNumber(e.requests)} · {compactNumber(e.reasoningTokens)} {t("tokens.reasoning")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Agent-health diagnostics: loops / no-progress / tool storm */}
        {metrics.loops.length > 0 || metrics.noProgress.length > 0 || metrics.toolStorm.some((b) => b.calls > 0) ? (
          <section className="dshd-card">
            <div className="dshd-cardHead">
              <span className="dshd-cardTitle">{t("section.health")}</span>
              <span className="dshd-cardHint">{t("hint.health")}</span>
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

      {/* Request trend */}
      <section className="dshd-card">
        <div className="dshd-cardHead">
          <span className="dshd-cardTitle">{t("section.trend")}</span>
          <span className="dshd-cardHint">{actions !== undefined ? t("req.rowHint.jump") : t("req.rowHint.expand")}</span>
        </div>
        <TrendSection metrics={metrics} t={t} actions={actions} jumpTo={jumpTo} />
      </section>
    </div>
  );
}
