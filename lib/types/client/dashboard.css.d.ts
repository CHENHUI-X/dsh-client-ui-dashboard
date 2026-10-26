/**
 * Dashboard styles: a plain CSS string injected once per page load, styled
 * exclusively through the `--dsw-*` design tokens the shell theme provides.
 * Class names are prefixed with `dshd-` to avoid collisions.
 */
export declare const PLUGIN_ID = "dsh-client-ui-dashboard";
/** Inject the stylesheet once (idempotent per plugin bundle revision). */
export declare function injectDashboardStyles(): void;
/** Palette keyed by semantic slot, resolved through the theme's color aliases. */
export declare const CHART_COLORS: {
    readonly error: "var(--dsw-alias-state-error-primary)";
    readonly user: "var(--dshd-accent)";
    readonly assistant: "var(--dshd-teal)";
    readonly system: "var(--dshd-muted)";
    readonly tool: "var(--dshd-indigo)";
    readonly other: "var(--dshd-muted)";
    readonly input: "var(--dshd-accent)";
    readonly cacheRead: "var(--dshd-teal)";
    readonly cacheWrite: "var(--dshd-amber)";
    readonly output: "var(--dshd-indigo)";
    readonly reasoning: "var(--dshd-indigo)";
    readonly llm: "var(--dshd-accent)";
    readonly toolTime: "var(--dshd-teal)";
    readonly messages: "var(--dshd-accent)";
    readonly tools: "var(--dshd-indigo)";
    readonly systemPrompt: "var(--dshd-muted)";
    readonly steering: "var(--dshd-amber)";
};
