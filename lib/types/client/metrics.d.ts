/**
 * Pure derivation of dashboard metrics from the session snapshot and
 * projection values. No React, no cordis — everything is a function of the
 * framework-provided data, so it is trivially testable and re-runs cheaply
 * on every snapshot/projection change.
 */
import type { ConversationNode, ConversationSnapshot } from "@deepseek-ai/dsh-client-runtime/client";
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
    /** Whether the provider reported token usage at all (false = usage fields are all 0 / missing). */
    usageReported: boolean;
    /** Estimated USD cost for this request, priced by its own model (same source as RequestDetail.costUsd). */
    costUsd: number;
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
    buckets: {
        loMs: number;
        hiMs: number;
        count: number;
    }[];
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
    inputTokens: number;
    outputTokens: number;
    reasoningTokens: number;
    /** Window-scoped output total (used so the reasoning share is window ÷ window). */
    windowOutputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    cacheHitPercent: number | null;
    roles: RoleCounts;
    toolCallCount: number;
    toolErrorCount: number;
    toolHistogram: ToolCallSample[];
    toolDurationTop: ToolDurationRow[];
    compactionRequests: number;
    compactionRecoveredTokens: number | null;
    /** Sum of shadowedItemCount across compaction nodes; null when unknown. */
    compactionRecoveredItems: number | null;
    anomalies: AnomalyCounts;
    commandRows: {
        name: string;
        count: number;
    }[];
    modelSwitchCount: number;
    assistantTtft: AssistantTtftSample[];
    /** TTFT percentiles + histogram over the window (same shape as durationStats). */
    ttftStats: DurationStats;
    effortStats: {
        effort: string;
        requests: number;
        reasoningTokens: number;
    }[];
    retryWaitMs: number;
    retriedRequests: number;
    failedStats: {
        count: number;
        avgDurationMs: number | null;
        avgInputTokens: number | null;
    };
    completedStats: {
        count: number;
        avgDurationMs: number | null;
        avgInputTokens: number | null;
    };
    throughput: {
        bucketMs: number;
        requests: number;
        inputTokens: number;
        outputTokens: number;
        failed: number;
    }[];
    costEstimateUsd: {
        total: number;
        cacheSavings: number;
    };
    /** Consecutive runs of ≥3 identical tool calls (same name + raw args). */
    loops: {
        name: string;
        count: number;
        seqs: number[];
    }[];
    /** Completed requests with tiny output yet many tool calls (busy-loop smell). */
    noProgress: {
        seq: number;
        turn: number;
        outputTokens: number;
        toolCalls: number;
    }[];
    /** Tool-call density per minute bucket (same bucketing as throughput). */
    toolStorm: {
        bucketMs: number;
        calls: number;
    }[];
    modelTimeline: {
        seq: number;
        turn: number;
        model: string;
    }[];
    modelSwitchSeqs: number[];
    ttftByCache: {
        hitAvgMs: number | null;
        hitN: number;
        missAvgMs: number | null;
        missN: number;
    };
    contextTrend: {
        seq: number;
        turn: number;
        inputTokens: number;
        pct: number | null;
    }[];
    contextInjection: {
        label: string;
        role: string;
        form: string;
        count: number;
        chars: number;
    }[];
    llmMs: number;
    toolMs: number;
    ttftMs: number;
    ttftSteps: number;
    decodeMs: number;
    decodeTokens: number;
    avgTtftMs: number | null;
    decodeTokensPerSec: number | null;
    totalDurationMs: number;
    turnDurations: TurnDuration[];
    context: ContextBreakdownProjection | null;
    pressure: ContextPressureProjection | null;
    series: RequestSample[];
    details: RequestDetail[];
    modelSplit: ModelSplitRow[];
    turnInput: TurnInputRow[];
    compactionEffect: CompactionEffectRow[];
    durationStats: DurationStats;
    topErrors: ErrorClassRow[];
}
export declare const EMPTY_METRICS: DashboardMetrics;
/** Billed prompt-side input: the three disjoint buckets sum to the prompt bill. */
export declare function billedInputTokens(u: TokenUsageProjection): number;
/** Cache-hit share of billed prompt input; null when nothing was billed. */
export declare function cacheHitPercent(u: TokenUsageProjection): number | null;
/**
 * Per-1M-token prices (DeepSeek public pricing). Cache writes bill at the
 * miss rate. reasoner detection is a model-name heuristic (adapter names
 * vary); callers may refine it once the framework exposes a canonical flag.
 */
export declare const DEEPSEEK_PRICES: {
    readonly chat: {
        readonly miss: 0.27;
        readonly hit: 0.07;
        readonly output: 1.1;
    };
    readonly reasoner: {
        readonly miss: 0.55;
        readonly hit: 0.14;
        readonly output: 2.19;
    };
};
/** Pricing tier for a model name (heuristic). */
export declare function isReasonerModel(model: string | null): boolean;
/** Estimated USD cost of one request, priced by its own model. */
export declare function estimateRequestCostUsd(model: string | null, usage: {
    uncachedInputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    outputTokens: number;
}): number;
/** Cache savings of one request (cache reads billed at miss rate), priced by its own model. */
export declare function estimateCacheSavingsUsd(model: string | null, cacheReadTokens: number): number;
/** Count conversation nodes by dashboard role buckets. */
export declare function countRoles(nodes: readonly ConversationNode[]): RoleCounts;
/**
 * Walk the event ledger and attach each tool-result to the most recent
 * assistant step (keyed by that assistant node's seq — the request whose
 * `resultSeq` equals it).
 */
export declare function indexToolCalls(nodes: readonly ConversationNode[]): Map<number, ToolCallDetail[]>;
/** Count tool calls by name (including nested sub-calls). */
export declare function toolHistogram(nodes: readonly ConversationNode[]): ToolCallSample[];
/**
 * Aggregate tool wall-times by name (top by total duration). Input is the
 * per-request tool call ledger produced by `indexToolCalls`/`requestSeries`.
 */
export declare function toolDurationTop(callsByRequest: Iterable<readonly ToolCallDetail[]>): ToolDurationRow[];
/** Anomaly counters split out of the legacy "other" role bucket. */
export declare function countAnomalies(nodes: readonly ConversationNode[]): AnomalyCounts;
/**
 * Per-request time-to-first-token from assistant node timing
 * (`timing.firstTokenTime - timing.stepStartTime`); window semantics, same
 * as turnTimings — entries outside the loaded window are simply absent.
 */
export declare function assistantTtft(nodes: readonly ConversationNode[]): AssistantTtftSample[];
/**
 * Number of model switches along the request ledger (oldest → newest):
 * adjacent requests with different effective model names.
 */
export declare function modelSwitchCount(series: readonly RequestSample[]): number;
/** Reduce trajectory requests to the dashboard series + drill-down details. */
export declare function requestSeries(requests: TrajectorySnapshot["requests"], toolCalls: Map<number, ToolCallDetail[]>): {
    series: RequestSample[];
    details: RequestDetail[];
};
/** Token usage grouped by model, sorted by requests desc. */
export declare function modelSplit(series: readonly RequestSample[], ttftBySeq: ReadonlyMap<number, number>): ModelSplitRow[];
/** Per-turn billed input (compaction excluded), oldest → newest, with deltas. */
export declare function turnInputSeries(series: readonly RequestSample[]): TurnInputRow[];
/** Pair each compaction request with the first assistant request that followed it. */
export declare function compactionEffect(series: readonly RequestSample[]): CompactionEffectRow[];
/** P50/P95/P99 + 10 linear buckets over completed requests' durations. */
export declare function durationStats(series: readonly RequestSample[]): DurationStats;
/** TTFT percentiles + histogram over the window. */
export declare function ttftStats(samples: readonly AssistantTtftSample[]): DurationStats;
/** Command-name histogram over the window (most frequent first). */
export declare function commandRows(nodes: readonly ConversationNode[]): {
    name: string;
    count: number;
}[];
/**
 * Context-injection sources over the window: who injected context into the
 * model-facing conversation, how often, and how many characters (form =
 * producer-declared information form; provenance role inject = producer
 * injection, recall = cross-session recall). Most characters first.
 */
export declare function contextInjection(nodes: readonly ConversationNode[]): {
    label: string;
    role: string;
    form: string;
    count: number;
    chars: number;
}[];
/**
 * Loop detection: consecutive runs of ≥3 tool calls with the same name AND
 * same raw args. Details must be newest-first (it reverses internally).
 */
export declare function detectLoops(details: readonly RequestDetail[]): {
    name: string;
    count: number;
    seqs: number[];
}[];
/** Most frequent error messages among failed requests (top 5). */
export declare function topErrors(series: readonly RequestSample[]): ErrorClassRow[];
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
export declare function turnDurations(snapshot: Pick<ConversationSnapshot, "turnTimings">, nodes: readonly ConversationNode[], nowMs: number): TurnDuration[];
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
export declare function deriveMetrics(input: DeriveInput, nowMs: number): DashboardMetrics;
