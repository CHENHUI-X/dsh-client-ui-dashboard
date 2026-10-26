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
import type { ClientContextLike, SubagentAddress } from "./compat";
import { NS, zh, en } from "./locales";
import { DashboardView } from "./DashboardView";
import type { BoardNavigation } from "./BoardView";
import { injectDashboardStyles } from "./dashboard.css";

/** Required client services (the cordis fiber service gate). */
export const inject = ["slots", "locale", "uiWorkspace"];

// Styles are injected once at bundle materialization (mirrors how shipped
// client bundles own their CSS), before any view renders.
injectDashboardStyles();

/**
 * Client plugin body: register the dashboard view tab.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContextLike): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-dashboard: dictionaries");
  const t = ctx.locale.bind(NS);
  // 0.2.x moved Session navigation to the Workspace navigation face:
  // `uiWorkspace.openSession(target)` accepts a durable child address.
  const workspace = ctx.uiWorkspace;

  ctx.slots.inject("conversation.view", () => {
    return ctx.slots.register(
      {
        name: "conversation.view",
        id: "dashboard",
        order: 20,
        locale: NS,
        inject: (): BoardNavigation => ({
          openSubagent: (address: SubagentAddress) => { workspace.openSession(address); },
        }),
        label: () => t("view.dashboard")
      },
      DashboardView
    );
  });
}
