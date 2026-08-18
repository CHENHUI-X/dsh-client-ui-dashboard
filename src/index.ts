/**
 * Host loader entry for the dashboard plugin.
 *
 * Composes two host-side behaviors that make the board a closed loop:
 *  1. the `boardState` session-projection unit — folds `tool-workflow/*` and
 *     `schedule/change` session events into one board read model (goal and
 *     todo state stay in the official `goal` / `todos` units);
 *  2. the `board_query` model tool — the agent reads the same board the UI
 *     renders, so it can see what is in flight before planning next steps.
 *
 * The browser half (`./client`) contributes the views that render this state.
 */
import type { Context } from "@deepseek-ai/cordis";
import { z } from "zod";
import type {} from "@deepseek-ai/dsh-session-projection";
import { foldBoard } from "./board/fold";
import type { BoardProjection } from "./board/types";
import { registerBoardTools } from "./board/tool";

export const name = "dsh-client-ui-dashboard";
export const inject = ["tools"];

/** Wire schema of the `boardState` projection (strict, whole value). */
const memberOutcome = z.union([
  z.literal("running"),
  z.literal("completed"),
  z.literal("failed"),
  z.literal("cancelled")
]);
const workflowMember = z.object({
  seq: z.number(),
  label: z.string(),
  phase: z.string().nullable(),
  outcome: memberOutcome,
  childId: z.string().nullable()
});
const workflowRun = z.object({
  runId: z.string(),
  name: z.string(),
  stopReason: z
    .union([z.literal("completed"), z.literal("cancelled"), z.literal("error")])
    .nullable(),
  running: z.boolean(),
  members: z.array(workflowMember)
});
const scheduleItem = z.object({
  id: z.string(),
  kind: z.union([z.literal("after"), z.literal("at"), z.literal("every")]),
  prompt: z.string(),
  scheduledAt: z.string(),
  everySeconds: z.number().nullable(),
  state: z.union([z.literal("scheduled"), z.literal("dispatched")])
});
const boardSchema = z.object({
  workflow: z.array(workflowRun),
  schedule: z.array(scheduleItem)
});

/**
 * Host plugin body: register the board projection unit and the `board_query`
 * tool.
 * @param ctx - host root context.
 */
export function apply(ctx: Context): void {
  ctx.inject(["sessionProjections"], (projectionCtx) => {
    projectionCtx.sessionProjections.register({
      key: "boardState",
      schema: boardSchema,
      init: (): BoardProjection => ({ workflow: [], schedule: [] }),
      apply: foldBoard,
      view: (state) => state,
      stateVersion: 1
    });
  });
  registerBoardTools(ctx);
}
