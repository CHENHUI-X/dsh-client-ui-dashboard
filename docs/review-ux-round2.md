# DSH 看板插件 · 交互易用性复审报告(Round 2)

> 评审对象:`dsh-client-ui-dashboard`(src/client/DashboardView.tsx 1756 行、charts.tsx 625 行、dashboard.css.ts 323 行、locales.ts 452 行、metrics.ts 1173 行),对照 docs/review-ux.md 上轮 B1-B15 / S1-S12 逐条核对,并排查第三轮大修(commit 9f9d6a5)之后的新交互问题。
> 评审方式:代码逐行核对(行号随文标注,以本报告撰写时的 HEAD 为准);无联网取证、无运行验证。
> 结论速览:**新发现 11 个问题(1A/5B/5C),0 回归**;上轮 15 个 bug 中 7 个已修复、4 个部分修复、3 个未修复、1 个待验证。

---

## 第一部分:上轮 B1-B15 核对表

| 编号 | 状态 | 行号证据(当前 HEAD) | 说明 |
|---|---|---|---|
| B1 成功行键盘无法内联展开 | **未修复** | DashboardView.tsx:370(chevron `tabIndex={-1}`)、377-383(其 onKeyDown 因不可聚焦而无效)、1023-1028(行 Enter/Space → onRowClick)、356-361(成功行 onRowClick = `jumpTo`) | chevron 仍不在 Tab 序列;键盘用户对成功行按 Enter 直接跳走,永远无法展开详情。仅有的缓解:详情面板新增 `.dshd-jumpText` 跳转按钮(162-164),但那是"展开后跳转",不解决"展开不可达"。 |
| B2 时间线圆点焦点环被内联样式屏蔽 | **已修复** | charts.tsx:601-606(圆点 style 仅剩 `cursor`,内联 `outline:"none"` 已删);dashboard.css.ts:194(`circle:focus-visible` 焦点环保留)、272(全局 `:focus-visible`) | 圆点 `tabIndex={0}`(602)+ CSS 焦点环生效,焦点可见。 |
| B3 表格列头纵向滚动消失 | **部分修复** | dashboard.css.ts:115(`overflow-x:auto` wrapper 未变)、117(`th` 的 `position:sticky` 已删除) | 失效的 sticky 被移除(不再有"宣称与实现不符"),但未实现替代方案(wrapper `max-height`+`overflow-y` 或页内常驻表头),长表格滚出视口后列名依旧不可见,问题本体仍在。 |
| B4 搜索/筛选组合空态文案错误 | **部分修复** | DashboardView.tsx:828-864(表格视图三态空态 + "清除搜索"按钮已实现) | 表格视图已正确分派 `empty.search` / `empty.requestsFiltered` / `empty.requestsTable`;但①搜索+筛选**双无命中**时只显示搜索空态+清除搜索,不提示筛选也为空;②分组视图空态(993-997)只判断 search、忽略 filter≠all,且无清除动作(见新问题 N5)。 |
| B5 JSON 导出忽略搜索/视图 | **已修复** | DashboardView.tsx:270-309(`exportJson` 基于 `searched`(filter+search),payload 含 `filter/search/view`)、306(文件名含 view)、locales.ts:208/433(文案"含筛选与搜索") | 所见即所得恢复;注意导出对分组视图仍是平铺(276),但元信息已写明 view,属可接受设计。 |
| B6 运行中行位移/翻页漂移 | **部分修复** | DashboardView.tsx:455-458(非首页新数据置 `newArrived`)、911-915("回到最新"横幅) | 横幅已加,但内容锚定(按首行 seq 保持位置)未实现:page=0 时无横幅且最新行仍实时插入、分组视图依旧位移;且横幅存在误报(见新问题 N6)。 |
| B7 分组视图无上限 DOM 爆炸 | **未修复** | DashboardView.tsx:936-992(全量渲染所有组×所有行,无"显示前 N 条/展开更多";错误按完整 message 分组) | 表格有 10/20/50 分页,分组视图无任何上限,长会话渲染量与 1 秒 tick 叠加仍会卡。 |
| B8 分组折叠状态跨视图串扰 | **已修复** | DashboardView.tsx:938(`gkey = \`${view}:${g.key}\``) | 折叠 key 已加视图前缀。("全部展开/收起"入口属 S 级建议,未采纳。) |
| B9 aria-live 每秒重复播报 | **部分修复** | DashboardView.tsx:1283-1304(流式行 `role="status"` 已移除,commit 9f9d6a5 diff 确认) | 流式行噪音已除;但 stuck 告警 `role="alert"`(1291-1293)文本含每秒变化的 `formatMs(elapsed)`,运行中仍每秒强制播报(见新问题 N3)。 |
| B10 图表悬停浮标无键盘/ARIA 替代 | **未修复** | charts.tsx:108(Donut svg `role="img"` 无 label)、258-299(SeriesBars 无 role/label)、413(AreaChart svg 无 label)、482(RadialGauge 无 label);值仅出现在 271-286 / 423-448 鼠标悬停浮标 | 唯一例外:ModelTimeline 已带本地化 ariaLabel 与可聚焦圆点(587、601-606)。其余四图数值对键盘/读屏不可达。 |
| B11 轮次耗时卡静默截断 12 条 | **已修复** | metrics.ts:876(`slice(0,12)` 保留);DashboardView.tsx:1544-1546(`turnTimings.size > turnDurations.length` 时显示 `hint.turnTail`) | 截断提示已补(locales.ts:38 "仅显示最近 12 轮…")。 |
| B12 硬编码英文 aria | **已修复** | charts.tsx:587(`ariaLabel ?? "model timeline"`);DashboardView.tsx:1602(传 `t("aria.modelTimeline")`) | 已走 NS 字典(zh:44 / en:269)。 |
| B13 hint "?" 无语义 | **已修复** | DashboardView.tsx:68(`role="button" tabIndex={0} aria-label={props.label}`) | 已补 role/label。 |
| B14 跨视图状态保持风险 | **未验证** | DashboardView.tsx:259-314(所有状态仍是 TrendSection 局部 `useState`;无模块级 store/sessionStorage) | shell 挂载/卸载策略属 `@deepseek-ai/dsh-client-ui-conversation` 宿主,本仓库无法验证;风险依旧存在。 |
| B15 分组视图表格无列头 | **已修复** | DashboardView.tsx:972-985(分组视图 `<thead>` 已补,列数与表格视图一致 8+1) | 三视图列标签已可读。 |

---

## 第二部分:上轮 S1-S12 采纳状态

| 编号 | 建议 | 状态 | 证据 |
|---|---|---|---|
| S1 表格列排序 | 未采纳 | 表头仍不可点击(DashboardView.tsx:813-824 纯 `<th>` 文本) |
| S2 行点击语义解耦 | **部分采纳** | 详情面板拆出独立跳转按钮 `.dshd-jumpText`(162-164),行 hint tooltip 区分文案(347-355);但成功行"整行点击=跳转"未改(356-361),"点击行=展开"的统一心智仍未建立 |
| S3 筛选/视图计数徽标 | **已采纳** | `dshd-badge`(DashboardView.tsx:770、789;CSS:317) |
| S4 "只看告警"模式 | 未采纳 | 无告警过滤/折叠入口 |
| S5 Sticky 锚点 chips + 语义着色 | 未采纳 | sticky 汇总条在(CSS:214)但无 section 锚点 chips;失败数无红色语义色(1242-1255 纯文本) |
| S6 搜索增强(命中计数/高亮/Esc) | 未采纳 | `type="search"` 的原生清除/Esc 仅 Chrome 可用;无命中计数与高亮 |
| S7 空态引导升级 | **部分采纳** | 整页空态含引导文案(locales.ts:8 "开始一段对话后…"),图表空态"发送一条消息试试"(9);但无"前往对话页"行动按钮 |
| S8 趋势图量级标签与基线 | **部分采纳** | `showMaxTag` 最大值标注已全图铺开(591-749);Y 轴刻度/基线网格未加 |
| S9 隔离 1 秒 tick 级联重渲染 | 未采纳 | clock 每秒 `setState`(1054-1058)仍重渲染整棵树;`jumpTo` 每次渲染重建(1105)、TrendSection 未 memo(1752) |
| S10 工具 args 溢出交互 | 未采纳 | 仍仅 `title` hover 全文(DashboardView.tsx:234;CSS:150 单行截断) |
| S11 导出格式扩展(CSV) | 未采纳 | 仅 JSON |
| S12 偏好记忆(localStorage) | 未采纳 | 刷新即丢 |

---

## 第三部分:新发现交互问题 N1-N11

按影响排序。每条:位置 / 问题 / 为什么 / 修复建议。

### N1(B)「视图切换」是伪 Tabs 模式:读屏按 Tabs 宣布,键盘协议缺失
- **位置**:DashboardView.tsx:755-773(`role="tablist"` / `role="tab"` / `aria-selected`),755 行 tablist 的 `aria-label={t("section.summary")}`(即"摘要",语义错误)。
- **问题**:四个视图按钮被标成 `role="tab"`,但既没有 Tabs 模式要求的 ←/→ 方向键 + roving tabindex,也没有关联的 `aria-controls`/tabpanel。读屏用户听到"标签页 1/4"后按方向键毫无反应;tablist 的可访问名称还是"摘要",与"视图切换"无关。
- **为什么**:WAI-ARIA Tabs pattern 是"宣布即承诺"——标成 tab 就必须支持方向键,否则是比普通按钮更差的体验(误导 + 不可用)。
- **修复建议**:二选一:①最简——去掉 `role="tablist"/role="tab"/aria-selected`,改用普通按钮 + `aria-pressed`(与下方状态筛选按钮 776-791 一致);②完整实现 Tabs pattern(roving tabindex + ←/→ + `aria-controls` 指向内容容器)。并把 tablist/组 aria-label 换成新字典键如 `view.tabs.aria`("切换明细视图")。

### N2(B) 请求表格与筛选组的 aria-label 错配,专用文案键被闲置
- **位置**:DashboardView.tsx:775(`role="group" aria-label={canJump ? t("req.rowHint.jump") : t("req.rowHint.expand")}`)、812(`<table aria-label=…>` 同值)。
- **问题**:筛选按钮组和请求明细表的可访问名称都成了行操作提示("点击行 → 跳转到轨迹视图查看该请求"),而 locales 里专门定义的 `section.requests`="请求列表(点击行展开详情)"(locales.ts:46/271)从未被引用——读屏用户把整张表听成一句操作说明,无法得知这是请求明细表。
- **为什么**:`aria-label` 应描述控件自身的身份/用途,而不是其内部行的行为;且已有正确文案键却不用,属明显遗漏。
- **修复建议**:表格 → `aria-label={t("section.requests")}`;筛选组 → 新增键(如 `req.filter.aria`="按状态筛选请求,可搜索与导出")。分组视图内表格(972)`aria-label={g.label}` 可保留。

### N3(A) stuck 告警 `role="alert"` 每秒强制播报(承接 B9 未竟之处)
- **位置**:DashboardView.tsx:1290-1294(`<span role="alert">` 文本为 `t("status.stuck").replace("{s}", formatMs(x.elapsed))`)、1054-1058(运行中每秒 clock tick 重渲染)。
- **问题**:告警文本里嵌入了每秒增长的计时(`formatMs(elapsed)`),role="alert" 是 assertive live region——文本每变一次就强制打断读屏播报一次。请求卡住 10 分钟 = 读屏被轰炸 600 次,告警本身反而被淹没。B9 只移除了流式行 `role="status"`,这条告警通道仍在每秒重播。
- **为什么**:live region 播报以 DOM 文本变化为触发;把"动态计时"放进"告警"等于把变化频率最高的内容放进播报区。
- **修复建议**:把计时秒数拆出 live region(独立无 role 的 `<span>`,如 `请求 #3 未出首字 · <span>61s</span>`),告警本体只含静态文案;或 useRef 记录上次播报文本,仅当 seq 集合/跨分钟阈值变化时才更新 alert 节点。运行中 tool chips(1295-1302)同理可保持无 role。

### N4(B)「按错误」视图混入"成功请求"组,徽标与实际内容不符
- **位置**:DashboardView.tsx:434(`else key = s.status === "error" ? (s.error ?? t("unknown")) : t("stat.requests.ok")`)、451(`viewCounts.error = 错误消息种类数`)。
- **问题**:error 视图把所有非错误请求归进一个"成功请求"组——用户看到徽标"按错误 (3)"(3 个错误种类),点开后却出现 4 个组,其中一个"成功请求"可能含几百行,把真正的错误组淹没(也加剧 B7 的 DOM 爆炸)。另外当 `s.error` 为空字符串时(metrics.ts:840 对空串有 "(no message)" 归一,这里没有),组标签为空白。
- **为什么**:视图命名承诺"只按错误聚合",实际却包含全部数据;徽标口径(种类数)与组数不一致,破坏"所见即所得"。
- **修复建议**:error 视图只聚合 `searched.filter(s => s.status === "error")` 的行,徽标随之改为错误请求数(或维持种类数但保证组数一致);空串错误统一归一为 `t("unknown")` 或 "(no message)"。若刻意保留成功组,则改 tab 文案并说明。

### N5(B) 分组视图空态忽略筛选维度,且无清除动作(与表格视图不一致)
- **位置**:DashboardView.tsx:993-997(`search.trim().length > 0 ? t("empty.search") : t("empty.requestsTable")`)。
- **问题**:filter="error" 且无错误时,分组视图显示"暂无请求记录"——数据明明存在,误导用户以为没数据;也没有"清除筛选/清除搜索"按钮。表格视图(828-864)已做三态 + 清除按钮,同一区块内行为分裂。
- **为什么**:B4 修的是表格视图,分组视图漏了同一逻辑。
- **修复建议**:与表格视图同构:`search` 非空 → `empty.search` + 清除搜索按钮;`filter !== "all"` → `empty.requestsFiltered` + 清除筛选按钮;两者皆空 → `empty.requestsTable`;按钮复用 `.dshd-clearFilter` 样式。

### N6(B) "有新请求 → 回到最新"横幅误报(筛选/搜索变化触发)
- **位置**:DashboardView.tsx:455-458(`useEffect` 仅判断 `total > prevLen.current && safePage > 0` 置位)、911-915(横幅)。
- **问题**:在 page>0 时把筛选从"进行中"切到"全部"、或清空搜索词,`searched` 总数跳增 → 误判"有新请求",横幅凭空出现;且横幅只能由自身按钮清除,用户手动翻页回到第 1 页后横幅仍挂着。
- **为什么**:用"总数增长"代替"真的有新 seq 到达",把筛选/搜索引起的变化误报为实时数据到达。
- **修复建议**:改为监听最新请求 seq 增长(如 `metrics.series[0]?.seq` 或最新 startedAt),或与 `prevLen` 同存上次 maxSeq 对比;并在 `safePage === 0` 或用户主动翻页时清除 `newArrived`。

### N7(C) 分组头 chevron 永不旋转,展开态无视觉指示
- **位置**:DashboardView.tsx:962(分组头内 `<span className="dshd-chevron" data-open=…>▸</span>`);dashboard.css.ts:130(旋转规则仅 `tr[data-open] .dshd-chevron`)。
- **问题**:表格行展开时 ▸ 会旋转 90°(CSS:130),但分组头不在 `tr[data-open]` 下,规则永不命中——分组展开/收起只能靠内容消失判断,视觉反馈缺失。附带:该 span 的 ▸ 字符进入按钮可访问名称,读屏会报"黑色右三角"噪音。
- **修复建议**:补 `.dshd-groupHead[aria-expanded="true"] .dshd-chevron{transform:rotate(90deg)}`;给该 span 加 `aria-hidden="true"` 去掉字符噪音。

### N8(B) 模型时间线最多 60 个 Tab 停靠点,且 role="img" 内含交互子元素
- **位置**:charts.tsx:587(容器 `role="img" aria-label=…`)、601-606(每个圆点 `role="button" tabIndex={0}`)。
- **问题**:降采样后仍最多 60 个圆点,每个都是独立 Tab 停靠点,键盘用户要连按 60 次 Tab 才能遍历完;且容器被标为 `role="img"`(整图=一张图像)内部却嵌 60 个可聚焦按钮,ARIA 语义自相矛盾——读屏既可能把整图当图像跳过,又可能在图像内报按钮。
- **为什么**:`role="img"` 应包含非交互内容;每点一个 tabindex 是把"可视化信息"误当成"60 个独立操作"。
- **修复建议**:只让关键点可聚焦——如模型切换点(`switchSeqs`)+ 最新点,其余点 `tabIndex={-1}` 并保留 aria-label 供读屏;或改用单项控件(select/slider 选 seq)。容器去掉 `role="img"`,改为普通 div + 说明文本(`aria.modelTimeline` 文案移到 `<div role="note">` 或保留在容器 aria-label 上,子元素不再交互矛盾)。

### N9(C) 导出无任何反馈,空视图也导出空数组
- **位置**:DashboardView.tsx:804-806(导出按钮仅 `title`,无禁用/反馈)、270-309(`searched` 为空时仍生成并下载空数组文件)。
- **问题**:点"导出 JSON"后无 aria-live 播报,下载对读屏/低视力用户不可感知;视图为空时照样生成 `requests: []` 文件,用户以为导出成功。
- **修复建议**:`searched.length === 0` 时禁用按钮并给 title 提示;导出成功后用 `role="status"` 播报"已导出 N 条请求"。

### N10(C) 搜索框无常驻清除入口(非 Chrome 无 Esc 清除)
- **位置**:DashboardView.tsx:793-803(`type="search"` 输入框)、834-843("清除搜索"按钮只在空态出现)。
- **问题**:Chrome 对 `type="search"` 原生提供 × 与 Esc 清除,Firefox/Safari 没有;空态之外的"清除搜索"按钮不存在,非 Chrome 用户必须全选删除。
- **修复建议**:输入框右侧常驻清除按钮(searched 非空时显示),或接受 S6 的命中计数一并做。

### N11(C) openSeq 跨视图串扰:切视图后详情"凭空"保持展开
- **位置**:DashboardView.tsx:259(`const [openSeq, setOpenSeq] = useState<number|null>(null)`)、338/986(表格与分组视图共用 renderRow/openSeq)。
- **问题**:在表格视图展开 seq 8,切到"按轮次/按模型/按错误"后,若 seq 8 恰在该视图的某组里,详情面板保持展开——用户没有在新视图做过任何展开操作,却看到一块详情,上下文断裂。
- **为什么**:折叠态已按视图前缀隔离(N8 修复),展开态却仍是全局单值。
- **修复建议**:`setView` 时顺带 `setOpenSeq(null)`(764-767),或把 openSeq 也纳入 `{view}:` 前缀状态。

---

## 第四部分:分级 TOP5

### A 级(必修 bug)
| # | 问题 | 性质 |
|---|---|---|
| 1 | **N3** stuck 告警每秒重播(role="alert" 含动态计时) | 新,读屏硬伤 |
| 2 | **B1** 成功行键盘无法展开(chevron tabIndex=-1) | 未修复,可访问性硬伤 |
| 3 | **B10** 图表数值对键盘/读屏不可达(四图无 label/无键盘) | 未修复,可访问性硬伤 |
| 4 | **B7** 分组视图全量渲染、无上限(长会话 DOM 爆炸) | 未修复,性能/稳定性 |
| 5 | **B6** 运行中行位移与翻页内容漂移(无内容锚定) | 部分修复,监控主流程打断 |

### B 级(推荐改进)
| # | 问题 |
|---|---|
| 1 | **N2** 表格/筛选组 aria-label 错配(section.requests 键闲置) |
| 2 | **N1** 伪 Tabs 模式(role="tab" 无方向键、tablist 名称错误) |
| 3 | **N4** "按错误"视图混入"成功请求"组,徽标与内容不符 |
| 4 | **N5** 分组视图空态忽略筛选、无清除动作 |
| 5 | **N8** 模型时间线 60 个 Tab 停靠点 + role="img" 内嵌交互矛盾 |

### C 级(可选)
| # | 问题 |
|---|---|
| 1 | **N6** "有新请求"横幅在筛选/搜索变化时误报 |
| 2 | **N7** 分组头 chevron 无展开旋转反馈 |
| 3 | **N9** 导出无反馈、空视图导出空数组 |
| 4 | **N10** 搜索无常驻清除按钮(非 Chrome) |
| 5 | **N11** openSeq 跨视图串扰,详情凭空展开 |

**落地建议**:A 级中 N3/B1/B10 都是几行内可修(拆计时出 live region、chevron 改 `tabIndex={0}`、四图补 `aria-label` + 可聚焦点);B6/B7 属中型(内容锚定、分组限流),可与上轮 S2/S1 一起排期。B 级五项均为小改动,建议随下一轮一起清掉。

---

**总结**:新发现 11 个问题(1A/5B/5C),0 回归;上轮 15 项中 7 修复、4 部分、3 未修、1 待验。交互契约(行点击语义、实时位移、空态、告警播报)仍是主要矛盾,键盘可达性缺口集中在 B1/B10/N1/N8。
