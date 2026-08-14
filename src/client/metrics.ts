/**
 * Pure derivation of dashboard metrics from the session snapshot and
 * projection values. No React, no cordis — everything is a function of the
 * framework-provided data, so it is trivially testable and re-runs cheaply
 * on every snapshot/projection change.
 */
import type { ConversationNode, ConversationSnapshot, ToolResultNode } from "@deepseek-ai/dsh-client-runtime/client";
import type { TrajectorySnapshot } from "./trajectory-contract";
import type { SessionStatsProjection } from "@deepseek-ai/dsh-session-stats/client";
import type { TokenUsageProjection, ContextBreakdownProjection, ContextPressureProjection } from "@deepseek-ai/dsh-token-meter/client";

/** Provider-reported usage buckets carried on request views (typed locally: RequestView.usage is `unknown`). */
export interface UsageLike {
  inputTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
}

/** One completed/running provider request, reduced to dashboard series fields. */
export interface RequestSample {
  /** Start event seq (stable ordering key). */
  seq: number;
  /** Assistant-message node seq produced by this request (TTFT / tool-call association key); null when unknown. */
  resultSeq: number | null;
  turn: number;
  step: number;
  status: "running" | "complete" | "error";
  purpose: "assistant" | "compaction";
  /** Billed prompt-side input: uncached + cache reads + cache writes. */
  inputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  outputTokens: number;
  reasoningTokens: number;
  /** Wall-clock start of the request; null when missing. */
  startedAt: number | null;
  /** completedAt - startedAt; null while running or when timestamps are missing. */
  durationMs: number | null;
  provider: string | null;
  model: string | null;
  error: string | null;
}

/** One tool call observed in the loaded window, attached to its owning request step. */
export interface ToolCallDetail {
  callId: string;
  name: string;
  argsRaw: string | null;
  durationMs: number | null;
  isError: boolean;
}

/** Full drill-down data for one request row. */
export interface RequestDetail extends RequestSample {
  thinking: boolean;
  reasoningEffort: string | null;
  temperature: number | null;
  maxTokens: number | null;
  retry: number;
  maxRetries: number;
  retryDelayMs: number | null;
  /** Rendered system-prompt character count (from the request's prompt snapshot). */
  promptSystemChars: number | null;
  promptToolNames: readonly string[];
  toolCalls: readonly ToolCallDetail[];
  /** Estimated USD cost for this request, priced by its own model. */
  costUsd: number;
}

/** Tool call histogram. */
export interface ToolCallSample {
  name: string;
  count: number;
  errorCount: number;
}

/** Tool duration aggregate (sum/avg/max over observed calls). */
export interface ToolDurationRow {
  name: string;
  calls: number;
  totalMs: number;
  avgMs: number;
  maxMs: number;
}

/** Per-request time-to-first-token from assistant node timing (window). */
export interface AssistantTtftSample {
  seq: number;
  turn: number;
  ttftMs: number;
}

/** Anomaly counters split out of the legacy "other" role bucket. */
export interface AnomalyCounts {
  turnErrors: number;
  maxTokenHits: number;
  modelRetries: number;
  interrupted: number;
  commands: number;
}

/** Token usage grouped by model. */
export interface ModelSplitRow {
  model: string;
  provider: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  /** Estimated USD cost of this model's requests (each priced by its own model). */
  costUsd: number;
  /** Mean wall time of completed requests for this model; null when none. */
  avgDurationMs: number | null;
  /** Mean TTFT over observable window samples for this model; null when none. */
  avgTtftMs: number | null;
  errorCount: number;
}

/** Per-turn billed input tokens (compaction excluded), with turn-over-turn delta. */
export interface TurnInputRow {
  turn: number;
  inputTokens: number;
  /** vs. previous turn; null for the first turn. */
  delta: number | null;
}

/** One compaction paired with the first assistant request that followed it. */
export interface CompactionEffectRow {
  turn: number;
  seq: number;
  /** Input tokens of the compaction request (= pre-compaction context). */
  beforeTokens: number | null;
  /** Input tokens of the first assistant request after compaction. */
  afterTokens: number | null;
  recoveredTokens: number | null;
  recoveredPct: number | null;
}

/** Latency distribution of completed requests (P50/P95/P99 + 10 linear buckets). */
export interface DurationStats {
  p50: number | null;
  p95: number | null;
  p99: number | null;
  sampleCount: number;
  buckets: { loMs: number; hiMs: number; count: number }[];
}

/** Aggregated error messages, most frequent first. */
export interface ErrorClassRow {
  message: string;
  count: number;
}

/** One turn's wall time over the loaded window. */
export interface TurnDuration {
  turn: number;
  durationMs: number;
  /** False when the turn/end event is outside the window (or the turn is still running): the duration is approximate. */
  closed: boolean;
}

/** Message-role distribution over the currently loaded conversation window. */
export interface RoleCounts {
  user: number;
  assistant: number;
  system: number;
  tool: number;
  /** Mid-turn steering/interrupt messages (counted separately from user). */
  steering: number;
  other: number;
  total: number;
}

/** Everything the dashboard renders, derived in one pass. */
export interface DashboardMetrics {
  running: boolean;
  turns: number;
  steps: number;
  requestCount: number;
  completedRequests: number;
  runningRequests: number;
  failedRequests: number;
  // Token usage (whole-log, provider-reported)
  inputTokens: number;
  outputTokens: number;
  reasoningTokens: number;
  /** Window-scoped output total (used so the reasoning share is window ÷ window). */
  windowOutputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  cacheHitPercent: number | null;
  // Message roles (window)
  roles: RoleCounts;
  // Tools (window)
  toolCallCount: number;
  toolErrorCount: number;
  toolHistogram: ToolCallSample[];
  toolDurationTop: ToolDurationRow[];
  // Compaction
  compactionRequests: number;
  compactionRecoveredTokens: number | null;
  /** Sum of shadowedItemCount across compaction nodes; null when unknown. */
  compactionRecoveredItems: number | null;
  // Anomalies (window)
  anomalies: AnomalyCounts;
  // Commands (window): name → count, most frequent first.
  commandRows: { name: string; count: number }[];
  // Model switching (window)
  modelSwitchCount: number;
  // Per-request TTFT (window, from assistant node timing)
  assistantTtft: AssistantTtftSample[];
  /** TTFT percentiles + histogram over the window (same shape as durationStats). */
  ttftStats: DurationStats;
  // Reasoning-effort distribution (window)
  effortStats: { effort: string; requests: number; reasoningTokens: number }[];
  // Retry economics (window): summed backoff wall time + retried request count.
  retryWaitMs: number;
  retriedRequests: number;
  // Failure profile: failed vs completed request averages.
  failedStats: { count: number; avgDurationMs: number | null; avgInputTokens: number | null };
  completedStats: { count: number; avgDurationMs: number | null; avgInputTokens: number | null };
  // Minute-bucketed activity (window, oldest → newest).
  throughput: { bucketMs: number; requests: number; inputTokens: number; outputTokens: number; failed: number }[];
  // Rough USD cost estimate (DeepSeek public pricing) + cache savings.
  costEstimateUsd: { total: number; cacheSavings: number };
  // Agent-health diagnostics (window)
  /** Consecutive runs of ≥3 identical tool calls (same name + raw args). */
  loops: { name: string; count: number; seqs: number[] }[];
  /** Completed requests with tiny output yet many tool calls (busy-loop smell). */
  noProgress: { seq: number; turn: number; outputTokens: number; toolCalls: number }[];
  /** Tool-call density per minute bucket (same bucketing as throughput). */
  toolStorm: { bucketMs: number; calls: number }[];
  // Model timeline (window, oldest → newest): per-request model + switch points.
  modelTimeline: { seq: number; turn: number; model: string }[];
  modelSwitchSeqs: number[];
  // TTFT split by cache state (window): does a cache hit actually reach the first token faster?
  ttftByCache: { hitAvgMs: number | null; hitN: number; missAvgMs: number | null; missN: number };
  // Context occupancy over the window (per-request input ÷ context window); pct null when no window size.
  contextTrend: { seq: number; turn: number; inputTokens: number; pct: number | null }[];
  // Context-injection sources (window): label/form → count + chars.
  contextInjection: { label: string; role: string; form: string; count: number; chars: number }[];
  // Output tokens excluding reasoning (avoids double counting when the
  // provider includes reasoning inside completion output).
  // Timing (whole-log)
  llmMs: number;
  toolMs: number;
  ttftMs: number;
  ttftSteps: number;
  decodeMs: number;
  decodeTokens: number;
  avgTtftMs: number | null;
  decodeTokensPerSec: number | null;
  totalDurationMs: number;
  // Turn durations (window)
  turnDurations: TurnDuration[];
  // Context composition
  context: ContextBreakdownProjection | null;
  pressure: ContextPressureProjection | null;
  // Per-request series (window), newest first
  series: RequestSample[];
  details: RequestDetail[];
  // Model split (window)
  modelSplit: ModelSplitRow[];
  // Per-turn input tokens (window)
  turnInput: TurnInputRow[];
  // Compaction effect pairs (window)
  compactionEffect: CompactionEffectRow[];
  // Duration distribution of completed requests (window)
  durationStats: DurationStats;
  // Aggregated error messages (window)
  topErrors: ErrorClassRow[];
}

export const EMPTY_METRICS: DashboardMetrics = {
  running: false,
  turns: 0,
  steps: 0,
  requestCount: 0,
  completedRequests: 0,
  runningRequests: 0,
  failedRequests: 0,
  inputTokens: 0,
  outputTokens: 0,
  reasoningTokens: 0,
  windowOutputTokens: 0,
  cacheReadTokens: 0,
  cacheWriteTokens: 0,
  cacheHitPercent: null,
  roles: { user: 0, assistant: 0, system: 0, tool: 0, steering: 0, other: 0, total: 0 },
  toolCallCount: 0,
  toolErrorCount: 0,
  toolHistogram: [],
  toolDurationTop: [],
  compactionRequests: 0,
  compactionRecoveredTokens: null,
  compactionRecoveredItems: null,
  anomalies: { turnErrors: 0, maxTokenHits: 0, modelRetries: 0, interrupted: 0, commands: 0 },
  commandRows: [],
  modelSwitchCount: 0,
  assistantTtft: [],
  ttftStats: { p50: null, p95: null, p99: null, sampleCount: 0, buckets: [] },
  effortStats: [],
  retryWaitMs: 0,
  retriedRequests: 0,
  failedStats: { count: 0, avgDurationMs: null, avgInputTokens: null },
  completedStats: { count: 0, avgDurationMs: null, avgInputTokens: null },
  throughput: [],
  costEstimateUsd: { total: 0, cacheSavings: 0 },
  loops: [],
  noProgress: [],
  toolStorm: [],
  modelTimeline: [],
  modelSwitchSeqs: [],
  ttftByCache: { hitAvgMs: null, hitN: 0, missAvgMs: null, missN: 0 },
  contextTrend: [],
  contextInjection: [],
  llmMs: 0,
  toolMs: 0,
  ttftMs: 0,
  ttftSteps: 0,
  decodeMs: 0,
  decodeTokens: 0,
  avgTtftMs: null,
  decodeTokensPerSec: null,
  totalDurationMs: 0,
  turnDurations: [],
  context: null,
  pressure: null,
  series: [],
  details: [],
  modelSplit: [],
  turnInput: [],
  compactionEffect: [],
  durationStats: { p50: null, p95: null, p99: null, sampleCount: 0, buckets: [] },
  topErrors: []
};

/** Normalize an unknown usage record to defined-number buckets. */
function readUsage(usage: unknown): UsageLike {
  if (typeof usage !== "object" || usage === null) return {};
  const u = usage as Record<string, unknown>;
  const num = (k: string): number | undefined => {
    const v = u[k];
    return typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : undefined;
  };
  return {
    inputTokens: num("inputTokens"),
    cacheReadTokens: num("cacheReadTokens"),
    cacheWriteTokens: num("cacheWriteTokens"),
    outputTokens: num("outputTokens"),
    reasoningTokens: num("reasoningTokens")
  };
}

const toInt = (v: number | undefined): number => (v === undefined ? 0 : Math.round(v));

/** Billed prompt-side input: the three disjoint buckets sum to the prompt bill. */
export function billedInputTokens(u: TokenUsageProjection): number {
  return u.uncachedInputTokens + u.cacheReadTokens + u.cacheWriteTokens;
}

/** Cache-hit share of billed prompt input; null when nothing was billed. */
export function cacheHitPercent(u: TokenUsageProjection): number | null {
  const total = billedInputTokens(u);
  return total === 0 ? null : Math.round((u.cacheReadTokens / total) * 100);
}

/**
 * Per-1M-token prices (DeepSeek public pricing). Cache writes bill at the
 * miss rate. reasoner detection is a model-name heuristic (adapter names
 * vary); callers may refine it once the framework exposes a canonical flag.
 */
export const DEEPSEEK_PRICES = {
  chat: { miss: 0.27, hit: 0.07, output: 1.1 },
  reasoner: { miss: 0.55, hit: 0.14, output: 2.19 }
} as const;

/** Pricing tier for a model name (heuristic). */
export function isReasonerModel(model: string | null): boolean {
  return /reasoner/i.test(model ?? "");
}

/** Estimated USD cost of one request, priced by its own model. */
export function estimateRequestCostUsd(
  model: string | null,
  usage: { uncachedInputTokens: number; cacheReadTokens: number; cacheWriteTokens: number; outputTokens: number }
): number {
  const p = isReasonerModel(model) ? DEEPSEEK_PRICES.reasoner : DEEPSEEK_PRICES.chat;
  return (
    ((usage.uncachedInputTokens + usage.cacheWriteTokens) * p.miss +
      usage.cacheReadTokens * p.hit +
      usage.outputTokens * p.output) /
    1_000_000
  );
}

/** Cache savings of one request (cache reads billed at miss rate), priced by its own model. */
export function estimateCacheSavingsUsd(model: string | null, cacheReadTokens: number): number {
  const miss = isReasonerModel(model) ? DEEPSEEK_PRICES.reasoner.miss : DEEPSEEK_PRICES.chat.miss;
  return (cacheReadTokens * miss) / 1_000_000;
}

/** Count conversation nodes by dashboard role buckets. */
export function countRoles(nodes: readonly ConversationNode[]): RoleCounts {
  const counts = { user: 0, assistant: 0, system: 0, tool: 0, steering: 0, other: 0 };
  for (const node of nodes) {
    switch (node.kind) {
      case "user":
        counts.user += 1;
        break;
      case "steering":
        counts.steering += 1;
        break;
      case "assistant":
        counts.assistant += 1;
        break;
      case "context":
        counts.system += 1;
        break;
      case "tool-result":
        counts.tool += 1;
        break;
      default:
        counts.other += 1;
        break;
    }
  }
  const total = counts.user + counts.assistant + counts.system + counts.tool + counts.steering + counts.other;
  return { ...counts, total };
}

/**
 * Walk the event ledger and attach each tool-result to the most recent
 * assistant step (keyed by that assistant node's seq — the request whose
 * `resultSeq` equals it).
 */
export function indexToolCalls(nodes: readonly ConversationNode[]): Map<number, ToolCallDetail[]> {
  const byRequest = new Map<number, ToolCallDetail[]>();
  let currentSeq: number | null = null;
  for (const node of nodes) {
    if (node.kind === "assistant") {
      currentSeq = node.seq;
      continue;
    }
    if (node.kind !== "tool-result") continue;
    const detail: ToolCallDetail = {
      callId: node.callId,
      name: node.call?.name ?? "tool",
      argsRaw: node.call?.argsRaw ?? null,
      durationMs: node.callTime !== null ? Math.max(0, node.time - node.callTime) : null,
      isError: node.isError
    };
    const key = currentSeq ?? -1;
    const list = byRequest.get(key);
    if (list === undefined) byRequest.set(key, [detail]);
    else list.push(detail);
  }
  return byRequest;
}

/** Count tool calls by name (including nested sub-calls). */
export function toolHistogram(nodes: readonly ConversationNode[]): ToolCallSample[] {
  const counts = new Map<string, { count: number; errorCount: number }>();
  const bump = (name: string, isError: boolean) => {
    const entry = counts.get(name) ?? { count: 0, errorCount: 0 };
    entry.count += 1;
    if (isError) entry.errorCount += 1;
    counts.set(name, entry);
  };
  const walk = (node: ToolResultNode) => {
    bump(node.call?.name ?? "tool", node.isError);
    for (const sub of node.subCalls) {
      const name = "name" in sub ? sub.name : sub.call?.name ?? "tool";
      const isError = "isError" in sub && sub.isError === true;
      bump(name, isError);
    }
  };
  for (const node of nodes) {
    if (node.kind === "tool-result") walk(node);
  }
  return [...counts.entries()]
    .map(([name, c]) => ({ name, count: c.count, errorCount: c.errorCount }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Aggregate tool wall-times by name (top by total duration). Input is the
 * per-request tool call ledger produced by `indexToolCalls`/`requestSeries`.
 */
export function toolDurationTop(callsByRequest: Iterable<readonly ToolCallDetail[]>): ToolDurationRow[] {
  const rows = new Map<string, { calls: number; totalMs: number; maxMs: number }>();
  for (const calls of callsByRequest) {
    for (const call of calls) {
      if (call.durationMs === null) continue;
      const row = rows.get(call.name) ?? { calls: 0, totalMs: 0, maxMs: 0 };
      row.calls += 1;
      row.totalMs += call.durationMs;
      row.maxMs = Math.max(row.maxMs, call.durationMs);
      rows.set(call.name, row);
    }
  }
  return [...rows.entries()]
    .map(([name, r]) => ({ name, calls: r.calls, totalMs: r.totalMs, avgMs: r.calls > 0 ? r.totalMs / r.calls : 0, maxMs: r.maxMs }))
    .sort((a, b) => b.totalMs - a.totalMs);
}

/** Anomaly counters split out of the legacy "other" role bucket. */
export function countAnomalies(nodes: readonly ConversationNode[]): AnomalyCounts {
  const counts: AnomalyCounts = { turnErrors: 0, maxTokenHits: 0, modelRetries: 0, interrupted: 0, commands: 0 };
  for (const node of nodes) {
    switch (node.kind) {
      case "turn-error":
        counts.turnErrors += 1;
        break;
      case "turn-max-tokens":
        counts.maxTokenHits += 1;
        break;
      case "model-retry":
        counts.modelRetries += 1;
        break;
      case "command":
        counts.commands += 1;
        break;
      case "assistant":
        if (node.interrupted === true) counts.interrupted += 1;
        break;
      default:
        break;
    }
  }
  return counts;
}

/**
 * Per-request time-to-first-token from assistant node timing
 * (`timing.firstTokenTime - timing.stepStartTime`); window semantics, same
 * as turnTimings — entries outside the loaded window are simply absent.
 */
export function assistantTtft(nodes: readonly ConversationNode[]): AssistantTtftSample[] {
  const out: AssistantTtftSample[] = [];
  for (const node of nodes) {
    if (node.kind !== "assistant") continue;
    const timing = node.timing;
    if (timing?.stepStartTime === null || timing?.firstTokenTime === null) continue;
    if (timing === undefined || timing.stepStartTime === null || timing.firstTokenTime === null) continue;
    out.push({ seq: node.seq, turn: node.turn, ttftMs: Math.max(0, timing.firstTokenTime - timing.stepStartTime) });
  }
  out.sort((a, b) => a.seq - b.seq);
  return out;
}

/**
 * Number of model switches along the request ledger (oldest → newest):
 * adjacent requests with different effective model names.
 */
export function modelSwitchCount(series: readonly RequestSample[]): number {
  let switches = 0;
  let prev: string | null = null;
  // series is newest-first; walk reversed to compare chronologically.
  // Requests with an unknown model (null) are skipped, not counted as a switch.
  for (let i = series.length - 1; i >= 0; i -= 1) {
    const current = series[i]?.model ?? null;
    if (current === null) continue;
    if (prev !== null && current !== prev) switches += 1;
    prev = current;
  }
  return switches;
}

/** Reduce trajectory requests to the dashboard series + drill-down details. */
export function requestSeries(
  requests: TrajectorySnapshot["requests"],
  toolCalls: Map<number, ToolCallDetail[]>
): { series: RequestSample[]; details: RequestDetail[] } {
  const series: RequestSample[] = [];
  const details: RequestDetail[] = [];
  for (const request of requests) {
    const usage = readUsage(request.usage);
    const input =
      toInt(usage.inputTokens) + toInt(usage.cacheReadTokens) + toInt(usage.cacheWriteTokens);
    const durationMs =
      request.completedAt !== null && request.status !== "running"
        ? Math.max(0, request.completedAt - request.startedAt)
        : null;
    const sample: RequestSample = {
      seq: request.startSeq,
      resultSeq: request.resultSeq ?? null,
      turn: request.turn ?? 0,
      step: request.step ?? 0,
      status: request.status,
      purpose: request.purpose === "compaction" ? "compaction" : "assistant",
      inputTokens: input,
      cacheReadTokens: toInt(usage.cacheReadTokens),
      cacheWriteTokens: toInt(usage.cacheWriteTokens),
      outputTokens: toInt(usage.outputTokens),
      reasoningTokens: toInt(usage.reasoningTokens),
      startedAt: request.startedAt,
      durationMs,
      provider: request.provenance?.provider ?? request.requestConfig?.provider ?? null,
      model: request.provenance?.model ?? request.requestConfig?.model ?? null,
      error: request.error ?? null
    };
    series.push(sample);
    // Drill-down: tool calls that ran under this request's step (matched by
    // the assistant node seq), plus the request prompt snapshot when present.
    const calls = toolCalls.get(request.resultSeq ?? -1) ?? [];
    const prompt = (request as { prompt?: { system?: string; tools?: readonly { name?: string }[] } }).prompt;
    details.push({
      ...sample,
      thinking: (request.requestConfig?.thinking ?? false) === true,
      reasoningEffort: request.requestConfig?.reasoningEffort ?? null,
      temperature: request.requestConfig?.temperature ?? null,
      maxTokens: request.requestConfig?.maxTokens ?? null,
      retry: request.retry ?? 0,
      maxRetries: request.maxRetries ?? 0,
      retryDelayMs: request.retryDelayMs ?? null,
      promptSystemChars: prompt?.system === undefined ? null : prompt.system.length,
      promptToolNames: prompt?.tools?.map((t) => t.name ?? "").filter((n) => n.length > 0) ?? [],
      toolCalls: calls,
      costUsd: estimateRequestCostUsd(sample.model, {
        uncachedInputTokens: sample.inputTokens - sample.cacheReadTokens - sample.cacheWriteTokens,
        cacheReadTokens: sample.cacheReadTokens,
        cacheWriteTokens: sample.cacheWriteTokens,
        outputTokens: sample.outputTokens
      })
    });
  }
  // Newest first, stable by seq.
  series.sort((a, b) => b.seq - a.seq);
  details.sort((a, b) => b.seq - a.seq);
  return { series, details };
}

/** Fold per-request reasoning tokens (the tokenUsage projection does not split them). */
function totalReasoning(series: readonly RequestSample[]): number {
  return series.reduce((sum, s) => sum + s.reasoningTokens, 0);
}

/** Token usage grouped by model, sorted by requests desc. */
export function modelSplit(
  series: readonly RequestSample[],
  ttftBySeq: ReadonlyMap<number, number>
): ModelSplitRow[] {
  type Acc = Omit<ModelSplitRow, "avgDurationMs" | "avgTtftMs"> & {
    durSum: number;
    durN: number;
    ttftSum: number;
    ttftN: number;
  };
  const rows = new Map<string, Acc>();
  for (const s of series) {
    const key = s.model ?? s.provider ?? "unknown";
    const row = rows.get(key) ?? {
      model: s.model ?? "unknown",
      provider: s.provider ?? "unknown",
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
      errorCount: 0,
      durSum: 0,
      durN: 0,
      ttftSum: 0,
      ttftN: 0
    };
    row.requests += 1;
    row.inputTokens += s.inputTokens;
    row.outputTokens += s.outputTokens;
    if (s.status === "error") row.errorCount += 1;
    if (s.durationMs !== null) {
      row.durSum += s.durationMs;
      row.durN += 1;
    }
    const t = s.resultSeq !== null ? ttftBySeq.get(s.resultSeq) : undefined;
    if (t !== undefined) {
      row.ttftSum += t;
      row.ttftN += 1;
    }
    rows.set(key, row);
  }
  return [...rows.values()]
    .map((r) => ({
      model: r.model,
      provider: r.provider,
      requests: r.requests,
      inputTokens: r.inputTokens,
      outputTokens: r.outputTokens,
      costUsd: r.costUsd,
      errorCount: r.errorCount,
      avgDurationMs: r.durN > 0 ? Math.round(r.durSum / r.durN) : null,
      avgTtftMs: r.ttftN > 0 ? Math.round(r.ttftSum / r.ttftN) : null
    }))
    .sort((a, b) => b.requests - a.requests);
}

/** Per-turn billed input (compaction excluded), oldest → newest, with deltas. */
export function turnInputSeries(series: readonly RequestSample[]): TurnInputRow[] {
  const byTurn = new Map<number, number>();
  for (const s of series) {
    if (s.purpose === "compaction") continue;
    byTurn.set(s.turn, (byTurn.get(s.turn) ?? 0) + s.inputTokens);
  }
  const turns = [...byTurn.keys()].sort((a, b) => a - b);
  return turns.map((turn, i) => ({
    turn,
    inputTokens: byTurn.get(turn) ?? 0,
    delta: i === 0 ? null : (byTurn.get(turn) ?? 0) - (byTurn.get(turns[i - 1]!) ?? 0)
  }));
}

/** Pair each compaction request with the first assistant request that followed it. */
export function compactionEffect(series: readonly RequestSample[]): CompactionEffectRow[] {
  const ordered = [...series].sort((a, b) => a.seq - b.seq);
  const out: CompactionEffectRow[] = [];
  for (let i = 0; i < ordered.length; i += 1) {
    const s = ordered[i]!;
    if (s.purpose !== "compaction") continue;
    const after = ordered.slice(i + 1).find((x) => x.purpose === "assistant");
    const before = s.inputTokens;
    const afterTokens = after?.inputTokens ?? null;
    const recovered = before > 0 && afterTokens !== null ? Math.max(0, before - afterTokens) : null;
    out.push({
      turn: s.turn,
      seq: s.seq,
      beforeTokens: before > 0 ? before : null,
      afterTokens,
      recoveredTokens: recovered,
      recoveredPct: recovered !== null && before > 0 ? Math.round((recovered / before) * 100) : null
    });
  }
  return out;
}

/** P50/P95/P99 + 10 linear buckets over a sorted-able numeric sample set. */
function percentileStats(values: number[]): DurationStats {
  const ds = [...values].sort((a, b) => a - b);
  if (ds.length === 0) return { p50: null, p95: null, p99: null, sampleCount: 0, buckets: [] };
  const pct = (p: number): number => {
    const idx = Math.min(ds.length - 1, Math.round((p / 100) * (ds.length - 1)));
    return ds[idx]!;
  };
  const max = ds[ds.length - 1]!;
  const n = 10;
  const buckets = Array.from({ length: n }, (_, b) => {
    const lo = (max * b) / n;
    const hi = (max * (b + 1)) / n;
    // The last bucket is closed on both ends so the max sample is not dropped.
    const count = ds.filter((d) => (b === n - 1 ? d >= lo && d <= hi : d >= lo && d < hi)).length;
    return { loMs: Math.round(lo), hiMs: Math.round(hi), count };
  });
  return { p50: pct(50), p95: pct(95), p99: pct(99), sampleCount: ds.length, buckets };
}

/** P50/P95/P99 + 10 linear buckets over completed requests' durations. */
export function durationStats(series: readonly RequestSample[]): DurationStats {
  return percentileStats(
    series
      .filter((s) => s.status === "complete" && s.durationMs !== null && s.durationMs >= 0)
      .map((s) => s.durationMs as number)
  );
}

/** TTFT percentiles + histogram over the window. */
export function ttftStats(samples: readonly AssistantTtftSample[]): DurationStats {
  return percentileStats(samples.map((s) => s.ttftMs));
}

/** Command-name histogram over the window (most frequent first). */
export function commandRows(nodes: readonly ConversationNode[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    if (node.kind !== "command" || node.name === null) continue;
    counts.set(node.name, (counts.get(node.name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

/**
 * Context-injection sources over the window: who injected context into the
 * model-facing conversation, how often, and how many characters (form =
 * producer-declared information form; provenance role inject = producer
 * injection, recall = cross-session recall). Most characters first.
 */
export function contextInjection(
  nodes: readonly ConversationNode[]
): { label: string; role: string; form: string; count: number; chars: number }[] {
  const map = new Map<string, { label: string; role: string; form: string; count: number; chars: number }>();
  for (const node of nodes) {
    if (node.kind !== "context") continue;
    const label = node.provenance.label ?? "?";
    const form = node.form ?? "opaque";
    const key = `${label}\u0000${form}`;
    const row = map.get(key) ?? { label, role: node.provenance.role, form, count: 0, chars: 0 };
    row.count += 1;
    row.chars += node.content.reduce(
      (n, b) => n + ("text" in b && typeof b.text === "string" ? b.text.length : 0),
      0
    );
    map.set(key, row);
  }
  return [...map.values()].sort((a, b) => b.chars - a.chars).slice(0, 10);
}

/**
 * Loop detection: consecutive runs of ≥3 tool calls with the same name AND
 * same raw args. Details must be newest-first (it reverses internally).
 */
export function detectLoops(details: readonly RequestDetail[]): { name: string; count: number; seqs: number[] }[] {
  const flat: { seq: number; name: string; args: string | null }[] = [];
  for (const d of [...details].reverse()) {
    for (const c of d.toolCalls) flat.push({ seq: d.seq, name: c.name, args: c.argsRaw });
  }
  const loops: { name: string; count: number; seqs: number[] }[] = [];
  let runStart = 0;
  for (let i = 1; i <= flat.length; i++) {
    const same =
      i < flat.length &&
      flat[i]!.name === flat[i - 1]!.name &&
      flat[i]!.args === flat[i - 1]!.args;
    if (same) continue;
    const run = i - runStart;
    if (run >= 3) {
      const seqs = [...new Set(flat.slice(runStart, i).map((f) => f.seq))];
      loops.push({ name: flat[runStart]!.name, count: run, seqs });
    }
    runStart = i;
  }
  return loops;
}

/** Most frequent error messages among failed requests (top 5). */
export function topErrors(series: readonly RequestSample[]): ErrorClassRow[] {
  const counts = new Map<string, number>();
  for (const s of series) {
    if (s.status !== "error" || s.error === null) continue;
    const msg = s.error.trim() === "" ? "(no message)" : s.error;
    counts.set(msg, (counts.get(msg) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

/** Turn wall-times from the snapshot's turnTimings (newest first, last 10). */
/**
 * Turn wall times over the loaded window.
 *
 * The framework only loads the recent slice of the log (`maxMessages` window),
 * so a turn whose `turn/end` event falls outside the window has no endTime.
 * Such turns are still listed — the end is approximated with the newest node
 * time inside the window (or "now" for the running turn) and flagged as
 * `closed: false` — instead of being silently dropped.
 */
export function turnDurations(
  snapshot: Pick<ConversationSnapshot, "turnTimings">,
  nodes: readonly ConversationNode[],
  nowMs: number
): TurnDuration[] {
  let maxNodeTime = 0;
  for (const node of nodes) {
    if (node.time > maxNodeTime) maxNodeTime = node.time;
  }
  const windowTail = Math.min(maxNodeTime, nowMs);
  const out: TurnDuration[] = [];
  for (const [turn, timing] of snapshot.turnTimings) {
    const closed = timing.endTime !== undefined;
    const end = closed ? timing.endTime : Math.max(timing.startTime, windowTail);
    out.push({ turn, durationMs: Math.max(0, end - timing.startTime), closed });
  }
  out.sort((a, b) => b.turn - a.turn);
  return out.slice(0, 12);
}

export interface DeriveInput {
  running: boolean;
  snapshot: Pick<ConversationSnapshot, "turnTimings">;
  nodes: readonly ConversationNode[];
  requests: TrajectorySnapshot["requests"];
  tokenUsage: TokenUsageProjection | undefined;
  stats: SessionStatsProjection | undefined;
  context: ContextBreakdownProjection | undefined;
  pressure: ContextPressureProjection | undefined;
}

/** One-pass derivation of every dashboard figure. */
export function deriveMetrics(input: DeriveInput, nowMs: number): DashboardMetrics {
  const toolCalls = indexToolCalls(input.nodes);
  const { series, details } = requestSeries(input.requests, toolCalls);
  const roles = countRoles(input.nodes);
  const histogram = toolHistogram(input.nodes);
  const anomalies = countAnomalies(input.nodes);
  const ttft = assistantTtft(input.nodes);

  const requestCount = series.length;
  let completedRequests = 0;
  let runningRequests = 0;
  let failedRequests = 0;
  let compactionRequests = 0;
  for (const s of series) {
    if (s.status === "running") runningRequests += 1;
    else if (s.status === "error") failedRequests += 1;
    else completedRequests += 1;
    if (s.purpose === "compaction") compactionRequests += 1;
  }
  let toolCallCount = 0;
  let toolErrorCount = 0;
  for (const h of histogram) {
    toolCallCount += h.count;
    toolErrorCount += h.errorCount;
  }
  // Compaction recovery: sum shadowed token counts reported by compaction
  // summary nodes in the window (null entries skipped).
  let compactionRecoveredTokens: number | null = null;
  let compactionRecoveredItems: number | null = null;
  for (const node of input.nodes) {
    if (node.kind !== "compaction") continue;
    if (node.shadowedTokenCount !== null) {
      compactionRecoveredTokens = (compactionRecoveredTokens ?? 0) + node.shadowedTokenCount;
    }
    if (node.shadowedItemCount !== null) {
      compactionRecoveredItems = (compactionRecoveredItems ?? 0) + node.shadowedItemCount;
    }
  }

  // Retry economics + failure profile over the window.
  let retryWaitMs = 0;
  let retriedRequests = 0;
  for (const d of details) {
    if (d.retryDelayMs !== null && d.retryDelayMs > 0) retryWaitMs += d.retryDelayMs;
    if (d.retry > 0) retriedRequests += 1;
  }
  let failedDurSum = 0;
  let failedDurN = 0;
  let failedInputSum = 0;
  let failedN = 0;
  let doneDurSum = 0;
  let doneDurN = 0;
  let doneInputSum = 0;
  let doneN = 0;
  for (const s of series) {
    if (s.status === "error") {
      failedN += 1;
      failedInputSum += s.inputTokens;
      if (s.durationMs !== null) {
        failedDurSum += s.durationMs;
        failedDurN += 1;
      }
    } else if (s.status === "complete") {
      doneN += 1;
      doneInputSum += s.inputTokens;
      if (s.durationMs !== null) {
        doneDurSum += s.durationMs;
        doneDurN += 1;
      }
    }
  }
  const failedStats = {
    count: failedN,
    avgDurationMs: failedDurN > 0 ? Math.round(failedDurSum / failedDurN) : null,
    avgInputTokens: failedN > 0 ? Math.round(failedInputSum / failedN) : null
  };
  const completedStats = {
    count: doneN,
    avgDurationMs: doneDurN > 0 ? Math.round(doneDurSum / doneDurN) : null,
    avgInputTokens: doneN > 0 ? Math.round(doneInputSum / doneN) : null
  };

  // Reasoning-effort distribution (join details' requestConfig by seq).
  const effortMap = new Map<string, { requests: number; reasoningTokens: number }>();
  for (const d of details) {
    if (d.purpose === "compaction") continue;
    const effort = d.reasoningEffort ?? "default";
    const row = effortMap.get(effort) ?? { requests: 0, reasoningTokens: 0 };
    row.requests += 1;
    row.reasoningTokens += d.reasoningTokens;
    effortMap.set(effort, row);
  }
  const effortStats = [...effortMap.entries()]
    .map(([effort, row]) => ({ effort, ...row }))
    .sort((a, b) => b.requests - a.requests);

  // Minute-bucketed activity over the window (oldest → newest).
  const started = series
    .filter((s) => s.startedAt !== null)
    .map((s) => ({ s, t: s.startedAt as number }))
    .sort((a, b) => a.t - b.t);
  const callsPerSeq = new Map<number, number>();
  for (const d of details) callsPerSeq.set(d.seq, d.toolCalls.length);
  let throughput: { bucketMs: number; requests: number; inputTokens: number; outputTokens: number; calls: number; failed: number }[] = [];
  if (started.length > 0) {
    const first = started[0]!.t;
    const last = started[started.length - 1]!.t;
    const span = Math.max(1, last - first);
    const bucketCount = Math.min(30, Math.max(5, Math.ceil(span / 60_000)));
    const bucketMs = Math.ceil(span / bucketCount);
    const buckets = Array.from({ length: bucketCount }, () => ({
      bucketMs: 0,
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      calls: 0,
      failed: 0
    }));
    for (const { s, t } of started) {
      const idx = Math.min(bucketCount - 1, Math.floor((t - first) / bucketMs));
      const b = buckets[idx]!;
      b.bucketMs = first + idx * bucketMs;
      b.requests += 1;
      b.inputTokens += s.inputTokens;
      b.outputTokens += s.outputTokens;
      b.calls += callsPerSeq.get(s.seq) ?? 0;
      if (s.status === "error") b.failed += 1;
    }
    throughput = buckets;
  }
  const toolStorm = throughput.map((b) => ({ bucketMs: b.bucketMs, calls: b.calls }));

  // No-progress: completed requests with tiny output yet ≥3 tool calls.
  const noProgress = details
    .filter((d) => d.status === "complete" && d.outputTokens < 50 && d.toolCalls.length >= 3)
    .map((d) => ({ seq: d.seq, turn: d.turn, outputTokens: d.outputTokens, toolCalls: d.toolCalls.length }));

  // Loop detection over the whole window's tool sequence.
  const loops = detectLoops(details);

  // Model timeline (oldest → newest) + switch points.
  // Requests with an unknown model ("?") are skipped for switch detection so
  // counting (modelSwitchCount) and the timeline rings stay consistent.
  const modelTimeline = [...series]
    .reverse()
    .map((s) => ({ seq: s.seq, turn: s.turn, model: s.model ?? "?" }));
  const modelSwitchSeqs: number[] = [];
  {
    let prev: string | null = null;
    for (const m of modelTimeline) {
      if (m.model === "?") continue;
      if (prev !== null && m.model !== prev) modelSwitchSeqs.push(m.seq);
      prev = m.model;
    }
  }

  const tokenUsage = input.tokenUsage;
  const inputTokens = tokenUsage === undefined ? 0 : billedInputTokens(tokenUsage);
  const outputTokens = tokenUsage?.outputTokens ?? 0;
  const cacheReadTokens = tokenUsage?.cacheReadTokens ?? 0;
  const cacheWriteTokens = tokenUsage?.cacheWriteTokens ?? 0;
  const hit = tokenUsage === undefined ? null : cacheHitPercent(tokenUsage);
  const reasoningTokens = totalReasoning(series);
  /** Window-scoped output total (the reasoning share is window ÷ window). */
  const windowOutputTokens = series.reduce((sum, s) => sum + s.outputTokens, 0);

  // Per-request cost (each request priced by its own model) + cache savings.
  let costTotal = 0;
  let costSavings = 0;
  for (const d of details) {
    costTotal += d.costUsd;
    costSavings += estimateCacheSavingsUsd(d.model, d.cacheReadTokens);
  }

  const stats = input.stats;
  const avgTtftMs = stats !== undefined && stats.ttftSteps > 0 ? stats.ttftMs / stats.ttftSteps : null;
  const decodeTokensPerSec =
    stats !== undefined && stats.decodeMs > 0 ? (stats.decodeTokens / stats.decodeMs) * 1000 : null;
  const totalDurationMs = (stats?.llmMs ?? 0) + (stats?.toolMs ?? 0);
  const ttftBySeq = new Map(ttft.map((t) => [t.seq, t.ttftMs]));

  // Cache hit vs miss TTFT (per request, keyed by assistant node seq).
  const ttftByCache = (() => {
    let hitSum = 0;
    let hitN = 0;
    let missSum = 0;
    let missN = 0;
    for (const s of series) {
      if (s.status === "running") continue;
      const t = s.resultSeq !== null ? ttftBySeq.get(s.resultSeq) : undefined;
      if (t === undefined) continue;
      if (s.cacheReadTokens > 0) {
        hitSum += t;
        hitN += 1;
      } else {
        missSum += t;
        missN += 1;
      }
    }
    return {
      hitAvgMs: hitN > 0 ? Math.round(hitSum / hitN) : null,
      hitN,
      missAvgMs: missN > 0 ? Math.round(missSum / missN) : null,
      missN
    };
  })();

  // Context occupancy over the window: per-request input ÷ context window.
  const contextWindow = input.pressure?.contextWindow ?? null;
  const contextTrend = [...series].reverse().map((s) => ({
    seq: s.seq,
    turn: s.turn,
    inputTokens: s.inputTokens,
    pct:
      contextWindow !== null && contextWindow > 0
        ? Math.min(100, Math.round((s.inputTokens / contextWindow) * 100))
        : null
  }));

  return {
    running: input.running,
    turns: stats?.turns ?? 0,
    steps: stats?.steps ?? 0,
    requestCount,
    completedRequests,
    runningRequests,
    failedRequests,
    inputTokens,
    outputTokens,
    reasoningTokens,
    windowOutputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    cacheHitPercent: hit,
    roles,
    toolCallCount,
    toolErrorCount,
    toolHistogram: histogram,
    toolDurationTop: toolDurationTop(details.map((d) => d.toolCalls)),
    compactionRequests,
    compactionRecoveredTokens,
    compactionRecoveredItems,
    anomalies,
    commandRows: commandRows(input.nodes),
    modelSwitchCount: modelSwitchCount(series),
    assistantTtft: ttft,
    ttftStats: ttftStats(ttft),
    effortStats,
    retryWaitMs,
    retriedRequests,
    failedStats,
    completedStats,
    throughput,
    loops,
    noProgress,
    toolStorm,
    modelTimeline,
    modelSwitchSeqs,
    ttftByCache,
    contextTrend,
    contextInjection: contextInjection(input.nodes),
    costEstimateUsd: { total: costTotal, cacheSavings: costSavings },
    llmMs: stats?.llmMs ?? 0,
    toolMs: stats?.toolMs ?? 0,
    ttftMs: stats?.ttftMs ?? 0,
    ttftSteps: stats?.ttftSteps ?? 0,
    decodeMs: stats?.decodeMs ?? 0,
    decodeTokens: stats?.decodeTokens ?? 0,
    avgTtftMs,
    decodeTokensPerSec,
    totalDurationMs,
    turnDurations: turnDurations(input.snapshot, input.nodes, nowMs),
    context: input.context ?? null,
    pressure: input.pressure ?? null,
    series,
    details,
    modelSplit: modelSplit(series, ttftBySeq),
    turnInput: turnInputSeries(series),
    compactionEffect: compactionEffect(series),
    durationStats: durationStats(series),
    topErrors: topErrors(series)
  };
}
