/**
 * Browser-side board domain: re-exports the shared payload types and provides
 * pure derivations for the Board view and HUD strip. Importing the official
 * dsh-goal / dsh-tool-todo type packages also loads their `goal` / `todos`
 * `SessionProjectionMap` key declarations, so `useProjection("goal")` /
 * `useProjection("todos")` type-check against the real shapes. No React, no
 * cordis — everything is a function of the framework-provided data.
 */
import type { GoalProjection } from "@deepseek-ai/dsh-goal";
import type { TodoItem } from "@deepseek-ai/dsh-tool-todo";
import type {
  BoardProjection,
  BoardScheduleItem,
  BoardWorkflowRun
} from "../board/types";
import { EMPTY_BOARD } from "../board/types";

export type { GoalProjection } from "@deepseek-ai/dsh-goal";
export type { TodoItem } from "@deepseek-ai/dsh-tool-todo";
export type {
  BoardMemberOutcome,
  BoardProjection,
  BoardScheduleItem,
  BoardWorkflowMember,
  BoardWorkflowRun
} from "../board/types";
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
  /** The runtime exposes this only as a transient done reminder. */
  completed?: boolean;
}

/** Whether a reminder is past its target; overdue is derived, never folded. */
export function isOverdue(item: BoardScheduleItem, nowMs: number): boolean {
  if (item.state !== "scheduled") return false;
  const at = Date.parse(item.scheduledAt);
  return Number.isFinite(at) && at <= nowMs;
}

/** Reminders still pending delivery, soonest target first. */
export function scheduledItems(board: BoardProjection): BoardScheduleItem[] {
  return board.schedule
    .filter((i) => i.state === "scheduled")
    .sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt));
}

/** The next reminder to fire (soonest pending), or null. */
export function nextSchedule(board: BoardProjection): BoardScheduleItem | null {
  return scheduledItems(board)[0] ?? null;
}

/** Live workflow runs (newest first). */
export function runningRuns(board: BoardProjection): BoardWorkflowRun[] {
  return board.workflow.filter((r) => r.running);
}

/** Settled workflow runs (newest first). */
export function doneRuns(board: BoardProjection): BoardWorkflowRun[] {
  return board.workflow.filter((r) => !r.running);
}

/** Settled runs that errored (for the blocked column). */
export function erroredRuns(board: BoardProjection): BoardWorkflowRun[] {
  return doneRuns(board).filter((r) => r.stopReason === "error");
}

export function inProgressTodos(todos: readonly TodoItem[]): TodoItem[] {
  return todos.filter((t) => t.status === "in_progress");
}

export function pendingTodos(todos: readonly TodoItem[]): TodoItem[] {
  return todos.filter((t) => t.status === "pending");
}

export function completedTodos(todos: readonly TodoItem[]): TodoItem[] {
  return todos.filter((t) => t.status === "completed");
}

/** Healthy ("child") catalog entries, discarding diagnostics. */
export function childEntries(entries: readonly SubagentEntryLike[] | undefined): SubagentEntryLike[] {
  return (entries ?? []).filter((e) => e.kind === "child");
}
