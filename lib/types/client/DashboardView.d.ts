import type { ConvViewProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale, SnapshotSelectorHook } from "@deepseek-ai/dsh-client-ui-slots";
import type { NS } from "./locales";
/** The shared conversation store's action surface (structural subset). */
interface SharedChatActions {
    select(target: {
        turnSeq: number;
        stepSeq?: number;
        callId?: string;
        toolName?: string;
    } | null): void;
    setDraft(text: string): void;
    setView(view: string | null): void;
    setInspect(target: {
        callId: string;
    } | null): void;
}
export type DashboardViewProps = ConvViewProps & PropsLocale<typeof NS> & {
    useStore?: SnapshotSelectorHook<unknown>;
    actions?: SharedChatActions;
};
/** The dashboard conversation-view entry. */
export declare function DashboardView(props: DashboardViewProps): JSX.Element;
export {};
