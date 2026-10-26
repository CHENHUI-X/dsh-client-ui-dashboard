import type { PropsLocale, ViewRuntimeKit } from "./compat";
import type { NS } from "./locales";
import type { DashboardMetrics } from "./metrics";
import type { BoardNavigation } from "./BoardView";
export type DashboardViewProps = ViewRuntimeKit & PropsLocale<typeof NS> & BoardNavigation;
/** Tool wall times are cumulative samples, not the session's elapsed time. */
export declare function ToolAnalysis({ metrics, t }: {
    metrics: DashboardMetrics;
    t: DashboardViewProps["t"];
}): JSX.Element;
/** The dashboard conversation-view entry. */
export declare function DashboardView(props: DashboardViewProps): JSX.Element;
