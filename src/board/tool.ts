/**
 * `board_query` model tool: lets the agent read the same board the UI renders —
 * goal, todos and the `boardState` fold — from one snapshot call. Read-only,
 * no mutations, no session events of its own; it is the "model visibility" half
 * of the board, so the agent can see what is in flight before planning next
 * steps (the closed loop).
 *
 * @module dsh-client-ui-dashboard/board/tool
 */
import type { Context } from "@deepseek-ai/cordis";
import { defineTool } from "@deepseek-ai/dsh-tools";
import type { JsonValue } from "@deepseek-ai/dsh-tools";
import { EMPTY_BOARD } from "./types";
import type { BoardProjection } from "./types";

/** Tool-call result shape (mirrors the output schema). */
export interface BoardQueryResult {
  /** The `goal` projection value (dsh-goal) or null. */
  goal: JsonValue;
  /** The `todos` projection value (dsh-tool-todo) or null. */
  todos: JsonValue;
  /** This plugin's `boardState` fold (workflow runs + schedule reminders). */
  board: JsonValue;
}

/** One-line summary for the native tool-result card. */
export function renderBoardSummary(value: BoardQueryResult): string {
  const board = value.board as unknown as BoardProjection;
  const running = board.workflow.filter((r) => r.running).length;
  const scheduled = board.schedule.filter((s) => s.state === "scheduled").length;
  const parts: string[] = [];
  parts.push(running > 0 ? `${running} workflow running` : "no workflow running");
  parts.push(`${board.workflow.length} workflow total`);
  parts.push(`${scheduled} reminders pending`);
  return `Board: ${parts.join(" · ")}.`;
}

/**
 * Register the `board_query` tool on `ctx.tools`.
 * @param ctx - registrant context carrying the tool registry (inject: ["tools"]).
 */
export function registerBoardTools(ctx: Context): void {
  ctx.tools.register(
    defineTool({
      name: "board_query",
      description:
        "Read the current session's board: the active goal, the todo list, workflow runs, schedule reminders and live agent activity, folded from the session log. Use it before planning next steps to see what is already in flight — it never mutates anything.",
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
        // goal/todos are owned by dsh-goal / dsh-tool-todo projection units; this
        // plugin only composes with them, so read them loosely from the snapshot.
        const snap = ctx.sessionProjections.snapshot(exec.agent.session);
        const values = snap.values as Record<string, unknown>;
        const board = (values.boardState as BoardProjection | undefined) ?? EMPTY_BOARD;
        const result: BoardQueryResult = {
          goal: (values.goal ?? null) as JsonValue,
          todos: (values.todos ?? null) as JsonValue,
          board: board as unknown as JsonValue
        };
        return Promise.resolve(result);
      },
      presentCall: () => ({ card: "generic", title: "Query board", kind: "read", rawInput: {} })
    })
  );
}
