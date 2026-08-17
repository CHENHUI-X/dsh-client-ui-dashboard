// src/index.ts
import { z } from "zod";

// src/board/fold.ts
var MAX_RUNS = 20;
var MAX_MEMBERS = 40;
var MAX_SCHEDULE = 30;
function capped(list, cap) {
  return list.length > cap ? list.slice(0, cap) : list.slice();
}
function isRecord(v) {
  return typeof v === "object" && v !== null;
}
function withRun(list, runId) {
  return list.find((r) => r.runId === runId) ?? {
    runId,
    name: "workflow",
    stopReason: null,
    running: true,
    members: []
  };
}
function replaceRun(list, runId, next) {
  let changed = false;
  const out = list.map((r) => {
    if (r.runId !== runId) return r;
    changed = true;
    return next;
  });
  return changed ? out : list;
}
function foldBoard(state, event) {
  switch (event.type) {
    case "tool-workflow/run-start": {
      const d = event.data;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.name !== "string") return state;
      const run = {
        runId: d.runId,
        name: d.name,
        stopReason: null,
        running: true,
        members: []
      };
      return { workflow: capped([run, ...state.workflow], MAX_RUNS), schedule: state.schedule };
    }
    case "tool-workflow/agent-start": {
      const d = event.data;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.seq !== "number") return state;
      const run = withRun(state.workflow, d.runId);
      const member = {
        seq: d.seq,
        label: typeof d.label === "string" ? d.label : `#${d.seq}`,
        phase: typeof d.phase === "string" && d.phase.length > 0 ? d.phase : null,
        outcome: "running",
        childId: typeof d.childId === "string" ? d.childId : null
      };
      const nextRun = { ...run, members: capped([...run.members, member], MAX_MEMBERS) };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule } : { workflow, schedule: state.schedule };
    }
    case "tool-workflow/agent-end": {
      const d = event.data;
      if (!isRecord(d) || typeof d.runId !== "string" || typeof d.seq !== "number") return state;
      const run = withRun(state.workflow, d.runId);
      const members = run.members.map(
        (m) => m.seq === d.seq && m.outcome === "running" ? { ...m, outcome: d.outcome === "completed" || d.outcome === "failed" || d.outcome === "cancelled" ? d.outcome : "failed" } : m
      );
      const nextRun = { ...run, members };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule } : { workflow, schedule: state.schedule };
    }
    case "tool-workflow/run-end": {
      const d = event.data;
      if (!isRecord(d) || typeof d.runId !== "string") return state;
      const run = withRun(state.workflow, d.runId);
      const stopReason = d.stopReason === "completed" || d.stopReason === "cancelled" || d.stopReason === "error" ? d.stopReason : "error";
      const nextRun = { ...run, running: false, stopReason };
      const workflow = replaceRun(state.workflow, d.runId, nextRun);
      return workflow === state.workflow ? { workflow: capped([nextRun, ...state.workflow], MAX_RUNS), schedule: state.schedule } : { workflow, schedule: state.schedule };
    }
    case "schedule/change": {
      const d = event.data;
      if (!isRecord(d) || d.version !== 1 || typeof d.operation !== "string") return state;
      if (d.operation === "create") {
        const s = d.schedule;
        if (!isRecord(s) || typeof s.id !== "string" || typeof s.scheduledAt !== "string") return state;
        const kind = s.kind === "after" || s.kind === "at" || s.kind === "every" ? s.kind : "at";
        const item = {
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
          return { ...x, state: "dispatched" };
        });
        return changed ? { workflow: state.workflow, schedule } : state;
      }
      return state;
    }
    default:
      return state;
  }
}

// src/board/tool.ts
import { defineTool } from "@deepseek-ai/dsh-tools";

// src/board/types.ts
var EMPTY_BOARD = { workflow: [], schedule: [] };

// src/board/tool.ts
function renderBoardSummary(value) {
  const board = value.board;
  const running = board.workflow.filter((r) => r.running).length;
  const scheduled = board.schedule.filter((s) => s.state === "scheduled").length;
  const parts = [];
  parts.push(running > 0 ? `${running} workflow running` : "no workflow running");
  parts.push(`${board.workflow.length} workflow total`);
  parts.push(`${scheduled} reminders pending`);
  return `Board: ${parts.join(" \xB7 ")}.`;
}
function registerBoardTools(ctx) {
  ctx.tools.register(
    defineTool({
      name: "board_query",
      description: "Read the current session's board: the active goal, the todo list, workflow runs, schedule reminders and live agent activity, folded from the session log. Use it before planning next steps to see what is already in flight \u2014 it never mutates anything.",
      parameters: {},
      output: {
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            goal: {
              type: "json",
              required: true,
              description: "The active goal projection (objective/phase/roundsStarted/maxGoalRounds/blockedReason) or null."
            },
            todos: {
              type: "json",
              required: true,
              description: "The current todo list ({content, status}) or null before the first write."
            },
            board: {
              type: "json",
              required: true,
              description: "The board fold: workflow runs (newest first, members carry label/phase/outcome) and schedule reminders (state scheduled|dispatched)."
            }
          }
        },
        render: (_args, value) => [{ type: "text", text: renderBoardSummary(value) }]
      },
      execute(_args, exec) {
        if (!exec.agent) throw new Error("board_query requires an owning agent session");
        const snap = ctx.sessionProjections.snapshot(exec.agent.session);
        const values = snap.values;
        const board = values.boardState ?? EMPTY_BOARD;
        const result = {
          goal: values.goal ?? null,
          todos: values.todos ?? null,
          board
        };
        return Promise.resolve(result);
      },
      presentCall: () => ({ card: "generic", title: "Query board", kind: "read", rawInput: {} })
    })
  );
}

// src/index.ts
var name = "dsh-client-ui-dashboard";
var inject = ["tools"];
var memberOutcome = z.union([
  z.literal("running"),
  z.literal("completed"),
  z.literal("failed"),
  z.literal("cancelled")
]);
var workflowMember = z.object({
  seq: z.number(),
  label: z.string(),
  phase: z.string().nullable(),
  outcome: memberOutcome,
  childId: z.string().nullable()
});
var workflowRun = z.object({
  runId: z.string(),
  name: z.string(),
  stopReason: z.union([z.literal("completed"), z.literal("cancelled"), z.literal("error")]).nullable(),
  running: z.boolean(),
  members: z.array(workflowMember)
});
var scheduleItem = z.object({
  id: z.string(),
  kind: z.union([z.literal("after"), z.literal("at"), z.literal("every")]),
  prompt: z.string(),
  scheduledAt: z.string(),
  everySeconds: z.number().nullable(),
  state: z.union([z.literal("scheduled"), z.literal("dispatched")])
});
var boardSchema = z.object({
  workflow: z.array(workflowRun),
  schedule: z.array(scheduleItem)
});
function apply(ctx) {
  ctx.inject(["sessionProjections"], (projectionCtx) => {
    projectionCtx.sessionProjections.register({
      key: "boardState",
      schema: boardSchema,
      init: () => ({ workflow: [], schedule: [] }),
      apply: foldBoard,
      view: (state) => state,
      stateVersion: 1
    });
  });
  registerBoardTools(ctx);
}
export {
  apply,
  inject,
  name
};
