import type { ReactNode } from "react";
/** One legendable chart slice. */
export interface ChartDatum {
    label: string;
    value: number;
    color: string;
}
/** Compact number formatting: 517 / 12.2K / 1.2M. */
export declare function compactNumber(n: number): string;
/** Exact number with thousands separators. */
export declare function exactNumber(n: number): string;
/** Format ms as 45.2s / 2m42s / 1h05m. */
export declare function formatMs(ms: number): string;
/**
 * Donut chart with rounded segment caps. Hover a segment to enlarge it and
 * show its exact value in the center.
 */
export declare function DonutChart(props: {
    data: readonly ChartDatum[];
    size?: number;
    thickness?: number;
    centerLabel?: string;
    centerValue?: string;
    valueFormatter?: (v: number) => string;
    ariaLabel?: string;
}): ReactNode;
/** Legend rows for a chart. */
export declare function Legend(props: {
    data: readonly ChartDatum[];
    valueFormatter?: (v: number) => string;
    percent?: boolean;
}): ReactNode;
/** Horizontal stacked bar with a legend. */
export declare function StackedBar(props: {
    data: readonly ChartDatum[];
    valueFormatter?: (v: number) => string;
    height?: number;
    /** Optional "Total = …" label rendered at the legend tail. */
    totalLabel?: string;
    emptyLabel?: string;
}): ReactNode;
/** One vertical bar in the series chart. */
export interface SeriesDatum {
    label: string;
    value: number;
    color: string;
    status?: "running" | "error" | "complete";
}
/**
 * Interactive vertical bar chart (HTML): bars grow on hover with the exact
 * value floating above, running bars pulse, failed bars dim.
 */
export declare function SeriesBars(props: {
    series: readonly SeriesDatum[];
    height?: number;
    valueFormatter?: (v: number) => string;
    emptyLabel?: string;
    /** Show the max value as a top-right caption for at-a-glance reading. */
    showMaxTag?: boolean;
    ariaLabel?: string;
}): ReactNode;
/** One horizontal bar row (tool histogram / model split). */
export interface RowDatum {
    label: string;
    value: number;
    /** Optional secondary text shown at the row tail. */
    sub?: string;
    color: string;
    errorMark?: boolean;
    /** Optional row tooltip; falls back to `label: value`. */
    title?: string;
}
/**
 * Horizontal bar list: label on the left, proportional bar, value on the
 * right. Renders with HTML (flex) so long tool names truncate properly.
 */
export declare function HorizontalBars(props: {
    data: readonly RowDatum[];
    valueFormatter?: (v: number) => string;
    /** Render each row's sub on its own line below the bar (rows with rich
     *  subs such as models would otherwise overflow narrow cards). */
    subBelow?: boolean;
}): ReactNode;
/**
 * Gradient area chart over a series (e.g. per-request cache hit rate).
 * Hover moves a crosshair + dot with the exact value (HTML overlay, so the
 * label stays crisp under any container width).
 */
export declare function AreaChart(props: {
    series: readonly SeriesDatum[];
    height?: number;
    color?: string;
    valueFormatter?: (v: number) => string;
    emptyLabel?: string;
    /** Show the max value as a top-right caption for at-a-glance reading. */
    showMaxTag?: boolean;
    ariaLabel?: string;
}): ReactNode;
/**
 * Semi-circular gauge (e.g. context occupancy). Colors by threshold:
 * <70% success, 70–90% warning, ≥90% danger.
 */
export declare function RadialGauge(props: {
    value: number;
    max: number;
    unit?: string;
    size?: number;
    ariaLabel?: string;
}): ReactNode;
/** Tiny sparkline for StatCard trends (zero dependencies, SVG polyline). */
export declare function Sparkline({ values, color, width, height }: {
    values: readonly number[];
    color: string;
    width?: number;
    height?: number;
}): import("react").JSX.Element | null;
/** Deterministic palette for per-model coloring (theme variables, no deps). */
export declare const MODEL_COLORS: string[];
/** Deterministic per-model color (shared by model bars and the model timeline). */
export declare const modelColor: (model: string) => string;
/**
 * Horizontal model timeline: one dot per request (oldest → newest), colored by
 * model; switch points get a ring. Clicking a dot jumps to the request.
 */
export declare function ModelTimeline({ data, switchSeqs, onPick, emptyLabel, height, maxPoints, note, ariaLabel, axisHint }: {
    data: readonly {
        seq: number;
        turn: number;
        model: string;
    }[];
    switchSeqs: readonly number[];
    onPick?: (seq: number) => void;
    emptyLabel: string;
    height?: number;
    /** Cap the rendered dots (newest kept) so dense sessions stay readable. */
    maxPoints?: number;
    /** Optional caption when dots were trimmed. */
    note?: string;
    /** Localized accessibility label for the svg. */
    ariaLabel?: string;
    /** Optional direction caption under the svg (e.g. "old → new"). */
    axisHint?: string;
}): import("react").JSX.Element;
