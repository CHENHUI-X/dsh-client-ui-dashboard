/**
 * Pure fold of the `boardState` projection unit: one committed session event →
 * next board state. Disciplines follow the session-projection contract:
 *
 * - unrelated events return the SAME state reference (the `Object.is` gate);
 * - related events rebuild only the touched branch (immutable, no in-place
 *   mutation — EMPTY_BOARD is shared and must never be written to);
 * - values stay UI-scale: runs, members and reminders are capped.
 *
 * Event payloads are the durable v1 shapes owned by `@deepseek-ai/dsh-tool-
 * workflow/types` and `@deepseek-ai/dsh-schedule`; they are restated locally
 * (structural, defensive) so this plugin needs no runtime dependency on those
 * packages — only the documented stable fields are read, and malformed records
 * are skipped rather than crashing the fold.
 *
 * @module dsh-client-ui-dashboard/board/fold
 */
import type { BoardProjection } from "./types";
/** Minimal session-event shape the fold reads (type/`data` narrowing only). */
export interface BoardEventLike {
    type: string;
    data: unknown;
}
/**
 * Fold one committed session event into the board state.
 * @param state - board state covering all prior events.
 * @param event - the next committed session event.
 * @returns the next state (same reference for unrelated events).
 */
export declare function foldBoard(state: BoardProjection, event: BoardEventLike): BoardProjection;
