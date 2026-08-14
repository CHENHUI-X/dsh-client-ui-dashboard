# dsh-client-ui-dashboard

A real-time metrics dashboard tab for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web UI.

Adds a third tab — **看板 / Dashboard** — to the conversation view ring, next to 对话 (chat) and 轨迹 (trajectory). While a conversation runs, it visualizes the session's live metrics, updated in real time from the session snapshot and projection values:

## Screenshots

![Dashboard — overview, gauges & token usage](https://github.com/user-attachments/assets/4ef49c75-92f5-44ca-abd3-87326d9bf2cf)

![Dashboard — timings, tools, models & trends](https://github.com/user-attachments/assets/ff452b5b-d092-4e2e-ae06-451e4a3710ac)

![Dashboard — request details & diagnostics](https://github.com/user-attachments/assets/1747587d-923b-4a37-99f4-d73e519f50b6)

## What it shows

| Section | Metrics |
|---|---|
| 总览 / Overview | turns, steps, requests (completed / running / failed), tool calls & tool errors (**with failure %**), compactions, **compaction-recovered tokens & messages**, **model-switch count**, **commands**, total model+tool time, average TTFT, **estimated USD cost (DeepSeek pricing, with cache savings)**, decode speed (tok/s) — every stat has a hover `?` explanation; the key StatCards carry **sparklines** of the last 60 requests |
| Token 用量 / Token usage | billed input, output, **reasoning tokens (with share of output)**, cache hits (read) & cache writes; **cache hit rate** (labeled numerator/denominator); exact numbers everywhere; token composition stacked bar (with total and the input formula `input = uncached + cache read + cache write`); hints label the whole-log scope |
| 上下文压力 / Context pressure | **semi-circular gauge** of the projected next-request occupancy (color-coded by threshold) + the system/tools/messages composition stacked bar; explicit note when the provider reports no pressure data; **context-injection sources** card (which producers injected context, how often and how many characters, with form badges: instructions/catalog/snapshot/notice/relay/recall/opaque) |
| 消息构成 / Messages | **donut chart** with rounded caps (hover a segment to enlarge it and see the exact value in the center) + per-role shares (**User / Steering / Assistant / System / Tool**, semantic colors) |
| 耗时 / Timing | model vs tool wall-time stacked bar (with total); **duration distribution P50/P95/P99 + 10-bucket histogram**; **TTFT percentiles**; turn-by-turn durations |
| 工具调用 / Tool calls | call-count histogram per tool name, ⚠ marks tools that errored (**row tail shows failure rate x/y (r%)**); **tool time top** (total / avg / call count), with a "+N more" note for the long tail |
| 模型用量 / Model usage | tokens per model, with request counts and input→output split; **per-model avg duration, avg TTFT, error count and cost** (hover shows provider + full comparison); **cost-by-model stacked bar** (each request priced by its own model); **reasoning-effort distribution** (requests + reasoning tokens per tier); **model timeline** — one dot per request colored by model, amber ring = model switch, click to jump to the trajectory |
| 压缩效果 / Compaction effect | context size before → after each compaction, recovered tokens & messages and recovery %; the **input-per-turn sawtooth chart** marks compaction turns |
| 异常与重试 / Errors & retries | turn errors, max-token hits, model retries, manual interruptions, **commands**; **top error classes** (aggregated by message); **command details**; **retry wait & retried count**; **failed vs completed average duration** |
| Agent 健康诊断 / Agent health | **loop detection** (≥3 consecutive identical tool calls, same name + args, with involved seqs), **no-progress** (tiny output yet ≥3 tool calls), **tool-call density** per minute bucket |
| 请求趋势 / Request trend | Row 1: **gradient area chart** of per-request cache hit rate (hover shows a crosshair + exact %; running/zero-input samples are skipped so no fake 0% drops) + interactive input/output/duration **bar charts** (hover grows the bar and floats the exact value; running bars pulse; each chart keeps a fixed semantic color). The timing card also splits **TTFT by cache hit vs miss**. Row 2: **TTFT area chart** + **input-per-turn area chart** (delta badge + compaction markers) + **reasoning-share area chart** + **cache-write bar chart**. Row 3: **request density**, **token density**, **failed-request trend** and **context-occupancy trend** (per-request input ÷ context window; compaction drops visible); every mini-chart shows a max-value tag. A "last 60" note appears when there are more requests (totals explain their scope on hover). The request table — **view tabs (table / by turn / by model / by error with collapsible groups + aggregates + column headers), status filter & view tabs with **live count badges**, live search (seq / turn / model / error / purpose / tool name; smart empty states with one-click clear), JSON export (respects filter + search, writes the view into the payload), per-request **est. cost in the detail panel**, paging** — rounds out the section |

### Live streaming line & health signals

While a generation is running, a live row under the header shows the **streamed characters (text vs reasoning split)**, each **running tool (name + elapsed time)**, refreshed on every session event (and re-timed every second while running). **Requests silent for over 60 s without a first token — or tools running over 30 s — are highlighted in red.** A **sticky summary strip** (requests / completed / failed / P50 / compactions / est. cost) stays pinned while scrolling.

### Trajectory linkage (click a request)

The dashboard re-declares the conversation plugin's *shared store handle*, so it can drive the view ring exactly like the chat view's own inspect action:

- **Click a normal request row → switches to the 轨迹 / trajectory tab and inspects that request's first tool call** — the trajectory opens the tool call's summary (its parameters/arguments and result) and scrolls to it. Requests without tool calls fall back to **selecting the request's turn (turn 0 falls back to turn 1)**, so the jump always lands somewhere. **Clicking a failed request row expands its error inline instead** (you stay on the dashboard); the row-tail **↗ button** explicitly jumps to the trajectory.
- Click the small **▸** chevron (or press Enter/Space on it — keyboard-reachable with `aria-expanded`) to expand the full request detail inline (provider/model, thinking, temperature, max tokens, reasoning effort, retry count & delay, start time, system-prompt length, attached tools, the five usage buckets — uncached (hover explains the formula) / cache read / cache write / output / reasoning — the tool calls that ran under that step (args truncated, hover for the full payload), and the error message when the request failed). Rows are keyboard-reachable (`tabIndex` + Enter/Space).
- The table offers **status filtering** (All / Running / Complete / Failed; failed rows get a red edge highlight) and **pagination** (‹ prev / page numbers / next ›, 10/20/50 per page); **an empty filtered result shows "No requests match the current filter" with a "show all" button**; a "back to latest" button appears when new requests arrive while you are off the first page. It scrolls horizontally with a sticky header on narrow containers, and every control keeps a visible keyboard focus ring.

All figures are derived from the framework's standard kit (`useSession` + `useProjection`), so they update live as session events land — no host round-trips of its own.

## Install

### From npm (once published)

```sh
# 1. add the package to your web profile
dsh plugin --profile web add dsh-client-ui-dashboard

# 2. register the loader row in ~/.dsh/profiles/web/cordis.patch.yml
```

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
- insert:
    - id: ui-dashboard
      name: dsh-client-ui-dashboard
```

### From a local checkout

```sh
cd ~/.dsh/profiles/web
pnpm add /absolute/path/to/dsh-client-ui-dashboard
```

then add the same `cordis.patch.yml` row as above.

### 3. restart & refresh

Browser plugins are scanned at server start:

```sh
# restart dsh web (Ctrl+C, then re-run)
dsh web
```

Then hard-refresh the page (**Cmd/Ctrl+Shift+R**) — a new tab **看板** appears in the conversation header.

## Requirements

- dsh `>= 0.1.0-rc.6` (web profile)
- the shipped `ui-conversation` and `ui-trajectory` plugins (part of the default `dsh-web-app` bundle)

## Development

```sh
npm install        # installs build + type deps
npm run typecheck  # tsc --noEmit
npm run build      # produces lib/ (host half + client bundle + .d.ts)
```

The client bundle is emitted in the shell's `window.__ModuleLoader__.load({ id, factory })` format (same wire format as the shipped `@deepseek-ai/dsh-client-*` packages) and requires only the platform seed words (`react`, `react/jsx-runtime`).

Layout:

```
src/
  index.ts              host loader entry (no host behavior)
  client/
    index.ts            plugin entry: registers the conversation.view tab
    DashboardView.tsx   the dashboard view
    metrics.ts          pure derivation of all dashboard figures
    charts.tsx          dependency-free SVG charts
    locales.ts          zh / en dictionaries
    dashboard.css.ts    styles via --dsw-* design tokens
```

## Publish to the community

```sh
npm login                      # your npm account
npm version patch
npm publish                    # prepublishOnly runs the build
```

Users then install with `dsh plugin --profile web add dsh-client-ui-dashboard` (see Install). Make sure the name is unique on npm — `dsh-client-ui-dashboard` was free at the time of writing; rename in `package.json` if taken.

## Data sources

| Figure | Source |
|---|---|
| token totals, cache hit rate | `useProjection("tokenUsage")` — provider-reported whole-log buckets |
| turns / steps / timing folds | `useProjection("sessionStats")` |
| context occupancy | `useProjection("contextPressure")` |
| context composition | `useProjection("contextBreakdown")` |
| per-request series, roles | `useSession(s => s.views.get("trajectory"))` — the trajectory view snapshot (window-scoped) |

## License

MIT
