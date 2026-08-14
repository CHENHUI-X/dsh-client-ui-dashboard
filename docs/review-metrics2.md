# DSH 看板第三轮评审:指标全面性 × 可扩展性(review-metrics2)

> 评审对象:`src/client/metrics.ts`(指标派生)、`src/client/DashboardView.tsx`(展示)、`src/client/charts.tsx`(图表)。
> 数据源核对:`dsh-client-runtime` 的 `conversation.d.ts` / `request-inspection.d.ts` / `context-provenance.d.ts`、`dsh-token-meter` 的 `projection.d.ts`、`dsh-session-stats` 的 `projection.d.ts`、`dsh-session` 的 `types.d.ts`(事件级)、`dsh-llm` 的 `types.d.ts`(FinishReason/TokenUsage)。
> 前两轮(architecture / metrics)的 19+19 条建议大多已落地,本轮的"新增指标"均已逐条与已实现清单、已决定不做清单核对,不重复。

---

## 0. TL;DR

- **发现 3 个高置信度计算 bug / 口径错误**,建议优先修复:
  - **B1** `modelSplit` 的 TTFT 关联键用错(`startSeq` ≠ assistant 节点 seq),**每模型平均 TTFT 几乎必然恒为 "—"**,功能实际是死的;
  - **B2** 成本估算的定价档位取自 `series[0]`(最新一条请求)的模型,**整日志混合模型会话成本算错**,且 reasoner 判定靠模型名正则,脆弱;
  - **B3** 推理占比 = 窗口内推理 tokens ÷ 全量日志输出 tokens,**分子分母口径不一致**,占比系统性偏低、有误导。
- **7 个高价值新增指标**(全部现有数据可算),TOP 5 见第 2 节:缓存命中 vs 未命中 TTFT 对比、单请求成本列、上下文占用率随时间曲线、错误率趋势线、工具平均 token 成本。
- **可扩展性**:`deriveMetrics` 是"一个入口 + 一组纯函数"的好结构,但 `DashboardView` 没有 props 化,做"第二个看板"需要一次中型重构;按**子代理**过滤当前**数据不可得**(trajectory 契约无 subagent 归属),按**模型**过滤可行但节点级指标无法归因。
- **性能**:窗口 ~50 条消息规模下每次全量派生是亚毫秒级,无热路径 O(n²) 隐患;有 3 处 O(n²) 写法(搜索/导出/压缩配对)在窗口放大时才会显现,顺手可修。

---

## 1. 计算 Bug 与口径错误(重点)

### B1【高置信 · 功能失效】`modelSplit` 的每模型平均 TTFT 关联键错误

- **位置**:`metrics.ts:1006`(`ttftBySeq` 按 assistant 节点 seq 建索引)→ `metrics.ts:615`(`ttftBySeq.get(s.seq)`),而 `s.seq = request.startSeq`(`metrics.ts:535`)。
- **证据**(`request-inspection.d.ts`):请求视图明确区分两个 seq——
  - `startSeq`:"Sequence that **opened the operation** represented by this request"(即 `step/start` 或 `request/header` 事件 seq);
  - `resultSeq`:"**Assistant message** or compaction summary sequence produced by this request"(即 assistant 消息节点 seq)。
  - `assistantTtft()`(`metrics.ts:490-501`)的 TTFT 样本**以 assistant 节点 `node.seq` 为键**;`requestSeries` 自己都通过 `toolCalls.get(request.resultSeq)` 来关联"该请求名下的工具调用"(`metrics.ts:554`)。
  - 因此 TTFT 的键是 `resultSeq`,而 `modelSplit` 用 `startSeq` 去查——两者之间隔着 tool/call、chunk 等事件,必然不等。**`ttftBySeq.get(s.seq)` 几乎总是 miss → `avgTtftMs` 恒为 null**,模型卡片的"avg TTFT"列和 tooltip 永远是 "—"。
- **影响**:一个已上线功能静默失效(不报错、不告警),用户看到的一直是占位符。
- **修复(小)**:给 `RequestSample` 增加 `resultSeq?: number`,`modelSplit` 改为 `ttftBySeq.get(s.resultSeq)`;或把 `ttftBySeq` 直接按请求视图侧重新建(遍历 requests 找 resultSeq)。顺带:**第 2 节 S1(缓存命中 vs 未命中 TTFT)同样依赖此修复**,两件事一起做。

### B2【高 · 口径错误】成本估算用"最新一条请求的模型"给整日志定价

- **位置**:`metrics.ts:989` `const isReasoner = /reasoner/i.test(series[0]?.model ?? "")`,而 `series` 是 newest-first(`metrics.ts:571`),`series[0]` 是最新请求;`tokenUsage` 却是**全量日志**合计(`metrics.ts:975-998`)。
- **问题**:
  1. 会话中途从 `deepseek-chat` 切到 `deepseek-reasoner`(或反之)时,整段日志的未命中/命中/输出单价全部按最新一条请求的模型计——**混合模型会话成本系统性算错**;
  2. reasoner 判定靠模型名正则,自定义别名/网关模型名不匹配时**静默按 chat 价**计;
  3. 成本卡标注"全量日志",但定价档位实际由窗口内最新请求决定,窗口滚动后同一历史日志的总成本会**跳变**。
- **修复(小-中)**:按请求粒度计价——每条请求用自己的 `model` + 自己的三个输入桶 + 输出,求和得窗口成本;整日志成本则需框架暴露全量按模型的 token 合计,或明确标注"成本基于当前窗口请求序列估算"。这与第 2 节 **S3 单请求成本列**是同一件事,一并做。

### B3【高 · 口径不一致】推理占比混合窗口与全量口径

- **位置**:`metrics.ts:981` `reasoningTokens = totalReasoning(series)`(窗口内请求求和),`metrics.ts:977` `outputTokens = tokenUsage?.outputTokens`(全量日志);`DashboardView.tsx:1257` 用 `reasoningTokens / outputTokens` 计算"推理占比"。
- **问题**:分子是窗口、分母是全量,窗口远小于全量时占比**系统性偏低**;窗口内推理占比 60% 会被显示成 5%。虽然数学上不会超 100%(窗口推理 ≤ 窗口输出 ≤ 全量输出),但语义错误且与趋势区"每请求推理占比"(正确,`DashboardView.tsx:519-526` 按请求算)对不上。
- **修复(小)**:两选一——① 推理占比改为窗口内 `Σ reasoning / Σ output(窗口)`;② 推理 tokens 也改读投影(但 `TokenUsageProjection` 不拆推理,见其注释),所以选 ①,并把 `reasoningTokens` 的来源在 hint 里标注为"窗口内合计"。

### B4【中 · 直方图丢最大值】`percentileStats` 最后一个桶是闭区间外

- **位置**:`metrics.ts:687` 桶条件 `d >= lo && d < hi`,最后一个桶 `hi = max`——**恰好等于 max 的样本不满足 `d < max`,从所有桶中漏掉**。
- **影响**:耗时/TTFT 直方图各桶计数之和 < `sampleCount`(每当最大值是一个真实样本时就少 1,多个并列 max 少更多);P50/P95/P99 本身不受影响(nearest-rank)。
- **修复(小)**:`b === n - 1` 时用 `d <= hi`,或桶 hi 用 `max * 1.0001` 容差。

### B5【中 · 口径不一致】工具计数:直方图含子调用,耗时/明细/循环不含

- **位置**:`toolHistogram()`(`metrics.ts:413-435`)递归计入 `subCalls`(README 的 `tools.note` 也写明"含嵌套子调用");但:
  - `indexToolCalls()`(`metrics.ts:388-410`)只收顶层 `tool-result` 节点 → 每请求 `toolCalls`、`toolDurationTop`、`noProgress` 判定、`toolStorm` 密度、`detectLoops` **全部不含子调用**。
- **影响**:同一批数据在"工具直方图"与"工具耗时 TOP / 请求明细 / 循环检测"之间出现**两套计数规则**;"循环检测"漏掉子调用层面的重复(嵌套调用循环是真实场景)。
- **修复(小-中)**:抽一个 `flattenToolCalls(node)` 统一递归展开(带深度/父 callId),`toolHistogram`、`indexToolCalls`、`detectLoops` 共用;至少把"直方图含子调用、其余不含"写进各自 hint,避免用户误解两处数字对不上。

### B6【低 · 边界】`modelSwitchCount` 与 `modelSwitchSeqs` 对 null 模型处理不一致

- **位置**:`metrics.ts:507-517`(计数)与 `metrics.ts:968-973`(时间线)。
- **问题**:时序 `[A, null, B]`(中间请求模型缺失)时——计数逻辑在 `null` 处算 1 次切换,时间线在 `null` 和 `B` 两处各画一个琥珀环 → **统计显示 ×1,时间线显示 2 个切换点**,且 `null → "?"` 会占用一个图例色。
- **修复(小)**:两侧统一"跳过/继承前值"策略(如 `prev` 只在模型非空时更新,`null` 不参与比较)。

### B7【低 · 展示 bug】无进展行的单位把 tokens 标成"字符"

- **位置**:`DashboardView.tsx:1571` `{p.outputTokens} {t("unit.char")}`——`noProgress.outputTokens` 是 token,单位却显示 `字符`。
- **修复(小)**:改用 tokens 单位文案,或直接不显示单位。

### B8【低 · 纯度】`deriveMetrics` 内部调 `Date.now()`

- **位置**:`metrics.ts:1057`(传给 `turnDurations`)。文件头注释宣称"everything is a function of the framework-provided data… trivially testable",但 `Date.now()` 破坏了纯函数性与快照确定性(同一输入、不同时刻输出不同)。
- **修复(小)**:`Date.now()` 由调用方传入(`deriveMetrics(input, nowMs)`),与 `turnDurations` 的签名对齐。

### B9【低 · 结构】`compactionEffect` 的 O(n²) 写法

- **位置**:`metrics.ts:658` `ordered.slice(i + 1).find(...)`——每个压缩请求都 `slice` 一次再线性找,最坏 O(n²),且每次分配新数组。
- **影响**:窗口 ~50 时无感;若 trajectory 窗口放大到千级才有意义。顺手改为单趟扫描(记录"上一个未配对的压缩",遇到 assistant 时配对)。
- **修复(小)**:见上。

### 其他口径观察(非 bug,留档)

- `modelSplit` 把**压缩请求计入模型行**(`metrics.ts:593-621`)——压缩输入动辄上万 token,会显著抬高该模型行的"输入";建议压缩请求单列一行或加开关(`effortStats` 已正确地排除压缩)。
- `failedRequests`(请求 status=error,窗口)与 `anomalies.turnErrors`(turn-error 节点,窗口)是两套"错误数",同卡展示时建议在 hint 里写明差异(当前 `hint.requests` 只写了含压缩,未区分)。
- 概览卡"平均首字延迟"是**整日志**(`stats.ttftMs/ttftSteps`),趋势区 TTFT 是**窗口**——两个都叫"平均首字延迟"但数值不同,概览卡缺一个"全量"徽标(输入/输出卡有,这张没有)。

---

## 2. 新增指标建议(按收益/成本排序,TOP 5 标 ★)

> 每条含:建议名 / 价值 / 数据可得性(高·中·不可得,不可得说明缺什么)/ 展示建议 / 工作量。所有建议均已核对 `metrics.ts`、`DashboardView.tsx` 与类型定义,数据来源写死。

### ★S1 缓存命中 vs 未命中 TTFT 对比

- **价值**:验证"缓存到底快多少"(DeepSeek 缓存命中请求的 TTFT 应显著更低);命中但慢 = 异常信号,Helicone 缓存分析的标准动作。当前看板只有命中率,没有与延迟的交叉。
- **数据可得性:高**。每请求 `cacheReadTokens`(usage)+ 每请求 TTFT(`assistantTtft`,按 assistant 节点 seq)。**前提:先修 B1**(TTFT 按 `resultSeq` 关联)。
- **展示建议**:两张数字卡"命中平均 TTFT vs 未命中平均 TTFT(+样本数)",或请求趋势区 TTFT 图按命中率着色(≥80% 绿 / 0% 红);进阶做"命中率区间 × TTFT 箱线"。
- **工作量:小**。

### ★S2 单请求成本列(每请求定价)

- **价值**:看板已有总成本卡,但回答不了"哪一步最贵"——LangSmith/Helicone 请求表的标准列;也是 B2 的根治方案。
- **数据可得性:高**。每请求三个输入桶 + 输出 + 自身 `model`(定价表已有,DeepSeek 静态价)。缓存写入按未命中价计,与现有公式一致。
- **展示建议**:请求表加"成本"列(表格/分组/导出都带),列尾合计;模型卡加"按模型成本"堆积;详情面板 usage 区块加一行估算成本。
- **工作量:小-中**(定价函数抽成 `estimateRequestCostUsd(model, usage)` 纯函数,顺便替换 B2 的全量估算)。

### ★S3 上下文占用率随时间曲线(距压缩还有多远)

- **价值**:看板的上下文压力是**单一当前值**(gauge),没有"怎么涨上来的、压缩后回落到哪"的时间视图;这是回答"还能跑几轮、何时再压缩"的唯一可视化。Langfuse/OpenLLMetry 都有 context 增长曲线。
- **数据可得性:高**。每请求 `inputTokens`(= uncached+read+write)就是 **provider 上报的该请求 prompt 大小**,是现成的最准上下文序列;`contextWindow` 来自 `ContextPressureProjection`(adapter 上报后才有,缺失时画绝对 token 线);压缩点用 `compactionEffect`/compaction 节点标记。
- **展示建议**:趋势区新增"上下文占用率%"面积图(每请求 input ÷ contextWindow,超出画阈值线),叠加压缩回落标记;压力卡内放一条 60 点迷你历史线。
- **工作量:小-中**。

### ★S4 错误率趋势线

- **价值**:错误总量已有,缺"错误率随时间怎么变"(请求失败率、工具失败率两档);LangSmith 错误率趋势是默认图。
- **数据可得性:高**。`throughput` 已有分钟桶;每桶加 `failed` 计数即可(请求状态在 series 里,工具错误在 histogram 里)。
- **展示建议**:请求密度图旁加"失败率%"折线(或双色柱:成功/失败堆叠);工具失败率并入工具卡。
- **工作量:小**。

### ★S5 工具调用平均 token 成本

- **价值**:识别"贵工具"——一次调用烧掉多少输入/输出;Agent 成本归因的第一梯队。
- **数据可得性:高(近似归因)**。每工具名:聚合"调用过它的请求"的 `(input+output)` ÷ 调用次数。注意一次请求可能调多个工具,归因是**均摊近似**(工具粒度精确 attribution 需框架在 tool/call 事件里带 usage,当前不可得)。
- **展示建议**:工具耗时 TOP 卡加一列"≈ tokens/次"或 sub;工具直方图 hover 显示该工具贡献的请求 token 合计。
- **工作量:小**。

### S6 完成原因分布(截断浪费量化)

- **价值**:stop / 工具循环 / 触顶 / 中断 / 失败分布 + "触顶浪费了多少输出预算";直击 max-tokens 截断这一 DeepSeek 高频问题(已有触顶计数,缺"占比+浪费量")。
- **数据可得性:中(近似)/ 精确不可得**。核对结论:
  - 每请求 provider finish reason(`FinishReason`: stop/tool-calls/max-tokens/aborted/error,见 `dsh-llm/types.d.ts:94-114`)存在于 adapter 流(`StreamChunk.finish`),但 **trajectory 请求契约与 conversation 快照均未暴露**;`assistant/message` 事件只带 `usage?: TokenUsage`,不带 finish reason;
  - `turn/end` 事件的 `TurnEndReason`(completed/aborted/blocked/error/max-tokens/interrupted,`dsh-session/types.d.ts:135-169`)同样**未暴露**到快照(`turnEnds` 只有 turn→seq 映射);
  - 可近似:`turn-max-tokens` 节点=触顶、`interrupted` assistant=中断、`turn-error` 节点=失败、`toolCalls>0`=工具循环、其余=正常停止。
- **展示建议**:环形图(近似分布)+ 触顶请求的 `outputTokens` 合计(浪费量)+"blocked/精确 finish reason 需框架侧暴露 turn/end reason"提示。
- **工作量:小(近似版);中(需框架配合给精确值)**。

### S7 在途并发曲线(in-flight requests)

- **价值**:识别"串行空转 vs 并行堆积";卡顿时看并发是否堆积成山。
- **数据可得性:高**。每请求 `startedAt`/`completedAt`(running 的 completedAt=null)做事件扫描,O(n log n)。
- **展示建议**:阶梯面积图(时间×在途数),标注最大并发;与请求密度图并排。
- **工作量:小-中**。

### S8 每请求解码速率 + 解码耗时分布

- **价值**:整日志解码速度已有,缺"哪条请求解码慢/输出长";对"输出 10K token 是不是拖慢主因"给出逐条证据。
- **数据可得性:高**。assistant 节点 `timing.completedTime − firstTokenTime` = 解码耗时(`AssistantTiming`,conversation.d.ts:70-77),按 `resultSeq` 关联请求,`outputTokens` 即解码量 → 每请求 tok/s。
- **展示建议**:解码速率 sparkline + 请求表加"解码耗时/tok/s"列(或并入耗时列 hover)。
- **工作量:小**(同样先修 B1 的关联键)。

### S9 命令成功率

- **价值**:命令只统计了次数,没看成败;命令失败往往意味着用户指令被吞。
- **数据可得性:高**。`CommandNode.outcome.kind: 'success' | 'error'`(conversation.d.ts:251-257;执行中为 null)。
- **展示建议**:命令明细行加成功/失败徽标 + 成功率;失败命令的错误文案(`outcome.text`)可 hover。
- **工作量:小**。

### S10 模型切换原因标注(失败回退 vs 主动)

- **价值**:切换次数已有,缺"为什么切"——失败救火还是策略选择,直接决定成本与质量解读。
- **数据可得性:中(近似)**。精确原因不在契约;可近似:切换点**紧邻的前一条请求为 error 或带 retry** → 标"失败回退",否则"主动切换";`model-retry` 节点可佐证。
- **展示建议**:模型时间线切换环加"回退/主动"样式与 tooltip。
- **工作量:小**。

### S11 提示词长度趋势(system prompt / 工具定义膨胀)

- **价值**:system prompt 随会话膨胀(工具越挂越多)是输入成本与上下文压力的隐形推手;按请求看 `promptSystemChars` 一眼看出膨胀点。
- **数据可得性:高**。`details.promptSystemChars` 每请求都有(缺失为 null)。
- **展示建议**:趋势区小面积图"系统提示字符数";工具卡加"挂载工具数变化"。
- **工作量:小**。

### S12 每模型耗时 P50/P95(非均值)

- **价值**:均值被长尾拉偏;Langfuse 默认按模型给分位数。
- **数据可得性:高**(修 B1 后)。每请求 duration 已按模型分组,复用 `percentileStats`。
- **展示建议**:模型用量卡每行加 `P50/P95` sub。
- **工作量:小**。

### S13 错误码/HTTP 状态归因

- **价值**:429 限流 vs 网络 vs 服务端错误,指导重试策略调整。
- **数据可得性:中**。`TurnErrorNode.code?: string`(conversation.d.ts:148)可得;`request.error` 只是字符串(需正则粗分类);`LlmFailure.code/status` 在原始事件但未暴露到契约。
- **展示建议**:错误分类卡加"按 code 归因"二级标签;429 命中高时提示重试策略。
- **工作量:小-中**。

### S14 会话瀑布时间线(可选,大)

- **价值**:把"轮次耗时"升级为"思考→工具→输出"瀑布,一眼定位瓶颈(这是首轮 review 的遗留项,不在已实现/已排除清单里)。
- **数据可得性:高**。节点时间 + 请求耗时 + 工具 call/result 时间都有。
- **展示建议**:横向瀑布(每轮一行,内嵌工具段),点击跳轨迹。
- **工作量:大**。收益/成本比低于 S1–S5,建议放最后一档,等真实使用反馈再定。

### 明确不重复/不做的边界

- 时间范围选择器、会话对比/回放、反馈评分、预算/规则告警、延迟拆解排队段 —— 维持"已决定不做"。
- 已完成:成本总卡、缓存节省、TTFT 分位、压缩前后对比、模型时间线、重试等待、请求/token 密度、循环/无进展/工具风暴、分组视图、导出、sparkline、锯齿图 —— 本轮不再重复。

---

## 3. 可扩展性评估

### 现状(结构良好)

- `deriveMetrics` 是"单入口 + 一组可导出纯函数"(`requestSeries`/`modelSplit`/`percentileStats`/`turnInputSeries`/…),每个指标一个函数、输入输出显式,新增指标 = ① 接口加字段 → ② `EMPTY_METRICS` 补默认值(有 `DashboardMetrics` 类型约束,漏加会编译报错)→ ③ `deriveMetrics` 里加一行 → ④ 视图加渲染。**扩展成本低,结构不用动**。
- `charts.tsx` 组件全部通用化(SeriesBars/AreaChart/HorizontalBars/StackedBar/DonutChart/Sparkline/RadialGauge/ModelTimeline),新图直接复用;无第三方依赖,主题走 CSS 变量。
- `locales.ts` 用 `Record<keyof typeof zh, string>` 强制中英 key 集一致,加文案双语文档同步,无遗漏风险。

### 做"第二个看板"(按模型 / 按子代理过滤)的评估

- **按模型过滤:中(可行,需一次中型重构)**。
  - 可行面:`deriveMetrics` 已经接受 `requests` 数组——传入过滤后的 requests,请求级指标(请求/token/TTFT/耗时/错误/成本/工具/循环)天然正确;
  - 不可行面:**节点级指标无法按模型归因**——`roles`(消息构成)、`contextInjection`、`assistantTtft` 样本、`turnDurations` 都不带模型归属;一个"模型 A 看板"若直接复用这些字段,显示的是全窗口数据,会误导。
  - 建议做法:把 `DashboardView` 的 `useSession` 读取抽成 `useDashboardData()` hook,`deriveMetrics` 增加可选 `requestFilter` 参数;第二个 tab 用**请求级指标模板**(只渲染 model/tokens/timing/errors/tools/cost 卡),节点级卡显式标注"全窗口"。注册第二个 tab 在 `index.ts:41-58` 的 slot 工厂里加一次 `register`(不同 id/order)即可,成本不高。
- **按子代理过滤:不可得(框架缺口)**。
  - 核对结论:`ConversationSnapshot.subagent` 只描述**当前会话自身**的地址与父级可用性(conversation.d.ts:392-395);trajectory 请求契约(`TrajectoryRequestView`/`RequestView`)没有 subagent 归属字段;`subagent-lineage.d.ts` 是**会话列表镜像**的聚合,不是当前会话内的 per-request 归属。
  - 结论:看板侧无法实现子代理维度;需要框架在 request view(或 turn/step 事件)上暴露 `subagentAddress`(类似 `AssistantProvenanceView` 的做法),拿到后派生成本极低。
- **其他可扩展建议(小)**:
  - 把"近 60 条"魔数(`DashboardView.tsx:451,492,1118` 等)提为常量;
  - `PALETTE` 与 `MODEL_COLORS` 重复定义了两份调色板(charts.tsx:509 vs DashboardView.tsx:55),可合并;
  - 请求级派生(`tokenBars`/`outputBars`/`durationBars`/… 在渲染体内每次重建)在新增指标后建议收进一个 `useRequestChartData(metrics)` memo,减少重复遍历。

---

## 4. 性能评估

### 结论:当前规模(窗口 ~50 条消息 → ~50 请求)完全 OK,无隐患

- `deriveMetrics` 每次全量重算:排序约 10 次(50 log 50)、`percentileStats` 每桶一次 filter(50×10)、`compactionEffect` 最坏 O(n²)=2500 次比较——**亚毫秒级**。`useMemo` 依赖 `[running, nodes, turnTimings, trajectory, tokenUsage, stats, context, pressure]`,只有会话事件/投影变化才重算;每秒 `clock` tick **不触发** metrics 重算(clock 不在 deps),只重渲染图表,60 点 SVG 的 DOM 成本可忽略。
- **注意点**:`nodes`/`trajectory` 是快照对象引用,每次事件都换新引用 → 每次事件都全量派生一次。事件频繁(流式 chunk 逐字)时,把"派生"与"渲染"分开的意义在于 metrics 够快,当前成立。

### 三处 O(n²) 写法(窗口放大才显现,顺手修)

1. `DashboardView.tsx:305-315` 搜索:对每条过滤后的请求执行 `metrics.details.find(...)` → 每次按键 O(n²)。修复:渲染前 `const bySeq = new Map(details.map(d => [d.seq, d]))`(同一处 `exportJson:264`、`renderRow:323` 也受益)。
2. `metrics.ts:658` `compactionEffect` 的 `slice+find`(见 B9)。
3. `DashboardView.tsx:978-990` `findAnchor` 的 filter+sort 只在点击时执行,可接受。

### 长期加固(非必需)

- 若未来 trajectory 窗口随框架 `maxMessages` 调大(千级),给 `deriveMetrics` 加"变更感知"或增量缓存(按 nodes/requests 引用做 memo 短路)即可,现在不必做。

---

## 5. 数据口径一致性核对

| 维度 | 现状 | 结论 |
|---|---|---|
| 窗口 vs 全量标注 | token 卡/概览卡 hint 标注"全量日志";消息构成/工具/趋势/压缩卡标注"当前窗口"(`role.windowNote` + `windowNote.more`);趋势区有"最近 60"注记 | 基本一致 ✅ |
| `~` 近似标记 | 仅 `turnDurations` 对窗口外结束/进行中的轮次加 `~`(`DashboardView.tsx:1402`),并附 hint | 一致 ✅ |
| "估算"标记 | 成本卡标"估算";压力卡标"预计/启发式";`compactionRecovered` 注明 provider 上报 | 一致 ✅ |
| **不一致 1** | 推理占比 = 窗口推理 ÷ 全量输出(B3) | ❌ 需修 |
| **不一致 2** | 概览卡"平均首字延迟"是整日志,趋势区 TTFT 是窗口,两个都叫"平均首字延迟" | ⚠️ 概览卡补"全量"徽标 |
| **不一致 3** | 工具计数两套规则(B5):直方图含子调用,耗时/循环/风暴不含 | ⚠️ 统一或标注 |
| **不一致 4** | 成本卡"全量日志"但定价档位由窗口最新请求决定(B2),窗口滚动成本跳变 | ❌ 需修 |
| 合计 vs 分项 | token 堆叠条合计 = 各桶之和(输入=uncached+read+write 公式有 hint);模型行 token 合计含压缩请求 | ⚠️ 压缩行建议单列 |
| 导出 | 导出 JSON 与表格同源(同一 `filtered`),带 `exportedAt` 与 filter 元信息 | ✅ |

---

## 6. 附录:新指标数据可得性核对表(对照类型定义)

| 指标 | 数据来源(已核对) | 可得性 |
|---|---|---|
| S1 缓存命中 vs 未命中 TTFT | usage.cacheReadTokens(每请求) + AssistantTiming.firstTokenTime−stepStartTime(assistant 节点,经 resultSeq 关联) | 高(先修 B1) |
| S2 单请求成本列 | usage 五桶 + request.model + 现有 DeepSeek 定价 | 高 |
| S3 上下文占用率随时间 | 每请求 inputTokens(=provider prompt 大小)+ ContextPressureProjection.contextWindow + compaction 节点 | 高 |
| S4 错误率趋势 | series.status 分桶(复用 throughput 桶) | 高 |
| S5 工具平均 token 成本 | details.toolCalls + 请求 usage(均摊归因) | 高(近似) |
| S6 完成原因分布 | 精确:FinishReason(turn/end reason)未暴露;近似:turn-max-tokens / interrupted / turn-error / toolCalls | 中(近似) |
| S7 在途并发 | startedAt / completedAt | 高 |
| S8 每请求解码速率 | AssistantTiming.completedTime−firstTokenTime + outputTokens | 高(先修 B1) |
| S9 命令成功率 | CommandNode.outcome.kind | 高 |
| S10 模型切换原因 | 近似:切换点前请求 error/retry | 中(近似) |
| S11 提示词长度趋势 | details.promptSystemChars | 高 |
| S12 每模型 P50/P95 | series.durationMs 按 model 分组 | 高(先修 B1) |
| S13 错误码归因 | TurnErrorNode.code;request.error 为字符串;LlmFailure.code/status 未暴露 | 中 |
| S14 瀑布时间线 | 节点时间 + 请求耗时 + tool call/result 时间 | 高 |
| 按子代理过滤的第二个看板 | trajectory 契约无 subagent 字段;快照仅当前会话 subagent 地址 | **不可得**(框架缺口) |

---

## 7. 落地顺序建议

1. **先修 bug(半天内)**:B1(TTFT 关联键)→ B3(推理占比口径)→ B4(直方图 max)→ B7/B6/B8(小修)。
2. **再做 TOP 5 指标(1-2 天)**:S1 + S2 一起做(B2 顺带根治)→ S3 → S4 → S5。
3. **按需**:S6(先做近似版)、S9、S11 工作量都 ≤ 小,可随用随加;S14 瀑布等真实反馈再投入。
4. **框架侧缺口登记**:每请求 finish reason / turn-end reason、request view 的 subagent 归属、tool/call 的 usage——这三项拿到后,看板能解锁"精确完成原因分布""子代理维度看板""精确工具成本归因"三块,建议作为对框架的 feature request。
