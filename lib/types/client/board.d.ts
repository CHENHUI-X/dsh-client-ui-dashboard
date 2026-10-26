import type { TodoItem } from "@deepseek-ai/dsh-tool-todo";
import type { SessionListState } from "@deepseek-ai/dsh-api-session-controller/client";
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
/** Structural subset of a session summary used to refine subagent display state. */
export interface SessionSummaryLike {
    title?: string;
    displayTitle?: string;
    running?: boolean;
    /** Latest durable session activity timestamp supplied by the runtime. */
    updatedAt?: number;
    /** The runtime exposes this only as a transient done reminder. */
    completed?: boolean;
    projectionValues?: {
        subagentTiming?: {
            settledMs?: number;
            active?: {
                since?: number;
                through?: number;
            };
        };
    };
}
/**
 * Direct child Sessions of one parent, adapted from the 0.2.x Session catalog
 * (`byId` rows carrying `parentId`). 0.2.x dropped the pre-grouped
 * `subagentsByParent` catalog, so the board derives its own child list.
 * @param state - current Session catalog snapshot.
 * @param parentId - the Session whose direct children are listed.
 * @returns structural subagent entries in the shape the board renders.
 */
export declare function subagentEntriesOf(state: SessionListState, parentId: string): SubagentEntryLike[];
/** Whether a reminder is past its target; overdue is derived, never folded. */
export declare function isOverdue(item: BoardScheduleItem, nowMs: number): boolean;
/** Reminders still pending delivery, soonest target first. */
export declare function scheduledItems(board: BoardProjection): BoardScheduleItem[];
/** The next reminder to fire (soonest pending), or null. */
export declare function nextSchedule(board: BoardProjection): BoardScheduleItem | null;
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
