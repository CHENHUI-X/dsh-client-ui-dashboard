# dsh-client-ui-dashboard

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 的实时指标看板插件。

在对话视图环中新增第三个 tab——**看板**,与「对话」「轨迹」并列。对话进行时,实时可视化当前会话的各项指标(数据来自会话快照与投影值,随事件实时更新):

![metrics](docs/metrics.png)

## 功能

| 分区 | 指标 |
|---|---|
| 总览 | 轮次、步骤、请求数(完成/进行中/失败)、工具调用与工具错误(**含失败率%**)、压缩(compaction)次数、**压缩回收 tokens 与消息条数**、**模型切换次数**、**命令数**、模型+工具总耗时、平均首字延迟(TTFT)、**估算成本(按 DeepSeek 公开价,含缓存节省)**、解码速度(tok/s)——每个指标都带 `?` 悬停解释;关键 StatCard 带**最近 60 条迷你趋势线** |
| Token 用量 | 计费输入、输出、**推理 tokens(含占输出比例)**、缓存命中(读)与缓存写入;**缓存命中率**(分子分母带标签);全程精确数值;token 构成堆叠条(附合计与输入公式 `输入 = 未缓存 + 缓存命中 + 缓存写入`);hint 标注"全量日志"口径 |
| 上下文压力 | **半圆仪表盘**展示下一次请求的预计占用率(按阈值变色:绿/黄/红)+ 系统提示/工具定义/对话内容的构成堆叠条;provider 未上报时给出明确说明;**上下文注入来源卡**(哪些生产方往上下文注入了内容、注入次数与字符量,带形式徽标:指令/目录/快照/通知/中继/召回/未知) |
| 消息构成 | **圆头环形图**(悬停扇区放大并在中心显示精确值,段间含首尾均匀间隙)+ 各角色占比(User/**转向**/Assistant/System/Tool,语义配色) |
| 耗时 | 模型 vs 工具耗时的堆叠条(附合计);**耗时分布 P50/P95/P99 + 10 桶直方图**;**TTFT 分位数**;逐轮耗时(按轮着色) |
| 工具调用 | 按工具名统计调用次数(⚠ 红色标记错误工具,**行尾显示失败率 x/y (r%)**);**工具耗时 TOP**(总耗时 + 平均 + 次数),长尾工具给出"等 N 个"提示 |
| 模型用量 | 各模型消耗的 tokens,含请求数与输入→输出拆分;**每模型平均耗时、平均 TTFT、错误数**(悬停查看 provider 与完整对比);**推理强度分布**(各档位请求数与推理 tokens);**模型时间线**——每个请求一个点按模型着色,琥珀环 = 模型切换,点击跳转轨迹 |
| 压缩效果 | 每次压缩前后上下文大小对比:压缩前 → 压缩后、回收 tokens 与回收率%;**每轮输入锯齿图标注压缩轮次** |
| 异常与重试 | 轮次错误、输出触顶(max-tokens)、模型重试、手动中断、**命令**计数;**错误分类 TOP**(按错误信息聚合);**命令明细**;**重试等待墙钟与重试请求数**;**失败请求 vs 成功请求平均耗时对比** |
| Agent 健康诊断 | **循环检测**(同工具同参数连续 ≥3 次,列出涉及请求 seq)、**无进展**(输出极少却 ≥3 次工具调用)、**工具调用密度**(分钟分桶) |
| 请求趋势 | 第一行:**缓存命中率面积图**(悬停十字线 + 精确百分比,过滤运行中/零输入样本,避免 0% 假象)+ 输入/输出/耗时**柱状图**(悬停放大浮出数值、运行脉冲、固定语义色);第二行:**TTFT 首字延迟面积图** + **每轮输入面积图**(带"较上轮"增量徽标与**压缩标记**)+ **推理占比面积图** + **缓存写入柱状图**;第三行:**请求密度与 token 密度**(分钟分桶);超过 60 条时统一标注"最近 60 条"(图头合计悬停注明口径);请求明细区——**视图切换(明细表格 / 按轮次 / 按模型 / 按错误,分组可折叠并带聚合统计)、状态筛选、实时搜索(#seq / 轮次 / 模型 / 错误 / 用途 / 工具名)、JSON 导出、翻页** |

### 实时状态行与健康信号

对话进行中,头部下方会显示一行实时状态:**正在生成的字符数(文本与推理分开显示)** + 每个正在运行的工具(名称 + 已耗时),随会话事件实时刷新(运行期间每秒自动刷新计时);**请求超 60 秒未出首字、或工具运行超 30 秒,会以红色高亮告警**。下方有**吸顶摘要条**(请求数/完成/失败/P50 耗时/压缩次数/估算成本),滚动时始终可见。

### 轨迹联动(点击请求)

看板重新声明了 conversation 插件的**共享 store handle**,因此可以像对话视图自身的 inspect 动作一样驱动视图环:

- **正常请求行点击 → 跳转轨迹**并 inspect 该请求第一个工具调用(无工具调用则**选中该请求所在轮次**,turn=0 兜底选第 1 轮,保证跳转必有落点);**失败请求行点击 → 原地展开错误详情**(看错误零成本,不把你带离看板);行尾 **↗ 按钮**显式跳转轨迹。
- 行首 **▸**(键盘可达:聚焦行后 Enter/Space,带 `aria-expanded`)原地展开完整请求详情(provider/模型、是否思考、温度、最大输出、推理强度、重试次数与延迟、开始时间、系统提示长度、挂载工具、五桶用量明细:未缓存(悬停解释公式)/缓存命中/缓存写入/输出/推理、该步骤下执行的工具调用(**参数截断可悬停查看完整内容**)、以及失败时的错误信息)。
- 请求表支持**状态筛选**(全部/进行中/完成/失败,失败行红边高亮);**筛选无结果时明确提示"没有符合当前筛选的请求"并提供"查看全部"按钮**;支持**翻页**(每页 10/20/50 条),翻页后如有新请求到达会显示"回到最新"按钮;窄容器下横向滚动 + 粘性表头,所有控件都有可见的键盘焦点环,辅助技术读到与行为一致的指引。

所有数值都来自框架标准套件(`useSession` + `useProjection`),会话事件落地即实时刷新,插件自身不做任何 host 往返。

## 安装

### 从 npm(发布后)

```sh
# 1. 把包加入 web profile
dsh plugin --profile web add dsh-client-ui-dashboard

# 2. 在 ~/.dsh/profiles/web/cordis.patch.yml 注册 loader 行
```

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
- insert:
    - id: ui-dashboard
      name: dsh-client-ui-dashboard
```

### 本地目录安装

```sh
cd ~/.dsh/profiles/web
pnpm add /绝对路径/dsh-client-ui-dashboard
```

然后同样加上面的 `cordis.patch.yml` 行。

### 3. 重启并刷新

浏览器插件在服务启动时扫描:

```sh
# 重启 dsh web(Ctrl+C 后重新运行)
dsh web
```

然后**强制刷新页面(Cmd/Ctrl+Shift+R)**,对话头部会出现新的「看板」tab。

## 依赖要求

- dsh `>= 0.1.0-rc.6`(web profile)
- 默认 `dsh-web-app` bundle 自带的 `ui-conversation` 与 `ui-trajectory` 插件

## 开发

```sh
npm install        # 安装构建与类型依赖
npm run typecheck  # tsc --noEmit
npm run build      # 产出 lib/(host 半 + client bundle + .d.ts)
```

client bundle 按 shell 的 `window.__ModuleLoader__.load({ id, factory })` 线格式输出(与官方 `@deepseek-ai/dsh-client-*` 包一致),运行时只依赖平台种子词(`react`、`react/jsx-runtime`)。

目录结构:

```
src/
  index.ts              host loader 入口(无 host 行为)
  client/
    index.ts            插件入口:注册 conversation.view tab
    DashboardView.tsx   看板视图
    metrics.ts          所有看板指标的纯派生逻辑
    charts.tsx          零依赖 SVG 图表
    locales.ts          中英文字典
    dashboard.css.ts    基于 --dsw-* 设计 token 的样式
```

## 发布到社区

```sh
npm login                      # 你的 npm 账号
npm version patch
npm publish                    # prepublishOnly 会自动先构建
```

用户随后用 `dsh plugin --profile web add dsh-client-ui-dashboard` 安装(见「安装」)。发布前确认包名在 npm 上未被占用——编写时 `dsh-client-ui-dashboard` 可用;若已被占用,改 `package.json` 里的 `name` 即可。

## 数据来源

| 指标 | 来源 |
|---|---|
| token 合计、缓存命中率 | `useProjection("tokenUsage")`——provider 上报的全量日志桶 |
| 轮次/步骤/耗时折叠 | `useProjection("sessionStats")` |
| 上下文占用 | `useProjection("contextPressure")` |
| 上下文构成 | `useProjection("contextBreakdown")` |
| 请求序列、角色分布 | `useSession(s => s.views.get("trajectory"))`——trajectory 视图快照(窗口范围) |

## License

MIT
