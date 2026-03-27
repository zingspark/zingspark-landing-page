import { existsSync } from "node:fs";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const docsDir = path.join(root, "docs");

if (!existsSync(outDir)) {
  console.error(
    `Missing "${outDir}". Run "next build" (with output: 'export') first.`,
  );
  process.exit(1);
}

await rm(docsDir, { recursive: true, force: true });
await mkdir(docsDir, { recursive: true });
await cp(outDir, docsDir, { recursive: true });
await writeFile(path.join(docsDir, ".nojekyll"), "");
