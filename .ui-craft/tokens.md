# Observatory design tokens

Palette references: cloud #F5F7FA, ink #1C2738, cobalt #4565D9, teal #267E77, muted violet #78759E, error red #C14848. The host owns text, accent, surface and error tokens and supplies dark-mode equivalents. Teal denotes caching; violet denotes output; red marks failures. Plot rules represent duration scale, not decoration.

Typography: local Avenir Next for the observatory's measured, humanist numerals, PingFang SC for Chinese, system sans fallback. IDs retain the host monospace. Header 26px, request heading 21px, count 34px, usage 30px, ledger 20px, body 13px and metadata 11–12px. Use tabular numbers. Do not uppercase table headings.

Layout: one 14px-radius request surface, 10px analysis surfaces, 6px controls; the usage band has no surrounding card. Existing container breakpoints remain 850px and 540px. Keep reduced motion and visible keyboard focus. No new font or chart dependency.
