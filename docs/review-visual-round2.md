# DSH 看板插件 · 视觉/审美审查报告 Round 2(review-visual-round2)

> 审查对象(修复后现状):`dashboard.css.ts`(323 行纯 CSS-in-TS)、`DashboardView.tsx`(1756 行)、`charts.tsx`(625 行)。
> 审查方式:纯静态代码审读(无浏览器渲染能力;对比度与 color-mix 表现依赖 DSH 主题 token,只评结构性风险,不逐项实测)。上轮 24 条编号问题(B1–B6、C1–C2、D1–D5、H1–H5、F1–F2、N1–N4,上轮表格列了 23 条,漏列 B6)逐条核对;`--dsw-alias-*` 变量名已与 DSH harness(node_modules/@deepseek-ai/*、`--dsw-shadow-lv1/2/3`)交叉验证,报告中只引用真实存在的 token。
> 本轮大修已完成的主要改动:双调色板统一(`modelColor` 哈希)、跳转按钮拆分(`dshd-jumpText` 胶囊 vs `dshd-jump` 方形)、tooltip 边缘位移保留(`--tip-dx`)、running 统一蓝、emoji 换主题化文本徽标(`dshd-healthTag`)、直方图基线 + 0 桶、环形图单段整圆、卡片 hint 换行、StatCard sub 紧凑化、金额 `fmtCost` 自适应、分组名/统计值截断、模型时间线方向标注——以上均已在本轮核对中逐条确认。

---

## 一、上轮问题核对表(状态 + 行号)

| # | 问题 | 状态 | 证据(修复后行号) |
|---|------|------|------|
| B1 | `.dshd-jump` 重复规则 → 详情跳转按钮破相 | ✅ 已修复 | `.dshd-jumpText` 胶囊(css.ts:306–307)+ `.dshd-jump` 方形(css.ts:308–309)拆分;详情面板用 jumpText(DashboardView.tsx:163),表格行用 jump(399–408),重复规则已删 |
| B2 | 模型配色双调色板不一致 | ✅ 已修复 | 收敛为 `MODEL_COLORS` + `modelColor()`(charts.tsx:527–544);横条(DashboardView.tsx:1192)、成本堆叠(1585)、时间线圆点(charts.tsx:597)、图例(618)全部走同一哈希;原 PALETTE 已删除,仅剩用途不同的 `TOOL_COLORS`(55–62,工具/命令专用) |
| B3 | 面积图边缘 tooltip 垂直位移丢失 | ✅ 已修复 | css.ts:298 `.dshd-areaWrap .dshd-vtip{transform:translate(var(--tip-dx,-50%),calc(-100% - 6px))}`;charts.tsx:435–443 按位置写 `--tip-dx` 内联变量,垂直位移保留 |
| B4 | running 状态双色并存 | ⚠️ 部分修复 | 头部 live 胶囊已改蓝(css.ts:50)、表内 running 徽标蓝(134)——**但直播行圆点 `.dshd-streamDot` 仍是 success 绿 + 脉冲(css.ts:209)**,与头部蓝胶囊并排出现,running 双色只剩这一处 |
| B5 | 吸顶表头与汇总条重叠 | ✅ 已修复 | `th` 的 sticky 已移除(css.ts:117 无 position:sticky),仅汇总条 sticky(css.ts:214),重叠消失(方案 a) |
| B6 | 表情符号 🔁/🐢 与主题冲突 | ✅ 已修复 | 换为 `.dshd-healthTag[data-k=loop/noProgress]` 主题化文本徽标(css.ts:320–322,DashboardView.tsx:1712/1719);全站告警统一保留 ⚠ 字形(4 处:235/341/967/1194) |
| C1 | 工具/耗时/推理跨卡配色漂移 | ❌ 未修复 | 上下文构成 tools 仍 error 红(css.ts:36);工具直方图/耗时 Top 仍 `TOOL_COLORS` 轮转色(DashboardView.tsx:1184/1566);工具风暴琥珀(1734)与 toolTime 琥珀(css.ts:34)一致但与前两者无关;"耗时"家族(duration 趋势 497、TTFT 519/642、直方图 1511、turnFill 256)统一了 reasoning 混色,但 TTFT 与 duration 同色无法区分,且与 Timing 卡堆叠(llm 蓝 + tool 琥珀,1460–1468)无共同锚点 |
| C2 | 环形图单段 15px 缝隙 | ✅ 已修复 | charts.tsx:83–98 `n === 1` 特判 `lens = [C]` 整圆,minLen/缩放仅用于多段 |
| D1 | 迷你图终值标签 + 最大参考线 | ✅ 已修复 | `showMaxTag` 贯穿 12 张小图 + 工具风暴共 13 处(DashboardView.tsx:591/601/610/627/645/669/688/698/710/718/733/749/1738);`.dshd-maxTag`(css.ts:314) |
| D2 | 图例 ↔ 环形图 hover 联动 | ❌ 未修复 | Legend(charts.tsx:152–174)无 hover 状态、无 onHover 回调;DonutChart hover 仅作用于圆段(110–126),图例行无任何反馈 |
| D3 | 模型时间线基线轨/悬停放大/切换点增强 | ⚠️ 部分修复 | 已加方向标注 `axisHint`(charts.tsx:614,DashboardView.tsx:1601)与降采样 note(613,1600);**基线轨未加、切换点仍 1.2px 描边(598–599)、普通点无 hover 放大**(仅 focus-visible 轮廓,css.ts:194) |
| D4 | 直方图基线 + 0 桶噪点 | ✅ 已修复 | css.ts:236 `border-bottom:1px solid var(--dsw-alias-border-l1)`;DashboardView.tsx:1510 0 桶 `height:0` 不渲染 |
| D5 | 行级 hover 统一(hbar/turn/err/legend) | ❌ 未修复 | `.dshd-hbar`(css.ts:105)、`.dshd-turnRow`(253)、`.dshd-errRow`(241)、`.dshd-legendRow`(86)均无 `:hover` 背景;这些行都带 title,悬停意图明确却无视觉确认 |
| F1 | 脉冲动画收敛 | ❌ 未修复 | 三处仍在脉冲:liveDot(css.ts:52–53)、streamDot(209)、running 柱(292) |
| F2 | 吸顶汇总条发丝线 | ✅ 已修复 | css.ts:214 汇总条已有 `border:1px solid var(--dsw-alias-border-l1)` 完整描边 |
| H1 | 卡片标题语义色 accent + 分区标签 | ❌ 未修复 | `.dshd-cardTitle::before`(css.ts:63)仍是统一灰色 3px 竖条,12+ 卡无主次、无分区标签 |
| H2 | 明细区双控件行合并 | ❌ 未修复 | `dshd-viewTabs`(css.ts:174,DashboardView.tsx:755–773)+ `dshd-filters`(166,775–807)仍纵向两行,高度 24px 风格相近 |
| H3 | 统计卡"卡中卡"弱化 | ❌ 未修复 | `.dshd-stat` 仍 bg-base + 1px 边框(css.ts:71),hover 仍 `translateY(-1px)`(72) |
| H4 | grid2 钉 2 列 | ❌ 未修复 | css.ts:65 仍 `repeat(auto-fit,minmax(320px,1fr))`;根内容宽 1084px 时 auto-fit 算出 3 列(每列 ~350px),两两配对的卡(压力+注入、消息+耗时、轮次+工具、模型+异常)被拆散,压力卡仪表+堆叠条在 350px 下换行 |
| H5 | "?" 提示密度治理 | ❌ 未修复(略减) | `Hint`/`.dshd-hint`(css.ts:82)不变;当前 15 处 `hint=`(上轮 ~17 处),总览+Token 卡仍是一排灰色小圆 |
| N1 | 轴提示文案去重 | ❌ 未修复 | "→ 最新 · 最近 60 条"类 axisHint 仍重复渲染 12 处(DashboardView.tsx:593/602/611/628/648/671/690/699/711/719/735/751) |
| N2 | 成本金额自适应小数位 | ⚠️ 部分修复 | `fmtCost` 已落地(DashboardView.tsx:74–79)并用于 StatCard(1332)、详情(217)、模型行 sub(1194)、模型成本图例(1586);**但吸顶汇总条仍是 `$${total.toFixed(4)}`(1254)**,小金额 `$0.0001` 与 StatCard 的 `<$0.0001` 口径不一 |
| N3 | 表格横向滚动提示 | ❌ 未修复 | `.dshd-tableWrap`(css.ts:115–116)overflow-x:auto,无右侧淡出遮罩/阴影/滚动暗示 |
| N4 | tag 与 statusPill 视觉统一 | ❌ 未修复 | `.dshd-tag` 纯描边(css.ts:153–156)vs `.dshd-statusPill` tinted 胶囊(132–136)两套并存,详情头同排出现(见新发现 V9) |

**小结:24 条中 9 条已修复(B1/B2/B3/B5/B6/C2/D1/D4/F2),4 条部分修复(B4/C1/D3/N2),11 条未修复(D2/D5/F1/H1/H2/H3/H4/H5/N1/N3/N4)。** 上轮"第一批小成本项"基本清完,剩余未修复多为中成本/需取舍项(H1/H2/H3/H4/D2/F1/N3)与数据量驱动的项(N1/H5)。

---

## 二、新发现视觉问题(V1–V13)

### V1(溢出/截断残留,建议 A). 图例名缺 `min-width:0`,长模型名横向溢出卡片

- **位置**:`.dshd-legendName`(dashboard.css.ts:88);触发组件:`Legend`(charts.tsx:160–173)与 `StackedBar` 图例(charts.tsx:205–221),其中模型成本堆叠图例传入的是**完整模型名**(DashboardView.tsx:1584–1589)。
- **问题**:`.dshd-legendRow` 是 `inline-flex;white-space:nowrap`(css.ts:86),`.dshd-legendName` 虽有 `overflow:hidden;text-overflow:ellipsis`,但 flex item 默认 `min-width:auto` 不收缩——长模型名(如 `deepseek-v3.2-0324-exp`,`StackedBar` 图例无 title 兜底)会把行撑破 `.dshd-stackLegend` 的 wrap 容器,直接横向溢出卡片右缘,ellipsis 完全不生效。
- **修复**:`.dshd-legendName{min-width:0}`(一行);顺带 `.dshd-legendRow{max-width:100%}` 兜底。

### V2(溢出/截断残留,建议 A). axisHint 的 `white-space:nowrap` 被继承,压缩轮次列表/分位注记溢出或截断

- **位置**:`.dshd-axisHint{...white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`(dashboard.css.ts:163);内容在 DashboardView.tsx:647–654(P50/P95/P99)与 670–675(◆ 压缩轮次列表)。
- **问题**:nowrap 继承到子块 `.dshd-ttftStats`(css.ts:224,`display:block`)。压缩轮次多时,"◆ 压缩: 轮次 #1、轮次 #3、轮次 #7…"整行不换行,**从 240px 宽的 seriesCol 直接溢出卡片边界**;P50/P95/P99 行在窄列被父级 ellipsis 截断且无 title,数据不可达。
- **修复**:`.dshd-ttftStats{white-space:normal}`(仅注记块允许换行),或给该 span 加 `title` 全文。

### V3(信息不可达,建议 A). StatCard sub 截断后无 title

- **位置**:`.dshd-statSub`(dashboard.css.ts:79,282 `white-space:nowrap;text-overflow:ellipsis`);组件 StatCard(DashboardView.tsx:110)。
- **问题**:多条 sub 是复合信息——请求卡 "12 完成 · 3 运行中 · 1 错误"(1318)、缓存命中卡 sub(1373)、解码速度 sub(1352)——窄卡(<240px)下尾部被截断,而 `dshd-statSub` 元素**没有 `title` 属性**,被截内容无法读取。
- **修复**:`<div className="dshd-statSub" title={sub}>{sub}</div>`(StatCard 内一行)。

### V4(主题适配,建议 B). tooltip 阴影引用不存在的 `--dsw-alias-shadow`

- **位置**:`.dshd-vtip{box-shadow:var(--dsw-alias-shadow,0 4px 12px rgb(0 0 0 / .22))}`(dashboard.css.ts:294)。
- **问题**:`--dsw-alias-shadow` 在 DSH harness 全量 token 中**不存在**(已交叉验证:真实阴影 token 为 `--dsw-shadow-lv1/lv2/lv3`,无 `alias-` 前缀)。因此该属性永远回退到硬编码 `0 4px 12px rgb(0 0 0/.22)`——浅色主题下阴影偏重、深色主题下不随主题提亮,悬浮框与主题"脱钩"。这是上轮遗留的"已实现但破相"同类问题。
- **修复**:`box-shadow:var(--dsw-shadow-lv2,0 4px 12px rgb(0 0 0/.22))`。

### V5(可读性,建议 B). 10px 以下 label-tertiary 小字成系统性对比度风险

- **位置**:`.dshd-axisHint`(10px,tertiary,css.ts:163)、`.dshd-maxTag`(9.5px,css.ts:314)、`.dshd-modelNote`(10px,198)、`.dshd-gaugeLabel`(10px,303)、`.dshd-badge`(9.5px,317)、`.dshd-ttftStats`(10px,224)。
- **问题**:label-tertiary 是最低对比度文字 token,叠在 bg-layer-1/bg-base 上,9.5–10px 字号在浅色主题大概率 < 4.5:1(WCAG AA),而这些恰恰是用户"扫读"的注记(最大值、分位、方向提示),是本轮新增 maxTag/ttftStats 后放大的风险面。
- **修复**:10px 以下注记统一升为 `label-secondary`(maxTag/badge 已是 secondary,axisHint/modelNote/gaugeLabel 需改),或对 tertiary 小字加 `font-weight:550` 补偿。

### V6(图表细节,建议 C). maxTag 与 hover tooltip / 最新数据点重叠

- **位置**:`.dshd-maxTag`(dashboard.css.ts:314,`top:2px;right:2px;z-index:4`);AreaChart(charts.tsx:412,433–446)、SeriesBars(259,271–286)。
- **问题**:① 面积图 hover 顶部数据点时,tooltip 按 css.ts:298 上移 `calc(-100% - 6px)`,正好压住右上角 maxTag;缓存命中图 hover 100% 点 → tooltip 与 maxTag 同时显示 "100%",信息重复。② 最新点本身在右端,与右上角 maxTag 同区。
- **修复**:`.dshd-vbars:hover .dshd-maxTag,.dshd-areaWrap:hover .dshd-maxTag{opacity:0}`(hover 时隐藏,极小成本),或 maxTag 移到右下角。

### V7(截断残留,建议 C). 头部模型 chip 截断无 title

- **位置**:DashboardView.tsx:1267 `<span className="dshd-chip">{model}</span>`;`.dshd-chip` max-width:220px + ellipsis(css.ts:55,283)。
- **问题**:超长模型名在头部 chip 被截断,该 chip **无 `title` 属性**(旁边 modelSwitches chip 有),用户读不到完整模型名——表内 `.dshd-model`(131)有 title,头部反而没有,不一致。
- **修复**:`<span className="dshd-chip" title={model}>{model}</span>`。

### V8(截断残留,建议 C). `.dshd-turnName` 固定 56px 截断两位以上轮次号

- **位置**:`.dshd-turnName{width:56px}`(dashboard.css.ts:254);DashboardView.tsx:1535 `{t("turns.label")}{td.turn}`。
- **问题**:`turns.label` = "轮次 #"(locales.ts:114),"轮次 #123"(≈69px @11.5px)超出 56px 被剪,三位数轮次号显示不全;英文 "Turn #123" 同样超。
- **修复**:`width:56px` → `min-width:56px`(允许自然撑开)。

### V9(徽标混排,建议 B,与 N4 同源). 详情头四种"小标签"体系并排

- **位置**:DashboardView.tsx:146–164 同排渲染 `.dshd-tag`(纯描边,153–156)、`.dshd-statusPill`(tinted 胶囊,132–136)、`.dshd-chip`(灰底 code,55)、`.dshd-jumpText`(蓝 tinted 胶囊,306–307)。
- **问题**:四种视觉权重(无底/淡底/灰底/蓝底)挤在一行,reasoning/compaction/retry tag 是描边而 statusPill 是 tinted,用户需逐个分辨;这正是上轮 N4 未修的具象化,本轮修复后该行更挤(多了 jumpText)。
- **修复**:最小改动——tag 三个 data-k 各配 12% tint 底 + 30% 描边(与 statusPill 同构,3 行 CSS);或统一为纯描边。

### V10(细节,建议 C). 搜索框 WebKit 原生清除按钮未重置

- **位置**:`.dshd-search`(dashboard.css.ts:178–180,`type="search"`)。
- **问题**:WebKit/Blink 默认给 search input 渲染系统 ✕ 清除钮,深色主题下是亮色原生控件,与 11px 胶囊输入框风格脱节;聚焦态下突兀。
- **修复**:`.dshd-search::-webkit-search-cancel-button{-webkit-appearance:none}`。

### V11(状态反馈,建议 C). 吸顶汇总条 88% 透明,无 backdrop-filter 时内容"鬼影"

- **位置**:`.dshd-summary{background:color-mix(in srgb,var(--dsw-alias-bg-base) 88%,transparent);backdrop-filter:blur(6px)}`(dashboard.css.ts:214)。
- **问题**:th 的 sticky 已移除(B5 已修),但卡片滚过 88% 透明条时,在不支持 backdrop-filter 的环境(或禁用时)文字直接透出;F2 的描边缓解了边界但没解决透叠。
- **修复**:`@supports not (backdrop-filter:blur(6px)){ .dshd-summary{background:var(--dsw-alias-bg-base)} }`,或把透明度提到 96%。

### V12(截断残留,建议 C). seriesLabel 内 delta 徽标可能被 ellipsis 吃掉

- **位置**:`.dshd-seriesLabel{...white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`(dashboard.css.ts:161,284);DashboardView.tsx:660–667 的 `.dshd-delta` 徽标嵌在 label 尾部。
- **问题**:240px 窄列中"轮次输入"标题 + `+12,345` 徽标超宽时,ellipsis 从尾部截断,徽标(增量信息)先被吃掉;徽标本身有 title 但截断后不可见。
- **修复**:`.dshd-seriesLabel{gap:6px}` 已够,更稳做法是给 delta 加 `flex:none` 并把 label 文本包一层可截断 span(或接受现状,属低概率)。

### V13(颜色语义,建议 C). reasoning StatCard 数值用 business 蓝,与全站 reasoning 混色脱节

- **位置**:DashboardView.tsx:1371 `tone="accent"`(reasoningTokens 卡)→ `.dshd-statValue[data-accent]` 蓝(css.ts:75)。
- **问题**:推理 token 的 StatCard 数值是蓝,而推理占比/时长/TTFT/直方图/turnFill 全部是 reasoning 混色(css.ts:32)。用户从"蓝色推理数字"到"红-琥珀推理图表"之间没有语义锚点,加剧 C1 的漂移感。
- **修复**:给 statValue 增加 `data-reasoning` 变体使用 reasoning 混色,或该卡 sub 里补一句色点标注(小成本)。

---

## 三、分级与 TOP5

### A(bug,必修)TOP5

| # | 问题 | 成本 | 说明 |
|---|------|------|------|
| ★1 | **V1 图例名无 `min-width:0`,模型成本图例长名溢出卡片** | 一行 CSS | 真实数据(长模型名)必现的横向破相,ellipsis 完全失效 |
| ★2 | **V2 axisHint nowrap 继承,压缩轮次列表溢出卡片/分位注记截断** | 一行 CSS | 多次压缩会话必现;列表是实际数据,截断即丢失 |
| ★3 | **V3 StatCard sub 截断无 title,信息不可达** | 一行 JSX | 5+ 张卡的复合 sub 在窄卡下尾部不可读 |
| ★4 | **V9 详情头四种胶囊体系混排** | 3 行 CSS | N4 未修的具象残留,修复后该行视觉最乱 |
| ★5 | **V4 tooltip 阴影引用不存在的 `--dsw-alias-shadow`** | 一行 CSS | 死变量 + 恒硬编码回退,主题脱钩(上轮 B3 同类的"已实现但破相") |

### B(推荐)TOP5

| # | 问题 | 成本 |
|---|------|------|
| 1 | **V5 10px 以下 label-tertiary 小字对比度风险**(axisHint/maxTag/modelNote/gaugeLabel) | 4 处 token 替换 |
| 2 | **V6 maxTag 与 tooltip/最新点重叠** | 1 行 CSS(hover 隐藏) |
| 3 | **V7 头部模型 chip 截断无 title** | 1 行 JSX |
| 4 | **V8 `.dshd-turnName` 56px 截断轮次号** | 1 行 CSS |
| 5 | **V13 reasoning StatCard 蓝 vs 全站混色** | 1 行 CSS + 1 处 JSX |

### C(可选)TOP5

| # | 问题 | 成本 |
|---|------|------|
| 1 | **V10 搜索框 WebKit 清除按钮未重置** | 1 行 CSS |
| 2 | **V11 汇总条 88% 透明无 backdrop 兜底** | 1 行 CSS(@supports) |
| 3 | **V12 seriesLabel 内 delta 徽标被 ellipsis 吃掉** | 低概率,`flex:none` 兜底 |
| 4 | **上轮遗留小项**:N3 表格滚动提示(右缘 mask-image) | 1 行 CSS |
| 5 | **上轮遗留小项**:H5 的 ? 提示密度(改虚线点状下划线) | 1 行 CSS + 1 处组件 |

> 注:B4(streamDot 仍绿)与 D3(无基线轨/hover 放大)作为上轮部分修复项,建议随下一批小成本改动一起收尾(streamDot 改蓝 1 行;时间线基线 1 行 SVG)。

---

## 四、总结

本轮大修质量高:上轮 9 条 bug/细节项(B1/B2/B3/B5/B6/C2/D1/D4/F2)全部落实且改法干净(跳转按钮拆分、`modelColor` 单哈希、`--tip-dx` 变量、直方图 0 桶、单段整圆均无副作用);4 条部分修复中,**B4 只剩 streamDot 一处绿点**、**N2 只剩汇总条一处 `toFixed(4)`**,收尾成本各 1 行。新发现 13 条问题里没有"破相级"大 bug,但有两条数据驱动必现的溢出(V1 长模型名图例、V2 压缩轮次列表),加上 V3 sub 信息不可达,建议随下一批一起修(合计约 5 行 CSS + 2 行 JSX);其余为对比度、间距、主题适配、原生控件一致性等打磨项。整体判断:看板已达到"结构无硬伤、交互有质感"的水平,下一轮重点应放在**数据量驱动的截断与溢出兜底**(V1/V2/V3 是本轮新引入 maxTag/图例/注记的连带面)和**剩余 11 条中成本项的策略取舍**(H1 语义 accent、H4 钉 2 列收益最高)。
