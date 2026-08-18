/**
 * A focused status surface for the session's direct subagents.
 *
 * The old mixed kanban combined goals, todos and reminders with child
 * sessions, which made an inactive child look like a planned task. The
 * subagent catalog is the authoritative source for this section, so every
 * card now represents one child and one observable lifecycle state.
 */
import type { ConvViewProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale } from "@deepseek-ai/dsh-client-ui-slots";
import type { SubagentAddress } from "@deepseek-ai/dsh-client-runtime/client";
import type { NS } from "./locales";
/**
 * Standard-kit props the board body needs. DashboardView renders this inside
 * the existing dashboard tab, so no separate view entry or host round-trip is
 * introduced.
 */
export type BoardBodyProps = Pick<ConvViewProps & PropsLocale<typeof NS>, "useSessions" | "t" | "sessionId"> & BoardNavigation;
/** Navigation face supplied by the browser plugin's sessions service. */
export interface BoardNavigation {
    openSubagent: (address: SubagentAddress) => void;
}
/** The board body embedded in the dashboard tab. */
export declare function BoardBody(props: BoardBodyProps): JSX.Element;
