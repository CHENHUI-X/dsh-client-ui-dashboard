/**
 * Build script: produces the publishable `lib/` artifact tree from `src/`.
 *
 *   lib/index.js      — host half (plain ESM; no host behavior)
 *   lib/client.js     — browser half: the `window.__ModuleLoader__.load`
 *                       bundle the dsh shell kernel executes
 *   lib/types/**      — declaration files (tsc)
 *
 * The client bundle follows the exact wire format of the shipped
 * `@deepseek-ai/dsh-client-*` packages: a lazy CJS factory registered under
 * the package id. Runtime imports stay external (react + the module-table
 * graph) so the shell resolves them from its own module table.
 */
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const lib = join(root, "lib");
const tmp = join(root, ".tmp");

const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const PACKAGE_NAME = pkg.name;

await rm(lib, { recursive: true, force: true });
await rm(tmp, { recursive: true, force: true });
await mkdir(lib, { recursive: true });
await mkdir(tmp, { recursive: true });

const externals = ["react", "react/jsx-runtime", "react-dom", "react-dom/client", "@deepseek-ai/*"];

// ── 1. browser half: bundle → __ModuleLoader__.load wrapper ─────────────────
await build({
  entryPoints: [join(root, "src/client/index.ts")],
  outfile: join(tmp, "client.cjs"),
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  external: externals,
  minify: false,
  sourcemap: false,
  logLevel: "warning"
});

const clientBody = await readFile(join(tmp, "client.cjs"), "utf8");
const indented = clientBody
  .split("\n")
  .map((line) => (line.length === 0 ? line : `\t\t${line}`))
  .join("\n");

const clientBundle = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(PACKAGE_NAME)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
${indented}
\t\treturn module.exports;
\t}
});
`;
await writeFile(join(lib, "client.js"), clientBundle);

// ── 2. host half: plain ESM ────────────────────────────────────────────────
await build({
  entryPoints: [join(root, "src/index.ts")],
  outfile: join(lib, "index.js"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2022",
  logLevel: "warning"
});

// ── 3. declarations ─────────────────────────────────────────────────────────
execFileSync(
  process.execPath,
  [join(root, "node_modules/typescript/bin/tsc"), "-p", join(root, "tsconfig.build.json")],
  { stdio: "inherit" }
);

await rm(tmp, { recursive: true, force: true });

// ── 4. syntax smoke test ────────────────────────────────────────────────────
execFileSync(process.execPath, ["--check", join(lib, "client.js")], { stdio: "inherit" });

console.log(`\nbuilt ${PACKAGE_NAME} → lib/`);
console.log("  lib/index.js   (host half)");
console.log("  lib/client.js  (browser bundle, __ModuleLoader__.load format)");
console.log("  lib/types/**   (declarations)");
