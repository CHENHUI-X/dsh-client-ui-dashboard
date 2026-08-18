/**
 * Shared board domain types plus the `boardState` session-projection key
 * declaration. Consumed by both the host half (projection unit + `board_query`
 * tool) and the browser half (Board view + HUD strip); the payload is plain
 * JSON, so the same module type-checks both sides.
 *
 * `boardState` folds the durable cross-seam activity a session already owns —
 * `tool-workflow/*` records (owned by `@deepseek-ai/dsh-tool-workflow`) and
 * `schedule/change` records (owned by `@deepseek-ai/dsh-schedule`) — into one
 * UI/model-facing read model. Goal and todo state are intentionally NOT folded
 * here: `dsh-goal` and `dsh-tool-todo` already register their own `goal` /
 * `todos` projection units, and consumers read those keys directly.
 *
 * @module dsh-client-ui-dashboard/board/types
 */
import type {} from "@deepseek-ai/dsh-session-projection/types";

/** Settlement of one workflow member; "running" while its child session is live. */
export type BoardMemberOutcome = "running" | "completed" | "failed" | "cancelled";

/** One workflow member (an `agent()` call) within a run record. */
export interface BoardWorkflowMember {
  readonly seq: number;
  readonly label: string;
  readonly phase: string | null;
  readonly outcome: BoardMemberOutcome;
  readonly childId: string | null;
}

/** One top-level workflow run, newest first. */
export interface BoardWorkflowRun {
  readonly runId: string;
  readonly name: string;
  /** Terminal reason once settled; null while the run is live. */
  readonly stopReason: "completed" | "cancelled" | "error" | null;
  readonly running: boolean;
  readonly members: readonly BoardWorkflowMember[];
}

/**
 * Reminder state persisted by the fold. "overdue" is deliberately not a fold
 * state: it depends on the wall clock, and projections must stay pure
 * functions of the log — consumers derive overdue from `scheduledAt`.
 */
export type BoardScheduleState = "scheduled" | "dispatched";

/** One schedule reminder folded from `schedule/change`. */
export interface BoardScheduleItem {
  readonly id: string;
  readonly kind: "after" | "at" | "every";
  readonly prompt: string;
  /** RFC 3339 UTC target, as persisted by dsh-schedule. */
  readonly scheduledAt: string;
  /** Interval in seconds for `every` records; null otherwise. */
  readonly everySeconds: number | null;
  readonly state: BoardScheduleState;
}

/** The `boardState` projection value: durable cross-seam activity. */
export interface BoardProjection {
  readonly workflow: readonly BoardWorkflowRun[];
  readonly schedule: readonly BoardScheduleItem[];
}

/** Empty board (also the projection unit's init state). */
export const EMPTY_BOARD: BoardProjection = { workflow: [], schedule: [] };

declare module "@deepseek-ai/dsh-session-projection/types" {
  interface SessionProjectionMap {
    /**
     * This plugin's board unit: workflow runs + schedule reminders folded from
     * the session log, newest first, capped to UI-scale sizes. Absent when the
     * host half is not composed (key absence is not a per-session signal — the
     * client must read the value).
     */
    boardState: BoardProjection;
  }
}
