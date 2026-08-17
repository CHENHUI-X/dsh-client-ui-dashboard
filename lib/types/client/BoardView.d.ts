import type { ConvViewProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale } from "@deepseek-ai/dsh-client-ui-slots";
import type { NS } from "./locales";
/**
 * Standard-kit props the board body needs. `DashboardView` (the single
 * "看板" tab) renders `<BoardBody {...props} />`, so the board shares the
 * session's projected data without owning a view entry of its own.
 */
export type BoardBodyProps = Pick<ConvViewProps & PropsLocale<typeof NS>, "useSession" | "useProjection" | "useSessions" | "t" | "sessionId">;
/** The board body embedded in the dashboard tab. */
export declare function BoardBody(props: BoardBodyProps): JSX.Element;
