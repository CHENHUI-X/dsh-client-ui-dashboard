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
		  "hint.modelCost": "\u6309\u5404\u8BF7\u6C42\u81EA\u8EAB\u6A21\u578B\u5B9A\u4EF7\u4F30\u7B97;\u7F13\u5B58\u8BFB\u53D6\u6309\u672A\u547D\u4E2D\u4EF7\u8BA1",
		  "hint.turnTail": "\u4EC5\u663E\u793A\u6700\u8FD1 12 \u8F6E(\u7A97\u53E3\u5185\u8FD8\u6709\u66F4\u591A\u8F6E\u6B21\u672A\u5217\u51FA)",
		  "trend.rateFailed": "\u9519\u8BEF\u6570",
		  "trend.contextOcc": "\u4E0A\u4E0B\u6587\u5360\u7528\u7387",
		  "hint.contextOccTrend": "\u6BCF\u8BF7\u6C42\u8F93\u5165\u5360\u4E0A\u4E0B\u6587\u7A97\u53E3\u7684\u6BD4\u4F8B(\u538B\u7F29\u56DE\u843D\u53EF\u89C1)",
		  "health.loop": "\u5FAA\u73AF",
		  "health.noProgress": "\u65E0\u8FDB\u5C55",
		  "aria.modelTimeline": "\u6A21\u578B\u5207\u6362\u65F6\u95F4\u7EBF,\u6BCF\u8BF7\u6C42\u4E00\u4E2A\u70B9,\u70B9\u51FB\u8DF3\u8F6C\u5230\u5BF9\u5E94\u8BF7\u6C42",
		  "hint.turnOpen": "\u8BE5\u8F6E\u6B21\u7ED3\u675F\u4E8B\u4EF6\u4E0D\u5728\u5F53\u524D\u7A97\u53E3\u5185(\u6216\u4ECD\u5728\u8FDB\u884C),\u8017\u65F6\u4E3A\u7A97\u53E3\u53EF\u89C1\u8FD1\u4F3C\u503C",
		  "section.trend": "\u8BF7\u6C42\u8D8B\u52BF",
		  "section.requests": "\u8BF7\u6C42\u5217\u8868(\u70B9\u51FB\u884C\u5C55\u5F00\u8BE6\u60C5)",
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
		  "hint.cost": "\u6309 DeepSeek \u516C\u5F00\u5B9A\u4EF7(2025-09 \u751F\u6548,\u6BCF 1M tokens:chat \u672A\u547D\u4E2D $0.27 / \u547D\u4E2D $0.07 / \u8F93\u51FA $1.10;reasoner \u7FFB\u500D)\u7C97\u4F30\u7684\u7F8E\u5143\u6210\u672C;\u7F13\u5B58\u5199\u5165\u6309\u672A\u547D\u4E2D\u4EF7;\u7F13\u5B58\u8282\u7701 = \u547D\u4E2D tokens \xD7 (\u672A\u547D\u4E2D\u4EF7 \u2212 \u547D\u4E2D\u4EF7)\u3002",
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
		  "tools.note": "\u6309\u8C03\u7528\u6B21\u6570\u6392\u5E8F,\u26A0 \u8868\u793A\u8BE5\u5DE5\u5177\u51FA\u73B0\u8FC7\u9519\u8BEF",
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
		  "unknown": "\u2014",
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
		  "hint.compactionRecovered": "\u538B\u7F29\u66FF\u6A21\u578B\u7701\u6389\u7684 tokens(provider \u4E0A\u62A5\u7684 shadowed \u503C,\u7F3A\u5931\u65F6\u7559\u7A7A)\u3002"
		};
		var en = {
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
		  "hint.modelCost": "Each request priced by its own model; cache reads billed at the miss rate",
		  "hint.turnTail": "Showing the latest 12 turns (more turns exist in the window)",
		  "trend.rateFailed": "Failed",
		  "trend.contextOcc": "Context occupancy",
		  "hint.contextOccTrend": "Per-request input \xF7 context window (compaction drops visible)",
		  "health.loop": "loop",
		  "health.noProgress": "no-progress",
		  "aria.modelTimeline": "Model timeline, one dot per request; click to jump to that request",
		  "hint.turnOpen": "This turn's end event is outside the loaded window (or it is still running); duration is an approximation from the visible window",
		  "section.trend": "Request trend",
		  "section.requests": "Request list (click a row to expand)",
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
		  "hint.cost": "Rough USD cost at DeepSeek public pricing (effective 2025-09; per 1M tokens: chat miss $0.27 / hit $0.07 / output $1.10; reasoner doubles it). Cache writes billed at the miss rate; savings = cache-read tokens \xD7 (miss \u2212 hit).",
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
		  "tools.note": "Sorted by call count; \u26A0 marks a tool that errored",
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
		  "unknown": "\u2014",
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
		  "hint.compactionRecovered": "Tokens the compaction spared the model (provider-reported shadowed values; blank when missing)."
		};

		// src/client/DashboardView.tsx
		var import_react2 = require("react");
		var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

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
		  chat: { miss: 0.27, hit: 0.07, output: 1.1 },
		  reasoner: { miss: 0.55, hit: 0.14, output: 2.19 }
		};
		function isReasonerModel(model) {
		  return /reasoner/i.test(model ?? "");
		}
		function estimateRequestCostUsd(model, usage) {
		  const p = isReasonerModel(model) ? DEEPSEEK_PRICES.reasoner : DEEPSEEK_PRICES.chat;
		  return ((usage.uncachedInputTokens + usage.cacheWriteTokens) * p.miss + usage.cacheReadTokens * p.hit + usage.outputTokens * p.output) / 1e6;
		}
		function estimateCacheSavingsUsd(model, cacheReadTokens) {
		  const p = isReasonerModel(model) ? DEEPSEEK_PRICES.reasoner : DEEPSEEK_PRICES.chat;
		  return cacheReadTokens * (p.miss - p.hit) / 1e6;
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
		        add({ callId: sub.callId, name: sub.name, argsRaw: sub.argsRaw, durationMs: null, isError: false });
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
		      provider: request.provenance?.provider ?? request.requestConfig?.provider ?? null,
		      model: request.provenance?.model ?? request.requestConfig?.model ?? null,
		      error: request.error ?? null,
		      usageReported: toInt(usage.inputTokens) > 0 || toInt(usage.cacheReadTokens) > 0 || toInt(usage.cacheWriteTokens) > 0 || toInt(usage.outputTokens) > 0 || toInt(usage.reasoningTokens) > 0,
		      costUsd: estimateRequestCostUsd(request.provenance?.model ?? request.requestConfig?.model ?? null, {
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
		      thinking: (request.requestConfig?.thinking ?? false) === true,
		      reasoningEffort: request.requestConfig?.reasoningEffort ?? null,
		      temperature: request.requestConfig?.temperature ?? null,
		      maxTokens: request.requestConfig?.maxTokens ?? null,
		      retry: request.retry ?? 0,
		      maxRetries: request.maxRetries ?? 0,
		      retryDelayMs: request.retryDelayMs ?? null,
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
		    const key = s.model ?? s.provider ?? "unknown";
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
		    row.costUsd += s.costUsd;
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
		  const ordered = [...series].sort((a, b) => a.seq - b.seq);
		  const out = [];
		  for (let i = 0; i < ordered.length; i += 1) {
		    const s = ordered[i];
		    if (s.purpose !== "compaction") continue;
		    const after = ordered.slice(i + 1).find((x) => x.purpose === "assistant");
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
		    const label = node.provenance.label ?? "?";
		    const form = node.form ?? "opaque";
		    const key = `${label}\0${form}`;
		    const row = map.get(key) ?? { label, role: node.provenance.role, form, count: 0, chars: 0 };
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
		  for (const d of details) {
		    costTotal += d.costUsd;
		    costSavings += estimateCacheSavingsUsd(d.model, d.cacheReadTokens);
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
		    costEstimateUsd: { total: costTotal, cacheSavings: costSavings },
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

		// src/client/dashboard.css.ts
		var PLUGIN_ID = "dsh-client-ui-dashboard";
		function injectDashboardStyles() {
		  if (typeof document === "undefined") return;
		  const tagId = `${PLUGIN_ID}/dashboard.css`;
		  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) !== null) return;
		  const tag = document.createElement("style");
		  tag.dataset.plugin = PLUGIN_ID;
		  tag.dataset.pluginCss = tagId;
		  tag.textContent = css;
		  document.head.appendChild(tag);
		}
		var CHART_COLORS = {
		  user: "var(--dsw-alias-state-business-primary)",
		  assistant: "var(--dsw-alias-state-success-primary)",
		  system: "var(--dsw-alias-state-warn-primary)",
		  tool: "var(--dsw-alias-state-error-primary)",
		  other: "var(--dsw-alias-label-tertiary)",
		  input: "var(--dsw-alias-state-business-primary)",
		  cacheRead: "var(--dsw-alias-state-success-primary)",
		  cacheWrite: "var(--dsw-alias-state-warn-primary)",
		  output: "var(--dsw-alias-state-error-primary)",
		  reasoning: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
		  llm: "var(--dsw-alias-state-business-primary)",
		  toolTime: "var(--dsw-alias-state-warn-primary)",
		  messages: "var(--dsw-alias-state-business-primary)",
		  tools: "var(--dsw-alias-state-error-primary)",
		  systemPrompt: "var(--dsw-alias-state-warn-primary)",
		  steering: "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)"
		};
		var css = String.raw`
		/* 看板自持内部滚动容器：声明 data-conversation-composer-overlay 后，共享
		   滚动体让位、输入框改绝对定位，本根元素成为会话列内唯一的滚动区；底部
		   预留 --dsh-composer-height 让最后一行滚动时不被输入框遮挡。 */
		.dshd-root{display:flex;flex-direction:column;gap:16px;padding:16px 18px 28px;max-width:1120px;margin:0 auto;width:100%;box-sizing:border-box;color:var(--dsw-alias-label-primary);height:100%;overflow-y:auto;padding-bottom:calc(28px + var(--dsh-composer-height,0px))}
		.dshd-root *{box-sizing:border-box}
		.dshd-muted{color:var(--dsw-alias-label-tertiary)}
		.dshd-empty{color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center;padding:18px 0}

		/* Header */
		.dshd-header{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
		.dshd-title{font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}
		.dshd-live{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:500;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 8px;white-space:nowrap}
		.dshd-live[data-off]{color:var(--dsw-alias-label-tertiary);border-color:var(--dsw-alias-border-l2)}
		.dshd-liveDot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:dshdPulse 1.4s ease-in-out infinite}
		.dshd-live[data-off] .dshd-liveDot{animation:none}
		@keyframes dshdPulse{0%,100%{opacity:1}50%{opacity:.35}}
		.dshd-chip{font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:2px 9px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}
		.dshd-spacer{flex:1}

		/* Section card */
		.dshd-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:12px;min-width:0;transition:border-color .15s ease}
		.dshd-card:hover{border-color:var(--dsw-alias-border-l1)}
		.dshd-cardHead{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
		.dshd-cardTitle{font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px}
		.dshd-cardTitle::before{content:"";width:3px;height:13px;border-radius:2px;background:var(--dsw-alias-label-tertiary);flex:none}
		.dshd-cardHint{font-size:11px;color:var(--dsw-alias-label-tertiary);flex:1 1 auto;min-width:0;white-space:normal;overflow-wrap:anywhere;line-height:1.5}
		.dshd-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
		.dshd-col{display:flex;flex-direction:column;gap:12px;min-width:0}
		.dshd-subTitle{font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);margin-top:2px}

		/* Stat cards */
		.dshd-stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
		.dshd-stat{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:11px 13px;display:flex;flex-direction:column;gap:4px;min-width:0;position:relative;transition:border-color .15s,transform .15s ease}
		.dshd-stat:hover{border-color:var(--dsw-alias-border-l1);transform:translateY(-1px)}
		.dshd-statLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		.dshd-statValue{font-size:clamp(15px,1.2rem + .5vw,20px);font-weight:650;line-height:1.2;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);min-width:0;overflow-wrap:anywhere}
		.dshd-statValue[data-accent]{color:var(--dsw-alias-state-business-primary)}
		.dshd-statValue[data-warn]{color:var(--dsw-alias-state-warn-primary)}
		.dshd-statValue[data-good]{color:var(--dsw-alias-state-success-primary)}
		.dshd-statValue[data-bad]{color:var(--dsw-alias-state-error-primary)}
		.dshd-statValue[data-reasoning]{color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 62%,var(--dsw-alias-state-error-primary) 38%)}
		.dshd-statSub{font-size:10.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}

		/* Tooltip hint anchor */
		.dshd-hint{display:inline-flex;width:14px;height:14px;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1;cursor:help;flex:none;background:var(--dsw-alias-bg-base)}

		/* Legend */
		.dshd-legend{display:flex;flex-direction:column;gap:4px;min-width:140px}
		.dshd-legendRow{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;max-width:100%}
		.dshd-legendSwatch{width:9px;height:9px;border-radius:2.5px;flex:none}
		.dshd-legendName{min-width:0;overflow:hidden;text-overflow:ellipsis}
		.dshd-legendValue{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:550}
		.dshd-legendPercent{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;min-width:34px;text-align:right}

		/* Stacked bars */
		.dshd-stack{display:flex;width:100%;height:20px;border-radius:6px;overflow:hidden;background:var(--dsw-alias-bg-layer-2);gap:1px;padding:1px}
		.dshd-stackSegment{height:100%;min-width:2px;transition:width .25s ease}
		.dshd-stackEmpty{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:10.5px}
		.dshd-stackLegend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:2px;font-variant-numeric:tabular-nums}
		.dshd-stackTotal{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:2px}
		.dshd-chartBody{display:flex;flex-direction:column;gap:8px;min-width:0}

		/* Donut + legend side by side */
		.dshd-donutRow{display:flex;align-items:center;gap:18px;flex-wrap:wrap}

		/* Horizontal bars */
		.dshd-hbars{display:flex;flex-direction:column;gap:7px}
		.dshd-hbar{display:flex;align-items:center;gap:8px;font-size:11.5px;min-width:0;flex-wrap:wrap}
		.dshd-hbarSubLine{flex:1 1 100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
		.dshd-hbarName{width:clamp(64px,30%,120px);flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
		.dshd-hbarTrack{flex:1;height:12px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
		.dshd-hbarFill{display:block;height:100%;border-radius:6px;transition:width .25s ease}
		.dshd-hbarRight{flex:none;display:flex;align-items:baseline;justify-content:flex-end;gap:6px;min-width:120px}
		.dshd-errorMark{color:var(--dsw-alias-state-error-primary);font-weight:700;margin-left:1px}
		.dshd-hbarValue{flex:none;min-width:44px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);white-space:nowrap}
		.dshd-hbarSub{flex:none;min-width:0;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}

		/* Request table */
		.dshd-tableWrap{overflow-x:auto;max-width:100%;border-radius:10px}
		.dshd-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;min-width:640px}
		.dshd-table th{text-align:left;font-size:10.5px;font-weight:600;color:var(--dsw-alias-label-tertiary);text-transform:uppercase;letter-spacing:.04em;padding:2px 8px 6px;border-bottom:1px solid var(--dsw-alias-border-l2);white-space:nowrap;background:var(--dsw-alias-bg-layer-1)}
		.dshd-table td{padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:middle;white-space:nowrap;font-variant-numeric:tabular-nums}
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
		.dshd-model{max-width:150px;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);display:inline-block;vertical-align:bottom;min-width:0}
		.dshd-statusPill{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:600;border-radius:999px;padding:1px 8px;border:1px solid transparent;white-space:nowrap}
		.dshd-statusPill[data-s=complete]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 30%,transparent)}
		.dshd-statusPill[data-s=running]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 30%,transparent)}
		.dshd-statusPill[data-s=error]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 30%,transparent)}
		.dshd-statusPill[data-s=compaction]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 30%,transparent)}

		/* Expanded request detail */
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

		/* Series charts */
		.dshd-seriesRow{display:flex;gap:14px;flex-wrap:wrap}
		.dshd-seriesCol{flex:1 1 240px;min-width:0;display:flex;flex-direction:column;gap:6px}
		.dshd-seriesLabel{font-size:11px;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:6px}
		.dshd-seriesTotal{font-size:11px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-weight:550}
		.dshd-scopeTag{font-family:var(--ds-font-family-base,ui-sans-serif,system-ui,sans-serif);font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-label-secondary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-label-secondary) 25%,transparent);border-radius:4px;padding:0 4px;vertical-align:1px;white-space:nowrap}
		.dshd-axisHint{font-size:10px;color:var(--dsw-alias-label-secondary);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

		/* Trend filters */
		.dshd-filters{display:flex;gap:6px;flex-wrap:wrap}
		.dshd-filterBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;white-space:nowrap}
		.dshd-filterBtn:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l1)}
		.dshd-filterBtn[data-current]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 45%,transparent);color:var(--dsw-alias-state-business-primary)}
		.dshd-newBtn{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;cursor:pointer;transition:background .15s;white-space:nowrap}
		.dshd-newBtn:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}

		/* Detail view tabs + search */
		.dshd-viewTabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid var(--dsw-alias-border-l2);padding-bottom:6px}
		.dshd-viewTab{height:24px;padding:0 12px;font-size:11px;font-weight:600;color:var(--dsw-alias-label-tertiary);background:transparent;border:1px solid transparent;border-radius:8px;cursor:pointer;transition:background .15s,color .15s}
		.dshd-viewTab:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
		.dshd-viewTab[data-current]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent)}
		.dshd-search{height:24px;min-width:150px;flex:0 1 210px;padding:0 10px;font-size:11px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;outline:none;transition:border-color .15s}
		.dshd-search:focus{border-color:var(--dsw-alias-state-business-primary)}
		.dshd-search::placeholder{color:var(--dsw-alias-label-tertiary)}

		/* Grouped views */
		.dshd-groups{display:flex;flex-direction:column;gap:8px}
		.dshd-group{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-base)}
		.dshd-groupHead{display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;font-size:11.5px;background:color-mix(in srgb,var(--dsw-alias-border-l2) 22%,transparent);border:none;cursor:pointer;color:var(--dsw-alias-label-primary);text-align:left}
		.dshd-groupHead:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 7%,var(--dsw-alias-bg-base))}
		.dshd-groupName{flex:1;min-width:0;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-groupStats{margin-left:auto;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		.dshd-groupBody{padding:2px 0}
		.dshd-groupBody .dshd-table{border:none;margin:0}

		/* Model timeline */
		.dshd-modelTimeline{padding:2px 0 4px}
		.dshd-modelTimeline svg circle:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
		.dshd-modelLegend{display:flex;flex-wrap:wrap;gap:8px;padding:4px 2px 0;font-size:10px;color:var(--dsw-alias-label-secondary)}
		.dshd-modelLegendItem{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
		.dshd-modelLegendItem i{width:8px;height:8px;border-radius:50%;display:inline-block}
		.dshd-modelNote{font-size:10px;color:var(--dsw-alias-label-secondary);padding:2px 2px 0}

		/* Context-injection form badges */
		.dshd-formBadge{display:inline-block;margin-left:6px;padding:0 6px;font-size:9.5px;font-weight:600;border-radius:999px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);vertical-align:1px}
		.dshd-formBadge[data-f="instructions"]{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent)}
		.dshd-formBadge[data-f="recall"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
		.dshd-formBadge[data-f="snapshot"]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 8%,transparent)}
		.dshd-formBadge[data-f="opaque"]{color:var(--dsw-alias-label-tertiary)}

		/* Live streaming line */
		.dshd-streamRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:6px 12px}
		.dshd-streamDot{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-business-primary);animation:dshdPulse 1.4s ease-in-out infinite;flex:none}
		.dshd-streamText{font-variant-numeric:tabular-nums}
		.dshd-streamTool{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}

		/* Sticky summary strip */
		.dshd-summary{display:flex;gap:8px;flex-wrap:wrap;position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--dsw-alias-bg-base) 88%,transparent);backdrop-filter:blur(6px);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:6px 10px}
		.dshd-summaryItem{display:inline-flex;align-items:baseline;gap:5px;font-size:11px}
		.dshd-summaryLabel{color:var(--dsw-alias-label-tertiary)}
		.dshd-summaryValue{font-weight:650;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

		/* StatCard sparkline */
		.dshd-statSpark{display:flex;justify-content:flex-start;margin-top:2px;opacity:.85}
		.dshd-spark{display:block;max-width:100%}

		/* TTFT percentiles inside axis hint */
		.dshd-ttftStats{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:normal}
		.dshd-streamWarn{display:inline-flex;align-items:center;gap:4px;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:10.5px;font-weight:700;color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);border-radius:999px;padding:1px 8px;font-variant-numeric:tabular-nums}

		/* Turn-input delta badge */
		.dshd-delta{font-size:10px;font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);border-radius:999px;padding:0 6px}
		.dshd-deltaUp{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}
		.dshd-deltaDown{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 10%,transparent)}

		/* Duration distribution */
		.dshd-percRow{display:flex;gap:14px;flex-wrap:wrap}
		.dshd-perc{font-size:11px;color:var(--dsw-alias-label-tertiary)}
		.dshd-perc b{color:var(--dsw-alias-label-primary);font-weight:650;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);margin-left:2px}
		.dshd-hist{display:flex;align-items:flex-end;gap:3px;height:52px;border-bottom:1px solid var(--dsw-alias-border-l1)}
		.dshd-histCol{flex:1;height:100%;display:flex;align-items:flex-end;min-width:0}
		.dshd-histBar{width:100%;border-radius:2px 2px 0 0;transition:height .25s ease}

		/* Error classification */
		.dshd-errRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0}
		.dshd-errMsg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary)}
		.dshd-errCount{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-state-error-primary);font-weight:650;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

		/* Compaction effect rows */
		.dshd-compactRow{display:flex;align-items:center;gap:10px;font-size:11px;min-width:0;flex-wrap:wrap}
		.dshd-compactSeq{flex:none;font-weight:600;color:var(--dsw-alias-state-business-primary)}
		.dshd-compactArrow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);color:var(--dsw-alias-label-secondary)}
		.dshd-compactRecovered{flex:none;font-variant-numeric:tabular-nums;font-weight:650;color:var(--dsw-alias-state-success-primary);font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace)}

		/* Turn durations */
		.dshd-turnList{display:flex;flex-direction:column;gap:6px}
		.dshd-turnRow{display:flex;align-items:center;gap:8px;font-size:11.5px}
		.dshd-turnName{min-width:56px;flex:none;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
		.dshd-turnTrack{flex:1;height:10px;border-radius:5px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
		.dshd-turnFill{display:block;height:100%;border-radius:5px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,var(--dsw-alias-state-warn-primary) 45%);opacity:.85}
		.dshd-turnValue{min-width:56px;text-align:right;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary);font-weight:600;font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px}

		/* Pagination */
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

		/* Focus visibility (keyboard) */
		.dshd-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-radius:6px}

		/* Reduced motion */
		@media (prefers-reduced-motion: reduce){
		  .dshd-root *,.dshd-root *::before,.dshd-root *::after{transition:none!important;animation:none!important}
		  .dshd-liveDot{animation:none}
		}

		/* Text containment: never let content push the layout */
		.dshd-statSub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-chip{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.dshd-seriesLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

		/* Interactive vertical bars */
		.dshd-vbars{display:flex;align-items:flex-end;gap:2px;position:relative;padding-top:8px;box-sizing:border-box}
		.dshd-vcol{flex:1;min-width:0;height:100%;position:relative;display:flex;align-items:flex-end;cursor:crosshair}
		.dshd-vbarTrack{width:100%;height:100%;display:flex;align-items:flex-end;position:relative}
		.dshd-vbar{width:100%;border-radius:3px 3px 1px 1px;transition:height .25s ease,transform .15s ease,filter .15s ease;transform-origin:bottom center;min-height:0}
		.dshd-vbar[data-hover]{transform:scaleY(1.12);filter:brightness(1.12)}
		.dshd-vcol[data-status=running] .dshd-vbar{animation:dshdPulse 1.4s ease-in-out infinite}
		.dshd-vcol[data-status=error] .dshd-vbar{opacity:.85;box-shadow:inset 0 0 0 1px var(--dsw-alias-state-error-primary)}
		.dshd-vtip{position:absolute;left:50%;transform:translateX(-50%);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:4px 9px;font-size:11px;line-height:1.4;color:var(--dsw-alias-label-primary);white-space:normal;overflow-wrap:anywhere;text-align:center;width:max-content;max-width:min(240px,80vw);z-index:20;pointer-events:none;box-shadow:var(--dsw-shadow-lv2,0 4px 12px rgb(0 0 0 / .22));font-variant-numeric:tabular-nums;box-sizing:border-box}
		.dshd-areaWrap{position:relative;width:100%;cursor:crosshair}
		.dshd-areaGuide{position:absolute;top:0;bottom:0;width:0;border-left:1px dashed;opacity:.55;pointer-events:none;z-index:2}
		.dshd-areaDot{position:absolute;width:9px;height:9px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid var(--dsw-alias-bg-layer-1);box-shadow:0 1px 4px rgb(0 0 0 / .3);pointer-events:none;z-index:3}
		.dshd-areaWrap .dshd-vtip{transform:translate(var(--tip-dx,-50%),calc(-100% - 6px))}

		/* Gauge row */
		.dshd-gaugeRow{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
		.dshd-gaugeBox{display:flex;flex-direction:column;align-items:center;gap:2px;flex:none;max-width:100%;min-width:0}
		.dshd-gaugeLabel{font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

		/* Jump affordance */
		.dshd-jumpText{font-size:10.5px;font-weight:600;color:var(--dsw-alias-state-business-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 8%,transparent);border-radius:999px;padding:1px 9px;cursor:pointer;transition:background .15s;white-space:nowrap}
		.dshd-jumpText:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 16%,transparent)}
		.dshd-jump{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;cursor:pointer;transition:background .12s,border-color .12s,color .12s}
		.dshd-jump:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-inverted,var(--dsw-alias-border-l1));color:var(--dsw-alias-label-primary)}
		.dshd-clearFilter{font-size:11px;font-weight:600;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 10%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent);border-radius:999px;padding:2px 10px;cursor:pointer;transition:background .15s}
		.dshd-clearFilter:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent)}

		/* Top-right max-value caption on trend mini-charts */
		.dshd-vbars:hover .dshd-maxTag,.dshd-areaWrap:hover .dshd-maxTag{opacity:0}
		.dshd-maxTag{position:absolute;top:2px;right:2px;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-bg-base) 84%,transparent);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;z-index:4;pointer-events:none;font-variant-numeric:tabular-nums}

		/* Count badges on filter pills / view tabs */
		.dshd-badge{font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:0 5px;margin-left:4px;font-variant-numeric:tabular-nums}

		/* Agent-health text badges (replace colored emoji, keep the theme tone) */
		.dshd-healthTag{display:inline-block;font-size:9.5px;font-weight:700;border-radius:4px;padding:1px 5px;margin-right:6px;flex:none;line-height:1.5}
		.dshd-healthTag[data-k="loop"]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 35%,transparent)}
		.dshd-healthTag[data-k="noProgress"]{color:var(--dsw-alias-state-warn-primary);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 35%,transparent)}
		`;

		// src/client/charts.tsx
		var import_react = require("react");
		var import_jsx_runtime = require("react/jsx-runtime");
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
		function DonutChart(props) {
		  const { data, size = 132, thickness = 15, centerLabel = "", centerValue, valueFormatter, ariaLabel } = props;
		  const [hover, setHover] = (0, import_react.useState)(null);
		  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
		  const cx = size / 2;
		  const cy = size / 2;
		  const r = (size - thickness) / 2 - 4;
		  const C = 2 * Math.PI * r;
		  const gap = thickness;
		  const minLen = thickness * 1.4;
		  const raw = data.map((d) => ({ color: d.color, label: d.label, value: Math.max(0, d.value) })).filter((d) => d.value > 0);
		  const n = raw.length;
		  let lens;
		  if (n === 1) {
		    lens = [C];
		  } else {
		    lens = raw.map((d) => Math.max(d.value / Math.max(total, 1) * C, minLen));
		    const available = Math.max(0, C - n * gap);
		    const sumLen = lens.reduce((s, l) => s + l, 0);
		    if (sumLen > available) {
		      const scale = available / sumLen;
		      lens = lens.map((l) => l * scale);
		    }
		  }
		  const segments = [];
		  let acc = 0;
		  raw.forEach((d, i) => {
		    segments.push({ color: d.color, label: d.label, len: lens[i], offset: acc, value: d.value });
		    acc += lens[i] + gap;
		  });
		  const hovered = hover !== null ? segments[hover] : void 0;
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": ariaLabel ?? "donut chart", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `rotate(-90 ${cx} ${cy})`, children: segments.map((seg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      "circle",
		      {
		        cx,
		        cy,
		        r,
		        fill: "none",
		        stroke: seg.color,
		        strokeWidth: hover === i ? thickness + 4 : thickness,
		        strokeDasharray: `${seg.len.toFixed(2)} ${(C - seg.len).toFixed(2)}`,
		        strokeDashoffset: (-seg.offset).toFixed(2),
		        strokeLinecap: "round",
		        opacity: hover === null || hover === i ? 1 : 0.45,
		        style: { transition: "stroke-width .15s ease, opacity .15s ease", cursor: "pointer" },
		        onMouseEnter: () => setHover(i),
		        onMouseLeave: () => setHover(null),
		        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${seg.label}: ${fmt(seg.value)}` })
		      },
		      i
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx, cy, r: r - thickness / 2 - 3, fill: "var(--dsw-alias-bg-layer-1)" }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      "text",
		      {
		        x: cx,
		        y: cy - 1,
		        textAnchor: "middle",
		        dominantBaseline: "central",
		        fontSize: hovered === void 0 ? 16 : 13,
		        fontWeight: 650,
		        fill: "var(--dsw-alias-label-primary)",
		        style: { transition: "font-size .15s ease" },
		        children: hovered === void 0 ? centerValue ?? compactNumber(total) : fmt(hovered.value)
		      }
		    ),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x: cx, y: cy + 14, textAnchor: "middle", dominantBaseline: "central", fontSize: 10, fill: "var(--dsw-alias-label-tertiary)", children: hovered === void 0 ? centerLabel : hovered.label })
		  ] });
		}
		function Legend(props) {
		  const { data, valueFormatter, percent = false } = props;
		  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-legend", children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-legendRow", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendSwatch", style: { background: d.color } }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendName", children: d.label }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendValue", children: fmt(d.value) }),
		    percent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-legendPercent", children: [
		      total === 0 ? 0 : Math.round(Math.max(0, d.value) / total * 100),
		      "%"
		    ] }) : null
		  ] }, d.label)) });
		}
		function StackedBar(props) {
		  const { data, valueFormatter, height, totalLabel, emptyLabel } = props;
		  const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  const segments = data.filter((d) => d.value > 0);
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-chartBody", "data-stacked": true, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-stack", style: height === void 0 ? void 0 : { height }, children: segments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-stackEmpty", children: emptyLabel ?? "\u2014" }) : segments.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      "div",
		      {
		        className: "dshd-stackSegment",
		        style: { width: `${Math.max(0, d.value) / Math.max(total, 1) * 100}%`, background: d.color },
		        title: `${d.label}: ${fmt(d.value)}`
		      },
		      i
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-stackLegend", children: [
		      data.filter((d) => d.value > 0).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-legendRow", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendSwatch", style: { background: d.color } }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendName", children: d.label }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendValue", children: fmt(d.value) })
		      ] }, d.label)),
		      totalLabel !== void 0 && segments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-legendRow dshd-stackTotal", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendName", children: totalLabel }),
		        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-legendValue", children: fmt(total) })
		      ] }) : null
		    ] })
		  ] });
		}
		function SeriesBars(props) {
		  const { series, height = 110, valueFormatter, emptyLabel, showMaxTag = false, ariaLabel } = props;
		  const [hover, setHover] = (0, import_react.useState)(null);
		  const max = Math.max(1, ...series.map((s) => Math.max(0, s.value)));
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  if (series.length === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel ?? "\u2014" });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-vbars", style: { height, position: "relative" }, role: "img", "aria-label": ariaLabel ?? "bar chart", children: [
		    showMaxTag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-maxTag", children: fmt(max) }) : null,
		    series.map((s, i) => {
		      const v = Math.max(0, s.value);
		      const pct = v / max * 100;
		      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
		              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-vtip", style, children: [
		                s.label,
		                ": ",
		                fmt(v)
		              ] });
		            })() : null,
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-vbarTrack", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
		    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-empty", style: { padding: "12px" }, children: "\u2014" });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-hbars", children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-hbar", title: d.title ?? `${d.label}: ${fmt(d.value)}`, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-hbarName", children: d.label }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-hbarTrack", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		      "span",
		      {
		        className: "dshd-hbarFill",
		        style: { width: `${Math.max(0, d.value) / max * 100}%`, background: d.color }
		      }
		    ) }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-hbarRight", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-hbarValue", children: [
		        fmt(d.value),
		        d.errorMark === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-errorMark", children: " \u26A0" }) : null
		      ] }),
		      d.sub !== void 0 && !subBelow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-hbarSub", title: d.sub, children: d.sub }) : null
		    ] }),
		    d.sub !== void 0 && subBelow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshd-hbarSubLine", title: d.sub, children: d.sub }) : null
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
		  const [hover, setHover] = (0, import_react.useState)(null);
		  const ref = (0, import_react.useRef)(null);
		  const n = series.length;
		  const values = series.map((s) => Math.max(0, s.value));
		  const max = Math.max(1, ...values);
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
		  const gid = (0, import_react.useId)();
		  const fmt = valueFormatter ?? ((v) => compactNumber(v));
		  if (n === 0) {
		    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel ?? "\u2014" });
		  }
		  const onMove = (e) => {
		    const rect = ref.current?.getBoundingClientRect();
		    if (rect === void 0 || rect.width === 0) return;
		    const frac = (e.clientX - rect.left) / rect.width;
		    const i = Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1))));
		    setHover(i);
		  };
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
		    "div",
		    {
		      ref,
		      className: "dshd-areaWrap",
		      style: { height, position: "relative" },
		      onMouseMove: onMove,
		      onMouseLeave: () => setHover(null),
		      children: [
		        showMaxTag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-maxTag", children: fmt(max) }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": ariaLabel ?? "area chart", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: gid, x1: "0", y1: "0", x2: "0", y2: "1", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: color, stopOpacity: "0.32" }),
		            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: color, stopOpacity: "0.02" })
		          ] }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: areaPath, fill: `url(#${gid})`, vectorEffect: "non-scaling-stroke" }),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: linePath, fill: "none", stroke: color, strokeWidth: 1.6, vectorEffect: "non-scaling-stroke" })
		        ] }),
		        hover !== null && pts[hover] !== void 0 && series[hover] !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		            "div",
		            {
		              className: "dshd-areaGuide",
		              style: { left: `${pts[hover].x / width * 100}%`, borderColor: color }
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		            "div",
		            {
		              className: "dshd-areaDot",
		              style: { left: `${pts[hover].x / width * 100}%`, top: `${pts[hover].y / height * 100}%`, background: color }
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: `0 0 ${size} ${height}`, width: size, height, role: "img", "aria-label": ariaLabel ?? "gauge", style: { overflow: "hidden" }, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: track, fill: "none", stroke: "var(--dsw-alias-border-l1)", strokeWidth: 11, strokeLinecap: "round" }),
		    frac > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: valueArc, fill: "none", stroke: color, strokeWidth: 11, strokeLinecap: "round", style: { transition: "stroke .3s ease" } }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", { x: cx, y: valueY, textAnchor: "middle", dominantBaseline: "central", fontSize: 21, fontWeight: 700, fill: "var(--dsw-alias-label-primary)", children: [
		      Math.round(frac * 100),
		      unit
		    ] })
		  ] });
		}
		function Sparkline({
		  values,
		  color,
		  width = 96,
		  height = 22
		}) {
		  if (values.length < 2) return null;
		  const max = Math.max(1, ...values);
		  const step = width / (values.length - 1);
		  const pts = values.map(
		    (v, i) => `${(i * step).toFixed(1)},${(height - Math.max(0, v) / max * (height - 2) - 1).toFixed(1)}`
		  );
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width, height, viewBox: `0 0 ${width} ${height}`, className: "dshd-spark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
		    "polyline",
		    {
		      points: pts.join(" "),
		      fill: "none",
		      stroke: color,
		      strokeWidth: 1.5,
		      strokeLinejoin: "round",
		      strokeLinecap: "round",
		      vectorEffect: "non-scaling-stroke"
		    }
		  ) });
		}
		var MODEL_COLORS = [
		  "var(--dsw-alias-state-business-primary)",
		  "var(--dsw-alias-state-success-primary)",
		  "var(--dsw-alias-state-warn-primary)",
		  "var(--dsw-alias-state-error-primary)",
		  "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
		  "color-mix(in srgb, var(--dsw-alias-state-success-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
		  "color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-state-business-primary) 45%)",
		  "var(--dsw-alias-label-tertiary)"
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
		    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-empty", style: { height, display: "flex", alignItems: "center", justifyContent: "center" }, children: emptyLabel });
		  }
		  const trimmed = data.length > maxPoints ? data.slice(-maxPoints) : data;
		  const models = [...new Set(trimmed.map((d) => d.model))];
		  const step = 7;
		  const width = Math.max(60, trimmed.length * step);
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshd-modelTimeline", role: "img", "aria-label": ariaLabel ?? "model timeline", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height, style: { display: "block" }, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 2, y1: height / 2, x2: width - 2, y2: height / 2, stroke: "var(--dsw-alias-border-l2)", strokeWidth: 1 }),
		      trimmed.map((d, i) => {
		        const isSwitch = switchSeqs.includes(d.seq);
		        const focusable = onPick !== void 0 && (isSwitch || i === trimmed.length - 1);
		        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
		            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `#${d.seq} \xB7 ${d.model}` })
		          },
		          d.seq
		        );
		      })
		    ] }),
		    note !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-modelNote", children: note }) : null,
		    axisHint !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-axisHint", children: axisHint }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshd-modelLegend", children: models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshd-modelLegendItem", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: modelColor(m) } }),
		      m
		    ] }, m)) })
		  ] });
		}

		// src/client/DashboardView.tsx
		var import_jsx_runtime2 = require("react/jsx-runtime");
		var scrollMemory = /* @__PURE__ */ new Map();
		var TOOL_COLORS = [
		  "var(--dsw-alias-state-warn-primary)",
		  "var(--dsw-alias-state-business-primary)",
		  "var(--dsw-alias-state-success-primary)",
		  "var(--dsw-alias-state-error-primary)",
		  "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)",
		  "color-mix(in srgb, var(--dsw-alias-state-error-primary) 60%, var(--dsw-alias-state-warn-primary) 40%)"
		];
		function Hint(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: props.label, side: "top", delayMs: 450, maxWidth: 260, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-hint", role: "button", tabIndex: 0, "aria-label": props.label, children: "?" }) });
		}
		function fmtCost(v) {
		  if (v <= 0) return "$0";
		  if (v >= 1) return `$${v.toFixed(2)}`;
		  if (v < 5e-5) return "<$0.0001";
		  return `$${v.toFixed(4)}`;
		}
		function StatCard(props) {
		  const { label, value, sub, hint, tone, spark } = props;
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-stat", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-statLabel", children: [
		      label,
		      hint !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Hint, { label: hint }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		    spark !== void 0 && spark.values.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-statSpark", title: spark.title, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Sparkline, { values: spark.values, color: spark.color }) }) : null,
		    sub !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-statSub", title: sub, children: sub }) : null
		  ] });
		}
		function statusPill(status, t) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-statusPill", "data-s": status, children: status === "running" ? t("stat.requests.running") : status === "error" ? t("stat.requests.error") : status === "compaction" ? t("stat.compactions") : t("stat.requests.completed") });
		}
		function RequestDetailPanel(props) {
		  const { detail, t, onJump } = props;
		  const uncached = Math.max(0, detail.inputTokens - detail.cacheReadTokens - detail.cacheWriteTokens);
		  const tools = detail.promptToolNames.length > 0 ? detail.promptToolNames.join(" \xB7 ") : t("unknown");
		  const startedLabel = detail.startedAt === null ? null : detail.status === "running" ? `${new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })} \xB7 ${t("req.runningElapsed")} ${formatMs(Math.max(0, Date.now() - detail.startedAt))}` : new Date(detail.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-detail", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-detailHead", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-detailTitle", children: [
		        t("trend.request"),
		        detail.seq
		      ] }),
		      detail.purpose === "compaction" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-tag", "data-k": "compaction", children: t("stat.compactions") }) : null,
		      detail.thinking ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-tag", "data-k": "reasoning", children: t("req.config.thinking") }) : null,
		      detail.retry > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-tag", "data-k": "error", title: detail.retryDelayMs === null ? void 0 : `${t("req.config.provider")} delay ${formatMs(detail.retryDelayMs)}`, children: [
		        t("req.retryCount"),
		        " ",
		        detail.retry,
		        "/",
		        detail.maxRetries,
		        detail.retryDelayMs !== null ? ` \xB7 ${formatMs(detail.retryDelayMs)}` : ""
		      ] }) : null,
		      statusPill(detail.status, t),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-chip", children: [
		        t("req.turnStep"),
		        " ",
		        detail.turn,
		        "/",
		        detail.step
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-chip", children: detail.durationMs === null ? t("unknown") : formatMs(detail.durationMs) }),
		      startedLabel !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-chip", title: t("req.startedAt"), children: startedLabel }) : null,
		      onJump !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: "dshd-jumpText", onClick: onJump, children: [
		        t("req.jumpTrajectory"),
		        " \u2197"
		      ] }) : null
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kv", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.config.provider") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", title: detail.provider ?? void 0, children: detail.provider ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.model") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", title: detail.model ?? void 0, children: detail.model ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.config.temperature") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: detail.temperature === null ? t("unknown") : String(detail.temperature) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.config.maxTokens") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: detail.maxTokens === null ? t("unknown") : exactNumber(detail.maxTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.config.effort") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: detail.reasoningEffort ?? t("unknown") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.prompt.systemChars") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: detail.promptSystemChars === null ? t("unknown") : exactNumber(detail.promptSystemChars) })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kv", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", title: t("hint.uncached"), children: t("req.usage.uncached") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: exactNumber(uncached) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.cacheRead") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.cacheReadTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.cacheWrite") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.cacheWriteTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.output") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.outputTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", children: t("req.usage.reasoning") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: exactNumber(detail.reasoningTokens) })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvKey", title: t("hint.cost"), children: t("req.usage.cost") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: fmtCost(detail.costUsd) })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-kvKey", children: t("req.prompt.tools") }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-kvValue", style: { whiteSpace: "normal", wordBreak: "break-word" }, children: tools })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-kvKey", style: { marginBottom: "4px" }, children: t("req.toolCalls") }),
		      detail.toolCalls.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: "11.5px", padding: "2px 0" }, children: t("req.noToolCalls") }) : detail.toolCalls.map((call) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-toolRow", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-toolName", children: call.name }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-toolArgs", title: call.argsRaw ?? void 0, children: call.argsRaw ?? "" }),
		        call.isError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-toolErr", children: "\u26A0" }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-toolDur", children: call.durationMs === null ? t("unknown") : formatMs(call.durationMs) })
		      ] }, call.callId))
		    ] }),
		    detail.error !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-kvKey", style: { marginBottom: "4px" }, children: t("req.error") }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-errorBox", children: detail.error })
		    ] }) : null
		  ] });
		}
		function TrendSection(props) {
		  const { metrics, t, actions, jumpTo } = props;
		  const [openSeq, setOpenSeq] = (0, import_react2.useState)(null);
		  const [page, setPage] = (0, import_react2.useState)(0);
		  const [pageSize, setPageSize] = (0, import_react2.useState)(10);
		  const [filter, setFilter] = (0, import_react2.useState)("all");
		  const [newArrived, setNewArrived] = (0, import_react2.useState)(false);
		  const lastSeqRef = (0, import_react2.useRef)(null);
		  const GROUP_ROW_CAP = 20;
		  const canJump = actions !== void 0;
		  const colCount = 8 + (canJump ? 1 : 0);
		  const exportJson = () => {
		    const payload = {
		      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		      filter,
		      search: search.trim(),
		      view,
		      requests: searched.map((s) => {
		        const d = metrics.details.find((x) => x.seq === s.seq);
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
		          costUsd: d?.costUsd ?? 0,
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
		  const [view, setView] = (0, import_react2.useState)("table");
		  const [search, setSearch] = (0, import_react2.useState)("");
		  const [collapsed, setCollapsed] = (0, import_react2.useState)({});
		  const toggleCollapsed = (key) => setCollapsed((c) => ({ ...c, [key]: !(c[key] ?? false) }));
		  const filtered = filter === "all" ? metrics.series : metrics.series.filter((s) => s.status === filter);
		  const q = search.trim().toLowerCase();
		  const searched = q.length === 0 ? filtered : filtered.filter((s) => {
		    const d = metrics.details.find((x) => x.seq === s.seq);
		    return String(s.seq).includes(q) || String(s.turn).includes(q) || (s.model ?? "").toLowerCase().includes(q) || (s.error ?? "").toLowerCase().includes(q) || (s.purpose ?? "").toLowerCase().includes(q) || (d?.toolCalls ?? []).some((c) => c.name.toLowerCase().includes(q));
		  });
		  const total = searched.length;
		  const pageCount = Math.max(1, Math.ceil(total / pageSize));
		  const safePage = Math.min(page, pageCount - 1);
		  const rows = searched.slice(safePage * pageSize, safePage * pageSize + pageSize);
		  const renderRow = (s) => {
		    const detail = metrics.details.find((d) => d.seq === s.seq);
		    const open = openSeq === s.seq;
		    const isError = s.status === "error";
		    const jumpMode = canJump && !isError;
		    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        cols: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		              children: "\u25B8"
		            }
		          ) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seq", children: s.seq }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { children: [
		            s.turn,
		            "/",
		            s.step
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-model", title: s.model ?? void 0, children: s.model ?? t("unknown") }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: exactNumber(s.inputTokens) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: exactNumber(s.outputTokens) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: s.durationMs === null ? t("unknown") : formatMs(s.durationMs) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: s.purpose === "compaction" ? statusPill("compaction", t) : statusPill(s.status, t) }),
		          canJump ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		            "button",
		            {
		              type: "button",
		              className: "dshd-jump",
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
		        detail: open && detail !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          RequestDetailPanel,
		          {
		            detail,
		            t,
		            onJump: canJump ? () => jumpTo(s.seq) : void 0
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
		  (0, import_react2.useEffect)(() => {
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
		    color: CHART_COLORS.output
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
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesRow", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheRead, display: "inline-block" } }),
		          t("trend.cacheHit"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-seriesTotal", children: [
		            metrics.cacheHitPercent === null ? "\u2014" : `${metrics.cacheHitPercent}%`,
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-scopeTag", children: t("stat.scopeAll") })
		          ] })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		          t("trend.input"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalInput) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: tokenBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.output, display: "inline-block" } }),
		          t("trend.output"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalOutput) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: outputBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: formatMs(windowDurationMs) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: durationBars, height: 76, valueFormatter: (v) => formatMs(v), emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesRow", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" } }),
		          t("trend.ttft"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", title: t("trend.ttftAvgNote"), children: windowTtftAvgMs === null ? "\u2014" : `${formatMs(windowTtftAvgMs)} ${t("timing.avg")}` })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote,
		          metrics.ttftStats.p50 !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-ttftStats", children: [
		            "P50 ",
		            formatMs(metrics.ttftStats.p50),
		            " \xB7 P95 ",
		            formatMs(metrics.ttftStats.p95 ?? 0),
		            " \xB7 P99 ",
		            formatMs(metrics.ttftStats.p99 ?? 0)
		          ] }) : null
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		          t("trend.turnInput"),
		          lastTurnDelta !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AreaChart, { series: turnInputBars, height: 76, color: CHART_COLORS.input, valueFormatter: (v) => exactNumber(v), emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote,
		          compactionTurns.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-ttftStats", children: [
		            "\u25C6 ",
		            t("trend.compactionMarks"),
		            ": ",
		            compactionTurns.map((tn) => `${t("turns.label")}${tn}`).join("\u3001")
		          ] }) : null
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.reasoning, display: "inline-block" } }),
		          t("trend.reasoningShare")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" } }),
		          t("trend.cacheWrite"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", title: windowTitle, children: exactNumber(totalCacheWrite) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: cacheWriteBars, height: 76, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-axisHint", children: [
		          t("trend.newestRight"),
		          scopeNote
		        ] })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesRow", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.llm, display: "inline-block" } }),
		          t("trend.rateRequests")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: rateReqBars, height: 60, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.input, display: "inline-block" } }),
		          t("trend.rateTokens")
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SeriesBars, { series: rateTokenBars, height: 60, emptyLabel: t("empty.requests"), showMaxTag: true, ariaLabel: t("aria.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.output, display: "inline-block" } }),
		          t("trend.rateFailed"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-seriesTotal", children: exactNumber(totalFailed) })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          AreaChart,
		          {
		            series: rateFailBars,
		            height: 60,
		            color: CHART_COLORS.output,
		            valueFormatter: (v) => exactNumber(v),
		            emptyLabel: t("empty.requests"),
		            showMaxTag: true,
		            ariaLabel: t("aria.trend")
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-axisHint", children: t("trend.rateNote") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesCol", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-seriesLabel", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { width: 9, height: 9, borderRadius: 2.5, background: CHART_COLORS.cacheWrite, display: "inline-block" } }),
		          t("trend.contextOcc"),
		          occNowPct !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-seriesTotal", children: [
		            occNowPct,
		            "%"
		          ] }) : null
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-axisHint", children: t("hint.contextOccTrend") })
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-viewTabs", role: "group", "aria-label": t("view.tabs.aria"), children: ["table", "turn", "model", "error"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-badge", children: viewCounts[v] })
		        ]
		      },
		      v
		    )) }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-filters", role: "group", "aria-label": t("req.filter.aria"), children: [
		      ["all", "running", "complete", "error"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-badge", children: statusCounts[f] })
		          ]
		        },
		        f
		      )),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dshd-filterBtn", title: t("req.exportHint"), onClick: exportJson, children: t("req.export") })
		    ] }),
		    view === "table" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-tableWrap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { className: "dshd-table", "aria-label": t("section.requests"), children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", {}),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "#" }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.turnStep") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.model") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.input") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.output") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.duration") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.status") }),
		          canJump ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", {}) : null
		        ] }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tbody", { children: [
		          rows.map(renderRow),
		          rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { colSpan: colCount, className: "dshd-tableEmpty", children: search.trim().length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
		            t("empty.search"),
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		          ] }) : filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
		            t("empty.requestsFiltered"),
		            " ",
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		      total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-pager", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-pagerInfo", children: [
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
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-pagerBtns", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		            (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-pageEllipsis", children: "\u2026" }, `e${i}`) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        newArrived ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dshd-newBtn", onClick: () => {
		          setPage(0);
		          setNewArrived(false);
		        }, children: t("trend.newRequests") }) : null,
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: "dshd-pageSize", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-muted", children: t("pager.perPage") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		            "select",
		            {
		              value: pageSize,
		              "aria-label": t("pager.perPage"),
		              onChange: (e) => {
		                setPageSize(Number(e.target.value));
		                setPage(0);
		              },
		              children: [
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: 10, children: "10" }),
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: 20, children: "20" }),
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: 50, children: "50" })
		              ]
		            }
		          )
		        ] })
		      ] }) : null
		    ] }) : (
		      /* Grouped views: collapsible group headers + aggregated stats */
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-groups", children: [
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
		          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-group", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		              "button",
		              {
		                type: "button",
		                className: "dshd-groupHead",
		                "aria-expanded": !isCollapsed,
		                onClick: () => toggleCollapsed(gkey),
		                children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-chevron", "data-open": isCollapsed ? void 0 : true, children: "\u25B8" }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-groupName", children: g.label }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-groupStats", children: [
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
		                    errN > 0 ? ` \xB7 \u26A0 ${errN}` : ""
		                  ] })
		                ]
		              }
		            ),
		            !isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-groupBody", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { className: "dshd-table", "aria-label": g.label, children: [
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", {}),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "#" }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.turnStep") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.model") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.input") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.output") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("trend.duration") }),
		                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: t("req.status") }),
		                  canJump ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", {}) : null
		                ] }) }),
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: g.items.slice(0, GROUP_ROW_CAP).map(renderRow) })
		              ] }),
		              g.items.length > GROUP_ROW_CAP ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-axisHint", children: t("group.tailNote").replace("{n}", String(GROUP_ROW_CAP)).replace("{m}", String(g.items.length - GROUP_ROW_CAP)) }) : null
		            ] }) : null
		          ] }, g.key);
		        }),
		        groups.length === 0 ? search.trim().length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: [
		          t("empty.search"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dshd-clearFilter", onClick: () => setSearch(""), children: t("req.clearSearch") })
		        ] }) : filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: [
		          t("empty.requestsFiltered"),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dshd-clearFilter", onClick: () => setFilter("all"), children: t("req.filter.all") })
		        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: t("empty.requestsTable") }) : null
		      ] })
		    )
		  ] });
		}
		function FragmentRow(props) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		      "tr",
		      {
		        "data-open": props.open || void 0,
		        "data-error": props.rowError || void 0,
		        title: props.rowTitle,
		        tabIndex: 0,
		        onClick: props.onRowClick,
		        onKeyDown: (e) => {
		          if (e.key === "Enter" || e.key === " ") {
		            e.preventDefault();
		            props.onRowClick();
		          }
		        },
		        children: props.cols
		      }
		    ),
		    props.detail !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { colSpan: props.colSpan, style: { padding: "0 8px 10px" }, children: props.detail }) }) : null
		  ] });
		}
		function DashboardView(props) {
		  const { useSession, useProjection, t, actions, sessionId } = props;
		  const rootRef = (0, import_react2.useRef)(null);
		  const scrollHandlerRef = (0, import_react2.useRef)(null);
		  const restoringRef = (0, import_react2.useRef)(false);
		  const sessionRef = (0, import_react2.useRef)(sessionId);
		  sessionRef.current = sessionId;
		  const bindRoot = (0, import_react2.useCallback)((el) => {
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
		  (0, import_react2.useEffect)(() => () => {
		    const el = rootRef.current;
		    if (el !== null) scrollMemory.set(sessionRef.current, el.scrollTop);
		  }, []);
		  const trajectory = useSession((s) => s.views.get("trajectory"));
		  const nodes = useSession((s) => s.chat.legacy.nodes);
		  const turnTimings = useSession((s) => s.turnTimings);
		  const running = useSession((s) => s.running) === true;
		  const partial = useSession((s) => s.partial);
		  const runningCalls = useSession((s) => s.runningCalls);
		  const hasMore = useSession((s) => s.hasMore) === true;
		  const [clock, setClock] = (0, import_react2.useState)(0);
		  (0, import_react2.useEffect)(() => {
		    if (!running) return;
		    const id = window.setInterval(() => setClock((c) => c + 1), 1e3);
		    return () => window.clearInterval(id);
		  }, [running]);
		  const tokenUsage = useProjection("tokenUsage");
		  const stats = useProjection("sessionStats");
		  const context = useProjection("contextBreakdown");
		  const pressure = useProjection("contextPressure");
		  const metrics = (0, import_react2.useMemo)(
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
		    [running, nodes, turnTimings, trajectory, tokenUsage, stats, context, pressure]
		  );
		  const hasData = metrics.turns > 0 || metrics.steps > 0 || metrics.requestCount > 0 || metrics.inputTokens > 0 || metrics.roles.total > 0;
		  const findAnchor = (seq) => {
		    const own = metrics.details.find((d) => d.seq === seq);
		    if (own !== void 0 && own.toolCalls.length > 0) return own;
		    const after = metrics.details.filter((d) => d.seq > seq && d.toolCalls.length > 0).sort((a, b) => a.seq - b.seq)[0];
		    const before = metrics.details.filter((d) => d.seq < seq && d.toolCalls.length > 0).sort((a, b) => b.seq - a.seq)[0];
		    if (after === void 0) return before;
		    if (before === void 0) return after;
		    return after.seq - seq <= seq - before.seq ? after : before;
		  };
		  const jumpTo = (seq) => {
		    if (actions === void 0) return;
		    const detail = metrics.details.find((d) => d.seq === seq);
		    if (detail === void 0) return;
		    const anchor = findAnchor(seq);
		    if (anchor !== void 0) {
		      const call = anchor.toolCalls[0];
		      actions.select({
		        turnSeq: Math.max(1, anchor.turn),
		        stepSeq: anchor.step,
		        callId: call.callId
		      });
		      actions.setInspect({ callId: call.callId });
		    } else {
		      actions.select({ turnSeq: Math.max(1, detail.turn), stepSeq: detail.step });
		      actions.setInspect(null);
		    }
		    actions.setView("trajectory");
		  };
		  const formLabel = (f) => f === "instructions" || f === "catalog" || f === "snapshot" || f === "notice" || f === "relay" || f === "recall" ? t(`contextForm.${f}`) : t("contextForm.opaque");
		  if (!hasData) {
		    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: bindRoot, className: "dshd-root", "data-conversation-composer-overlay": "", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-header", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-title", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("view.dashboard") }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-live", "data-off": running ? void 0 : true, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-liveDot" }),
		          running ? t("status.running") : t("status.idle")
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", children: t("empty") })
		    ] });
		  }
		  const tokenData = [
		    { label: t("tokens.input"), value: Math.max(0, metrics.inputTokens - metrics.cacheReadTokens - metrics.cacheWriteTokens), color: CHART_COLORS.input },
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
		  const model = metrics.series[0]?.model ?? null;
		  const toolRows = metrics.toolHistogram.slice(0, 8).map((h, i) => ({
		    label: h.name,
		    value: h.count,
		    color: TOOL_COLORS[i % TOOL_COLORS.length] ?? CHART_COLORS.llm,
		    errorMark: h.errorCount > 0,
		    sub: h.errorCount > 0 ? `${h.errorCount}/${h.count} (${Math.round(h.errorCount / Math.max(1, h.count) * 100)}%)` : void 0
		  }));
		  const modelRows = metrics.modelSplit.map((m) => ({
		    label: m.model,
		    value: m.inputTokens + m.outputTokens,
		    color: modelColor(m.model),
		    title: `${m.provider} \xB7 avg duration ${m.avgDurationMs === null ? t("unknown") : formatMs(m.avgDurationMs)} \xB7 avg TTFT ${m.avgTtftMs === null ? t("unknown") : formatMs(m.avgTtftMs)} \xB7 ${m.errorCount} ${t("req.error")}`,
		    sub: `${m.requests} ${t("models.requests")} \xB7 ${compactNumber(m.inputTokens)}\u2192${compactNumber(m.outputTokens)} \xB7 ${fmtCost(m.costUsd)}${m.avgDurationMs !== null ? ` \xB7 ${formatMs(m.avgDurationMs)}` : ""}${m.errorCount > 0 ? ` \xB7 ${m.errorCount}\u26A0` : ""}`
		  }));
		  const errorRows = [
		    { label: t("stat.turnErrors"), value: metrics.anomalies.turnErrors, color: CHART_COLORS.output },
		    { label: t("stat.maxTokenHits"), value: metrics.anomalies.maxTokenHits, color: CHART_COLORS.cacheWrite },
		    { label: t("stat.retries"), value: metrics.anomalies.modelRetries, color: CHART_COLORS.reasoning },
		    { label: t("stat.interrupted"), value: metrics.anomalies.interrupted, color: CHART_COLORS.other },
		    { label: t("stat.commands"), value: metrics.anomalies.commands, color: CHART_COLORS.steering }
		  ].filter((r) => r.value > 0);
		  const windowNote = `${t("role.windowNote")}${hasMore ? t("windowNote.more") : ""}`;
		  const streamed = (() => {
		    if (partial === null) return { text: 0, reasoning: 0 };
		    let text = 0;
		    let reasoning = 0;
		    for (const b of partial.blocks) {
		      if (!("text" in b) || typeof b.text !== "string") continue;
		      if (b.kind === "reasoning") reasoning += b.text.length;
		      else if (b.kind === "text") text += b.text.length;
		    }
		    return { text, reasoning };
		  })();
		  const streamingChars = streamed.text + streamed.reasoning;
		  const nowMs = Date.now();
		  const stuckRequests = metrics.series.filter((s) => s.status === "running" && s.startedAt !== null).map((s) => ({ seq: s.seq, elapsed: Math.max(0, nowMs - s.startedAt) })).filter((x) => x.elapsed > 6e4);
		  const stuckToolMs = 3e4;
		  const maxTurnMs = Math.max(1, ...metrics.turnDurations.map((td) => td.durationMs));
		  const windowSamples = metrics.series.slice(0, 60).reverse();
		  const sparkInput = windowSamples.map((s) => s.inputTokens);
		  const sparkOutput = windowSamples.map((s) => s.outputTokens);
		  const sparkHit = windowSamples.filter((s) => s.inputTokens > 0).map((s) => Math.round(s.cacheReadTokens / s.inputTokens * 100));
		  const sparkDuration = windowSamples.map((s) => s.durationMs).filter((v) => v !== null);
		  const summary = [
		    { label: t("stat.requests"), value: exactNumber(metrics.requestCount) },
		    { label: t("stat.requests.completed"), value: exactNumber(metrics.completedRequests) },
		    { label: t("stat.requests.error"), value: exactNumber(metrics.failedRequests) }
		  ];
		  if (metrics.durationStats.p50 !== null) {
		    summary.push({ label: "P50", value: formatMs(metrics.durationStats.p50) });
		  }
		  if (metrics.compactionRequests > 0) {
		    summary.push({ label: t("stat.compactions"), value: exactNumber(metrics.compactionRequests) });
		  }
		  if (metrics.costEstimateUsd.total > 0) {
		    summary.push({ label: t("stat.cost"), value: metrics.costEstimateUsd.total <= 0 ? "\u2014" : fmtCost(metrics.costEstimateUsd.total) });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: bindRoot, className: "dshd-root", "data-conversation-composer-overlay": "", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-header", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-title", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("view.dashboard") }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-live", "data-off": running ? void 0 : true, children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-liveDot" }),
		        running ? t("status.running") : t("status.idle")
		      ] }),
		      model !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-chip", title: model, children: model }) : null,
		      metrics.modelSwitchCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-chip", title: t("hint.modelSwitches"), children: [
		        t("stat.modelSwitches"),
		        " \xD7",
		        metrics.modelSwitchCount
		      ] }) : null,
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-spacer" }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-muted", style: { fontSize: 11 }, children: windowNote })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-summary", role: "complementary", "aria-label": t("section.summary"), children: summary.map((s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-summaryItem", title: s.label, children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-summaryLabel", children: s.label }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-summaryValue", children: s.value })
		    ] }, s.label)) }),
		    running ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-streamRow", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-streamDot" }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-streamText", children: [
		        t("status.streaming"),
		        streamed.text > 0 ? ` ${exactNumber(streamed.text)} ${t("unit.char")}` : "",
		        streamed.reasoning > 0 ? ` \xB7 ${t("tokens.reasoning")} ${exactNumber(streamed.reasoning)} ${t("unit.char")}` : ""
		      ] }),
		      stuckRequests.map((x) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-streamWarn", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { role: "alert", children: t("status.stuckAlert").replace("{n}", String(x.seq)) }),
		        t("status.stuckTimer").replace("{s}", formatMs(x.elapsed))
		      ] }, `stuck${x.seq}`)),
		      runningCalls.map((c) => {
		        const elapsed = Math.max(0, nowMs - c.time);
		        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `dshd-streamTool${elapsed > stuckToolMs ? " dshd-streamWarn" : ""}`, children: [
		          t("status.tool"),
		          " ",
		          c.name,
		          " \xB7 ",
		          formatMs(elapsed)
		        ] }, c.callId);
		      })
		    ] }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.overview") }) }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-stats", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.turns"), value: exactNumber(metrics.turns), hint: t("hint.turns") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.steps"), value: exactNumber(metrics.steps), hint: t("hint.steps") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.requests"),
		            value: exactNumber(metrics.requestCount),
		            hint: t("hint.requests"),
		            sub: `${metrics.completedRequests} ${t("stat.requests.completed")} \xB7 ${metrics.runningRequests} ${t("stat.requests.running")} \xB7 ${metrics.failedRequests} ${t("stat.requests.error")}`,
		            tone: metrics.failedRequests > 0 ? "warn" : void 0
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.tools"), value: exactNumber(metrics.toolCallCount), hint: t("hint.tools"), sub: metrics.toolErrorCount > 0 ? `${metrics.toolErrorCount} ${t("stat.toolErrors")} (${Math.round(metrics.toolErrorCount / Math.max(1, metrics.toolCallCount) * 100)}%)` : void 0, tone: metrics.toolErrorCount > 0 ? "bad" : void 0 }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.compactions"), value: exactNumber(metrics.compactionRequests), hint: t("hint.compactions") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.compactionRecovered"),
		            value: metrics.compactionRecoveredTokens === null ? t("unknown") : compactNumber(metrics.compactionRecoveredTokens),
		            hint: t("hint.compactionRecovered"),
		            sub: metrics.compactionRequests > 0 ? `${compactNumber(metrics.compactionRequests)} ${t("stat.compactions")}${metrics.compactionRecoveredItems === null ? "" : ` \xB7 ${compactNumber(metrics.compactionRecoveredItems)} ${t("stat.compactionItems")}`}` : void 0
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.modelSwitches"), value: exactNumber(metrics.modelSwitchCount), hint: t("hint.modelSwitches") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.cost"),
		            value: metrics.costEstimateUsd.total <= 0 ? "\u2014" : fmtCost(metrics.costEstimateUsd.total),
		            hint: t("hint.cost"),
		            sub: metrics.costEstimateUsd.cacheSavings > 0 ? `${t("stat.costSavings")} ${fmtCost(metrics.costEstimateUsd.cacheSavings)}` : void 0
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.totalDuration"),
		            value: formatMs(metrics.totalDurationMs),
		            hint: t("hint.totalDuration"),
		            spark: { values: sparkDuration, color: CHART_COLORS.reasoning, title: t("trend.newestRight") }
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.avgTtft"),
		            value: metrics.avgTtftMs === null ? t("unknown") : formatMs(metrics.avgTtftMs),
		            hint: t("hint.avgTtft"),
		            sub: metrics.ttftSteps > 0 ? `${metrics.ttftSteps} ${t("timing.ttft")} \xB7 ${t("stat.scopeAll")}` : void 0
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.decodeSpeed"),
		            value: metrics.decodeTokensPerSec === null ? t("unknown") : `${Math.round(metrics.decodeTokensPerSec)} ${t("unit.tps")}`,
		            hint: t("hint.decodeSpeed"),
		            sub: `${compactNumber(metrics.decodeTokens)} ${t("trend.output")} / ${formatMs(metrics.decodeMs)} \xB7 ${t("stat.scopeAll")}`
		          }
		        )
		      ] })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.tokens") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-cardHint", children: [
		          t("tokens.formula"),
		          " \xB7 ",
		          t("tokens.cacheNote")
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-stats", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.inputTokens"), value: exactNumber(metrics.inputTokens), hint: t("hint.inputTokens"), tone: "accent", spark: { values: sparkInput, color: CHART_COLORS.input, title: t("trend.newestRight") } }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.outputTokens"), value: exactNumber(metrics.outputTokens), hint: t("hint.outputTokens"), sub: metrics.reasoningTokens > 0 ? `${t("tokens.reasoning")} ${compactNumber(metrics.reasoningTokens)} (${t("role.windowNote")})` : void 0, spark: { values: sparkOutput, color: CHART_COLORS.output, title: t("trend.newestRight") } }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          StatCard,
		          {
		            label: t("stat.reasoningTokens"),
		            value: exactNumber(metrics.reasoningTokens),
		            hint: t("hint.reasoningTokens"),
		            sub: metrics.windowOutputTokens > 0 ? `${t("stat.reasoningShare")} ${Math.round(metrics.reasoningTokens / metrics.windowOutputTokens * 100)}% (${t("role.windowNote")})` : void 0,
		            tone: metrics.reasoningTokens > 0 ? "reasoning" : void 0
		          }
		        ),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { label: t("stat.cacheHitRate"), value: metrics.cacheHitPercent === null ? t("unknown") : `${metrics.cacheHitPercent}${t("unit.percent")}`, hint: t("hint.cacheHitRate"), tone: metrics.cacheHitPercent !== null && metrics.cacheHitPercent >= 60 ? "good" : metrics.cacheHitPercent !== null && metrics.cacheHitPercent > 0 ? "accent" : void 0, sub: metrics.cacheHitPercent === null ? void 0 : `${t("stat.cacheRead")} ${compactNumber(metrics.cacheReadTokens)} / ${t("stat.inputTokens")} ${compactNumber(metrics.inputTokens)}`, spark: { values: sparkHit, color: CHART_COLORS.cacheRead, title: t("trend.newestRight") } })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StackedBar, { data: tokenData, valueFormatter: (v) => exactNumber(v), height: 20, totalLabel: t("total") })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-grid2", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("stat.contextOccupancy") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.contextOccupancy") })
		        ] }),
		        metrics.pressure?.projectedTokens === void 0 || metrics.pressure.contextWindow === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", style: { padding: "22px 0" }, children: t("context.pressureMissing") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-gaugeRow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-gaugeBox", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		              RadialGauge,
		              {
		                value: metrics.pressure.projectedTokens,
		                max: metrics.pressure.contextWindow,
		                unit: t("unit.percent"),
		                ariaLabel: t("aria.gauge")
		              }
		            ),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-gaugeLabel", children: [
		              exactNumber(metrics.pressure.projectedTokens),
		              " / ",
		              exactNumber(metrics.pressure.contextWindow)
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-col", style: { flex: 1, minWidth: 0 }, children: contextData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", children: t("context.note") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StackedBar, { data: contextData, valueFormatter: (v) => exactNumber(v), height: 20, totalLabel: t("total") }) })
		        ] })
		      ] }),
		      metrics.contextInjection.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.contextInjection") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.contextInjection") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-col", children: metrics.contextInjection.map((c) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		          "div",
		          {
		            className: "dshd-errRow",
		            title: `${c.role === "recall" ? t("contextRole.recall") : t("contextRole.inject")} \xB7 ${formLabel(c.form)}`,
		            children: [
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errMsg", children: [
		                c.label,
		                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-formBadge", "data-f": c.form, children: formLabel(c.form) })
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
		                "\xD7",
		                c.count,
		                " \xB7 ",
		                compactNumber(c.chars),
		                " ",
		                t("unit.char")
		              ] })
		            ]
		          },
		          `${c.label}${c.form}`
		        )) })
		      ] }) : null,
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.messages") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: windowNote })
		        ] }),
		        metrics.roles.total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", children: t("unknown") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-donutRow", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DonutChart, { data: roleData, centerValue: String(metrics.roles.total), centerLabel: t("section.messages"), ariaLabel: t("aria.donut") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Legend, { data: roleData, percent: true }) })
		        ] })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.timing") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("stat.scopeAll") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		        metrics.ttftByCache.hitN + metrics.ttftByCache.missN > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", children: t("section.ttftByCache") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kv", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-kvKey", style: { color: "var(--dsw-alias-state-success-primary)" }, children: [
		                t("ttftCache.hit"),
		                " (",
		                metrics.ttftByCache.hitN,
		                ")"
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: metrics.ttftByCache.hitAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.hitAvgMs) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-kvItem", children: [
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-kvKey", style: { color: "var(--dsw-alias-state-warn-primary)" }, children: [
		                t("ttftCache.miss"),
		                " (",
		                metrics.ttftByCache.missN,
		                ")"
		              ] }),
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-kvValue", children: metrics.ttftByCache.missAvgMs === null ? t("unknown") : formatMs(metrics.ttftByCache.missAvgMs) })
		            ] })
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: 10.5 }, children: t("hint.ttftByCache") })
		        ] }) : metrics.assistantTtft.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: 10.5 }, children: t("hint.ttftByCacheMiss") }) : null,
		        metrics.durationStats.sampleCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", children: t("section.durationDist") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-percRow", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-perc", children: [
		              "P50 ",
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: formatMs(metrics.durationStats.p50 ?? 0) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-perc", children: [
		              "P95 ",
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: formatMs(metrics.durationStats.p95 ?? 0) })
		            ] }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-perc", children: [
		              "P99 ",
		              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: formatMs(metrics.durationStats.p99 ?? 0) })
		            ] })
		          ] }),
		          (() => {
		            const maxCount = Math.max(1, ...metrics.durationStats.buckets.map((b) => b.count));
		            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-hist", children: metrics.durationStats.buckets.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		              "div",
		              {
		                className: "dshd-histCol",
		                title: `${formatMs(b.loMs)} \u2013 ${formatMs(b.hiMs)} \xB7 ${b.count}`,
		                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.turns") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.turnDurations") })
		        ] }),
		        metrics.turnDurations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-empty", style: { padding: "18px 0" }, children: t("unknown") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-turnList", children: metrics.turnDurations.map((td) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-turnRow", title: td.closed ? void 0 : t("hint.turnOpen"), children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-turnName", children: [
		            t("turns.label"),
		            td.turn,
		            td.closed ? "" : " ~"
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-turnTrack", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-turnFill", style: { width: `${td.durationMs / maxTurnMs * 100}%` } }) }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-turnValue", children: formatMs(td.durationMs) })
		        ] }, td.turn)) }),
		        turnTimings.size > metrics.turnDurations.length ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: 11, marginTop: 6 }, children: t("hint.turnTail") }) : null
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.tools") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("tools.note") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HorizontalBars, { data: toolRows, valueFormatter: (v) => exactNumber(v) }),
		        metrics.toolHistogram.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: 11 }, children: t("req.toolTail").replace("{n}", String(metrics.toolHistogram.length - 8)) }) : null,
		        metrics.toolDurationTop.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", children: t("tools.durationTop") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		            HorizontalBars,
		            {
		              data: metrics.toolDurationTop.slice(0, 5).map((r, i) => ({
		                label: r.name,
		                value: r.totalMs,
		                color: TOOL_COLORS[i % TOOL_COLORS.length] ?? CHART_COLORS.llm,
		                sub: `${t("tools.avgDuration")} ${formatMs(r.avgMs)} \xB7 ${r.calls}`
		              })),
		              valueFormatter: (v) => formatMs(v)
		            }
		          )
		        ] }) : null
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.models") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.modelTimeline") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HorizontalBars, { data: modelRows, valueFormatter: (v) => exactNumber(v), subBelow: true }),
		        metrics.modelSplit.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: 8 }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		            StackedBar,
		            {
		              data: metrics.modelSplit.map((m) => ({ label: m.model, value: m.costUsd, color: modelColor(m.model) })),
		              valueFormatter: (v) => fmtCost(v),
		              height: 20,
		              totalLabel: t("section.modelCost")
		            }
		          ),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-muted", style: { fontSize: 10.5 }, children: t("hint.modelCost") })
		        ] }) : null,
		        metrics.modelTimeline.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		          ModelTimeline,
		          {
		            data: metrics.modelTimeline,
		            switchSeqs: metrics.modelSwitchSeqs,
		            emptyLabel: t("empty.requests"),
		            onPick: actions !== void 0 ? (seq) => jumpTo(seq) : void 0,
		            note: metrics.modelTimeline.length > 60 ? `${t("trend.scopeNote")} 60 ${t("pager.items")}` : void 0,
		            axisHint: t("trend.axisOldToNew"),
		            ariaLabel: t("aria.modelTimeline")
		          }
		        ) }) : null
		      ] }),
		      errorRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.errors") }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HorizontalBars, { data: errorRows, valueFormatter: (v) => exactNumber(v) }),
		        metrics.commandRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", children: t("section.commands") }),
		          metrics.commandRows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-errRow", children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-errMsg", children: c.name }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
		              "\xD7",
		              c.count
		            ] })
		          ] }, c.name))
		        ] }) : null,
		        metrics.retriedRequests > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-subTitle", style: { marginTop: 8 }, children: [
		          t("stat.retryWait"),
		          " ",
		          formatMs(metrics.retryWaitMs),
		          " \xB7 ",
		          t("stat.retried"),
		          " ",
		          exactNumber(metrics.retriedRequests)
		        ] }) : null,
		        metrics.failedStats.count > 0 && metrics.completedStats.count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", style: { marginTop: 8 }, children: t("hint.failedProfile").replace("{a}", metrics.failedStats.avgDurationMs === null ? "\u2014" : formatMs(metrics.failedStats.avgDurationMs)).replace("{b}", metrics.completedStats.avgDurationMs === null ? "\u2014" : formatMs(metrics.completedStats.avgDurationMs)) }) : null
		      ] }) : null,
		      metrics.topErrors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.errorTop") }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-col", children: metrics.topErrors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-errRow", title: e.message, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-errMsg", children: e.message }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
		            "\xD7",
		            e.count
		          ] })
		        ] }, e.message)) })
		      ] }) : null,
		      metrics.compactionEffect.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.compaction") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.compactionEffect") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-col", children: metrics.compactionEffect.map((e) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-compactRow", title: `${t("req.seq")} ${e.seq}`, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-compactSeq", children: [
		            t("turns.label"),
		            e.turn
		          ] }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-compactArrow", children: [
		            e.beforeTokens === null ? t("unknown") : exactNumber(e.beforeTokens),
		            " \u2192 ",
		            e.afterTokens === null ? t("unknown") : exactNumber(e.afterTokens)
		          ] }),
		          e.recoveredTokens !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-compactRecovered", children: [
		            "\u2212",
		            exactNumber(e.recoveredTokens),
		            " (",
		            e.recoveredPct,
		            "%)"
		          ] }) : null
		        ] }, e.seq)) })
		      ] }) : null,
		      metrics.effortStats.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-cardHead", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.effort") }) }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-col", children: metrics.effortStats.map((e) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-errRow", title: t("hint.effort"), children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-errMsg", children: e.effort }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
		            exactNumber(e.requests),
		            " \xB7 ",
		            compactNumber(e.reasoningTokens),
		            " ",
		            t("tokens.reasoning")
		          ] })
		        ] }, e.effort)) })
		      ] }) : null,
		      metrics.loops.length > 0 || metrics.noProgress.length > 0 || metrics.toolStorm.some((b) => b.calls > 0) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.health") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: t("hint.health") })
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-col", children: [
		          metrics.loops.map((l) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-errRow", title: `${t("hint.loop")} ${l.seqs.join(", ")}`, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-healthTag", "data-k": "loop", children: t("health.loop") }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-errMsg", children: l.name }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
		              "\xD7",
		              l.count
		            ] })
		          ] }, `${l.name}${l.count}`)),
		          metrics.noProgress.map((p) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-errRow", title: `${t("req.seq")} ${p.seq}`, children: [
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-healthTag", "data-k": "noProgress", children: t("health.noProgress") }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-errMsg", children: t("hint.noProgress") }),
		            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dshd-errCount", children: [
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
		        metrics.toolStorm.some((b) => b.calls > 0) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: 8 }, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dshd-subTitle", children: t("trend.toolStorm") }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dshd-card", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dshd-cardHead", children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardTitle", children: t("section.trend") }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dshd-cardHint", children: actions !== void 0 ? t("req.rowHint.jump") : t("req.rowHint.expand") })
		      ] }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TrendSection, { metrics, t, actions, jumpTo })
		    ] })
		  ] });
		}

		// src/client/index.ts
		var inject = ["slots", "locale"];
		injectDashboardStyles();
		var CHAT_ENTRY_ID = "chat";
		function apply(ctx) {
		  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-dashboard: dictionaries");
		  const t = ctx.locale.bind(NS);
		  ctx.slots.inject("conversation.view", () => {
		    const chat = ctx.slots.entries("conversation.view").find((e) => e.options.id === CHAT_ENTRY_ID);
		    const store = chat?.store;
		    return ctx.slots.register(
		      {
		        name: "conversation.view",
		        id: "dashboard",
		        order: 20,
		        locale: NS,
		        ...store === void 0 ? {} : { store },
		        label: () => t("view.dashboard")
		      },
		      DashboardView
		    );
		  });
		}

		return module.exports;
	}
});
