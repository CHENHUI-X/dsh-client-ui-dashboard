/** Trajectory fields consumed by the dashboard; request records use the official shared type. */
import type { ConversationNode, RequestView } from "@deepseek-ai/dsh-client-ui-conversation/client";

export type TrajectoryRequestView = RequestView;

export interface TrajectorySnapshot {
  readonly eventNodes: readonly ConversationNode[];
  readonly requests: readonly RequestView[];
}
