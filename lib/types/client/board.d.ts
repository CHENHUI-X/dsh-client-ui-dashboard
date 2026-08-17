import type { TodoItem } from "@deepseek-ai/dsh-tool-todo";
import type { BoardProjection, BoardScheduleItem, BoardWorkflowRun } from "../board/types";
export type { GoalProjection } from "@deepseek-ai/dsh-goal";
export type { TodoItem } from "@deepseek-ai/dsh-tool-todo";
export type { BoardMemberOutcome, BoardProjection, BoardScheduleItem, BoardWorkflowMember, BoardWorkflowRun } from "../board/types";
export { EMPTY_BOARD } from "../board/types";
/** Structural subset of a subagent catalog entry (dsh-client-runtime catalog). */
export interface SubagentEntryLike {
    kind?: string;
    id: string;
    label?: string;
    mode?: "one-shot" | "continuable";
    activity?: "running" | "inactive";
}
/** Structural subset of a session summary (for subagent display titles). */
export interface SessionSummaryLike {
    title?: string;
}
/** Whether a reminder is past its target; overdue is derived, never folded. */
export declare function isOverdue(item: BoardScheduleItem, nowMs: number): boolean;
/** Reminders still pending delivery, soonest target first. */
export declare function scheduledItems(board: BoardProjection, nowMs: number): BoardScheduleItem[];
/** The next reminder to fire, or null. */
export declare function nextSchedule(board: BoardProjection, nowMs: number): BoardScheduleItem | null;
/** Live workflow runs (newest first). */
export declare function runningRuns(board: BoardProjection): BoardWorkflowRun[];
/** Settled workflow runs (newest first). */
export declare function doneRuns(board: BoardProjection): BoardWorkflowRun[];
/** Settled runs that errored (for the blocked column). */
export declare function erroredRuns(board: BoardProjection): BoardWorkflowRun[];
export declare function inProgressTodos(todos: readonly TodoItem[]): TodoItem[];
export declare function pendingTodos(todos: readonly TodoItem[]): TodoItem[];
export declare function completedTodos(todos: readonly TodoItem[]): TodoItem[];
/** Healthy ("child") catalog entries, discarding diagnostics. */
export declare function childEntries(entries: readonly SubagentEntryLike[] | undefined): SubagentEntryLike[];
