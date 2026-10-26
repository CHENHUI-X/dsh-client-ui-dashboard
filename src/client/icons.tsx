type IconName = "overview" | "analysis" | "requests" | "agents" | "arrow" | "chevron";
const paths: Record<IconName, string> = {
  overview: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  analysis: "M4 20V10m8 10V4m8 16v-7M2 21h20",
  requests: "m4 7 4 5-4 5m7 0h9M3 3h18v18H3z",
  agents: "M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M4 21v-2a8 8 0 0 1 16 0v2M3 8v7m18-7v7",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  chevron: "m6 9 6 6 6-6",
};
export function DashboardIcon({ name }: { name: IconName }): JSX.Element {
  return <svg className="dshd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
