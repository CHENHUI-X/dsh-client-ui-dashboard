/**
 * HUD strip: one compact status row showing what the harness is doing RIGHT
 * NOW — running state, the current tool call, the active goal, in-flight
 * todos, running subagents, live workflow runs and the next schedule reminder.
 * Rendered once by the Dashboard view (top of the 看板 tab); the board body
 * below shares the same derived data.
 *
 * Accessibility: status is text, never color alone; the strip is one atomic
 * `role="status"` region (implicit aria-live=polite). The per-second tool
 * elapsed ticker is excluded from announcements (aria-hidden) so the region
 * only announces meaningful changes (running counts, goal, reminders).
 */
import { useMemo } from "react";
import type { GoalProjection, TodoItem } from "./board";
import type { DashboardLocaleKey } from "./locales";
import type { BoardProjection, BoardScheduleItem } from "./board";
import { EMPTY_BOARD, isOverdue, nextSchedule } from "./board";
import type { SubagentEntryLike } from "./board";

/** Inputs for the HUD derivation (assembled by the owning view from its hooks). */
export interface HudInput {
  running: boolean;
  runningCalls: readonly { name: string; time: number }[];
  goal: GoalProjection | null | undefined;
  todos: TodoItem[] | null | undefined;
  board: BoardProjection | undefined;
  subagentEntries: readonly SubagentEntryLike[];
}

/** Everything the strip renders, derived in one memoized pass. */
export interface HudData {
  running: boolean;
  currentTool: { name: string; time: number } | null;
  goal: GoalProjection | null;
  inProgressTodos: number;
  runningWorkflow: number;
  runningSubagents: number;
  nextSchedule: BoardScheduleItem | null;
  /** True when `nextSchedule` has passed its target and is still pending. */
  nextScheduleOverdue: boolean;
}

/** Derive the HUD payload from framework data (pure, memoized). */
export function useHudData(input: HudInput): HudData {
  return useMemo(() => {
    const board = input.board ?? EMPTY_BOARD;
    const now = Date.now();
    const next = nextSchedule(board);
    return {
      running: input.running,
      currentTool: input.runningCalls[0] ?? null,
      goal: input.goal ?? null,
      inProgressTodos: (input.todos ?? []).filter((t) => t.status === "in_progress").length,
      runningWorkflow: board.workflow.filter((r) => r.running).length,
      runningSubagents: input.subagentEntries.filter((e) => e.activity === "running").length,
      nextSchedule: next,
      nextScheduleOverdue: next !== null && isOverdue(next, now)
    };
  }, [input.running, input.runningCalls, input.goal, input.todos, input.board, input.subagentEntries]);
}

/** Localized phase label for the goal chip. */
export function goalPhaseLabel(t: (key: DashboardLocaleKey) => string, phase: string): string {
  switch (phase) {
    case "active":
      return t("board.goal.phase.active");
    case "paused":
      return t("board.goal.phase.paused");
    case "complete":
      return t("board.goal.phase.complete");
    case "blocked":
      return t("board.goal.phase.blocked");
    default:
      return phase;
  }
}

/** Compact goal chip value: "objective (第n/m轮)" with the objective clipped. */
export function goalShortLabel(t: (key: DashboardLocaleKey) => string, goal: GoalProjection): string {
  const objective = goal.goal.objective;
  const clipped = objective.length > 28 ? `${objective.slice(0, 28)}…` : objective;
  const rounds = t("board.goal.rounds").replace("{n}", String(goal.roundsStarted)).replace("{m}", String(goal.goal.maxGoalRounds));
  return `${clipped} · ${rounds}`;
}

/** Format a schedule target for display: local HH:MM, with a date prefix
 *  (M/D) when the target is not today. */
export function scheduleDueLabel(item: BoardScheduleItem): string {
  const at = Date.parse(item.scheduledAt);
  if (!Number.isFinite(at)) return item.scheduledAt;
  const d = new Date(at);
  const now = new Date();
  const pad = (n: number): string => String(n).padStart(2, "0");
  const hhmm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()) {
    return hhmm;
  }
  return `${d.getMonth() + 1}/${d.getDate()} ${hhmm}`;
}

/** Elapsed time for a running tool call ("5s", "2m3s", "1h2m"). */
export function elapsedLabel(time: number, nowMs: number): string {
  if (!Number.isFinite(time)) return "";
  const s = Math.max(0, Math.round((nowMs - time) / 1000));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m${s % 60 > 0 ? `${s % 60}s` : ""}`;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h${m > 0 ? `${m}m` : ""}`;
}

function Chip(props: {
  tone: "accent" | "good" | "warn" | "bad" | "idle";
  label: string;
  value: string;
  /** Appended to the value but hidden from screen readers (e.g. live ticks). */
  quietSuffix?: string;
}): JSX.Element {
  const { tone, label, value, quietSuffix } = props;
  return (
    <span className="dshd-hud-chip" data-tone={tone}>
      <span className={`dshd-hud-dot dshd-dot-${tone}`} aria-hidden="true" />
      <span className="dshd-hud-label">{label}</span>
      <span className="dshd-hud-value">
        {value}
        {quietSuffix !== undefined && <span aria-hidden="true">{quietSuffix}</span>}
      </span>
    </span>
  );
}

/** The HUD strip. `t` is the view's bound locale function. */
export function HudStrip(props: { data: HudData; t: (key: DashboardLocaleKey) => string }): JSX.Element {
  const { data, t } = props;
  const nowMs = Date.now();
  const goal = data.goal;
  const goalTone =
    goal === null ? "idle" : goal.goal.phase === "blocked" ? "bad" : goal.goal.phase === "active" ? "accent" : "idle";
  return (
    <div className="dshd-hud" role="status">
      <Chip
        tone={data.running ? "accent" : "idle"}
        label={t("hud.status")}
        value={data.running ? t("hud.status.running") : t("hud.status.idle")}
      />
      {data.currentTool !== null && (
        <Chip
          tone="accent"
          label={t("hud.tool")}
          value={data.currentTool.name}
          quietSuffix={` · ${elapsedLabel(data.currentTool.time, nowMs)}`}
        />
      )}
      {goal !== null && (
        <Chip tone={goalTone} label={t("hud.goal")} value={goalShortLabel(t, goal)} />
      )}
      {data.inProgressTodos > 0 && (
        <Chip
          tone="good"
          label={t("hud.todos")}
          value={t("hud.todos.value").replace("{n}", String(data.inProgressTodos))}
        />
      )}
      {data.runningSubagents > 0 && (
        <Chip
          tone="good"
          label={t("hud.subagents")}
          value={t("hud.subagents.value").replace("{n}", String(data.runningSubagents))}
        />
      )}
      {data.runningWorkflow > 0 && (
        <Chip
          tone="good"
          label={t("hud.workflow")}
          value={t("hud.workflow.value").replace("{n}", String(data.runningWorkflow))}
        />
      )}
      {data.nextSchedule !== null && (
        <Chip
          tone={data.nextScheduleOverdue ? "warn" : "idle"}
          label={t("hud.schedule")}
          value={
            data.nextScheduleOverdue
              ? t("board.schedule.overdue")
              : scheduleDueLabel(data.nextSchedule)
          }
        />
      )}
    </div>
  );
}
