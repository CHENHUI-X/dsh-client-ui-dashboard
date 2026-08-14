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
import { NS, zh, en } from "./locales";
import { DashboardView } from "./DashboardView";
import { injectDashboardStyles } from "./dashboard.css";

/** Required client services (the cordis fiber service gate). */
export const inject = ["slots", "locale"];

// Styles are injected once at bundle materialization (mirrors how shipped
// client bundles own their CSS), before any view renders.
injectDashboardStyles();

/** The conversation plugin's chat entry id within the view ring. */
const CHAT_ENTRY_ID = "chat";

/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export function apply(ctx: Context): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-dashboard: dictionaries");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("conversation.view", () => {
    // Grab the chat entry's store handle (the shared conversation store) and
    // re-declare it on our entry. The `slots/inject` factory runs once the
    // conversation session renders, so the chat entry is guaranteed present.
    const chat = ctx.slots.entries("conversation.view").find((e) => e.options.id === CHAT_ENTRY_ID);
    const store = chat?.store;
    return ctx.slots.register(
      {
        name: "conversation.view",
        id: "dashboard",
        order: 20,
        locale: NS,
        ...(store === undefined ? {} : { store }),
        label: () => t("view.dashboard")
      },
      DashboardView
    );
  });
}
