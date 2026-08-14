/**
 * Load the module augmentations the plugin's typed calls rely on:
 *  - `ctx.slots` / `ctx.sessions` / standard props (dsh-client-runtime)
 *  - `ctx.locale` (dsh-client-locale)
 *  - the `conversation.view` SlotMap entry and its owner/locale typing
 *    (dsh-client-ui-conversation)
 *  - projection keys `tokenUsage` / `contextBreakdown` / `contextPressure`
 *    (dsh-token-meter) and `sessionStats` (dsh-session-stats)
 */
import type {} from "@deepseek-ai/dsh-client-runtime/client";
import type {} from "@deepseek-ai/dsh-client-locale/client";
import type {} from "@deepseek-ai/dsh-client-ui-conversation/client";
import type {} from "@deepseek-ai/dsh-token-meter/client";
import type {} from "@deepseek-ai/dsh-session-stats/client";
import type { zh } from "./locales";

/** This plugin's locale dictionary key union. */
export type DashboardLocaleKey = keyof typeof zh;

declare module "@deepseek-ai/dsh-client-ui-slots" {
  interface LocaleNamespaceMap {
    dashboard: DashboardLocaleKey;
  }
}

declare module "@deepseek-ai/dsh-client-runtime/client" {
  interface ConversationViewSnapshotMap {
    /**
     * The `trajectory` view snapshot, structurally narrowed to the subset the
     * dashboard reads. The real producer is the shipped ui-trajectory plugin;
     * we deliberately avoid importing its package types so this plugin has no
     * dependency on another UI plugin.
     */
    trajectory: import("./trajectory-contract").TrajectorySnapshot;
  }
}
