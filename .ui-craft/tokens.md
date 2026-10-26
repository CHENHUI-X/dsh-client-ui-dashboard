# Observatory design tokens

Palette references: cloud #F5F7FA, ink #1C2738, cobalt #4565D9, teal #267E77, muted violet #78759E, error red #C14848. The host owns text, accent, surface and error tokens and supplies dark-mode equivalents. Teal denotes caching; violet denotes output; red marks failures. Plot rules represent duration scale, not decoration.

Typography: local Avenir Next for the observatory's measured, humanist numerals, PingFang SC for Chinese, system sans fallback. IDs retain the host monospace. Header 18px, analysis heading 20px, request heading 21px, count 34px, usage 30px, ledger 20px, body 13px and metadata 11–12px. Use tabular numbers. Do not uppercase table headings.

Layout: compact single-row desktop navigation; one 12px analysis workspace with a 300px shaded model sidebar. The unboxed support band uses three columns. Amber fill #D1A762 marks tool calls that include user waiting; teal marks the other timed calls. The tool table sorts by cumulative duration; durations below one second use milliseconds. The dashboard scrollport reserves the host composer’s measured height instead of enabling its floating overlay. Analysis collapses at 700px; the header wraps at 1050px. Keep reduced motion and visible keyboard focus. No new font or chart dependency.
