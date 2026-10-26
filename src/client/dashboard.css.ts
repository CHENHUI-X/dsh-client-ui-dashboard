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
  error: "var(--dsw-alias-state-error-primary)",
  user: "var(--dshd-accent)", assistant: "var(--dshd-teal)",
  system: "var(--dshd-muted)", tool: "var(--dshd-indigo)", other: "var(--dshd-muted)",
  input: "var(--dshd-accent)", cacheRead: "var(--dshd-teal)", cacheWrite: "var(--dshd-amber)",
  output: "var(--dshd-indigo)", reasoning: "var(--dshd-indigo)", llm: "var(--dshd-accent)",
  toolTime: "var(--dshd-teal)", messages: "var(--dshd-accent)", tools: "var(--dshd-indigo)",
  systemPrompt: "var(--dshd-muted)", steering: "var(--dshd-amber)"
} as const;

const css = String.raw`
/* The host owns the theme. Data colors are distinct from error and warning states. */
.dshd-root *{box-sizing:border-box}
.dshd-muted{color:var(--dsw-alias-label-tertiary)}
.dshd-liveDot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:dshdPulse 1.4s ease-in-out infinite}
@keyframes dshdPulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes dshdTipIn{from{opacity:0}to{opacity:1}}
.dshd-spacer{flex:1}
.dshd-col{display:flex;flex-direction:column;gap:12px;min-width:0}
.dshd-subTitle{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-top:2px}
.dshd-statValue[data-accent]{color:var(--dsw-alias-state-business-primary)}
.dshd-statValue[data-warn]{color:var(--dsw-alias-state-warn-primary)}
.dshd-statValue[data-good]{color:var(--dsw-alias-state-success-primary)}
.dshd-statValue[data-bad]{color:var(--dsw-alias-state-error-primary)}
.dshd-statValue[data-reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 62%,var(--dsw-alias-state-error-primary) 38%)}
.dshd-legend{display:flex;flex-direction:column;gap:4px;min-width:140px}
.dshd-legendRow{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;max-width:100%}
.dshd-legendSwatch{width:9px;height:9px;border-radius:2.5px;flex:none}
.dshd-legendName{min-width:0;overflow:hidden;text-overflow:ellipsis}
.dshd-legendValue{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:550}
.dshd-legendPercent{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;min-width:34px;text-align:right}
.dshd-stackSegment{height:100%;min-width:2px;transition:width .25s ease}
.dshd-stackEmpty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:10.5px}
.dshd-chartBody{display:flex;flex-direction:column;gap:8px;min-width:0}
.dshd-hbar{display:flex;align-items:center;gap:8px;font-size:11.5px;min-width:0;flex-wrap:wrap}
.dshd-hbarSubLine{flex:1 1 100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
.dshd-hbarName{width:clamp(64px,30%,120px);flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
.dshd-hbarTrack{flex:1;height:12px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.dshd-hbarFill{display:block;height:100%;border-radius:6px;transition:width .25s ease}
.dshd-errorMark{color:var(--dsw-alias-state-error-primary);font-weight:700;margin-left:1px}
.dshd-hbarValue{flex:none;min-width:44px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap}
.dshd-hbarSub{flex:none;min-width:0;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
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
.dshd-statusPill[data-s=complete]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
.dshd-statusPill[data-s=running]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 30%,transparent)}
.dshd-statusPill[data-s=error]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 30%,transparent)}
.dshd-statusPill[data-s=compaction]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 30%,transparent)}
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
.dshd-seriesTotal{font-size:11px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-weight:550}
.dshd-scopeTag{font-family:var(--ds-font-family-base,ui-sans-serif,system-ui,sans-serif);font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 25%,transparent);border-radius:4px;padding:0 4px;vertical-align:1px;white-space:nowrap}
.dshd-filters{display:flex;gap:6px;flex-wrap:wrap}
.dshd-filterBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;white-space:nowrap}
.dshd-filterBtn:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
.dshd-filterBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
.dshd-newBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;cursor:pointer;transition:background .15s;white-space:nowrap}
.dshd-newBtn:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
.dshd-viewTab{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-tertiary);background:transparent;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:background .15s,color .15s}
.dshd-viewTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.dshd-viewTab[data-current]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}
.dshd-search:focus{border-color:var(--dsw-alias-state-business-primary)}
.dshd-search::placeholder{color:var(--dsw-alias-label-tertiary)}
.dshd-groups{display:flex;flex-direction:column;gap:8px}
.dshd-group{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-base)}
.dshd-groupHead{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;font-size:11.5px;background:color-mix(in srgb,var(--dsw-alias-border-l2) 22%,transparent);border:none;cursor:pointer;color:var(--dsw-alias-label-primary);text-align:left}
.dshd-groupHead:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 7%,var(--dsw-alias-bg-base))}
.dshd-groupName{flex:1;min-width:0;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-groupStats{margin-left:auto;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshd-groupBody{padding:2px 0}
.dshd-groupBody .dshd-table{border:none;margin:0}
.dshd-modelTimeline{padding:2px 0 4px}
.dshd-modelTimeline svg circle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dshd-modelLegend{display:flex;flex-wrap:wrap;gap:8px;padding:4px 2px 0;font-size:10px;color:var(--dsw-alias-label-secondary)}
.dshd-modelLegendItem{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
.dshd-modelLegendItem i{width:8px;height:8px;border-radius:50%;display:inline-block}
.dshd-modelNote{font-size:10px;color:var(--dsw-alias-label-secondary);padding:2px 2px 0}
.dshd-formBadge{display:inline-block;margin-left:6px;padding:0 6px;font-size:9.5px;font-weight:600;border-radius:999px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);vertical-align:1px}
.dshd-formBadge[data-f="instructions"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent)}
.dshd-formBadge[data-f="recall"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
.dshd-formBadge[data-f="snapshot"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 8%,transparent)}
.dshd-formBadge[data-f="opaque"]{color:var(--dsw-alias-label-tertiary)}
.dshd-streamDot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite;flex:none}
.dshd-streamText{font-variant-numeric:tabular-nums}
.dshd-streamTool{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}
.dshd-streamHead{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dshd-spark{display:block;max-width:100%}
.dshd-ttftStats{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:normal}
.dshd-streamWarn{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;font-weight:700;color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}
.dshd-delta{font-size:10px;font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);border-radius:999px;padding:0 6px}
.dshd-deltaUp{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
.dshd-deltaDown{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,transparent)}
.dshd-percRow{display:flex;gap:14px;flex-wrap:wrap}
.dshd-perc{font-size:11px;color:var(--dsw-alias-label-tertiary)}
.dshd-perc b{color:var(--dsw-alias-label-primary);font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);margin-left:2px}
.dshd-hist{display:flex;align-items:flex-end;gap:3px;height:52px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dshd-histCol{flex:1;height:100%;display:flex;align-items:flex-end;min-width:0}
.dshd-histBar{width:100%;border-radius:2px 2px 0 0;transition:height .25s ease}
.dshd-errRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0}
.dshd-errMsg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
.dshd-errCount{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-state-error-primary);font-weight:650;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
.dshd-compactRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0;flex-wrap:wrap}
.dshd-compactSeq{flex:none;font-weight:600;color:var(--dsw-alias-state-business-primary)}
.dshd-compactArrow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-secondary)}
.dshd-compactRecovered{flex:none;font-variant-numeric:tabular-nums;font-weight:650;color:var(--dsw-alias-state-success-primary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
.dshd-turnList{display:flex;flex-direction:column;gap:6px}
.dshd-turnRow{display:flex;align-items:center;gap:8px;font-size:11.5px}
.dshd-turnName{min-width:56px;flex:none;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dshd-turnTrack{flex:1;height:10px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.dshd-turnValue{min-width:56px;text-align:right;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px}
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
.dshd-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-radius:6px}
@media (prefers-reduced-motion: reduce){.dshd-root *,.dshd-root *::before,.dshd-root *::after{transition:none!important;animation:none!important}
  .dshd-liveDot{animation:none}}
.dshd-seriesLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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
.dshd-gaugeRow{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.dshd-gaugeBox{display:flex;flex-direction:column;align-items:center;gap:2px;flex:none;max-width:100%;min-width:0}
.dshd-gaugeLabel{font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-jumpText{font-size:10.5px;font-weight:600;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border-radius:999px;padding:1px 9px;cursor:pointer;transition:background .15s;white-space:nowrap}
.dshd-jumpText:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
.dshd-jump{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;cursor:pointer;transition:background .12s,border-color .12s,color .12s}
.dshd-jump:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-inverted,var(--dsw-alias-border-l1));color:var(--dsw-alias-label-primary)}
.dshd-clearFilter{font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 10px;cursor:pointer;transition:background .15s}
.dshd-clearFilter:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent)}
.dshd-vbars:hover .dshd-maxTag,.dshd-areaWrap:hover .dshd-maxTag{opacity:0}
.dshd-maxTag{position:absolute;top:2px;right:2px;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-bg-base) 84%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;z-index:4;pointer-events:none;font-variant-numeric:tabular-nums}
.dshd-badge{font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 5px;margin-left:4px;font-variant-numeric:tabular-nums}
.dshd-healthTag{display:inline-block;font-size:9.5px;font-weight:700;border-radius:4px;padding:1px 5px;margin-right:6px;flex:none;line-height:1.5}
.dshd-healthTag[data-k="loop"]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent)}
.dshd-healthTag[data-k="noProgress"]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent)}
.dshd-dot{width:7px;height:7px;border-radius:50%;flex:none}
.dshd-hud-dot{width:7px;height:7px;border-radius:50%;flex:none}
.dshd-dot-accent{background:var(--dsw-alias-state-business-primary)}
.dshd-dot-good{background:var(--dsw-alias-state-success-primary)}
.dshd-dot-warn{background:var(--dsw-alias-state-warn-primary)}
.dshd-dot-bad{background:var(--dsw-alias-state-error-primary)}
.dshd-dot-idle{background:var(--dsw-alias-label-tertiary)}
.dshd-subagentStatusBar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
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
.dshd-subagentCard[data-state="running"]{border-left-color:var(--dsw-alias-state-business-primary)}
.dshd-subagentCard[data-state="completed"]{border-left-color:var(--dsw-alias-state-success-primary)}
.dshd-subagentCardHead{display:grid;grid-template-columns:8px minmax(0,1fr) auto;align-items:start;gap:8px;min-width:0}
.dshd-subagentDot{width:8px;height:8px;margin-top:5px;border-radius:50%;background:var(--dsw-alias-label-tertiary);flex:none}
.dshd-subagentCard[data-state="running"] .dshd-subagentDot{background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite}
.dshd-subagentCard[data-state="completed"] .dshd-subagentDot{background:var(--dsw-alias-state-success-primary)}
.dshd-subagentIdentity{display:flex;flex-direction:column;gap:3px;min-width:0}
.dshd-subagentMode{color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.3}
.dshd-subagentStatus{flex:none;padding:3px 7px;border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.2;white-space:nowrap}
.dshd-subagentCard[data-state="running"] .dshd-subagentStatus{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,var(--dsw-alias-bg-base))}
.dshd-subagentCard[data-state="completed"] .dshd-subagentStatus{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,var(--dsw-alias-bg-base))}
.dshd-subagentMeta{display:flex;align-items:center;gap:8px;min-width:0;padding-top:8px;border-top:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:9.5px;line-height:1.35}
.dshd-subagentMeta>span:first-child{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dshd-subagentMetaHint{flex:none;max-width:52%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:inherit;color:var(--dsw-alias-label-tertiary)}
.dshd-subagentOpen:hover{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 42%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,var(--dsw-alias-bg-base))}
.dshd-subagentOpen:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 72%,transparent);outline-offset:2px}
.dshd-subagentEmpty{margin:0;padding:18px 12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:12px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px}
.dshd-subagentRunningEmpty{margin:0;padding:12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:11px;background:var(--dsw-alias-bg-base);border:1px dashed var(--dsw-alias-border-l2);border-radius:9px}
.dshd-subagentArchivePanel{background:var(--dsw-alias-bg-layer-1)}
.dshd-root{box-sizing:border-box;color:var(--dsw-alias-label-primary);padding-bottom:calc(28px + var(--dsh-composer-height,0px));--dshd-accent:var(--dsw-alias-state-business-primary,#4268d7);--dshd-teal:light-dark(#267e77,#6bc3b3);--dshd-indigo:light-dark(#78759e,#aaa8d2);--dshd-amber:light-dark(#a87521,#d9ad61);--dshd-muted:var(--dsw-alias-label-secondary,#647084);--dshd-surface:var(--dsw-alias-bg-base,#fff);--dshd-tint:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,var(--dshd-surface));--dshd-line:var(--dsw-alias-border-l2,#e6e8ee);position:relative;display:flex;flex:1 1 0;flex-direction:column;height:auto;min-height:0;min-width:0;width:100%;max-width:1280px;margin:0 auto;padding:24px 28px calc(32px + var(--dsh-composer-height,0px));gap:20px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-gutter:stable;background:var(--dshd-surface);font:13px/1.5 "Avenir Next","PingFang SC",system-ui,sans-serif;font-variant-numeric:tabular-nums;container-type:inline-size;container-name:dashboard}
.dshd-root>*{flex-shrink:0}
.dshd-root .dshd-icon{flex:none;vertical-align:middle}
.dshd-dashboardHead{position:sticky;top:-24px;z-index:5;margin:-24px -28px 0;padding:20px 28px 0;background:var(--dshd-surface);border-bottom:1px solid var(--dshd-line)}
.dshd-header{display:flex;align-items:center;gap:12px;min-height:58px;padding:0 0 16px}
.dshd-brandMark{display:grid;place-items:center;width:32px;height:40px;color:var(--dshd-accent)}
.dshd-headingGroup{min-width:0}
.dshd-title{margin:0;font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.04em}
.dshd-subtitle{display:block;font-size:12px;color:var(--dshd-muted);margin-top:4px}
.dshd-chip{color:var(--dsw-alias-label-secondary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap;max-width:38%;overflow:hidden;text-overflow:ellipsis;background:var(--dshd-tint);border:1px solid var(--dshd-line);padding:4px 8px;font-size:12px;border-radius:6px}
.dshd-navigation{display:flex;gap:28px;overflow-x:auto;scrollbar-width:thin}
.dshd-navItem{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:12px 0;border:0;background:none;color:var(--dshd-muted);font:inherit;font-weight:500;white-space:nowrap;cursor:pointer;transition:color .15s}
.dshd-navItem:hover{color:var(--dsw-alias-label-primary)}
.dshd-navItem[aria-pressed=true]{color:var(--dshd-accent)}
.dshd-navItem[aria-pressed=true]::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:currentColor;border-radius:2px 2px 0 0}
.dshd-navCount{min-width:18px;line-height:18px;padding:0 4px;background:var(--dshd-tint);border-radius:4px;font-size:11px;text-align:center}
.dshd-navCount[data-error=true]{color:var(--dsw-alias-state-error-primary)}
.dshd-sectionIntro{display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.dshd-sectionIntro h2{font-size:14px;font-weight:600;margin:0}
.dshd-sectionIntro>span{color:var(--dshd-muted);font-size:12px}
.dshd-primaryMetric{padding:24px 24px 16px;min-width:0;background:light-dark(#f5f7fa,color-mix(in srgb,var(--dshd-accent) 5%,var(--dshd-surface)))}
.dshd-heroValue{display:block;font-size:34px;font-weight:500;letter-spacing:-.04em;line-height:1.1;color:var(--dsw-alias-label-primary)}
.dshd-requestBreakdown{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--dshd-muted);margin-top:20px}
.dshd-requestBreakdown button{display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:0;border:0;background:none;font:inherit;color:inherit;cursor:pointer}
.dshd-requestBreakdown button[data-error=true]{color:var(--dsw-alias-state-error-primary)}
.dshd-requestBreakdown .dshd-icon{width:14px;height:14px}
.dshd-card{display:flex;flex-direction:column;background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:10px;padding:20px;gap:16px;min-width:0;box-shadow:none}
.dshd-card:hover{box-shadow:none;transform:none;border-color:var(--dshd-line)}
.dshd-cardHead{display:flex;border:0;padding:0;gap:8px;align-items:center;flex-wrap:wrap}
.dshd-cardTitle{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600}
.dshd-cardTitle::before{content:"";width:3px;height:13px;border-radius:2px;background:var(--dsw-alias-label-tertiary);flex:none;display:none}
.dshd-cardHint{flex:1 1 auto;min-width:0;white-space:normal;overflow-wrap:anywhere;font-size:12px;max-width:100%;color:var(--dshd-muted);line-height:1.6}
.dshd-cardHead .dshd-cardHint{margin-left:auto}
.dshd-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}
.dshd-grid2>.dshd-card{height:auto;min-height:0}
.dshd-stat{display:flex;flex-direction:column;position:relative;transition:border-color .18s,transform .2s ease,box-shadow .2s ease;animation:none;transform:none;border:0;background:none;box-shadow:none;border-radius:0;padding:0;gap:8px;min-width:0}
.dshd-stat::before{display:none}
.dshd-stat:hover{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,var(--dsw-alias-border-l1));transform:none;box-shadow:none}
.dshd-statLabel{display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;font-size:12px;line-height:1.5;color:var(--dshd-muted);white-space:normal}
.dshd-statValue{font-variant-numeric:tabular-nums;min-width:0;overflow-wrap:anywhere;font-family:inherit;font-size:28px;line-height:1.25;letter-spacing:-.025em;font-weight:550}
.dshd-statSub{font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;font-size:12px;white-space:normal;line-height:1.5;color:var(--dshd-muted);overflow-wrap:anywhere}
.dshd-tokenStats{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.dshd-tokenStats>.dshd-stat{flex:1;min-width:160px;gap:12px}
.dshd-tokenStats .dshd-statValue{font-size:30px;letter-spacing:-.035em;font-weight:500;color:var(--dsw-alias-label-primary)}
.dshd-tokenStats .dshd-statSpark{display:none}
.dshd-hint{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);font-size:10px;line-height:1;cursor:help;flex:none;width:16px;height:16px;border-color:var(--dshd-line);color:var(--dshd-muted);background:none}
.dshd-hud{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:0 2px;border:0;background:none;font-size:12px}
.dshd-hud[data-empty=true]{display:none}
.dshd-hud-chip{display:inline-flex;align-items:center;gap:6px;line-height:1.5;color:var(--dsw-alias-label-primary);border-radius:999px;max-width:100%;background:none;border:0;padding:0;min-width:0;font-size:12px;animation:none}
.dshd-hud-label{flex:none;color:var(--dshd-muted)}
.dshd-hud-value{font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;font-weight:500;max-width:440px}
.dshd-streamRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--dsw-alias-label-secondary);min-height:64px;padding:12px 16px;background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:8px;flex:none}
.dshd-streamBody{display:flex;flex-direction:column;gap:8px;min-width:0;flex:1}
.dshd-streamLine{display:flex;gap:8px;min-width:0}
.dshd-streamLineText{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;font-size:12px}
.dshd-streamMarker{display:none}
.dshd-trendDetails{border:1px solid var(--dshd-line);border-radius:8px;overflow:hidden}
.dshd-trendDetails>summary{list-style:none;display:flex;align-items:center;gap:8px;min-height:44px;padding:12px;cursor:pointer;font-weight:500;font-size:13px}
.dshd-trendDetails>summary::-webkit-details-marker{display:none}
.dshd-trendDetails>summary>span{color:var(--dshd-muted);font-weight:400;margin-left:auto;font-size:12px}
.dshd-trendDetails[open]>summary{border-bottom:1px solid var(--dshd-line)}
.dshd-trendDetails[open]>summary>.dshd-icon:last-child{transform:rotate(180deg)}
.dshd-trendGrid{display:flex;flex-direction:column;gap:16px;padding:16px}
.dshd-seriesRow{flex-wrap:wrap;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.dshd-seriesCol{flex:1 1 240px;display:flex;flex-direction:column;gap:6px;min-width:0;width:auto;padding:0}
.dshd-seriesLabel,.dshd-legendRow,.dshd-hbar,.dshd-subTitle,.dshd-turnName,.dshd-turnValue{font-size:12px}
.dshd-axisHint{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:var(--dshd-muted)}
.dshd-hbarTrack,.dshd-turnTrack{height:7px;background:var(--dshd-tint);border-radius:3px}
.dshd-hbarFill,.dshd-turnFill{border-radius:3px}
.dshd-turnFill{display:block;height:100%;border-radius:5px;opacity:.85;background:var(--dshd-accent)}
.dshd-hbarRight{flex:none;display:flex;align-items:baseline;justify-content:flex-end;gap:6px;min-width:64px}
.dshd-hbars{display:flex;flex-direction:column;gap:12px}
.dshd-stack{display:flex;width:100%;overflow:hidden;background:var(--dsw-alias-bg-layer-2);height:12px;border-radius:4px;padding:0;gap:2px}
.dshd-stackTotal{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:2px;border:0;padding:0}
.dshd-stackLegend{display:flex;flex-wrap:wrap;font-variant-numeric:tabular-nums;margin-top:4px;gap:8px 20px}
.dshd-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;min-width:660px}
.dshd-table th{text-align:left;border-bottom:1px solid var(--dshd-line);white-space:nowrap;font-size:12px;font-weight:500;color:var(--dshd-muted);background:var(--dshd-tint);padding:12px}
.dshd-table td{border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:middle;white-space:nowrap;font-variant-numeric:tabular-nums;padding:12px;line-height:1.5;border-color:var(--dshd-line)}
.dshd-tableWrap{max-width:100%;border:1px solid var(--dshd-line);border-radius:8px;overflow-x:auto;scrollbar-gutter:stable}
.dshd-filter,.dshd-viewTab,.dshd-export,.dshd-pageBtn,.dshd-search,.dshd-pageSize{min-height:32px;font-size:12px;border-radius:6px}
.dshd-search{height:24px;padding:0 10px;font-size:11px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;outline:none;transition:border-color .15s;min-width:180px;flex:1}
.dshd-filters,.dshd-viewTabs{gap:8px;flex-wrap:wrap}
.dshd-viewTabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid var(--dshd-line);padding-bottom:12px}
.dshd-statusPill{display:inline-flex;align-items:center;gap:4px;font-weight:600;white-space:nowrap;border:0;border-radius:4px;font-size:11px;padding:3px 6px}
.dshd-empty{text-align:center;padding:28px 16px;font-size:13px;color:var(--dshd-muted)}
.dshd-emptyState{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:240px;padding:24px;color:var(--dshd-muted);text-align:center}
.dshd-emptyState>.dshd-icon{width:40px;height:40px;opacity:.6}
.dshd-emptyState>p{max-width:360px;margin:16px 0 0;font-size:13px;line-height:1.8}
.dshd-agentPanel{min-width:0}
.dshd-boardTitle{font-size:14px;margin:0 0 16px;font-weight:600;display:block;border:0;padding:0}
.dshd-boardTitle::before,.dshd-boardTitle::after{display:none}
.dshd-subagentCard{display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;min-height:76px;padding:11px 12px;border-left:3px solid var(--dsw-alias-border-l2);background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:8px;animation:none}
.dshd-subagentTitle{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-primary);font-weight:650;line-height:1.4;font-size:13px}
.dshd-subagentMode,.dshd-subagentMeta,.dshd-subagentOpen,.dshd-subagentStatus{font-size:12px}
.dshd-subagentOpen{flex:none;padding:4px 8px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-family:var(--ds-font-family-sans,inherit);font-size:10px;line-height:1.2;white-space:nowrap;cursor:pointer;transition:color .16s ease,border-color .16s ease,background .16s ease;min-height:32px}
.dshd-subagentStatusStat{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600;background:var(--dshd-surface)}
.dshd-brandMark .dshd-icon{width:28px;height:28px;stroke-width:1.8}
.dshd-headerContext{display:flex;align-items:flex-end;flex-direction:column;gap:4px;max-width:42%;min-width:0}
.dshd-sessionState{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--dshd-muted)}
.dshd-sessionState>span{width:6px;height:6px;border-radius:50%;background:currentColor}
.dshd-sessionState[data-running=true]{color:var(--dshd-teal)}
.dshd-modelBadge{font-size:12px;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--dshd-muted)}
.dshd-sessionOverview{display:grid;grid-template-columns:minmax(0,1fr) 248px;border:1px solid var(--dshd-line);border-radius:14px;overflow:hidden;background:var(--dshd-surface)}
.dshd-recordHead{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.dshd-recordHead h2{margin:0;font-size:21px;letter-spacing:-.025em;font-weight:600}
.dshd-recordHead p{margin:6px 0 0;font-size:12px;color:var(--dshd-muted)}
.dshd-requestTotal{display:flex;align-items:baseline;justify-content:flex-end;gap:6px;flex-wrap:wrap;font-size:12px;color:var(--dshd-muted)}
.dshd-requestTotal .dshd-hint{align-self:center}
.dshd-activity{margin-top:24px}
.dshd-activityEmpty{display:grid;place-items:center;min-height:140px;color:var(--dshd-muted);font-size:12px}
.dshd-activityCaption{display:flex;justify-content:space-between;gap:12px;font-size:11px;color:var(--dshd-muted);margin-bottom:12px}
.dshd-activityPlot{display:flex;align-items:stretch;gap:4px;height:88px;border-bottom:1px solid var(--dshd-line);background:repeating-linear-gradient(to top,transparent 0,transparent calc(25% - 1px),var(--dshd-line) 25%)}
.dshd-activitySample{display:flex;align-items:flex-end;flex:1;min-width:0;height:100%;color:var(--dshd-accent)}
.dshd-activitySample>span{display:block;width:100%;min-height:4px;border-radius:2px 2px 0 0;background:currentColor;opacity:.72;transition:opacity .15s}
.dshd-activitySample:hover>span{opacity:1}
.dshd-activitySample[data-status=error]{color:var(--dsw-alias-state-error-primary)}
.dshd-activitySample[data-status=running]{color:var(--dshd-teal)}
.dshd-activityAxis{display:flex;align-items:center;justify-content:space-between;margin-top:8px;gap:12px;font-size:11px;color:var(--dshd-muted)}
.dshd-requestBreakdown>span{display:inline-flex;align-items:center;gap:6px}
.dshd-requestBreakdown i{display:inline-block;width:6px;height:6px;flex:none;border-radius:2px;background:currentColor;font-style:normal}
.dshd-requestBreakdown>span[data-state=complete] i{background:var(--dshd-accent)}
.dshd-requestBreakdown>span[data-state=running] i{background:var(--dshd-teal)}
.dshd-requestBreakdown .dshd-openRequests{margin-left:auto;color:var(--dshd-accent);font-weight:600}
.dshd-sessionLedger{display:flex;flex-direction:column;gap:16px;padding:24px;border-left:1px solid var(--dshd-line);min-width:0}
.dshd-ledgerHead{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--dshd-muted)}
.dshd-sessionLedger>.dshd-stat{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:4px 8px}
.dshd-sessionLedger .dshd-statValue{font-size:20px;letter-spacing:-.03em;font-weight:550;text-align:right;white-space:nowrap}
.dshd-sessionLedger .dshd-statSub{grid-column:1/-1;font-size:11px;margin-top:2px}
.dshd-sessionFootnote{grid-column:1/-1;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px 24px;border-top:1px solid var(--dshd-line);font-size:11px;color:var(--dshd-muted)}
.dshd-sessionFootnote>span:last-child{display:inline-flex;gap:8px;white-space:nowrap}
.dshd-sessionFootnote b{font-weight:400;color:var(--dshd-line)}
.dshd-cardHead>.dshd-icon{width:17px;height:17px;color:var(--dshd-muted)}
.dshd-tokenPanel{border:0;border-radius:0;padding:4px 0 20px;border-bottom:1px solid var(--dshd-line);gap:20px}
.dshd-cacheMetric{display:flex;align-items:center;gap:12px;flex:1;min-width:160px}
.dshd-cacheRing{width:46px;height:46px;flex:none;border-radius:50%;background:conic-gradient(var(--dshd-teal) var(--dshd-cache-angle),var(--dshd-tint) 0);mask:radial-gradient(transparent 55%,#000 57%)}
.dshd-cacheMetric .dshd-statValue{font-size:26px}
.dshd-root[data-panel=analysis]{gap:12px}
.dshd-analysisGrid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;align-items:start}
.dshd-analysisGrid>.dshd-card{grid-column:span 2;padding:18px;gap:14px}
.dshd-analysisGrid>.dshd-toolAnalysis{grid-column:span 4}
.dshd-analysisGrid>.dshd-diagnostic{grid-column:span 3}
.dshd-analysisGrid .dshd-cardHint{font-size:11px;flex:0 1 auto;margin-left:auto}
.dshd-analysisTableScroll{overflow:auto;max-height:390px;border-block:1px solid var(--dshd-line)}
.dshd-analysisTable{border-collapse:collapse;width:100%;min-width:470px;font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.dshd-analysisTable th,.dshd-analysisTable td{padding:7px 12px;text-align:right;font-weight:500;border-bottom:1px solid var(--dshd-line)}
.dshd-analysisTable th:first-child{text-align:left;padding-left:0;width:30%;white-space:normal;overflow-wrap:anywhere}
.dshd-analysisTable th:last-child,.dshd-analysisTable td:last-child{padding-right:0}
.dshd-analysisTable thead th{position:sticky;top:0;background:var(--dshd-surface);z-index:1;color:var(--dshd-muted);font-size:11px;font-weight:400}
.dshd-analysisTable tbody tr:last-child>*{border-bottom:0}
.dshd-analysisTable tbody tr:hover{background:var(--dshd-tint)}
.dshd-toolName{display:block;line-height:1.4}
.dshd-callVolume{display:flex;justify-content:flex-end;align-items:center;gap:12px}
.dshd-toolShare{display:block;height:4px;width:52px;background:var(--dshd-tint);border-radius:2px;overflow:hidden}
.dshd-toolShare>span{display:block;height:100%;background:var(--dshd-accent);border-radius:inherit}
.dshd-analysisScrollHint{display:none}
.dshd-analysisFootnote{font-size:11px;color:var(--dshd-muted);line-height:1.6}
.dshd-modelList{display:flex;flex-direction:column;gap:16px;max-height:390px;overflow:auto}
.dshd-modelDetail+.dshd-modelDetail{border-top:1px solid var(--dshd-line);padding-top:16px}
.dshd-modelIdentity{display:flex;gap:7px;align-items:center;overflow-wrap:anywhere}
.dshd-modelIdentity>span{width:7px;height:7px;border-radius:50%;flex:none}
.dshd-modelIdentity>strong{font-size:14px;font-weight:600}
.dshd-modelProvider{font-size:11px;color:var(--dshd-muted);margin:3px 0 14px 14px;overflow-wrap:anywhere}
.dshd-modelFacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;margin:0;font-variant-numeric:tabular-nums}
.dshd-modelFacts dt{font-size:11px;color:var(--dshd-muted);line-height:1.5}
.dshd-modelFacts dd{font-size:16px;font-weight:550;margin:2px 0 0;line-height:1.4;overflow-wrap:anywhere}
.dshd-modelFacts>div:last-child{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--dshd-line);padding-top:8px}
.dshd-modelFacts>div:last-child dd{font-size:14px}
.dshd-analysisGrid [data-error=true]{color:var(--dsw-alias-state-error-primary)}
.dshd-analysisPercentiles{display:flex;gap:12px;flex-wrap:wrap;font-size:11px;font-variant-numeric:tabular-nums;border-top:1px solid var(--dshd-line);padding-top:10px;color:var(--dshd-muted)}
.dshd-analysisPercentiles>span:first-child{margin-right:auto}
.dshd-analysisPercentiles b{color:var(--dsw-alias-label-primary);font-weight:550}
.dshd-analysisGrid .dshd-turnList{gap:14px;max-height:220px;overflow:auto}
.dshd-analysisGrid .dshd-turnName{min-width:52px}
.dshd-analysisGrid .dshd-turnValue{min-width:46px;font-family:inherit}
.dshd-compositionBar{height:8px;border-radius:3px;display:flex;gap:2px;overflow:hidden;flex-shrink:0}
.dshd-compositionRows{display:flex;flex-direction:column;gap:8px;font-size:12px;font-variant-numeric:tabular-nums}
.dshd-compositionRows>div{display:grid;grid-template-columns:1fr auto 38px;gap:12px;align-items:center}
.dshd-compositionRows>div>span:first-child{display:flex;align-items:center;gap:7px;color:var(--dshd-muted)}
.dshd-compositionRows i{width:6px;height:6px;border-radius:2px;flex:none}
.dshd-compositionRows strong{font-weight:550}
.dshd-compositionRows>div>span:last-child{text-align:right;color:var(--dshd-muted)}
.dshd-injectionRows{display:flex;flex-direction:column;gap:12px;font-size:12px;max-height:220px;overflow:auto}
.dshd-injectionRows>div+div{border-top:1px solid var(--dshd-line);padding-top:12px}
.dshd-injectionRows strong{font-weight:500;overflow-wrap:anywhere}
.dshd-injectionRows>div>span{display:flex;justify-content:space-between;color:var(--dshd-muted);font-size:11px;margin-top:6px;font-variant-numeric:tabular-nums}
.dshd-injectionRows b{font-weight:500;color:var(--dsw-alias-label-primary)}
.dshd-neutralCount{font-variant-numeric:tabular-nums;font-weight:500}
@container dashboard (max-width:1050px){
  .dshd-analysisGrid>.dshd-card,.dshd-analysisGrid>.dshd-toolAnalysis{grid-column:span 3}
}
@container dashboard (max-width:700px){
  .dshd-analysisScrollHint{display:inline}
  .dshd-analysisGrid{grid-template-columns:minmax(0,1fr)}
  .dshd-analysisGrid>.dshd-card,.dshd-analysisGrid>.dshd-toolAnalysis,.dshd-analysisGrid>.dshd-diagnostic{grid-column:1}
  .dshd-sectionIntro{align-items:flex-start;flex-direction:column;gap:4px}
}
@container dashboard (max-width:850px){
  .dshd-sessionOverview{grid-template-columns:1fr}
  .dshd-sessionLedger{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-left:0;border-top:1px solid var(--dshd-line);gap:16px;padding:16px 24px}
  .dshd-ledgerHead{display:none}
  .dshd-sessionLedger>.dshd-stat{display:flex;align-items:flex-start}
  .dshd-sessionLedger .dshd-statValue{font-size:22px}
  .dshd-grid2{grid-template-columns:1fr}
}
@container dashboard (max-width:540px){.dshd-navigation{gap:16px}.dshd-navItem{gap:4px;font-size:12px}
  .dshd-navItem>.dshd-icon{display:none}
  .dshd-subtitle{display:none}.dshd-primaryMetric{padding:20px 16px 16px}
  .dshd-title{font-size:22px}.dshd-recordHead h2{font-size:18px}
  .dshd-sessionLedger{grid-template-columns:1fr;padding:16px;gap:12px}
  .dshd-sessionLedger>.dshd-stat{display:grid;grid-template-columns:1fr auto;align-items:baseline}
  .dshd-sessionFootnote{padding:12px 16px;gap:8px}
  .dshd-activityPlot{gap:2px;height:76px}.dshd-requestBreakdown{gap:12px}
  .dshd-cacheMetric{min-width:140px}.dshd-tokenStats .dshd-statValue{font-size:26px}
  .dshd-statValue{font-size:24px}.dshd-heroValue{font-size:36px}
  .dshd-seriesRow{grid-template-columns:1fr}.dshd-sectionIntro>span{font-size:11px}
  .dshd-subagentStatusBar{grid-template-columns:repeat(2,minmax(0,1fr))}
  .dshd-subagentGrid{grid-template-columns:1fr}
  .dshd-tokenStats{gap:20px}.dshd-tokenStats>.dshd-stat{min-width:120px}
  .dshd-card{padding:16px}.dshd-trendDetails>summary>span{display:none}
  .dshd-requestBreakdown{gap:8px}}
@media(max-width:600px){.dshd-root{padding:16px 12px calc(24px + var(--dsh-composer-height,0px))}.dshd-dashboardHead{top:-16px;margin:-16px -12px 0;padding:16px 12px 0}}
@media(prefers-reduced-motion:reduce){.dshd-root *,.dshd-root *::before,.dshd-root *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
