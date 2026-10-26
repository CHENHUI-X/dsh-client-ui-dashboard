/**
 * Loads the module augmentations the plugin's typed calls rely on, then
 * declares the pieces 0.2.x no longer publishes as a package:
 *
 *  - `ConversationViewSnapshotMap` entries: `chat` (shipped chat contract) and
 *    `trajectory` (declared locally from this plugin's structural contract —
 *    a community plugin must not hard-depend on another UI plugin's types).
 *  - projection keys `tokenUsage` / `contextBreakdown` / `contextPressure`
 *    (`dsh-token-meter`) and `sessionStats` (`dsh-session-stats`).
 */
import type {} from "@deepseek-ai/dsh-client-locale/client";
import type {} from "@deepseek-ai/dsh-client-ui-chat/client";
import type {} from "@deepseek-ai/dsh-client-ui-conversation/client";
import type {} from "@deepseek-ai/dsh-token-meter/client";
import type {} from "@deepseek-ai/dsh-session-stats/client";
import type {} from "@deepseek-ai/dsh-goal";
import type {} from "@deepseek-ai/dsh-tool-todo";

/** This plugin's locale dictionary key union (single source: locales.ts). */
export type { DashboardLocaleKey } from "./locales";

declare module "@deepseek-ai/dsh-client-ui-conversation/client" {
  interface ConversationViewSnapshotMap {
    /** The `trajectory` view snapshot, structurally narrowed to what the dashboard reads. */
    trajectory: import("./trajectory-contract").TrajectorySnapshot;
  }
}
