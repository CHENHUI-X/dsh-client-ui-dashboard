# Design skill selection — 2026-10-26

Reviewed the ten repositories supplied for this redesign. Installed focused references without adding a UI framework, external design service, or Figma dependency to the plugin.

| Repository | Decision | Reason for this task |
| --- | --- | --- |
| [ui-ux-agent-skill-system](https://github.com/sergekostenchuk/ui-ux-agent-skill-system) | Read, not installed | Broad orchestration and many specialists overlap the existing UI/UX skill; excess workflow for one existing React plugin. |
| [ui-craft](https://github.com/educlopez/ui-craft) | Installed `ui-craft` and `ui-craft-dense-dashboard`; used | Direct guidance for hierarchy, data density, tables, theme tokens and responsive implementation. |
| [open-design-skill](https://github.com/sugarforever/open-design-skill) | Read, not installed | Brand and template catalogue adds little to an existing DSH theme. |
| [tasteful-ui-skill](https://github.com/DonkeyKing01/tasteful-ui-skill) | Installed `tasteful-ui`; reserved for future direction exploration | Useful for taste and reference selection. Its staged design-approval workflow was not applied to this already-authorized implementation. |
| [ux-discovery-interviewer](https://github.com/JacobLinCool/ux-discovery-interviewer-skill) | Read, not installed | Product discovery interviews are unnecessary with an existing product and concrete pain points/screenshots. |
| [apple-design-skill](https://github.com/dickwu/apple-design-skill) | Read, not installed | Native Apple HIG review is less direct than the Web host's existing tokens and conventions. |
| [uxui-principles-agent-skills](https://github.com/uxuiprinciples/agent-skills) | Read, not installed | Interface heuristics overlap installed review skills; optional paid/API enrichment was unnecessary. |
| [Figma-AI-Bridge](https://github.com/renfei-design/Figma-AI-Bridge) | Read, not installed | Figma control requires a plugin/relay setup; no Figma source is involved. |
| [agent-ready](https://github.com/Owl-Listener/agent-ready) | Read, not installed | Assesses Figma file readiness rather than an existing React implementation. |
| [figma-context-mcp-skill](https://github.com/HowardTangOvO/Figma-Context-MCP-Skill) | Read, not installed | Requires Figma context and credentials; neither is needed here. |

The existing `ui-ux-pro-max` product search matched Analytics Dashboard: data density, drill-down and comparative analysis. The initial combined search returned a documentation landing pattern, which was rejected as off-topic. UI Craft dashboard references anchored the implementation. Final design choices are recorded in `.ui-craft/`.

Installation is user-wide in the Codex skills directory, outside this repository. No third-party installers or application permission changes were used; skills were downloaded with the built-in skill installation helper.
