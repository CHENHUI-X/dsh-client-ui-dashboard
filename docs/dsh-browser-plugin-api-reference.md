# DSH 浏览器端插件 API 参考报告(面向 conversation.view 实时指标看板插件)

> 所有路径基于安装目录 `node_modules/@deepseek-ai/<pkg>/lib/...`。
> 行号均指对应文件(`.d.ts` 或打包产物 `client.js`)中的实际行号,可直接定位。
> 结论先行:**会话数据在客户端只有三种权威读法** ——
> ① `useSession(selector)`(会话快照)、② `useProjection(key)`(host 计算的投影值)、③ `ctx.conversationEvents.register(definition)`(订阅原始会话事件流)。
> 不存在 `session.projection()` 方法;真实 API 是 `session.projections.faceOf(key)`(见 Q1)。
> 不存在 host 端的 "trajectory" 投影键:trajectory 是纯客户端 view(见 Q2)。

---

## 0. 核心机制速览(先看这个)

```
Host(计算投影: sessionStats / tokenUsage / contextPressure / contextBreakdown / title / todos / ...)
   │  session/projection push frames (更高 seq 赢) + history 尾页 projections block
   ▼
dsh-client-runtime  ProjectionValueStore(每会话一个)  ──►  useProjection(key)  (标准 hook)
   │
   │  mux 流 session/event (原始 SessionEvent)
   ▼
ConversationEventRegistry (ctx.conversationEvents.register)  ──►  业务状态机 ──► ConversationViewBuilder
   │                                                                      │
   ▼                                                                      ▼
Session 维护事件窗口 → ConversationSnapshot(useSession 读)   views.get("trajectory"|"chat")
```

- **投影 (projection)**:host 是唯一计算端,客户端只存 `key → {value, seq}` 的整值表,规则是"seq 大的赢"。key 不存在时读 `undefined`。
- **视图 (view)**:由客户端业务 Definition 从事件流增量组装成快照,挂在 `snapshot.views` 上(`ConversationViewSnapshotStore`),按 target 名取(`"trajectory"`、`"chat"`)。
- 新插件写一个 conversation.view tab 的标准套路 = 照抄 `dsh-client-ui-trajectory`(见附录 A)。

---

## Q1. 客户端如何订阅/读取当前会话的数据

### 1.1 `useProjection` hook 签名

`dsh-client-runtime/lib/types/client/sessions/projection-store.d.ts:23-26`

```ts
export type UseProjection = {
    <K extends Extract<keyof SessionProjectionMap, string>>(key: K): SessionProjectionMap[K] | undefined;
    <K extends Extract<keyof SessionProjectionMap, string>, S>(key: K, selector: (value: SessionProjectionMap[K] | undefined) => S, eq?: (a: S, b: S) => boolean): S;
};
```

- 第一个重载:按 key 读整值;`undefined` 统一表示"能力缺失"(host 单元未挂载,或尚无 baseline/frame 携带该 key)。
- 第二个重载:带 selector + 可选浅比较,类似 `useSession` 的按 key 订阅(引用稳定:某 key 的值引用只在 frame/baseline 落地时改变)。

### 1.2 `session.projection()` / `projections()` 的真实 API

`Session` 类上没有 `projection()`/`projections()` 方法。真实 API 是 **`session.projections.faceOf(key)`**。

- 契约面:`dsh-client-runtime/lib/types/client/contract/session.d.ts:16-24`

```ts
/** Key-addressed projection read face (the useProjection resolution path; see ProjectionValueStore). */
export interface ProjectionsFace {
    faceOf(key: string): ObservableSnapshot<unknown>;
}
```

- `Session` 类上的具体实现字段:`dsh-client-runtime/lib/types/client/sessions/session.d.ts:102` —— `readonly projections: ProjectionValueStore;`
- `ISession` 契约(行为动词):`contract/session.d.ts:26-90` —— `sessionId`、`projections`、`prompt(content, 'queue'|'steer')`、`readAttachment`、`updateQueue(itemId, action)`、`cancel()`、`rename(title)`、`loadOlder()`、`command(line)`。
- 完整对外脸:`contract/session.d.ts:96` `export type SessionFace = ISession & ObservableSnapshot<ConversationSnapshot>;`(即 Session 本身就是一个快照源)。

### 1.3 `ProjectionsBaseline` 与 `ProjectionValueStore`

`projection-store.d.ts:33-38`(baseline,与线上 `SessionProjectionsBlock` 结构一致):

```ts
export interface ProjectionsBaseline {
    /** The consistent-cut seq (equals the window tail seq by construction). */
    asOfSeq: number;
    /** Whole current values by key; a registered key absent here means the capability is absent. */
    values: Partial<SessionProjectionMap>;
}
```

`ProjectionValueStore`(projection-store.d.ts:49-110)公开成员:

```ts
export declare class ProjectionValueStore {
    faceOf(key: string): ObservableSnapshot<unknown>;          // key 的裸可观察面(useProjection 解析路径;恒存在,缺值是 undefined 快照)
    get(key: string): unknown;                                  // 当前整值(擦除类型读法)
    values(): Readonly<Partial<SessionProjectionMap>>;          // 全部当前值,引用稳定直到某行变化
    subscribeAny(listener: () => void): () => void;             // 任意 key 变化订阅(microtask 批量),返回取消函数
    apply(key: string, value: unknown, seq: number): void;      // 落地一条 session/projection push frame
    seed(baseline: ProjectionsBaseline): void;                  // 用尾页 projections block 播种
    truncate(lastSeq: number): void;                            // 丢弃超出 mux 代基线的行
}
```

### 1.4 会话快照 `session.getSnapshot()` 与 `views` 键

`Session.getSnapshot(): ConversationSnapshot`(sessions/session.d.ts:207)。快照类型 `ConversationSnapshot`(sessions/conversation.d.ts:367-417,详见 Q4)。

`views` 字段:`views: ConversationViewSnapshotStore`(conversation.d.ts:370)。读取:`snapshot.views.get(target)`。目标键来自声明合并表 `ConversationViewSnapshotMap`(contract/conversation.d.ts:103-109):

```ts
export interface ConversationViewSnapshotStore {
    /** @param target - registered view target. @returns its current snapshot. */
    get<Target extends Extract<keyof ConversationViewSnapshotMap, string>>(target: Target): ConversationViewSnapshotMap[Target] | undefined;
}
```

当前已注册的目标:
- `"chat"` —— `ChatSnapshot`(conversation.d.ts:355-361,ui-conversation 的 `chatViewDefinition` 注册,client.js:7854)
- `"trajectory"` —— `TrajectorySnapshot`(ui-trajectory `trajectory-contract.d.ts:58-63` 声明合并,`trajectoryViewDefinition` 注册,client.js:852-863)

### 1.5 订阅投影/快照变更

| 目标 | 方式 | 取消 |
|---|---|---|
| 会话快照 | `session.subscribe(fn: () => void): () => void`(sessions/session.d.ts:202)或 React 侧 `useSession(sel, eq?)` | 返回的取消函数 |
| 单 key 投影 | `useProjection(key[, sel, eq])`;裸读 `session.projections.faceOf(key)` 再 `getSnapshot()/subscribe()` | 同上 |
| 任意投影 | `store.subscribeAny(fn)` | 同上 |

`useSession` 的类型(`SnapshotSelectorHook`):`dsh-client-ui-slots/lib/types/store.d.ts:7`

```ts
export type SnapshotSelectorHook<T> = <S>(sel: (s: T) => S, eq?: (a: S, b: S) => boolean) => S;
```

### 1.6 `ctx.sessions.binding(sessionId)` 与 `SessionBinding`

`ISessions.binding(id): SessionBinding | undefined`(contract/sessions.d.ts:126;undefined = 会话既不在列表也没有已建 scope)。

`SessionBinding` 定义:`sessions/service.d.ts:109-114`

```ts
/** Session assembly handle for SessionProvider/inject factories (identity-stable per session). */
export interface SessionBinding {
    readonly sessionId: SessionId;
    /** The outward session face only — feature code never sees the concrete class. */
    readonly session: SessionFace;
    readonly ctx: AgentContext;
}
```

- `binding.session` 即 `SessionFace`(行为动词 + 快照源,见 1.2)。
- `binding.ctx` 是带 agent 标签的 cordis 上下文(`AgentContext` = `Omit<Context,'remote'> & { remote: ... }`,agents/scope.d.ts:5-7),插件内部事件可用 `actx.on(...)` 订阅(见 Q5)。
- 用途范例:ui-trajectory 在 `slots.register` 的 `inject` 里 `const session = ctx.sessions.binding(sessionId)?.session;`(client.js:7347)。

### 1.7 标准 props(`SessionStandardProps`)

`dsh-client-runtime/lib/types/client/index.d.ts:64-90` 声明合并(ui-slots 声明空席位,运行时合并真实成员):

```ts
interface SessionStandardProps {
    useSession: SnapshotSelectorHook<ConversationSnapshot>;
    /** The framework-resolved session id (owners never pass it). */
    sessionId: SessionId;
    /** The fifth framework hook seat: key-addressed projection reader (undefined = capability absent). */
    useProjection: UseProjection;
}
interface SessionMaybeStandardProps {   // 当前会话可能不存在的 slot
    useSession: MaybeSnapshotSelectorHook<ConversationSnapshot>;
    sessionId: SessionId | undefined;
    useProjection: UseProjection;
}
interface GlobalStandardProps {          // 每个 slot 组件都有
    useSessions: SnapshotSelectorHook<SessionListState>;
    useWorkspaces: SnapshotSelectorHook<WorkspaceListState>;
}
```

会话列表状态 `SessionListState`(sessions/service.d.ts:67-85):`ids`、`byId: Record<SessionId, SessionSummary>`、`current: SessionId | undefined`、`phase`、`subagentsByParent`、`jobsBySession`、`currentAddress`。`SessionSummary`(service.d.ts:30-61):`id/title/displayTitle/cwd/agentPreset/parentId/origin/running/pendingInteraction/completed/blank/updatedAt/projectionValues`。

另外运行时还提供了标准注册渠道 `ctx.sessions.provide(descriptor)`(contract/sessions.d.ts:101,`SessionProvideDescriptor` service.d.ts:139-146),为会话 scope 贡献自定义 `use<Name>` hook 与 props —— 新插件一般不必要,用 `useSession`/`useProjection` 即可。

---

## Q2. trajectory 的记录结构

### 2.1 关键事实:trajectory 不是投影,是客户端 view

全仓搜索无 `key: "trajectory"` 的 `ProjectionDefinition`。trajectory 由 **ui-trajectory 插件在客户端**从事件流组装:

1. 若干 `ConversationNodeDefinition` 注册进 `ctx.conversationEvents`(assistant/tool/message/compaction/request-header/session-end/turn-end,见 client.js:303-1110);
2. 一个 `ConversationViewDefinition`(target `"trajectory"`)注册进 `ctx.conversationViews`(client.js:852-863),`TrajectorySnapshotBuilder` 把贡献节点折叠成 `TrajectorySnapshot`;
3. 视图组件通过 `useSession((s) => s.views.get("trajectory") ?? EMPTY_TRAJECTORY_SNAPSHOT)` 读取(client.js:7020)。

### 2.2 顶层结构 `TrajectorySnapshot`

`dsh-client-ui-trajectory/lib/types/client/trajectory-contract.d.ts:50-57`:

```ts
/** Stage-oriented Trajectory data assembled from registered business Contexts. */
export interface TrajectorySnapshot {
    readonly eventNodes: readonly ConversationNode[];      // 事件节点(含 assistant/user/context/tool-result/compaction 等)
    readonly eventLocations: ReadonlyMap<number, ConversationLocation>;  // seq → 引擎位置
    readonly requests: readonly RequestView[];             // 请求生命周期视图(assistant/compaction)
    readonly callSchemas: ReadonlyMap<string, ConversationPromptSnapshot['tools'][number]>;  // callId → 工具 schema
    readonly partial: PartialAssistant | null;             // 进行中的 assistant 输出
    readonly runningCalls: readonly RunningToolCall[];     // 未落 result 的 tool/call
}
```

`RequestView`(`dsh-client-runtime/lib/types/client/sessions/request-inspection.d.ts:25-68`):

```ts
interface RequestViewBase {
    startSeq: number;             // 打开该操作的事件 seq
    startedAt: number;            // 起始时间戳(epoch ms)
    completedAt: number | null;
    status: 'running' | 'complete' | 'error';
    error?: string;
    provenance?: AssistantProvenanceView;   // { provider, model }
    requestConfig?: AssistantRequestConfig; // { provider, model, purpose?, thinking?, reasoningEffort?, temperature?, maxTokens?, stop? }
    usage?: unknown;                        // 实际是 TokenUsage(见 2.4)
    resultSeq?: number;                     // assistant/message 或 compaction summary 的 seq
}
interface AssistantRequestView extends RequestViewBase { purpose: 'assistant'; turn; step; prompt?; promptChange?; retry?; maxRetries?; retryDelayMs?; }
interface CompactionRequestView extends RequestViewBase { purpose: 'compaction'; turn: number | null; step: 0; replacementSeq?; summary?; rawOutput?; }
export type RequestView = AssistantRequestView | CompactionRequestView;
```

### 2.3 记录(record)种类与字段 —— `TrajectoryCellProps`

`dsh-client-ui-trajectory/lib/types/client/trajectory-record.d.ts:5,25-86`。record 是 layout 折叠的产物(不是 view 节点本身),7 种 kind:

```ts
export type TrajectoryCellKind = 'system' | 'user' | 'context' | 'compacted' | 'message' | 'tool' | 'subtool';
```

每个 record 的字段(`TrajectoryCellProps`,继承 `HTMLAttributes<HTMLDivElement>`):

```ts
export interface TrajectoryCellProps extends HTMLAttributes<HTMLDivElement> {
    index: number;                        // 1-based record 序号(显示为 #N)
    recordId?: string;                    // 无单一源事件时的投影稳定身份(如 `assistant\0{turn}\0{step}`)
    kind: TrajectoryCellKind;
    text: string;                         // 非 Markdown 摘要/前缀
    previewMarkdown?: string;             // 原始 Markdown(单行摘要)
    opensTurn?: boolean;                  // 该 user record 是否开启新 turn
    sourceSeq?: number;                   // 源会话事件 seq(跨记录导航)
    messageSource?: unknown;              // user-role 消息/context 注入的 producer
    requestOnly?: boolean;                // 仅请求锚点、无可视记录的辅助请求
    inputDetail?: string;                 // 请求/消息完整内容(details 面板)
    promptDetail?: ConversationPromptSnapshot;      // SYSTEM record: 完整 system-prompt/tool-catalog
    previousPromptDetail?: ConversationPromptSnapshot;
    outputDetail?: string;                // assistant/tool result 完整内容
    thinkingDetail?: string;              // assistant reasoning 完整内容
    sourceBlocks?: readonly TrajectorySourceBlock[];  // 原始消息 blocks(源顺序)
    outputBlocks?: readonly TrajectorySourceBlock[];
    schemaDetail?: string;                // call 时的工具 schema
    assistantMetrics?: AssistantMetricDetail;  // TTFT/decode 所需事实(见下)
    result?: string;                      // tool-only: 结果摘要
    resultPreviewMarkdown?: string;
    callId?: string;
    isError?: boolean;
    timeSeconds: number | null;           // 自身耗时(秒);null = 未知
    startedAt?: number | null;            // 实际操作开始 epoch ms
    input?: number;                       // 消息级 prompt token
    cacheRead?: number;                   // 命中缓存输入 token
    cacheWrite?: number;                  // 写入缓存输入 token
    output?: number;                      // completion token
    think?: number;                       // reasoning token
    selected?: boolean;
}
```

`AssistantMetricDetail`(trajectory-record.d.ts:7-14):

```ts
export interface AssistantMetricDetail {
    timingRecorded: boolean;
    stepStartTime: number | null;
    firstTokenTime: number | null;
    completedTime: number | null;
    usageProvided: boolean;
    outputTokens: number | null;
}
```

### 2.4 各种 record 的来源与耗时/token 字段

layout 折叠(`deriveTrajectoryLayout`,client.js:6089-6395)从 `TrajectoryLayoutInput`(layout.d.ts:19-26:`nodes` + `eventLocations` + `partial` + `runningCalls` + `requests` + `callSchemas`)生成 `TrajectoryTurnModel[]`(turn → Message/Step 组 → cells)。各 kind 的关键映射:

| record kind | 来源 | 耗时字段 | token 字段 |
|---|---|---|---|
| `user` | `UserMessageNode`(source.kind==='user')(client.js:6259-6271) | `timeSeconds: 0`, `startedAt: node.time` | 无 |
| `context` | `ContextMessageNode`(source.kind!=='user')(client.js:6297-6308) | `timeSeconds: 0` | 无 |
| `message`(assistant) | `AssistantMessageNode`(client.js:6510-6577) | `timeSeconds = (node.time - (node.timing?.stepStartTime ?? prevAbsTime))/1000`;`startedAt = node.timing?.stepStartTime` | `attachUsage`: `input=cacheRead=cacheWrite=output=think=`(来自 `usage`) |
| `tool` / `subtool` | `ToolResultNode` / `RunningToolCall`(client.js:6313-6344, 6361-6384;subcall 6761+) | `timeSeconds = durationSeconds(node.time, node.callTime)`(tool/result.time − tool/call.time) | 无 |
| `system` | `RequestPromptChange`(request/header 事件;client.js:6207-6224) | `timeSeconds: 0` | 无 |
| `compacted` | `CompactionRequestView`(client.js:6225-6257) | `timeSeconds = durationSeconds(request.completedAt, request.startedAt)` | `attachUsage(cell, request.usage)` |
| `request`(仅请求锚点) | 无节点的 assistant RequestView(client.js:6189-6206) | `timeSeconds = durationSeconds(request.completedAt, request.startedAt)` | 无 |

`usage` 的最终形状 = `TokenUsage`(`dsh-llm/lib/types/types.d.ts:123-129`,assistant/message 事件携带):

```ts
export interface TokenUsage {
    inputTokens: number;          // 仅未缓存输入(与缓存字段互斥)
    outputTokens: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    reasoningTokens?: number;     // 已计入 outputTokens,不重复累加
}
```

`attachUsage` 映射(client.js:6714-6721):`inputTokens→cell.input`、`cacheReadTokens→cell.cacheRead`、`cacheWriteTokens→cell.cacheWrite`、`outputTokens→cell.output`、`reasoningTokens→cell.think`。

`AssistantMessageNode.timing`(Q4 详述)在 `finalNode` 里构造(client.js:241-277):

```js
timing: { stepStartTime: state.started ? state.startTime : null,
          firstTokenTime: state.firstTokenTime ?? null,
          completedTime: event.time }
```

另外 ui-trajectory 的 `TrajectoryView` 里还有 `requestNumbers` 折叠(client.js:7031-7104),为每个 Step/Compaction 生成 `{seq, turn, step, number, status, startedAt, completedAt, error, retry, maxRetries, retryDelayMs, provider, model, requestConfig, usage, cumulativeUsage}` —— **累计 usage(cumulativeUsage)是现成的"当前会话累计 token"数据源**。

---

## Q3. sessionStats 投影

### 3.1 类型定义

`dsh-session-stats/lib/types/types.d.ts:18-41`(声明合并进 `SessionProjectionMap` 的键 `sessionStats`):

```ts
export interface SessionStatsProjection {
    /** Distinct turns carrying at least one closed step (`step/end`); rejected or empty turns are uncounted. */
    turns: number;
    /** Closed steps (`step/end` events) — completed, failed, and cancelled steps alike. */
    steps: number;
    /** Summed model wall time (`step/start` → `assistant/message`) over steps that assembled a message. */
    llmMs: number;
    /** Summed tool wall time over `tool/call` → `tool/result` pairs matched by callId. */
    toolMs: number;
    /** Summed first-token latency (`step/start` → first non-empty delta chunk) over `ttftSteps`. */
    ttftMs: number;
    /** Steps carrying a recorded first token. */
    ttftSteps: number;
    /** Summed decode wall time (first token → `assistant/message`) over steps that also report output tokens. */
    decodeMs: number;
    /** Summed provider output tokens over the same decode-timed steps. */
    decodeTokens: number;
}
```

schema(zod,严格对象,index.js:28-37)与上述字段一一对应,全部非负。

### 3.2 折叠逻辑(host 端,`dsh-session-stats/lib/index.js`)

`apply(state, event)`(index.js:66-139)监听的事件与规则:

| 事件 | 动作 |
|---|---|
| `step/start` | 记录 `openStep = {turn, step, startTime, firstTokenTime: null}` |
| `assistant/chunk` | 若属于当前 openStep 且 `isTokenDelta(chunk)` 且尚无首 token → 打上 `firstTokenTime = event.time` |
| `assistant/message` | `llmMs += max(0, event.time - openStep.startTime)`;若有首 token:`ttftMs += max(0, firstToken - start)`、`ttftSteps += 1`;若 `usage.outputTokens` 合法:`decodeMs += max(0, event.time - firstToken)`、`decodeTokens += outputTokens`;清空 openStep |
| `tool/call` | `pendingCalls[callId] = event.time` |
| `tool/result` | 按 `message.source.callId` 配对:`toolMs += max(0, event.time - dispatched)` |
| `step/end` | `turns`(换 turn 才 +1)、`steps += 1`、`lastTurn` 更新、清 openStep |
| `turn/end` | 清空残余 pendingCalls |

`view(state)`(index.js:140-149)只导出 8 个对外字段。插件注册:`apply(ctx){ ctx.sessionProjections.register(sessionStatsProjectionDefinition); }`(index.js:173-175),`inject: ["sessionProjections"]`。

### 3.3 StatsLine 如何消费(ui-conversation 底部统计条)

组件:`dsh-client-ui-conversation/lib/client.js:2810-2871`。它注册在 `conversation.composer.dock` list slot(id `"stats"`,order 0,client.js:9762-9767)。

```js
const StatsLine = memo(function StatsLine({ useSession, useProjection, t }) {
    const settledNodes = useSession((s) => s.chat.legacy.nodes);
    const usage = useProjection("tokenUsage");
    const projected = useProjection("sessionStats");
    const stats = useMemo(() => projected ?? deriveStats(settledNodes), [projected, settledNodes]);
    // 展示: t("stats.counts", {turns, steps})
    //       llmMs>0  → t("stats.llm", {duration: formatDuration(llmMs)})
    //       toolMs>0 → t("stats.toolCall", ...)
    //       ttftSteps>0 → t("stats.ttftAverage", {duration: ttftMs/ttftSteps})
    //       decodeMs>0  → t("stats.tokensPerSecond", {throughput: decodeTokens/(decodeMs/1000)})
    //       usage 存在时: cacheHitPercent = round(cacheReadTokens / billedInputTokens * 100)
    //                    t("stats.cacheHit", {percent}) ; t("stats.tokens", {input, output})
    // 组间以 " | " 连接;group 为空返回 null
});
```

关键辅助(同文件):
- `deriveStats(nodes)`(2711-2749):**窗口级回退折叠**(无投影时的 fallback,字段名与投影完全一致以便整体替换);
- `cacheHitPercent(usage)`(2777-2780):`round(usage.cacheReadTokens / billedInputTokens * 100)`;`billedInputTokens(usage)`(2786-2788):`uncachedInputTokens + cacheReadTokens + cacheWriteTokens`;
- `contextOccupancy(pressure)`(2801-2809):`usedTokens = pressure?.projectedTokens ?? pressure?.pressureTokens`;`percent = min(100, round(usedTokens / contextWindow * 100))`;
- `formatTokens`(2755-2760,`517 / 12.2K / 517K / 1.2M`)、`formatDuration`(2766-2771,`45.2s` / `2m42s`)。

**结论:新插件的指标看板可以直接复用 `useProjection("sessionStats")` + `useProjection("tokenUsage")`,并照抄上述 format/cacheHit 逻辑。**

---

## Q4. conversation 快照中的消息节点

`dsh-client-runtime/lib/types/client/sessions/conversation.d.ts`。节点联合:

```ts
// conversation.d.ts:260
export type ConversationNode = UserMessageNode | AssistantMessageNode | SteeringMessageNode | ContextMessageNode
    | ModelRetryNode | TurnErrorNode | TurnMaxTokensNode | ToolResultNode | CommandNode | CompactionSummaryNode | UnknownSurfaceNode;
```

### 4.1 各节点字段

**UserMessageNode**(61-68):

```ts
export interface UserMessageNode {
    kind: 'user';
    seq: number;
    time: number;                       // Unix epoch ms(源会话事件)
    content: readonly ContentBlock[];   // 原始模型面 blocks
    source: unknown;                    // MessageSource(见下)
}
```

**AssistantMessageNode**(79-101)+ **AssistantTiming**(70-77):

```ts
export interface AssistantTiming {
    stepStartTime: number | null;   // 匹配的 step/start 时间戳;窗口外为 null
    firstTokenTime: number | null;  // 首个非空 text/reasoning/tool delta 时间戳;无记录为 null
    completedTime: number;          // 最终 assistant/message 时间戳
}
export interface AssistantMessageNode {
    kind: 'assistant';
    seq: number;
    messageId?: MessageId;          // 最终确定输出的稳定身份;中断冻结的 partial 无此字段
    time: number;
    turn: number;
    step: number;
    blocks: readonly AssistantBlock[];       // text/reasoning/image/tool-call/other 分类
    usage?: unknown;                          // 即 TokenUsage(inputTokens/outputTokens/cacheReadTokens?/cacheWriteTokens?/reasoningTokens?)
    provenance?: AssistantProvenanceView;     // { provider, model }
    requestConfig?: AssistantRequestConfig;   // { provider, model, purpose?, thinking?, reasoningEffort?, temperature?, maxTokens?, stop? }
    timing?: AssistantTiming;
    interrupted?: true;                       // 中止 turn 的冻结 partial(合成分数 seq = turn/end seq - 0.9)
}
```

**SteeringMessageNode**(103-112):`kind:'steering'`、`messageId: MessageId`、`seq/time/content/source`。

**ContextMessageNode**(114-125):

```ts
export interface ContextMessageNode {
    kind: 'context';
    seq: number; time: number;
    content: readonly ContentBlock[];
    source: unknown;
    provenance: ContextProvenanceView;   // 角色与 producer 名(由 source 投影)
    form: KnownContextForm | null;       // producer 声明的信息形式(instructions/catalog/snapshot/notice/relay/recall)
}
```

**ToolResultNode**(161-187):

```ts
export interface ToolResultNode {
    kind: 'tool-result';
    seq: number; time: number;                     // tool/result 事件时间
    callId: string;
    call: { name: string; argsRaw: string } | null; // 窗口内回填的调用头;窗口截断为 null
    callTime: number | null;                        // 配对 tool/call 的时间(用于调用行耗时)
    content: readonly ContentBlock[];
    isError: boolean;
    error?: { name: string; code: string };
    meta?: unknown;
    callView: ToolCallView | null;                  // host 计算的渲染意图
    resultView: ToolResultView | null;
    subCalls: readonly ToolCallBlock[];             // 该调用派生的子调用(dispatch 序)
}
```

**CompactionSummaryNode**(195-210):`kind:'compaction'`、`seq`(替换 user/message 的 seq)、`time`、`summary: string | null`、`summaryEventSeq: number | null`、`shadowedItemCount: number | null`、`shadowedTokenCount: number | null`。

**其他**:`ModelRetryNode`(127-137,`LlmRetryEventData & {kind:'model-retry', seq, time, retryState:'scheduled'|'started'|'cancelled'}`)、`TurnErrorNode`(139-149)、`TurnMaxTokensNode`(151-159)、`CommandNode`(236-258)、`UnknownSurfaceNode`(219-226)。

**运行中状态**:
- `PartialAssistant`(291-295):`{ turn, step, blocks: readonly AssistantBlock[] }`;
- `RunningToolCall`(262-274):`{ callId, name, argsRaw, turn, step, time, callView, subCalls }`;
- `QueuedMessage`(278-289):`{ id, messageId, placement: 'queued'|'steering'|'context', content, preview, text: string | null }`。

### 4.2 `ConversationSnapshot` 顶层(367-417)

```ts
export interface ConversationSnapshot {
    sessionId: SessionId;
    views: ConversationViewSnapshotStore;   // target → 快照(trajectory/chat)
    chat: ChatSnapshot;                     // 最终 Chat 目标
    nodes: readonly ConversationNode[];     // 顶层兼容字段(镜像 chat.legacy.nodes)
    turnTimings: ReadonlyMap<number, { readonly startTime: number; readonly endTime?: number }>;
    turnEnds: ReadonlyMap<number, number>;  // 完成的 turn 号 → turn/end 事件 seq
    partial: PartialAssistant | null;
    runningCalls: readonly RunningToolCall[];
    pending: readonly PendingInteraction[];
    queue: readonly QueuedMessage[];
    running: boolean;
    subagent: { address: SubagentAddress; parentAvailable: boolean } | null;
    composerPhase: ComposerPhase;           // 'blank' | 'engaging' | 'active'
    removed: boolean;
    openState: OpenState;                   // 'cold' | 'loading' | 'open' | 'error'
    openError: RpcError | null;
    hasMore: boolean;
    loadingOlder: boolean;
    promptError: PromptError | null;
    blank: boolean;
    lastAgentError: string | null;
}
```

`ChatSnapshot`(355-361):`order: readonly string[]`、`nodes: ChatNodeStore`(get(key)/values())、`locations: ChatLocationNodeIndex`(getTurn/getStep)、`timeline: ConversationTimelineSnapshot`(turnOrder + turns Map)、`legacy: LegacyConversationSlice`(344-353:`nodes/turnTimings/turnEnds/partial/runningCalls`)。

### 4.3 节点上的 token/耗时统计建议

- 每轮 token:对 `nodes` 里 `kind==='assistant'` 的 `node.usage`(TokenUsage)求和;`usage` 缺省表示该步无上报。
- 系统/工具占比:`ContextBreakdownProjection`(Q6)或自算 `kind==='context'` 节点数、`tool-result` 节点数。
- 单步耗时:`node.timing.completedTime - node.timing.stepStartTime`(llm)、`toolResult.time - toolResult.callTime`(tool)。
- 首 token 延迟:`node.timing.firstTokenTime - node.timing.stepStartTime`。
- 注意:窗口是分页的(每页 50 条,`PAGE_MESSAGES`,sessions/session.d.ts:11),节点数会随翻页变化;**全量统计请用投影**(`sessionStats`/`tokenUsage`),快照节点统计只回答"当前窗口"。

---

## Q5. 实时事件订阅

### 5.1 `ctx.conversationEvents` —— `ConversationEventRegistry`

运行时注入:`index.d.ts:111` `conversationEvents: ConversationEventRegistry`。类型:`conversation/event-registry.d.ts:5-26`:

```ts
export declare class ConversationEventRegistry extends ConversationDefinitionRegistry<ConversationNodeDefinition> {
    register(definition: ConversationNodeDefinition): () => void;        // 幂等 disposer
    registerFallback(definition: ConversationNodeDefinition): () => void; // 唯一 fallback(无普通 Definition 匹配时)
    fallbackEntry(): ConversationNodeDefinition | undefined;
}
```

Definition 契约(`contract/conversation.d.ts:151-200`,`ConversationNodeDefinition<State>`):

```ts
export interface ConversationNodeDefinition<State = unknown> {
    readonly kind: string;                 // 唯一业务名
    readonly target?: string;              // 目标 view(target 与 buildViewNode 必须成对)
    match(event: SessionEvent): ConversationMatchResult | null;   // { id, role: 'start' | 'update' } | null
    start(context: ConversationNodeContext<State>, match: ConversationMatch, reader: ConversationContextReader): State;
    update(context: ConversationNodeContext<State> & { state: State }, match: ConversationMatch): State;
    publication?(match: ConversationMatch): ConversationPublication;  // 'none' | 'animation-frame' | 'immediate'
    buildLocationData?(context, scope: 'step' | 'turn'): ConversationLocationData | null;
    buildViewNode?(context: ConversationNodeContext<State>): ConversationViewNode | null;
}
```

引擎还提供 `ConversationLocation`(turn/step/session 层级,含 `TurnLocation.steps`、`StepLocation.start/end/status`、`Location.data` 业务值读取)、`ConversationContextReader.previous(kind)` 向前查找、`conversationContextKey(kind, id)` 键构造(`contract/conversation.d.ts:56-240`)。

### 5.2 `ctx.on(...)` 能订阅什么

**要点:原始会话事件(assistant/message、step/end 等)不会以 `ctx.on("assistant/message")` 形式广播到根 ctx**。客户端运行时只发射这些根级事件:

- `'slots/changed'(key: string)`(index.d.ts:93-101)
- `'connection/reset'()`(index.d.ts:106)
- `'locale/change'(snapshot: LocaleSnapshot)`(dsh-client-locale client/index.d.ts:48-58)

会话事件进入客户端的唯一通道是 **mux 流帧**,由 `SessionManager`/`Session` 内部消化(运行时 client.js:7466-7475 的 `handleMuxEnvelope` 按 `frame.type` 分发),**不对插件开放为事件**。插件的实时通道 = `conversationEvents.register(definition)`(推荐)+ `useSession`/`useProjection` 重渲染。

另外两条:
- **host 转发事件**:`ctx.remote.$on(...)` 订阅(帧 `host/remote-event`,dsh-host-apiproxy events.d.ts:205-212)。白名单 = `API_REMOTE_FORWARDED_EVENTS`(dsh-api-remotes remote-events.d.ts:16):`agent-preset/selected`、`commands/change`、`credentials/updated`、`cordis/request-run`、`cordis/request-run-resolved`、`cordis/dynamic-package`、`cordis/dynamic-retract`、`cordis/inspect-query`、`cordis/inspect-query-resolved`、`llm/adapters-updated`、`settings/document-updated`。
- **agent scope 事件**:`SessionBinding.ctx`(`AgentContext`)是带 agent 标签的上下文,插件可 `actx.on('slash/input-begin-command', ...)` 订阅自己/其他插件通过 `actx.emit` 发射的 scope 内事件(如 ui-conversation client.js:1383-1386)。这是插件间私有事件,不是会话日志事件。

### 5.3 可用事件名与 payload(会话日志事件全集)

事件信封(`dsh-session/lib/types/types.d.ts:420-452`):

```ts
export type SessionEvent<T extends SessionEventType = SessionEventType> = {
    type: K; seq: number; time: number;   // epoch ms
    data: SessionEventMap[K];
    ignorable?: true;
} & (K extends SurfaceEventType ? { sourceEventSeqs?: number[]; surfaceOp?: SurfaceOp } : object);
```

核心 `SessionEventMap`(dsh-session types.d.ts:223-354):

| 事件 | data |
|---|---|
| `turn/start` | `{ turn }` |
| `turn/end` | `{ turn, reason: TurnEndReason }`(completed/aborted/blocked/error/max-tokens/interrupted) |
| `step/start` / `step/end` | `{ turn, step }` |
| `user/message` | `UserMessage`(surface 事件:`{ id, content: ContentBlock[], source: MessageSource }` + `surfaceOp`/`sourceEventSeqs`) |
| `assistant/chunk` | `{ turn, step, chunk: StreamChunk }`(block-start/text-delta/reasoning-delta/tool-call-delta/block-end/usage/finish) |
| `assistant/message` | `{ turn, step, message: AssistantMessage, usage?: TokenUsage }`(surface) |
| `tool/call` | `{ turn, step, callId, name, arguments }` |
| `tool/result` | `{ turn, step, message: ToolResultMessage, error?: {name, code}, meta?: JsonValue }`(surface) |
| `todo/write` | `{ todos: TodoItem[] }`(整表快照) |
| `request/header` | `{ header: EpochHeader, reason: 'initial'|'resume'|'change' }` |
| `request/context` | `RequestContext`(provider/model/contextWindow) |
| `session/end-seed` | `{}` |

插件合并的事件(各包 `declare module '@deepseek-ai/dsh-session/types' { interface SessionEventMap {...} }`):

- `llm/retry`、`llm/retry-started`(dsh-llm-retry types.d.ts:4-41)
- `compaction/start`、`compaction/summary`、`compaction/end`、`compaction/prune`(dsh-compaction)
- `agent/inbox/spliced`(dsh-agent types.d.ts:10-28:`{ target:'next-turn'|'next-step', start, removedCount?, inserted: UserMessage[], outcome?: 'canceled' }`)
- `command/run`、`command/done`(dsh-commands)
- `session/title`(dsh-session-title)、`session/title-llm-request`(dsh-session-title-llm)
- `approval/asked`、`approval/decided`、`approval/policy`(dsh-user-approval)
- `permission/preset`(dsh-permission-presets)、`sandbox/mode`(dsh-sandbox-policy)
- `plan/mode`(dsh-plan-mode)、`goal/change`(dsh-goal)
- `subagent/descriptor`(dsh-subagent)、`schedule/change`(dsh-schedule)、`feedback/record`(dsh-command-feedback)
- `tool/code-dispatch`、`tool/code-dispatch-start`(dsh-tools types.d.ts:22)
- `web/deepseek-search-llm-request`(dsh-web-search-deepseek)

### 5.4 mux/host 帧(`dsh-host-apiproxy/lib/types/api/events.d.ts`)

`MuxFrame`(66-145):`session/event {sessionId, event, view?: ToolEventView}`、`session/subscribed {sessionId, lastSeq}`、`approval/requested`、`approval/resolved`、`question/requested`、`question/resolved`、`session/queue {items: QueuedInboxItem[]}`、`session/jobs {jobs: JobView[]}`、`session/projection {sessionId, key, value, seq}`、`stream/error`。
`HostFrame`(163-212):`host/session-added`、`host/session-removed`、`host/session-status {running}`、`host/agent-error {message}`、`host/workspace-*`、`host/archived-sessions-changed`、`host/remote-event`、`stream/error`。
`ToolEventView`(27-33):`{for:'call', view: ToolCallView} | {for:'result', view: ToolResultView}`(渲染意图,不持久化)。

---

## Q6. token meter / 上下文计量

`dsh-token-meter/lib/types/projection.d.ts`。三个投影键(声明合并 64-73):

```ts
export interface TokenUsageProjection {          // 键 "tokenUsage"
    uncachedInputTokens: number;   // 四桶互斥;reasoning 已含于 outputTokens
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
}
export interface ContextPressureProjection {    // 键 "contextPressure"
    pressureTokens?: number;       // 最近请求的 prompt 侧 token(未缓存输入+缓存读写)
    projectedTokens?: number;      // 下一次请求的预估 prompt 成本(样本+surface 变动)
    contextWindow?: number;        // 最新路由容量
}
export interface ContextBreakdownProjection {   // 键 "contextBreakdown"
    systemTokens: number;          // 最新请求信封的 system prompt 启发式 token
    toolsTokens: number;           // 工具 schema 启发式 token
    messageTokens: number;         // 当前模型可见会话 surface 启发式 token
}
```

- host 端单位:`tokenUsageProjectionDefinition` / `contextPressureProjectionDefinition`(usage-projection.d.ts:40-62)。语义:usage chunk 提供早期样本,assistant/message 提供同 turn/step 的最终样本,重复样本替换不重复计数;`contextPressure` 的 `pressureTokens` 与 `contextWindow` 是独立 last-wins,刻意不保证同一请求原子一致(参考值,非计费输入)。
- **客户端可读**:`useProjection("tokenUsage")`、`useProjection("contextPressure")`、`useProjection("contextBreakdown")`。
- 消费范例:
  - StatsLine:缓存命中率 `cacheHitPercent = round(cacheReadTokens / (uncached+cacheRead+cacheWrite) * 100)`,输入/输出 token 展示(client.js:2777-2837)。
  - ContextMeter(composer 旁的圆环,client.js:2936+):`useProjection("contextPressure")` 算 `percent = min(100, round(projectedTokens ?? pressureTokens / contextWindow * 100))`;`useProjection("contextBreakdown")` 渲染 system/tools/messages 分段条。

---

## Q7. defineStore / createSnapshotStore

`dsh-client-runtime/lib/types/client/contract/store.d.ts`。

### 7.1 签名

```ts
// store.d.ts:4-7
export interface ObservableSnapshot<T> {
    getSnapshot(): T;
    subscribe(fn: () => void): () => void;
}
// store.d.ts:9-20
export interface SnapshotStore<T> extends ObservableSnapshot<T> {
    update(mutator: (draft: T) => void): void;   // immer draft 变更
    set(next: T): void;                           // 整体替换
}
// store.d.ts:42-47
export declare function createSnapshotStore<T>(init: T, opts?: {
    flush?: 'raf' | 'sync';                       // 默认 'sync'(受控输入同 tick 回显);帧驱动选 'raf'
    persist?: { name: string };                   // localStorage 持久化
}): SnapshotStore<T>;
// store.d.ts:87-89
export declare function defineStore<T, A extends ActionsDecl<T>>(decl: StoreSpec<T, A> & {
    actions: A & ActionsDecl<T>;
}): EngineStoreHandle<T, A>;
```

`StoreSpec<T, A>`(ui-slots store.d.ts:34-38):`{ init: () => T; persist?: string; actions: A }`。`ActionsDecl<T> = Record<string, (draft: T, ...params: any[]) => void>`(纯 immer draft 变更器)。`EngineStoreHandle.create(scopeKey?)` 产出引擎实例(带 `actions`、`getSnapshot`、`subscribe`、`clearPersisted`;store.d.ts:49-70)。组件侧通过 `PropsStore` 拿 `useStore` + `actions`(ui-slots store.d.ts:101-104)。

### 7.2 最小示例(取自 ui-conversation `createChatStore`,client.js:23-47)

```ts
function createChatStore() {
    return defineStore({
        init: () => ({ selection: null, draft: "", view: null, inspect: null }),
        persist: "dsh.conversation.chat",
        actions: {
            select: (d, target) => { d.selection = target; },
            setDraft: (d, text) => { d.draft = text; },
            setView: (d, view) => { d.view = view; },
            setInspect: (d, target) => { d.inspect = target; }
        }
    });
}
// 注册为 slot store 席位:
// slots.register({ name: "conversation.view", id: "metrics", store: createChatStore, ... }, MetricsView)
// 组件 props 自动获得 useStore / actions(注册处也可传 store 给 inject)
```

`createSnapshotStore` 裸用范例:ui-trajectory 的 duration 偏好(client.js:40-42):`createSnapshotStore(false, { persist: { name: "dsh.trajectory.duration" } })`,再作为 `hooks: { duration }` 注入组件(见附录 A)。

---

## Q8. locale 服务

### 8.1 类型与 API(`dsh-client-locale/lib/types/client/index.d.ts`)

```ts
// 30-34
export interface LocaleDefinition { id: LocaleId; label: string; }
// 36-43
export interface LocaleSnapshot { active: LocaleId; locales: readonly LocaleDefinition[]; revision: number; }

// 134-143  typed 注册:每个已发布 locale 必须给全字典(缺 key/多 key 编译报错;重复 (ns, locale) 抛错)
register<N extends keyof LocaleNamespaceMap & string>(ns: N, dicts: Record<LocaleId, LocaleDictOf<N>>): () => void;
// 143     非 typed 单语言注册(动态组合/测试)
register(ns: string, locale: string, dict: LocaleDict): () => void;
// 153-160  bind:返回该 namespace 的 typed 翻译函数(每次调用读当前 locale;同 ns 重复 bind 返回同一引用)
bind<N extends keyof LocaleNamespaceMap & string>(ns: N): TranslateNS<N>;
```

查找链:该 ns 的活动 locale → 该 ns 的 zh 回退 → 公共 `common` ns(活动→zh)→ 键本身。`TranslateNS<N> = Translate<LocaleKeysOf<N>>`,`LocaleKeysOf` = 该 ns 字典键 ∪ `common` 键(ui-slots index.d.ts:40-62)。支持的语言:`LocaleId`(dsh-client-locale locale-settings.d.ts,`'zh' | 'en'` + `FALLBACK_LOCALE='zh'`,client/index.d.ts:61)。

### 8.2 用法(ui-sidebar client.js:224-256 与 ui-trajectory client.js:44-81,7328-7332)

```ts
// 1) 定义字典(zh 是键集源,en 必须补全)
const zh = { "session.new": "新会话", "session.new.label": "新建会话", "toggle.open": "打开侧边栏", "toggle.collapse": "收起侧边栏" };
const en = { "session.new": "New Session", "session.new.label": "New session", "toggle.open": "Open sidebar", "toggle.collapse": "Collapse sidebar" };
const NS = "sidebar";

// 2) 声明合并键集(让 register/label/t 获得类型检查)
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap { sidebar: 'session.new' | 'session.new.label' | 'toggle.open' | 'toggle.collapse'; }
}

// 3) apply 里注册(经 ctx.effect,插件卸载自动移除)
function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-sidebar: dictionaries");
    // ...
    ctx.slots.register({ name: "sidebar", locale: NS, ... }, SidebarRoot);  // locale: NS → 组件 props 获得 t
}
```

slot 组件里直接解构 `t`(typed):`function SidebarRoot({ t, renderSlot, ... })`;列表标签用 thunk:`label: () => t("view.trajectory")`(ui-trajectory client.js:7345,标签跟随活动语言)。

---

## 附录 A. 新 conversation.view tab 最小完整模板

照抄 ui-trajectory 的注册骨架(client.js:7313-7362):

```ts
import type { Context } from '@deepseek-ai/cordis';

const NS = "metrics";
const zh = { "view.metrics": "指标", /* ... */ };
const en = { "view.metrics": "Metrics" /* ... */ };

declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap { metrics: 'view.metrics' | ...; }
}

export const inject = ["slots", "conversationEvents", "conversationViews", "sessions", "locale"];

export function apply(ctx: Context) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-metrics: dictionaries");
    const t = ctx.locale.bind(NS);

    // (可选)注册自己的事件 Definition,把原始事件折叠成指标状态机
    // ctx.conversationEvents.register(metricsDefinition);

    ctx.slots.inject("conversation.view", () => ctx.slots.register({
        name: "conversation.view",
        id: "metrics",                 // tab 唯一 id(与 chat/trajectory 并列)
        order: 20,
        locale: NS,
        label: () => t("view.metrics"),
        inject: (sessionId) => {
            const session = ctx.sessions.binding(sessionId)?.session;
            if (session === void 0) throw new Error(`ui-metrics: session "${sessionId}" is unavailable`);
            return {
                // hooks: { mySource },   // 可选:注册自定义 use<Name> hook
                // loadOlder: async () => { const before = session.getSnapshot().views.get("metrics"); await session.loadOlder(); return session.getSnapshot().views.get("metrics") !== before; },
            };
        }
    }, MetricsView));
}
```

`MetricsView` 组件(props 自动获得 `useSession`、`useProjection`、`sessionId`、`t`):

```tsx
function MetricsView({ useSession, useProjection, t }: ConvViewProps & PropsLocale<'metrics'>) {
    const stats = useProjection("sessionStats");              // turns/steps/llmMs/toolMs/ttftMs/ttftSteps/decodeMs/decodeTokens
    const usage = useProjection("tokenUsage");                // uncachedInputTokens/outputTokens/cacheReadTokens/cacheWriteTokens
    const pressure = useProjection("contextPressure");        // pressureTokens/projectedTokens/contextWindow
    const breakdown = useProjection("contextBreakdown");      // systemTokens/toolsTokens/messageTokens
    const running = useSession((s) => s.running);
    const nodes = useSession((s) => s.chat.legacy.nodes);     // 当前窗口节点(assistant/user/context/tool-result...)
    // ...渲染看板
}
```

> 注:`ConvViewProps = PropsRuntime<'conversation.view'>`(ui-conversation contract/slots.d.ts:445),`PropsLocale` 来自 ui-slots。`conversation.view` 是 `{ kind: 'list'; scope: 'session' }` 槽位(contract/slots.d.ts:78-82),owner 可选传 `{ inspect?, onInspectDone? }`(`ConvViewOwnerProps`,336-343)。tab 一次只渲染一个(`only: <active id>`)。

---

## 附录 B. 关键文件索引

| 主题 | 文件 |
|---|---|
| useProjection / ProjectionValueStore / Baseline | dsh-client-runtime/lib/types/client/sessions/projection-store.d.ts |
| ISession / ProjectionsFace / SessionFace | dsh-client-runtime/lib/types/client/contract/session.d.ts |
| Session 类 | dsh-client-runtime/lib/types/client/sessions/session.d.ts |
| ISessions / binding | dsh-client-runtime/lib/types/client/contract/sessions.d.ts |
| SessionBinding / SessionListState / provide | dsh-client-runtime/lib/types/client/sessions/service.d.ts |
| ConversationSnapshot 节点 | dsh-client-runtime/lib/types/client/sessions/conversation.d.ts |
| RequestView / RequestInspectionSnapshot | dsh-client-runtime/lib/types/client/sessions/request-inspection.d.ts |
| AssistantTiming 推导 | dsh-client-runtime/lib/types/client/sessions/assistant-timing.d.ts |
| 标准 props 合并 | dsh-client-runtime/lib/types/client/index.d.ts |
| defineStore / createSnapshotStore | dsh-client-runtime/lib/types/client/contract/store.d.ts |
| ConversationNodeDefinition / ViewDefinition | dsh-client-runtime/lib/types/client/contract/conversation.d.ts |
| conversationEvents / conversationViews 注册器 | dsh-client-runtime/lib/types/client/conversation/{event,view}-registry.d.ts |
| SlotRegistry | dsh-client-runtime/lib/types/client/slots.d.ts |
| SlotCore.register / ComposedProps / Locale 类型 | dsh-client-ui-slots/lib/types/index.d.ts, store.d.ts, renderer.d.ts |
| sessionStats 投影 | dsh-session-stats/lib/types/types.d.ts, lib/index.js |
| tokenUsage/contextPressure/contextBreakdown | dsh-token-meter/lib/types/projection.d.ts, usage-projection.d.ts |
| trajectory 快照/记录 | dsh-client-ui-trajectory/lib/types/client/{trajectory-contract,trajectory-record,layout}.d.ts |
| trajectory 实现(client.js 7369 行) | dsh-client-ui-trajectory/lib/client.js |
| StatsLine / ContextMeter / createChatStore | dsh-client-ui-conversation/lib/client.js |
| 会话事件信封 / SessionEventMap | dsh-session/lib/types/types.d.ts |
| mux/host 帧 | dsh-host-apiproxy/lib/types/api/events.d.ts |
| TokenUsage / StreamChunk / Message | dsh-llm/lib/types/{types,message}.d.ts |
| ToolCallView / ToolResultView | dsh-tools/lib/types/presentation.d.ts |
| 转发事件白名单 | dsh-api-remotes/lib/types/remote-events.d.ts |
| locale 服务 | dsh-client-locale/lib/types/client/index.d.ts |

### 编写新插件时的准确事实清单(避免踩坑)

1. `useProjection(key)` 的 key 集合是 `SessionProjectionMap` 声明合并键:`sessionStats`、`tokenUsage`、`contextPressure`、`contextBreakdown`、`title`、`todos`、`plan`、`goal`、`subagentTiming`、`permission`;未合并的键编译不过。
2. `session.projections.faceOf(key)` 返回 `ObservableSnapshot<unknown>`,永远存在(缺值是 undefined 快照),不要在订阅前判空。
3. `snapshot.views.get("trajectory")` 需要 ui-trajectory 插件已注册,返回 `TrajectorySnapshot | undefined`;`snapshot.views.get("chat")` 返回 `ChatSnapshot | undefined`。
4. `AssistantMessageNode.usage` 类型是 `unknown`,实际为 `TokenUsage`;取数时按 `inputTokens/outputTokens/cacheReadTokens?/cacheWriteTokens?/reasoningTokens?` 访问(与 `tokenUsage` 投影的四桶语义一致)。
5. 投影值来自 host 全量日志折叠,分页/compact 不影响;快照 `nodes` 只覆盖当前窗口(每页 50 条)。
6. 会话事件不能 `ctx.on(...)` 订阅;要实时增量数据必须写 `ConversationNodeDefinition` 注册进 `ctx.conversationEvents`,或用 `useSession`/`useProjection` 订阅快照。
7. 会话 scope 组件标准 props:`useSession`、`sessionId`、`useProjection`(session 槽位);全局另有 `useSessions`、`useWorkspaces`。
8. `ctx.sessions.binding(id)` 返回 `SessionBinding | undefined`;对当前会话(已 stage)恒可用,其余情况先判空。
9. locale 注册要求全部语言字典齐备(zh 为键集源),重复注册抛错;`label` 用 thunk 以跟随语言切换。
