/**
 * Browser dashboard plugin: contributes one `conversation.view` tab —
 * "看板 / Dashboard". The tab renders live session metrics, the HUD strip
 * (what is running right now) and the direct-child subagent status panel in a
 * single scroll view — the panel is the DashboardView's bottom section, not a
 * separate tab.
 *
 * The entry registers the tab through the slot service exactly like the
 * shipped conversation/trajectory plugins: `slots.inject("conversation.view",
 * …)` defers registration until the conversation session renders the view
 * list, and the registration rides `ctx.effect`, so plugin unload removes the
 * tab.
 *
 * View-linkage: the view also declares the *same* store handle the shipped
 * conversation plugin uses for its chat tab (resolved from the chat entry's
 * `store` seat). The slot machinery keys store instances by handle identity,
 * so our entry then receives the shared `useStore`/`actions` seat — letting
 * it switch the active view and issue the one-shot `inspect` handoff
 * (trajectory linkage) exactly like the chat view's own "inspect" action.
 */
import type { ClientContext } from "@deepseek-ai/dsh-client-runtime/client";
/** Required client services (the cordis fiber service gate). */
export declare const inject: string[];
/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
