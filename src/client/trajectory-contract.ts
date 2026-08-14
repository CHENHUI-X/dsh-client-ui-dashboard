/**
 * Local (structural) types for the `trajectory` conversation view snapshot.
 *
 * The trajectory snapshot is produced by the shipped `ui-trajectory` plugin's
 * projection target. We deliberately avoid importing its types: a community
 * plugin should not hard-depend on another UI plugin's package. The structural
 * shape below is the stable subset the dashboard consumes (documented in
 * `dsh-client-ui-trajectory`'s `trajectory-contract.d.ts`).
 */
import type { ConversationNode } from "@deepseek-ai/dsh-client-runtime/client";

/** Provider-reported usage buckets attached to request views. */
export interface TrajectoryRequestUsage {
  inputTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
}

/** One provider request (assistant generation or compaction) in the trajectory ledger. */
export interface TrajectoryRequestView {
  startSeq: number;
  startedAt: number;
  completedAt: number | null;
  status: "running" | "complete" | "error";
  error?: string;
  purpose?: "assistant" | "compaction";
  turn?: number | null;
  step?: number;
  resultSeq?: number;
  retry?: number;
  maxRetries?: number;
  retryDelayMs?: number;
  provenance?: { provider?: string; model?: string };
  requestConfig?: {
    provider?: string;
    model?: string;
    thinking?: boolean;
    reasoningEffort?: string;
    temperature?: number;
    maxTokens?: number;
  };
  /** Effective model-visible prompt when this request carried one. */
  prompt?: {
    system?: string;
    tools?: readonly { name?: string }[];
  };
  usage?: unknown;
}

/** The `trajectory` key of `snapshot.views` — the subset the dashboard reads. */
export interface TrajectorySnapshot {
  readonly eventNodes: readonly ConversationNode[];
  readonly requests: readonly TrajectoryRequestView[];
}
