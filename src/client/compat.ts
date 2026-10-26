/**
 * Structural seats of the 0.2.x browser slot runtime.
 *
 * dsh 0.2.x split the old monolithic `dsh-client-runtime` into
 * `dsh-api-session-controller` (Session snapshot), the Conversation contract
 * and the Chat contract, and retired the published `dsh-client-ui-slots`
 * types (they live inside the shell bundle now). The runtime seats themselves
 * keep their names, so this file declares the shapes the plugin consumes
 * while importing the real snapshot types where they exist.
 */
import type { SessionSnapshot, SessionListState, SessionTarget, UseProjection } from "@deepseek-ai/dsh-api-session-controller/client";
import type { ConversationSnapshot } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { DashboardLocaleKey } from "./locales";

/** Locale seat handed to a view entry. */
export interface PropsLocale<_NS extends string = string> {
  t: (key: DashboardLocaleKey) => string;
}

/** Snapshot selector hook seat. */
export type SnapshotSelectorHook<T> = <U>(selector: (snapshot: T) => U) => U;

/** Durable direct-parent address of a child Session. */
export type SubagentAddress = Exclude<SessionTarget, string>;

/** Standard runtime kit a `conversation.view` entry is rendered with. */
export interface ViewRuntimeKit {
  /** Current Session identity. */
  sessionId: string;
  /** Session-owned snapshot: running / hasMore / blank / open state. */
  useSession: SnapshotSelectorHook<SessionSnapshot>;
  /** Target-neutral Conversation snapshot: registered view snapshots. */
  useConversation: SnapshotSelectorHook<ConversationSnapshot>;
  /** Subscribing activates the lazy trajectory target before reading request records. */
  useTrajectory: SnapshotSelectorHook<import("./trajectory-contract").TrajectorySnapshot>;
  /** Session catalog (rows + projection values). */
  useSessions: SnapshotSelectorHook<SessionListState>;
  /** Host-computed projection value by key. */
  useProjection: UseProjection;
  /** Public Conversation navigation; focus is a tool-call identity. */
  openView: (view: string, focus: string) => void;
}

/** Slot registry face used by the plugin. */
export interface SlotRegistry {
  inject(name: string, factory: () => unknown): void;
  register(options: Record<string, unknown>, component: unknown): unknown;
}

/** Locale registry face used by the plugin. */
export interface LocaleService {
  register(namespace: string, dictionaries: { zh: unknown; en: unknown }): () => void;
  bind(namespace: string): (key: DashboardLocaleKey) => string;
}

/** Workspace navigation face: the 0.2.x replacement for `sessions.openSubagent`. */
export interface UiWorkspaceService {
  openSession(target: SubagentAddress): void;
}

/** Client root context, narrowed to the services this plugin injects. */
export interface ClientContextLike {
  slots: SlotRegistry;
  locale: LocaleService;
  uiWorkspace: UiWorkspaceService;
  effect(callback: () => (() => void) | void, label?: string): () => void;
}
