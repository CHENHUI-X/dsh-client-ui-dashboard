import type { PropsLocale, ViewRuntimeKit } from "./compat";
import type { NS } from "./locales";
import type { BoardNavigation } from "./BoardView";
export type DashboardViewProps = ViewRuntimeKit & PropsLocale<typeof NS> & BoardNavigation;
/** The dashboard conversation-view entry. */
export declare function DashboardView(props: DashboardViewProps): JSX.Element;
