/**
 * Browser dashboard plugin: contributes one `conversation.view` tab ("看板" /
 * "Dashboard") that renders live session metrics.
 *
 * The entry registers the tab through the slot service exactly like the
 * shipped conversation/trajectory plugins: `slots.inject("conversation.view",
 * …)` defers registration until the conversation session renders the view
 * list, and the registration rides `ctx.effect`, so plugin unload removes the
 * tab.
 *
 * View-linkage: the dashboard also declares the *same* store handle the
 * shipped conversation plugin uses for its chat tab (resolved from the chat
 * entry's `store` seat). The slot machinery keys store instances by handle
 * identity, so our entry then receives the shared `useStore`/`actions` seat —
 * letting the dashboard switch the active view and issue the one-shot
 * `inspect` handoff (trajectory linkage) exactly like the chat view's own
 * "inspect" action does.
 */
import type { Context } from "@deepseek-ai/cordis";
/** Required client services (the cordis fiber service gate). */
export declare const inject: string[];
/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export declare function apply(ctx: Context): void;
