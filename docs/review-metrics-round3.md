# DSH 看板指标统计准确性审查(第三轮 / round3)

> 审查对象:`src/client/metrics.ts`(1199 行,统计派生核心)、`src/client/DashboardView.tsx`(1844 行,消费与展示)、`src/client/charts.tsx`(640 行,数值格式化)。
> 数据源契约核对:`dsh-client-runtime` `conversation.d.ts`(`ConversationNode`/`AssistantTiming`/`ToolResultNode`/`RunningToolCall`/`turnTimings`)、`request-inspection.d.ts`、`dsh-llm/types.d.ts`(`TokenUsage`,四桶互斥)、`dsh-session-stats/projection.d.ts`(全量投影语义)、`dsh-token-meter/projection.d.ts`(全量/窗口语义)、`dsh-client-ui-conversation` `client.js`(`projectBlock`/`deriveStats` 实现)、本仓库 `trajectory-contract.ts`。
> 上一轮基线:`docs/review-metrics-round2.md`(M1–M14);大修提交 `e813745`。
> 结论速览:**A 级 2 个、B 级 5 个、C 级 10 个**;上轮 M1/M2/M3/M4/M5 均已修复(复核通过),M7/M10/M16 等遗留项本轮仍存在并重新归级。

---

## 0. 已修复项复核(不重复报告,仅确认)

| 上轮编号 | 修复状态 | 本轮复核证据 |
|---|---|---|
| M1 modelSplit.costUsd 恒 0 | ✅ 已修复 | `metrics.ts:695` `row.costUsd += s.costUsd;`,每请求成本在 `requestSeries` 计算(`metrics.ts:627-632`) |
| M2 工具计数两套规则 + 子调用只算一层 | ✅ 已修复(遗留新问题见 A2) | `toolHistogram.walk` 递归:`metrics.ts:485-496`;`indexToolCalls.collect` 递归:`metrics.ts:459-463` |
| M3 趋势头部 TTFT 均值用全量冒充窗口 | ✅ 已修复 | 头部改窗口均值:`DashboardView.tsx:505-508`(`metrics.assistantTtft` 求和) |
| M4 耗时趋势合计全量配窗口 tooltip | ✅ 已修复 | `windowDurationMs` 按窗口 series 求和:`DashboardView.tsx:501-504` |
| M5 noProgress 无 usage 门禁 | ✅ 已修复 | `metrics.ts:1051` `d.usageReported &&` |

---

## 1. A 级(高置信数值错误)

### A1【A 高置信】缓存节省(cacheSavings)公式算错:按未命中价 × 全部命中 token,高估约 35%

- **位置**:`src/client/metrics.ts:402-406`;消费:`DashboardView.tsx:1420`(成本卡 sub "缓存节省");文案:`src/client/locales.ts:94`(`hint.cost`:"缓存节省 = 命中 tokens 按未命中价折算")。

```ts
// metrics.ts:402-406
/** Cache savings of one request (cache reads billed at miss rate), priced by its own model. */
export function estimateCacheSavingsUsd(model: string | null, cacheReadTokens: number): number {
  const miss = isReasonerModel(model) ? DEEPSEEK_PRICES.reasoner.miss : DEEPSEEK_PRICES.chat.miss;
  return (cacheReadTokens * miss) / 1_000_000;
}
```

- **错在哪**:缓存命中的 token 实际按 **命中价** 计费(`estimateRequestCostUsd` 里 `cacheReadTokens * p.hit`,`metrics.ts:396`)。所谓"节省"= 这些 token 若未命中需多付的钱 = `cacheRead × (miss − hit)`,而代码算的是 `cacheRead × miss`。chat 档:`0.27 vs 0.20`,高估 35%;reasoner 档:`0.55 vs 0.41`,高估 34%。
- **自相矛盾**:同一张成本卡,总成本 `costEstimateUsd.total` 已经按命中价扣除了这 $0.07/1M,旁边却声称"节省"了 $0.27/1M——用户会得到"既付了命中价、又省了未命中价"的双重幻觉(例如 1M 命中 token:成本 $0.07,显示"节省 $0.27",真实节省 $0.20)。
- **对用户观感**:缓存收益被系统性夸大三分之一以上;成本卡上"节省"数字与"总成本"不可互相印证。
- **修复**:改公式为 `cacheReadTokens * (miss - hit) / 1_000_000`,并同步改 `locales.ts` 的 `hint.cost` 文案("节省 = 命中 tokens × (未命中价 − 命中价)")。改动仅此一个函数 + 一条文案。

### A2【A 高置信 · 条件触发】嵌套进行中的子调用(RunningToolCall)被当作 ToolResultNode 处理:直方图出现幽灵 "tool" 行、工具耗时合计变成 NaN

- **位置**:`src/client/metrics.ts:451-464`(`indexToolCalls.collect`)、`485-496`(`toolHistogram.walk`)、`509-524`(`toolDurationTop`)。

```ts
// metrics.ts:451-464 (collect) —— 递归分支对 RunningToolCall 同样生效
const collect = (node: ToolResultNode) => {
  add({
    callId: node.callId,
    name: node.call?.name ?? "tool",          // ← RunningToolCall 没有 .call → 恒 "tool"
    argsRaw: node.call?.argsRaw ?? null,      // ← 恒 null(RunningToolCall 的 argsRaw 被丢弃)
    durationMs: node.callTime !== null ? Math.max(0, node.time - node.callTime) : null, // ← callTime undefined → undefined !== null 为 true → NaN
    isError: node.isError                     // ← RunningToolCall 没有 isError → undefined
  });
  for (const sub of node.subCalls) {
    if ("subCalls" in sub && Array.isArray((sub as ToolResultNode).subCalls)) {
      collect(sub as ToolResultNode);         // ← ToolResultNode 与 RunningToolCall 都有 subCalls 数组,条件恒真
    }
  }
};

// metrics.ts:485-496 (walk) —— else 分支是死代码
const walk = (node: ToolResultNode) => {
  bump(node.call?.name ?? "tool", node.isError);
  for (const sub of node.subCalls) {
    if ("subCalls" in sub && Array.isArray((sub as ToolResultNode).subCalls)) {
      walk(sub as ToolResultNode);            // ← 恒走这里,RunningToolCall 也被当 ToolResultNode
    } else {
      const name = "name" in sub ? sub.name : sub.call?.name ?? "tool";  // ← 死代码:本意是处理 RunningToolCall(name 在子对象上)
      ...
    }
  }
};
```

- **数据源事实**(已在框架侧核实):`ToolResultNode.subCalls: readonly ToolCallBlock[]`,`ToolCallBlock = RunningToolCall | ToolResultNode`(`conversation.d.ts:186, 276`),**两个类型都恒有 `subCalls` 数组**;`dsh-client-ui-conversation` 的 `projectBlock`(`client.js:8418-8448`)在子调用尚未结算时把 `RunningToolCall` 原样保留在已结算父节点的 `subCalls` 里(仅在 turn 被中断时才合成 `isError: true` 的假 tool-result)。因此 **流式过程中,已落地父结果的 subCalls 里可以真实存在 RunningToolCall**。
- **错在哪**:`"subCalls" in sub && Array.isArray(...)` 对两类恒真,else 分支永远不执行;RunningToolCall 被强转成 ToolResultNode 后:名称取 `.call?.name` → 恒为 `"tool"`;`callTime` 为 undefined → `undefined !== null` 为 true → `Math.max(0, time - undefined)` = **NaN**。
- **连锁影响**:
  1. `toolHistogram` 给每个进行中的嵌套子调用记一条幽灵 `"tool"` 调用 → `toolCallCount`/`toolHistogram` 虚增(概览"工具调用"卡、工具直方图);
  2. `toolDurationTop` 第 513 行 `if (call.durationMs === null) continue;`——**NaN 不是 null,不会跳过**,`totalMs += NaN` → 该工具行合计/均值/最大全变 NaN,排序失效,UI 显示 "—"(`formatMs(NaN) = "—"`);
  3. `detectLoops`/`noProgress`/`toolStorm` 的 `toolCalls.length` 全部被幽灵条目污染。
- **对用户观感**:长会话里只要存在"父工具先返回、子调用仍在跑"(Code Dispatch 的典型流式形态,子 agent/并行工具),工具计数与耗时 TOP 就持续出错,且错误名 "tool" 与 NaN 耗时让数据显得不可信。
- **修复**(最小):在两处递归前按 `"kind" in sub` 判别类型——
  - `collect`:`if ("kind" in sub) collect(sub as ToolResultNode); else add({ callId: sub.callId, name: sub.name, argsRaw: sub.argsRaw, durationMs: null, isError: false });`(进行中调用无耗时、不算错误,名称取 `sub.name`);
  - `walk` 同理:`"kind" in sub ? walk(sub as ToolResultNode) : bump(sub.name, false)`;
  - 另在 `toolDurationTop` 第 513 行把过滤改为 `if (!Number.isFinite(call.durationMs)) continue;` 兜底 NaN。
  - 可复用一个 `flattenToolCalls(node)` 帮助函数,三处共用。

---

## 2. B 级(口径可疑 / 范围混搭 / 展示误导)

### B1【B 口径】`reasoningTokens` 是窗口值,却与全量 input/output/cache 卡并列且无任何范围标注;输出卡的"推理"sub 是窗口值挂在全量输出下

- **位置**:`src/client/metrics.ts:1079`(`reasoningTokens = totalReasoning(series)` ← 窗口)、`:1081`(`windowOutputTokens`);消费:`DashboardView.tsx:1450-1459`;文案:`src/client/locales.ts:81`(`hint.reasoningTokens` 无窗口/全量说明,而同卡的 `hint.inputTokens`:79、"全量日志值"、`hint.outputTokens`:80、"全量日志")。
- **错在哪**:四张 token 卡里,输入/输出/缓存读写来自 `tokenUsage` 投影(全量日志,`metrics.ts:1074-1077`),唯独推理 tokens 是窗口 series 求和。窗口上限 ~50 条消息,长会话下全量输出可达窗口输出的数十倍——用户看到"输出 2.0M(推理 12.3K)"时,会以为推理占比 ≈ 0.6%,而推理卡自己的占比(窗口÷窗口)可能是 40%。
- **对用户观感**:同一组卡片的数值不可互相印证;推理占比/推理量在不同卡片上口径不一致,且无任何标注提示这是窗口口径。
- **修复**:① 最小:在推理卡加窗口徽标(sub 或 hint 补"窗口内")并给输出卡 sub 的推理数标注"(窗口)";② 彻底:让 `reasoningTokens` 也走全量——但 `tokenUsage` 投影没有 reasoning 字段(四桶互斥),只能保留窗口口径并在 UI 标注。建议选 ①。

### B2【B 范围混搭无标注】Timing 卡在同一卡片里混排全量 llmMs/toolMs 堆叠条 + 窗口 P50/P95/P99 + 窗口 ttftByCache;decodeSpeed 卡、趋势头部命中率同样缺"全量"徽标

- **位置**:`DashboardView.tsx:1546-1554`(`llmMs`/`toolMs` 全量堆叠条)、`:1577-1583`(窗口 `durationStats` P50/P95/P99)、`:1555-1576`(窗口 `ttftByCache`);`:1434-1439`(decodeSpeed 卡,全量无徽标);`:619`(趋势头部 `metrics.cacheHitPercent` 全量 % 配窗口 `hitBars` 图,无徽标)。
- **错在哪**:Timing 卡片内,顶部的"模型生成/工具执行"是全量累计,下面的分位数与命中/未命中 TTFT 是窗口样本——用户在同一个卡片里比较"总耗时"与"P50",口径不同却无任何分隔说明(只有 `hint.totalDuration` 全量标注在概览卡,Timing 卡内没有)。趋势区头部命中率是全量百分比,紧贴的图是窗口每请求值,二者可差很多。
- **对用户观感**:同一指标卡片内全量/窗口并存,无法判断数字可信范围;命中率头部数字与图上的点对不上。
- **修复**:Timing 卡堆叠条加"全量"角标;decodeSpeed sub 加"全量";趋势头部命中率加"全量"徽标(概览卡输入/输出卡已有同款模式)。纯标注改动。

### B3【B 口径】`modelSplit.avgDurationMs` 混入失败/重试请求耗时,与 `durationStats`(仅 complete)口径不一致

- **位置**:`src/client/metrics.ts:697-700`:

```ts
if (s.durationMs !== null) {        // ← 未检查 status
  row.durSum += s.durationMs;
  row.durN += 1;
}
```

- **错在哪**:`durationMs` 对 error 请求同样非 null(完成/失败都记了 completedAt),所以模型行平均耗时把失败尝试也算进去;而 `durationStats`(`metrics.ts:782-788`)与 `failedStats/completedStats`(`metrics.ts:971-997`)只统计 complete/分状态。重试频繁时同一模型行均值被抬高,与同页的失败/成功对比、P50/P95 口径都不一致。
- **对用户观感**:模型卡"avg duration"与 Timing 卡 P50 结论打架,无法解释。
- **修复**:`modelSplit` 循环内改为 `if (s.status === "complete" && s.durationMs !== null)`(与 `durationStats` 对齐),或 sub 标注"含失败尝试"。上轮 M7 未修,本轮仍存在。

### B4【B 样本集不一致】`ttftStats` 与 `ttftByCache`/`modelSplit.avgTtftMs` 样本集不同;interrupted 分数 seq 只进前者不进后者;resultSeq↔legacy seq 关联失败时静默降级

- **位置**:`src/client/metrics.ts:791-793`(`ttftStats` 用全部 `assistantTtft` 样本)、`:1098-1122`(`ttftByCache` 遍历 series 且 `if (s.status === "running") continue`,按 `resultSeq` 查 `ttftBySeq`)、`:701-705`(`modelSplit` 同样按 resultSeq)。
- **错在哪**:(a) `assistantTtft`(`metrics.ts:558-569`)来自 legacy 节点,包含 **interrupted 冻结节点**(`conversation.d.ts:98-100`:合成**分数 seq**,来自 turn/end seq)——这些样本进入 P50/P95/P99 直方图,但分数 seq 永远匹配不上任何 `request.resultSeq`(整数),因此被 `ttftByCache`/`modelSplit` 排除;两套"窗口 TTFT"样本集天然不同,`hitN + missN ≠ ttftStats.sampleCount` 且无说明;(b) trajectory 请求窗口与 legacy 节点窗口发散时(`startSeq ≠ resultSeq`,窗口截断),`resultSeq` 在 legacy 里查不到 → `ttftByCache.hitN+missN = 0` 而 `assistantTtft.length > 0`,只有 `hint.ttftByCacheMiss` 一行小字提示"投影窗口不一致",`modelSplit.avgTtftMs` 则直接显示 "—" 无任何提示。
- **对用户观感**:同一页出现"P50 有值、命中/未命中 TTFT 无样本"或"模型行平均 TTFT 恒 —",用户难以判断是数据缺失还是功能坏了。
- **修复**:① 统一样本集:ttftStats 排除 interrupted 节点(检查 `node.interrupted === true` 或 seq 非整数),或 ttftByCache 也纳入 interrupted;② 在 `modelSplit` 无 TTFT 样本时给出与 `hint.ttftByCacheMiss` 同类的说明。上轮 M10/M16 未修,本轮仍存在。

### B5【B 格式化】`fmtCost` 对 [0.0001, 0.01) 美元区间一律显示 "<$0.0001",低估最多 99×

- **位置**:`src/client/DashboardView.tsx:81-86`:

```ts
function fmtCost(v: number): string {
  if (v <= 0) return "$0";
  if (v >= 1) return `$${v.toFixed(2)}`;
  if (v >= 0.01) return `$${v.toFixed(4)}`;
  return "<$0.0001";   // ← v = 0.005 / 0.0099 也走这里
}
```

- **错在哪**:`"<$0.0001"` 只在 `v < 0.00005`(四舍五入到 4 位小数后为 0)时才准确;0.0099 显示为 "<$0.0001",低估 99 倍。单请求成本极易落在这个区间(例如 9K 输出 token × $1.10/1M ≈ $0.0099;5K token ≈ $0.0055);窗口总成本较小时(短会话 3~5 个请求 ≈ $0.005–0.02)同样中招——`summary` 条(`DashboardView.tsx:1338-1340`)与详情面板成本行(`:225`)共用此函数。
- **对用户观感**:小成本全部显示成"<$0.0001",用户无法区分 $0.0001 与 $0.0099 的请求,低估成本。
- **修复**:`return v < 0.00005 ? "<$0.0001" : `$${v.toFixed(4)}`;`(并给 `v >= 0.01` 分支保留 4 位小数即可)。

---

## 3. C 级(边缘 / 低影响)

### C1【C 算法】P50/P95/P99 用 `round(p/100×(n−1))` 取秩,偶数样本 P50 系统性偏向上侧;小样本分位数失真

- **位置**:`src/client/metrics.ts:765-768`(`percentileStats.pct`)。已实测:`[1,2,3,4]` 的 P50 = 3(真中位数 2.5);`[10,20]` 的 P50 = 20(最大值)。样本 ≥10 时偏差 ≤ 半格,但直方图桶边界 `Math.round(lo/hi)` 独立取整后相邻桶显示区间可能重叠/留缝(计数用未取整边界,展示用取整边界)。
- **修复**:改用 `idx = Math.ceil(p/100*n) − 1`(nearest-rank)或对偶数样本插值;桶边界统一取整方式。

### C2【C 标注】成本与请求数是窗口值,无任何窗口标注,且与同卡"轮次/步骤"(全量)并列

- **位置**:`DashboardView.tsx:1416-1421`(成本卡)、`:1400-1406`(请求卡);对照 `hint.turns`/`hint.steps`("全量")。`costEstimateUsd.total` 来自窗口 `details` 求和(`metrics.ts:1084-1089`)。长会话下"估算成本"会明显低于全量真实成本而用户无从得知。
- **修复**:成本卡 sub 加"窗口内"字样。

### C3【C 归因】modelSplit 把 compaction 请求计入模型行,压缩大输入抬高该模型行的 input/cost

- **位置**:`metrics.ts:677-707`(无 purpose 过滤;`turnInputSeries` 已排除 compaction,`metrics.ts:727`)。压缩请求输入动辄上万 token,会把所在模型行的输入/成本占比画得异常大。
- **修复**:modelSplit 对 compaction 单列一行或加"含压缩"标注。

### C4【C 阈值】`noProgress` 用绝对阈值 `outputTokens < 50`,与请求上下文规模无关

- **位置**:`metrics.ts:1050-1052`。reasoner 输出主要落在 reasoningTokens 时(即使 outputTokens 含推理),或长上下文下 50 token 阈值过低,都可能漏报/误报。
- **修复**:改为相对阈值(如 `< max(50, inputTokens×0.05)`)并在 hint 标注启发式。

### C5【C 归因】`effortStats` 与 `failedStats.avgInputTokens` 的分母含无 usage/error 请求

- **位置**:`metrics.ts:999-1011`(effortStats 计入 error 请求的 0 推理)、`:971-992`(failedInputSum 按全部 error 请求平均,无 usage 者 inputTokens=0 拉低均值)。
- **修复**:effortStats 排除 error;avgInputTokens 分母改为 usageReported 的请求。

### C6【C 展示】context 占用曲线压缩点无标记、pct 被 100% 封顶

- **位置**:`metrics.ts:1130-1133`(`Math.min(100, …)`)、`DashboardView.tsx:584-590`。压缩请求 inputTokens 接近窗口上限 → 曲线在压缩点冲顶,而 turnInput 图有 ◆ 压缩标记(`DashboardView.tsx:708-710`),两图处理不一致。
- **修复**:复用 `compactionTurns` 标注;超 100 显示 ">100%"。

### C7【C 死分支】趋势区 "最近 60 条" 标注实际不可达

- **位置**:`DashboardView.tsx:509-510`(`windowed = metrics.series.length > 60`)。框架 history 上限 maxMessages=50,trajectory 请求窗口 ≤ ~50,该分支恒 false;`windowTitle` 恒为"当前窗口内全部请求的合计"(语义正确,但 60 条分支是死代码)。
- **修复**:删除或保留为将来窗口放大预留,无数值影响。

### C8【C 误报】`detectLoops` 对窗口截断的调用可能误报循环

- **位置**:`metrics.ts:838-859`。工具调用头在窗口外时 `call = null` → `argsRaw = null`(`metrics.ts:454-455`),多个连续截断调用会以 `name="tool", args=null` 匹配成"循环";A2 的幽灵 "tool" 条目同样会进入 flat 序列。
- **修复**:args 为 null 时跳过同参判定(视为不可比)。

### C9【C 时序】running 请求的局部 usage 计入全部窗口求和,流式过程中数值漂移

- **位置**:`metrics.ts:1081`(windowOutputTokens)、`:1079`(reasoningTokens)、`:724-736`(turnInput)、`:1013-1047`(throughput)。running 请求若携带部分 usage 样本(usage chunk),其半截 token 进入窗口求和,完成后数值跳变;不计入时(如 hitBars 排除 running)又与其余统计不一致。属流式看板的固有中间态,仅影响"正在生成时"的瞬时读数。
- **修复**:可选——窗口求和统一排除 running(与 `hitBars`/`durationBars` 策略一致),或接受并在 hint 注明。

### C10【C 定价健壮性】reasoner 判定仅靠 `/reasoner/i` 正则,网关别名会静默按 chat 价估算;定价硬编码 2025-09

- **位置**:`metrics.ts:384-386`、`:378-381`。已有 `hint.cost` 标注定价日期;别名(如自定义模型名不带 reasoner)会按 chat 价低估成本。属已知权衡,建议在 README/UI 注明"未命中 reasoner 的模型按 chat 价"。

---

## 4. 总结:最值得修的 3 个准确性问题的优先级

1. **A1 缓存节省公式(metrics.ts:403-406)**——数值确定算错、高估 ~35%,且与同卡总成本自相矛盾;修复是一个函数 + 一条文案,5 分钟工作量,收益最直接。
2. **A2 嵌套进行中子调用被误处理(metrics.ts:451-464 / 485-496 / 509-524)**——工具计数、耗时 TOP、循环/无进展检测被幽灵 "tool" 条目与 NaN 污染;这是上轮"工具递归修复"的残留缺口(else 分支死代码),修复需按 `"kind" in sub` 判别类型 + NaN 兜底,工作量小、影响面大(流式嵌套调用是 DSH 常态)。
3. **B1 reasoningTokens 窗口/全量口径混搭(metrics.ts:1079 + DashboardView.tsx:1450-1459)**——同一组 token 卡里唯一一个窗口值且无标注,长会话下推理量/推理占比与相邻卡片差一个数量级,用户无法判断;加窗口徽标即可。

> 其余建议顺位:B5(fmtCost 低估小成本,改动一行)> B3(模型均值混入失败)> B2/B4(范围标注与样本集统一)> C 级各条。整体修复量约半天,A/B 级不涉及任何数据源契约改动。

---

## 附:审查方法说明

- 所有结论均经源码 + 框架 `.d.ts`/`client.js` 实现逐行核实;拿不准的(如 trajectory 请求 usage 的 `inputTokens` 是否与缓存字段互斥)已通过 `dsh-llm/types.d.ts:118-122` 与 `docs/dsh-browser-plugin-api-reference.md:295-297` 确认互斥,未列为问题。
- 已确认**无**"窗口内分子 × 全量分母"混搭:cacheHitPercent(全量÷全量)、reasoningShare(窗口÷窗口)、toolErrorPercent(窗口÷窗口)、failedStats(窗口÷窗口)均同源。
- 已确认所有除法有除零保护:cacheHitPercent 对 0 返回 null(`metrics.ts:368-371`)、percentileStats 空集返回 null、durationStats/modelSplit/avgTtftMs 空样本返回 null、hitBars/occNowPct 有分母守卫;`null`(无样本)与 `0`(有样本但为 0)区分一致。
- 成本主链路复核:输入 `(uncached+write)×miss + read×hit + output×out` 与 DeepSeek 定价一致,缓存写入按未命中价 ✓;`decodeTokensPerSec = tokens/ms×1000` ✓;TTFT/耗时均以 resultSeq 为关联键 ✓。
