import type { PropsLocale, SubagentAddress, ViewRuntimeKit } from "./compat";
import type { NS } from "./locales";
/**
 * Standard-kit props the board body needs. DashboardView renders this inside
 * the existing dashboard tab, so no separate view entry or host round-trip is
 * introduced.
 */
export type BoardBodyProps = Pick<ViewRuntimeKit & PropsLocale<typeof NS>, "useSessions" | "t" | "sessionId"> & BoardNavigation;
/** Navigation supplied by the host Workspace service. */
export interface BoardNavigation {
    openSubagent: (address: SubagentAddress) => void;
}
/** The board body embedded in the dashboard tab. */
export declare function BoardBody(props: BoardBodyProps): JSX.Element;
