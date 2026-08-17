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
export declare const name = "dsh-client-ui-dashboard";
export declare const inject: string[];
/**
 * Host plugin body: register the board projection unit and the `board_query`
 * tool.
 * @param ctx - host root context.
 */
export declare function apply(ctx: Context): void;
