# DSH 看板第四轮评审:指标正确性 × 功能全面性(review-metrics-round2)

> 评审对象:`src/client/metrics.ts`(1173 行,指标派生核心)、`src/client/DashboardView.tsx`(1756 行,展示与消费)、`src/client/charts.tsx`、`src/client/locales.ts`。
> 数据源核对:`dsh-client-runtime` 的 `conversation.d.ts` / `request-inspection.d.ts`、`dsh-llm/types.d.ts`(`TokenUsage`)、`dsh-session-stats/projection.d.ts`、`dsh-token-meter/projection.d.ts`、本仓库 `trajectory-contract.ts`。
> 上轮基线:`docs/review-metrics2.md`(B1–B9、S1–S14);大修提交 `9f9d6a5`(TTFT 关联键改 resultSeq、每请求自身模型定价、推理占比窗口口径、直方图末桶闭区间、模型切换 null 统一、`deriveMetrics(input, nowMs)` 纯函数化、新增 ttftByCache/contextTrend 等)。
> 本次结论速览:**上轮 9 个 bug 中 6 个已修复、3 个未修(含 1 个半修)**;新发现 **14 个新问题(M1–M14)**,其中 **1 个高置信度功能失效回归(M1:modelSplit.costUsd 恒为 0)**、2 个口径不一致(M3/M4)、1 个统计口径分裂残留(M2);新指标建议 E1–E5(全部现有数据可算,另有 E6–E8 低成本补充)。

---

## 1. 上轮 B1–B9 核对表

| 编号 | 上轮问题 | 当前状态 | 证据(行号) |
|---|---|---|---|
| **B1** | modelSplit 的 TTFT 关联键用 `startSeq`(≠ assistant 节点 seq),每模型平均 TTFT 恒 "—" | ✅ **已修复** | `RequestSample.resultSeq` 字段:`metrics.ts:26`;写入:`metrics.ts:588`(`request.resultSeq ?? null`);modelSplit 查询:`metrics.ts:675`(`ttftBySeq.get(s.resultSeq)`);ttftByCache 查询:`metrics.ts:1080`。两处关联键均已改为 resultSeq。 |
| **B2** | 成本用"最新一条请求的模型"给整日志定价,reasoner 判定靠正则 | ✅ **已修复(但模型行成本回归,见 M1)** | 每请求独立定价纯函数:`metrics.ts:385-396`(`estimateRequestCostUsd(model, usage)`);每请求成本写入 details:`metrics.ts:621-626`;窗口总成本按每请求求和:`metrics.ts:1060-1063`。⚠️ `modelSplit` 的 `costUsd` 字段(`metrics.ts:112, 660`)**从未累加,恒为 0** → 模型成本堆叠图/模型行成本列为死功能(M1)。 |
| **B3** | 推理占比 = 窗口推理 ÷ 全量输出,口径不一致 | ✅ **已修复** | `windowOutputTokens`(窗口输出合计):`metrics.ts:189, 1055`;消费处改为窗口÷窗口:`DashboardView.tsx:1370`。`reasoningTokens` 同为窗口口径(`metrics.ts:1053`)。 |
| **B4** | 直方图最后一个桶为半开区间,恰好等于 max 的样本漏计 | ✅ **已修复** | `metrics.ts:749`:`(b === n - 1 ? d >= lo && d <= hi : d >= lo && d < hi)`——末桶闭区间,桶计数之和 = sampleCount。 |
| **B5** | 工具计数两套规则:直方图含子调用,耗时/明细/循环不含 | ❌ **未修复(且子调用只算一层,见 M2)** | `toolHistogram` 递归计入 `node.subCalls`:`metrics.ts:471-478`;`indexToolCalls` 只收顶层 `tool-result`:`metrics.ts:441-459`。两套计数规则依然并存;且 `walk` 只遍历一层 `subCalls`,深度 ≥2 的嵌套子调用**连直方图都不计**(新问题,见 M2)。 |
| **B6** | modelSwitchCount 与 modelSwitchSeqs 对 null 模型处理不一致 | ✅ **已修复** | 计数侧 null 跳过:`metrics.ts:562-567`(`if (current === null) continue`);时间线侧 "?" 跳过:`metrics.ts:1040-1044`。两侧统一"null 不参与比较",`[A,null,B]` 计数 1、时间线 1 个环,一致。 |
| **B7** | 无进展行把 tokens 标成"字符" | ✅ **已修复** | `DashboardView.tsx:1722`:`{p.outputTokens} {t("unit.tokens")}`。 |
| **B8** | `deriveMetrics` 内部调 `Date.now()`,破坏纯函数性 | ✅ **已修复** | 签名改为 `deriveMetrics(input, nowMs)`:`metrics.ts:891`;调用方传 `Date.now()`:`DashboardView.tsx:1077`。 |
| **B9** | `compactionEffect` 的 `slice(i+1).find` O(n²) | ❌ **未修复** | `metrics.ts:716-731`:`ordered.slice(i + 1).find(...)` 依旧——每个压缩请求 slice 一次再线性找,最坏 O(n²),且每次分配新数组。窗口 ~50 无感,窗口放大才显现。 |

**小结**:9 项中 6 项已修复(B1/B2/B3/B4/B6/B7/B8 为 7 项——B1,B2,B3,B4,B6,B7,B8 共 7 项已修,1 项半修,2 项未修)。修正:B1✅ B2✅(模型行成本回归) B3✅ B4✅ B5❌ B6✅ B7✅ B8✅ B9❌。

---

## 2. 上轮 S1–S14 采纳状态

| 编号 | 建议 | 状态 | 落地证据 |
|---|---|---|---|
| S1 | 缓存命中 vs 未命中 TTFT 对比 | ✅ **已采纳** | `ttftByCache`:`metrics.ts:1073-1096`;UI:`DashboardView.tsx:1469-1488`。 |
| S2 | 单请求成本列 | ⚠️ **部分采纳** | 详情面板成本行:`DashboardView.tsx:216-217`;导出带 costUsd:`DashboardView.tsx:294`。**表格未加成本列**;且 modelSplit.costUsd 恒 0(M1),"按模型成本"堆叠图为死功能。 |
| S3 | 上下文占用率随时间曲线 | ✅ **已采纳** | `contextTrend`:`metrics.ts:1100-1108`;UI:`DashboardView.tsx:548-554, 743-751`。 |
| S4 | 错误率趋势线 | ✅ **已采纳** | `throughput.failed`:`metrics.ts:994-1019`;`rateFailBars`:`DashboardView.tsx:541-545, 721-736`。 |
| S5 | 工具平均 token 成本 | ❌ 未采纳 | 无按工具名 × 请求 usage 的聚合。 |
| S6 | 完成原因分布(截断浪费量化) | ❌ 未采纳 | 只有 `anomalies` 计数(`metrics.ts:509-533`),无分布/浪费量(近似版可做,见 E3)。 |
| S7 | 在途并发曲线 | ❌ 未采纳 | startedAt/completedAt 数据现成(`metrics.ts:38-40`),未做(见 E4)。 |
| S8 | 每请求解码速率 + 解码耗时分布 | ❌ 未采纳 | assistant timing 数据现成(`metrics.ts:540-551` 已读同一 timing),未做(见 E5)。 |
| S9 | 命令成功率 | ❌ 未采纳 | `commandRows` 只按名计数:`metrics.ts:770-780`;`CommandNode.outcome.kind` 未读(见 E2)。 |
| S10 | 模型切换原因标注 | ❌ 未采纳 | 切换点前请求 error/retry 的近似归因未做。 |
| S11 | 提示词长度趋势 | ⚠️ 部分采纳 | `promptSystemChars` 每请求已算:`metrics.ts:618`,详情面板展示:`DashboardView.tsx:189-190`;**无趋势图**(见 E6)。 |
| S12 | 每模型耗时 P50/P95(非均值) | ❌ 未采纳 | `modelSplit` 只有 `avgDurationMs`:`metrics.ts:691`(见 E1)。 |
| S13 | 错误码/HTTP 状态归因 | ❌ 未采纳 | `TurnErrorNode.code` 未读(见 E7)。 |
| S14 | 会话瀑布时间线 | ❌ 未采纳 | 维持"可选、大"定位,等真实反馈。 |

**小结**:S1/S3/S4 落地,S2/S11 部分,S5–S10/S12–S14 未做。

---

## 3. 新发现指标问题(M1–M14)

### M1【高置信 · 功能失效回归】`modelSplit.costUsd` 从未累加,恒为 0

- **位置**:`metrics.ts:654-666`(Acc 行初始化含 `costUsd: 0`)→ 循环体 `metrics.ts:667-680` **没有 `row.costUsd += ...`** → 输出 `metrics.ts:689`(`costUsd: r.costUsd`)恒 0。已在构建产物 `lib/client.js:722-755` 复核一致。
- **问题**:B2 的每请求定价只接入了 `RequestDetail.costUsd`(`metrics.ts:621-626`)与窗口总成本(`metrics.ts:1060-1063`);而**模型行成本**(`DashboardView.tsx:1194` 的 `fmtCost(m.costUsd)`,恒显示 "$0")与**"按模型成本"堆叠图**(`DashboardView.tsx:1585` 的 `value: m.costUsd`,恒为空)读的是 `modelSplit.costUsd`——该字段是死字段。
- **为什么**:接口(`metrics.ts:112`)注释写明"each priced by its own model",实现却漏了累加;UI 引用它却不报错,静默呈现空/零——与上轮 B1 同类"功能静默失效"。
- **修复**:① 最小改动:在 `modelSplit` 循环内直接 `row.costUsd += estimateRequestCostUsd(s.model, { uncachedInputTokens: s.inputTokens - s.cacheReadTokens - s.cacheWriteTokens, cacheReadTokens: s.cacheReadTokens, cacheWriteTokens: s.cacheWriteTokens, outputTokens: s.outputTokens })`;② 更整洁:`RequestSample` 增加 `costUsd`(在 `requestSeries` 计算一次),modelSplit 直接累加,与 `details.costUsd` 同源。

### M2【高 · 统计口径分裂残留 + 子调用漏计】工具计数两套规则,且子调用只算一层

- **位置**:`toolHistogram`:`metrics.ts:463-485`(walk 计入 `node.subCalls` 一层:`metrics.ts:471-478`);`indexToolCalls`:`metrics.ts:438-460`(只收顶层 `tool-result`);总计数 `toolCallCount/toolErrorCount`:`metrics.ts:910-915`(来自 histogram)。
- **问题**:(a) 上轮 B5 未修——概览"工具调用"卡(含一层子调用)与请求明细/耗时 TOP/循环/无进展/工具风暴(仅顶层)仍是两套数;(b) **新发现**:`walk` 对 `subCalls` 只迭代一层,`sub` 本身若是 `ToolResultNode` 且再带 `subCalls`(多级嵌套调用,`ToolCallBlock = RunningToolCall | ToolResultNode`),深度 ≥2 的子调用**连直方图都漏计**,docstring("including nested sub-calls")与实现不符。
- **修复**:抽 `flattenToolCalls(node): {callId, name, argsRaw, durationMs, isError, depth, parentCallId}[]` 递归展开 `ToolCallBlock`,`toolHistogram`、`indexToolCalls`、`detectLoops` 共用;至少把"直方图仅一层子调用、其余不含子调用"写进 `tools.note` 与 `hint.tools`。

### M3【中 · 口径不一致】TTFT 趋势头部均值是"全量",标注却声称"窗口"

- **位置**:`DashboardView.tsx:637` 显示 `metrics.avgTtftMs`(tooltip = `trend.ttftAvgNote`,locales.ts:173:"均值基于窗口内可观测样本");而 `avgTtftMs = stats.ttftMs / stats.ttftSteps`(`metrics.ts:1066`)来自 **sessionStats 投影 = 全量日志**(`dsh-session-stats/projection.d.ts`:"Accumulated whole-log figures")。同一头部的 P50/P95/P99(`DashboardView.tsx:649-653`)却是窗口 `metrics.ttftStats`。
- **问题**:图表数据是窗口、头部均值是全量,但 tooltip 声称窗口——用户会以为头部均值与图表同口径;与概览卡(正确标"全部请求",locales.ts:77)数值相等但语义标注矛盾。
- **修复**:趋势头部改用窗口均值 = `Σ assistantTtft.ttftMs / n`(数据现成:`metrics.ts:540-551`),或改 tooltip 文案为"全量均值";并在概览卡补"全量"徽标(见 M12)。

### M4【中 · 展示口径不一致】耗时趋势合计是全量值,却带"窗口合计"tooltip

- **位置**:`DashboardView.tsx:625`:`title={windowTitle}`(windowTotal/windowTotalAll,locales.ts:171-172:"合计基于最近 60 条请求"/"当前窗口内全部请求的合计")+ 值 `formatMs(metrics.totalDurationMs)`;而 `totalDurationMs = llmMs + toolMs`(`metrics.ts:1069`)是**全量**。同一行其余三个合计(input/output/cacheWrite,`DashboardView.tsx:599/608/696`)都是 `metrics.series` 窗口求和(真窗口)。
- **问题**:四张趋势卡并列,三个 tooltip 为"窗口合计",唯独耗时卡是"全量值 + 窗口 tooltip"——口径错标,用户把全量耗时当窗口读。
- **修复**:耗时合计改为窗口 = `series.filter(complete).reduce(Σ durationMs)`,或去掉该 cell 的 windowTitle tooltip 并标注"全量"。

### M5【中 · 误报】`noProgress` 把"无 usage 上报"误判为"零输出"

- **位置**:`metrics.ts:1024-1026`:`status === "complete" && outputTokens < 50 && toolCalls.length >= 3`。
- **问题**:provider 未上报 usage 的已完成请求 `outputTokens = 0`,只要工具调用 ≥3 就被标"无进展";实际可能输出了大量文本(usage 缺失 ≠ 零输出)。50 是绝对阈值,与请求上下文规模无关,reasoner 请求输出主要落在 reasoningTokens 时也会误判(虽 outputTokens 含推理,一般不至于 <50)。
- **修复**:`RequestSample` 增加 `usageReported: boolean`(readUsage 任一字段存在),noProgress 要求 `usageReported && outputTokens < 50`;或阈值改为相对量(如 `outputTokens < max(50, inputTokens * 0.05)`),并在 hint 标注启发式。

### M6【低 · 死代码】`assistantTtft` 双重空判断,第一重是无效 guard

- **位置**:`metrics.ts:545-546`:
  ```ts
  if (timing?.stepStartTime === null || timing?.firstTokenTime === null) continue;   // 545:timing 为 undefined 时 545 恒 false,不生效
  if (timing === undefined || timing.stepStartTime === null || timing.firstTokenTime === null) continue; // 546:真正的 guard
  ```
- **问题**:545 仅在 `timing` 存在且字段显式为 null 时命中,而 546 已全覆盖;545 是死代码,读代码会误以为双重防御。
- **修复**:删 545,保留 546。

### M7【低 · 口径】`modelSplit.avgDurationMs` 混入失败/重试请求的耗时

- **位置**:`metrics.ts:671-674`:只要 `durationMs !== null` 就进 `durSum/durN`,不分 status;而 `failedStats/completedStats`(`metrics.ts:945-971`)是分状态的。
- **问题**:模型行"avg duration"(`DashboardView.tsx:1193` title、1194 sub)把失败尝试的耗时也算进均值——重试频繁时模型均值被抬高,与 failed/completed 对比口径(仅 complete)不一致,UI 无任何标注。
- **修复**:modelSplit 只对 `status === "complete"` 计 durSum/durN;或 sub 标注"含失败尝试"。

### M8【低 · 展示】耗时趋势对 running 请求画 0 柱,缓存命中图却排除 running

- **位置**:`DashboardView.tsx:494-499`(`durationBars`:`value: s.durationMs ?? 0`,running 显示 0);对照 `DashboardView.tsx:502-509`(`hitBars` 显式 `status !== "running" && inputTokens > 0`,注释说明避免"误导性跌到 0")。
- **问题**:同一页两种处理——running 请求在耗时图最右端画 0ms 柱,视觉上像"瞬时完成";缓存命中图则正确地不画。
- **修复**:`durationBars` 同样过滤 running(或画 pending 样式/虚线)。

### M9【低 · 不一致】缓存命中 sparkline 未排除 running,与趋势图策略相反

- **位置**:`DashboardView.tsx:1234-1236`(`sparkHit` 只过滤 `inputTokens > 0`,不过滤 running);对照 `DashboardView.tsx:502-503`。
- **问题**:同一指标(spark 与趋势图)样本策略不一致;running 请求的局部 usage 会让 sparkline 出现瞬时命中率。
- **修复**:sparkHit 加 `s.status !== "running"`。

### M10【低 · 样本集不一致】`ttftStats` 含 running/interrupted 样本,`ttftByCache` 排除 running

- **位置**:`metrics.ts:765-767`(`ttftStats` 全量 `assistantTtft` 样本)vs `metrics.ts:1079`(`ttftByCache`:`if (s.status === "running") continue`)。
- **问题**:两个"窗口 TTFT"视图样本集不同——P50/P95/P99 把 running 请求(首 token 已到,TTFT 已定,严格说合理)与 interrupted 冻结样本算进去,而命中/未命中对比排除 running;`hitN + missN` 与 `ttftStats.sampleCount` 对不上,无任何说明。
- **修复**:两处统一排除 running(或统一包含),并在 `hint.ttftByCache` 注明与 P50 统计的样本差异。

### M11【低 · 展示】context 占用曲线:压缩点无标记、超窗口被 100% 封顶

- **位置**:`metrics.ts:1100-1108`(`Math.min(100, ...)`;`contextTrend` 含 compaction 请求,其 inputTokens = 压缩前上下文,通常接近窗口上限 → 曲线在压缩点冲到 100%);`DashboardView.tsx:548-554`(contextOccBars 无压缩标记);对照 `DashboardView.tsx:672-674`(turnInput 图有 ◆ 压缩标记)。
- **问题**:压缩回落是本图的核心卖点(hint.contextOccTrend:"压缩回落可见"),但压缩点本身无标记,且 >100% 的越界(如压力适配器缺失时的估算偏差)被静默截断;turnInput 图与 contextOcc 图对压缩的处理方式不一致(前者排除、后者计入)。
- **修复**:复用 `compactionTurns`(`DashboardView.tsx:562`)给 contextOccBars 标注压缩点;pct 不封顶、超过 100 显示 ">100%";或两图统一"压缩排除/标记"策略。

### M12【低 · 标注】概览卡"平均首字延迟"与趋势区 TTFT 双均值并存,缺"全量"徽标

- **位置**:`DashboardView.tsx:1342-1347`(概览卡 avgTtft = 全量,sub 仅显示 `ttftSteps` 次数,无"全量"徽标);`DashboardView.tsx:583`(缓存命中率头部同理,全量 % 配窗口图,无徽标)。
- **问题**:上轮"口径一致性核对表"已列此条,未修——概览"平均首字延迟"是全量、趋势区 P50 是窗口,两个都叫"平均首字延迟";输入/输出卡有"全量"徽标,这张没有。
- **修复**:概览卡加"全量"徽标(输入/输出卡的既有模式)。

### M13【低 · 性能】搜索/渲染/导出对每条请求 `metrics.details.find`,O(n²)

- **位置**:`DashboardView.tsx:320`(search 过滤)、`:337`(renderRow)、`:277`(exportJson)。
- **问题**:每次按键都对每条过滤后的请求线性 find details;窗口 ~50 无感,放大到千级每次按键 O(n²)。上轮性能节已列,未修。
- **修复**:渲染前 `const bySeq = new Map(metrics.details.map(d => [d.seq, d]))` 一次性建索引。

### M14【低 · 语义未文档化】`retryWaitMs` 对 `retryDelayMs` 的语义假设未声明

- **位置**:`metrics.ts:933-936`:`if (d.retryDelayMs !== null && d.retryDelayMs > 0) retryWaitMs += d.retryDelayMs`。
- **问题**:契约(`request-inspection.d.ts`)对 `retryDelayMs` 只注释 "Retry ordinal scheduled after a failed ordinary request",未说明是"单次重试的退避"还是"该请求累计等待"。若为单次退避且 `retry=2`,总等待被低估(只计最后一次);当前实现按"每请求一个延迟"求和。
- **修复**:在 `hint`(重试等待行,`DashboardView.tsx:1627-1628`)注明"按每请求最后一次退避计";或向框架确认语义。

### 附:上轮"其他口径观察"复核

- 压缩请求计入 modelSplit 行(上轮 line 86)——**仍在**(`metrics.ts:652-680`),压缩输入动辄上万 token 会抬高该模型行输入/成本;建议压缩单列一行或加开关(如 `turnInputSeries` 已排除压缩,`metrics.ts:701`)。
- `failedRequests`(请求 status=error)与 `anomalies.turnErrors`(turn-error 节点)两套错误数并存——仍在,`hint.requests` 未区分(建议补一句)。
- **TTFT 关联静默降级(新增观察,归入 M16 下方)**:`ttftBySeq` 由 `assistantTtft(input.nodes)`(legacy 节点)构建(`metrics.ts:1070`),查询键来自 trajectory 的 `resultSeq`——两个投影窗口边界若发散,关联全部 miss,`avgTtftMs`/`ttftByCache` 静默变 null/0 且无提示。建议在 `ttftByCache.hitN + missN === 0 && metrics.assistantTtft.length > 0` 时给 UI 一条"TTFT 关联样本为 0"的说明(`DashboardView.tsx:1469` 的渲染条件处)。

---

## 4. 新指标建议(E1–E5,全部现有数据可算)

### E1 每模型耗时 P50/P95(窗口)

- **数据来源**:`RequestSample.durationMs`(`metrics.ts:40`),在 `modelSplit` 循环(`metrics.ts:667-680`)里顺手按模型收集数组,复用 `percentileStats`(`metrics.ts:736-753`)。零额外遍历。
- **价值**:均值被长尾/失败重试拉偏;分位数是 Langfuse 默认做法;与 M7(均值混入失败)一起修最划算。
- **成本:小**(在 M1 修复的同一函数内完成)。

### E2 命令成功率(成功/失败/执行中)

- **数据来源**:`CommandNode.outcome.kind: 'success' | 'error'`(执行中为 null,`conversation.d.ts:251-257`);`commandRows`(`metrics.ts:770-780`)已遍历 command 节点,顺带收集 outcome 即可。
- **价值**:命令只统计次数、不看成败;命令失败往往意味着用户指令被吞。失败命令的 `outcome.text` 可 hover。
- **成本:小**。

### E3 完成原因近似分布 + 截断浪费量化

- **数据来源**:`anomalies` 已分别计数(`metrics.ts:509-533`):`turn-max-tokens`=触顶、`interrupted` assistant=中断、`turn-error`=失败、`toolCalls.length>0`=工具循环、其余=正常停止;触顶请求的 `outputTokens` 合计(浪费量)按 turn 关联 `requestSeries`(`metrics.ts:572-633` 已有 outputTokens)。
- **价值**:直击 DeepSeek 高频的 max-tokens 截断问题——"触顶浪费了多少输出预算";上轮 S6 的近似版。
- **成本:小**(精确 finish reason 需框架暴露 `FinishReason`/`TurnEndReason`,当前不可得,UI 标注"近似")。

### E4 在途并发曲线(in-flight requests)

- **数据来源**:`RequestSample.startedAt/completedAt`(`metrics.ts:38-40`,running 的 completedAt=null)做事件扫描,排序后 O(n) 扫描峰值并发,O(n log n) 总计。
- **价值**:识别"串行空转 vs 并行堆积";卡顿时看并发是否堆积成山;与请求密度图并排。
- **成本:小-中**。

### E5 单请求解码耗时 / tok/s 列

- **数据来源**:`AssistantTiming.completedTime − firstTokenTime`(assistant 节点 timing,`metrics.ts:544-547` 已读同一 timing 对象;`conversation.d.ts:70-77` 的 `completedTime` 恒在),按 `resultSeq` 关联请求,`outputTokens` 即解码量。
- **价值**:整日志解码速度已有,缺逐条证据——"输出 10K token 是不是拖慢主因";请求表加一列即可。
- **成本:小**(上轮 S8,TTFT 关联键已修好,直接可做)。

### 低成本补充(E6–E8)

- **E6 提示词/工具挂载膨胀趋势**:`details.promptSystemChars` + `promptToolNames.length`(`metrics.ts:618-619` 已算),趋势区加一条折线即可,成本极小(上轮 S11 落地)。
- **E7 错误码归因**:`TurnErrorNode.code`(`conversation.d.ts:148`),错误分类卡加"按 code"二级标签;429 限流 vs 服务端错误一目了然,成本小-中(上轮 S13)。
- **E8 累计 token 曲线(cumulativeUsage)**:ui-trajectory 的 `requestNumbers` 折叠已为每个请求携带 `cumulativeUsage`(见 `docs/dsh-browser-plugin-api-reference.md:313`),**无需框架新 API**——只需在本地 `trajectory-contract.ts` 的 `TrajectoryRequestView` 加一个可选字段并在 `requestSeries` 透出,即可画出"会话累计 token"曲线,顺带做窗口/全量对齐校验,成本极小。

---

## 5. 分级清单(各 TOP5)

### A 级(bug / 功能失效 / 数据错,应优先修)

| # | 问题 | 位置 |
|---|---|---|
| A1 | **M1** modelSplit.costUsd 恒 0 → 按模型成本堆叠图与模型行成本列永久空白 | metrics.ts:654-689;DashboardView.tsx:1194, 1585 |
| A2 | **M2** 工具计数两套规则(直方图 vs 其余),且子调用仅一层漏计 | metrics.ts:471-478 vs 438-460 |
| A3 | **M3** TTFT 趋势头部"窗口均值"实为全量,标注误导 | metrics.ts:1066;DashboardView.tsx:637;locales.ts:173 |
| A4 | **M4** 耗时趋势合计为全量值却带"窗口合计"tooltip | metrics.ts:1069;DashboardView.tsx:625 |
| A5 | **M5** noProgress 对缺 usage 请求误报"无进展" | metrics.ts:1024-1026 |

### B 级(推荐,口径/健壮性增强)

| # | 问题 | 位置 |
|---|---|---|
| B1 | **M16** TTFT 关联静默降级无提示(resultSeq ↔ legacy seq 发散时全 null) | metrics.ts:1070, 675, 1080;DashboardView.tsx:1469 |
| B2 | **M15** DEEPSEEK_PRICES 静态硬编码 + reasoner 正则判定脆弱(网关别名静默按 chat 价) | metrics.ts:374-396, 380-382;locales.ts hint.cost |
| B3 | **M10** ttftStats 与 ttftByCache 样本集不一致(是否含 running) | metrics.ts:765-767 vs 1079 |
| B4 | **M8** 耗时趋势 running 请求画 0 柱,与命中率图策略相反 | DashboardView.tsx:494-499 vs 502-509 |
| B5 | **M12** 概览卡"平均首字延迟"/命中率缺"全量"徽标,与趋势窗口值混淆 | DashboardView.tsx:1342-1347, 583 |

### C 级(可选/打磨)

| # | 问题 | 位置 |
|---|---|---|
| C1 | **M13** 搜索/渲染/导出 O(n²)(metrics.details.find) | DashboardView.tsx:320, 337, 277 |
| C2 | **M11** context 占用曲线压缩点无标记、>100% 被封顶 | metrics.ts:1100-1108;DashboardView.tsx:548-554 |
| C3 | **M9** 命中率 sparkline 未排除 running,与趋势图不一致 | DashboardView.tsx:1234-1236 |
| C4 | **M7** modelSplit 平均耗时混入失败/重试请求 | metrics.ts:671-674 |
| C5 | **M6** assistantTtft 冗余空判断(死代码) | metrics.ts:545-546 |
| (附) | **M14** retryWaitMs 的 retryDelayMs 语义假设未文档化 | metrics.ts:933-936 |

---

## 6. 总结

上轮 9 个 bug 中 B1/B2/B3/B4/B6/B7/B8 共 7 项已修复、B5 与 B9 未修;本轮在已修复代码上又发现 **14 个新问题(M1–M14)**,其中 **1 个高置信度功能失效回归(M1:modelSplit.costUsd 从未累加,按模型成本图与模型行成本列是死功能)**、2 个展示口径错标(M3 全量均值冒充窗口、M4 全量合计配窗口 tooltip)、1 个统计口径分裂残留且升级(M2 工具计数两套规则 + 子调用仅一层漏计),其余为误报边界(M5)、样本集不一致(M10)、运行中展示(M8/M9)、标注缺失(M12)与打磨项。定价与 TTFT 主链路经复核口径正确:成本公式 `(uncached+write)×miss + read×hit + output×out`(metrics.ts:390-395)与 DeepSeek 官方 2025-09 定价(chat 未命中 $0.27/命中 $0.07/输出 $1.10,reasoner $0.55/$0.14/$2.19,缓存写入按未命中价计)一致,但价格硬编码且 reasoner 判定靠正则,建议标注定价日期并定期复核;推理占比已改为窗口÷窗口,与每请求推理占比口径对齐。新指标 E1–E5 全部可从现有字段(series.durationMs、CommandNode.outcome、anomalies、startedAt/completedAt、assistant timing)直接派生,成本小;E8(cumulativeUsage)无需框架新 API,仅需扩展本地契约字段。建议修复顺序:A1(M1)→ A2(M2)→ A3/A4(口径标注)→ A5 → B 级(与 E1/E3 一起做),总工作量约 1 天。
