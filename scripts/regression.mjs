// Three focused checks cover the migration boundaries; UI interaction is checked in the real host.
import { build } from 'esbuild';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = await mkdtemp(join(tmpdir(), 'dsh-dashboard-check-'));
try {
  const result = await build({
    stdin: { contents: `
import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { deriveMetrics, requestSeries, compactionEffect, modelSplit } from './src/client/metrics';
import { foldBoard } from './src/board/fold';
import { EMPTY_BOARD } from './src/board/types';
import { subagentEntriesOf } from './src/client/board';
import { DashboardView } from './src/client/DashboardView';
import { HudStrip } from './src/client/HudStrip';
import { zh, en } from './src/client/locales';

const request = (seq, extra = {}) => ({
  startSeq: seq, resultSeq: seq + 1, turn: 1, step: seq, purpose: 'assistant', status: 'complete',
  startedAt: 1000, completedAt: 2000, requestConfig: { provider: 'deepseek-official', model: 'deepseek-v4-flash', thinking: 'enabled' },
  usage: { inputTokens: 1000, cacheReadTokens: 2000, cacheWriteTokens: 0, outputTokens: 100 }, ...extra,
});
const rows = [request(1), request(3, { purpose: 'compaction' }), request(5),
  request(7, { status: 'error', error: 'rate limit', usage: undefined }),
  request(9, { status: 'running', completedAt: null, usage: undefined })];
const input = { running: false, snapshot: { turnTimings: new Map() }, nodes: [], requests: rows,
 tokenUsage: undefined, stats: undefined, context: undefined, pressure: undefined };

test('published request records preserve usage, missing costs and compaction boundaries', () => {
  const { series, details } = requestSeries(rows, new Map());
  assert.equal(series.find(s => s.seq === 1).inputTokens, 3000);
  assert.equal(details[0].thinking, true);
  assert.equal(series.find(s => s.seq === 9).costUsd, null);
  assert.equal(requestSeries([request(13, { usage: {} })], new Map()).series[0].costUsd, null);
  assert.equal(compactionEffect(series).length, 1);
  assert.equal(compactionEffect(series)[0].seq, 3);
  const metrics = deriveMetrics(input, 5000);
  assert.deepEqual([metrics.requestCount, metrics.completedRequests, metrics.failedRequests, metrics.runningRequests], [5, 3, 1, 1]);
  assert.equal(metrics.costEstimateUsd.total, null);
  assert.equal(metrics.costEstimateUsd.unpricedRequests, 2);
  const thirdParty = requestSeries([request(11, { requestConfig: { provider: 'proxy', model: 'deepseek-v4-flash' } })], new Map()).series;
  assert.equal(thirdParty[0].costUsd, null);
  assert.equal(modelSplit([...series, ...thirdParty], new Map()).length, 2);
});

test('board fold and current Session catalog keep direct children unique', () => {
  const event = { type: 'schedule/change', data: { version: 1, operation: 'create', schedule: { id: 's1', scheduledAt: '2026-10-26T10:00:00Z', kind: 'at' } } };
  const state = foldBoard(foldBoard(EMPTY_BOARD, event), event);
  assert.equal(state.schedule.length, 1);
  assert.equal(foldBoard(state, { type: 'unrelated', data: {} }), state);
  const children = subagentEntriesOf({ byId: { a: { id: 'a', parentId: 'p', origin: 'subagent', running: true }, b: { id: 'b', parentId: 'other', origin: 'subagent' }, c: { id: 'c', parentId: 'p', origin: 'fork' } } }, 'p');
  assert.deepEqual(children.map(row => row.id), ['a']);
  assert.equal(children[0].activity, 'running');
});

test('direct dashboard entry subscribes to requests and renders absent projections safely', () => {
  let subscriptions = 0;
  const props = { sessionId: 'test', t: key => zh[key], openView() {}, openSubagent() {},
    useSession: select => select({ running: false, hasMore: false }),
    useConversation: select => select({ views: { get: () => undefined } }),
    useTrajectory: select => { subscriptions += 1; return select({ requests: rows, eventNodes: [] }); },
    useProjection: () => undefined, useSessions: select => select({ byId: {} }) };
  const markup = renderToStaticMarkup(<DashboardView {...props} />);
  assert.equal(subscriptions, 1);
  assert.match(markup, /dshd-heroValue[^>]*>5</);
  assert.equal((markup.match(/class="dshd-primaryMetric"/g) ?? []).length, 1);
  assert.ok(!markup.includes('dshd-summary'));
  assert.ok(!markup.includes('<table'));
  renderToStaticMarkup(<DashboardView {...props} useSession={select => select({ running: true })} />);
  renderToStaticMarkup(<DashboardView {...props} useTrajectory={select => select({ requests: [] })} />);
  renderToStaticMarkup(<HudStrip t={props.t} data={{ running: true, goal: undefined, currentTool: null, inProgressTodos: 0, runningWorkflow: 0, runningSubagents: 0, nextSchedule: null, nextScheduleOverdue: false }} />);
  assert.deepEqual(Object.keys(zh).sort(), Object.keys(en).sort());
});
`, resolveDir: process.cwd(), loader: 'tsx' },
    bundle: true, write: false, platform: 'node', format: 'esm', jsx: 'automatic',
    plugins: [{ name: 'host-ui-seats', setup(builder) {
      builder.onResolve({ filter: /^@deepseek-ai\/dsh-client-ui-primitives$/ }, () => ({ path: 'primitives', namespace: 'test' }));
      builder.onLoad({ filter: /.*/, namespace: 'test' }, () => ({ contents: `
        export function Tooltip({children}) { return children; }
        export function IconChevronDownOutlineMedium() { return null; }
        export function IconChevronRightOutlineMedium() { return null; }
      ` }));
    } }],
  });
  const file = join(dir, 'checks.mjs');
  // React's server renderer uses dynamic Node requires in the bundled CJS adapter.
  await writeFile(file, "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);\n" + result.outputFiles[0].text);
  await import(pathToFileURL(file).href);
} finally {
  await rm(dir, { recursive: true, force: true });
}
