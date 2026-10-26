/**
 * Browser dashboard plugin: contributes one `conversation.view` tab —
 * "看板 / Dashboard". The tab renders live session metrics, the HUD strip
 * (what is running right now) and the direct-child subagent status panel in a
 * single dashboard with separate overview, analysis, request and agent sections.
 *
 * The entry registers the tab through the slot service exactly like the
 * shipped conversation/trajectory plugins: `slots.inject("conversation.view",
 * …)` defers registration until the conversation session renders the view
 * list, and the registration rides `ctx.effect`, so plugin unload removes the
 * tab.
 *
 * Navigation uses the public Conversation openView callback.
 */
import type { ClientContextLike } from "./compat";
/** Required client services (the cordis fiber service gate). */
export declare const inject: string[];
/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContextLike): void;
