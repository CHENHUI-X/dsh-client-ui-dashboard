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
import type { JsonValue } from "@deepseek-ai/dsh-tools";
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
export declare function renderBoardSummary(value: BoardQueryResult): string;
/**
 * Register the `board_query` tool on `ctx.tools`.
 * @param ctx - registrant context carrying the tool registry (inject: ["tools"]).
 */
export declare function registerBoardTools(ctx: Context): void;
