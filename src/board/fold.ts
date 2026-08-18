/**
 * Pure fold of the `boardState` projection unit: one committed session event →
 * next board state. Disciplines follow the session-projection contract:
 *
 * - unrelated events return the SAME state reference (the `Object.is` gate);
 * - related events rebuild only the touched branch (immutable, no in-place
 *   mutation — EMPTY_BOARD is shared and must never be written to);
 * - values stay UI-scale: runs, members and reminders are capped.
 *
 * Event payloads are the durable v1 shapes owned by `@deepseek-ai/dsh-tool-
 * workflow/types` and `@deepseek-ai/dsh-schedule`; they are restated locally
 * (structural, defensive) so this plugin needs no runtime dependency on those
 * packages — only the documented stable fields are read, and malformed records
 * are skipped rather than crashing the fold.
 *
 * @module dsh-client-ui-dashboard/board/fold
 */
import type {
  BoardProjection,
  BoardScheduleItem,
  BoardWorkflowMember,
  BoardWorkflowRun
} from "./types";

/** Minimal session-event shape the fold reads (type/`data` narrowing only). */
export interface BoardEventLike {
  type: string;
  data: unknown;
}

/** Cap per board: enough history for a review column, bounded for the wire. */
const MAX_RUNS = 20;
const MAX_MEMBERS = 40;
const MAX_SCHEDULE = 30;

// ── tool-workflow/* payloads (dsh-tool-workflow/types, v1) ──────────────────
interface WorkflowRunStartData {
  runId: string;
  name: string;
}
interface WorkflowAgentStartData {
  runId: string;
  seq: number;
  label: string;
  phase?: string;
  childId?: string | null;
}
interface WorkflowAgentEndData {
  runId: string;
  seq: number;
  outcome: "completed" | "failed" | "cancelled";
}
interface WorkflowRunEndData {
  runId: string;
  stopReason: "completed" | "cancelled" | "error";
}

// ── schedule/change payloads (dsh-schedule, v1) ─────────────────────────────
interface ScheduleRecordLike {
  id: string;
  kind: "after" | "at" | "every";
  prompt: string;
  scheduledAt: string;
  everySeconds?: number;
}
interface ScheduleCreateData {
  version: number;
  operation: "create";
  schedule: ScheduleRecordLike;
}
interface ScheduleDeleteData {
  version: number;
  operation: "delete";
  id: string;
}
interface ScheduleDispatchData {
  version: number;
  operation: "dispatch";
  id: string;
  acceptedAt?: string;
}
type ScheduleChangeLike = ScheduleCreateData | ScheduleDeleteData | ScheduleDispatchData;

/** Copy a list capped to `cap` newest entries (lists are newest-first). */
function capped<T>(list: readonly T[], cap: number): T[] {
  return list.length > cap ? list.slice(0, cap) : list.slice();
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/** Newest-first; a run-start on a fresh id opens the record. */
function withRun(list: readonly BoardWorkflowRun[], runId: string): BoardWorkflowRun {
  return list.find((r) => r.runId === runId) ?? {
    runId,
    name: "workflow",
    stopReason: null,
    running: true,
    members: []
  };
}

/** Replace one run by id, keeping order; returns the same list when absent. */
function replaceRun(
  list: readonly BoardWorkflowRun[],
  runId: string,
  next: BoardWorkflowRun
): readonly BoardWorkflowRun[] {
  let changed = false;
  const out = list.map((r) => {
    if (r.runId !== runId) return r;
    changed = true;
    return next;
  });
  return changed ? out : list;
}

/**
 * Fold one committed session event into the board state.
 * @param state - board state covering all prior events.
 * @param event - the next committed session event.
 * @returns the next state (same reference for unrelated events).
 */
export function foldBoard(state: BoardProjection, event: BoardEventLike): BoardProjection {
  switch (event.type) {
    case "tool-workflow/run-start": {
      const d = event.data as WorkflowRunStartData;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.name !== "string") return state;
      const run: BoardWorkflowRun = {
        runId: d.runId,
        name: d.name,
        stopReason: null,
        running: true,
        members: []
      };
      return { workflow: capped([run, ...state.workflow], MAX_RUNS), schedule: state.schedule };
    }
    case "tool-workflow/agent-start": {
      const d = event.data as WorkflowAgentStartData;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.seq !== "number") return state;
      const run = withRun(state.workflow, d.runId);
      // A member-start on an unknown run opens a display record (defensive:
      // the durable run-start must normally precede it).
      const member: BoardWorkflowMember = {
        seq: d.seq,
        label: typeof d.label === "string" ? d.label : `#${d.seq}`,
        phase: typeof d.phase === "string" && d.phase.length > 0 ? d.phase : null,
        outcome: "running",
        childId: typeof d.childId === "string" ? d.childId : null
      };
      const nextRun: BoardWorkflowRun = { ...run, members: capped([...run.members, member], MAX_MEMBERS) };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow
        ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule }
        : { workflow, schedule: state.schedule };
    }
    case "tool-workflow/agent-end": {
      const d = event.data as WorkflowAgentEndData;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.seq !== "number") return state;
      const run = withRun(state.workflow, d.runId);
      const members = run.members.map((m) =>
        m.seq === d.seq && m.outcome === "running"
          ? { ...m, outcome: d.outcome === "completed" || d.outcome === "failed" || d.outcome === "cancelled" ? d.outcome : ("failed" as const) }
          : m
      );
      const nextRun: BoardWorkflowRun = { ...run, members };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow
        ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule }
        : { workflow, schedule: state.schedule };
    }
    case "tool-workflow/run-end": {
      const d = event.data as WorkflowRunEndData;
      if (!isRecord(d) || typeof d.runId !== "string") return state;
      const run = withRun(state.workflow, d.runId);
      const stopReason =
        d.stopReason === "completed" || d.stopReason === "cancelled" || d.stopReason === "error"
          ? d.stopReason
          : "error";
      const nextRun: BoardWorkflowRun = { ...run, running: false, stopReason };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow
        ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule }
        : { workflow, schedule: state.schedule };
    }
    case "schedule/change": {
      const d = event.data as ScheduleChangeLike;
      if (!isRecord(d) || d.version !== 1 || typeof d.operation !== "string") return state;
      if (d.operation === "create") {
        const s = d.schedule;
        if (!isRecord(s) || typeof s.id !== "string" || typeof s.scheduledAt !== "string") return state;
        const kind = s.kind === "after" || s.kind === "at" || s.kind === "every" ? s.kind : "at";
        const item: BoardScheduleItem = {
          id: s.id,
          kind,
          prompt: typeof s.prompt === "string" ? s.prompt : "",
          scheduledAt: s.scheduledAt,
          everySeconds: kind === "every" && typeof s.everySeconds === "number" ? s.everySeconds : null,
          state: "scheduled"
        };
        const rest = state.schedule.filter((x) => x.id !== item.id);
        return { workflow: state.workflow, schedule: capped([item, ...rest], MAX_SCHEDULE) };
      }
      if (d.operation === "delete") {
        if (typeof d.id !== "string") return state;
        return { workflow: state.workflow, schedule: state.schedule.filter((x) => x.id !== d.id) };
      }
      if (d.operation === "dispatch") {
        if (typeof d.id !== "string") return state;
        let changed = false;
        const schedule = state.schedule.map((x) => {
          if (x.id !== d.id || x.state === "dispatched") return x;
          changed = true;
          return { ...x, state: "dispatched" as const };
        });
        return changed ? { workflow: state.workflow, schedule } : state;
      }
      return state;
    }
    default:
      return state;
  }
}
