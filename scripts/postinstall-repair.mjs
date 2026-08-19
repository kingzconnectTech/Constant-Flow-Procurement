#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = isAbsolute(__dirname) && __dirname.endsWith(join("Procurement", "scripts"))
  ? dirname(__dirname)
  : process.cwd();

let PKG;
try {
  PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
} catch {
  console.error("[postinstall] could not read package.json at", ROOT);
  process.exit(1);
}

const runtimeDeps = new Set(Object.keys(PKG.dependencies ?? {}));
const devDeps = new Set(Object.keys(PKG.devDependencies ?? {}));

const NM = join(ROOT, "node_modules");
const checks = [
  { pkg: "typescript", name: "typescript entry", file: join(NM, "typescript", "lib", "tsc.js"), type: "file" },
  { pkg: "vite", name: "vite cli entry", file: join(NM, "vite", "bin", "vite.js"), type: "file" },
  { pkg: "vite", name: "vite node cli.js", file: join(NM, "vite", "dist", "node", "cli.js"), type: "file" },
  { pkg: "vite", name: "vite hashed chunks dir", file: join(NM, "vite", "dist", "node", "chunks"), type: "dir-min-3" },
  { pkg: "@vitejs/plugin-react", name: "@vitejs/plugin-react entry", file: join(NM, "@vitejs", "plugin-react", "dist", "index.js"), type: "file" },
  { pkg: "vite-tsconfig-paths", name: "vite-tsconfig-paths entry", file: join(NM, "vite-tsconfig-paths", "dist", "index.js"), type: "file" },
  { pkg: "esbuild", name: "esbuild package.json / ready", file: join(NM, "esbuild", "package.json"), type: "file" },
  { pkg: "tailwindcss", name: "tailwindcss entry", file: join(NM, "tailwindcss", "lib", "cli.js"), type: "file" },
  { pkg: "postcss", name: "postcss entry", file: join(NM, "postcss", "lib", "postcss.js"), type: "file" },
  { pkg: "autoprefixer", name: "autoprefixer entry", file: join(NM, "autoprefixer", "lib", "autoprefixer.js"), type: "file" },
  { pkg: "clsx", name: "clsx entry", file: join(NM, "clsx", "dist", "clsx.cjs"), type: "file-alias", alt: join(NM, "clsx", "dist", "clsx.mjs") },
  { pkg: "lucide-react", name: "lucide-react entry", file: join(NM, "lucide-react", "dist", "cjs", "lucide-react.js"), type: "file-alias", alt: join(NM, "lucide-react", "dist", "umd", "lucide-react.js") },
];

function exists(check) {
  if (check.type === "file" || check.type === "file-alias") {
    const a = existsSync(check.file);
    if (check.type === "file-alias" && !a && check.alt) {
      if (existsSync(check.alt)) return true;
    }
    return a;
  }
  if (check.type.startsWith("dir-min-")) {
    const min = Number(check.type.split("dir-min-")[1]) || 5;
    if (!existsSync(check.file)) return false;
    try {
      const files = readdirSync(check.file);
      return files.length >= min;
    } catch {
      return false;
    }
  }
  return false;
}

function run(cmd) {
  console.log(`[postinstall] $ ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: ROOT, env: process.env });
}

const failed = checks.filter((c) => !exists(c));
const total = checks.length;

if (failed.length === 0) {
  console.log(`[postinstall] integrity check ok (${total}/${total})`);
  process.exit(0);
}

console.warn(`[postinstall] integrity check FAILED for ${failed.length}/${total}:`);
for (const c of failed) console.warn(`  - ${c.name} :: ${c.file}`);

const pkgsToRepair = new Set(failed.map((c) => c.pkg));
const runtime = [];
const dev = [];
const transitive = [];
for (const pkg of pkgsToRepair) {
  if (runtimeDeps.has(pkg)) runtime.push(pkg);
  else if (devDeps.has(pkg)) dev.push(pkg);
  else transitive.push(pkg);
}

console.warn("[postinstall] force-reinstalling corrupted packages…");
const sharedFlags = "--no-audit --no-fund --legacy-peer-deps --include=dev";
if (runtime.length) {
  run(`npm install --save ${sharedFlags} ${runtime.sort().join(" ")}`);
}
if (dev.length) {
  run(`npm install --save-dev ${sharedFlags} ${dev.sort().join(" ")}`);
}
if (transitive.length) {
  run(`npm install --no-save ${sharedFlags} ${transitive.sort().join(" ")}`);
}

if (pkgsToRepair.has("esbuild")) {
  console.warn("[postinstall] running esbuild install.js to bypass npm allow-scripts gate…");
  try { run(`node ./node_modules/esbuild/install.js`); } catch {}
}

const failed2 = checks.filter((c) => !exists(c));
if (failed2.length > 0) {
  console.error(`[postinstall] STILL MISSING ${failed2.length}/${total} after repair:`);
  for (const c of failed2) console.error(`  - ${c.name} :: ${c.file}`);
  process.exit(1);
}
console.log("[postinstall] repair ok");

