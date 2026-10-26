# DSH session observatory

The first screen should show the execution signature of the current conversation: recent request durations, failures and ongoing work. Use actual loaded requests; no synthetic activity. Keep the four existing sections, host navigation and data semantics.

The previous equal-height metric strip still looked like a generic analytics template. Replace it with a request record and a compact performance ledger, then a borderless usage section. One memorable element: the real request sequence. All text aligns left; values align right in the ledger. No decorative entrance effects, remote assets or new dependencies.

Layout: header and navigation / request sequence beside performance ledger / input-output-cache band / context and timing. On narrow panes the ledger moves below the sequence. Source guidance: Anthropic frontend-design, installed 2026-10-26.

Usage & performance: lead with cumulative tool timing and clearly identify user-waiting calls. Keep one main analysis surface beside a light model ledger; group turns, messages and injection sources in an unboxed support band. Put rare diagnostics behind a disclosure, retaining a visible failed-request shortcut. Compress duplicate header layers and reserve a separate resident composer area. Tool timing sums are not session elapsed time.
