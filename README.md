# dsh-client-ui-dashboard

A live conversation dashboard for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). Adds a **Dashboard** tab alongside Chat and Trajectory. Reads framework snapshots and projections without separate model requests or conversation uploads.

**Version 0.4.0 requires dsh 0.2.1-rc.3**, its matching bundled Web plugins, and React 18. [中文说明](README.zh.md).

## Sections

| Section | Contents |
| --- | --- |
| Overview | Request status, reference cost, first-token latency and decode speed; token composition, cache hits, context pressure and timing |
| Usage & performance | Turns, tools, models, message roles, context sources, compaction and diagnostics |
| Requests | Status filters, search, pagination, grouped views, expandable details and filtered JSON export; trends expand on demand |
| Agents | Direct child sessions, live status, navigation and collapsed archive |

Uses the host accent and light/dark theme, consistent stroke icons and tabular figures. Overview shows real request-duration activity. Performance pairs a cumulative timing analysis with a quiet model ledger; tools sort by duration and interactive waits are labelled. Turns, message roles and context sources form an unboxed support band, with diagnostics on demand. The dashboard reserves a separate composer area, including when the input grows. Container queries, horizontally scrolling tables, visible keyboard focus and reduced motion are supported.

## Data semantics

Whole-log projections supply cumulative turns, steps, usage and timing. Request and tool records, message roles and diagnostics cover the currently loaded window. The header identifies partial history. Missing data is shown as `—`. Performance tool totals include only linked timing samples, including interactive waits and parallel calls; they are not session elapsed time.

The official `useTrajectory` subscription activates the lazy target, so opening Dashboard directly includes request records. Input includes three disjoint buckets: uncached input, cache reads and cache writes. Reasoning may already be part of output and is not added twice.

Cost uses [official DeepSeek peak rates](https://api-docs.deepseek.com/quick_start/pricing/) checked on 2026-10-26 as a reference, not a historical bill. Third-party routes, unknown models, absent usage and in-flight requests remain unpriced. If any request is unpriced, the complete total remains unknown and the count is shown.

Failed rows expand locally. Requests with a tool-call address can open the host trajectory through `openView`; otherwise navigation is disabled and local details remain available. Child-session inactivity is not interpreted as success. Archive timing is an estimate, with settled entries moved to a collapsed archive after five minutes.

## Install or upgrade from npm

```sh
cd ~/.dsh/profiles/web
pnpm add dsh-client-ui-dashboard@0.4.0
```

For a first installation, add the loader entry below. For an upgrade, keep the existing entry, restart `dsh web` and reload the browser. This command replaces any local development link with the npm version.

## Local development installation

```sh
npm ci
npm run typecheck
npm test
npm run build

cd ~/.dsh/profiles/web
pnpm add /absolute/path/to/dsh-tool-visual
```

Add this entry once to `~/.dsh/profiles/web/cordis.patch.yml`:

```yaml
- insert:
    - id: ui-dashboard
      name: dsh-client-ui-dashboard
```

Restart `dsh web` and reload the browser. Existing linked installations only need a rebuild, restart and reload; do not duplicate the loader row.

## Development

Client code lives in `src/client`; host projections and `board_query` live in `src/board`. `build.mjs` emits the host ESM module, browser module-loader bundle and declarations in `lib/`, all committed alongside source. Published dsh contracts are pinned so development does not depend on a sibling source checkout's stale artifacts.

Three focused regression checks cover request adaptation and absent data, projection/catalog folding, and direct Dashboard rendering with missing projections. Host interaction and responsive behavior are checked in the browser. Design context lives in `.ui-craft/`.

Request sorting dominates derivation: approximately O(n log n) time and O(n) memory for the loaded records. Tables are paginated and trends render at most 60 samples. Running sessions tick once per second and release the timer when idle.

## License

MIT
