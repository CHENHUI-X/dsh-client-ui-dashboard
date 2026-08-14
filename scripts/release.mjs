/**
 * Release preparation (run BEFORE publishing, only when the user asks):
 *   1. Bumps the patch version in package.json (SemVer).
 *   2. Collects commit messages since the last release and appends a
 *      summarized CHANGELOG entry (feat / fix / chore / docs buckets).
 *   3. Prints the new version + the changelog entry for the user to review.
 *
 * Publishing itself stays manual: the user confirms, then we commit/tag/push
 * and run `npm publish`. Run with: npm run release:prep
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const pkgPath = "package.json";
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

// --- 1. bump patch ---------------------------------------------------------
const [major, minor, patch] = pkg.version.split(".").map((n) => Number(n) || 0);
const next = `${major}.${minor}.${patch + 1}`;
pkg.version = next;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// --- 2. commits since the last release --------------------------------------
let log = "";
try {
  const lastTag = execSync("git describe --tags --abbrev=0", { encoding: "utf8" }).trim();
  log = execSync(`git log --oneline ${lastTag}..HEAD`, { encoding: "utf8" });
} catch {
  try {
    log = execSync("git log --oneline -20", { encoding: "utf8" });
  } catch {
    log = "";
  }
}
const lines = log
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .map((l) => l.replace(/^[0-9a-f]+\s*/, ""))
  .filter((m) => !/^(bump|chore: bump|Merge )/i.test(m) && m.length > 0);

const bucket = (re) => lines.filter((m) => re.test(m));
const feat = bucket(/^feat/i);
const fix = bucket(/^fix/i);
const chore = bucket(/^chore|^refactor|^perf/i);
const docs = bucket(/^docs/i);
const other = lines.filter((m) => !/^(feat|fix|chore|refactor|perf|docs)/i.test(m));

const entry = [
  `## ${next} (${new Date().toISOString().slice(0, 10)})`,
  "",
  ...(feat.length > 0 ? ["### 新增", ...feat.map((m) => `- ${m}`), ""] : []),
  ...(fix.length > 0 ? ["### 修复", ...fix.map((m) => `- ${m}`), ""] : []),
  ...(chore.length > 0 ? ["### 改进", ...chore.map((m) => `- ${m}`), ""] : []),
  ...(docs.length > 0 ? ["### 文档", ...docs.map((m) => `- ${m}`), ""] : []),
  ...(other.length > 0 ? ["### 其他", ...other.map((m) => `- ${m}`), ""] : [])
].join("\n");

// --- 3. write changelog (insert after the "# Changelog" intro) ---------------
const changelogPath = "CHANGELOG.md";
const changelog = readFileSync(changelogPath, "utf8");
const marker = "# Changelog";
const idx = changelog.indexOf(marker);
if (idx === -1) throw new Error("CHANGELOG.md must start with '# Changelog'");
const head = changelog.slice(0, idx + marker.length);
const tail = changelog.slice(idx + marker.length);
writeFileSync(changelogPath, `${head}\n\n${entry}${tail}`);

console.log(`\n版本已 bump:${next}`);
console.log("CHANGELOG 新增条目:\n");
console.log(entry);
console.log("接下来:typecheck → build → 冒烟验证,然后等用户确认后 commit/tag/push + npm publish。");
