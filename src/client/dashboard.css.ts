/**
 * Dashboard styles: a plain CSS string injected once per page load, styled
 * exclusively through the `--dsw-*` design tokens the shell theme provides.
 * Class names are prefixed with `dshd-` to avoid collisions.
 */

export const PLUGIN_ID = "dsh-client-ui-dashboard";

/** Inject the stylesheet once (idempotent per plugin bundle revision). */
export function injectDashboardStyles(): void {
  if (typeof document === "undefined") return;
  const tagId = `${PLUGIN_ID}/dashboard.css`;
  const existing = document.querySelector<HTMLStyleElement>(`style[data-plugin-css=${JSON.stringify(tagId)}]`);
  // DSH can replace a client bundle without recreating the document. Keep the
  // one style node, but refresh its text so an already-open tab never retains
  // an older layout revision.
  if (existing !== null) {
    if (existing.textContent !== css) existing.textContent = css;
    return;
  }
  const tag = document.createElement("style");
  tag.dataset.plugin = PLUGIN_ID;
  tag.dataset.pluginCss = tagId;
  tag.textContent = css;
  document.head.appendChild(tag);
}

/** Palette keyed by semantic slot, resolved through the theme's color aliases. */
export const CHART_COLORS = {
  user: "var(--dsw-alias-state-business-primary)",
  assistant: "var(--dsw-alias-state-success-primary)",
  system: "var(--dsw-alias-state-warn-primary)",
  tool: "var(--dsw-alias-state-error-primary)",
  other: "var(--dsw-alias-label-tertiary)",
  input: "var(--dsw-alias-state-business-primary)",
  cacheRead: "var(--dsw-alias-state-success-primary)",
  cacheWrite: "var(--dsw-alias-state-warn-primary)",
  output: "var(--dsw-alias-state-error-primary)",
  reasoning: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
  llm: "var(--dsw-alias-state-business-primary)",
  toolTime: "var(--dsw-alias-state-warn-primary)",
  messages: "var(--dsw-alias-state-business-primary)",
  tools: "var(--dsw-alias-state-error-primary)",
  systemPrompt: "var(--dsw-alias-state-warn-primary)",
  steering: "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)"
} as const;

const css = String.raw`
/* 看板自持内部滚动容器：声明 data-conversation-composer-overlay 后，共享
   滚动体让位、输入框改绝对定位，本根元素成为会话列内唯一的滚动区；底部
   预留 --dsh-composer-height 让最后一行滚动时不被输入框遮挡。 */
.dshd-root{display:flex;flex-direction:column;gap:16px;padding:16px 18px 28px;max-width:1120px;margin:0 auto;width:100%;box-sizing:border-box;color:var(--dsw-alias-label-primary);height:100%;overflow-y:auto;padding-bottom:calc(28px + var(--dsh-composer-height,0px))}
.dshd-root *{box-sizing:border-box}
.dshd-muted{color:var(--dsw-alias-label-tertiary)}
.dshd-empty{color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center;padding:18px 0}

/* Header */
.dshd-header{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dshd-title{font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}
.dshd-live{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:500;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 8px;white-space:nowrap}
.dshd-live[data-off]{color:var(--dsw-alias-label-tertiary);border-color:var(--dsw-alias-border-l2)}
.dshd-liveDot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:dshdPulse 1.4s ease-in-out infinite}
.dshd-live[data-off] .dshd-liveDot{animation:none}
@keyframes dshdPulse{0%,100%{opacity:1}50%{opacity:.35}}
/* Entrance choreography (UI/UX Pro Max: Stagger List, back-out easing,
   ~300ms; skipped wholesale under prefers-reduced-motion). */
@keyframes dshdEnter{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
@keyframes dshdTipIn{from{opacity:0}to{opacity:1}}
.dshd-chip{font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:2px 9px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
.dshd-spacer{flex:1}

/* Section card */
.dshd-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:12px;min-width:0;transition:border-color .18s ease,transform .2s ease,box-shadow .2s ease;animation:dshdEnter .42s cubic-bezier(.22,.61,.36,1) both}
.dshd-card:hover{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,var(--dsw-alias-border-l1));transform:translateY(-2px);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgb(0 0 0 / .28))}
.dshd-cardHead{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.dshd-cardTitle{font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px}
.dshd-cardTitle::before{content:"";width:3px;height:13px;border-radius:2px;background:var(--dsw-alias-label-tertiary);flex:none}
.dshd-cardHint{font-size:11px;color:var(--dsw-alias-label-tertiary);flex:1 1 auto;min-width:0;white-space:normal;overflow-wrap:anywhere;line-height:1.5}
.dshd-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
.dshd-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.dshd-subTitle{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-top:2px}

/* Stat cards */
.dshd-stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.dshd-stat{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:11px 13px;display:flex;flex-direction:column;gap:4px;min-width:0;position:relative;transition:border-color .18s,transform .2s ease,box-shadow .2s ease;animation:dshdEnter .32s cubic-bezier(.22,.61,.36,1) both}
.dshd-stat:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,var(--dsw-alias-border-l1));box-shadow:var(--dsw-shadow-lv2,0 6px 16px rgb(0 0 0 / .24))}
.dshd-stat:hover .dshd-statValue{filter:brightness(1.12)}
/* Tone indicator bar: a 3px accent edge that mirrors the stat value's semantic
   color, so card shape + color carry the same meaning at a glance. */
.dshd-stat::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:0 3px 3px 0;background:transparent;transition:background .18s ease}
.dshd-stat:has(.dshd-statValue[data-accent])::before{background:var(--dsw-alias-state-business-primary)}
.dshd-stat:has(.dshd-statValue[data-good])::before{background:var(--dsw-alias-state-success-primary)}
.dshd-stat:has(.dshd-statValue[data-warn])::before{background:var(--dsw-alias-state-warn-primary)}
.dshd-stat:has(.dshd-statValue[data-bad])::before{background:var(--dsw-alias-state-error-primary)}
.dshd-stat:has(.dshd-statValue[data-reasoning])::before{background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 62%,var(--dsw-alias-state-error-primary) 38%)}
.dshd-stat:hover::before{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 55%,transparent)}
/* Stagger the stat grid (cap ~12 cards so the tail never feels laggy). */
.dshd-stats .dshd-stat:nth-child(2){animation-delay:.04s}
.dshd-stats .dshd-stat:nth-child(3){animation-delay:.08s}
.dshd-stats .dshd-stat:nth-child(4){animation-delay:.12s}
.dshd-stats .dshd-stat:nth-child(5){animation-delay:.16s}
.dshd-stats .dshd-stat:nth-child(6){animation-delay:.2s}
.dshd-stats .dshd-stat:nth-child(7){animation-delay:.24s}
.dshd-stats .dshd-stat:nth-child(8){animation-delay:.28s}
.dshd-stats .dshd-stat:nth-child(9){animation-delay:.32s}
.dshd-stats .dshd-stat:nth-child(10){animation-delay:.36s}
.dshd-stats .dshd-stat:nth-child(11){animation-delay:.4s}
.dshd-stats .dshd-stat:nth-child(12){animation-delay:.44s}
.dshd-stat:hover{border-color:var(--dsw-alias-border-l1);transform:translateY(-1px)}
.dshd-statLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshd-statValue{font-size:clamp(15px,1.2rem + .5vw,20px);font-weight:650;line-height:1.2;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);min-width:0;overflow-wrap:anywhere}
.dshd-statValue[data-accent]{color:var(--dsw-alias-state-business-primary)}
.dshd-statValue[data-warn]{color:var(--dsw-alias-state-warn-primary)}
.dshd-statValue[data-good]{color:var(--dsw-alias-state-success-primary)}
.dshd-statValue[data-bad]{color:var(--dsw-alias-state-error-primary)}
.dshd-statValue[data-reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 62%,var(--dsw-alias-state-error-primary) 38%)}
.dshd-statSub{font-size:10.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}

/* Tooltip hint anchor */
.dshd-hint{display:inline-flex;width:14px;height:14px;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1;cursor:help;flex:none;background:var(--dsw-alias-bg-base)}

/* Legend */
.dshd-legend{display:flex;flex-direction:column;gap:4px;min-width:140px}
.dshd-legendRow{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;max-width:100%}
.dshd-legendSwatch{width:9px;height:9px;border-radius:2.5px;flex:none}
.dshd-legendName{min-width:0;overflow:hidden;text-overflow:ellipsis}
.dshd-legendValue{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:550}
.dshd-legendPercent{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;min-width:34px;text-align:right}

/* Stacked bars */
.dshd-stack{display:flex;width:100%;height:20px;border-radius:6px;overflow:hidden;background:var(--dsw-alias-bg-layer-2);gap:1px;padding:1px}
.dshd-stackSegment{height:100%;min-width:2px;transition:width .25s ease}
.dshd-stackEmpty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:10.5px}
.dshd-stackLegend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:2px;font-variant-numeric:tabular-nums}
.dshd-stackTotal{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:2px}
.dshd-chartBody{display:flex;flex-direction:column;gap:8px;min-width:0}

/* Donut + legend side by side */
.dshd-donutRow{display:flex;align-items:center;gap:18px;flex-wrap:wrap}

/* Horizontal bars */
.dshd-hbars{display:flex;flex-direction:column;gap:7px}
.dshd-hbar{display:flex;align-items:center;gap:8px;font-size:11.5px;min-width:0;flex-wrap:wrap}
.dshd-hbarSubLine{flex:1 1 100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
.dshd-hbarName{width:clamp(64px,30%,120px);flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
.dshd-hbarTrack{flex:1;height:12px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.dshd-hbarFill{display:block;height:100%;border-radius:6px;transition:width .25s ease}
.dshd-hbarRight{flex:none;display:flex;align-items:baseline;justify-content:flex-end;gap:6px;min-width:120px}
.dshd-errorMark{color:var(--dsw-alias-state-error-primary);font-weight:700;margin-left:1px}
.dshd-hbarValue{flex:none;min-width:44px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap}
.dshd-hbarSub{flex:none;min-width:0;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}

/* Request table */
.dshd-tableWrap{overflow-x:auto;max-width:100%;border-radius:10px}
.dshd-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;min-width:640px}
.dshd-table th{text-align:left;font-size:10.5px;font-weight:600;color:var(--dsw-alias-label-tertiary);text-transform:uppercase;letter-spacing:.04em;padding:2px 8px 6px;border-bottom:1px solid var(--dsw-alias-border-l2);white-space:nowrap;background:var(--dsw-alias-bg-layer-1)}
.dshd-table td{padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:middle;white-space:nowrap;font-variant-numeric:tabular-nums}
.dshd-table tbody tr{cursor:pointer;transition:background .12s}
.dshd-table tbody tr:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshd-table tbody tr[data-open]{background:var(--dsw-alias-interactive-bg-active,var(--dsw-alias-interactive-bg-hover))}
.dshd-table tbody tr[data-error] td:first-child{box-shadow:inset 3px 0 0 var(--dsw-alias-state-error-primary)}
.dshd-table tbody tr[data-error]{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 6%,transparent)}
.dshd-table tbody tr[data-error]:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
.dshd-tableEmpty{text-align:center;color:var(--dsw-alias-label-tertiary);padding:18px 0!important}
.dshd-table tbody tr:last-child td{border-bottom:none}
.dshd-seq{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-state-business-primary);font-weight:600;display:inline-flex;align-items:center;gap:4px}
.dshd-chevron{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:9px;transition:transform .15s ease,background .12s;border-radius:5px;cursor:pointer;margin:-4px 0}
.dshd-chevron:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
tr[data-open] .dshd-chevron{transform:rotate(90deg)}
.dshd-chevronSvg{display:block;transition:transform .15s ease}
.dshd-chevron[data-open] .dshd-chevronSvg,.dshd-chevronSvg[data-open]{transform:rotate(90deg)}
.dshd-warnIcon{display:inline-block;vertical-align:-1px;flex:none}
.dshd-model{max-width:150px;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);display:inline-block;vertical-align:bottom;min-width:0}
.dshd-statusPill{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:600;border-radius:999px;padding:1px 8px;border:1px solid transparent;white-space:nowrap}
.dshd-statusPill[data-s=complete]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
.dshd-statusPill[data-s=running]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 30%,transparent)}
.dshd-statusPill[data-s=error]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 30%,transparent)}
.dshd-statusPill[data-s=compaction]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 30%,transparent)}

/* Expanded request detail */
.dshd-detail{grid-column:1/-1;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:12px 14px;font-size:12px;display:flex;flex-direction:column;gap:10px;cursor:default}
.dshd-detailHead{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dshd-detailTitle{font-weight:600;font-size:12.5px}
.dshd-kv{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px 16px}
.dshd-kvItem{display:flex;flex-direction:column;gap:1px;min-width:0}
.dshd-kvKey{font-size:10px;color:var(--dsw-alias-label-tertiary);text-transform:uppercase;letter-spacing:.04em}
.dshd-kvValue{font-size:12px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.dshd-errorBox{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;padding:8px 10px;font-size:11.5px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);word-break:break-word;white-space:pre-wrap}
.dshd-toolRow{display:flex;align-items:center;gap:8px;font-size:11.5px;padding:4px 0;border-bottom:1px dashed var(--dsw-alias-border-l1)}
.dshd-toolRow:last-child{border-bottom:none}
.dshd-toolName{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-primary);font-weight:550;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-toolArgs{color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px}
.dshd-toolDur{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dshd-toolErr{color:var(--dsw-alias-state-error-primary);font-weight:600}
.dshd-tag{font-size:10px;border-radius:5px;padding:1px 6px;border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 30%,transparent);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 10%,transparent);color:var(--dsw-alias-label-secondary);font-weight:600;white-space:nowrap}
.dshd-tag[data-k="reasoning"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent)}
.dshd-tag[data-k="compaction"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent)}
.dshd-tag[data-k="error"]{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent)}
.dshd-tag[data-k=reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,var(--dsw-alias-state-warn-primary) 45%)}
.dshd-tag[data-k=compaction]{color:var(--dsw-alias-state-warn-primary)}
.dshd-tag[data-k=error]{color:var(--dsw-alias-state-error-primary)}

/* Series charts */
.dshd-seriesRow{display:flex;gap:14px;flex-wrap:wrap}
.dshd-seriesCol{flex:1 1 240px;min-width:0;display:flex;flex-direction:column;gap:6px}
.dshd-seriesLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:6px}
.dshd-seriesTotal{font-size:11px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-weight:550}
.dshd-scopeTag{font-family:var(--ds-font-family-base,ui-sans-serif,system-ui,sans-serif);font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 25%,transparent);border-radius:4px;padding:0 4px;vertical-align:1px;white-space:nowrap}
.dshd-axisHint{font-size:10px;color:var(--dsw-alias-label-secondary);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* Trend filters */
.dshd-filters{display:flex;gap:6px;flex-wrap:wrap}
.dshd-filterBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;white-space:nowrap}
.dshd-filterBtn:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
.dshd-filterBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
.dshd-newBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;cursor:pointer;transition:background .15s;white-space:nowrap}
.dshd-newBtn:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}

/* Detail view tabs + search */
.dshd-viewTabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid var(--dsw-alias-border-l2);padding-bottom:6px}
.dshd-viewTab{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-tertiary);background:transparent;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:background .15s,color .15s}
.dshd-viewTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.dshd-viewTab[data-current]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}
.dshd-search{height:24px;min-width:150px;flex:0 1 210px;padding:0 10px;font-size:11px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;outline:none;transition:border-color .15s}
.dshd-search:focus{border-color:var(--dsw-alias-state-business-primary)}
.dshd-search::placeholder{color:var(--dsw-alias-label-tertiary)}

/* Grouped views */
.dshd-groups{display:flex;flex-direction:column;gap:8px}
.dshd-group{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-base)}
.dshd-groupHead{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;font-size:11.5px;background:color-mix(in srgb,var(--dsw-alias-border-l2) 22%,transparent);border:none;cursor:pointer;color:var(--dsw-alias-label-primary);text-align:left}
.dshd-groupHead:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 7%,var(--dsw-alias-bg-base))}
.dshd-groupName{flex:1;min-width:0;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-groupStats{margin-left:auto;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshd-groupBody{padding:2px 0}
.dshd-groupBody .dshd-table{border:none;margin:0}

/* Model timeline */
.dshd-modelTimeline{padding:2px 0 4px}
.dshd-modelTimeline svg circle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dshd-modelLegend{display:flex;flex-wrap:wrap;gap:8px;padding:4px 2px 0;font-size:10px;color:var(--dsw-alias-label-secondary)}
.dshd-modelLegendItem{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
.dshd-modelLegendItem i{width:8px;height:8px;border-radius:50%;display:inline-block}
.dshd-modelNote{font-size:10px;color:var(--dsw-alias-label-secondary);padding:2px 2px 0}

/* Context-injection form badges */
.dshd-formBadge{display:inline-block;margin-left:6px;padding:0 6px;font-size:9.5px;font-weight:600;border-radius:999px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);vertical-align:1px}
.dshd-formBadge[data-f="instructions"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent)}
.dshd-formBadge[data-f="recall"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
.dshd-formBadge[data-f="snapshot"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 8%,transparent)}
.dshd-formBadge[data-f="opaque"]{color:var(--dsw-alias-label-tertiary)}

/* Live streaming line */
.dshd-streamRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:6px 12px}
.dshd-streamDot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite;flex:none}
.dshd-streamText{font-variant-numeric:tabular-nums}
.dshd-streamTool{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}
.dshd-streamBody{display:flex;flex-direction:column;gap:8px;min-width:0;flex:1}
.dshd-streamHead{display:flex;align-items:center;gap:10px;flex-wrap:wrap}

/* Summary strip */
.dshd-summary{display:flex;gap:8px;flex-wrap:wrap;background:color-mix(in srgb,var(--dsw-alias-bg-base) 88%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:6px 10px}
.dshd-summaryItem{display:inline-flex;align-items:baseline;gap:5px;font-size:11px}
.dshd-summaryLabel{color:var(--dsw-alias-label-tertiary)}
.dshd-summaryValue{font-weight:650;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

/* StatCard sparkline */
.dshd-statSpark{display:flex;justify-content:flex-start;margin-top:2px;opacity:.85}
.dshd-spark{display:block;max-width:100%}

/* TTFT percentiles inside axis hint */
.dshd-ttftStats{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:normal}
.dshd-streamWarn{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;font-weight:700;color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}

/* Turn-input delta badge */
.dshd-delta{font-size:10px;font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);border-radius:999px;padding:0 6px}
.dshd-deltaUp{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
.dshd-deltaDown{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,transparent)}

/* Duration distribution */
.dshd-percRow{display:flex;gap:14px;flex-wrap:wrap}
.dshd-perc{font-size:11px;color:var(--dsw-alias-label-tertiary)}
.dshd-perc b{color:var(--dsw-alias-label-primary);font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);margin-left:2px}
.dshd-hist{display:flex;align-items:flex-end;gap:3px;height:52px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dshd-histCol{flex:1;height:100%;display:flex;align-items:flex-end;min-width:0}
.dshd-histBar{width:100%;border-radius:2px 2px 0 0;transition:height .25s ease}

/* Error classification */
.dshd-errRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0}
.dshd-errMsg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
.dshd-errCount{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-state-error-primary);font-weight:650;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

/* Compaction effect rows */
.dshd-compactRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0;flex-wrap:wrap}
.dshd-compactSeq{flex:none;font-weight:600;color:var(--dsw-alias-state-business-primary)}
.dshd-compactArrow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-secondary)}
.dshd-compactRecovered{flex:none;font-variant-numeric:tabular-nums;font-weight:650;color:var(--dsw-alias-state-success-primary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

/* Turn durations */
.dshd-turnList{display:flex;flex-direction:column;gap:6px}
.dshd-turnRow{display:flex;align-items:center;gap:8px;font-size:11.5px}
.dshd-turnName{min-width:56px;flex:none;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dshd-turnTrack{flex:1;height:10px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.dshd-turnFill{display:block;height:100%;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,var(--dsw-alias-state-warn-primary) 45%);opacity:.85}
.dshd-turnValue{min-width:56px;text-align:right;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px}

/* Pagination */
.dshd-pager{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:2px}
.dshd-pagerInfo{font-size:11px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
.dshd-pagerBtns{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
.dshd-pageBtn{min-width:26px;height:26px;padding:0 6px;display:inline-flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;font-variant-numeric:tabular-nums}
.dshd-pageBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
.dshd-pageBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
.dshd-pageBtn:disabled{opacity:.38;cursor:not-allowed}
.dshd-pageEllipsis{color:var(--dsw-alias-label-tertiary);font-size:11px;padding:0 2px;user-select:none}
.dshd-pageSize{display:inline-flex;align-items:center;gap:6px;font-size:11px}
.dshd-pageSize select{height:26px;padding:0 6px;font-size:11.5px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;cursor:pointer;font-variant-numeric:tabular-nums}

/* Focus visibility (keyboard) */
.dshd-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-radius:6px}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .dshd-root *,.dshd-root *::before,.dshd-root *::after{transition:none!important;animation:none!important}
  .dshd-liveDot{animation:none}
}

/* Text containment: never let content push the layout */
.dshd-statSub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-chip{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-seriesLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Interactive vertical bars */
.dshd-vbars{display:flex;align-items:flex-end;gap:2px;position:relative;padding-top:8px;box-sizing:border-box}
.dshd-vcol{flex:1;min-width:0;height:100%;position:relative;display:flex;align-items:flex-end;cursor:crosshair}
.dshd-vbarTrack{width:100%;height:100%;display:flex;align-items:flex-end;position:relative}
.dshd-vbar{width:100%;border-radius:3px 3px 1px 1px;transition:height .25s ease,transform .15s ease,filter .15s ease;transform-origin:bottom center;min-height:0}
.dshd-vbar[data-hover]{transform:scaleY(1.12);filter:brightness(1.12)}
.dshd-vcol[data-status=running] .dshd-vbar{animation:dshdPulse 1.4s ease-in-out infinite}
.dshd-vcol[data-status=error] .dshd-vbar{opacity:.85;box-shadow:inset 0 0 0 1px var(--dsw-alias-state-error-primary)}
.dshd-vtip{position:absolute;left:50%;transform:translateX(-50%);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:4px 9px;font-size:11px;line-height:1.4;color:var(--dsw-alias-label-primary);white-space:normal;overflow-wrap:anywhere;text-align:center;width:max-content;max-width:min(240px,80vw);z-index:20;pointer-events:none;box-shadow:var(--dsw-shadow-lv2,0 4px 12px rgb(0 0 0 / .22));font-variant-numeric:tabular-nums;box-sizing:border-box;animation:dshdTipIn .12s ease-out}
.dshd-areaWrap{position:relative;width:100%;cursor:crosshair}
.dshd-areaGuide{position:absolute;top:0;bottom:0;width:0;border-left:1px dashed;opacity:.55;pointer-events:none;z-index:2}
.dshd-areaDot{position:absolute;width:9px;height:9px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid var(--dsw-alias-bg-layer-1);box-shadow:0 1px 4px rgb(0 0 0 / .3);pointer-events:none;z-index:3}
.dshd-areaWrap .dshd-vtip{transform:translate(var(--tip-dx,-50%),calc(-100% - 6px))}

/* Gauge row */
.dshd-gaugeRow{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.dshd-gaugeBox{display:flex;flex-direction:column;align-items:center;gap:2px;flex:none;max-width:100%;min-width:0}
.dshd-gaugeLabel{font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Jump affordance */
.dshd-jumpText{font-size:10.5px;font-weight:600;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border-radius:999px;padding:1px 9px;cursor:pointer;transition:background .15s;white-space:nowrap}
.dshd-jumpText:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
.dshd-jump{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;cursor:pointer;transition:background .12s,border-color .12s,color .12s}
.dshd-jump:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-inverted,var(--dsw-alias-border-l1));color:var(--dsw-alias-label-primary)}
.dshd-clearFilter{font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 10px;cursor:pointer;transition:background .15s}
.dshd-clearFilter:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent)}

/* Top-right max-value caption on trend mini-charts */
.dshd-vbars:hover .dshd-maxTag,.dshd-areaWrap:hover .dshd-maxTag{opacity:0}
.dshd-maxTag{position:absolute;top:2px;right:2px;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-bg-base) 84%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;z-index:4;pointer-events:none;font-variant-numeric:tabular-nums}

/* Count badges on filter pills / view tabs */
.dshd-badge{font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 5px;margin-left:4px;font-variant-numeric:tabular-nums}

/* Agent-health text badges (replace colored emoji, keep the theme tone) */
.dshd-healthTag{display:inline-block;font-size:9.5px;font-weight:700;border-radius:4px;padding:1px 5px;margin-right:6px;flex:none;line-height:1.5}
.dshd-healthTag[data-k="loop"]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent)}
.dshd-healthTag[data-k="noProgress"]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent)}

/* ── HUD strip (top of the Dashboard view) ───────────────────────────────────
   一条实时状态条:点 + 文字并用(不靠颜色单独传达信息);整条是一个原子
   role=status 区域,异步更新以语境文案宣布(如 "2 个运行中")而非裸数字。
   背景用 bg-layer-1 + border-l2:在浅色主题的纯白页面上仍保有可见的
   容器感(bg-module-platform 叠白底对比度趋零,已弃用)。 */
.dshd-hud{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 10px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;flex:none}
.dshd-hud-chip{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:2px 9px;max-width:100%}
.dshd-hud-label{color:var(--dsw-alias-label-tertiary);flex:none}
.dshd-hud-value{font-weight:600;font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
/* 状态圆点:基类定义尺寸(成员列表/看板共用),颜色类只上色 */
.dshd-dot{width:7px;height:7px;border-radius:50%;flex:none}
.dshd-hud-dot{width:7px;height:7px;border-radius:50%;flex:none}
.dshd-dot-accent{background:var(--dsw-alias-state-business-primary)}
.dshd-dot-good{background:var(--dsw-alias-state-success-primary)}
.dshd-dot-warn{background:var(--dsw-alias-state-warn-primary)}
.dshd-dot-bad{background:var(--dsw-alias-state-error-primary)}
.dshd-dot-idle{background:var(--dsw-alias-label-tertiary)}

/* ── Board view (content-aware kanban) ────────────────────────────────────── */
/* 区块标题:顶部换成渐变发丝线作分区,左侧加一道渐变强调刻度,给整个
   看板区一个可记忆的视觉锚点(主题自适应,无硬编码色)。 */
.dshd-boardTitle{font-size:14px;font-weight:700;letter-spacing:.02em;color:var(--dsw-alias-label-primary);margin:8px 0 0;padding:14px 0 2px 14px;position:relative;border-top:0}
.dshd-boardTitle::before{content:"";position:absolute;left:0;top:16px;bottom:4px;width:3px;border-radius:2px;background:linear-gradient(180deg,var(--dsw-alias-state-business-primary) 0%,color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,var(--dsw-alias-state-success-primary)) 100%)}
.dshd-boardTitle::after{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,var(--dsw-alias-border-l2) 0%,color-mix(in srgb,var(--dsw-alias-state-business-primary) 26%,transparent) 42%,transparent 100%)}
.dshd-board-statuses{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.dshd-board-status{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:7px 9px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;font-variant-numeric:tabular-nums}
.dshd-board-status-count{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-bg-layer-1);border-radius:999px;font-size:10px;font-weight:700}
.dshd-board-status[data-populated]{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
.dshd-board-status[data-populated] .dshd-board-status-count{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,var(--dsw-alias-bg-base))}
.dshd-board-status[data-state="blocked"][data-populated] .dshd-board-status-count{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,var(--dsw-alias-bg-base))}
.dshd-board-status[data-state="done"][data-populated] .dshd-board-status-count{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,var(--dsw-alias-bg-base))}
.dshd-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;align-items:start}
.dshd-col{display:flex;flex-direction:column;gap:10px;min-width:0;padding:10px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 68%,var(--dsw-alias-bg-base));border:1px solid var(--dsw-alias-border-l2);border-radius:12px}
.dshd-col[data-empty="true"]{display:none}
.dshd-col-title{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--dsw-alias-label-primary);margin:0;padding:0 2px 8px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshd-col-count{font-size:10px;font-weight:700;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 6px;font-variant-numeric:tabular-nums}
.dshd-col-body{display:flex;flex-direction:column;gap:8px;min-height:24px}
.dshd-col-planned .dshd-col-body{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));align-items:stretch}
.dshd-col-planned .dshd-bcard{height:100%}
.dshd-bcard{display:flex;flex-direction:column;gap:6px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-left-width:3px;border-radius:10px;padding:10px 11px;min-width:0}
.dshd-bcard-accent{border-left-color:var(--dsw-alias-state-business-primary)}
.dshd-bcard-good{border-left-color:var(--dsw-alias-state-success-primary)}
.dshd-bcard-warn{border-left-color:var(--dsw-alias-state-warn-primary)}
.dshd-bcard-bad{border-left-color:var(--dsw-alias-state-error-primary)}
.dshd-bcard-idle{border-left-color:var(--dsw-alias-border-l2)}
.dshd-bcard-head{display:flex;flex-direction:column;align-items:flex-start;gap:3px}
.dshd-bcard-title{font-size:12px;font-weight:600;line-height:1.45;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-width:0}
.dshd-bcard-meta{font-size:10px;color:var(--dsw-alias-label-tertiary);line-height:1.4;font-variant-numeric:tabular-nums}
.dshd-bcard-body{font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshd-bcard-note{margin:0;font-size:11px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.dshd-member-list{list-style:none;margin:2px 0 0;padding:0;display:flex;flex-direction:column;gap:3px}
.dshd-member-row{display:flex;align-items:center;gap:6px;font-size:11px;min-width:0}
.dshd-member-label{font-weight:600;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.dshd-member-phase{color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:none;max-width:70px}
.dshd-member-outcome{margin-left:auto;color:var(--dsw-alias-label-tertiary);flex:none;font-size:10px}
.dshd-board-hint{font-size:10.5px;color:var(--dsw-alias-label-tertiary);margin:0;text-align:center}
@media (max-width:640px){.dshd-board-statuses{grid-template-columns:repeat(2,minmax(0,1fr))}.dshd-col-planned .dshd-col-body{grid-template-columns:1fr}.dshd-bcard{padding:9px 10px}}

/* ── Dashboard information architecture ─────────────────────────────────────
   One visual scale for the whole tab: current state first, compact summary
   second, metrics third, then deeper analysis. Non-interactive panels do not
   lift on hover, so movement consistently signals an actionable element. */
.dshd-root{position:relative;display:flex;flex:1 1 0;height:auto;gap:20px;padding:20px 24px 32px;max-width:1280px;min-width:0;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;scrollbar-gutter:stable;padding-bottom:calc(32px + var(--dsh-composer-height,0px))}
.dshd-header{min-height:52px;padding:10px 12px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;gap:8px}
.dshd-title{font-size:16px;font-weight:700;margin-right:2px}
.dshd-live{padding:3px 9px;font-weight:600}
.dshd-chip{padding:3px 8px;background:var(--dsw-alias-bg-base)}

/* Current activity is a scan-friendly grid instead of an unstructured chip row. */
.dshd-hud{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;padding:0;background:transparent;border:none;border-radius:0}
.dshd-hud-chip{display:grid;grid-template-columns:8px minmax(0,1fr);grid-template-areas:"dot label" "dot value";column-gap:7px;row-gap:1px;min-height:58px;padding:9px 10px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-left:3px solid var(--dsw-alias-border-l1);border-radius:10px}
.dshd-hud-dot{grid-area:dot;align-self:center}
.dshd-hud-label{grid-area:label;font-size:10px;line-height:1.3;text-transform:uppercase;letter-spacing:.04em}
.dshd-hud-value{grid-area:value;font-size:12px;line-height:1.4;white-space:normal;overflow-wrap:anywhere}
.dshd-hud-chip[data-tone="accent"]{border-left-color:var(--dsw-alias-state-business-primary)}
.dshd-hud-chip[data-tone="good"]{border-left-color:var(--dsw-alias-state-success-primary)}
.dshd-hud-chip[data-tone="warn"]{border-left-color:var(--dsw-alias-state-warn-primary)}
.dshd-hud-chip[data-tone="bad"]{border-left-color:var(--dsw-alias-state-error-primary)}
/* 状态 chip 随运行态出现/消失,给一个极短的淡入让变化可感知但不抢戏
   (prefers-reduced-motion 由全局规则统一关闭)。 */
.dshd-hud-chip{animation:dshdTipIn .18s ease-out both}

/* Keep the dashboard identity and its key figures in one complete frame in
   normal document flow. It must scroll with the dashboard content instead of
   following the viewport. */
.dshd-dashboardHead{display:flex;flex:0 0 auto;flex-direction:column;align-self:stretch;width:100%;max-width:100%;min-width:0;overflow:hidden;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:none}
.dshd-dashboardHead .dshd-header{min-height:52px;padding:10px 12px;background:transparent;border:0;border-radius:0}
.dshd-summary{position:static;inset:auto;z-index:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(132px,1fr));gap:0;align-self:stretch;flex:0 0 auto;width:100%;max-width:100%;min-width:0;margin:0;padding:6px 0;background:transparent;border:0;border-top:1px solid var(--dsw-alias-border-l2);border-radius:0;backdrop-filter:none}
.dshd-summaryItem{display:flex;flex-direction:column;gap:2px;min-width:0;padding:4px 14px;background:transparent;border-inline-start:1px solid var(--dsw-alias-border-l2)}
.dshd-summaryItem:first-child{border-inline-start:0}
.dshd-summaryLabel{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px}
.dshd-summaryValue{font-size:13px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* The scroll root is a column flexbox. Keep this async two-line surface at
   its content height so constrained viewports cannot shrink it past its body. */
.dshd-streamRow{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:start;gap:8px 10px;flex:0 0 auto;min-height:56px;padding:10px 14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:12px}
.dshd-streamRow>.dshd-streamDot{margin-top:6px}
.dshd-streamBody{display:flex;flex-direction:column;gap:6px;min-width:0;overflow:hidden}
.dshd-streamHead{display:flex;align-items:center;gap:8px;min-width:0;min-height:20px;overflow:hidden;white-space:nowrap}
.dshd-streamText{flex:none;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dshd-streamHead .dshd-streamTool,.dshd-streamHead .dshd-streamWarn{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-streamLine{display:flex;align-items:center;gap:7px;min-width:0;height:25px;padding:3px 7px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;overflow:hidden;white-space:nowrap}
.dshd-streamLine[data-kind="reasoning"]{border-left:3px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 68%,var(--dsw-alias-state-error-primary) 32%);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 5%,var(--dsw-alias-bg-base))}
.dshd-streamLine[data-kind="text"]{border-left:3px solid var(--dsw-alias-state-business-primary)}
.dshd-streamLine[data-kind="tool-call"]{border-left:3px solid var(--dsw-alias-state-success-primary)}
.dshd-streamLine[data-kind="empty"]{border-left:3px solid var(--dsw-alias-border-l1)}
.dshd-streamMarker{display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:37px;height:17px;padding:0 5px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);font-size:8.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.dshd-streamLine[data-kind="reasoning"] .dshd-streamMarker{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent)}
.dshd-streamLine[data-kind="text"] .dshd-streamMarker{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent)}
.dshd-streamLine[data-kind="tool-call"] .dshd-streamMarker{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent)}
.dshd-streamSegmentLabel{flex:none;max-width:100px;font-size:10.5px;font-weight:600;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-streamLineText{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;line-height:1.4}

/* Metrics share predictable density; analytical cards become two readable columns. */
.dshd-card{padding:18px;gap:14px;background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l2);border-radius:14px;box-shadow:none;transition:border-color .16s ease}
.dshd-card:hover{transform:none;box-shadow:none;border-color:var(--dsw-alias-border-l1)}
.dshd-cardHead{align-items:flex-start;gap:6px 10px;padding-bottom:10px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshd-cardTitle{font-size:14px;font-weight:700}
.dshd-cardTitle::before{height:15px;background:var(--dsw-alias-state-business-primary)}
.dshd-cardHint{font-size:10.5px;line-height:1.45}
.dshd-grid2{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.dshd-card .dshd-col{gap:10px}
.dshd-stats{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.dshd-stat{min-height:96px;padding:12px 14px;gap:5px;background:var(--dsw-alias-bg-layer-1);border-radius:10px;box-shadow:none;transition:border-color .16s ease,background .16s ease}
.dshd-stat:hover{transform:none;box-shadow:none;background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l1)}
.dshd-statValue{font-size:clamp(18px,1.05rem + .55vw,24px);line-height:1.15}
.dshd-statSpark{margin-top:auto}
.dshd-statSub{line-height:1.4;white-space:normal}

/* Subagent status: one source of truth, with settled children kept out of a
   misleading "planned" bucket. The status text always accompanies the dot. */
.dshd-subagentStatusBar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.dshd-subagentStatusStat{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:8px 10px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:9px;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600}
.dshd-subagentStatusStat strong{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:19px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);font-size:10px;font-variant-numeric:tabular-nums}
.dshd-subagentStatusStat[data-populated]{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
.dshd-subagentStatusStat[data-state="running"][data-populated] strong{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,var(--dsw-alias-bg-base))}
.dshd-subagentStatusStat[data-state="completed"][data-populated] strong{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,var(--dsw-alias-bg-base))}
.dshd-subagentStatusStat[data-state="inactive"][data-populated] strong{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
.dshd-subagentStatusStat[data-state="archived"][data-populated] strong{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
.dshd-subagentArchiveToggle{min-height:44px;font:inherit;text-align:left;cursor:pointer;transition:border-color .16s ease,background .16s ease}
.dshd-subagentArchiveToggle:hover:not(:disabled){border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-interactive-bg-hover)}
.dshd-subagentArchiveToggle:disabled{cursor:default;opacity:.55}
.dshd-subagentArchiveToggle:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 72%,transparent);outline-offset:2px}
.dshd-subagentArchiveMeta{display:inline-flex;align-items:center;gap:5px;flex:none}
.dshd-subagentArchiveMeta svg{display:block;color:var(--dsw-alias-label-tertiary)}
.dshd-subagentPanel{display:flex;flex-direction:column;gap:12px;padding:12px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 68%,var(--dsw-alias-bg-base));border:1px solid var(--dsw-alias-border-l2);border-radius:12px}
.dshd-subagentPanelHead{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px 9px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshd-subagentPanelHead h3{margin:0;font-size:12px;font-weight:700;color:var(--dsw-alias-label-primary)}
.dshd-subagentPanelHead span{display:block;margin-top:3px;color:var(--dsw-alias-label-tertiary);font-size:10px}
.dshd-subagentGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;align-items:stretch}
.dshd-subagentCard{display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;min-height:76px;padding:11px 12px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-left:3px solid var(--dsw-alias-border-l2);border-radius:10px}
.dshd-subagentCard[data-state="running"]{border-left-color:var(--dsw-alias-state-business-primary)}
.dshd-subagentCard[data-state="completed"]{border-left-color:var(--dsw-alias-state-success-primary)}
.dshd-subagentCardHead{display:grid;grid-template-columns:8px minmax(0,1fr) auto;align-items:start;gap:8px;min-width:0}
.dshd-subagentDot{width:8px;height:8px;margin-top:5px;border-radius:50%;background:var(--dsw-alias-label-tertiary);flex:none}
.dshd-subagentCard[data-state="running"] .dshd-subagentDot{background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite}
.dshd-subagentCard[data-state="completed"] .dshd-subagentDot{background:var(--dsw-alias-state-success-primary)}
.dshd-subagentIdentity{display:flex;flex-direction:column;gap:3px;min-width:0}
.dshd-subagentTitle{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650;line-height:1.4}
.dshd-subagentMode{color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.3}
.dshd-subagentStatus{flex:none;padding:3px 7px;border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.2;white-space:nowrap}
.dshd-subagentCard[data-state="running"] .dshd-subagentStatus{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,var(--dsw-alias-bg-base))}
.dshd-subagentCard[data-state="completed"] .dshd-subagentStatus{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,var(--dsw-alias-bg-base))}
.dshd-subagentMeta{display:flex;align-items:center;gap:8px;min-width:0;padding-top:8px;border-top:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:9.5px;line-height:1.35}
.dshd-subagentMeta>span:first-child{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-subagentMetaHint{flex:none;max-width:52%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:inherit;color:var(--dsw-alias-label-tertiary)}
.dshd-subagentOpen{flex:none;min-height:28px;padding:4px 8px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-family:var(--ds-font-family-sans,inherit);font-size:10px;line-height:1.2;white-space:nowrap;cursor:pointer;transition:color .16s ease,border-color .16s ease,background .16s ease}
.dshd-subagentOpen:hover{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 42%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,var(--dsw-alias-bg-base))}
.dshd-subagentOpen:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 72%,transparent);outline-offset:2px}
.dshd-subagentEmpty{margin:0;padding:18px 12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:12px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px}
.dshd-subagentRunningEmpty{margin:0;padding:12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:11px;background:var(--dsw-alias-bg-base);border:1px dashed var(--dsw-alias-border-l2);border-radius:9px}
.dshd-subagentArchivePanel{background:var(--dsw-alias-bg-layer-1)}

/* ── Subagent cards: entrance stagger, hover affordance, live glow ──────────
   卡片在挂载时以极短错峰上浮入场(键稳定,重排不重放);悬停只加深
   边框/底色、不位移——与"可动即可点"的信息架构一致;运行中卡片带
   一层极淡的品牌色光晕,让"活着"的状态在扫读时第一时间被抓住。 */
.dshd-subagentCard{transition:border-color .18s ease,background .18s ease,box-shadow .18s ease;animation:dshdEnter .34s cubic-bezier(.22,.61,.36,1) both}
.dshd-subagentGrid .dshd-subagentCard:nth-child(2){animation-delay:.045s}
.dshd-subagentGrid .dshd-subagentCard:nth-child(3){animation-delay:.09s}
.dshd-subagentGrid .dshd-subagentCard:nth-child(4){animation-delay:.135s}
.dshd-subagentGrid .dshd-subagentCard:nth-child(5){animation-delay:.18s}
.dshd-subagentGrid .dshd-subagentCard:nth-child(6){animation-delay:.225s}
.dshd-subagentGrid .dshd-subagentCard:nth-child(n+7){animation-delay:.27s}
.dshd-subagentCard:hover{border-top-color:var(--dsw-alias-border-l3);border-right-color:var(--dsw-alias-border-l3);border-bottom-color:var(--dsw-alias-border-l3);background:color-mix(in srgb,var(--dsw-alias-bg-base) 94%,var(--dsw-alias-bg-layer-2))}
.dshd-subagentCard[data-state="running"]{box-shadow:0 0 0 1px color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent),0 3px 12px color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}

@media (max-width:900px){
  .dshd-root{gap:16px;padding:16px 16px 28px;padding-bottom:calc(28px + var(--dsh-composer-height,0px))}
  .dshd-grid2{grid-template-columns:1fr}
  .dshd-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .dshd-subagentStatusBar{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:560px){
  .dshd-header{padding:9px 10px}
  .dshd-spacer{display:none}
  .dshd-hud{grid-template-columns:1fr}
  .dshd-summary{grid-template-columns:repeat(2,minmax(0,1fr))}
  .dshd-stats{grid-template-columns:1fr}
  .dshd-card{padding:14px}
  .dshd-subagentStatusBar{grid-template-columns:1fr}
  .dshd-subagentGrid{grid-template-columns:1fr}
}
`;
