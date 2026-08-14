/**
 * Dependency-free charts. SVG for shape work (donut / gauge / area), HTML+CSS
 * for interactive bars (hover growth + floating value labels stay crisp under
 * any container width). No chart library — the client bundle stays
 * self-contained and matches the shell's theming through CSS variables.
 */
import { useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/** One legendable chart slice. */
export interface ChartDatum {
  label: string;
  value: number;
  color: string;
}

/** Compact number formatting: 517 / 12.2K / 1.2M. */
export function compactNumber(n: number): string {
  const abs = Math.abs(n);
  const scaled = (v: number) => (v >= 100 ? String(Math.round(v)) : String(Math.round(v * 10) / 10));
  if (abs < 1000) return String(Math.round(n));
  if (abs < 1e6) return `${scaled(n / 1000)}K`;
  return `${scaled(n / 1e6)}M`;
}

/** Exact number with thousands separators. */
export function exactNumber(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Format ms as 45.2s / 2m42s / 1h05m. */
export function formatMs(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const s = ms / 1000;
  if (s < 60) return `${Math.round(s * 10) / 10}s`;
  const whole = Math.round(s);
  if (whole < 3600) return `${Math.floor(whole / 60)}m${whole % 60}s`;
  return `${Math.floor(whole / 3600)}h${Math.floor((whole % 3600) / 60)}m`;
}

function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/** SVG arc path from startAngle to endAngle (degrees, 0 = 3 o'clock, clockwise). */
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const [sx, sy] = polar(cx, cy, r, startAngle);
  const [ex, ey] = polar(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

/**
 * Donut chart with rounded segment caps. Hover a segment to enlarge it and
 * show its exact value in the center.
 */
export function DonutChart(props: {
  data: readonly ChartDatum[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
  valueFormatter?: (v: number) => string;
}): ReactNode {
  const { data, size = 132, thickness = 15, centerLabel = "", centerValue, valueFormatter } = props;
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2 - 4;
  const C = 2 * Math.PI * r;
  // Round caps extend `thickness/2` past each arc end, so a gap >= thickness
  // between segments guarantees neighboring arcs never bleed into each other.
  const gap = thickness;
  const minLen = thickness * 1.4;
  const raw = data
    .map((d) => ({ color: d.color, label: d.label, value: Math.max(0, d.value) }))
    .filter((d) => d.value > 0);
  const n = raw.length;
  // Enforce a minimum arc length, then scale the whole ring (arcs + gaps) to
  // fit the circumference exactly — offsets are computed from the ACTUAL
  // rendered lengths. `n` gaps are reserved (including the seam between the
  // last and first arc), so no two segments ever touch, let alone overlap.
  let lens = raw.map((d) => Math.max((d.value / Math.max(total, 1)) * C, minLen));
  const available = Math.max(0, C - n * gap);
  const sumLen = lens.reduce((s, l) => s + l, 0);
  if (sumLen > available) {
    const scale = available / sumLen;
    lens = lens.map((l) => l * scale);
  }
  const segments: { color: string; label: string; len: number; offset: number; value: number }[] = [];
  let acc = 0;
  raw.forEach((d, i) => {
    segments.push({ color: d.color, label: d.label, len: lens[i]!, offset: acc, value: d.value });
    acc += lens[i]! + gap;
  });
  const hovered = hover !== null ? segments[hover] : undefined;
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img">
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={hover === i ? thickness + 4 : thickness}
            strokeDasharray={`${seg.len.toFixed(2)} ${(C - seg.len).toFixed(2)}`}
            strokeDashoffset={(-seg.offset).toFixed(2)}
            strokeLinecap="round"
            opacity={hover === null || hover === i ? 1 : 0.45}
            style={{ transition: "stroke-width .15s ease, opacity .15s ease", cursor: "pointer" }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <title>{`${seg.label}: ${fmt(seg.value)}`}</title>
          </circle>
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r - thickness / 2 - 3} fill="var(--dsw-alias-bg-layer-1)" />
      <text
        x={cx}
        y={cy - 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={hovered === undefined ? 16 : 13}
        fontWeight={650}
        fill="var(--dsw-alias-label-primary)"
        style={{ transition: "font-size .15s ease" }}
      >
        {hovered === undefined ? (centerValue ?? compactNumber(total)) : fmt(hovered.value)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central" fontSize={10} fill="var(--dsw-alias-label-tertiary)">
        {hovered === undefined ? centerLabel : hovered.label}
      </text>
    </svg>
  );
}

/** Legend rows for a chart. */
export function Legend(props: {
  data: readonly ChartDatum[];
  valueFormatter?: (v: number) => string;
  percent?: boolean;
}): ReactNode {
  const { data, valueFormatter, percent = false } = props;
  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  return (
    <div className="dshd-legend">
      {data.map((d) => (
        <div key={d.label} className="dshd-legendRow">
          <span className="dshd-legendSwatch" style={{ background: d.color }} />
          <span className="dshd-legendName">{d.label}</span>
          <span className="dshd-legendValue">{fmt(d.value)}</span>
          {percent ? (
            <span className="dshd-legendPercent">{total === 0 ? 0 : Math.round((Math.max(0, d.value) / total) * 100)}%</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Horizontal stacked bar with a legend. */
export function StackedBar(props: {
  data: readonly ChartDatum[];
  valueFormatter?: (v: number) => string;
  height?: number;
  /** Optional "Total = …" label rendered at the legend tail. */
  totalLabel?: string;
  emptyLabel?: string;
}): ReactNode {
  const { data, valueFormatter, height, totalLabel, emptyLabel } = props;
  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  const segments = data.filter((d) => d.value > 0);
  return (
    <div className="dshd-chartBody" data-stacked>
      <div className="dshd-stack" style={height === undefined ? undefined : { height }}>
        {segments.length === 0 ? (
          <div className="dshd-stackEmpty">{emptyLabel ?? "—"}</div>
        ) : (
          segments.map((d, i) => (
            <div
              key={i}
              className="dshd-stackSegment"
              style={{ width: `${(Math.max(0, d.value) / Math.max(total, 1)) * 100}%`, background: d.color }}
              title={`${d.label}: ${fmt(d.value)}`}
            />
          ))
        )}
      </div>
      <div className="dshd-stackLegend">
        {data
          .filter((d) => d.value > 0)
          .map((d) => (
            <span key={d.label} className="dshd-legendRow">
              <span className="dshd-legendSwatch" style={{ background: d.color }} />
              <span className="dshd-legendName">{d.label}</span>
              <span className="dshd-legendValue">{fmt(d.value)}</span>
            </span>
          ))}
        {totalLabel !== undefined && segments.length > 0 ? (
          <span className="dshd-legendRow dshd-stackTotal">
            <span className="dshd-legendName">{totalLabel}</span>
            <span className="dshd-legendValue">{fmt(total)}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

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
export function SeriesBars(props: {
  series: readonly SeriesDatum[];
  height?: number;
  valueFormatter?: (v: number) => string;
  emptyLabel?: string;
}): ReactNode {
  const { series, height = 110, valueFormatter, emptyLabel } = props;
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...series.map((s) => Math.max(0, s.value)));
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  if (series.length === 0) {
    return (
      <div className="dshd-empty" style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {emptyLabel ?? "—"}
      </div>
    );
  }
  return (
    <div className="dshd-vbars" style={{ height }}>
      {series.map((s, i) => {
        const v = Math.max(0, s.value);
        const pct = (v / max) * 100;
        return (
          <div
            key={i}
            className="dshd-vcol"
            data-status={s.status}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === i ? (() => {
              const pos = (i + 0.5) / series.length;
              const style: CSSProperties = {
                bottom: `calc(${pct.toFixed(1)}% + 8px)`,
                left: `${Math.min(88, Math.max(12, pos * 100)).toFixed(1)}%`
              };
              // Flip the tooltip alignment near the edges so it never spills
              // past the chart's left/right boundary.
              if (pos < 0.33) style.transform = "translateX(-6%)";
              else if (pos > 0.67) style.transform = "translateX(-94%)";
              return (
                <div className="dshd-vtip" style={style}>
                  {s.label}: {fmt(v)}
                </div>
              );
            })() : null}
            <div className="dshd-vbarTrack">
              <div
                className="dshd-vbar"
                data-hover={hover === i ? true : undefined}
                style={{ height: `${Math.max(pct, v > 0 ? 2 : 0).toFixed(1)}%`, background: s.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
export function HorizontalBars(props: {
  data: readonly RowDatum[];
  valueFormatter?: (v: number) => string;
}): ReactNode {
  const { data, valueFormatter } = props;
  const max = Math.max(1, ...data.map((d) => Math.max(0, d.value)));
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  if (data.length === 0) {
    return <div className="dshd-empty" style={{ padding: "12px" }}>—</div>;
  }
  return (
    <div className="dshd-hbars">
      {data.map((d) => (
        <div key={d.label} className="dshd-hbar" title={d.title ?? `${d.label}: ${fmt(d.value)}`}>
          <span className="dshd-hbarName">{d.label}</span>
          <span className="dshd-hbarTrack">
            <span
              className="dshd-hbarFill"
              style={{ width: `${(Math.max(0, d.value) / max) * 100}%`, background: d.color }}
            />
          </span>
          <span className="dshd-hbarRight">
            <span className="dshd-hbarValue">
              {fmt(d.value)}
              {d.errorMark === true ? <span className="dshd-errorMark"> ⚠</span> : null}
            </span>
            {d.sub !== undefined ? <span className="dshd-hbarSub">{d.sub}</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Gradient area chart over a series (e.g. per-request cache hit rate).
 * Hover moves a crosshair + dot with the exact value (HTML overlay, so the
 * label stays crisp under any container width).
 */
export function AreaChart(props: {
  series: readonly SeriesDatum[];
  height?: number;
  color?: string;
  valueFormatter?: (v: number) => string;
  emptyLabel?: string;
}): ReactNode {
  const { series, height = 96, color = "var(--dsw-alias-state-business-primary)", valueFormatter, emptyLabel } = props;
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const n = series.length;
  const values = series.map((s) => Math.max(0, s.value));
  const max = Math.max(1, ...values);
  const width = Math.max(n * 16, 140);
  const pad = 4;
  const pts = values.map((v, i) => ({
    x: (i / Math.max(n - 1, 1)) * (width - pad * 2) + pad,
    y: height - pad - (v / max) * (height - pad * 2)
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const lastX = last === undefined ? width : last.x;
  const areaPath = `${linePath} L ${lastX.toFixed(1)} ${(height - pad).toFixed(1)} L ${pad} ${(height - pad).toFixed(1)} Z`;
  const gid = useId();
  const fmt = valueFormatter ?? ((v: number) => compactNumber(v));
  if (n === 0) {
    return (
      <div className="dshd-empty" style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {emptyLabel ?? "—"}
      </div>
    );
  }
  const onMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect === undefined || rect.width === 0) return;
    const frac = (e.clientX - rect.left) / rect.width;
    const i = Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1))));
    setHover(i);
  };
  return (
    <div
      ref={ref}
      className="dshd-areaWrap"
      style={{ height }}
      onMouseMove={onMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gid})`} vectorEffect="non-scaling-stroke" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
      </svg>
      {hover !== null && pts[hover] !== undefined && series[hover] !== undefined ? (
        <>
          <div
            className="dshd-areaGuide"
            style={{ left: `${(pts[hover].x / width) * 100}%`, borderColor: color }}
          />
          <div
            className="dshd-areaDot"
            style={{ left: `${(pts[hover].x / width) * 100}%`, top: `${(pts[hover].y / height) * 100}%`, background: color }}
          />
          <div
            className="dshd-vtip"
            style={(() => {
              const pos = pts[hover].x / width;
              const style: CSSProperties = {
                left: `${Math.min(88, Math.max(12, pos * 100))}%`,
                top: `${(pts[hover].y / height) * 100}%`
              };
              if (pos < 0.33) style.transform = "translateX(-6%)";
              else if (pos > 0.67) style.transform = "translateX(-94%)";
              return style;
            })()}
          >
            {series[hover].label}: {fmt(series[hover].value)}
          </div>
        </>
      ) : null}
    </div>
  );
}

/**
 * Semi-circular gauge (e.g. context occupancy). Colors by threshold:
 * <70% success, 70–90% warning, ≥90% danger.
 */
export function RadialGauge(props: {
  value: number;
  max: number;
  unit?: string;
  size?: number;
}): ReactNode {
  const { value, max, unit = "", size = 148 } = props;
  const frac = max <= 0 ? 0 : Math.max(0, Math.min(1, value / max));
  const color =
    frac >= 0.9
      ? "var(--dsw-alias-state-error-primary)"
      : frac >= 0.7
        ? "var(--dsw-alias-state-warn-primary)"
        : "var(--dsw-alias-state-success-primary)";
  const height = size * 0.6;
  const cx = size / 2;
  const cy = height - 8;
  const r = Math.min(size / 2 - 16, cy - 12);
  // Gauge sweeps 180° (left) → 360° (right) through the TOP half. In y-down
  // SVG space 270° = 12 o'clock (sin < 0 → y < cy), so increasing angles with
  // sweep=1 trace the upper semicircle and fit inside the viewBox.
  const track = arcPath(cx, cy, r, 180, 360);
  const valueArc = frac <= 0 ? "" : arcPath(cx, cy, r, 180, 180 + frac * 180);
  const valueY = cy - r * 0.4;
  return (
    <svg viewBox={`0 0 ${size} ${height}`} width={size} height={height} role="img" style={{ overflow: "hidden" }}>
      <path d={track} fill="none" stroke="var(--dsw-alias-border-l1)" strokeWidth={11} strokeLinecap="round" />
      {frac > 0 ? (
        <path d={valueArc} fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" style={{ transition: "stroke .3s ease" }} />
      ) : null}
      <text x={cx} y={valueY} textAnchor="middle" dominantBaseline="central" fontSize={21} fontWeight={700} fill="var(--dsw-alias-label-primary)">
        {Math.round(frac * 100)}{unit}
      </text>
    </svg>
  );
}

/** Tiny sparkline for StatCard trends (zero dependencies, SVG polyline). */
export function Sparkline({
  values,
  color,
  width = 96,
  height = 22
}: {
  values: readonly number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (values.length < 2) return null;
  const max = Math.max(1, ...values);
  const step = width / (values.length - 1);
  const pts = values.map(
    (v, i) => `${(i * step).toFixed(1)},${(height - (Math.max(0, v) / max) * (height - 2) - 1).toFixed(1)}`
  );
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="dshd-spark" aria-hidden="true">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Deterministic palette for per-model coloring (theme variables, no deps). */
const MODEL_COLORS = [
  "var(--dsw-alias-state-business-primary)",
  "var(--dsw-alias-state-success-primary)",
  "var(--dsw-alias-state-warn-primary)",
  "var(--dsw-alias-state-error-primary)",
  "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
  "color-mix(in srgb, var(--dsw-alias-state-success-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
  "color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-state-business-primary) 45%)",
  "var(--dsw-alias-label-tertiary)"
];

const modelColorHash = (model: string): string => {
  let h = 0;
  for (let i = 0; i < model.length; i++) h = (h * 31 + model.charCodeAt(i)) | 0;
  return MODEL_COLORS[Math.abs(h) % MODEL_COLORS.length]!;
};

/**
 * Horizontal model timeline: one dot per request (oldest → newest), colored by
 * model; switch points get a ring. Clicking a dot jumps to the request.
 */
export function ModelTimeline({
  data,
  switchSeqs,
  onPick,
  emptyLabel,
  height = 44,
  maxPoints = 60,
  note
}: {
  data: readonly { seq: number; turn: number; model: string }[];
  switchSeqs: readonly number[];
  onPick?: (seq: number) => void;
  emptyLabel: string;
  height?: number;
  /** Cap the rendered dots (newest kept) so dense sessions stay readable. */
  maxPoints?: number;
  /** Optional caption when dots were trimmed. */
  note?: string;
}) {
  if (data.length === 0) {
    return (
      <div className="dshd-empty" style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {emptyLabel}
      </div>
    );
  }
  const trimmed = data.length > maxPoints ? data.slice(-maxPoints) : data;
  const models = [...new Set(trimmed.map((d) => d.model))];
  const step = 7;
  const width = Math.max(60, trimmed.length * step);
  return (
    <div className="dshd-modelTimeline" role="img" aria-label="model timeline">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: "block" }}>
        {trimmed.map((d, i) => {
          const isSwitch = switchSeqs.includes(d.seq);
          return (
            <circle
              key={d.seq}
              cx={i * step + step / 2}
              cy={height / 2}
              r={isSwitch ? 4 : 3}
              fill={modelColorHash(d.model)}
              stroke={isSwitch ? "var(--dsw-alias-state-warn-primary)" : "none"}
              strokeWidth={isSwitch ? 1.2 : 0}
              opacity={isSwitch ? 1 : 0.72}
              role={onPick !== undefined ? "button" : undefined}
              tabIndex={onPick !== undefined ? 0 : undefined}
              aria-label={`#${d.seq} · ${d.model}`}
              onClick={onPick === undefined ? undefined : () => onPick(d.seq)}
              onKeyDown={onPick === undefined ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(d.seq); } }}
              style={{ cursor: onPick !== undefined ? "pointer" : undefined, outline: "none" }}
            >
              <title>{`#${d.seq} · ${d.model}`}</title>
            </circle>
          );
        })}
      </svg>
      {note !== undefined ? <div className="dshd-modelNote">{note}</div> : null}
      <div className="dshd-modelLegend">
        {models.map((m) => (
          <span key={m} className="dshd-modelLegendItem">
            <i style={{ background: modelColorHash(m) }} />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
