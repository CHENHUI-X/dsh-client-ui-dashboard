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
export declare const EMPTY_BOARD: BoardProjection;
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
