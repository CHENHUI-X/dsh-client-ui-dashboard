window.__ModuleLoader__.load({
	id: "dsh-client-ui-dashboard",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		"use strict";
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// src/client/index.ts
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = __toCommonJS(index_exports);

		// src/client/locales.ts
		var NS = "dashboard";
		var zh = {
		  "dashboard.title": "\u4F1A\u8BDD\u89C2\u6D4B",
		  "dashboard.activityTitle": "\u8BF7\u6C42\u8FD0\u884C\u8BB0\u5F55",
		  "dashboard.activityNote": "\u5B9A\u4F4D\u5931\u8D25\u3001\u7B49\u5F85\u4E0E\u54CD\u5E94\u6CE2\u52A8",
		  "dashboard.activityCaption": "\u6700\u8FD1\u8BF7\u6C42\u8017\u65F6",
		  "dashboard.slowest": "\u6700\u957F",
		  "dashboard.activityOrder": "\u6309\u8BF7\u6C42\u987A\u5E8F\u6392\u5217",
		  "dashboard.activityAria": "\u6700\u8FD1 60 \u6761\u8BF7\u6C42\uFF0C\u67F1\u9AD8\u8868\u793A\u8017\u65F6\uFF0C\u7EA2\u8272\u8868\u793A\u5931\u8D25",
		  "dashboard.inspectRequests": "\u67E5\u770B\u8BF7\u6C42",
		  "dashboard.performance": "\u6027\u80FD\u4E0E\u6210\u672C",
		  "dashboard.subtitle": "\u5F53\u524D\u4F1A\u8BDD\u7684\u8FD0\u884C\u3001\u7528\u91CF\u4E0E\u8BF7\u6C42\u6D1E\u5BDF",
		  "dashboard.navigation": "\u770B\u677F\u5206\u533A",
		  "dashboard.overview": "\u4F1A\u8BDD\u6982\u89C8",
		  "dashboard.analysis": "\u7528\u91CF\u4E0E\u6027\u80FD",
		  "dashboard.requests": "\u8BF7\u6C42\u660E\u7EC6",
		  "dashboard.agents": "\u534F\u4F5C\u72B6\u6001",
		  "analysis.calls": "\u8C03\u7528\u6B21\u6570",
		  "analysis.toolSummary": "{calls} \u6B21\u8C03\u7528 / {tools} \u79CD\u5DE5\u5177",
		  "analysis.toolName": "\u5DE5\u5177",
		  "analysis.totalTime": "\u603B\u8017\u65F6",
		  "analysis.avgTime": "\u5E73\u5747\u8017\u65F6",
		  "analysis.timedCalls": "\u6B21\u6709\u8017\u65F6\u8BB0\u5F55",
		  "analysis.toolTimingNote": "\u8017\u65F6\u4EC5\u7EDF\u8BA1\u6709\u5173\u8054\u8BB0\u5F55\u7684\u8C03\u7528\uFF1B\u7F3A\u5931\u663E\u793A \u2014\uFF0C\u5305\u542B\u7B49\u5F85\u7528\u6237\u64CD\u4F5C\u7684\u65F6\u95F4\u3002",
		  "analysis.noTools": "\u5F53\u524D\u7A97\u53E3\u5C1A\u65E0\u5DE5\u5177\u8C03\u7528",
		  "analysis.requestLatency": "\u8BF7\u6C42\u8017\u65F6",
		  "analysis.messages": "\u6761\u6D88\u606F",
		  "analysis.injections": "\u6B21\u8BB0\u5F55",
		  "analysis.scrollTable": "\u5DE6\u53F3\u6ED1\u52A8\u67E5\u770B\u5B8C\u6574\u8868\u683C\u3002",
		  "dashboard.analysisNote": "\u5DE5\u5177\u3001\u6A21\u578B\u4E0E\u4E0A\u4E0B\u6587\u7684\u8BE6\u7EC6\u5206\u6790",
		  "dashboard.trends": "\u8BF7\u6C42\u8D8B\u52BF",
		  "dashboard.trendsNote": "\u5C55\u5F00\u67E5\u770B\u7A97\u53E3\u5185\u8D8B\u52BF",
		  "dashboard.costNote": "\u6309\u53EF\u786E\u8BA4\u7684\u6A21\u578B\u5355\u4EF7\u4F30\u7B97",
		  "dashboard.unpriced": "{n} \u6761\u8BF7\u6C42\u672A\u8BA1\u4EF7",
		  "dashboard.latencyNote": "\u4ECE\u8BF7\u6C42\u53D1\u51FA\u5230\u9996\u4E2A\u8F93\u51FA",
		  "dashboard.speedNote": "\u8F93\u51FA\u751F\u6210\u9636\u6BB5\u7684\u5E73\u5747\u901F\u5EA6",
		  "view.dashboard": "\u770B\u677F",
		  "view.dashboard.aria": "\u5B9E\u65F6\u4F1A\u8BDD\u6307\u6807\u770B\u677F",
		  "empty": "\u6682\u65E0\u4F1A\u8BDD\u6570\u636E \u2014\u2014 \u5F00\u59CB\u4E00\u6BB5\u5BF9\u8BDD\u540E,\u6307\u6807\u4F1A\u5B9E\u65F6\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
		  "empty.requests": "\u8FD8\u6CA1\u6709\u8BF7\u6C42\u8BB0\u5F55,\u53D1\u9001\u4E00\u6761\u6D88\u606F\u8BD5\u8BD5",
		  "section.overview": "\u603B\u89C8",
		  "section.tokens": "Token \u7528\u91CF",
		  "section.messages": "\u6D88\u606F\u6784\u6210",
		  "section.contextInjection": "\u4E0A\u4E0B\u6587\u6CE8\u5165\u6765\u6E90",
		  "hint.contextInjection": "\u6BCF\u4E00\u8F6E\u8BF7\u6C42\u7684\u4E0A\u4E0B\u6587\u7531\u54EA\u4E9B\u6765\u6E90\u6CE8\u5165(role:inject=\u751F\u4EA7\u65B9\u6CE8\u5165 / recall=\u8DE8\u4F1A\u8BDD\u53EC\u56DE),\u6309\u5B57\u7B26\u91CF\u6392\u5E8F,\u60AC\u505C\u67E5\u770B\u89D2\u8272",
		  "contextRole.inject": "\u6CE8\u5165",
		  "contextRole.recall": "\u8DE8\u4F1A\u8BDD\u53EC\u56DE",
		  "contextForm.instructions": "\u6307\u4EE4",
		  "contextForm.catalog": "\u76EE\u5F55",
		  "contextForm.snapshot": "\u5FEB\u7167",
		  "contextForm.notice": "\u901A\u77E5",
		  "contextForm.relay": "\u4E2D\u7EE7",
		  "contextForm.recall": "\u53EC\u56DE",
		  "contextForm.opaque": "\u672A\u77E5\u5F62\u5F0F",
		  "section.timing": "\u8017\u65F6",
		  "section.tools": "\u5DE5\u5177\u8C03\u7528",
		  "section.models": "\u6A21\u578B\u7528\u91CF",
		  "section.turns": "\u8F6E\u6B21\u8017\u65F6",
		  "hint.turnDurations": "\u57FA\u4E8E\u5F53\u524D\u52A0\u8F7D\u7A97\u53E3(\u6846\u67B6\u53EA\u52A0\u8F7D\u6700\u8FD1\u4E00\u6BB5\u65E5\u5FD7);\u5E26 ~ \u7684\u8F6E\u6B21\u5176\u7ED3\u675F\u4E8B\u4EF6\u5728\u7A97\u53E3\u5916\u6216\u4ECD\u5728\u8FDB\u884C,\u8017\u65F6\u4E3A\u8FD1\u4F3C\u503C",
		  "req.clearSearch": "\u6E05\u9664\u641C\u7D22",
		  "view.tabs.aria": "\u5207\u6362\u8BF7\u6C42\u660E\u7EC6\u89C6\u56FE",
		  "req.filter.aria": "\u6309\u72B6\u6001\u7B5B\u9009\u8BF7\u6C42,\u53EF\u641C\u7D22\u4E0E\u5BFC\u51FA",
		  "group.tailNote": "\u4EC5\u663E\u793A\u524D {n} \u884C,\u5171 {m} \u884C\u672A\u5217\u51FA",
		  "status.stuckAlert": "\u8BF7\u6C42 #{n} \u672A\u51FA\u9996\u5B57",
		  "status.stuckTimer": "\u5DF2 {s}",
		  "aria.donut": "\u6D88\u606F\u6784\u6210\u73AF\u5F62\u56FE",
		  "aria.gauge": "\u4E0A\u4E0B\u6587\u538B\u529B\u4EEA\u8868\u76D8",
		  "aria.trend": "\u8BF7\u6C42\u8D8B\u52BF\u56FE,\u60AC\u505C\u67E5\u770B\u6570\u503C",
		  "stat.scopeAll": "\u5168\u91CF",
		  "hint.ttftByCacheMiss": "TTFT \u672A\u80FD\u5173\u8054\u5230\u8BF7\u6C42(\u6295\u5F71\u7A97\u53E3\u4E0D\u4E00\u81F4),\u547D\u4E2D/\u672A\u547D\u4E2D\u5BF9\u6BD4\u6682\u4E0D\u53EF\u7528",
		  "req.usage.cost": "\u4F30\u7B97\u6210\u672C",
		  "unit.tokens": "tokens",
		  "section.ttftByCache": "TTFT:\u547D\u4E2D vs \u672A\u547D\u4E2D",
		  "ttftCache.hit": "\u547D\u4E2D",
		  "ttftCache.miss": "\u672A\u547D\u4E2D",
		  "hint.ttftByCache": "\u547D\u4E2D/\u672A\u547D\u4E2D\u8BF7\u6C42\u7684\u5E73\u5747\u9996\u5B57\u5EF6\u8FDF(\u6837\u672C\u4E3A\u7A97\u53E3\u5185\u5DF2\u5B8C\u6210\u8BF7\u6C42,\u4E0E P50/P95 \u7EDF\u8BA1\u53E3\u5F84\u7565\u5F02)",
		  "section.modelCost": "\u6309\u6A21\u578B\u6210\u672C",
		  "hint.modelCost": "\u4EC5\u6C47\u603B\u53EF\u786E\u8BA4\u5355\u4EF7\u7684\u8BF7\u6C42\uFF1B\u5305\u542B\u672A\u8BA1\u4EF7\u8BF7\u6C42\u65F6\u4E0D\u663E\u793A\u5B8C\u6574\u6210\u672C\u3002",
		  "hint.turnTail": "\u4EC5\u663E\u793A\u6700\u8FD1 12 \u8F6E(\u7A97\u53E3\u5185\u8FD8\u6709\u66F4\u591A\u8F6E\u6B21\u672A\u5217\u51FA)",
		  "trend.rateFailed": "\u9519\u8BEF\u6570",
		  "trend.contextOcc": "\u4E0A\u4E0B\u6587\u5360\u7528\u7387",
		  "hint.contextOccTrend": "\u6BCF\u8BF7\u6C42\u8F93\u5165\u5360\u4E0A\u4E0B\u6587\u7A97\u53E3\u7684\u6BD4\u4F8B(\u538B\u7F29\u56DE\u843D\u53EF\u89C1)",
		  "health.loop": "\u5FAA\u73AF",
		  "health.noProgress": "\u65E0\u8FDB\u5C55",
		  "aria.modelTimeline": "\u6A21\u578B\u5207\u6362\u65F6\u95F4\u7EBF,\u6BCF\u8BF7\u6C42\u4E00\u4E2A\u70B9,\u70B9\u51FB\u8DF3\u8F6C\u5230\u5BF9\u5E94\u8BF7\u6C42",
		  "hint.turnOpen": "\u8BE5\u8F6E\u6B21\u7ED3\u675F\u4E8B\u4EF6\u4E0D\u5728\u5F53\u524D\u7A97\u53E3\u5185(\u6216\u4ECD\u5728\u8FDB\u884C),\u8017\u65F6\u4E3A\u7A97\u53E3\u53EF\u89C1\u8FD1\u4F3C\u503C",
		  "section.trend": "\u8BF7\u6C42\u8D8B\u52BF",
		  "section.requests": "\u8BF7\u6C42\u660E\u7EC6",
		  "stat.inputTokens": "\u8F93\u5165 tokens",
		  "stat.outputTokens": "\u8F93\u51FA tokens",
		  "stat.reasoningTokens": "\u63A8\u7406 tokens",
		  "stat.cacheHitRate": "\u7F13\u5B58\u547D\u4E2D\u7387",
		  "stat.cacheRead": "\u7F13\u5B58\u547D\u4E2D",
		  "stat.totalDuration": "\u6A21\u578B+\u5DE5\u5177\u8017\u65F6",
		  "stat.turns": "\u8F6E\u6B21",
		  "stat.steps": "\u6B65\u9AA4",
		  "stat.requests": "\u8BF7\u6C42",
		  "stat.requests.completed": "\u5B8C\u6210",
		  "stat.requests.running": "\u8FDB\u884C\u4E2D",
		  "stat.requests.error": "\u5931\u8D25",
		  "stat.tools": "\u5DE5\u5177\u8C03\u7528",
		  "stat.toolErrors": "\u5DE5\u5177\u9519\u8BEF",
		  "stat.compactions": "\u538B\u7F29(compaction)",
		  "stat.commands": "\u547D\u4EE4",
		  "stat.compactionItems": "\u6761\u6D88\u606F",
		  "stat.cost": "\u4F30\u7B97\u6210\u672C",
		  "stat.costSavings": "\u7F13\u5B58\u8282\u7701",
		  "stat.avgTtft": "\u5E73\u5747\u9996\u5B57\u5EF6\u8FDF",
		  "stat.decodeSpeed": "\u89E3\u7801\u901F\u5EA6",
		  "stat.contextOccupancy": "\u4E0A\u4E0B\u6587\u5360\u7528",
		  "hint.inputTokens": "\u8BA1\u8D39\u8F93\u5165 = \u672A\u7F13\u5B58 + \u7F13\u5B58\u547D\u4E2D + \u7F13\u5B58\u5199\u5165\u3002\u8FD9\u662F provider \u4E0A\u62A5\u7684\u5168\u91CF\u65E5\u5FD7\u503C\u3002",
		  "hint.outputTokens": "\u6A21\u578B\u751F\u6210\u7684\u8F93\u51FA tokens(\u5168\u91CF\u65E5\u5FD7)\u3002\u82E5 provider \u5C06\u63A8\u7406\u8BA1\u5165 completion,\u6B64\u503C\u542B\u63A8\u7406 tokens\u3002",
		  "hint.reasoningTokens": "\u601D\u7EF4\u94FE(chain-of-thought)\u63A8\u7406 tokens,\u4EC5\u90E8\u5206\u6A21\u578B\u4E0A\u62A5;\u7A97\u53E3\u5185\u7EDF\u8BA1,\u4E0E\u5168\u91CF\u8F93\u5165/\u8F93\u51FA\u5361\u53E3\u5F84\u4E0D\u540C\u3002",
		  "hint.cacheHitRate": "\u7F13\u5B58\u547D\u4E2D tokens \xF7 \u8BA1\u8D39\u8F93\u5165 tokens(\u5168\u91CF\u65E5\u5FD7)\u3002\u547D\u4E2D\u7387\u8D8A\u9AD8,\u8F93\u5165\u6210\u672C\u8D8A\u4F4E\u3002",
		  "hint.uncached": "\u672A\u7F13\u5B58\u8F93\u5165 = \u672C\u6B21\u8BF7\u6C42\u672A\u547D\u4E2D\u7F13\u5B58\u7684\u8F93\u5165 tokens(\u8BA1\u8D39\u8F93\u5165 \u2212 \u7F13\u5B58\u547D\u4E2D \u2212 \u7F13\u5B58\u5199\u5165)\u3002",
		  "hint.turns": "\u7528\u6237\u6D88\u606F\u8F6E\u6B21(\u5168\u91CF)\u3002",
		  "hint.steps": "Agent \u5FAA\u73AF\u5185\u7684\u63A8\u7406\u6B65\u9AA4(\u5168\u91CF)\u3002",
		  "hint.requests": "\u5411\u6A21\u578B\u53D1\u8D77\u7684\u8BF7\u6C42\u6B21\u6570,\u542B\u538B\u7F29\u8BF7\u6C42\u3002",
		  "hint.avgTtft": "\u9996\u5B57\u5EF6\u8FDF\u5747\u503C = \u5168\u90E8\u8BF7\u6C42 TTFT \u4E4B\u548C \xF7 \u8BF7\u6C42\u6570\u3002",
		  "hint.decodeSpeed": "\u89E3\u7801\u541E\u5410 = \u89E3\u7801 tokens \xF7 \u89E3\u7801\u8017\u65F6(\u5168\u91CF)\u3002",
		  "hint.contextOccupancy": "\u9884\u8BA1\u4E0B\u4E00\u6B21\u8BF7\u6C42\u7684\u4E0A\u4E0B\u6587\u5360\u7528 = \u538B\u529B tokens \xF7 \u7A97\u53E3\u5927\u5C0F\u3002",
		  "hint.tools": "\u5F53\u524D\u7A97\u53E3\u5185\u89C2\u5BDF\u5230\u7684\u5DE5\u5177\u8C03\u7528\u6B21\u6570(\u542B\u5D4C\u5957\u5B50\u8C03\u7528)\u3002",
		  "hint.toolErrors": "\u8FD4\u56DE\u9519\u8BEF\u7ED3\u679C\u7684\u5DE5\u5177\u8C03\u7528\u6B21\u6570\u3002",
		  "hint.compactions": "\u56E0\u4E0A\u4E0B\u6587\u8D85\u9650\u89E6\u53D1\u7684\u5386\u53F2\u538B\u7F29\u8BF7\u6C42\u6B21\u6570\u3002",
		  "hint.compactionEffect": "\u6BCF\u6B21\u538B\u7F29\u524D\u540E\u7684\u4E0A\u4E0B\u6587\u5927\u5C0F\u5BF9\u6BD4:\u538B\u7F29\u8BF7\u6C42\u8F93\u5165 \u2192 \u5176\u540E\u9996\u4E2A\u52A9\u624B\u8BF7\u6C42\u8F93\u5165\u3002",
		  "hint.cost": "\u6309 2026-10-26 \u6838\u5BF9\u7684 DeepSeek \u5B98\u65B9\u5CF0\u65F6\u516C\u5F00\u4EF7\u4F5C\u53C2\u8003\u4F30\u7B97\uFF0C\u4E0D\u4EE3\u8868\u5386\u53F2\u8D26\u5355\uFF1B\u975E\u5CF0\u65F6\u53EF\u80FD\u66F4\u4F4E\u3002\u7B2C\u4E09\u65B9\u8DEF\u7531\u3001\u672A\u77E5\u6A21\u578B\u6216\u672A\u4E0A\u62A5\u7528\u91CF\u4E0D\u8BA1\u4EF7\u3002",
		  "hint.failedProfile": "\u5931\u8D25\u8BF7\u6C42\u5E73\u5747\u8017\u65F6 {a} vs \u6210\u529F {b}",
		  "hint.effort": "\u5404\u63A8\u7406\u5F3A\u5EA6\u6863\u4F4D\u7684\u8BF7\u6C42\u6570\u4E0E\u63A8\u7406 tokens \u5408\u8BA1",
		  "hint.totalDuration": "\u6A21\u578B\u751F\u6210\u4E0E\u5DE5\u5177\u8C03\u7528\u8017\u65F6\u5408\u8BA1(\u5168\u91CF)\u3002",
		  "tokens.input": "\u8F93\u5165",
		  "tokens.cacheRead": "\u7F13\u5B58\u547D\u4E2D",
		  "tokens.cacheWrite": "\u7F13\u5B58\u5199\u5165",
		  "tokens.output": "\u8F93\u51FA",
		  "tokens.reasoning": "\u63A8\u7406",
		  "tokens.formula": "\u8F93\u5165 = \u672A\u7F13\u5B58 + \u7F13\u5B58\u547D\u4E2D + \u7F13\u5B58\u5199\u5165",
		  "tokens.cacheNote": "\u7F13\u5B58\u547D\u4E2D\u7387 = \u7F13\u5B58\u547D\u4E2D \xF7 \u8BA1\u8D39\u8F93\u5165",
		  "role.user": "User",
		  "role.steering": "\u8F6C\u5411",
		  "role.assistant": "Assistant",
		  "role.system": "System/\u4E0A\u4E0B\u6587",
		  "role.tool": "Tool",
		  "role.other": "\u5176\u4ED6",
		  "role.windowNote": "\u57FA\u4E8E\u5F53\u524D\u52A0\u8F7D\u7684\u5BF9\u8BDD\u7A97\u53E3\u7EDF\u8BA1",
		  "context.system": "\u7CFB\u7EDF\u63D0\u793A",
		  "context.tools": "\u5DE5\u5177\u5B9A\u4E49",
		  "context.messages": "\u5BF9\u8BDD\u5185\u5BB9",
		  "context.note": "\u4E0B\u4E00\u6B21\u8BF7\u6C42\u7684\u542F\u53D1\u5F0F\u6784\u6210,provider \u672A\u4E0A\u62A5\u65F6\u7559\u7A7A",
		  "timing.llm": "\u6A21\u578B\u751F\u6210",
		  "timing.tool": "\u5DE5\u5177\u6267\u884C",
		  "timing.ttft": "\u9996\u5B57\u5EF6\u8FDF",
		  "timing.avg": "\u5E73\u5747",
		  "tools.note": "\u6309\u5DE5\u5177\u6C47\u603B\uFF1B\u9519\u8BEF\u540C\u65F6\u7528\u6587\u5B57\u548C\u6807\u8BB0\u8BF4\u660E",
		  "models.input": "\u8F93\u5165",
		  "models.output": "\u8F93\u51FA",
		  "models.requests": "\u8BF7\u6C42",
		  "turns.label": "\u8F6E\u6B21 #",
		  "trend.input": "\u8F93\u5165",
		  "trend.output": "\u8F93\u51FA",
		  "trend.duration": "\u8017\u65F6",
		  "trend.request": "\u8BF7\u6C42 #",
		  "trend.newestRight": "\u2192 \u6700\u65B0",
		  "status.running": "\u6B63\u5728\u751F\u6210\u2026",
		  "status.idle": "\u5C31\u7EEA",
		  "unit.tps": "tok/s",
		  "unit.percent": "%",
		  "unknown": "\u672A\u8BB0\u5F55",
		  "total": "\u5408\u8BA1",
		  "req.status": "\u72B6\u6001",
		  "req.model": "\u6A21\u578B",
		  "req.turnStep": "\u8F6E/\u6B65",
		  "req.config.thinking": "\u601D\u8003",
		  "req.config.effort": "\u63A8\u7406\u5F3A\u5EA6",
		  "req.config.temperature": "\u6E29\u5EA6",
		  "req.config.maxTokens": "\u6700\u5927\u8F93\u51FA",
		  "req.config.provider": "Provider",
		  "req.prompt.systemChars": "\u7CFB\u7EDF\u63D0\u793A\u957F\u5EA6",
		  "req.prompt.tools": "\u6302\u8F7D\u5DE5\u5177",
		  "req.usage.uncached": "\u672A\u7F13\u5B58\u8F93\u5165",
		  "req.usage.cacheRead": "\u7F13\u5B58\u547D\u4E2D",
		  "req.usage.cacheWrite": "\u7F13\u5B58\u5199\u5165",
		  "req.usage.output": "\u8F93\u51FA",
		  "req.usage.reasoning": "\u63A8\u7406",
		  "req.toolCalls": "\u5DE5\u5177\u8C03\u7528",
		  "req.noToolCalls": "\u8BE5\u8BF7\u6C42\u6CA1\u6709\u5DE5\u5177\u8C03\u7528",
		  "req.error": "\u9519\u8BEF",
		  "req.errorMissing": "\u8FD0\u884C\u65F6\u672A\u63D0\u4F9B\u8FD9\u6761\u8BF7\u6C42\u7684\u9519\u8BEF\u8BE6\u60C5\u3002",
		  "req.seq": "\u8BF7\u6C42\u5E8F\u53F7",
		  "req.jumpTrajectory": "\u5728\u8F68\u8FF9\u4E2D\u67E5\u770B",
		  "req.jumpCompaction": "\u5B9A\u4F4D\u5230\u8BE5\u538B\u7F29\u9644\u8FD1\u7684\u5DE5\u5177\u8C03\u7528(\u538B\u7F29\u6807\u8BB0\u672C\u8EAB\u5728\u8F68\u8FF9\u4E2D\u4E0D\u53EF\u5355\u72EC\u9AD8\u4EAE)",
		  "req.retryCount": "\u91CD\u8BD5",
		  "req.rowHint.jump": "\u70B9\u51FB\u884C \u2192 \u8DF3\u8F6C\u5230\u8F68\u8FF9\u89C6\u56FE\u67E5\u770B\u8BE5\u8BF7\u6C42",
		  "req.rowHint.jumpCompaction": "\u70B9\u51FB \u2192 \u5B9A\u4F4D\u8BE5\u538B\u7F29\u9644\u8FD1\u7684\u5DE5\u5177\u8C03\u7528(\u538B\u7F29\u6807\u8BB0\u4E0D\u53EF\u5355\u72EC\u9AD8\u4EAE)",
		  "req.rowHint.expand": "\u70B9\u51FB \u25B8 \u5C55\u5F00\u8BE5\u8BF7\u6C42\u8BE6\u60C5",
		  "req.rowHint.error": "\u70B9\u51FB\u67E5\u770B\u9519\u8BEF\u8BE6\u60C5;\u25B8 \u5C55\u5F00/\u6536\u8D77",
		  "req.collapse": "\u6536\u8D77\u8BE6\u60C5",
		  "req.expand": "\u5C55\u5F00\u8BE6\u60C5",
		  "trend.cacheHit": "\u7F13\u5B58\u547D\u4E2D\u7387\u8D8B\u52BF(\u6309\u8BF7\u6C42)",
		  "pager.items": "\u6761",
		  "pager.page": "\u7B2C",
		  "pager.of": "/",
		  "pager.perPage": "\u6BCF\u9875",
		  "pager.prev": "\u4E0A\u4E00\u9875",
		  "pager.next": "\u4E0B\u4E00\u9875",
		  "pager.jumpTo": "\u8DF3\u5230\u7B2C",
		  "trend.ttft": "\u9996\u5B57\u5EF6\u8FDF",
		  "trend.turnInput": "\u6BCF\u8F6E\u8F93\u5165",
		  "trend.deltaNote": "\u8F83\u4E0A\u4E00\u8F6E\u8F93\u5165\u589E\u91CF",
		  "trend.reasoningShare": "\u63A8\u7406\u5360\u6BD4",
		  "trend.compactionMarks": "\u538B\u7F29",
		  "trend.rateRequests": "\u8BF7\u6C42\u5BC6\u5EA6",
		  "trend.rateTokens": "token \u5BC6\u5EA6",
		  "trend.rateNote": "\u7A97\u53E3\u5185\u5206\u6876",
		  "trend.axisOldToNew": "\u65F6\u95F4\u65B9\u5411:\u65E7 \u2192 \u65B0(\u6BCF\u4E2A\u5706\u70B9 = \u4E00\u6B21\u8BF7\u6C42)",
		  "trend.windowTotal": "\u5408\u8BA1\u57FA\u4E8E\u6700\u8FD1 60 \u6761\u8BF7\u6C42(\u5F53\u524D\u7A97\u53E3)",
		  "trend.windowTotalAll": "\u5F53\u524D\u7A97\u53E3\u5185\u5168\u90E8\u8BF7\u6C42\u7684\u5408\u8BA1",
		  "trend.ttftAvgNote": "\u5747\u503C\u57FA\u4E8E\u7A97\u53E3\u5185\u53EF\u89C2\u6D4B\u6837\u672C;X \u8F74\u4E3A\u8BF7\u6C42\u5E8F\u53F7,\u4E0E\u5176\u4ED6\u8D8B\u52BF\u56FE\u5BF9\u9F50",
		  "trend.cacheWrite": "\u7F13\u5B58\u5199\u5165",
		  "trend.scopeNote": "\u6700\u8FD1",
		  "stat.reasoningShare": "\u63A8\u7406\u5360\u6BD4",
		  "stat.modelSwitches": "\u6A21\u578B\u5207\u6362",
		  "stat.compactionRecovered": "\u538B\u7F29\u56DE\u6536",
		  "section.errors": "\u5F02\u5E38\u4E0E\u91CD\u8BD5",
		  "section.errorTop": "\u9519\u8BEF\u5206\u7C7B",
		  "section.compaction": "\u538B\u7F29\u6548\u679C",
		  "section.health": "Agent \u5065\u5EB7\u8BCA\u65AD",
		  "hint.health": "\u5FAA\u73AF\u8C03\u7528(\u540C\u5DE5\u5177\u540C\u53C2\u6570\u8FDE\u7EED\u22653 \u6B21)\u3001\u65E0\u8FDB\u5C55(\u8F93\u51FA\u6781\u5C11\u5374\u9891\u7E41\u8C03\u5DE5\u5177)\u3001\u5DE5\u5177\u8C03\u7528\u5BC6\u5EA6",
		  "hint.loop": "\u8FDE\u7EED\u76F8\u540C\u8C03\u7528,\u6D89\u53CA\u8BF7\u6C42 seq:",
		  "hint.noProgress": "\u4F4E\u4EA7\u51FA\u9AD8\u8C03\u7528",
		  "trend.toolStorm": "\u5DE5\u5177\u8C03\u7528\u5BC6\u5EA6",
		  "hint.modelTimeline": "\u5706\u70B9=\u8BF7\u6C42 \xB7 \u989C\u8272=\u6A21\u578B \xB7 \u7425\u73C0\u73AF=\u5207\u6362 \xB7 \u70B9\u51FB\u8DF3\u8F6C",
		  "section.effort": "\u63A8\u7406\u5F3A\u5EA6\u5206\u5E03",
		  "section.commands": "\u547D\u4EE4\u660E\u7EC6",
		  "section.summary": "\u6458\u8981",
		  "section.durationDist": "\u8017\u65F6\u5206\u5E03",
		  "stat.turnErrors": "\u8F6E\u6B21\u9519\u8BEF",
		  "stat.maxTokenHits": "\u8F93\u51FA\u89E6\u9876",
		  "stat.retries": "\u6A21\u578B\u91CD\u8BD5",
		  "stat.retryWait": "\u91CD\u8BD5\u7B49\u5F85",
		  "stat.retried": "\u91CD\u8BD5\u8BF7\u6C42",
		  "stat.interrupted": "\u624B\u52A8\u4E2D\u65AD",
		  "tools.durationTop": "\u5DE5\u5177\u8017\u65F6 TOP",
		  "tools.avgDuration": "\u5E73\u5747",
		  "req.filter.all": "\u5168\u90E8",
		  "req.searchPlaceholder": "\u641C\u7D22 #seq / \u6A21\u578B / \u9519\u8BEF / \u5DE5\u5177\u540D\u2026",
		  "view.table": "\u660E\u7EC6\u8868\u683C",
		  "view.turn": "\u6309\u8F6E\u6B21",
		  "view.model": "\u6309\u6A21\u578B",
		  "view.error": "\u6309\u9519\u8BEF",
		  "stat.requests.ok": "\u6210\u529F\u8BF7\u6C42",
		  "req.export": "\u5BFC\u51FA JSON",
		  "req.exportHint": "\u5BFC\u51FA\u5F53\u524D\u89C6\u56FE\u7684\u8BF7\u6C42\u660E\u7EC6(\u542B\u7B5B\u9009\u4E0E\u641C\u7D22,JSON)",
		  "req.filter.running": "\u8FDB\u884C\u4E2D",
		  "req.filter.complete": "\u5B8C\u6210",
		  "req.filter.error": "\u5931\u8D25",
		  "req.startedAt": "\u5F00\u59CB\u4E8E",
		  "req.runningElapsed": "\u5DF2\u7528",
		  "req.toolTail": "\u7B49 {n} \u4E2A",
		  "status.streaming": "\u6B63\u5728\u751F\u6210",
		  "stream.liveOutput": "\u6B63\u5728\u751F\u6210\u5185\u5BB9",
		  "stream.think": "\u601D\u7EF4\u8FC7\u7A0B",
		  "stream.output": "\u6587\u672C\u8F93\u51FA",
		  "stream.detail": "\u8FC7\u7A0B\u6570\u636E",
		  "stream.reasoningOutput": "\u6B63\u5728\u751F\u6210\u601D\u7EF4\u8FC7\u7A0B",
		  "stream.onlyReasoning": "\u5F53\u524D\u9636\u6BB5\u4E3A\u601D\u7EF4\u8FC7\u7A0B\uFF0C\u6587\u672C\u8F93\u51FA\u5C1A\u672A\u5F00\u59CB",
		  "stream.fallback": "\u5F53\u524D\u6D41\u5C1A\u672A\u4EA7\u51FA\u53EF\u89C1\u6587\u672C",
		  "status.tool": "\u5DE5\u5177",
		  "status.stuck": "\u8BF7\u6C42 #{n} \u5DF2 {s} \u672A\u51FA\u9996\u5B57",
		  "unit.char": "\u5B57\u7B26",
		  "trend.newRequests": "\u6709\u65B0\u8BF7\u6C42 \u2192 \u56DE\u5230\u6700\u65B0",
		  "windowNote.more": "\xB7 \u8FD8\u6709\u66F4\u65E9\u5386\u53F2\u672A\u52A0\u8F7D",
		  "empty.requestsTable": "\u6682\u65E0\u8BF7\u6C42\u8BB0\u5F55",
		  "empty.search": "\u6CA1\u6709\u5339\u914D\u7684\u8BF7\u6C42",
		  "empty.requestsFiltered": "\u6CA1\u6709\u7B26\u5408\u5F53\u524D\u7B5B\u9009\u7684\u8BF7\u6C42",
		  "context.pressureMissing": "provider \u672A\u4E0A\u62A5\u538B\u529B\u6570\u636E,\u6682\u65E0\u5360\u7528\u4F30\u7B97",
		  "hint.modelSwitches": "\u4F1A\u8BDD\u8FC7\u7A0B\u4E2D\u6A21\u578B\u5207\u6362\u7684\u6B21\u6570(\u76F8\u90BB\u8BF7\u6C42\u6A21\u578B\u4E0D\u540C)\u3002",
		  "hint.compactionRecovered": "\u538B\u7F29\u66FF\u6A21\u578B\u7701\u6389\u7684 tokens(provider \u4E0A\u62A5\u7684 shadowed \u503C,\u7F3A\u5931\u65F6\u7559\u7A7A)\u3002",
		  "board.section": "\u5B50\u4EE3\u7406\u72B6\u6001",
		  "hud.status": "\u72B6\u6001",
		  "hud.status.running": "\u8FD0\u884C\u4E2D",
		  "hud.status.idle": "\u7A7A\u95F2",
		  "hud.tool": "\u5DE5\u5177",
		  "hud.goal": "\u76EE\u6807",
		  "hud.todos": "\u4EFB\u52A1",
		  "hud.todos.value": "{n} \u4E2A\u8FDB\u884C\u4E2D",
		  "hud.subagents": "\u5B50\u4EE3\u7406",
		  "hud.subagents.value": "{n} \u4E2A\u8FD0\u884C\u4E2D",
		  "hud.workflow": "\u5DE5\u4F5C\u6D41",
		  "hud.workflow.value": "{n} \u4E2A\u8FD0\u884C\u4E2D",
		  "hud.schedule": "\u63D0\u9192",
		  "board.col.inProgress": "\u8FDB\u884C\u4E2D",
		  "board.col.planned": "\u8BA1\u5212",
		  "board.col.blocked": "\u963B\u585E",
		  "board.col.done": "\u5DF2\u5B8C\u6210",
		  "board.goal.phase.active": "\u8FDB\u884C\u4E2D",
		  "board.goal.phase.paused": "\u5DF2\u6682\u505C",
		  "board.goal.phase.complete": "\u5DF2\u5B8C\u6210",
		  "board.goal.phase.blocked": "\u5DF2\u963B\u585E",
		  "board.goal.rounds": "\u7B2C {n}/{m} \u8F6E",
		  "board.goal.blockedReason": "\u539F\u56E0: {message}",
		  "board.todo.status.pending": "\u5F85\u529E",
		  "board.todo.status.inProgress": "\u8FDB\u884C\u4E2D",
		  "board.todo.status.completed": "\u5DF2\u5B8C\u6210",
		  "board.workflow.running": "\u8FD0\u884C\u4E2D",
		  "board.workflow.members": "{n} \u4E2A\u6210\u5458",
		  "board.workflow.member.outcome.running": "\u8FD0\u884C\u4E2D",
		  "board.workflow.member.outcome.completed": "\u5B8C\u6210",
		  "board.workflow.member.outcome.failed": "\u5931\u8D25",
		  "board.workflow.member.outcome.cancelled": "\u5DF2\u53D6\u6D88",
		  "board.workflow.stop.completed": "\u5DF2\u5B8C\u6210",
		  "board.workflow.stop.cancelled": "\u5DF2\u53D6\u6D88",
		  "board.workflow.stop.error": "\u51FA\u9519",
		  "board.subagents.running": "\u8FD0\u884C\u4E2D",
		  "board.subagents.completed": "\u5DF2\u5B8C\u6210",
		  "board.subagents.inactive": "\u5DF2\u7ED3\u675F",
		  "board.subagents.inactiveNote": "\u76EE\u5F55\u672A\u63D0\u4F9B\u5B8C\u6210/\u505C\u6B62\u539F\u56E0",
		  "board.subagents.archived": "\u5F52\u6863",
		  "board.subagents.expand": "\u5C55\u5F00",
		  "board.subagents.collapse": "\u6536\u8D77",
		  "board.subagents.archiveAria": "{action}\u5F52\u6863\u5B50\u4EE3\u7406\uFF0C\u5171 {n} \u4E2A",
		  "board.subagents.listTitle": "\u5B50\u4EE3\u7406\u5217\u8868",
		  "board.subagents.count": "\u5171 {n} \u4E2A",
		  "board.subagents.runningEmpty": "\u5F53\u524D\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u5B50\u4EE3\u7406\u3002",
		  "board.subagents.open": "\u6253\u5F00\u5BF9\u8BDD",
		  "board.subagents.openAria": "\u6253\u5F00 {name} \u7684\u5BF9\u8BDD",
		  "board.subagent.mode.oneShot": "\u4E00\u6B21\u6027",
		  "board.subagent.mode.continuable": "\u53EF\u7EE7\u7EED",
		  "board.schedule.overdue": "\u5DF2\u5230\u671F",
		  "board.schedule.dispatched": "\u5DF2\u89E6\u53D1",
		  "board.schedule.due": "\u4E8E {time}",
		  "board.schedule.every": "\u6BCF {s}s",
		  "board.empty": "\u5F53\u524D\u4F1A\u8BDD\u6682\u65E0\u5B50\u4EE3\u7406\u3002\u542F\u52A8\u5B50\u4EE3\u7406\u540E\uFF0C\u72B6\u6001\u4F1A\u81EA\u52A8\u663E\u793A\u5728\u8FD9\u91CC\u3002",
		  "board.hint": "\u72B6\u6001\u6765\u81EA dsh \u5B50\u4EE3\u7406\u76EE\u5F55\u3002\u5DF2\u7ED3\u675F\u8D85\u8FC7 5 \u5206\u949F\u7684\u5B50\u4EE3\u7406\u81EA\u52A8\u5F52\u6863\uFF0C\u5F52\u6863\u9ED8\u8BA4\u6298\u53E0\u3002\u76EE\u5F55\u4E0D\u4F1A\u628A\u5DF2\u7ED3\u675F\u7EC6\u5206\u4E3A\u5B8C\u6210\u6216\u505C\u6B62\u3002"
		};
		var en = {
		  "dashboard.title": "Session observatory",
		  "dashboard.activityTitle": "Request activity",
		  "dashboard.activityNote": "Find failures, waits and response changes",
		  "dashboard.activityCaption": "Recent request durations",
		  "dashboard.slowest": "Longest",
		  "dashboard.activityOrder": "In request order",
		  "dashboard.activityAria": "Latest 60 requests. Bar height shows duration; red marks failures.",
		  "dashboard.inspectRequests": "Inspect requests",
		  "dashboard.performance": "Performance & cost",
		  "dashboard.subtitle": "Live activity, usage and request insights",
		  "dashboard.navigation": "Dashboard sections",
		  "dashboard.overview": "Overview",
		  "dashboard.analysis": "Usage & performance",
		  "dashboard.requests": "Requests",
		  "dashboard.agents": "Agents",
		  "analysis.calls": "Calls",
		  "analysis.toolSummary": "{calls} calls / {tools} tools",
		  "analysis.toolName": "Tool",
		  "analysis.totalTime": "Total time",
		  "analysis.avgTime": "Avg time",
		  "analysis.timedCalls": "calls with timing",
		  "analysis.toolTimingNote": "Timing covers linked calls, including time waiting for user input. Missing values show \u2014.",
		  "analysis.noTools": "No tool calls in the loaded window",
		  "analysis.requestLatency": "Request duration",
		  "analysis.messages": "messages",
		  "analysis.injections": "records",
		  "analysis.scrollTable": "Scroll horizontally for all columns.",
		  "dashboard.analysisNote": "Tools, models and context in detail",
		  "dashboard.trends": "Request trends",
		  "dashboard.trendsNote": "Expand to inspect the loaded window",
		  "dashboard.costNote": "Estimated from confirmed model prices",
		  "dashboard.unpriced": "{n} requests have no confirmed price",
		  "dashboard.latencyNote": "Time to the first output",
		  "dashboard.speedNote": "Average output generation speed",
		  "view.dashboard": "Dashboard",
		  "view.dashboard.aria": "Real-time session metrics dashboard",
		  "empty": "No session data yet \u2014 start a conversation and metrics will appear here live.",
		  "empty.requests": "No requests recorded yet \u2014 send a message to get started",
		  "section.overview": "Overview",
		  "section.tokens": "Token usage",
		  "section.messages": "Messages",
		  "section.contextInjection": "Context injection",
		  "hint.contextInjection": "Which sources injected context into each request (role: inject = producer injection / recall = cross-session recall), sorted by characters; hover for the role",
		  "contextRole.inject": "inject",
		  "contextRole.recall": "recall",
		  "contextForm.instructions": "instructions",
		  "contextForm.catalog": "catalog",
		  "contextForm.snapshot": "snapshot",
		  "contextForm.notice": "notice",
		  "contextForm.relay": "relay",
		  "contextForm.recall": "recall",
		  "contextForm.opaque": "opaque",
		  "section.timing": "Timing",
		  "section.tools": "Tool calls",
		  "section.models": "Model usage",
		  "section.turns": "Turn durations",
		  "hint.turnDurations": "Based on the loaded window (the framework only loads a recent slice of the log); turns marked ~ have their end event outside the window or are still running \u2014 approximate",
		  "req.clearSearch": "Clear search",
		  "view.tabs.aria": "Switch the request table view",
		  "req.filter.aria": "Filter requests by status; search and export available",
		  "group.tailNote": "Showing the first {n} rows; {m} more not listed",
		  "status.stuckAlert": "Request #{n}: no first token yet",
		  "status.stuckTimer": "after {s}",
		  "aria.donut": "Message composition donut chart",
		  "aria.gauge": "Context pressure gauge",
		  "aria.trend": "Request trend chart; hover for exact values",
		  "stat.scopeAll": "all-time",
		  "hint.ttftByCacheMiss": "TTFT could not be linked to requests (projection windows diverged); the hit-vs-miss comparison is unavailable",
		  "req.usage.cost": "Est. cost",
		  "unit.tokens": "tokens",
		  "section.ttftByCache": "TTFT: hit vs miss",
		  "ttftCache.hit": "hit",
		  "ttftCache.miss": "miss",
		  "hint.ttftByCache": "Average TTFT of cache-hit vs cache-miss requests (window, completed only; differs slightly from the P50/P95 sample set)",
		  "section.modelCost": "Cost by model",
		  "hint.modelCost": "Only requests with confirmed reference rates are priced; incomplete totals remain unavailable.",
		  "hint.turnTail": "Showing the latest 12 turns (more turns exist in the window)",
		  "trend.rateFailed": "Failed",
		  "trend.contextOcc": "Context occupancy",
		  "hint.contextOccTrend": "Per-request input \xF7 context window (compaction drops visible)",
		  "health.loop": "loop",
		  "health.noProgress": "no-progress",
		  "aria.modelTimeline": "Model timeline, one dot per request; click to jump to that request",
		  "hint.turnOpen": "This turn's end event is outside the loaded window (or it is still running); duration is an approximation from the visible window",
		  "section.trend": "Request trend",
		  "section.requests": "Requests",
		  "stat.inputTokens": "Input tokens",
		  "stat.outputTokens": "Output tokens",
		  "stat.reasoningTokens": "Reasoning tokens",
		  "stat.cacheHitRate": "Cache hit rate",
		  "stat.cacheRead": "Cache read",
		  "stat.totalDuration": "Model + tool time",
		  "stat.turns": "Turns",
		  "stat.steps": "Steps",
		  "stat.requests": "Requests",
		  "stat.requests.completed": "completed",
		  "stat.requests.running": "running",
		  "stat.requests.error": "failed",
		  "stat.tools": "Tool calls",
		  "stat.toolErrors": "Tool errors",
		  "stat.compactions": "Compactions",
		  "stat.commands": "Commands",
		  "stat.compactionItems": "messages",
		  "stat.cost": "Est. cost",
		  "stat.costSavings": "cache saved",
		  "stat.avgTtft": "Avg time-to-first-token",
		  "stat.decodeSpeed": "Decode speed",
		  "stat.contextOccupancy": "Context occupancy",
		  "hint.inputTokens": "Billed input = uncached + cache hits + cache writes. Whole-log, provider-reported.",
		  "hint.outputTokens": "Tokens generated by the model (whole-log). Includes reasoning tokens when the provider counts them in completion output.",
		  "hint.reasoningTokens": "Chain-of-thought reasoning tokens; reported by some models only. Window-scoped, unlike the all-time input/output cards.",
		  "hint.cacheHitRate": "Cache-hit tokens \xF7 billed input tokens (whole-log figures). Higher = cheaper input.",
		  "hint.uncached": "Input tokens that missed the cache (= billed input \u2212 cache read \u2212 cache write).",
		  "hint.turns": "User message turns (whole-log).",
		  "hint.steps": "Reasoning steps in the agent loop (whole-log).",
		  "hint.requests": "Requests made to the model, including compactions.",
		  "hint.avgTtft": "Average time-to-first-token = \u03A3 TTFT \xF7 request count.",
		  "hint.decodeSpeed": "Decode throughput = decode tokens \xF7 decode time (all-time).",
		  "hint.contextOccupancy": "Projected next-request context = pressure tokens \xF7 context window.",
		  "hint.tools": "Tool calls observed in the current window (nested sub-calls included).",
		  "hint.toolErrors": "Tool calls that returned an error result.",
		  "hint.compactions": "History compactions triggered by context limits.",
		  "hint.compactionEffect": "Context size before \u2192 after each compaction (compaction request input \u2192 first assistant request input after it).",
		  "hint.cost": "Reference estimate at official DeepSeek peak rates checked 2026-10-26, not a historical bill. Off-peak may be lower. Third-party routes, unknown models and missing usage remain unpriced.",
		  "hint.failedProfile": "failed avg {a} vs completed avg {b}",
		  "hint.effort": "Requests and reasoning tokens per reasoning-effort tier",
		  "hint.totalDuration": "Total model + tool wall time (whole-log).",
		  "tokens.input": "Input",
		  "tokens.cacheRead": "Cache read",
		  "tokens.cacheWrite": "Cache write",
		  "tokens.output": "Output",
		  "tokens.reasoning": "Reasoning",
		  "tokens.formula": "Input = uncached + cache read + cache write",
		  "tokens.cacheNote": "Cache hit rate = cache read \xF7 billed input",
		  "role.user": "User",
		  "role.steering": "Steering",
		  "role.assistant": "Assistant",
		  "role.system": "System/context",
		  "role.tool": "Tool",
		  "role.other": "Other",
		  "role.windowNote": "Based on the currently loaded conversation window",
		  "context.system": "System prompt",
		  "context.tools": "Tool schemas",
		  "context.messages": "Messages",
		  "context.note": "Heuristic composition of the next request; blank when the provider reports none",
		  "timing.llm": "Model",
		  "timing.tool": "Tools",
		  "timing.ttft": "TTFT",
		  "timing.avg": "avg",
		  "tools.note": "Grouped by tool; errors include text labels.",
		  "models.input": "Input",
		  "models.output": "Output",
		  "models.requests": "reqs",
		  "turns.label": "Turn #",
		  "trend.input": "Input",
		  "trend.output": "Output",
		  "trend.duration": "Duration",
		  "trend.request": "Req #",
		  "trend.newestRight": "newest \u2192",
		  "status.running": "streaming\u2026",
		  "status.idle": "idle",
		  "unit.tps": "tok/s",
		  "unit.percent": "%",
		  "unknown": "Not recorded",
		  "total": "Total",
		  "req.status": "Status",
		  "req.model": "Model",
		  "req.turnStep": "T/S",
		  "req.config.thinking": "Thinking",
		  "req.config.effort": "Reasoning effort",
		  "req.config.temperature": "Temperature",
		  "req.config.maxTokens": "Max output",
		  "req.config.provider": "Provider",
		  "req.prompt.systemChars": "System prompt length",
		  "req.prompt.tools": "Attached tools",
		  "req.usage.uncached": "Uncached input",
		  "req.usage.cacheRead": "Cache read",
		  "req.usage.cacheWrite": "Cache write",
		  "req.usage.output": "Output",
		  "req.usage.reasoning": "Reasoning",
		  "req.toolCalls": "Tool calls",
		  "req.noToolCalls": "No tool calls in this request",
		  "req.error": "Error",
		  "req.errorMissing": "The runtime did not provide an error detail for this request.",
		  "req.seq": "request seq",
		  "req.jumpTrajectory": "View in trajectory",
		  "req.jumpCompaction": "Locate the nearest tool call near this compaction (the COMPACTED marker itself has no external highlight handle)",
		  "req.retryCount": "Retry",
		  "req.rowHint.jump": "Click row \u2192 jump to this request in the trajectory view",
		  "req.rowHint.jumpCompaction": "Click \u2192 locate the nearest tool call near this compaction (marker itself cannot be highlighted externally)",
		  "req.rowHint.expand": "Click \u25B8 to expand request details",
		  "req.rowHint.error": "Click to view error details; \u25B8 to expand/collapse",
		  "req.collapse": "Collapse details",
		  "req.expand": "Expand details",
		  "trend.cacheHit": "Cache hit rate trend (per request)",
		  "pager.items": "items",
		  "pager.page": "Page",
		  "pager.of": "/",
		  "pager.perPage": "per page",
		  "pager.prev": "Previous page",
		  "pager.next": "Next page",
		  "pager.jumpTo": "Go to page",
		  "trend.ttft": "TTFT",
		  "trend.turnInput": "Input per turn",
		  "trend.deltaNote": "vs. previous turn",
		  "trend.reasoningShare": "Reasoning share",
		  "trend.compactionMarks": "compaction",
		  "trend.rateRequests": "Requests",
		  "trend.rateTokens": "Tokens",
		  "trend.rateNote": "buckets over window",
		  "trend.axisOldToNew": "time: old \u2192 new (each dot = one request)",
		  "trend.windowTotal": "Total of the last 60 requests (current window)",
		  "trend.windowTotalAll": "Total over all requests in the current window",
		  "trend.ttftAvgNote": "Average over observable samples in the window; X axis is request seq, aligned with other trend charts",
		  "trend.cacheWrite": "Cache write",
		  "trend.scopeNote": "last",
		  "stat.reasoningShare": "reasoning share",
		  "stat.modelSwitches": "Model switches",
		  "stat.compactionRecovered": "Compaction recovered",
		  "section.errors": "Errors & retries",
		  "section.errorTop": "Top errors",
		  "section.compaction": "Compaction effect",
		  "section.health": "Agent health",
		  "hint.health": "Loop calls (same tool + args \u22653 in a row), no-progress (tiny output yet many tool calls), tool-call density",
		  "hint.loop": "Consecutive identical calls, request seqs:",
		  "hint.noProgress": "Low output, many tool calls",
		  "trend.toolStorm": "Tool-call density",
		  "hint.modelTimeline": "Dot=request \xB7 color=model \xB7 amber ring=switch \xB7 click to jump",
		  "section.effort": "Reasoning effort",
		  "section.commands": "Commands",
		  "section.summary": "Summary",
		  "section.durationDist": "Duration distribution",
		  "stat.turnErrors": "Turn errors",
		  "stat.maxTokenHits": "Max-token hits",
		  "stat.retries": "Model retries",
		  "stat.retryWait": "retry wait",
		  "stat.retried": "retried reqs",
		  "stat.interrupted": "Interrupted",
		  "tools.durationTop": "Tool time (top)",
		  "tools.avgDuration": "avg",
		  "req.filter.all": "All",
		  "req.searchPlaceholder": "Search #seq / model / error / tool\u2026",
		  "view.table": "Table",
		  "view.turn": "By turn",
		  "view.model": "By model",
		  "view.error": "By error",
		  "stat.requests.ok": "OK requests",
		  "req.export": "Export JSON",
		  "req.exportHint": "Export the current view as JSON (respects filter and search)",
		  "req.filter.running": "Running",
		  "req.filter.complete": "Complete",
		  "req.filter.error": "Failed",
		  "req.startedAt": "Started",
		  "req.runningElapsed": "elapsed",
		  "req.toolTail": "+{n} more",
		  "status.streaming": "streaming",
		  "stream.liveOutput": "Streaming output",
		  "stream.think": "Think",
		  "stream.output": "Output",
		  "stream.detail": "Process data",
		  "stream.reasoningOutput": "Streaming reasoning",
		  "stream.onlyReasoning": "Reasoning stage; text output not started yet",
		  "stream.fallback": "No visible text in current stream",
		  "status.tool": "tool",
		  "status.stuck": "Request #{n}: no first token after {s}",
		  "unit.char": "chars",
		  "trend.newRequests": "New requests \u2192 back to latest",
		  "windowNote.more": "\xB7 older history not loaded",
		  "empty.requestsTable": "No requests recorded yet",
		  "empty.search": "No requests match",
		  "empty.requestsFiltered": "No requests match the current filter",
		  "context.pressureMissing": "Provider reported no pressure data yet",
		  "hint.modelSwitches": "Model switches across the conversation (adjacent requests with different models).",
		  "hint.compactionRecovered": "Tokens the compaction spared the model (provider-reported shadowed values; blank when missing).",
		  "board.section": "Subagent status",
		  "hud.status": "Status",
		  "hud.status.running": "Running",
		  "hud.status.idle": "Idle",
		  "hud.tool": "Tool",
		  "hud.goal": "Goal",
		  "hud.todos": "Todos",
		  "hud.todos.value": "{n} in progress",
		  "hud.subagents": "Subagents",
		  "hud.subagents.value": "{n} running",
		  "hud.workflow": "Workflow",
		  "hud.workflow.value": "{n} running",
		  "hud.schedule": "Reminder",
		  "board.col.inProgress": "In progress",
		  "board.col.planned": "Planned",
		  "board.col.blocked": "Blocked",
		  "board.col.done": "Done",
		  "board.goal.phase.active": "Active",
		  "board.goal.phase.paused": "Paused",
		  "board.goal.phase.complete": "Completed",
		  "board.goal.phase.blocked": "Blocked",
		  "board.goal.rounds": "round {n}/{m}",
		  "board.goal.blockedReason": "Reason: {message}",
		  "board.todo.status.pending": "Pending",
		  "board.todo.status.inProgress": "In progress",
		  "board.todo.status.completed": "Completed",
		  "board.workflow.running": "Running",
		  "board.workflow.members": "{n} members",
		  "board.workflow.member.outcome.running": "running",
		  "board.workflow.member.outcome.completed": "completed",
		  "board.workflow.member.outcome.failed": "failed",
		  "board.workflow.member.outcome.cancelled": "cancelled",
		  "board.workflow.stop.completed": "Completed",
		  "board.workflow.stop.cancelled": "Cancelled",
		  "board.workflow.stop.error": "Failed",
		  "board.subagents.running": "Running",
		  "board.subagents.completed": "Completed",
		  "board.subagents.inactive": "Ended",
		  "board.subagents.inactiveNote": "The catalog has no completion/stop reason",
		  "board.subagents.archived": "Archived",
		  "board.subagents.expand": "Expand",
		  "board.subagents.collapse": "Collapse",
		  "board.subagents.archiveAria": "{action} archived subagents, {n} total",
		  "board.subagents.listTitle": "Subagent list",
		  "board.subagents.count": "{n} total",
		  "board.subagents.runningEmpty": "No subagents are currently running.",
		  "board.subagents.open": "Open conversation",
		  "board.subagents.openAria": "Open {name} conversation",
		  "board.subagent.mode.oneShot": "one-shot",
		  "board.subagent.mode.continuable": "continuable",
		  "board.schedule.overdue": "Overdue",
		  "board.schedule.dispatched": "Dispatched",
		  "board.schedule.due": "at {time}",
		  "board.schedule.every": "every {s}s",
		  "board.empty": "No subagents in this session yet. Start one and its status will appear here automatically.",
		  "board.hint": "Status comes from the DSH subagent catalog. Subagents ended for more than five minutes are archived automatically, and the archive is collapsed by default. Ended entries are not split into completed versus stopped."
		};

		// src/client/DashboardView.tsx
		var import_react4 = require("react");
		var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

		// src/client/metrics.ts
		function readUsage(usage) {
		  if (typeof usage !== "object" || usage === null) return {};
		  const u = usage;
		  const num = (k) => {
		    const v = u[k];
		    return typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : void 0;
		  };
		  return {
		    inputTokens: num("inputTokens"),
		    cacheReadTokens: num("cacheReadTokens"),
		    cacheWriteTokens: num("cacheWriteTokens"),
		    outputTokens: num("outputTokens"),
		    reasoningTokens: num("reasoningTokens")
		  };
		}
		var toInt = (v) => v === void 0 ? 0 : Math.round(v);
		function billedInputTokens(u) {
		  return u.uncachedInputTokens + u.cacheReadTokens + u.cacheWriteTokens;
		}
		function cacheHitPercent(u) {
		  const total = billedInputTokens(u);
		  return total === 0 ? null : Math.round(u.cacheReadTokens / total * 100);
		}
		var DEEPSEEK_PRICES = {
		  "deepseek-flash": { miss: 0.3, hit: 6e-3, output: 1.2 },
		  "deepseek-v4-flash": { miss: 0.3, hit: 6e-3, output: 1.2 },
		  "deepseek-v4-pro": { miss: 1.32, hit: 0.044, output: 3.96 }
		};
		function requestPrice(provider, model) {
		  if (provider !== "deepseek-official" || model === null || !Object.hasOwn(DEEPSEEK_PRICES, model)) return null;
		  return DEEPSEEK_PRICES[model];
		}
		function estimateRequestCostUsd(provider, model, usage) {
		  const p = requestPrice(provider, model);
		  if (p === null) return null;
		  return ((usage.uncachedInputTokens + usage.cacheWriteTokens) * p.miss + usage.cacheReadTokens * p.hit + usage.outputTokens * p.output) / 1e6;
		}
		function estimateCacheSavingsUsd(provider, model, cacheReadTokens) {
		  const p = requestPrice(provider, model);
		  return p === null ? null : cacheReadTokens * (p.miss - p.hit) / 1e6;
		}
		function countRoles(nodes) {
		  const counts = { user: 0, assistant: 0, system: 0, tool: 0, steering: 0, other: 0 };
		  for (const node of nodes) {
		    switch (node.kind) {
		      case "user":
		        counts.user += 1;
		        break;
		      case "steering":
		        counts.steering += 1;
		        break;
		      case "assistant":
		        counts.assistant += 1;
		        break;
		      case "context":
		        counts.system += 1;
		        break;
		      case "tool-result":
		        counts.tool += 1;
		        break;
		      default:
		        counts.other += 1;
		        break;
		    }
		  }
		  const total = counts.user + counts.assistant + counts.system + counts.tool + counts.steering + counts.other;
		  return { ...counts, total };
		}
		function indexToolCalls(nodes) {
		  const byRequest = /* @__PURE__ */ new Map();
		  let currentSeq = null;
		  const add = (detail) => {
		    const key = currentSeq ?? -1;
		    const list = byRequest.get(key);
		    if (list === void 0) byRequest.set(key, [detail]);
		    else list.push(detail);
		  };
		  const collect = (node) => {
		    add({
		      callId: node.callId,
		      name: node.call?.name ?? "tool",
		      argsRaw: node.call?.argsRaw ?? null,
		      durationMs: node.callTime !== null ? Math.max(0, node.time - node.callTime) : null,
		      isError: node.isError
		    });
		    for (const sub of node.subCalls) {
		      if ("kind" in sub) {
		        collect(sub);
		      } else {
		        add({ callId: sub.callId, name: sub.name, argsRaw: "argsRaw" in sub ? sub.argsRaw : null, durationMs: null, isError: false });
		        collectRunning(sub);
		      }
		    }
		  };
		  const collectRunning = (node) => {
		    for (const sub of node.subCalls) {
		      if ("kind" in sub) collect(sub);
		      else collectRunning(sub);
		    }
		  };
		  for (const node of nodes) {
		    if (node.kind === "assistant") {
		      currentSeq = node.seq;
		      continue;
		    }
		    if (node.kind !== "tool-result") continue;
		    collect(node);
		  }
		  return byRequest;
		}
		function toolHistogram(nodes) {
		  const counts = /* @__PURE__ */ new Map();
		  const bump = (name, isError) => {
		    const entry = counts.get(name) ?? { count: 0, errorCount: 0 };
		    entry.count += 1;
		    if (isError) entry.errorCount += 1;
		    counts.set(name, entry);
		  };
		  const walk = (node) => {
		    bump(node.call?.name ?? "tool", node.isError);
		    for (const sub of node.subCalls) {
		      if ("kind" in sub) {
		        walk(sub);
		      } else {
		        bump(sub.name, false);
		        walkRunning(sub);
		      }
		    }
		  };
		  const walkRunning = (node) => {
		    for (const sub of node.subCalls) {
		      if ("kind" in sub) walk(sub);
		      else {
		        bump(sub.name, false);
		        walkRunning(sub);
		      }
		    }
		  };
		  for (const node of nodes) {
		    if (node.kind === "tool-result") walk(node);
		  }
		  return [...counts.entries()].map(([name, c]) => ({ name, count: c.count, errorCount: c.errorCount })).sort((a, b) => b.count - a.count);
		}
		function toolDurationTop(callsByRequest) {
		  const rows = /* @__PURE__ */ new Map();
		  for (const calls of callsByRequest) {
		    for (const call of calls) {
		      const d = call.durationMs;
		      if (d === null || Number.isNaN(d)) continue;
		      const row = rows.get(call.name) ?? { calls: 0, totalMs: 0, maxMs: 0 };
		      row.calls += 1;
		      row.totalMs += d;
		      row.maxMs = Math.max(row.maxMs, d);
		      rows.set(call.name, row);
		    }
		  }
		  return [...rows.entries()].map(([name, r]) => ({ name, calls: r.calls, totalMs: r.totalMs, avgMs: r.calls > 0 ? r.totalMs / r.calls : 0, maxMs: r.maxMs })).sort((a, b) => b.totalMs - a.totalMs);
		}
		function countAnomalies(nodes) {
		  const counts = { turnErrors: 0, maxTokenHits: 0, modelRetries: 0, interrupted: 0, commands: 0 };
		  for (const node of nodes) {
		    switch (node.kind) {
		      case "turn-error":
		        counts.turnErrors += 1;
		        break;
		      case "turn-max-tokens":
		        counts.maxTokenHits += 1;
		        break;
		      case "model-retry":
		        counts.modelRetries += 1;
		        break;
		      case "command":
		        counts.commands += 1;
		        break;
		      case "assistant":
		        if (node.interrupted === true) counts.interrupted += 1;
		        break;
		      default:
		        break;
		    }
		  }
		  return counts;
		}
		function assistantTtft(nodes) {
		  const out = [];
		  for (const node of nodes) {
		    if (node.kind !== "assistant") continue;
		    if (!Number.isInteger(node.seq)) continue;
		    const timing = node.timing;
		    if (timing?.stepStartTime === null || timing?.firstTokenTime === null) continue;
		    if (timing === void 0 || timing.stepStartTime === null || timing.firstTokenTime === null) continue;
		    out.push({ seq: node.seq, turn: node.turn, ttftMs: Math.max(0, timing.firstTokenTime - timing.stepStartTime) });
		  }
		  out.sort((a, b) => a.seq - b.seq);
		  return out;
		}
		function modelSwitchCount(series) {
		  let switches = 0;
		  let prev = null;
		  for (let i = series.length - 1; i >= 0; i -= 1) {
		    const current = series[i]?.model ?? null;
		    if (current === null) continue;
		    if (prev !== null && current !== prev) switches += 1;
		    prev = current;
		  }
		  return switches;
		}
		function requestSeries(requests, toolCalls) {
		  const series = [];
		  const details = [];
		  for (const request of requests) {
		    const usage = readUsage(request.usage);
		    const usageReported = Object.values(usage).some((value) => value !== void 0);
		    const input = toInt(usage.inputTokens) + toInt(usage.cacheReadTokens) + toInt(usage.cacheWriteTokens);
		    const durationMs = request.completedAt !== null && request.status !== "running" ? Math.max(0, request.completedAt - request.startedAt) : null;
		    const sample = {
		      seq: request.startSeq,
		      resultSeq: request.resultSeq ?? null,
		      turn: request.turn ?? 0,
		      step: request.step ?? 0,
		      status: request.status,
		      purpose: request.purpose === "compaction" ? "compaction" : "assistant",
		      inputTokens: input,
		      cacheReadTokens: toInt(usage.cacheReadTokens),
		      cacheWriteTokens: toInt(usage.cacheWriteTokens),
		      outputTokens: toInt(usage.outputTokens),
		      reasoningTokens: toInt(usage.reasoningTokens),
		      startedAt: request.startedAt,
		      durationMs,
		      provider: request.providerMetadata?.provider ?? request.requestConfig?.provider ?? null,
		      model: request.providerMetadata?.model ?? request.requestConfig?.model ?? null,
		      error: request.error ?? request.errorCode ?? null,
		      usageReported,
		      costUsd: request.status === "running" || !usageReported ? null : estimateRequestCostUsd(request.providerMetadata?.provider ?? request.requestConfig?.provider ?? null, request.providerMetadata?.model ?? request.requestConfig?.model ?? null, {
		        uncachedInputTokens: input - toInt(usage.cacheReadTokens) - toInt(usage.cacheWriteTokens),
		        cacheReadTokens: toInt(usage.cacheReadTokens),
		        cacheWriteTokens: toInt(usage.cacheWriteTokens),
		        outputTokens: toInt(usage.outputTokens)
		      })
		    };
		    series.push(sample);
		    const calls = toolCalls.get(request.resultSeq ?? -1) ?? [];
		    const prompt = request.prompt;
		    details.push({
		      ...sample,
		      thinking: request.requestConfig?.thinking !== void 0 && request.requestConfig.thinking !== "disabled",
		      reasoningEffort: request.requestConfig?.reasoningEffort ?? null,
		      temperature: request.requestConfig?.temperature ?? null,
		      maxTokens: request.requestConfig?.maxTokens ?? null,
		      retry: ("retry" in request ? request.retry : void 0) ?? 0,
		      maxRetries: ("maxRetries" in request ? request.maxRetries : void 0) ?? 0,
		      retryDelayMs: ("retryDelayMs" in request ? request.retryDelayMs : void 0) ?? null,
		      promptSystemChars: prompt?.system === void 0 ? null : prompt.system.length,
		      promptToolNames: prompt?.tools?.map((t) => t.name ?? "").filter((n) => n.length > 0) ?? [],
		      toolCalls: calls,
		      costUsd: sample.costUsd
		    });
		  }
		  series.sort((a, b) => b.seq - a.seq);
		  details.sort((a, b) => b.seq - a.seq);
		  return { series, details };
		}
		function totalReasoning(series) {
		  return series.reduce((sum, s) => sum + s.reasoningTokens, 0);
		}
		function modelSplit(series, ttftBySeq) {
		  const rows = /* @__PURE__ */ new Map();
		  for (const s of series) {
		    const key = `${s.provider ?? "unknown"}\0${s.model ?? "unknown"}`;
		    const row = rows.get(key) ?? {
		      model: s.model ?? "unknown",
		      provider: s.provider ?? "unknown",
		      requests: 0,
		      inputTokens: 0,
		      outputTokens: 0,
		      costUsd: 0,
		      errorCount: 0,
		      durSum: 0,
		      durN: 0,
		      ttftSum: 0,
		      ttftN: 0
		    };
		    row.requests += 1;
		    row.inputTokens += s.inputTokens;
		    row.outputTokens += s.outputTokens;
		    row.costUsd = row.costUsd === null || s.costUsd === null ? null : row.costUsd + s.costUsd;
		    if (s.status === "error") row.errorCount += 1;
		    if (s.status === "complete" && s.durationMs !== null) {
		      row.durSum += s.durationMs;
		      row.durN += 1;
		    }
		    const t = s.resultSeq !== null ? ttftBySeq.get(s.resultSeq) : void 0;
		    if (t !== void 0) {
		      row.ttftSum += t;
		      row.ttftN += 1;
		    }
		    rows.set(key, row);
		  }
		  return [...rows.values()].map((r) => ({
		    model: r.model,
		    provider: r.provider,
		    requests: r.requests,
		    inputTokens: r.inputTokens,
		    outputTokens: r.outputTokens,
		    costUsd: r.costUsd,
		    errorCount: r.errorCount,
		    avgDurationMs: r.durN > 0 ? Math.round(r.durSum / r.durN) : null,
		    avgTtftMs: r.ttftN > 0 ? Math.round(r.ttftSum / r.ttftN) : null
		  })).sort((a, b) => b.requests - a.requests);
		}
		function turnInputSeries(series) {
		  const byTurn = /* @__PURE__ */ new Map();
		  for (const s of series) {
		    if (s.purpose === "compaction") continue;
		    byTurn.set(s.turn, (byTurn.get(s.turn) ?? 0) + s.inputTokens);
		  }
		  const turns = [...byTurn.keys()].sort((a, b) => a - b);
		  return turns.map((turn, i) => ({
		    turn,
		    inputTokens: byTurn.get(turn) ?? 0,
		    delta: i === 0 ? null : (byTurn.get(turn) ?? 0) - (byTurn.get(turns[i - 1]) ?? 0)
		  }));
		}
		function compactionEffect(series) {
		  const ordered = [...series].sort((a, b) => b.seq - a.seq);
		  const out = [];
		  let after;
		  for (const s of ordered) {
		    if (s.purpose === "assistant") {
		      after = s;
		      continue;
		    }
		    if (s.purpose !== "compaction") continue;
		    const before = s.inputTokens;
		    const afterTokens = after?.inputTokens ?? null;
		    const recovered = before > 0 && afterTokens !== null ? Math.max(0, before - afterTokens) : null;
		    out.push({
		      turn: s.turn,
		      seq: s.seq,
		      beforeTokens: before > 0 ? before : null,
		      afterTokens,
		      recoveredTokens: recovered,
		      recoveredPct: recovered !== null && before > 0 ? Math.round(recovered / before * 100) : null
		    });
		  }
		  out.reverse();
		  return out;
		}
		function percentileStats(values) {
		  const ds = [...values].sort((a, b) => a - b);
		  if (ds.length === 0) return { p50: null, p95: null, p99: null, sampleCount: 0, buckets: [] };
		  const pct = (p) => {
		    const idx = Math.min(ds.length - 1, Math.round(p / 100 * (ds.length - 1)));
		    return ds[idx];
		  };
		  const max = ds[ds.length - 1];
		  const n = 10;
		  const buckets = Array.from({ length: n }, (_, b) => {
		    const lo = max * b / n;
		    const hi = max * (b + 1) / n;
		    const count = ds.filter((d) => b === n - 1 ? d >= lo && d <= hi : d >= lo && d < hi).length;
		    return { loMs: Math.round(lo), hiMs: Math.round(hi), count };
		  });
		  return { p50: pct(50), p95: pct(95), p99: pct(99), sampleCount: ds.length, buckets };
		}
		function durationStats(series) {
		  return percentileStats(
		    series.filter((s) => s.status === "complete" && s.durationMs !== null && s.durationMs >= 0).map((s) => s.durationMs)
		  );
		}
		function ttftStats(samples) {
		  return percentileStats(samples.map((s) => s.ttftMs));
		}
		function commandRows(nodes) {
		  const counts = /* @__PURE__ */ new Map();
		  for (const node of nodes) {
		    if (node.kind !== "command" || node.name === null) continue;
		    counts.set(node.name, (counts.get(node.name) ?? 0) + 1);
		  }
		  return [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);
		}
		function contextInjection(nodes) {
		  const map = /* @__PURE__ */ new Map();
		  for (const node of nodes) {
		    if (node.kind !== "context") continue;
		    const label = node.producer.label ?? "?";
		    const form = node.form ?? "opaque";
		    const key = `${label}\0${form}`;
		    const row = map.get(key) ?? { label, role: node.producer.role, form, count: 0, chars: 0 };
		    row.count += 1;
		    row.chars += node.content.reduce(
		      (n, b) => n + ("text" in b && typeof b.text === "string" ? b.text.length : 0),
		      0
		    );
		    map.set(key, row);
		  }
		  return [...map.values()].sort((a, b) => b.chars - a.chars).slice(0, 10);
		}
		function detectLoops(details) {
		  const flat = [];
		  for (const d of [...details].reverse()) {
		    for (const c of d.toolCalls) flat.push({ seq: d.seq, name: c.name, args: c.argsRaw });
		  }
		  const loops = [];
		  let runStart = 0;
		  for (let i = 1; i <= flat.length; i++) {
		    const same = i < flat.length && flat[i].name === flat[i - 1].name && flat[i].args === flat[i - 1].args;
		    if (same) continue;
		    const run = i - runStart;
		    if (run >= 3) {
		      const seqs = [...new Set(flat.slice(runStart, i).map((f) => f.seq))];
		      loops.push({ name: flat[runStart].name, count: run, seqs });
		    }
		    runStart = i;
		  }
		  return loops;
		}
		function topErrors(series) {
		  const counts = /* @__PURE__ */ new Map();
		  for (const s of series) {
		    if (s.status !== "error" || s.error === null) continue;
		    const msg = s.error.trim() === "" ? "(no message)" : s.error;
		    counts.set(msg, (counts.get(msg) ?? 0) + 1);
		  }
		  return [...counts.entries()].map(([message, count]) => ({ message, count })).sort((a, b) => b.count - a.count).slice(0, 5);
		}
		function turnDurations(snapshot, nodes, nowMs) {
		  let maxNodeTime = 0;
		  for (const node of nodes) {
		    if (node.time > maxNodeTime) maxNodeTime = node.time;
		  }
		  const windowTail = Math.min(maxNodeTime, nowMs);
		  const out = [];
		  for (const [turn, timing] of snapshot.turnTimings) {
		    const closed = timing.endTime !== void 0;
		    const end = closed ? timing.endTime : Math.max(timing.startTime, windowTail);
		    out.push({ turn, durationMs: Math.max(0, end - timing.startTime), closed });
		  }
		  out.sort((a, b) => b.turn - a.turn);
		  return out.slice(0, 12);
		}
		function deriveMetrics(input, nowMs) {
		  const toolCalls = indexToolCalls(input.nodes);
		  const { series, details } = requestSeries(input.requests, toolCalls);
		  const roles = countRoles(input.nodes);
		  const histogram = toolHistogram(input.nodes);
		  const anomalies = countAnomalies(input.nodes);
		  const ttft = assistantTtft(input.nodes);
		  const requestCount = series.length;
		  let completedRequests = 0;
		  let runningRequests = 0;
		  let failedRequests = 0;
		  let compactionRequests = 0;
		  for (const s of series) {
		    if (s.status === "running") runningRequests += 1;
		    else if (s.status === "error") failedRequests += 1;
		    else completedRequests += 1;
		    if (s.purpose === "compaction") compactionRequests += 1;
		  }
		  let toolCallCount = 0;
		  let toolErrorCount = 0;
		  for (const h of histogram) {
		    toolCallCount += h.count;
		    toolErrorCount += h.errorCount;
		  }
		  let compactionRecoveredTokens = null;
		  let compactionRecoveredItems = null;
		  for (const node of input.nodes) {
		    if (node.kind !== "compaction") continue;
		    if (node.shadowedTokenCount !== null) {
		      compactionRecoveredTokens = (compactionRecoveredTokens ?? 0) + node.shadowedTokenCount;
		    }
		    if (node.shadowedItemCount !== null) {
		      compactionRecoveredItems = (compactionRecoveredItems ?? 0) + node.shadowedItemCount;
		    }
		  }
		  let retryWaitMs = 0;
		  let retriedRequests = 0;
		  for (const d of details) {
		    if (d.retryDelayMs !== null && d.retryDelayMs > 0) retryWaitMs += d.retryDelayMs;
		    if (d.retry > 0) retriedRequests += 1;
		  }
		  let failedDurSum = 0;
		  let failedDurN = 0;
		  let failedInputSum = 0;
		  let failedN = 0;
		  let doneDurSum = 0;
		  let doneDurN = 0;
		  let doneInputSum = 0;
		  let doneN = 0;
		  for (const s of series) {
		    if (s.status === "error") {
		      failedN += 1;
		      failedInputSum += s.inputTokens;
		      if (s.durationMs !== null) {
		        failedDurSum += s.durationMs;
		        failedDurN += 1;
		      }
		    } else if (s.status === "complete") {
		      doneN += 1;
		      doneInputSum += s.inputTokens;
		      if (s.durationMs !== null) {
		        doneDurSum += s.durationMs;
		        doneDurN += 1;
		      }
		    }
		  }
		  const failedStats = {
		    count: failedN,
		    avgDurationMs: failedDurN > 0 ? Math.round(failedDurSum / failedDurN) : null,
		    avgInputTokens: failedN > 0 ? Math.round(failedInputSum / failedN) : null
		  };
		  const completedStats = {
		    count: doneN,
		    avgDurationMs: doneDurN > 0 ? Math.round(doneDurSum / doneDurN) : null,
		    avgInputTokens: doneN > 0 ? Math.round(doneInputSum / doneN) : null
		  };
		  const effortMap = /* @__PURE__ */ new Map();
		  for (const d of details) {
		    if (d.purpose === "compaction") continue;
		    const effort = d.reasoningEffort ?? "default";
		    const row = effortMap.get(effort) ?? { requests: 0, reasoningTokens: 0 };
		    row.requests += 1;
		    row.reasoningTokens += d.reasoningTokens;
		    effortMap.set(effort, row);
		  }
		  const effortStats = [...effortMap.entries()].map(([effort, row]) => ({ effort, ...row })).sort((a, b) => b.requests - a.requests);
		  const started = series.filter((s) => s.startedAt !== null).map((s) => ({ s, t: s.startedAt })).sort((a, b) => a.t - b.t);
		  const callsPerSeq = /* @__PURE__ */ new Map();
		  for (const d of details) callsPerSeq.set(d.seq, d.toolCalls.length);
		  let throughput = [];
		  if (started.length > 0) {
		    const first = started[0].t;
		    const last = started[started.length - 1].t;
		    const span = Math.max(1, last - first);
		    const bucketCount = Math.min(30, Math.max(5, Math.ceil(span / 6e4)));
		    const bucketMs = Math.ceil(span / bucketCount);
		    const buckets = Array.from({ length: bucketCount }, () => ({
		      bucketMs: 0,
		      requests: 0,
		      inputTokens: 0,
		      outputTokens: 0,
		      calls: 0,
		      failed: 0
		    }));
		    for (const { s, t } of started) {
		      const idx = Math.min(bucketCount - 1, Math.floor((t - first) / bucketMs));
		      const b = buckets[idx];
		      b.bucketMs = first + idx * bucketMs;
		      b.requests += 1;
		      b.inputTokens += s.inputTokens;
		      b.outputTokens += s.outputTokens;
		      b.calls += callsPerSeq.get(s.seq) ?? 0;
		      if (s.status === "error") b.failed += 1;
		    }
		    throughput = buckets;
		  }
		  const toolStorm = throughput.map((b) => ({ bucketMs: b.bucketMs, calls: b.calls }));
		  const noProgress = details.filter((d) => d.status === "complete" && d.usageReported && d.outputTokens < 50 && d.toolCalls.length >= 3).map((d) => ({ seq: d.seq, turn: d.turn, outputTokens: d.outputTokens, toolCalls: d.toolCalls.length }));
		  const loops = detectLoops(details);
		  const modelTimeline = [...series].reverse().map((s) => ({ seq: s.seq, turn: s.turn, model: s.model ?? "?" }));
		  const modelSwitchSeqs = [];
		  {
		    let prev = null;
		    for (const m of modelTimeline) {
		      if (m.model === "?") continue;
		      if (prev !== null && m.model !== prev) modelSwitchSeqs.push(m.seq);
		      prev = m.model;
		    }
		  }
		  const tokenUsage = input.tokenUsage;
		  const inputTokens = tokenUsage === void 0 ? 0 : billedInputTokens(tokenUsage);
		  const outputTokens = tokenUsage?.outputTokens ?? 0;
		  const cacheReadTokens = tokenUsage?.cacheReadTokens ?? 0;
		  const cacheWriteTokens = tokenUsage?.cacheWriteTokens ?? 0;
		  const hit = tokenUsage === void 0 ? null : cacheHitPercent(tokenUsage);
		  const reasoningTokens = totalReasoning(series);
		  const windowOutputTokens = series.reduce((sum, s) => sum + s.outputTokens, 0);
		  let costTotal = 0;
		  let costSavings = 0;
		  let unpricedRequests = 0;
		  for (const d of details) {
		    if (d.costUsd === null) {
		      unpricedRequests += 1;
		      continue;
		    }
		    costTotal += d.costUsd;
		    costSavings += estimateCacheSavingsUsd(d.provider, d.model, d.cacheReadTokens) ?? 0;
		  }
		  const stats = input.stats;
		  const avgTtftMs = stats !== void 0 && stats.ttftSteps > 0 ? stats.ttftMs / stats.ttftSteps : null;
		  const decodeTokensPerSec = stats !== void 0 && stats.decodeMs > 0 ? stats.decodeTokens / stats.decodeMs * 1e3 : null;
		  const totalDurationMs = (stats?.llmMs ?? 0) + (stats?.toolMs ?? 0);
		  const ttftBySeq = new Map(ttft.map((t) => [t.seq, t.ttftMs]));
		  const ttftByCache = (() => {
		    let hitSum = 0;
		    let hitN = 0;
		    let missSum = 0;
		    let missN = 0;
		    for (const s of series) {
		      if (s.status === "running") continue;
		      const t = s.resultSeq !== null ? ttftBySeq.get(s.resultSeq) : void 0;
		      if (t === void 0) continue;
		      if (s.cacheReadTokens > 0) {
		        hitSum += t;
		        hitN += 1;
		      } else {
		        missSum += t;
		        missN += 1;
		      }
		    }
		    return {
		      hitAvgMs: hitN > 0 ? Math.round(hitSum / hitN) : null,
		      hitN,
		      missAvgMs: missN > 0 ? Math.round(missSum / missN) : null,
		      missN
		    };
		  })();
		  const contextWindow = input.pressure?.contextWindow ?? null;
		  const contextTrend = [...series].reverse().map((s) => ({
		    seq: s.seq,
		    turn: s.turn,
		    inputTokens: s.inputTokens,
		    pct: contextWindow !== null && contextWindow > 0 ? Math.min(100, Math.round(s.inputTokens / contextWindow * 100)) : null
		  }));
		  return {
		    running: input.running,
		    turns: stats?.turns ?? 0,
		    steps: stats?.steps ?? 0,
		    requestCount,
		    completedRequests,
		    runningRequests,
		    failedRequests,
		    inputTokens,
		    outputTokens,
		    reasoningTokens,
		    windowOutputTokens,
		    cacheReadTokens,
		    cacheWriteTokens,
		    cacheHitPercent: hit,
		    roles,
		    toolCallCount,
		    toolErrorCount,
		    toolHistogram: histogram,
		    toolDurationTop: toolDurationTop(details.map((d) => d.toolCalls)),
		    compactionRequests,
		    compactionRecoveredTokens,
		    compactionRecoveredItems,
		    anomalies,
		    commandRows: commandRows(input.nodes),
		    modelSwitchCount: modelSwitchCount(series),
		    assistantTtft: ttft,
		    ttftStats: ttftStats(ttft),
		    effortStats,
		    retryWaitMs,
		    retriedRequests,
		    failedStats,
		    completedStats,
		    throughput,
		    loops,
		    noProgress,
		    toolStorm,
		    modelTimeline,
		    modelSwitchSeqs,
		    ttftByCache,
		    contextTrend,
		    contextInjection: contextInjection(input.nodes),
		    costEstimateUsd: { total: details.length === 0 || unpricedRequests > 0 ? null : costTotal, cacheSavings: details.length === 0 || unpricedRequests > 0 ? null : costSavings, knownTotal: costTotal, unpricedRequests },
		    llmMs: stats?.llmMs ?? 0,
		    toolMs: stats?.toolMs ?? 0,
		    ttftMs: stats?.ttftMs ?? 0,
		    ttftSteps: stats?.ttftSteps ?? 0,
		    decodeMs: stats?.decodeMs ?? 0,
		    decodeTokens: stats?.decodeTokens ?? 0,
		    avgTtftMs,
		    decodeTokensPerSec,
		    totalDurationMs,
		    turnDurations: turnDurations(input.snapshot, input.nodes, nowMs),
		    context: input.context ?? null,
		    pressure: input.pressure ?? null,
		    series,
		    details,
		    modelSplit: modelSplit(series, ttftBySeq),
		    turnInput: turnInputSeries(series),
		    compactionEffect: compactionEffect(series),
		    durationStats: durationStats(series),
		    topErrors: topErrors(series)
		  };
		}

		// src/client/icons.tsx
		var import_jsx_runtime = require("react/jsx-runtime");
		var paths = {
		  pulse: "M2 12h4l3-7 5 14 3-7h5",
		  layers: "m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5",
		  context: "M5 3H3v6m16-6h2v6M3 15v6h6m12-6v6h-6M8 8h8v8H8z",
		  clock: "M12 8v5l3 2M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0",
		  overview: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
		  analysis: "M4 20V10m8 10V4m8 16v-7M2 21h20",
		  requests: "m4 7 4 5-4 5m7 0h9M3 3h18v18H3z",
		  agents: "M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M4 21v-2a8 8 0 0 1 16 0v2M3 8v7m18-7v7",
		  arrow: "M5 12h14m-5-5 5 5-5 5",
		  chevron: "m6 9 6 6 6-6"
		};
		function DashboardIcon({ name }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "dshd-icon", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: paths[name] }) });
		}

		// src/client/dashboard.css.ts
		var PLUGIN_ID = "dsh-client-ui-dashboard";
		function injectDashboardStyles() {
		  if (typeof document === "undefined") return;
		  const tagId = `${PLUGIN_ID}/dashboard.css`;
		  const existing = document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`);
		  if (existing !== null) {
		    if (existing.textContent !== css) existing.textContent = css;
		    return;
		  }
		  const tag = document.createElement("style");
		  tag.dataset.plugin = PLUGIN_ID;
		  tag.dataset.pluginCss = tagId;
		  tag.textContent = css;
		  document.head.appendChild(tag);
		}
		var CHART_COLORS = {
		  error: "var(--dsw-alias-state-error-primary)",
		  user: "var(--dshd-accent)",
		  assistant: "var(--dshd-teal)",
		  system: "var(--dshd-muted)",
		  tool: "var(--dshd-indigo)",
		  other: "var(--dshd-muted)",
		  input: "var(--dshd-accent)",
		  cacheRead: "var(--dshd-teal)",
		  cacheWrite: "var(--dshd-amber)",
		  output: "var(--dshd-indigo)",
		  reasoning: "var(--dshd-indigo)",
		  llm: "var(--dshd-accent)",
		  toolTime: "var(--dshd-teal)",
		  messages: "var(--dshd-accent)",
		  tools: "var(--dshd-indigo)",
		  systemPrompt: "var(--dshd-muted)",
		  steering: "var(--dshd-amber)"
		};
		var css = String.raw`
		/* The host owns the theme. Data colors are distinct from error and warning states. */
		.dshd-root *{box-sizing:border-box}
		.dshd-muted{color:var(--dsw-alias-label-tertiary)}
		.dshd-liveDot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:dshdPulse 1.4s ease-in-out infinite}
		@keyframes dshdPulse{0%,100%{opacity:1}50%{opacity:.35}}
		@keyframes dshdTipIn{from{opacity:0}to{opacity:1}}
		.dshd-spacer{flex:1}
		.dshd-col{display:flex;flex-direction:column;gap:12px;min-width:0}
		.dshd-subTitle{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-top:2px}
		.dshd-statValue[data-accent]{color:var(--dsw-alias-state-business-primary)}
		.dshd-statValue[data-warn]{color:var(--dsw-alias-state-warn-primary)}
		.dshd-statValue[data-good]{color:var(--dsw-alias-state-success-primary)}
		.dshd-statValue[data-bad]{color:var(--dsw-alias-state-error-primary)}
		.dshd-statValue[data-reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 62%,var(--dsw-alias-state-error-primary) 38%)}
		.dshd-legend{display:flex;flex-direction:column;gap:4px;min-width:140px}
		.dshd-legendRow{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;max-width:100%}
		.dshd-legendSwatch{width:9px;height:9px;border-radius:2.5px;flex:none}
		.dshd-legendName{min-width:0;overflow:hidden;text-overflow:ellipsis}
		.dshd-legendValue{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:550}
		.dshd-legendPercent{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;min-width:34px;text-align:right}
		.dshd-stackSegment{height:100%;min-width:2px;transition:width .25s ease}
		.dshd-stackEmpty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:10.5px}
		.dshd-chartBody{display:flex;flex-direction:column;gap:8px;min-width:0}
		.dshd-hbar{display:flex;align-items:center;gap:8px;font-size:11.5px;min-width:0;flex-wrap:wrap}
		.dshd-hbarSubLine{flex:1 1 100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
		.dshd-hbarName{width:clamp(64px,30%,120px);flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
		.dshd-hbarTrack{flex:1;height:12px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
		.dshd-hbarFill{display:block;height:100%;border-radius:6px;transition:width .25s ease}
		.dshd-errorMark{color:var(--dsw-alias-state-error-primary);font-weight:700;margin-left:1px}
		.dshd-hbarValue{flex:none;min-width:44px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap}
		.dshd-hbarSub{flex:none;min-width:0;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
		.dshd-table tbody tr{cursor:pointer;transition:background .12s}
		.dshd-table tbody tr:hover{background:var(--dsw-alias-interactive-bg-hover)}
		.dshd-table tbody tr[data-open]{background:var(--dsw-alias-interactive-bg-active,var(--dsw-alias-interactive-bg-hover))}
		.dshd-table tbody tr[data-error] td:first-child{box-shadow:inset 3px 0 0 var(--dsw-alias-state-error-primary)}
		.dshd-table tbody tr[data-error]{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 6%,transparent)}
		.dshd-table tbody tr[data-error]:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
		.dshd-tableEmpty{text-align:center;color:var(--dsw-alias-label-tertiary);padding:18px 0!important}
		.dshd-table tbody tr:last-child td{border-bottom:none}
		.dshd-seq{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-state-business-primary);font-weight:600;display:inline-flex;align-items:center;gap:4px}
		.dshd-chevron{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:9px;transition:transform .15s ease,background .12s;border-radius:5px;cursor:pointer;margin:-4px 0}
		.dshd-chevron:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
		tr[data-open] .dshd-chevron{transform:rotate(90deg)}
		.dshd-chevronSvg{display:block;transition:transform .15s ease}
		.dshd-chevron[data-open] .dshd-chevronSvg,.dshd-chevronSvg[data-open]{transform:rotate(90deg)}
		.dshd-warnIcon{display:inline-block;vertical-align:-1px;flex:none}
		.dshd-model{max-width:150px;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);display:inline-block;vertical-align:bottom;min-width:0}
		.dshd-statusPill[data-s=complete]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
		.dshd-statusPill[data-s=running]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 30%,transparent)}
		.dshd-statusPill[data-s=error]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 30%,transparent)}
		.dshd-statusPill[data-s=compaction]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 30%,transparent)}
		.dshd-detail{grid-column:1/-1;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:12px 14px;font-size:12px;display:flex;flex-direction:column;gap:10px;cursor:default}
		.dshd-detailHead{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
		.dshd-detailTitle{font-weight:600;font-size:12.5px}
		.dshd-kv{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px 16px}
		.dshd-kvItem{display:flex;flex-direction:column;gap:1px;min-width:0}
		.dshd-kvKey{font-size:10px;color:var(--dsw-alias-label-tertiary);text-transform:uppercase;letter-spacing:.04em}
		.dshd-kvValue{font-size:12px;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
		.dshd-errorBox{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;padding:8px 10px;font-size:11.5px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);word-break:break-word;white-space:pre-wrap}
		.dshd-toolRow{display:flex;align-items:center;gap:8px;font-size:11.5px;padding:4px 0;border-bottom:1px dashed var(--dsw-alias-border-l1)}
		.dshd-toolRow:last-child{border-bottom:none}
		.dshd-toolName{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-primary);font-weight:550;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-toolArgs{color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px}
		.dshd-toolDur{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
		.dshd-toolErr{color:var(--dsw-alias-state-error-primary);font-weight:600}
		.dshd-tag{font-size:10px;border-radius:5px;padding:1px 6px;border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 30%,transparent);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 10%,transparent);color:var(--dsw-alias-label-secondary);font-weight:600;white-space:nowrap}
		.dshd-tag[data-k="reasoning"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent)}
		.dshd-tag[data-k="compaction"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent)}
		.dshd-tag[data-k="error"]{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent)}
		.dshd-tag[data-k=reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,var(--dsw-alias-state-warn-primary) 45%)}
		.dshd-tag[data-k=compaction]{color:var(--dsw-alias-state-warn-primary)}
		.dshd-tag[data-k=error]{color:var(--dsw-alias-state-error-primary)}
		.dshd-seriesTotal{font-size:11px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-weight:550}
		.dshd-scopeTag{font-family:var(--ds-font-family-base,ui-sans-serif,system-ui,sans-serif);font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 25%,transparent);border-radius:4px;padding:0 4px;vertical-align:1px;white-space:nowrap}
		.dshd-filters{display:flex;gap:6px;flex-wrap:wrap}
		.dshd-filterBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;white-space:nowrap}
		.dshd-filterBtn:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
		.dshd-filterBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
		.dshd-newBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;cursor:pointer;transition:background .15s;white-space:nowrap}
		.dshd-newBtn:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
		.dshd-viewTab{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-tertiary);background:transparent;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:background .15s,color .15s}
		.dshd-viewTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
		.dshd-viewTab[data-current]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}
		.dshd-search:focus{border-color:var(--dsw-alias-state-business-primary)}
		.dshd-search::placeholder{color:var(--dsw-alias-label-tertiary)}
		.dshd-groups{display:flex;flex-direction:column;gap:8px}
		.dshd-group{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-base)}
		.dshd-groupHead{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;font-size:11.5px;background:color-mix(in srgb,var(--dsw-alias-border-l2) 22%,transparent);border:none;cursor:pointer;color:var(--dsw-alias-label-primary);text-align:left}
		.dshd-groupHead:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 7%,var(--dsw-alias-bg-base))}
		.dshd-groupName{flex:1;min-width:0;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-groupStats{margin-left:auto;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		.dshd-groupBody{padding:2px 0}
		.dshd-groupBody .dshd-table{border:none;margin:0}
		.dshd-modelTimeline{padding:2px 0 4px}
		.dshd-modelTimeline svg circle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
		.dshd-modelLegend{display:flex;flex-wrap:wrap;gap:8px;padding:4px 2px 0;font-size:10px;color:var(--dsw-alias-label-secondary)}
		.dshd-modelLegendItem{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
		.dshd-modelLegendItem i{width:8px;height:8px;border-radius:50%;display:inline-block}
		.dshd-modelNote{font-size:10px;color:var(--dsw-alias-label-secondary);padding:2px 2px 0}
		.dshd-formBadge{display:inline-block;margin-left:6px;padding:0 6px;font-size:9.5px;font-weight:600;border-radius:999px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);vertical-align:1px}
		.dshd-formBadge[data-f="instructions"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent)}
		.dshd-formBadge[data-f="recall"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
		.dshd-formBadge[data-f="snapshot"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 8%,transparent)}
		.dshd-formBadge[data-f="opaque"]{color:var(--dsw-alias-label-tertiary)}
		.dshd-streamDot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite;flex:none}
		.dshd-streamText{font-variant-numeric:tabular-nums}
		.dshd-streamTool{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}
		.dshd-streamHead{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
		.dshd-spark{display:block;max-width:100%}
		.dshd-ttftStats{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:normal}
		.dshd-streamWarn{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;font-weight:700;color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}
		.dshd-delta{font-size:10px;font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);border-radius:999px;padding:0 6px}
		.dshd-deltaUp{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
		.dshd-deltaDown{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,transparent)}
		.dshd-percRow{display:flex;gap:14px;flex-wrap:wrap}
		.dshd-perc{font-size:11px;color:var(--dsw-alias-label-tertiary)}
		.dshd-perc b{color:var(--dsw-alias-label-primary);font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);margin-left:2px}
		.dshd-hist{display:flex;align-items:flex-end;gap:3px;height:52px;border-bottom:1px solid var(--dsw-alias-border-l1)}
		.dshd-histCol{flex:1;height:100%;display:flex;align-items:flex-end;min-width:0}
		.dshd-histBar{width:100%;border-radius:2px 2px 0 0;transition:height .25s ease}
		.dshd-errRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0}
		.dshd-errMsg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
		.dshd-errCount{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-state-error-primary);font-weight:650;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
		.dshd-compactRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0;flex-wrap:wrap}
		.dshd-compactSeq{flex:none;font-weight:600;color:var(--dsw-alias-state-business-primary)}
		.dshd-compactArrow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-secondary)}
		.dshd-compactRecovered{flex:none;font-variant-numeric:tabular-nums;font-weight:650;color:var(--dsw-alias-state-success-primary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
		.dshd-turnList{display:flex;flex-direction:column;gap:6px}
		.dshd-turnRow{display:flex;align-items:center;gap:8px;font-size:11.5px}
		.dshd-turnName{min-width:56px;flex:none;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
		.dshd-turnTrack{flex:1;height:10px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
		.dshd-turnValue{min-width:56px;text-align:right;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px}
		.dshd-pager{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:2px}
		.dshd-pagerInfo{font-size:11px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
		.dshd-pagerBtns{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
		.dshd-pageBtn{min-width:26px;height:26px;padding:0 6px;display:inline-flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;font-variant-numeric:tabular-nums}
		.dshd-pageBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
		.dshd-pageBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
		.dshd-pageBtn:disabled{opacity:.38;cursor:not-allowed}
		.dshd-pageEllipsis{color:var(--dsw-alias-label-tertiary);font-size:11px;padding:0 2px;user-select:none}
		.dshd-pageSize{display:inline-flex;align-items:center;gap:6px;font-size:11px}
		.dshd-pageSize select{height:26px;padding:0 6px;font-size:11.5px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;cursor:pointer;font-variant-numeric:tabular-nums}
		.dshd-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-radius:6px}
		@media (prefers-reduced-motion: reduce){.dshd-root *,.dshd-root *::before,.dshd-root *::after{transition:none!important;animation:none!important}
		  .dshd-liveDot{animation:none}}
		.dshd-seriesLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-vbars{display:flex;align-items:flex-end;gap:2px;position:relative;padding-top:8px;box-sizing:border-box}
		.dshd-vcol{flex:1;min-width:0;height:100%;position:relative;display:flex;align-items:flex-end;cursor:crosshair}
		.dshd-vbarTrack{width:100%;height:100%;display:flex;align-items:flex-end;position:relative}
		.dshd-vbar{width:100%;border-radius:3px 3px 1px 1px;transition:height .25s ease,transform .15s ease,filter .15s ease;transform-origin:bottom center;min-height:0}
		.dshd-vbar[data-hover]{transform:scaleY(1.12);filter:brightness(1.12)}
		.dshd-vcol[data-status=running] .dshd-vbar{animation:dshdPulse 1.4s ease-in-out infinite}
		.dshd-vcol[data-status=error] .dshd-vbar{opacity:.85;box-shadow:inset 0 0 0 1px var(--dsw-alias-state-error-primary)}
		.dshd-vtip{position:absolute;left:50%;transform:translateX(-50%);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 88%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:4px 9px;font-size:11px;line-height:1.4;color:var(--dsw-alias-label-primary);white-space:normal;overflow-wrap:anywhere;text-align:center;width:max-content;max-width:min(240px,80vw);z-index:20;pointer-events:none;box-shadow:var(--dsw-shadow-lv2,0 4px 12px rgb(0 0 0 / .22));font-variant-numeric:tabular-nums;box-sizing:border-box;animation:dshdTipIn .12s ease-out}
		.dshd-areaWrap{position:relative;width:100%;cursor:crosshair}
		.dshd-areaGuide{position:absolute;top:0;bottom:0;width:0;border-left:1px dashed;opacity:.55;pointer-events:none;z-index:2}
		.dshd-areaDot{position:absolute;width:9px;height:9px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid var(--dsw-alias-bg-layer-1);box-shadow:0 1px 4px rgb(0 0 0 / .3);pointer-events:none;z-index:3}
		.dshd-areaWrap .dshd-vtip{transform:translate(var(--tip-dx,-50%),calc(-100% - 6px))}
		.dshd-gaugeRow{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
		.dshd-gaugeBox{display:flex;flex-direction:column;align-items:center;gap:2px;flex:none;max-width:100%;min-width:0}
		.dshd-gaugeLabel{font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-jumpText{font-size:10.5px;font-weight:600;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border-radius:999px;padding:1px 9px;cursor:pointer;transition:background .15s;white-space:nowrap}
		.dshd-jumpText:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
		.dshd-jump{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;cursor:pointer;transition:background .12s,border-color .12s,color .12s}
		.dshd-jump:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-inverted,var(--dsw-alias-border-l1));color:var(--dsw-alias-label-primary)}
		.dshd-clearFilter{font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 10px;cursor:pointer;transition:background .15s}
		.dshd-clearFilter:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent)}
		.dshd-vbars:hover .dshd-maxTag,.dshd-areaWrap:hover .dshd-maxTag{opacity:0}
		.dshd-maxTag{position:absolute;top:2px;right:2px;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-bg-base) 84%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;z-index:4;pointer-events:none;font-variant-numeric:tabular-nums}
		.dshd-badge{font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 5px;margin-left:4px;font-variant-numeric:tabular-nums}
		.dshd-healthTag{display:inline-block;font-size:9.5px;font-weight:700;border-radius:4px;padding:1px 5px;margin-right:6px;flex:none;line-height:1.5}
		.dshd-healthTag[data-k="loop"]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent)}
		.dshd-healthTag[data-k="noProgress"]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent)}
		.dshd-dot{width:7px;height:7px;border-radius:50%;flex:none}
		.dshd-hud-dot{width:7px;height:7px;border-radius:50%;flex:none}
		.dshd-dot-accent{background:var(--dsw-alias-state-business-primary)}
		.dshd-dot-good{background:var(--dsw-alias-state-success-primary)}
		.dshd-dot-warn{background:var(--dsw-alias-state-warn-primary)}
		.dshd-dot-bad{background:var(--dsw-alias-state-error-primary)}
		.dshd-dot-idle{background:var(--dsw-alias-label-tertiary)}
		.dshd-subagentStatusBar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
		.dshd-subagentStatusStat strong{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:19px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);font-size:10px;font-variant-numeric:tabular-nums}
		.dshd-subagentStatusStat[data-populated]{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}
		.dshd-subagentStatusStat[data-state="running"][data-populated] strong{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,var(--dsw-alias-bg-base))}
		.dshd-subagentStatusStat[data-state="completed"][data-populated] strong{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,var(--dsw-alias-bg-base))}
		.dshd-subagentStatusStat[data-state="inactive"][data-populated] strong{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
		.dshd-subagentStatusStat[data-state="archived"][data-populated] strong{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
		.dshd-subagentArchiveToggle{min-height:44px;font:inherit;text-align:left;cursor:pointer;transition:border-color .16s ease,background .16s ease}
		.dshd-subagentArchiveToggle:hover:not(:disabled){border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-interactive-bg-hover)}
		.dshd-subagentArchiveToggle:disabled{cursor:default;opacity:.55}
		.dshd-subagentArchiveToggle:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 72%,transparent);outline-offset:2px}
		.dshd-subagentArchiveMeta{display:inline-flex;align-items:center;gap:5px;flex:none}
		.dshd-subagentArchiveMeta svg{display:block;color:var(--dsw-alias-label-tertiary)}
		.dshd-subagentPanel{display:flex;flex-direction:column;gap:12px;padding:12px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 68%,var(--dsw-alias-bg-base));border:1px solid var(--dsw-alias-border-l2);border-radius:12px}
		.dshd-subagentPanelHead{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px 9px;border-bottom:1px solid var(--dsw-alias-border-l2)}
		.dshd-subagentPanelHead h3{margin:0;font-size:12px;font-weight:700;color:var(--dsw-alias-label-primary)}
		.dshd-subagentPanelHead span{display:block;margin-top:3px;color:var(--dsw-alias-label-tertiary);font-size:10px}
		.dshd-subagentGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;align-items:stretch}
		.dshd-subagentCard[data-state="running"]{border-left-color:var(--dsw-alias-state-business-primary)}
		.dshd-subagentCard[data-state="completed"]{border-left-color:var(--dsw-alias-state-success-primary)}
		.dshd-subagentCardHead{display:grid;grid-template-columns:8px minmax(0,1fr) auto;align-items:start;gap:8px;min-width:0}
		.dshd-subagentDot{width:8px;height:8px;margin-top:5px;border-radius:50%;background:var(--dsw-alias-label-tertiary);flex:none}
		.dshd-subagentCard[data-state="running"] .dshd-subagentDot{background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite}
		.dshd-subagentCard[data-state="completed"] .dshd-subagentDot{background:var(--dsw-alias-state-success-primary)}
		.dshd-subagentIdentity{display:flex;flex-direction:column;gap:3px;min-width:0}
		.dshd-subagentMode{color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.3}
		.dshd-subagentStatus{flex:none;padding:3px 7px;border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1.2;white-space:nowrap}
		.dshd-subagentCard[data-state="running"] .dshd-subagentStatus{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,var(--dsw-alias-bg-base))}
		.dshd-subagentCard[data-state="completed"] .dshd-subagentStatus{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,var(--dsw-alias-bg-base))}
		.dshd-subagentMeta{display:flex;align-items:center;gap:8px;min-width:0;padding-top:8px;border-top:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:9.5px;line-height:1.35}
		.dshd-subagentMeta>span:first-child{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-subagentMetaHint{flex:none;max-width:52%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:inherit;color:var(--dsw-alias-label-tertiary)}
		.dshd-subagentOpen:hover{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 42%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,var(--dsw-alias-bg-base))}
		.dshd-subagentOpen:focus-visible{outline:2px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 72%,transparent);outline-offset:2px}
		.dshd-subagentEmpty{margin:0;padding:18px 12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:12px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px}
		.dshd-subagentRunningEmpty{margin:0;padding:12px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:11px;background:var(--dsw-alias-bg-base);border:1px dashed var(--dsw-alias-border-l2);border-radius:9px}
		.dshd-subagentArchivePanel{background:var(--dsw-alias-bg-layer-1)}
		.dshd-root{box-sizing:border-box;color:var(--dsw-alias-label-primary);padding-bottom:calc(28px + var(--dsh-composer-height,0px));--dshd-accent:var(--dsw-alias-state-business-primary,#4268d7);--dshd-teal:light-dark(#267e77,#6bc3b3);--dshd-indigo:light-dark(#78759e,#aaa8d2);--dshd-amber:light-dark(#a87521,#d9ad61);--dshd-muted:var(--dsw-alias-label-secondary,#647084);--dshd-surface:var(--dsw-alias-bg-base,#fff);--dshd-tint:color-mix(in srgb,var(--dsw-alias-label-primary) 2%,var(--dshd-surface));--dshd-line:var(--dsw-alias-border-l2,#e6e8ee);position:relative;display:flex;flex:1 1 0;flex-direction:column;height:auto;min-height:0;min-width:0;width:100%;max-width:1280px;margin:0 auto;padding:24px 28px calc(32px + var(--dsh-composer-height,0px));gap:20px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-gutter:stable;background:var(--dshd-surface);font:13px/1.5 "Avenir Next","PingFang SC",system-ui,sans-serif;font-variant-numeric:tabular-nums;container-type:inline-size;container-name:dashboard}
		.dshd-root>*{flex-shrink:0}
		.dshd-root .dshd-icon{flex:none;vertical-align:middle}
		.dshd-dashboardHead{position:sticky;top:-24px;z-index:5;margin:-24px -28px 0;padding:20px 28px 0;background:var(--dshd-surface);border-bottom:1px solid var(--dshd-line)}
		.dshd-header{display:flex;align-items:center;gap:12px;min-height:58px;padding:0 0 16px}
		.dshd-brandMark{display:grid;place-items:center;width:32px;height:40px;color:var(--dshd-accent)}
		.dshd-headingGroup{min-width:0}
		.dshd-title{margin:0;font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.04em}
		.dshd-subtitle{display:block;font-size:12px;color:var(--dshd-muted);margin-top:4px}
		.dshd-chip{color:var(--dsw-alias-label-secondary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap;max-width:38%;overflow:hidden;text-overflow:ellipsis;background:var(--dshd-tint);border:1px solid var(--dshd-line);padding:4px 8px;font-size:12px;border-radius:6px}
		.dshd-navigation{display:flex;gap:28px;overflow-x:auto;scrollbar-width:thin}
		.dshd-navItem{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:12px 0;border:0;background:none;color:var(--dshd-muted);font:inherit;font-weight:500;white-space:nowrap;cursor:pointer;transition:color .15s}
		.dshd-navItem:hover{color:var(--dsw-alias-label-primary)}
		.dshd-navItem[aria-pressed=true]{color:var(--dshd-accent)}
		.dshd-navItem[aria-pressed=true]::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:currentColor;border-radius:2px 2px 0 0}
		.dshd-navCount{min-width:18px;line-height:18px;padding:0 4px;background:var(--dshd-tint);border-radius:4px;font-size:11px;text-align:center}
		.dshd-navCount[data-error=true]{color:var(--dsw-alias-state-error-primary)}
		.dshd-sectionIntro{display:flex;justify-content:space-between;align-items:baseline;gap:16px}
		.dshd-sectionIntro h2{font-size:14px;font-weight:600;margin:0}
		.dshd-sectionIntro>span{color:var(--dshd-muted);font-size:12px}
		.dshd-primaryMetric{padding:24px 24px 16px;min-width:0;background:light-dark(#f5f7fa,color-mix(in srgb,var(--dshd-accent) 5%,var(--dshd-surface)))}
		.dshd-heroValue{display:block;font-size:34px;font-weight:500;letter-spacing:-.04em;line-height:1.1;color:var(--dsw-alias-label-primary)}
		.dshd-requestBreakdown{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--dshd-muted);margin-top:20px}
		.dshd-requestBreakdown button{display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:0;border:0;background:none;font:inherit;color:inherit;cursor:pointer}
		.dshd-requestBreakdown button[data-error=true]{color:var(--dsw-alias-state-error-primary)}
		.dshd-requestBreakdown .dshd-icon{width:14px;height:14px}
		.dshd-card{display:flex;flex-direction:column;background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:10px;padding:20px;gap:16px;min-width:0;box-shadow:none}
		.dshd-card:hover{box-shadow:none;transform:none;border-color:var(--dshd-line)}
		.dshd-cardHead{display:flex;border:0;padding:0;gap:8px;align-items:center;flex-wrap:wrap}
		.dshd-cardTitle{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600}
		.dshd-cardTitle::before{content:"";width:3px;height:13px;border-radius:2px;background:var(--dsw-alias-label-tertiary);flex:none;display:none}
		.dshd-cardHint{flex:1 1 auto;min-width:0;white-space:normal;overflow-wrap:anywhere;font-size:12px;max-width:100%;color:var(--dshd-muted);line-height:1.6}
		.dshd-cardHead .dshd-cardHint{margin-left:auto}
		.dshd-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}
		.dshd-grid2>.dshd-card{height:auto;min-height:0}
		.dshd-stat{display:flex;flex-direction:column;position:relative;transition:border-color .18s,transform .2s ease,box-shadow .2s ease;animation:none;transform:none;border:0;background:none;box-shadow:none;border-radius:0;padding:0;gap:8px;min-width:0}
		.dshd-stat::before{display:none}
		.dshd-stat:hover{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,var(--dsw-alias-border-l1));transform:none;box-shadow:none}
		.dshd-statLabel{display:flex;align-items:center;gap:5px;overflow:hidden;text-overflow:ellipsis;font-size:12px;line-height:1.5;color:var(--dshd-muted);white-space:normal}
		.dshd-statValue{font-variant-numeric:tabular-nums;min-width:0;overflow-wrap:anywhere;font-family:inherit;font-size:28px;line-height:1.25;letter-spacing:-.025em;font-weight:550}
		.dshd-statSub{font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;font-size:12px;white-space:normal;line-height:1.5;color:var(--dshd-muted);overflow-wrap:anywhere}
		.dshd-tokenStats{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
		.dshd-tokenStats>.dshd-stat{flex:1;min-width:160px;gap:12px}
		.dshd-tokenStats .dshd-statValue{font-size:30px;letter-spacing:-.035em;font-weight:500;color:var(--dsw-alias-label-primary)}
		.dshd-tokenStats .dshd-statSpark{display:none}
		.dshd-hint{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);font-size:10px;line-height:1;cursor:help;flex:none;width:16px;height:16px;border-color:var(--dshd-line);color:var(--dshd-muted);background:none}
		.dshd-hud{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:0 2px;border:0;background:none;font-size:12px}
		.dshd-hud[data-empty=true]{display:none}
		.dshd-hud-chip{display:inline-flex;align-items:center;gap:6px;line-height:1.5;color:var(--dsw-alias-label-primary);border-radius:999px;max-width:100%;background:none;border:0;padding:0;min-width:0;font-size:12px;animation:none}
		.dshd-hud-label{flex:none;color:var(--dshd-muted)}
		.dshd-hud-value{font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;font-weight:500;max-width:440px}
		.dshd-streamRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--dsw-alias-label-secondary);min-height:64px;padding:12px 16px;background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:8px;flex:none}
		.dshd-streamBody{display:flex;flex-direction:column;gap:8px;min-width:0;flex:1}
		.dshd-streamLine{display:flex;gap:8px;min-width:0}
		.dshd-streamLineText{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;font-size:12px}
		.dshd-streamMarker{display:none}
		.dshd-trendDetails{border:1px solid var(--dshd-line);border-radius:8px;overflow:hidden}
		.dshd-trendDetails>summary{list-style:none;display:flex;align-items:center;gap:8px;min-height:44px;padding:12px;cursor:pointer;font-weight:500;font-size:13px}
		.dshd-trendDetails>summary::-webkit-details-marker{display:none}
		.dshd-trendDetails>summary>span{color:var(--dshd-muted);font-weight:400;margin-left:auto;font-size:12px}
		.dshd-trendDetails[open]>summary{border-bottom:1px solid var(--dshd-line)}
		.dshd-trendDetails[open]>summary>.dshd-icon:last-child{transform:rotate(180deg)}
		.dshd-trendGrid{display:flex;flex-direction:column;gap:16px;padding:16px}
		.dshd-seriesRow{flex-wrap:wrap;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
		.dshd-seriesCol{flex:1 1 240px;display:flex;flex-direction:column;gap:6px;min-width:0;width:auto;padding:0}
		.dshd-seriesLabel,.dshd-legendRow,.dshd-hbar,.dshd-subTitle,.dshd-turnName,.dshd-turnValue{font-size:12px}
		.dshd-axisHint{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:var(--dshd-muted)}
		.dshd-hbarTrack,.dshd-turnTrack{height:7px;background:var(--dshd-tint);border-radius:3px}
		.dshd-hbarFill,.dshd-turnFill{border-radius:3px}
		.dshd-turnFill{display:block;height:100%;border-radius:5px;opacity:.85;background:var(--dshd-accent)}
		.dshd-hbarRight{flex:none;display:flex;align-items:baseline;justify-content:flex-end;gap:6px;min-width:64px}
		.dshd-hbars{display:flex;flex-direction:column;gap:12px}
		.dshd-stack{display:flex;width:100%;overflow:hidden;background:var(--dsw-alias-bg-layer-2);height:12px;border-radius:4px;padding:0;gap:2px}
		.dshd-stackTotal{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:2px;border:0;padding:0}
		.dshd-stackLegend{display:flex;flex-wrap:wrap;font-variant-numeric:tabular-nums;margin-top:4px;gap:8px 20px}
		.dshd-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;min-width:660px}
		.dshd-table th{text-align:left;border-bottom:1px solid var(--dshd-line);white-space:nowrap;font-size:12px;font-weight:500;color:var(--dshd-muted);background:var(--dshd-tint);padding:12px}
		.dshd-table td{border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:middle;white-space:nowrap;font-variant-numeric:tabular-nums;padding:12px;line-height:1.5;border-color:var(--dshd-line)}
		.dshd-tableWrap{max-width:100%;border:1px solid var(--dshd-line);border-radius:8px;overflow-x:auto;scrollbar-gutter:stable}
		.dshd-filter,.dshd-viewTab,.dshd-export,.dshd-pageBtn,.dshd-search,.dshd-pageSize{min-height:32px;font-size:12px;border-radius:6px}
		.dshd-search{height:24px;padding:0 10px;font-size:11px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;outline:none;transition:border-color .15s;min-width:180px;flex:1}
		.dshd-filters,.dshd-viewTabs{gap:8px;flex-wrap:wrap}
		.dshd-viewTabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid var(--dshd-line);padding-bottom:12px}
		.dshd-statusPill{display:inline-flex;align-items:center;gap:4px;font-weight:600;white-space:nowrap;border:0;border-radius:4px;font-size:11px;padding:3px 6px}
		.dshd-empty{text-align:center;padding:28px 16px;font-size:13px;color:var(--dshd-muted)}
		.dshd-emptyState{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:240px;padding:24px;color:var(--dshd-muted);text-align:center}
		.dshd-emptyState>.dshd-icon{width:40px;height:40px;opacity:.6}
		.dshd-emptyState>p{max-width:360px;margin:16px 0 0;font-size:13px;line-height:1.8}
		.dshd-agentPanel{min-width:0}
		.dshd-boardTitle{font-size:14px;margin:0 0 16px;font-weight:600;display:block;border:0;padding:0}
		.dshd-boardTitle::before,.dshd-boardTitle::after{display:none}
		.dshd-subagentCard{display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;min-height:76px;padding:11px 12px;border-left:3px solid var(--dsw-alias-border-l2);background:var(--dshd-surface);border:1px solid var(--dshd-line);border-radius:8px;animation:none}
		.dshd-subagentTitle{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-primary);font-weight:650;line-height:1.4;font-size:13px}
		.dshd-subagentMode,.dshd-subagentMeta,.dshd-subagentOpen,.dshd-subagentStatus{font-size:12px}
		.dshd-subagentOpen{flex:none;padding:4px 8px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-family:var(--ds-font-family-sans,inherit);font-size:10px;line-height:1.2;white-space:nowrap;cursor:pointer;transition:color .16s ease,border-color .16s ease,background .16s ease;min-height:32px}
		.dshd-subagentStatusStat{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;color:var(--dsw-alias-label-secondary);font-size:11px;font-weight:600;background:var(--dshd-surface)}
		.dshd-brandMark .dshd-icon{width:28px;height:28px;stroke-width:1.8}
		.dshd-headerContext{display:flex;align-items:flex-end;flex-direction:column;gap:4px;max-width:42%;min-width:0}
		.dshd-sessionState{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--dshd-muted)}
		.dshd-sessionState>span{width:6px;height:6px;border-radius:50%;background:currentColor}
		.dshd-sessionState[data-running=true]{color:var(--dshd-teal)}
		.dshd-modelBadge{font-size:12px;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--dshd-muted)}
		.dshd-sessionOverview{display:grid;grid-template-columns:minmax(0,1fr) 248px;border:1px solid var(--dshd-line);border-radius:14px;overflow:hidden;background:var(--dshd-surface)}
		.dshd-recordHead{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
		.dshd-recordHead h2{margin:0;font-size:21px;letter-spacing:-.025em;font-weight:600}
		.dshd-recordHead p{margin:6px 0 0;font-size:12px;color:var(--dshd-muted)}
		.dshd-requestTotal{display:flex;align-items:baseline;justify-content:flex-end;gap:6px;flex-wrap:wrap;font-size:12px;color:var(--dshd-muted)}
		.dshd-requestTotal .dshd-hint{align-self:center}
		.dshd-activity{margin-top:24px}
		.dshd-activityEmpty{display:grid;place-items:center;min-height:140px;color:var(--dshd-muted);font-size:12px}
		.dshd-activityCaption{display:flex;justify-content:space-between;gap:12px;font-size:11px;color:var(--dshd-muted);margin-bottom:12px}
		.dshd-activityPlot{display:flex;align-items:stretch;gap:4px;height:88px;border-bottom:1px solid var(--dshd-line);background:repeating-linear-gradient(to top,transparent 0,transparent calc(25% - 1px),var(--dshd-line) 25%)}
		.dshd-activitySample{display:flex;align-items:flex-end;flex:1;min-width:0;height:100%;color:var(--dshd-accent)}
		.dshd-activitySample>span{display:block;width:100%;min-height:4px;border-radius:2px 2px 0 0;background:currentColor;opacity:.72;transition:opacity .15s}
		.dshd-activitySample:hover>span{opacity:1}
		.dshd-activitySample[data-status=error]{color:var(--dsw-alias-state-error-primary)}
		.dshd-activitySample[data-status=running]{color:var(--dshd-teal)}
		.dshd-activityAxis{display:flex;align-items:center;justify-content:space-between;margin-top:8px;gap:12px;font-size:11px;color:var(--dshd-muted)}
		.dshd-requestBreakdown>span{display:inline-flex;align-items:center;gap:6px}
		.dshd-requestBreakdown i{display:inline-block;width:6px;height:6px;flex:none;border-radius:2px;background:currentColor;font-style:normal}
		.dshd-requestBreakdown>span[data-state=complete] i{background:var(--dshd-accent)}
		.dshd-requestBreakdown>span[data-state=running] i{background:var(--dshd-teal)}
		.dshd-requestBreakdown .dshd-openRequests{margin-left:auto;color:var(--dshd-accent);font-weight:600}
		.dshd-sessionLedger{display:flex;flex-direction:column;gap:16px;padding:24px;border-left:1px solid var(--dshd-line);min-width:0}
		.dshd-ledgerHead{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--dshd-muted)}
		.dshd-sessionLedger>.dshd-stat{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:4px 8px}
		.dshd-sessionLedger .dshd-statValue{font-size:20px;letter-spacing:-.03em;font-weight:550;text-align:right;white-space:nowrap}
		.dshd-sessionLedger .dshd-statSub{grid-column:1/-1;font-size:11px;margin-top:2px}
		.dshd-sessionFootnote{grid-column:1/-1;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px 24px;border-top:1px solid var(--dshd-line);font-size:11px;color:var(--dshd-muted)}
		.dshd-sessionFootnote>span:last-child{display:inline-flex;gap:8px;white-space:nowrap}
		.dshd-sessionFootnote b{font-weight:400;color:var(--dshd-line)}
		.dshd-cardHead>.dshd-icon{width:17px;height:17px;color:var(--dshd-muted)}
		.dshd-tokenPanel{border:0;border-radius:0;padding:4px 0 20px;border-bottom:1px solid var(--dshd-line);gap:20px}
		.dshd-cacheMetric{display:flex;align-items:center;gap:12px;flex:1;min-width:160px}
		.dshd-cacheRing{width:46px;height:46px;flex:none;border-radius:50%;background:conic-gradient(var(--dshd-teal) var(--dshd-cache-angle),var(--dshd-tint) 0);mask:radial-gradient(transparent 55%,#000 57%)}
		.dshd-cacheMetric .dshd-statValue{font-size:26px}
		.dshd-root[data-panel=analysis]{gap:12px}
		.dshd-analysisGrid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;align-items:start}
		.dshd-analysisGrid>.dshd-card{grid-column:span 2;padding:18px;gap:14px}
		.dshd-analysisGrid>.dshd-toolAnalysis{grid-column:span 4}
		.dshd-analysisGrid>.dshd-diagnostic{grid-column:span 3}
		.dshd-analysisGrid .dshd-cardHint{font-size:11px;flex:0 1 auto;margin-left:auto}
		.dshd-analysisTableScroll{overflow:auto;max-height:390px;border-block:1px solid var(--dshd-line)}
		.dshd-analysisTable{border-collapse:collapse;width:100%;min-width:470px;font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
		.dshd-analysisTable th,.dshd-analysisTable td{padding:7px 12px;text-align:right;font-weight:500;border-bottom:1px solid var(--dshd-line)}
		.dshd-analysisTable th:first-child{text-align:left;padding-left:0;width:30%;white-space:normal;overflow-wrap:anywhere}
		.dshd-analysisTable th:last-child,.dshd-analysisTable td:last-child{padding-right:0}
		.dshd-analysisTable thead th{position:sticky;top:0;background:var(--dshd-surface);z-index:1;color:var(--dshd-muted);font-size:11px;font-weight:400}
		.dshd-analysisTable tbody tr:last-child>*{border-bottom:0}
		.dshd-analysisTable tbody tr:hover{background:var(--dshd-tint)}
		.dshd-toolName{display:block;line-height:1.4}
		.dshd-callVolume{display:flex;justify-content:flex-end;align-items:center;gap:12px}
		.dshd-toolShare{display:block;height:4px;width:52px;background:var(--dshd-tint);border-radius:2px;overflow:hidden}
		.dshd-toolShare>span{display:block;height:100%;background:var(--dshd-accent);border-radius:inherit}
		.dshd-analysisScrollHint{display:none}
		.dshd-analysisFootnote{font-size:11px;color:var(--dshd-muted);line-height:1.6}
		.dshd-modelList{display:flex;flex-direction:column;gap:16px;max-height:390px;overflow:auto}
		.dshd-modelDetail+.dshd-modelDetail{border-top:1px solid var(--dshd-line);padding-top:16px}
		.dshd-modelIdentity{display:flex;gap:7px;align-items:center;overflow-wrap:anywhere}
		.dshd-modelIdentity>span{width:7px;height:7px;border-radius:50%;flex:none}
		.dshd-modelIdentity>strong{font-size:14px;font-weight:600}
		.dshd-modelProvider{font-size:11px;color:var(--dshd-muted);margin:3px 0 14px 14px;overflow-wrap:anywhere}
		.dshd-modelFacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;margin:0;font-variant-numeric:tabular-nums}
		.dshd-modelFacts dt{font-size:11px;color:var(--dshd-muted);line-height:1.5}
		.dshd-modelFacts dd{font-size:16px;font-weight:550;margin:2px 0 0;line-height:1.4;overflow-wrap:anywhere}
		.dshd-modelFacts>div:last-child{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--dshd-line);padding-top:8px}
		.dshd-modelFacts>div:last-child dd{font-size:14px}
		.dshd-analysisGrid [data-error=true]{color:var(--dsw-alias-state-error-primary)}
		.dshd-analysisPercentiles{display:flex;gap:12px;flex-wrap:wrap;font-size:11px;font-variant-numeric:tabular-nums;border-top:1px solid var(--dshd-line);padding-top:10px;color:var(--dshd-muted)}
		.dshd-analysisPercentiles>span:first-child{margin-right:auto}
		.dshd-analysisPercentiles b{color:var(--dsw-alias-label-primary);font-weight:550}
		.dshd-analysisGrid .dshd-turnList{gap:14px;max-height:220px;overflow:auto}
		.dshd-analysisGrid .dshd-turnName{min-width:52px}
		.dshd-analysisGrid .dshd-turnValue{min-width:46px;font-family:inherit}
		.dshd-compositionBar{height:8px;border-radius:3px;display:flex;gap:2px;overflow:hidden;flex-shrink:0}
		.dshd-compositionRows{display:flex;flex-direction:column;gap:8px;font-size:12px;font-variant-numeric:tabular-nums}
		.dshd-compositionRows>div{display:grid;grid-template-columns:1fr auto 38px;gap:12px;align-items:center}
		.dshd-compositionRows>div>span:first-child{display:flex;align-items:center;gap:7px;color:var(--dshd-muted)}
		.dshd-compositionRows i{width:6px;height:6px;border-radius:2px;flex:none}
		.dshd-compositionRows strong{font-weight:550}
		.dshd-compositionRows>div>span:last-child{text-align:right;color:var(--dshd-muted)}
		.dshd-injectionRows{display:flex;flex-direction:column;gap:12px;font-size:12px;max-height:220px;overflow:auto}
		.dshd-injectionRows>div+div{border-top:1px solid var(--dshd-line);padding-top:12px}
		.dshd-injectionRows strong{font-weight:500;overflow-wrap:anywhere}
		.dshd-injectionRows>div>span{display:flex;justify-content:space-between;color:var(--dshd-muted);font-size:11px;margin-top:6px;font-variant-numeric:tabular-nums}
		.dshd-injectionRows b{font-weight:500;color:var(--dsw-alias-label-primary)}
		.dshd-neutralCount{font-variant-numeric:tabular-nums;font-weight:500}
		@container dashboard (max-width:1050px){
		  .dshd-analysisGrid>.dshd-card,.dshd-analysisGrid>.dshd-toolAnalysis{grid-column:span 3}
		}
		@container dashboard (max-width:700px){
		  .dshd-analysisScrollHint{display:inline}
		  .dshd-analysisGrid{grid-template-columns:minmax(0,1fr)}
		  .dshd-analysisGrid>.dshd-card,.dshd-analysisGrid>.dshd-toolAnalysis,.dshd-analysisGrid>.dshd-diagnostic{grid-column:1}
		  .dshd-sectionIntro{align-items:flex-start;flex-direction:column;gap:4px}
		}
		@container dashboard (max-width:850px){
		  .dshd-sessionOverview{grid-template-columns:1fr}
		  .dshd-sessionLedger{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-left:0;border-top:1px solid var(--dshd-line);gap:16px;padding:16px 24px}
		  .dshd-ledgerHead{display:none}
		  .dshd-sessionLedger>.dshd-stat{display:flex;align-items:flex-start}
		  .dshd-sessionLedger .dshd-statValue{font-size:22px}
		  .dshd-grid2{grid-template-columns:1fr}
		}
		@container dashboard (max-width:540px){.dshd-navigation{gap:16px}.dshd-navItem{gap:4px;font-size:12px}
		  .dshd-navItem>.dshd-icon{display:none}
		  .dshd-subtitle{display:none}.dshd-primaryMetric{padding:20px 16px 16px}
		  .dshd-title{font-size:22px}.dshd-recordHead h2{font-size:18px}
		  .dshd-sessionLedger{grid-template-columns:1fr;padding:16px;gap:12px}
		  .dshd-sessionLedger>.dshd-stat{display:grid;grid-template-columns:1fr auto;align-items:baseline}
		  .dshd-sessionFootnote{padding:12px 16px;gap:8px}
		  .dshd-activityPlot{gap:2px;height:76px}.dshd-requestBreakdown{gap:12px}
		  .dshd-cacheMetric{min-width:140px}.dshd-tokenStats .dshd-statValue{font-size:26px}
		  .dshd-statValue{font-size:24px}.dshd-heroValue{font-size:36px}
		  .dshd-seriesRow{grid-template-columns:1fr}.dshd-sectionIntro>span{font-size:11px}
		  .dshd-subagentStatusBar{grid-template-columns:repeat(2,minmax(0,1fr))}
		  .dshd-subagentGrid{grid-template-columns:1fr}
		  .dshd-tokenStats{gap:20px}.dshd-tokenStats>.dshd-stat{min-width:120px}
		  .dshd-card{padding:16px}.dshd-trendDetails>summary>span{display:none}
		  .dshd-requestBreakdown{gap:8px}}
		@media(max-width:600px){.dshd-root{padding:16px 12px calc(24px + var(--dsh-composer-height,0px))}.dshd-dashboardHead{top:-16px;margin:-16px -12px 0;padding:16px 12px 0}}
		@media(prefers-reduced-motion:reduce){.dshd-root *,.dshd-root *::before,.dshd-root *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
		`;

		// src/client/HudStrip.tsx
		var import_react = require("react");

		// src/board/types.ts
		var EMPTY_BOARD = { workflow: [], schedule: [] };

		// src/client/board.ts
		function subagentEntriesOf(state, parentId) {
		  const rows = Object.values(state.byId ?? {});
		  return rows.filter((row) => row.parentId === parentId && row.origin === "subagent").map((row) => ({
		    kind: row.origin === "subagent" ? "subagent" : void 0,
		    id: row.id,
		    label: row.displayTitle,
		    activity: row.running ? "running" : "inactive"
		  }));
		}
		function isOverdue(item, nowMs) {
		  if (item.state !== "scheduled") return false;
		  const at = Date.parse(item.scheduledAt);
		  return Number.isFinite(at) && at <= nowMs;
		}
		function scheduledItems(board) {
		  return board.schedule.filter((i) => i.state === "scheduled").sort((a, b) => Date.parse(a.scheduledAt) - Date.parse(b.scheduledAt));
		}
		function nextSchedule(board) {
		  return scheduledItems(board)[0] ?? null;
		}

		// src/client/HudStrip.tsx
		var import_jsx_runtime2 = require("react/jsx-runtime");
		function useHudData(input) {
		  return (0, import_react.useMemo)(() => {
		    const board = input.board ?? EMPTY_BOARD;
		    const now = Date.now();
		    const next = nextSchedule(board);
		    return {
		      running: input.running,
		      currentTool: input.runningCalls[0] ?? null,
		      goal: input.goal ?? null,
		      inProgressTodos: (input.todos ?? []).filter((t) => t.status === "in_progress").length,
		      runningWorkflow: board.workflow.filter((r) => r.running).length,
		      runningSubagents: input.subagentEntries.filter((e) => e.activity === "running").length,
		      nextSchedule: next,
		      nextScheduleOverdue: next !== null && isOverdue(next, now)
		    };
		  }, [input.running, input.runningCalls, input.goal, input.todos, input.board, input.subagentEntries]);
		}
		function goalShortLabel(t, goal) {
		  const objective = goal.goal.objective;
		  const clipped = objective.length > 28 ? `${objective.slice(0, 28)}\u2026` : objective;
		  const rounds = t("board.goal.rounds").replace("{n}", String(goal.roundsStarted)).replace("{m}", String(goal.goal.maxGoalRounds));
		  return `${clipped} \xB7 ${rounds}`;
		}
		function scheduleDueLabel(item) {
		  const at = Date.parse(item.scheduledAt);
		  if (!Number.isFinite(at)) return item.scheduledAt;
		  const d = new Date(at);
		  const now = /* @__PURE__ */ new Date();
		  const pad = (n) => String(n).padStart(2, "0");
		  const hhmm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
		  if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()) {
		    return hhmm;
		  }
		  return `${d.getMonth() + 1}/${d.getDate()} ${hhmm}`;
		}
		function Chip(props) {
		  const { tone, label, value, quietSuffix } = props;
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-hud-chip", "data-tone": tone, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `dshd-hud-dot dshd-dot-${tone}`, "aria-hidden": "true" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-hud-label", children: label }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-hud-value", children: [
		      value,
		      quietSuffix !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: quietSuffix })
		    ] })
		  ] });
		}
		function HudStrip(props) {
		  const { data, t } = props;
		  const goal = data.goal ?? null;
		  const goalTone = goal === null ? "idle" : goal.goal.phase === "blocked" ? "bad" : goal.goal.phase === "active" ? "accent" : "idle";
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-hud", role: "status", "data-empty": goal === null && data.inProgressTodos === 0 && data.runningSubagents === 0 && data.runningWorkflow === 0 && data.nextSchedule === null, children: [
		    goal !== null && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Chip, { tone: goalTone, label: t("hud.goal"), value: goalShortLabel(t, goal) }),
		    data.inProgressTodos > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      Chip,
		      {
		        tone: "good",
		        label: t("hud.todos"),
		        value: t("hud.todos.value").replace("{n}", String(data.inProgressTodos))
		      }
		    ),
		    data.runningSubagents > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      Chip,
		      {
		        tone: "good",
		        label: t("hud.subagents"),
		        value: t("hud.subagents.value").replace("{n}", String(data.runningSubagents))
		      }
		    ),
		    data.runningWorkflow > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      Chip,
		      {
		        tone: "good",
		        label: t("hud.workflow"),
		        value: t("hud.workflow.value").replace("{n}", String(data.runningWorkflow))
		      }
		    ),
		    data.nextSchedule !== null && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      Chip,
		      {
		        tone: data.nextScheduleOverdue ? "warn" : "idle",
		        label: t("hud.schedule"),
		        value: data.nextScheduleOverdue ? t("board.schedule.overdue") : scheduleDueLabel(data.nextSchedule)
		      }
		    )
		  ] });
		}

		// src/client/BoardView.tsx
		var import_react2 = require("react");
		var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		var import_jsx_runtime3 = require("react/jsx-runtime");
		var ARCHIVE_AFTER_MS = 5 * 60 * 1e3;
		var ARCHIVE_CLOCK_MS = 15e3;
		function summaryOf(summaries, childId) {
		  const value = summaries[childId];
		  if (typeof value !== "object" || value === null) return void 0;
		  return value;
		}
		function subagentState(entry, summary) {
		  if (entry.activity === "running") return "running";
		  return summary?.completed === true ? "completed" : "inactive";
		}
		function summaryTitle(summary) {
		  const title = summary?.title ?? summary?.displayTitle;
		  return typeof title === "string" && title.length > 0 ? title : void 0;
		}
		function finiteTime(value) {
		  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
		}
		function estimatedEndAt(summary) {
		  if (summary === void 0) return void 0;
		  const updatedAt = finiteTime(summary.updatedAt);
		  const timing = summary.projectionValues?.subagentTiming;
		  const through = finiteTime(timing?.active?.through);
		  if (through !== void 0) return through;
		  if (updatedAt === void 0) return void 0;
		  const settledMs = finiteTime(timing?.settledMs);
		  return settledMs === void 0 ? updatedAt : updatedAt + settledMs;
		}
		function SubagentCard(props) {
		  const { entry, summary, onOpen, t } = props;
		  const state = subagentState(entry, summary);
		  const label = entry.label ?? summaryTitle(summary) ?? entry.id;
		  const mode = entry.mode === void 0 ? null : entry.mode === "continuable" ? t("board.subagent.mode.continuable") : t("board.subagent.mode.oneShot");
		  const status = state === "running" ? t("board.subagents.running") : state === "completed" ? t("board.subagents.completed") : t("board.subagents.inactive");
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "dshd-subagentCard", "data-state": state, title: entry.id, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshd-subagentCardHead", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshd-subagentDot", "aria-hidden": "true" }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshd-subagentIdentity", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshd-subagentTitle", children: label }),
		        mode !== null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshd-subagentMode", children: mode })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshd-subagentStatus", children: status })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshd-subagentMeta", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: entry.id }),
		      state === "inactive" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dshd-subagentMetaHint", children: t("board.subagents.inactiveNote") }),
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		        "button",
		        {
		          type: "button",
		          className: "dshd-subagentOpen",
		          onClick: onOpen,
		          "aria-label": t("board.subagents.openAria").replace("{name}", label),
		          children: t("board.subagents.open")
		        }
		      )
		    ] })
		  ] });
		}
		function BoardBody(props) {
		  const { useSessions, t, sessionId, openSubagent } = props;
		  const [archiveOpen, setArchiveOpen] = (0, import_react2.useState)(false);
		  const [now, setNow] = (0, import_react2.useState)(() => Date.now());
		  (0, import_react2.useEffect)(() => {
		    const timer = window.setInterval(() => setNow(Date.now()), ARCHIVE_CLOCK_MS);
		    return () => window.clearInterval(timer);
		  }, []);
		  (0, import_react2.useEffect)(() => {
		    setArchiveOpen(false);
		    setNow(Date.now());
		  }, [sessionId]);
		  const subagents = useSessions((s) => subagentEntriesOf(s, sessionId));
		  const summaries = useSessions((s) => s.byId);
		  const rows = subagents.map((entry) => {
		    const summary = summaryOf(summaries, entry.id);
		    const state = subagentState(entry, summary);
		    const endedAt = state === "running" ? void 0 : estimatedEndAt(summary);
		    const archived = endedAt !== void 0 && now - endedAt >= ARCHIVE_AFTER_MS;
		    return { entry, summary, state, endedAt, archived };
		  });
		  const stateRank = { running: 0, completed: 1, inactive: 2 };
		  const visibleRows = rows.filter((row) => !row.archived).sort((a, b) => stateRank[a.state] - stateRank[b.state]);
		  const archivedRows = rows.filter((row) => row.archived).sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0));
		  const runningCount = visibleRows.filter((row) => row.state === "running").length;
		  const completedCount = visibleRows.filter((row) => row.state === "completed").length;
		  const inactiveCount = visibleRows.filter((row) => row.state === "inactive").length;
		  const archiveCount = archivedRows.length;
		  const archivePanelId = `dshd-subagent-archive-${sessionId}`;
		  const card = (row) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		    SubagentCard,
		    {
		      entry: row.entry,
		      summary: row.summary,
		      onOpen: () => openSubagent({
		        parentSessionId: sessionId,
		        childSessionId: row.entry.id,
		        mode: row.entry.mode ?? "unknown"
		      }),
		      t
		    },
		    row.entry.id
		  );
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "dshd-boardTitle", children: t("board.section") }),
		    subagents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshd-subagentEmpty", children: t("board.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dshd-subagentStatusBar", "aria-label": t("board.section"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dshd-subagentStatusStat", "data-state": "running", "data-populated": runningCount > 0 ? "true" : void 0, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.running") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: runningCount })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dshd-subagentStatusStat", "data-state": "completed", "data-populated": completedCount > 0 ? "true" : void 0, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.completed") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: completedCount })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dshd-subagentStatusStat", "data-state": "inactive", "data-populated": inactiveCount > 0 ? "true" : void 0, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.inactive") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: inactiveCount })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		          "button",
		          {
		            type: "button",
		            className: "dshd-subagentStatusStat dshd-subagentArchiveToggle",
		            "data-state": "archived",
		            "data-populated": archiveCount > 0 ? "true" : void 0,
		            "aria-expanded": archiveOpen,
		            "aria-controls": archivePanelId,
		            "aria-label": t("board.subagents.archiveAria").replace("{action}", archiveOpen ? t("board.subagents.collapse") : t("board.subagents.expand")).replace("{n}", String(archiveCount)),
		            disabled: archiveCount === 0,
		            onClick: () => setArchiveOpen((open) => !open),
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.archived") }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dshd-subagentArchiveMeta", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: archiveCount }),
		                archiveOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutlineMedium, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutlineMedium, {})
		              ] })
		            ]
		          }
		        )
		      ] }),
		      runningCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshd-subagentRunningEmpty", children: t("board.subagents.runningEmpty") }) : null,
		      visibleRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "dshd-subagentPanel", "aria-label": t("board.subagents.listTitle"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshd-subagentPanelHead", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: t("board.subagents.listTitle") }),
		          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.count").replace("{n}", String(visibleRows.length)) })
		        ] }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshd-subagentGrid", children: visibleRows.map(card) })
		      ] }) : null,
		      archiveOpen && archiveCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
		        "section",
		        {
		          id: archivePanelId,
		          className: "dshd-subagentPanel dshd-subagentArchivePanel",
		          "aria-label": t("board.subagents.archived"),
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshd-subagentPanelHead", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: t("board.subagents.archived") }),
		              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("board.subagents.count").replace("{n}", String(archiveCount)) })
		            ] }) }),
		            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dshd-subagentGrid", children: archivedRows.map(card) })
		          ]
		        }
		      ) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dshd-board-hint", children: t("board.hint") })
		  ] });
		}

		// src/client/charts.tsx
		var import_react3 = require("react");
		var import_jsx_runtime4 = require("react/jsx-runtime");
		function compactNumber(n) {
		  const abs = Math.abs(n);
		  const scaled = (v) => v >= 100 ? String(Math.round(v)) : String(Math.round(v * 10) / 10);
		  if (abs < 1e3) return String(Math.round(n));
		  if (abs < 1e6) return `${scaled(n / 1e3)}K`;
		  return `${scaled(n / 1e6)}M`;
		}
		function exactNumber(n) {
		  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		function formatMs(ms) {
		  if (!Number.isFinite(ms) || ms < 0) return "\u2014";
		  const s = ms / 1e3;
		  if (s < 60) return `${Math.round(s * 10) / 10}s`;
		  const whole = Math.round(s);
		  if (whole < 3600) return `${Math.floor(whole / 60)}m${whole % 60}s`;
		  return `${Math.floor(whole / 3600)}h${Math.floor(whole % 3600 / 60)}m`;
		}
		function polar(cx, cy, r, angleDeg) {
		  const rad = angleDeg * Math.PI / 180;
		  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
		}
		function arcPath(cx, cy, r, startAngle, endAngle) {
		  const [sx, sy] = polar(cx, cy, r, startAngle);
		  const [ex, ey] = polar(cx, cy, r, endAngle);
		  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
		  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
		}
		function StackedBar(props) {
		  const { data, valueFormatter, height, totalLabel, emptyLabel } = props;
		  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  const segments = data.filter((d) => d.value > 0);
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-chartBody", "data-stacked": true, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-stack", style: height === void 0 ? void 0 : { height }, children: segments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-stackEmpty", children: emptyLabel ?? "\u2014" }) : segments.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		      "div",
		      {
		        className: "dshd-stackSegment",
		        style: { width: `${Math.max(0, d.value) / Math.max(total, 1) * 100}%`, background: d.color },
		        title: `${d.label}: ${fmt(d.value)}`
		      },
		      i
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-stackLegend", children: [
		      data.filter((d) => d.value > 0).map((d) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dshd-legendRow", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-legendSwatch", style: { background: d.color } }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-legendName", children: d.label }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-legendValue", children: fmt(d.value) })
		      ] }, d.label)),
		      totalLabel !== void 0 && segments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dshd-legendRow dshd-stackTotal", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-legendName", children: totalLabel }),
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-legendValue", children: fmt(total) })
		      ] }) : null
		    ] })
		  ] });
		}
		function SeriesBars(props) {
		  const { series, height = 110, valueFormatter, emptyLabel, showMaxTag = false, ariaLabel } = props;
		  const [hover, setHover] = (0, import_react3.useState)(null);
		  const actualMax = Math.max(0, ...series.map((s) => Math.max(0, s.value)));
		  const max = actualMax || 1;
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  if (series.length === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel ?? "\u2014" });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-vbars", style: { height, position: "relative" }, role: "img", "aria-label": ariaLabel ?? "bar chart", children: [
		    showMaxTag ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-maxTag", children: fmt(actualMax) }) : null,
		    series.map((s, i) => {
		      const v = Math.max(0, s.value);
		      const pct = v / max * 100;
		      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		        "div",
		        {
		          className: "dshd-vcol",
		          "data-status": s.status,
		          onMouseEnter: () => setHover(i),
		          onMouseLeave: () => setHover(null),
		          children: [
		            hover === i ? (() => {
		              const pos = (i + 0.5) / series.length;
		              const style = {
		                bottom: `calc(${pct.toFixed(1)}% + 8px)`,
		                left: `${Math.min(88, Math.max(12, pos * 100)).toFixed(1)}%`
		              };
		              if (pos < 0.33) style.transform = "translateX(-6%)";
		              else if (pos > 0.67) style.transform = "translateX(-94%)";
		              return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-vtip", style, children: [
		                s.label,
		                ": ",
		                fmt(v)
		              ] });
		            })() : null,
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-vbarTrack", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		              "div",
		              {
		                className: "dshd-vbar",
		                "data-hover": hover === i ? true : void 0,
		                style: { height: `${Math.max(pct, v > 0 ? 2 : 0).toFixed(1)}%`, background: s.color }
		              }
		            ) })
		          ]
		        },
		        i
		      );
		    })
		  ] });
		}
		function HorizontalBars(props) {
		  const { data, valueFormatter, subBelow = false } = props;
		  const max = Math.max(1, ...data.map((d) => Math.max(0, d.value)));
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  if (data.length === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-empty", style: { padding: "12px" }, children: "\u2014" });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-hbars", children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-hbar", title: d.title ?? `${d.label}: ${fmt(d.value)}`, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-hbarName", children: d.label }),
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-hbarTrack", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		      "span",
		      {
		        className: "dshd-hbarFill",
		        style: { width: `${Math.max(0, d.value) / max * 100}%`, background: d.color }
		      }
		    ) }),
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dshd-hbarRight", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dshd-hbarValue", children: [
		        fmt(d.value),
		        d.errorMark === true ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-errorMark", children: " \u26A0" }) : null
		      ] }),
		      d.sub !== void 0 && !subBelow ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-hbarSub", title: d.sub, children: d.sub }) : null
		    ] }),
		    d.sub !== void 0 && subBelow ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dshd-hbarSubLine", title: d.sub, children: d.sub }) : null
		  ] }, d.label)) });
		}
		function AreaChart(props) {
		  const {
		    series,
		    height = 96,
		    color = "var(--dsw-alias-state-business-primary)",
		    valueFormatter,
		    emptyLabel,
		    showMaxTag = false,
		    ariaLabel
		  } = props;
		  const [hover, setHover] = (0, import_react3.useState)(null);
		  const ref = (0, import_react3.useRef)(null);
		  const n = series.length;
		  const values = series.map((s) => Math.max(0, s.value));
		  const actualMax = Math.max(0, ...values);
		  const max = actualMax || 1;
		  const width = Math.max(n * 16, 140);
		  const pad = 4;
		  const pts = values.map((v, i) => ({
		    x: i / Math.max(n - 1, 1) * (width - pad * 2) + pad,
		    y: height - pad - v / max * (height - pad * 2)
		  }));
		  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
		  const last = pts[pts.length - 1];
		  const lastX = last === void 0 ? width : last.x;
		  const areaPath = `${linePath} L ${lastX.toFixed(1)} ${(height - pad).toFixed(1)} L ${pad} ${(height - pad).toFixed(1)} Z`;
		  const gid = (0, import_react3.useId)();
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  if (n === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel ?? "\u2014" });
		  }
		  const onMove = (e) => {
		    const rect = ref.current?.getBoundingClientRect();
		    if (rect === void 0 || rect.width === 0) return;
		    const frac = (e.clientX - rect.left) / rect.width;
		    const i = Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1))));
		    setHover(i);
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		    "div",
		    {
		      ref,
		      className: "dshd-areaWrap",
		      style: { height, position: "relative" },
		      onMouseMove: onMove,
		      onMouseLeave: () => setHover(null),
		      children: [
		        showMaxTag ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-maxTag", children: fmt(actualMax) }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": ariaLabel ?? "area chart", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("linearGradient", { id: gid, x1: "0", y1: "0", x2: "0", y2: "1", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("stop", { offset: "0%", stopColor: color, stopOpacity: "0.25" }),
		            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("stop", { offset: "100%", stopColor: color, stopOpacity: "0.02" })
		          ] }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: areaPath, fill: `url(#${gid})`, vectorEffect: "non-scaling-stroke" }),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: linePath, fill: "none", stroke: color, strokeWidth: 1.6, vectorEffect: "non-scaling-stroke" })
		        ] }),
		        hover !== null && pts[hover] !== void 0 && series[hover] !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		            "div",
		            {
		              className: "dshd-areaGuide",
		              style: { left: `${pts[hover].x / width * 100}%`, borderColor: color }
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		            "div",
		            {
		              className: "dshd-areaDot",
		              style: { left: `${pts[hover].x / width * 100}%`, top: `${pts[hover].y / height * 100}%`, background: color }
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
		            "div",
		            {
		              className: "dshd-vtip",
		              style: (() => {
		                const pos = pts[hover].x / width;
		                return {
		                  left: `${Math.min(88, Math.max(12, pos * 100))}%`,
		                  top: `${pts[hover].y / height * 100}%`,
		                  // Horizontal flip only (vertical centering stays from the CSS rule).
		                  ["--tip-dx"]: pos < 0.33 ? "-6%" : pos > 0.67 ? "-94%" : "-50%"
		                };
		              })(),
		              children: [
		                series[hover].label,
		                ": ",
		                fmt(series[hover].value)
		              ]
		            }
		          )
		        ] }) : null
		      ]
		    }
		  );
		}
		function RadialGauge(props) {
		  const { value, max, unit = "", size = 148, ariaLabel } = props;
		  const frac = max <= 0 ? 0 : Math.max(0, Math.min(1, value / max));
		  const color = frac >= 0.9 ? "var(--dsw-alias-state-error-primary)" : frac >= 0.7 ? "var(--dsw-alias-state-warn-primary)" : "var(--dsw-alias-state-success-primary)";
		  const height = size * 0.6;
		  const cx = size / 2;
		  const cy = height - 8;
		  const r = Math.min(size / 2 - 16, cy - 12);
		  const track = arcPath(cx, cy, r, 180, 360);
		  const valueArc = frac <= 0 ? "" : arcPath(cx, cy, r, 180, 180 + frac * 180);
		  const valueY = cy - r * 0.4;
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: `0 0 ${size} ${height}`, width: size, height, role: "img", "aria-label": ariaLabel ?? "gauge", style: { overflow: "hidden" }, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: track, fill: "none", stroke: "var(--dsw-alias-border-l1)", strokeWidth: 11, strokeLinecap: "round" }),
		    frac > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: valueArc, fill: "none", stroke: color, strokeWidth: 11, strokeLinecap: "round", style: { transition: "stroke .3s ease" } }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("text", { x: cx, y: valueY, textAnchor: "middle", dominantBaseline: "central", fontSize: 21, fontWeight: 700, fill: "var(--dsw-alias-label-primary)", children: [
		      Math.round(frac * 100),
		      unit
		    ] })
		  ] });
		}
		var MODEL_COLORS = [
		  "var(--dshd-accent)",
		  "var(--dshd-teal)",
		  "var(--dshd-indigo)",
		  "color-mix(in srgb,var(--dshd-accent) 60%,var(--dshd-teal))",
		  "var(--dshd-muted)"
		];
		var modelColor = (model) => {
		  let h = 0;
		  for (let i = 0; i < model.length; i++) h = h * 31 + model.charCodeAt(i) | 0;
		  return MODEL_COLORS[Math.abs(h) % MODEL_COLORS.length];
		};
		function ModelTimeline({
		  data,
		  switchSeqs,
		  onPick,
		  emptyLabel,
		  height = 44,
		  maxPoints = 60,
		  note,
		  ariaLabel,
		  axisHint
		}) {
		  if (data.length === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel });
		  }
		  const trimmed = data.length > maxPoints ? data.slice(-maxPoints) : data;
		  const models = [...new Set(trimmed.map((d) => d.model))];
		  const step = 7;
		  const width = Math.max(60, trimmed.length * step);
		  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dshd-modelTimeline", role: "img", "aria-label": ariaLabel ?? "model timeline", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height, style: { display: "block" }, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 2, y1: height / 2, x2: width - 2, y2: height / 2, stroke: "var(--dsw-alias-border-l2)", strokeWidth: 1 }),
		      trimmed.map((d, i) => {
		        const isSwitch = switchSeqs.includes(d.seq);
		        const focusable = onPick !== void 0 && (isSwitch || i === trimmed.length - 1);
		        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
		          "circle",
		          {
		            cx: i * step + step / 2,
		            cy: height / 2,
		            r: isSwitch ? 4 : 3,
		            fill: modelColor(d.model),
		            stroke: isSwitch ? "var(--dsw-alias-state-warn-primary)" : "none",
		            strokeWidth: isSwitch ? 1.2 : 0,
		            opacity: isSwitch ? 1 : 0.72,
		            role: onPick !== void 0 ? "button" : void 0,
		            tabIndex: onPick !== void 0 ? focusable ? 0 : -1 : void 0,
		            "aria-label": `#${d.seq} \xB7 ${d.model}`,
		            onClick: onPick === void 0 ? void 0 : () => onPick(d.seq),
		            onKeyDown: onPick === void 0 ? void 0 : (e) => {
		              if (e.key === "Enter" || e.key === " ") {
		                e.preventDefault();
		                onPick(d.seq);
		              }
		            },
		            style: { cursor: onPick !== void 0 ? "pointer" : void 0 },
		            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("title", { children: `#${d.seq} \xB7 ${d.model}` })
		          },
		          d.seq
		        );
		      })
		    ] }),
		    note !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-modelNote", children: note }) : null,
		    axisHint !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-axisHint", children: axisHint }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dshd-modelLegend", children: models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dshd-modelLegendItem", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { style: { background: modelColor(m) } }),
		      m
		    ] }, m)) })
		  ] });
		}

		// src/client/DashboardView.tsx
		var import_jsx_runtime5 = require("react/jsx-runtime");
		var scrollMemory = /* @__PURE__ */ new Map();
		var EMPTY_NODES = [];
		var EMPTY_TURN_TIMINGS = /* @__PURE__ */ new Map();
		var EMPTY_RUNNING_CALLS = [];
		var STREAM_MAX_CHARS = 100;
		function gatherStreamFragments(input, out) {
		  if (input === null || input === void 0) return;
		  if (typeof input === "string") {
		    out.push({ kind: "text", text: input });
		    return;
		  }
		  if (typeof input !== "object") return;
		  if (Array.isArray(input)) {
		    for (const item2 of input) gatherStreamFragments(item2, out);
		    return;
		  }
		  const item = input;
		  if (typeof item.text === "string") {
		    const value = item.text;
		    const kind2 = item.kind ?? item.type;
		    if (kind2 === "reasoning") {
		      out.push({ kind: "reasoning", text: value });
		    } else if (kind2 === "tool-call") {
		      out.push({ kind: "tool-call", text: value, name: typeof item.name === "string" ? item.name : void 0 });
		    } else {
		      out.push({ kind: "text", text: value });
		    }
		    return;
		  }
		  const kind = item.kind ?? item.type;
		  if (kind === "tool-call" && (typeof item.argsRaw === "string" || typeof item.name === "string")) {
		    out.push({
		      kind: "tool-call",
		      text: typeof item.argsRaw === "string" ? item.argsRaw : "",
		      name: typeof item.name === "string" ? item.name : void 0
		    });
		    return;
		  }
		  if (kind === "other" && item.block !== void 0) {
		    let detail;
		    if (typeof item.block === "string") {
		      detail = item.block;
		    } else {
		      try {
		        detail = JSON.stringify(item.block);
		      } catch {
		        detail = "[unserializable block]";
		      }
		    }
		    if (detail !== void 0) out.push({ kind: "other", text: detail });
		    return;
		  }
		  if (Array.isArray(item.blocks)) {
		    gatherStreamFragments(item.blocks, out);
		  }
		  if (item.content !== void 0) {
		    gatherStreamFragments(item.content, out);
		  }
		  if (item.contentBlocks !== void 0) {
		    gatherStreamFragments(item.contentBlocks, out);
		  }
		  if (item.output !== void 0) {
		    gatherStreamFragments(item.output, out);
		  }
		  if (item.reason !== void 0) {
		    gatherStreamFragments(item.reason, out);
		  }
		}
		function normalizeStreamText(input) {
		  return input.replace(/\r\n/g, "\n");
		}
		function compactStreamLine(input, maxChars) {
		  const normalized = normalizeStreamText(input).replace(/\s+/g, " ").trim();
		  if (normalized.length === 0) return "";
		  const chars = Array.from(normalized);
		  if (chars.length <= maxChars) return normalized;
		  return `${chars.slice(0, Math.max(1, maxChars - 1)).join("")}\u2026`;
		}
		function currentStreamingItem(stream) {
		  for (let i = stream.length - 1; i >= 0; i -= 1) {
		    const item = stream[i];
		    if (item !== void 0 && (item.kind === "tool-call" || item.text.trim().length > 0)) return item;
		  }
		  return stream.at(-1) ?? null;
		}
		function extractStreamingBlocks(partial) {
		  const blocks = (() => {
		    if (partial === null || typeof partial !== "object") return [];
		    if (Array.isArray(partial.blocks)) return partial.blocks;
		    return [partial];
		  })();
		  const stream = [];
		  gatherStreamFragments(blocks, stream);
		  return stream;
		}
		function summarizeStreamChars(stream) {
		  let text = 0;
		  let reasoning = 0;
		  for (const item of stream) {
		    if (item.kind === "reasoning") reasoning += item.text.length;
		    else if (item.kind === "text") text += item.text.length;
		  }
		  return { text, reasoning };
		}
		function Hint(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_dsh_client_ui_primitives2.Tooltip, { label: props.label, side: "top", delayMs: 450, maxWidth: 260, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-hint", role: "button", tabIndex: 0, "aria-label": props.label, children: "?" }) });
		}
		function fmtCost(v) {
		  if (v === null) return "\u2014";
		  if (v <= 0) return "$0";
		  if (v >= 1) return `$${v.toFixed(2)}`;
		  if (v < 5e-5) return "<$0.0001";
		  return `$${v.toFixed(4)}`;
		}
		function ChevronIcon(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		    "svg",
		    {
		      className: "dshd-chevronSvg",
		      "data-open": props.open || void 0,
		      viewBox: "0 0 16 16",
		      width: "10",
		      height: "10",
		      "aria-hidden": "true",
		      focusable: "false",
		      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M5.5 3l5 5-5 5", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round" })
		    }
		  );
		}
		function WarnIcon() {
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { className: "dshd-warnIcon", viewBox: "0 0 16 16", width: "11", height: "11", "aria-hidden": "true", focusable: "false", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M8 2.4 14.3 13.4H1.7z", fill: "currentColor" }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "7.15", y: "6.2", width: "1.7", height: "3.4", rx: ".85", fill: "var(--dsw-alias-bg-base)" }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "8", cy: "11.3", r: "1", fill: "var(--dsw-alias-bg-base)" })
		  ] });
		}
		function StatCard(props) {
		  const { label, value, sub, hint, tone } = props;
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-stat", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-statLabel", children: [
		      label,
		      hint !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: hint }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		      "div",
		      {
		        className: "dshd-statValue",
		        "data-accent": tone === "accent" ? true : void 0,
		        "data-good": tone === "good" ? true : void 0,
		        "data-warn": tone === "warn" ? true : void 0,
		        "data-bad": tone === "bad" ? true : void 0,
		        "data-reasoning": tone === "reasoning" ? true : void 0,
		        children: value
		      }
		    ),
		    sub !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-statSub", title: sub, children: sub }) : null
		  ] });
		}
		function statusPill(status, t) {
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-statusPill", "data-s": status, children: status === "running" ? t("stat.requests.running") : status === "error" ? t("stat.requests.error") : status === "compaction" ? t("stat.compactions") : t("stat.requests.completed") });
		}
		function RequestDetailPanel(props) {
		  const { detail, t, onJump } = props;
		  const uncached = Math.max(0, detail.inputTokens - detail.cacheReadTokens - detail.cacheWriteTokens);
		  const tools = detail.promptToolNames.length > 0 ? detail.promptToolNames.join(" \xB7 ") : t("unknown");
		  const startedLabel = detail.startedAt === null ? null : detail.status === "running" ? `${new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} \xB7 ${t("req.runningElapsed")} ${formatMs(Math.max(0, Date.now() - detail.startedAt))}` : new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-detail", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-detailHead", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-detailTitle", children: [
		        t("trend.request"),
		        detail.seq
		      ] }),
		      detail.purpose === "compaction" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-tag", "data-k": "compaction", children: t("stat.compactions") }) : null,
		      detail.thinking ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-tag", "data-k": "reasoning", children: t("req.config.thinking") }) : null,
		      detail.retry > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-tag", "data-k": "error", title: detail.retryDelayMs === null ? void 0 : `${t("req.config.provider")} delay ${formatMs(detail.retryDelayMs)}`, children: [
		        t("req.retryCount"),
		        " ",
		        detail.retry,
		        "/",
		        detail.maxRetries,
		        detail.retryDelayMs !== null ? ` \xB7 ${formatMs(detail.retryDelayMs)}` : ""
		      ] }) : null,
		      statusPill(detail.status, t),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-chip", children: [
		        t("req.turnStep"),
		        " ",
		        detail.turn,
		        "/",
		        detail.step
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-chip", children: detail.durationMs === null ? t("unknown") : formatMs(detail.durationMs) }),
		      startedLabel !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-chip", title: t("req.startedAt"), children: startedLabel }) : null,
		      onJump !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: "dshd-jumpText", onClick: onJump, children: [
		        t("req.jumpTrajectory"),
		        " \u2197"
		      ] }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kv", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.config.provider") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", title: detail.provider ?? void 0, children: detail.provider ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.model") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", title: detail.model ?? void 0, children: detail.model ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.config.temperature") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: detail.temperature === null ? t("unknown") : String(detail.temperature) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.config.maxTokens") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: detail.maxTokens === null ? t("unknown") : exactNumber(detail.maxTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.config.effort") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: detail.reasoningEffort ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.prompt.systemChars") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: detail.promptSystemChars === null ? t("unknown") : exactNumber(detail.promptSystemChars) })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kv", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", title: t("hint.uncached"), children: t("req.usage.uncached") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: exactNumber(uncached) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.cacheRead") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.cacheReadTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.cacheWrite") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.cacheWriteTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.output") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.outputTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.reasoning") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.reasoningTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvKey", title: t("hint.cost"), children: t("req.usage.cost") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: fmtCost(detail.costUsd) })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-kvKey", children: t("req.prompt.tools") }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-kvValue", style: { whiteSpace: "normal", wordBreak: "break-word" }, children: tools })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-kvKey", style: { marginBottom: "4px" }, children: t("req.toolCalls") }),
		      detail.toolCalls.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", style: { fontSize: "11.5px", padding: "2px 0" }, children: t("req.noToolCalls") }) : detail.toolCalls.map((call) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-toolRow", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolName", children: call.name }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolArgs", title: call.argsRaw ?? void 0, children: call.argsRaw ?? "" }),
		        call.isError ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolErr", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WarnIcon, {}) }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolDur", children: call.durationMs === null ? t("unknown") : formatMs(call.durationMs) })
		      ] }, call.callId))
		    ] }),
		    detail.error !== null || detail.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-kvKey", style: { marginBottom: "4px" }, children: t("req.error") }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-errorBox", children: detail.error ?? t("req.errorMissing") })
		    ] }) : null
		  ] });
		}
		function TrendSection(props) {
		  const { metrics, t, onJump, jumpTo, initialFilter } = props;
		  const detailsBySeq = (0, import_react4.useMemo)(() => new Map(metrics.details.map((d) => [d.seq, d])), [metrics.details]);
		  const [openSeq, setOpenSeq] = (0, import_react4.useState)(null);
		  const [page, setPage] = (0, import_react4.useState)(0);
		  const [pageSize, setPageSize] = (0, import_react4.useState)(10);
		  const [filter, setFilter] = (0, import_react4.useState)(initialFilter);
		  const [newArrived, setNewArrived] = (0, import_react4.useState)(false);
		  const lastSeqRef = (0, import_react4.useRef)(null);
		  const GROUP_ROW_CAP = 20;
		  const canJump = onJump !== void 0;
		  const colCount = 8 + (canJump ? 1 : 0);
		  const exportJson = () => {
		    const payload = {
		      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		      filter,
		      search: search.trim(),
		      view,
		      requests: searched.map((s) => {
		        const d = detailsBySeq.get(s.seq);
		        return {
		          seq: s.seq,
		          turn: s.turn,
		          step: s.step,
		          status: s.status,
		          purpose: s.purpose,
		          provider: s.provider,
		          model: s.model,
		          inputTokens: s.inputTokens,
		          cacheReadTokens: s.cacheReadTokens,
		          cacheWriteTokens: s.cacheWriteTokens,
		          outputTokens: s.outputTokens,
		          reasoningTokens: s.reasoningTokens,
		          startedAt: s.startedAt,
		          durationMs: s.durationMs,
		          error: s.error,
		          costUsd: d?.costUsd ?? null,
		          reasoningEffort: d?.reasoningEffort ?? null,
		          temperature: d?.temperature ?? null,
		          retry: d?.retry ?? 0,
		          toolCalls: d?.toolCalls ?? []
		        };
		      })
		    };
		    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		    const url = URL.createObjectURL(blob);
		    const a = document.createElement("a");
		    a.href = url;
		    a.download = `dashboard-${view}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;
		    a.click();
		    URL.revokeObjectURL(url);
		  };
		  const [view, setView] = (0, import_react4.useState)("table");
		  const [search, setSearch] = (0, import_react4.useState)("");
		  const [collapsed, setCollapsed] = (0, import_react4.useState)({});
		  const toggleCollapsed = (key) => setCollapsed((c) => ({ ...c, [key]: !(c[key] ?? false) }));
		  const filtered = filter === "all" ? metrics.series : metrics.series.filter((s) => s.status === filter);
		  const q = search.trim().toLowerCase();
		  const searched = q.length === 0 ? filtered : filtered.filter((s) => {
		    const d = detailsBySeq.get(s.seq);
		    return String(s.seq).includes(q) || String(s.turn).includes(q) || (s.model ?? "").toLowerCase().includes(q) || (s.error ?? "").toLowerCase().includes(q) || (s.purpose ?? "").toLowerCase().includes(q) || (d?.toolCalls ?? []).some((c) => c.name.toLowerCase().includes(q));
		  });
		  const total = searched.length;
		  const pageCount = Math.max(1, Math.ceil(total / pageSize));
		  const safePage = Math.min(page, pageCount - 1);
		  const rows = searched.slice(safePage * pageSize, safePage * pageSize + pageSize);
		  const renderRow = (s) => {
		    const detail = detailsBySeq.get(s.seq);
		    const open = openSeq === s.seq;
		    const isError = s.status === "error";
		    const jumpMode = canJump && !isError && (detail?.toolCalls.length ?? 0) > 0;
		    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		      FragmentRow,
		      {
		        open,
		        colSpan: colCount,
		        rowError: isError,
		        rowTitle: isError ? t("req.rowHint.error") : jumpMode ? s.purpose === "compaction" ? t("req.rowHint.jumpCompaction") : t("req.rowHint.jump") : t("req.rowHint.expand"),
		        onRowClick: () => {
		          if (jumpMode) jumpTo(s.seq);
		          else setOpenSeq(open ? null : s.seq);
		        },
		        onChevronClick: () => setOpenSeq(open ? null : s.seq),
		        cols: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            "span",
		            {
		              className: "dshd-chevron",
		              "data-open": open || void 0,
		              role: "button",
		              tabIndex: 0,
		              "aria-expanded": open,
		              "aria-label": open ? t("req.collapse") : t("req.expand"),
		              onClick: (e) => {
		                e.stopPropagation();
		                setOpenSeq(open ? null : s.seq);
		              },
		              onKeyDown: (e) => {
		                if (e.key === "Enter" || e.key === " ") {
		                  e.preventDefault();
		                  e.stopPropagation();
		                  setOpenSeq(open ? null : s.seq);
		                }
		              },
		              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronIcon, { open })
		            }
		          ) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seq", children: s.seq }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("td", { children: [
		            s.turn,
		            "/",
		            s.step
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-model", title: s.model ?? void 0, children: s.model ?? t("unknown") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: exactNumber(s.inputTokens) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: exactNumber(s.outputTokens) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: s.durationMs === null ? t("unknown") : formatMs(s.durationMs) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: s.purpose === "compaction" ? statusPill("compaction", t) : statusPill(s.status, t) }),
		          canJump ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            "button",
		            {
		              type: "button",
		              className: "dshd-jump",
		              disabled: (detail?.toolCalls.length ?? 0) === 0,
		              "aria-label": t("req.jumpTrajectory"),
		              title: s.purpose === "compaction" ? t("req.jumpCompaction") : t("req.jumpTrajectory"),
		              onClick: (e) => {
		                e.stopPropagation();
		                jumpTo(s.seq);
		              },
		              children: "\u2197"
		            }
		          ) }) : null
		        ] }),
		        detail: open && detail !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		          RequestDetailPanel,
		          {
		            detail,
		            t,
		            onJump: canJump && (detail?.toolCalls.length ?? 0) > 0 ? () => jumpTo(s.seq) : void 0
		          }
		        ) : null
		      },
		      s.seq
		    );
		  };
		  const groups = (() => {
		    if (view === "table") return [];
		    const map = /* @__PURE__ */ new Map();
		    for (const s of searched) {
		      let key;
		      if (view === "turn") key = `${t("turns.label")}${s.turn}`;
		      else if (view === "model") key = s.model ?? t("unknown");
		      else {
		        if (s.status !== "error") continue;
		        key = (s.error ?? "").trim().length > 0 ? s.error : t("unknown");
		      }
		      const list = map.get(key) ?? [];
		      list.push(s);
		      map.set(key, list);
		    }
		    return [...map.entries()].map(([key, items]) => ({ key, label: key, items })).sort((a, b) => b.items.length - a.items.length);
		  })();
		  const statusCounts = { all: metrics.series.length, running: 0, complete: 0, error: 0 };
		  for (const s of metrics.series) statusCounts[s.status] += 1;
		  const viewCounts = {
		    table: total,
		    turn: new Set(searched.map((s) => s.turn)).size,
		    model: new Set(searched.map((s) => s.model ?? "")).size,
		    error: new Set(searched.filter((s) => s.status === "error").map((s) => s.error ?? "")).size
		  };
		  (0, import_react4.useEffect)(() => {
		    const first = metrics.series[0];
		    const newest = first === void 0 ? null : first.seq;
		    if (newest !== null && lastSeqRef.current !== null && newest > lastSeqRef.current && safePage > 0) {
		      setNewArrived(true);
		    }
		    if (newest !== null) lastSeqRef.current = newest;
		    if (safePage === 0) setNewArrived(false);
		  }, [metrics.series, safePage]);
		  const pageWindow = [];
		  if (pageCount <= 5) {
		    for (let i = 0; i < pageCount; i += 1) pageWindow.push(i);
		  } else {
		    const pages = /* @__PURE__ */ new Set([0, pageCount - 1, safePage - 1, safePage, safePage + 1]);
		    let prev = -2;
		    for (const p of [...pages].sort((a, b) => a - b)) {
		      if (p < 0 || p >= pageCount) continue;
		      if (p - prev > 1) pageWindow.push("\u2026");
		      pageWindow.push(p);
		      prev = p;
		    }
		  }
		  const display = metrics.series.slice(0, 60).reverse();
		  const windowDurationMs = display.reduce(
		    (sum, s) => sum + (s.status !== "running" && s.durationMs !== null ? s.durationMs : 0),
		    0
		  );
		  const windowTtftAvgMs = metrics.assistantTtft.length > 0 ? Math.round(metrics.assistantTtft.reduce((a, b) => a + b.ttftMs, 0) / metrics.assistantTtft.length) : null;
		  const windowed = metrics.series.length > 60;
		  const scopeNote = windowed ? ` \xB7 ${t("trend.scopeNote")} 60 ${t("pager.items")}` : "";
		  const windowTitle = windowed ? t("trend.windowTotal") : t("trend.windowTotalAll");
		  const tokenBars = display.map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: s.inputTokens,
		    color: CHART_COLORS.input,
		    status: s.status
		  }));
		  const outputBars = display.map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: s.outputTokens,
		    color: CHART_COLORS.output,
		    status: s.status
		  }));
		  const durationBars = display.filter((s) => s.status !== "running").map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: s.durationMs ?? 0,
		    color: CHART_COLORS.reasoning,
		    status: s.status
		  }));
		  const hitBars = display.filter((s) => s.status !== "running" && s.inputTokens > 0).map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: Math.round(s.cacheReadTokens / s.inputTokens * 100),
		    color: CHART_COLORS.cacheRead,
		    status: s.status
		  }));
		  const cacheWriteBars = display.map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: s.cacheWriteTokens,
		    color: CHART_COLORS.cacheWrite,
		    status: s.status
		  }));
		  const ttftBars = metrics.assistantTtft.slice(-60).map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: s.ttftMs,
		    color: CHART_COLORS.reasoning
		  }));
		  const turnInputBars = metrics.turnInput.slice(-60).map((r) => ({
		    label: `${t("turns.label")}${r.turn}`,
		    value: r.inputTokens,
		    color: CHART_COLORS.input
		  }));
		  const lastTurnDelta = metrics.turnInput.length > 1 ? metrics.turnInput[metrics.turnInput.length - 1].delta : null;
		  const bucketTime = (ms) => new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		  const rateReqBars = metrics.throughput.map((b) => ({
		    label: bucketTime(b.bucketMs),
		    value: b.requests,
		    color: CHART_COLORS.llm
		  }));
		  const rateTokenBars = metrics.throughput.map((b) => ({
		    label: bucketTime(b.bucketMs),
		    value: b.inputTokens + b.outputTokens,
		    color: CHART_COLORS.input
		  }));
		  const rateFailBars = metrics.throughput.map((b) => ({
		    label: bucketTime(b.bucketMs),
		    value: b.failed,
		    color: CHART_COLORS.error
		  }));
		  const totalFailed = metrics.series.filter((s) => s.status === "error").length;
		  const contextOccBars = metrics.contextTrend.filter((c) => c.pct !== null).map((c) => ({
		    label: `${t("trend.request")}${c.seq}`,
		    value: c.pct,
		    color: CHART_COLORS.cacheWrite
		  }));
		  const occNowPct = metrics.pressure?.projectedTokens !== void 0 && metrics.pressure.contextWindow !== void 0 && metrics.pressure.contextWindow > 0 ? Math.min(100, Math.round(metrics.pressure.projectedTokens / metrics.pressure.contextWindow * 100)) : null;
		  const compactionTurns = [...new Set(metrics.compactionEffect.map((e) => e.turn))].sort((a, b) => a - b);
		  const reasoningShareBars = display.filter((s) => s.outputTokens > 0).map((s) => ({
		    label: `${t("trend.request")}${s.seq}`,
		    value: Math.round(s.reasoningTokens / s.outputTokens * 100),
		    color: CHART_COLORS.reasoning,
		    status: s.status
		  }));
		  const totalInput = metrics.series.reduce((sum, s) => sum + s.inputTokens, 0);
		  const totalOutput = metrics.series.reduce((sum, s) => sum + s.outputTokens, 0);
		  const totalCacheWrite = metrics.series.reduce((sum, s) => sum + s.cacheWriteTokens, 0);
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-col", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("details", { className: "dshd-trendDetails", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("summary", { children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "analysis" }),
		        t("dashboard.trends"),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("dashboard.trendsNote") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "chevron" })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-trendGrid", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesRow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheRead, display: "inline-block" } }),
		              t("trend.cacheHit"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-seriesTotal", children: [
		                metrics.cacheHitPercent === null ? "\u2014" : `${metrics.cacheHitPercent}%`,
		                " ",
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-scopeTag", children: t("stat.scopeAll") })
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              AreaChart,
		              {
		                series: hitBars,
		                height: 76,
		                color: CHART_COLORS.cacheRead,
		                valueFormatter: (v) => `${v}%`,
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		              t("trend.input"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalInput) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: tokenBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.output, display: "inline-block" } }),
		              t("trend.output"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalOutput) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: outputBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		                "span",
		                {
		                  style: {
		                    width: 9,
		                    height: 9,
		                    borderRadius: 2.5,
		                    background: CHART_COLORS.reasoning,
		                    display: "inline-block"
		                  }
		                }
		              ),
		              t("trend.duration"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: formatMs(windowDurationMs) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: durationBars, height: 76, valueFormatter: (v) => formatMs(v), emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesRow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" } }),
		              t("trend.ttft"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", title: t("trend.ttftAvgNote"), children: windowTtftAvgMs === null ? "\u2014" : `${formatMs(windowTtftAvgMs)} ${t("timing.avg")}` })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              AreaChart,
		              {
		                series: ttftBars,
		                height: 76,
		                color: CHART_COLORS.reasoning,
		                valueFormatter: (v) => formatMs(v),
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote,
		              metrics.ttftStats.p50 !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-ttftStats", children: [
		                "P50 ",
		                formatMs(metrics.ttftStats.p50),
		                " \xB7 P95 ",
		                formatMs(metrics.ttftStats.p95 ?? 0),
		                " \xB7 P99 ",
		                formatMs(metrics.ttftStats.p99 ?? 0)
		              ] }) : null
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		              t("trend.turnInput"),
		              lastTurnDelta !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		                "span",
		                {
		                  className: `dshd-delta ${lastTurnDelta > 0 ? "dshd-deltaUp" : lastTurnDelta < 0 ? "dshd-deltaDown" : ""}`,
		                  title: t("trend.deltaNote"),
		                  children: [
		                    lastTurnDelta > 0 ? "+" : "",
		                    exactNumber(lastTurnDelta)
		                  ]
		                }
		              ) : null
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AreaChart, { series: turnInputBars, height: 76, color: CHART_COLORS.input, valueFormatter: (v) => exactNumber(v), emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote,
		              compactionTurns.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-ttftStats", children: [
		                "\u25C6 ",
		                t("trend.compactionMarks"),
		                ": ",
		                compactionTurns.map((tn) => `${t("turns.label")}${tn}`).join("\u3001")
		              ] }) : null
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" } }),
		              t("trend.reasoningShare")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              AreaChart,
		              {
		                series: reasoningShareBars,
		                height: 76,
		                color: CHART_COLORS.reasoning,
		                valueFormatter: (v) => `${v}%`,
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" } }),
		              t("trend.cacheWrite"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalCacheWrite) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: cacheWriteBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-axisHint", children: [
		              t("trend.newestRight"),
		              scopeNote
		            ] })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesRow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.llm, display: "inline-block" } }),
		              t("trend.rateRequests")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: rateReqBars, height: 60, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		              t("trend.rateTokens")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SeriesBars, { series: rateTokenBars, height: 60, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.error, display: "inline-block" } }),
		              t("trend.rateFailed"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-seriesTotal", children: exactNumber(totalFailed) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              AreaChart,
		              {
		                series: rateFailBars,
		                height: 60,
		                color: CHART_COLORS.error,
		                valueFormatter: (v) => exactNumber(v),
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesCol", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-seriesLabel", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" } }),
		              t("trend.contextOcc"),
		              occNowPct !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-seriesTotal", children: [
		                occNowPct,
		                "%"
		              ] }) : null
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              AreaChart,
		              {
		                series: contextOccBars,
		                height: 60,
		                color: CHART_COLORS.cacheWrite,
		                valueFormatter: (v) => `${v}%`,
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-axisHint", children: t("hint.contextOccTrend") })
		          ] })
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-viewTabs", role: "group", "aria-label": t("view.tabs.aria"), children: ["table", "turn", "model", "error"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		      "button",
		      {
		        type: "button",
		        className: "dshd-viewTab",
		        "data-current": view === v ? true : void 0,
		        "aria-pressed": view === v,
		        onClick: () => {
		          setView(v);
		          setPage(0);
		        },
		        children: [
		          t(`view.${v}`),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-badge", children: viewCounts[v] })
		        ]
		      },
		      v
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-filters", role: "group", "aria-label": t("req.filter.aria"), children: [
		      ["all", "running", "complete", "error"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "dshd-filterBtn",
		          "data-current": filter === f ? true : void 0,
		          "aria-pressed": filter === f,
		          onClick: () => {
		            setFilter(f);
		            setPage(0);
		          },
		          children: [
		            t(`req.filter.${f}`),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-badge", children: statusCounts[f] })
		          ]
		        },
		        f
		      )),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		        "input",
		        {
		          type: "search",
		          className: "dshd-search",
		          placeholder: t("req.searchPlaceholder"),
		          value: search,
		          "aria-label": t("req.searchPlaceholder"),
		          onChange: (e) => {
		            setSearch(e.target.value);
		            setPage(0);
		          }
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dshd-filterBtn", title: t("req.exportHint"), onClick: exportJson, children: t("req.export") })
		    ] }),
		    view === "table" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-tableWrap", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("table", { className: "dshd-table", "aria-label": t("section.requests"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", {}),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: "#" }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.turnStep") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.model") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.input") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.output") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.duration") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.status") }),
		          canJump ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", {}) : null
		        ] }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tbody", { children: [
		          rows.map(renderRow),
		          rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { colSpan: colCount, className: "dshd-tableEmpty", children: search.trim().length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		            t("empty.search"),
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              "button",
		              {
		                type: "button",
		                className: "dshd-clearFilter",
		                onClick: () => {
		                  setSearch("");
		                  setPage(0);
		                },
		                children: t("req.clearSearch")
		              }
		            )
		          ] }) : filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		            t("empty.requestsFiltered"),
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              "button",
		              {
		                type: "button",
		                className: "dshd-clearFilter",
		                onClick: () => {
		                  setFilter("all");
		                  setPage(0);
		                },
		                children: t("req.filter.all")
		              }
		            )
		          ] }) : t("empty.requestsTable") }) }) : null
		        ] })
		      ] }) }),
		      total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-pager", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-pagerInfo", children: [
		          t("pager.page"),
		          " ",
		          safePage + 1,
		          t("pager.of"),
		          pageCount,
		          " \xB7 ",
		          total,
		          " ",
		          t("pager.items")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-pagerBtns", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            "button",
		            {
		              type: "button",
		              className: "dshd-pageBtn",
		              disabled: safePage === 0,
		              "aria-label": t("pager.prev"),
		              onClick: () => setPage(safePage - 1),
		              children: "\u2039"
		            }
		          ),
		          pageWindow.map(
		            (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-pageEllipsis", children: "\u2026" }, `e${i}`) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              "button",
		              {
		                type: "button",
		                className: "dshd-pageBtn",
		                "data-current": p === safePage ? true : void 0,
		                "aria-current": p === safePage ? "page" : void 0,
		                "aria-label": `${t("pager.jumpTo")} ${p + 1}`,
		                onClick: () => setPage(p),
		                children: p + 1
		              },
		              p
		            )
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            "button",
		            {
		              type: "button",
		              className: "dshd-pageBtn",
		              disabled: safePage >= pageCount - 1,
		              "aria-label": t("pager.next"),
		              onClick: () => setPage(safePage + 1),
		              children: "\u203A"
		            }
		          )
		        ] }),
		        newArrived ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dshd-newBtn", onClick: () => {
		          setPage(0);
		          setNewArrived(false);
		        }, children: t("trend.newRequests") }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "dshd-pageSize", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-muted", children: t("pager.perPage") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		            "select",
		            {
		              value: pageSize,
		              "aria-label": t("pager.perPage"),
		              onChange: (e) => {
		                setPageSize(Number(e.target.value));
		                setPage(0);
		              },
		              children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: 10, children: "10" }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: 20, children: "20" }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: 50, children: "50" })
		              ]
		            }
		          )
		        ] })
		      ] }) : null
		    ] }) : (
		      /* Grouped views: collapsible group headers + aggregated stats */
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-groups", children: [
		        groups.map((g) => {
		          const gkey = `${view}:${g.key}`;
		          const isCollapsed = collapsed[gkey] === true;
		          let inSum = 0;
		          let outSum = 0;
		          let durSum = 0;
		          let durN = 0;
		          let errN = 0;
		          for (const s of g.items) {
		            inSum += s.inputTokens;
		            outSum += s.outputTokens;
		            if (s.durationMs !== null) {
		              durSum += s.durationMs;
		              durN += 1;
		            }
		            if (s.status === "error") errN += 1;
		          }
		          return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-group", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		              "button",
		              {
		                type: "button",
		                className: "dshd-groupHead",
		                "aria-expanded": !isCollapsed,
		                onClick: () => toggleCollapsed(gkey),
		                children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-chevron", "data-open": isCollapsed ? void 0 : true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronIcon, { open: !isCollapsed }) }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-groupName", children: g.label }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-groupStats", children: [
		                    g.items.length,
		                    " ",
		                    t("pager.items"),
		                    " \xB7 ",
		                    t("trend.input"),
		                    " ",
		                    compactNumber(inSum),
		                    " \xB7 ",
		                    t("trend.output"),
		                    " ",
		                    compactNumber(outSum),
		                    durN > 0 ? ` \xB7 ${t("trend.duration")} ${formatMs(Math.round(durSum / durN))}` : "",
		                    errN > 0 ? ` \xB7 ! ${errN}` : ""
		                  ] })
		                ]
		              }
		            ),
		            !isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-groupBody", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("table", { className: "dshd-table", "aria-label": g.label, children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", {}),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: "#" }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.turnStep") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.model") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.input") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.output") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("trend.duration") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { children: t("req.status") }),
		                  canJump ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", {}) : null
		                ] }) }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("tbody", { children: g.items.slice(0, GROUP_ROW_CAP).map(renderRow) })
		              ] }),
		              g.items.length > GROUP_ROW_CAP ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-axisHint", children: t("group.tailNote").replace("{n}", String(GROUP_ROW_CAP)).replace("{m}", String(g.items.length - GROUP_ROW_CAP)) }) : null
		            ] }) : null
		          ] }, g.key);
		        }),
		        groups.length === 0 ? search.trim().length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: [
		          t("empty.search"),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dshd-clearFilter", onClick: () => setSearch(""), children: t("req.clearSearch") })
		        ] }) : filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: [
		          t("empty.requestsFiltered"),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "dshd-clearFilter", onClick: () => setFilter("all"), children: t("req.filter.all") })
		        ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: t("empty.requestsTable") }) : null
		      ] })
		    )
		  ] });
		}
		function FragmentRow(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		      "tr",
		      {
		        "data-open": props.open || void 0,
		        "data-error": props.rowError || void 0,
		        title: props.rowTitle,
		        tabIndex: 0,
		        onClick: props.onRowClick,
		        onKeyDown: (e) => {
		          if (e.target !== e.currentTarget) return;
		          if (e.key === "Enter" || e.key === " ") {
		            e.preventDefault();
		            props.onRowClick();
		          }
		        },
		        children: props.cols
		      }
		    ),
		    props.detail !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { colSpan: props.colSpan, style: { padding: "0 8px 10px" }, children: props.detail }) }) : null
		  ] });
		}
		function RequestActivity({ samples, t }) {
		  const recent = samples.slice(0, 60).reverse();
		  const maxDuration = Math.max(1, ...recent.map((sample) => sample.durationMs ?? 0));
		  const hasDuration = recent.some((sample) => sample.durationMs !== null);
		  if (recent.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-activityEmpty", children: t("empty.requests") });
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-activity", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-activityCaption", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("dashboard.activityCaption") }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		        t("dashboard.slowest"),
		        " ",
		        hasDuration ? formatMs(maxDuration) : t("unknown")
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-activityPlot", role: "img", "aria-label": t("dashboard.activityAria"), children: recent.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		      "span",
		      {
		        className: "dshd-activitySample",
		        "data-status": sample.status,
		        title: `#${sample.seq} ${sample.model ?? t("unknown")} / ${sample.durationMs === null ? t("stat.requests.running") : formatMs(sample.durationMs)}`,
		        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { height: `${Math.max(8, (sample.durationMs ?? 0) / maxDuration * 100)}%` } })
		      },
		      sample.seq
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-activityAxis", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: recent[0] === void 0 ? t("unknown") : `#${recent[0].seq}` }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("dashboard.activityOrder") }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: recent.at(-1) === void 0 ? t("unknown") : `#${recent.at(-1).seq}` })
		    ] })
		  ] });
		}
		function DashboardView(props) {
		  const { useSession, useConversation, useTrajectory, useProjection, useSessions, t, openView, sessionId } = props;
		  const rootRef = (0, import_react4.useRef)(null);
		  const scrollHandlerRef = (0, import_react4.useRef)(null);
		  const restoringRef = (0, import_react4.useRef)(false);
		  const sessionRef = (0, import_react4.useRef)(sessionId);
		  sessionRef.current = sessionId;
		  const bindRoot = (0, import_react4.useCallback)((el) => {
		    const prev = rootRef.current;
		    if (prev !== null && scrollHandlerRef.current !== null) {
		      prev.removeEventListener("scroll", scrollHandlerRef.current);
		    }
		    rootRef.current = el;
		    scrollHandlerRef.current = null;
		    if (el === null) return;
		    restoringRef.current = true;
		    el.scrollTop = scrollMemory.get(sessionRef.current) ?? 0;
		    restoringRef.current = false;
		    const onScroll = () => {
		      if (restoringRef.current) return;
		      scrollMemory.set(sessionRef.current, el.scrollTop);
		    };
		    scrollHandlerRef.current = onScroll;
		    el.addEventListener("scroll", onScroll, { passive: true });
		  }, []);
		  (0, import_react4.useEffect)(() => () => {
		    const el = rootRef.current;
		    if (el !== null) scrollMemory.set(sessionRef.current, el.scrollTop);
		  }, []);
		  const chat = useConversation((s) => s.views.get("chat"));
		  const trajectory = useTrajectory((s) => s);
		  const nodes = chat?.legacy.nodes ?? EMPTY_NODES;
		  const turnTimings = chat?.legacy.turnTimings ?? EMPTY_TURN_TIMINGS;
		  const partial = chat?.legacy.partial ?? null;
		  const runningCalls = chat?.legacy.runningCalls ?? EMPTY_RUNNING_CALLS;
		  const running = useSession((s) => s.running) === true;
		  const hasMore = useSession((s) => s.hasMore) === true;
		  const [panel, setPanel] = (0, import_react4.useState)("overview");
		  const [clock, setClock] = (0, import_react4.useState)(0);
		  const [requestFilter, setRequestFilter] = (0, import_react4.useState)("all");
		  (0, import_react4.useEffect)(() => {
		    if (!running) return;
		    const id = window.setInterval(() => setClock((c) => c + 1), 1e3);
		    return () => window.clearInterval(id);
		  }, [running]);
		  const tokenUsage = useProjection("tokenUsage");
		  const stats = useProjection("sessionStats");
		  const context = useProjection("contextBreakdown");
		  const pressure = useProjection("contextPressure");
		  const goal = useProjection("goal");
		  const todos = useProjection("todos");
		  const board = useProjection("boardState");
		  const subagents = useSessions((s) => subagentEntriesOf(s, sessionId));
		  const hud = useHudData({ running, runningCalls, goal, todos, board, subagentEntries: subagents });
		  const metrics = (0, import_react4.useMemo)(
		    () => deriveMetrics(
		      {
		        running,
		        snapshot: { turnTimings },
		        nodes,
		        requests: trajectory?.requests ?? [],
		        tokenUsage,
		        stats,
		        context,
		        pressure
		      },
		      Date.now()
		    ),
		    [running, nodes, turnTimings, trajectory, tokenUsage, stats, context, pressure, clock]
		  );
		  const hasData = metrics.turns > 0 || metrics.steps > 0 || metrics.requestCount > 0 || metrics.inputTokens > 0 || metrics.roles.total > 0;
		  const detailsBySeq = (0, import_react4.useMemo)(() => new Map(metrics.details.map((d) => [d.seq, d])), [metrics.details]);
		  const jumpTo = (seq) => {
		    const call = detailsBySeq.get(seq)?.toolCalls[0];
		    if (call !== void 0) openView("trajectory", call.callId);
		  };
		  const formLabel = (f) => f === "instructions" || f === "catalog" || f === "snapshot" || f === "notice" || f === "relay" || f === "recall" ? t(`contextForm.${f}`) : t("contextForm.opaque");
		  const streamingBlocks = (0, import_react4.useMemo)(() => extractStreamingBlocks(partial), [partial]);
		  const streamed = (0, import_react4.useMemo)(() => summarizeStreamChars(streamingBlocks), [streamingBlocks]);
		  const liveItem = (0, import_react4.useMemo)(() => currentStreamingItem(streamingBlocks), [streamingBlocks]);
		  const livePreview = (0, import_react4.useMemo)(
		    () => compactStreamLine(liveItem?.text ?? "", STREAM_MAX_CHARS),
		    [liveItem]
		  );
		  const tokenData = [
		    { label: t("req.usage.uncached"), value: Math.max(0, metrics.inputTokens - metrics.cacheReadTokens - metrics.cacheWriteTokens), color: CHART_COLORS.input },
		    { label: t("tokens.cacheRead"), value: metrics.cacheReadTokens, color: CHART_COLORS.cacheRead },
		    { label: t("tokens.cacheWrite"), value: metrics.cacheWriteTokens, color: CHART_COLORS.cacheWrite },
		    // Billed output as reported (may include reasoning); reasoning is shown
		    // separately as a StatCard so the bar total never double counts.
		    { label: t("tokens.output"), value: metrics.outputTokens, color: CHART_COLORS.output }
		  ];
		  const roleData = [
		    { label: t("role.user"), value: metrics.roles.user, color: CHART_COLORS.input },
		    { label: t("role.steering"), value: metrics.roles.steering, color: CHART_COLORS.steering },
		    { label: t("role.assistant"), value: metrics.roles.assistant, color: CHART_COLORS.assistant },
		    { label: t("role.system"), value: metrics.roles.system, color: CHART_COLORS.system },
		    { label: t("role.tool"), value: metrics.roles.tool, color: CHART_COLORS.tool },
		    { label: t("role.other"), value: metrics.roles.other, color: CHART_COLORS.other }
		  ].filter((d) => d.value > 0);
		  const contextData = metrics.context ? [
		    { label: t("context.system"), value: metrics.context.systemTokens, color: CHART_COLORS.system },
		    { label: t("context.tools"), value: metrics.context.toolsTokens, color: CHART_COLORS.tools },
		    { label: t("context.messages"), value: metrics.context.messageTokens, color: CHART_COLORS.messages }
		  ] : [];
		  const model = metrics.series.find((sample) => sample.model !== null)?.model ?? null;
		  const toolDurations = new Map(metrics.toolDurationTop.map((row) => [row.name, row]));
		  const maxToolCalls = Math.max(1, ...metrics.toolHistogram.map((row) => row.count));
		  const errorRows = [
		    { label: t("stat.turnErrors"), value: metrics.anomalies.turnErrors, color: CHART_COLORS.error },
		    { label: t("stat.maxTokenHits"), value: metrics.anomalies.maxTokenHits, color: CHART_COLORS.cacheWrite },
		    { label: t("stat.retries"), value: metrics.anomalies.modelRetries, color: CHART_COLORS.reasoning },
		    { label: t("stat.interrupted"), value: metrics.anomalies.interrupted, color: CHART_COLORS.other },
		    { label: t("stat.commands"), value: metrics.anomalies.commands, color: CHART_COLORS.steering }
		  ].filter((r) => r.value > 0);
		  const windowNote = `${t("role.windowNote")}${hasMore ? t("windowNote.more") : ""}`;
		  const nowMs = Date.now();
		  const stuckRequests = metrics.series.filter((s) => s.status === "running" && s.startedAt !== null).map((s) => ({ seq: s.seq, elapsed: Math.max(0, nowMs - s.startedAt) })).filter((x) => x.elapsed > 6e4);
		  const stuckToolMs = 3e4;
		  const maxTurnMs = Math.max(1, ...metrics.turnDurations.map((td) => td.durationMs));
		  const panels = ["overview", "analysis", "requests", "agents"];
		  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { ref: bindRoot, className: "dshd-root", "data-panel": panel, "data-conversation-composer-overlay": "", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("header", { className: "dshd-dashboardHead", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-header", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-brandMark", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "pulse" }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-headingGroup", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "dshd-title", children: t("dashboard.title") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-subtitle", children: t("dashboard.subtitle") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-spacer" }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-headerContext", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-sessionState", "data-running": running, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {}),
		            running ? t("hud.status.running") : t("hud.status.idle")
		          ] }),
		          model !== null && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-modelBadge", title: model, children: model })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-navigation", role: "group", "aria-label": t("dashboard.navigation"), children: panels.map((item) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
		        "button",
		        {
		          type: "button",
		          className: "dshd-navItem",
		          "aria-pressed": panel === item,
		          onClick: () => {
		            setRequestFilter("all");
		            setPanel(item);
		            rootRef.current?.scrollTo({ top: 0 });
		          },
		          children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: item }),
		            t(`dashboard.${item}`),
		            item === "requests" && metrics.failedRequests > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-navCount", "data-error": "true", children: metrics.failedRequests }),
		            item === "agents" && subagents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-navCount", children: subagents.length })
		          ]
		        },
		        item
		      )) })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HudStrip, { data: hud, t }),
		    !hasData && panel !== "agents" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-emptyState", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "analysis" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: t("empty") })
		    ] }),
		    running ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-streamRow", role: "status", "aria-live": "polite", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-streamDot" }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-streamBody", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-streamHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-streamText", children: [
		            t("status.streaming"),
		            streamed.text > 0 ? ` ${exactNumber(streamed.text)} ${t("unit.char")}` : "",
		            streamed.reasoning > 0 ? ` \xB7 ${t("tokens.reasoning")} ${exactNumber(streamed.reasoning)} ${t("unit.char")}` : ""
		          ] }),
		          stuckRequests[0] !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-streamWarn", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { role: "alert", children: t("status.stuckAlert").replace("{n}", String(stuckRequests[0].seq)) }),
		            t("status.stuckTimer").replace("{s}", formatMs(stuckRequests[0].elapsed))
		          ] }) : null,
		          runningCalls.at(-1) !== void 0 ? (() => {
		            const call = runningCalls.at(-1);
		            const elapsed = Math.max(0, nowMs - call.time);
		            return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: `dshd-streamTool${elapsed > stuckToolMs ? " dshd-streamWarn" : ""}`, children: [
		              t("status.tool"),
		              " ",
		              call.name,
		              " \xB7 ",
		              formatMs(elapsed),
		              runningCalls.length > 1 ? ` +${runningCalls.length - 1}` : ""
		            ] });
		          })() : null
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-streamLine", "data-kind": liveItem?.kind ?? "empty", "aria-label": t("stream.liveOutput"), title: liveItem?.text || void 0, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-streamMarker", "aria-hidden": "true", children: liveItem?.kind === "reasoning" ? "Think" : liveItem?.kind === "text" ? "Output" : liveItem?.kind === "tool-call" ? "Tool" : "Live" }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-streamSegmentLabel", children: liveItem?.kind === "reasoning" ? t("stream.think") : liveItem?.kind === "text" ? t("stream.output") : liveItem?.kind === "tool-call" ? liveItem.name || t("status.tool") : t("stream.liveOutput") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-streamLineText", children: livePreview || (liveItem?.kind === "reasoning" ? t("stream.onlyReasoning") : t("stream.fallback")) })
		        ] })
		      ] })
		    ] }) : null,
		    panel === "overview" && hasData && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-sessionOverview", "aria-label": t("section.overview"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-primaryMetric", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-recordHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { children: t("dashboard.activityTitle") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: t("dashboard.activityNote") })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-requestTotal", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { className: "dshd-heroValue", children: exactNumber(metrics.requestCount) }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("stat.requests") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.requests") })
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RequestActivity, { samples: metrics.series, t }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-requestBreakdown", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { "data-state": "complete", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}),
		              metrics.completedRequests,
		              " ",
		              t("stat.requests.completed")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { "data-state": "running", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}),
		              metrics.runningRequests,
		              " ",
		              t("stat.requests.running")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", "data-error": metrics.failedRequests > 0, onClick: () => {
		              setRequestFilter(metrics.failedRequests > 0 ? "error" : "all");
		              setPanel("requests");
		            }, children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}),
		              metrics.failedRequests,
		              " ",
		              t("stat.requests.error")
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { type: "button", className: "dshd-openRequests", onClick: () => {
		              setRequestFilter("all");
		              setPanel("requests");
		            }, children: [
		              t("dashboard.inspectRequests"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "arrow" })
		            ] })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("aside", { className: "dshd-sessionLedger", "aria-label": t("dashboard.performance"), children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-ledgerHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "analysis" }),
		            t("dashboard.performance")
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StatCard, { label: t("stat.avgTtft"), value: metrics.avgTtftMs === null ? t("unknown") : formatMs(metrics.avgTtftMs), hint: t("hint.avgTtft") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StatCard, { label: t("stat.decodeSpeed"), value: metrics.decodeTokensPerSec === null ? t("unknown") : `${Math.round(metrics.decodeTokensPerSec)} ${t("unit.tps")}`, hint: t("hint.decodeSpeed") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            StatCard,
		            {
		              label: t("stat.cost"),
		              value: fmtCost(metrics.costEstimateUsd.total),
		              hint: t("hint.cost"),
		              sub: metrics.costEstimateUsd.unpricedRequests > 0 ? t("dashboard.unpriced").replace("{n}", String(metrics.costEstimateUsd.unpricedRequests)) : t("dashboard.costNote")
		            }
		          )
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("footer", { className: "dshd-sessionFootnote", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: windowNote }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		            metrics.turns,
		            " ",
		            t("stat.turns"),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "/" }),
		            metrics.steps,
		            " ",
		            t("stat.steps")
		          ] })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-tokenPanel", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "layers" }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.tokens") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: `${t("tokens.formula")} \xB7 ${t("tokens.cacheNote")}` })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-tokenStats", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StatCard, { label: t("stat.inputTokens"), value: exactNumber(metrics.inputTokens), hint: t("hint.inputTokens") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StatCard, { label: t("stat.outputTokens"), value: exactNumber(metrics.outputTokens), hint: t("hint.outputTokens") }),
		          metrics.reasoningTokens > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            StatCard,
		            {
		              label: t("stat.reasoningTokens"),
		              value: exactNumber(metrics.reasoningTokens),
		              hint: t("hint.reasoningTokens"),
		              sub: metrics.windowOutputTokens > 0 ? `${t("stat.reasoningShare")} ${Math.round(metrics.reasoningTokens / metrics.windowOutputTokens * 100)}% (${t("role.windowNote")})` : void 0,
		              tone: "reasoning"
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cacheMetric", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cacheRing", style: { "--dshd-cache-angle": `${(metrics.cacheHitPercent ?? 0) * 3.6}deg` }, "aria-hidden": "true" }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StatCard, { label: t("stat.cacheHitRate"), value: metrics.cacheHitPercent === null ? t("unknown") : `${metrics.cacheHitPercent}%`, hint: t("hint.cacheHitRate") })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StackedBar, { data: tokenData, valueFormatter: (v) => exactNumber(v), height: 20, totalLabel: t("total") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-grid2 dshd-overviewGrid", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "context" }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("stat.contextOccupancy") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.contextOccupancy") })
		          ] }),
		          metrics.pressure?.projectedTokens === void 0 || metrics.pressure.contextWindow === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: t("context.pressureMissing") }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-gaugeRow", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-gaugeBox", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		                RadialGauge,
		                {
		                  value: metrics.pressure.projectedTokens,
		                  max: metrics.pressure.contextWindow,
		                  unit: t("unit.percent"),
		                  ariaLabel: t("aria.gauge")
		                }
		              ),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-gaugeLabel", children: [
		                exactNumber(metrics.pressure.projectedTokens),
		                " / ",
		                exactNumber(metrics.pressure.contextWindow)
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-col", style: { flex: 1, minWidth: 0 }, children: contextData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-empty", children: t("context.note") }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(StackedBar, { data: contextData, valueFormatter: (v) => exactNumber(v), height: 20, totalLabel: t("total") }) })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DashboardIcon, { name: "clock" }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.timing") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardHint", children: t("stat.scopeAll") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            StackedBar,
		            {
		              data: [
		                { label: t("timing.llm"), value: metrics.llmMs, color: CHART_COLORS.llm },
		                { label: t("timing.tool"), value: metrics.toolMs, color: CHART_COLORS.toolTime }
		              ],
		              valueFormatter: (v) => formatMs(v),
		              height: 20,
		              totalLabel: t("total")
		            }
		          ),
		          metrics.ttftByCache.hitN + metrics.ttftByCache.missN > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-col", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-subTitle", children: t("section.ttftByCache") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kv", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-kvKey", style: { color: "var(--dsw-alias-state-success-primary)" }, children: [
		                  t("ttftCache.hit"),
		                  " (",
		                  metrics.ttftByCache.hitN,
		                  ")"
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: metrics.ttftByCache.hitAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.hitAvgMs) })
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-kvItem", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-kvKey", style: { color: "var(--dsw-alias-state-warn-primary)" }, children: [
		                  t("ttftCache.miss"),
		                  " (",
		                  metrics.ttftByCache.missN,
		                  ")"
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-kvValue", children: metrics.ttftByCache.missAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.missAvgMs) })
		              ] })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", style: { fontSize: 10.5 }, children: t("hint.ttftByCache") })
		          ] }) : metrics.assistantTtft.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", style: { fontSize: 10.5 }, children: t("hint.ttftByCacheMiss") }) : null,
		          metrics.durationStats.sampleCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-col", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-subTitle", children: t("section.durationDist") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-percRow", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-perc", children: [
		                "P50 ",
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: formatMs(metrics.durationStats.p50 ?? 0) })
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-perc", children: [
		                "P95 ",
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: formatMs(metrics.durationStats.p95 ?? 0) })
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-perc", children: [
		                "P99 ",
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: formatMs(metrics.durationStats.p99 ?? 0) })
		              ] })
		            ] }),
		            (() => {
		              const maxCount = Math.max(1, ...metrics.durationStats.buckets.map((b) => b.count));
		              return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-hist", children: metrics.durationStats.buckets.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		                "div",
		                {
		                  className: "dshd-histCol",
		                  title: `${formatMs(b.loMs)} \u2013 ${formatMs(b.hiMs)} \xB7 ${b.count}`,
		                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		                    "div",
		                    {
		                      className: "dshd-histBar",
		                      style: {
		                        height: `${b.count > 0 ? Math.max(b.count / maxCount * 100, 8) : 0}%`,
		                        background: CHART_COLORS.reasoning
		                      }
		                    }
		                  )
		                },
		                i
		              )) });
		            })()
		          ] }) : null
		        ] })
		      ] })
		    ] }),
		    panel === "analysis" && hasData && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-sectionIntro", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { children: t("dashboard.analysis") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: windowNote })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-analysisGrid", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-toolAnalysis", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.tools") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardHint", children: t("analysis.toolSummary").replace("{calls}", exactNumber(metrics.toolCallCount)).replace("{tools}", String(metrics.toolHistogram.length)) }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("tools.note") })
		          ] }),
		          metrics.toolHistogram.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-analysisTableScroll", tabIndex: 0, role: "region", "aria-label": t("section.tools"), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("table", { className: "dshd-analysisTable", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "col", children: t("analysis.toolName") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "col", children: t("analysis.calls") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "col", children: t("stat.requests.error") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "col", children: t("analysis.totalTime") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "col", children: t("analysis.avgTime") })
		            ] }) }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("tbody", { children: metrics.toolHistogram.map((row) => {
		              const timing = toolDurations.get(row.name);
		              return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { scope: "row", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolName", children: row.name }) }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-callVolume", children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-toolShare", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { width: `${row.count / maxToolCalls * 100}%` } }) }),
		                  exactNumber(row.count)
		                ] }) }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { "data-error": row.errorCount > 0, children: row.errorCount > 0 ? exactNumber(row.errorCount) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-muted", children: "0" }) }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { title: timing ? `${timing.calls} ${t("analysis.timedCalls")}` : void 0, children: timing ? formatMs(timing.totalMs) : "\u2014" }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { children: timing ? formatMs(timing.avgMs) : "\u2014" })
		              ] }, row.name);
		            }) })
		          ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", children: t("analysis.noTools") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-analysisFootnote", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-analysisScrollHint", children: [
		              t("analysis.scrollTable"),
		              " "
		            ] }),
		            t("analysis.toolTimingNote")
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-modelAnalysis", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.models") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-cardHint", children: [
		              metrics.modelSwitchCount,
		              " ",
		              t("stat.modelSwitches")
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-modelList", children: [
		            metrics.modelSplit.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", children: t("empty.requests") }),
		            metrics.modelSplit.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-modelDetail", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-modelIdentity", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { background: modelColor(row.model) } }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: row.model })
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-modelProvider", children: row.provider }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("dl", { className: "dshd-modelFacts", children: [
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("models.requests") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { children: exactNumber(row.requests) })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("stat.requests.error") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { "data-error": row.errorCount > 0, children: row.errorCount })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("stat.inputTokens") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { title: exactNumber(row.inputTokens), children: compactNumber(row.inputTokens) })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("stat.outputTokens") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { title: exactNumber(row.outputTokens), children: compactNumber(row.outputTokens) })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("analysis.avgTime") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { children: row.avgDurationMs === null ? "\u2014" : formatMs(row.avgDurationMs) })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dt", { children: t("stat.avgTtft") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { children: row.avgTtftMs === null ? "\u2014" : formatMs(row.avgTtftMs) })
		                ] }),
		                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("dt", { children: [
		                    t("stat.cost"),
		                    " ",
		                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.cost") })
		                  ] }),
		                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("dd", { children: fmtCost(row.costUsd) })
		                ] })
		              ] })
		            ] }, `${row.provider}/${row.model}`))
		          ] }),
		          metrics.durationStats.sampleCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-analysisPercentiles", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("analysis.requestLatency") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		              "P50 ",
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: formatMs(metrics.durationStats.p50 ?? 0) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		              "P95 ",
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: formatMs(metrics.durationStats.p95 ?? 0) })
		            ] })
		          ] }),
		          metrics.modelSwitchCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		            ModelTimeline,
		            {
		              data: metrics.modelTimeline,
		              switchSeqs: metrics.modelSwitchSeqs,
		              emptyLabel: t("empty.requests"),
		              onPick: openView !== void 0 ? (seq) => jumpTo(seq) : void 0,
		              note: metrics.modelTimeline.length > 60 ? `${t("trend.scopeNote")} 60 ${t("pager.items")}` : void 0,
		              axisHint: t("trend.axisOldToNew"),
		              ariaLabel: t("aria.modelTimeline")
		            }
		          )
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.turns") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.turnDurations") })
		          ] }),
		          metrics.turnDurations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", children: t("unknown") }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-turnList", children: metrics.turnDurations.map((td) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-turnRow", title: td.closed ? void 0 : t("hint.turnOpen"), children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-turnName", children: [
		              t("turns.label"),
		              td.turn,
		              td.closed ? "" : " ~"
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-turnTrack", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-turnFill", style: { width: `${td.durationMs / maxTurnMs * 100}%` } }) }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-turnValue", children: formatMs(td.durationMs) })
		          ] }, td.turn)) }),
		          turnTimings.size > metrics.turnDurations.length && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-analysisFootnote", children: t("hint.turnTail") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.messages") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-cardHint", children: [
		              exactNumber(metrics.roles.total),
		              " ",
		              t("analysis.messages")
		            ] })
		          ] }),
		          metrics.roles.total === 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-muted", children: t("unknown") }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-compositionBar", "aria-hidden": "true", children: roleData.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: { flex: row.value, background: row.color } }, row.label)) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-compositionRows", children: roleData.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { style: { background: row.color } }),
		              row.label
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: exactNumber(row.value) }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		              Math.round(row.value / metrics.roles.total * 100),
		              "%"
		            ] })
		          ] }, row.label)) })
		        ] }),
		        metrics.contextInjection.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.contextInjection") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.contextInjection") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-injectionRows", children: metrics.contextInjection.map((row) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { title: row.role === "recall" ? t("contextRole.recall") : t("contextRole.inject"), children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: row.label }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-formBadge", "data-f": row.form, children: formLabel(row.form) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
		              row.count,
		              " ",
		              t("analysis.injections"),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("b", { children: [
		                compactNumber(row.chars),
		                " ",
		                t("unit.char")
		              ] })
		            ] })
		          ] }, `${row.label}/${row.form}/${row.role}`)) })
		        ] }),
		        metrics.effortStats.some((e) => e.reasoningTokens > 0 || e.effort !== "default") ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.effort") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-col", children: metrics.effortStats.map((e) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-errRow", title: t("hint.effort"), children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-errMsg", children: e.effort }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-neutralCount", children: [
		              exactNumber(e.requests),
		              " \xB7 ",
		              compactNumber(e.reasoningTokens),
		              " ",
		              t("tokens.reasoning")
		            ] })
		          ] }, e.effort)) })
		        ] }) : null,
		        errorRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-diagnostic", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.errors") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HorizontalBars, { data: errorRows, valueFormatter: (v) => exactNumber(v) }),
		          metrics.commandRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-col", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-subTitle", children: t("section.commands") }),
		            metrics.commandRows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-errRow", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-errMsg", children: c.name }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-errCount", children: [
		                "\xD7",
		                c.count
		              ] })
		            ] }, c.name))
		          ] }) : null,
		          metrics.retriedRequests > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-subTitle", style: { marginTop: 8 }, children: [
		            t("stat.retryWait"),
		            " ",
		            formatMs(metrics.retryWaitMs),
		            " \xB7 ",
		            t("stat.retried"),
		            " ",
		            exactNumber(metrics.retriedRequests)
		          ] }) : null,
		          metrics.failedStats.count > 0 && metrics.completedStats.count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-subTitle", style: { marginTop: 8 }, children: t("hint.failedProfile").replace("{a}", metrics.failedStats.avgDurationMs === null ? "\u2014" : formatMs(metrics.failedStats.avgDurationMs)).replace("{b}", metrics.completedStats.avgDurationMs === null ? "\u2014" : formatMs(metrics.completedStats.avgDurationMs)) }) : null
		        ] }) : null,
		        metrics.topErrors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-diagnostic", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.errorTop") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-col", children: metrics.topErrors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-errRow", title: e.message, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-errMsg", children: e.message }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-errCount", children: [
		              "\xD7",
		              e.count
		            ] })
		          ] }, e.message)) })
		        ] }) : null,
		        metrics.compactionEffect.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-diagnostic", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.compaction") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardHint", children: t("hint.compactionEffect") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-col", children: metrics.compactionEffect.map((e) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-compactRow", title: `${t("req.seq")} ${e.seq}`, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-compactSeq", children: [
		              t("turns.label"),
		              e.turn
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-compactArrow", children: [
		              e.beforeTokens === null ? t("unknown") : exactNumber(e.beforeTokens),
		              " \u2192 ",
		              e.afterTokens === null ? t("unknown") : exactNumber(e.afterTokens)
		            ] }),
		            e.recoveredTokens !== null ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-compactRecovered", children: [
		              "\u2212",
		              exactNumber(e.recoveredTokens),
		              " (",
		              e.recoveredPct,
		              "%)"
		            ] }) : null
		          ] }, e.seq)) })
		        ] }) : null,
		        metrics.loops.length > 0 || metrics.noProgress.length > 0 || metrics.toolStorm.some((b) => b.calls > 0) ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-diagnostic", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.health") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("hint.health") })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-col", children: [
		            metrics.loops.map((l) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-errRow", title: `${t("hint.loop")} ${l.seqs.join(", ")}`, children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-healthTag", "data-k": "loop", children: t("health.loop") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-errMsg", children: l.name }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-errCount", children: [
		                "\xD7",
		                l.count
		              ] })
		            ] }, `${l.name}${l.count}`)),
		            metrics.noProgress.map((p) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-errRow", title: `${t("req.seq")} ${p.seq}`, children: [
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-healthTag", "data-k": "noProgress", children: t("health.noProgress") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-errMsg", children: t("hint.noProgress") }),
		              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dshd-errCount", children: [
		                t("turns.label"),
		                p.turn,
		                " \xB7 ",
		                p.outputTokens,
		                " ",
		                t("unit.tokens"),
		                " \xB7 ",
		                p.toolCalls,
		                " ",
		                t("req.toolCalls")
		              ] })
		            ] }, p.seq))
		          ] }),
		          metrics.toolStorm.some((b) => b.calls > 0) ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { marginTop: 8 }, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dshd-subTitle", children: t("trend.toolStorm") }),
		            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
		              SeriesBars,
		              {
		                series: metrics.toolStorm.map((b) => ({
		                  label: new Date(b.bucketMs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		                  value: b.calls,
		                  color: CHART_COLORS.toolTime
		                })),
		                height: 54,
		                emptyLabel: t("empty.requests"),
		                showMaxTag: true,
		                ariaLabel: t("aria.trend")
		              }
		            )
		          ] }) : null
		        ] }) : null
		      ] })
		    ] }),
		    panel === "requests" && hasData && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dshd-card dshd-requestCard", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dshd-cardHead", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardTitle", children: t("section.requests") }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dshd-cardHint", children: windowNote }),
		        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Hint, { label: t("req.rowHint.expand") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TrendSection, { metrics, t, onJump: jumpTo, jumpTo, initialFilter: requestFilter })
		    ] }),
		    panel === "agents" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("section", { className: "dshd-agentPanel", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(BoardBody, { ...props }) })
		  ] });
		}

		// src/client/index.ts
		var inject = ["slots", "locale", "uiWorkspace"];
		injectDashboardStyles();
		function apply(ctx) {
		  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-dashboard: dictionaries");
		  const t = ctx.locale.bind(NS);
		  const workspace = ctx.uiWorkspace;
		  ctx.slots.inject("conversation.view", () => {
		    return ctx.slots.register(
		      {
		        name: "conversation.view",
		        id: "dashboard",
		        order: 20,
		        locale: NS,
		        inject: () => ({
		          openSubagent: (address) => {
		            workspace.openSession(address);
		          }
		        }),
		        label: () => t("view.dashboard")
		      },
		      DashboardView
		    );
		  });
		}

		return module.exports;
	}
});
