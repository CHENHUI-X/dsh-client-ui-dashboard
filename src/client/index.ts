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
import type { ClientContext, ISessions, SubagentAddress } from "@deepseek-ai/dsh-client-runtime/client";
import { NS, zh, en } from "./locales";
import { DashboardView } from "./DashboardView";
import type { BoardNavigation } from "./BoardView";
import { injectDashboardStyles } from "./dashboard.css";

/** Required client services (the cordis fiber service gate). */
export const inject = ["slots", "locale", "sessions"];

// Styles are injected once at bundle materialization (mirrors how shipped
// client bundles own their CSS), before any view renders.
injectDashboardStyles();

/** The conversation plugin's chat entry id within the view ring. */
const CHAT_ENTRY_ID = "chat";

/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-dashboard: dictionaries");
  const t = ctx.locale.bind(NS);
  // Some host-side packages also declare a `sessions` context member. Keep
  // this browser registration pinned to the runtime navigation face, whose
  // `openSubagent` method is the canonical deep-link action.
  const sessions = ctx.sessions as unknown as Pick<ISessions, "openSubagent">;

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
        inject: (): BoardNavigation => ({
          openSubagent: (address: SubagentAddress) => { sessions.openSubagent(address); },
        }),
        ...(store === undefined ? {} : { store }),
        label: () => t("view.dashboard")
      },
      DashboardView
    );
  });
}
