/**
 * A focused status surface for the session's direct subagents.
 *
 * The old mixed kanban combined goals, todos and reminders with child
 * sessions, which made an inactive child look like a planned task. The
 * subagent catalog is the authoritative source for this section, so every
 * card now represents one child and one observable lifecycle state.
 */
import type { ConvViewProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { PropsLocale } from "@deepseek-ai/dsh-client-ui-slots";
import type { SubagentAddress } from "@deepseek-ai/dsh-client-runtime/client";
import type { NS, DashboardLocaleKey } from "./locales";
import { childEntries } from "./board";
import type { SessionSummaryLike, SubagentEntryLike } from "./board";

/**
 * Standard-kit props the board body needs. DashboardView renders this inside
 * the existing dashboard tab, so no separate view entry or host round-trip is
 * introduced.
 */
export type BoardBodyProps = Pick<
  ConvViewProps & PropsLocale<typeof NS>,
  "useSessions" | "t" | "sessionId"
> & BoardNavigation;

/** Navigation face supplied by the browser plugin's sessions service. */
export interface BoardNavigation {
  openSubagent: (address: SubagentAddress) => void;
}

type SubagentState = "running" | "completed" | "inactive";

function summaryOf(
  summaries: Readonly<Record<string, unknown>>,
  childId: string
): SessionSummaryLike | undefined {
  const value = summaries[childId];
  if (typeof value !== "object" || value === null) return undefined;
  return value as SessionSummaryLike;
}

/** The catalog is authoritative for running; `completed` only refines settled rows. */
function subagentState(entry: SubagentEntryLike, summary: SessionSummaryLike | undefined): SubagentState {
  if (entry.activity === "running") return "running";
  return summary?.completed === true ? "completed" : "inactive";
}

function summaryTitle(summary: SessionSummaryLike | undefined): string | undefined {
  const title = summary?.title ?? summary?.displayTitle;
  return typeof title === "string" && title.length > 0 ? title : undefined;
}

function SubagentCard(props: {
  entry: SubagentEntryLike;
  summary: SessionSummaryLike | undefined;
  onOpen: () => void;
  t: (key: DashboardLocaleKey) => string;
}): JSX.Element {
  const { entry, summary, onOpen, t } = props;
  const state = subagentState(entry, summary);
  const label = entry.label ?? summaryTitle(summary) ?? entry.id;
  const mode = entry.mode === "continuable" ? t("board.subagent.mode.continuable") : t("board.subagent.mode.oneShot");
  const status =
    state === "running"
      ? t("board.subagents.running")
      : state === "completed"
        ? t("board.subagents.completed")
        : t("board.subagents.inactive");

  return (
    <article className="dshd-subagentCard" data-state={state} title={entry.id}>
      <div className="dshd-subagentCardHead">
        <span className="dshd-subagentDot" aria-hidden="true" />
        <div className="dshd-subagentIdentity">
          <span className="dshd-subagentTitle">{label}</span>
          <span className="dshd-subagentMode">{mode}</span>
        </div>
        <span className="dshd-subagentStatus">{status}</span>
      </div>
      <div className="dshd-subagentMeta">
        <span>{entry.id}</span>
        {state === "inactive" && <span className="dshd-subagentMetaHint">{t("board.subagents.inactiveNote")}</span>}
        <button
          type="button"
          className="dshd-subagentOpen"
          onClick={onOpen}
          aria-label={t("board.subagents.openAria").replace("{name}", label)}
        >
          {t("board.subagents.open")}
        </button>
      </div>
    </article>
  );
}

/** The board body embedded in the dashboard tab. */
export function BoardBody(props: BoardBodyProps): JSX.Element {
  const { useSessions, t, sessionId, openSubagent } = props;
  const catalogs = useSessions((s) => s.subagentsByParent);
  const summaries = useSessions((s) => s.byId);
  const entries = catalogs[sessionId];
  const subagents = childEntries(entries?.entries as readonly SubagentEntryLike[] | undefined);
  const rows = subagents.map((entry) => {
    const summary = summaryOf(summaries, entry.id);
    return { entry, summary, state: subagentState(entry, summary) };
  });
  const stateRank: Record<SubagentState, number> = { running: 0, completed: 1, inactive: 2 };
  const orderedRows = [...rows].sort((a, b) => stateRank[a.state] - stateRank[b.state]);
  const runningCount = rows.filter((row) => row.state === "running").length;
  const completedCount = rows.filter((row) => row.state === "completed").length;
  const inactiveCount = rows.filter((row) => row.state === "inactive").length;

  return (
    <>
      <h2 className="dshd-boardTitle">{t("board.section")}</h2>
      {subagents.length === 0 ? (
        <p className="dshd-subagentEmpty">{t("board.empty")}</p>
      ) : (
        <>
          <div className="dshd-subagentStatusBar" aria-label={t("board.section")}>
            <span className="dshd-subagentStatusStat" data-state="running" data-populated={runningCount > 0 ? "true" : undefined}>
              <span>{t("board.subagents.running")}</span>
              <strong>{runningCount}</strong>
            </span>
            <span className="dshd-subagentStatusStat" data-state="completed" data-populated={completedCount > 0 ? "true" : undefined}>
              <span>{t("board.subagents.completed")}</span>
              <strong>{completedCount}</strong>
            </span>
            <span className="dshd-subagentStatusStat" data-state="inactive" data-populated={inactiveCount > 0 ? "true" : undefined}>
              <span>{t("board.subagents.inactive")}</span>
              <strong>{inactiveCount}</strong>
            </span>
          </div>
          <section className="dshd-subagentPanel" aria-label={t("board.subagents.listTitle")}>
            <div className="dshd-subagentPanelHead">
              <div>
                <h3>{t("board.subagents.listTitle")}</h3>
                <span>{t("board.subagents.count").replace("{n}", String(subagents.length))}</span>
              </div>
            </div>
            <div className="dshd-subagentGrid">
              {orderedRows.map((row) => (
                <SubagentCard
                  key={row.entry.id}
                  entry={row.entry}
                  summary={row.summary}
                  onOpen={() => openSubagent({
                    parentSessionId: sessionId as SubagentAddress["parentSessionId"],
                    childSessionId: row.entry.id as SubagentAddress["childSessionId"],
                    mode: row.entry.mode === "continuable" ? "continuable" : "one-shot",
                  })}
                  t={t}
                />
              ))}
            </div>
          </section>
        </>
      )}
      <p className="dshd-board-hint">{t("board.hint")}</p>
    </>
  );
}
