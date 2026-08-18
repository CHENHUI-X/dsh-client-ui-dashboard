import type { GoalProjection, TodoItem } from "./board";
import type { DashboardLocaleKey } from "./locales";
import type { BoardProjection, BoardScheduleItem } from "./board";
import type { SubagentEntryLike } from "./board";
/** Inputs for the HUD derivation (assembled by the owning view from its hooks). */
export interface HudInput {
    running: boolean;
    runningCalls: readonly {
        name: string;
        time: number;
    }[];
    goal: GoalProjection | null | undefined;
    todos: TodoItem[] | null | undefined;
    board: BoardProjection | undefined;
    subagentEntries: readonly SubagentEntryLike[];
}
/** Everything the strip renders, derived in one memoized pass. */
export interface HudData {
    running: boolean;
    currentTool: {
        name: string;
        time: number;
    } | null;
    goal: GoalProjection | null;
    inProgressTodos: number;
    runningWorkflow: number;
    runningSubagents: number;
    nextSchedule: BoardScheduleItem | null;
    /** True when `nextSchedule` has passed its target and is still pending. */
    nextScheduleOverdue: boolean;
}
/** Derive the HUD payload from framework data (pure, memoized). */
export declare function useHudData(input: HudInput): HudData;
/** Localized phase label for the goal chip. */
export declare function goalPhaseLabel(t: (key: DashboardLocaleKey) => string, phase: string): string;
/** Compact goal chip value: "objective (第n/m轮)" with the objective clipped. */
export declare function goalShortLabel(t: (key: DashboardLocaleKey) => string, goal: GoalProjection): string;
/** Format a schedule target for display: local HH:MM, with a date prefix
 *  (M/D) when the target is not today. */
export declare function scheduleDueLabel(item: BoardScheduleItem): string;
/** Elapsed time for a running tool call ("5s", "2m3s", "1h2m"). */
export declare function elapsedLabel(time: number, nowMs: number): string;
/** The HUD strip. `t` is the view's bound locale function. */
export declare function HudStrip(props: {
    data: HudData;
    t: (key: DashboardLocaleKey) => string;
}): JSX.Element;
