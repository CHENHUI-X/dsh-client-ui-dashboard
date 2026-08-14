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
    readonly user: "var(--dsw-alias-state-business-primary)";
    readonly assistant: "var(--dsw-alias-state-success-primary)";
    readonly system: "var(--dsw-alias-state-warn-primary)";
    readonly tool: "var(--dsw-alias-state-error-primary)";
    readonly other: "var(--dsw-alias-label-tertiary)";
    readonly input: "var(--dsw-alias-state-business-primary)";
    readonly cacheRead: "var(--dsw-alias-state-success-primary)";
    readonly cacheWrite: "var(--dsw-alias-state-warn-primary)";
    readonly output: "var(--dsw-alias-state-error-primary)";
    readonly reasoning: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)";
    readonly llm: "var(--dsw-alias-state-business-primary)";
    readonly toolTime: "var(--dsw-alias-state-warn-primary)";
    readonly messages: "var(--dsw-alias-state-business-primary)";
    readonly tools: "var(--dsw-alias-state-error-primary)";
    readonly systemPrompt: "var(--dsw-alias-state-warn-primary)";
    readonly steering: "color-mix(in srgb, var(--dsw-alias-state-business-primary) 55%, var(--dsw-alias-state-warn-primary) 45%)";
};
