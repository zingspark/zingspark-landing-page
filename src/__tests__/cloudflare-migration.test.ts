/**
 * Cloudflare Migration Verification Tests
 *
 * Validates that the migration from Netlify to Cloudflare Pages
 * has been completed correctly across all requirements.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const root = process.cwd();

// ─── 6.1 验证 Netlify 配置已移除 (Requirements 1.1, 1.2, 1.3) ────────────

describe("6.1 Netlify 配置已移除", () => {
  test("netlify.toml does not exist at project root", () => {
    expect(existsSync(resolve(root, "netlify.toml"))).toBe(false);
  });

  test(".netlify/ directory does not exist", () => {
    expect(existsSync(resolve(root, ".netlify"))).toBe(false);
  });

  test("package.json contains no netlify-related dependencies or scripts", () => {
    const content = readFileSync(resolve(root, "package.json"), "utf-8");
    expect(content.toLowerCase()).not.toContain("netlify");
  });
});

// ─── 6.2 验证 _redirects 文件正确性 (Requirements 2.1, 2.2) ───────────────

describe("6.2 _redirects 文件正确性", () => {
  const redirectsPath = resolve(root, "public/_redirects");

  test("public/_redirects exists", () => {
    expect(existsSync(redirectsPath)).toBe(true);
  });

  test("contains the rule '/ /en/ 302'", () => {
    const content = readFileSync(redirectsPath, "utf-8");
    expect(content).toContain("/ /en/ 302");
  });
});


// ─── 6.3 验证 _headers 文件正确性 (Requirements 3.1, 3.2) ─────────────────

describe("6.3 _headers 文件正确性", () => {
  const headersPath = resolve(root, "public/_headers");

  test("public/_headers exists", () => {
    expect(existsSync(headersPath)).toBe(true);
  });

  test("contains /_next/static/* path with correct Cache-Control header", () => {
    const content = readFileSync(headersPath, "utf-8");
    expect(content).toContain("/_next/static/*");
    expect(content).toContain(
      "Cache-Control: public, max-age=31536000, immutable",
    );
  });
});

// ─── 6.4 验证 GitHub Actions 工作流正确性 (Requirements 4.1–4.5) ──────────

describe("6.4 GitHub Actions 工作流正确性", () => {
  const workflowPath = resolve(root, ".github/workflows/deploy.yml");

  test(".github/workflows/deploy.yml exists", () => {
    expect(existsSync(workflowPath)).toBe(true);
  });

  test("triggers on push to main branch", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toMatch(/on:\s*\n\s+push:\s*\n\s+branches:\s*\n\s+-\s*main/);
  });

  test("contains pnpm install and pnpm build steps", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("pnpm install");
    expect(content).toContain("pnpm build");
  });

  test("uses cloudflare/wrangler-action for deployment", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("cloudflare/wrangler-action");
  });

  test("references CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("CLOUDFLARE_API_TOKEN");
    expect(content).toContain("CLOUDFLARE_ACCOUNT_ID");
  });
});

// ─── 6.5 验证 Next.js 配置保持不变 (Requirements 5.1, 5.2, 5.3) ──────────

describe("6.5 Next.js 配置保持不变", () => {
  const configPath = resolve(root, "next.config.ts");

  test("contains output: \"export\" configuration", () => {
    const content = readFileSync(configPath, "utf-8");
    // Matches both `output: "export"` and conditional like `isDev ? undefined : "export"`
    expect(content).toMatch(/output:.*["']export["']/);
  });

  test("contains trailingSlash: true", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toMatch(/trailingSlash:\s*(true|!isDev)/);
  });

  test("contains unoptimized: true (for images)", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toMatch(/unoptimized:\s*true/);
  });
});

// ─── 6.6 验证 GitHub Pages 文档兼容性 (Requirements 6.1, 6.2) ────────────

describe("6.6 GitHub Pages 文档兼容性", () => {
  test("package.json contains build:docs script", () => {
    const pkg = JSON.parse(
      readFileSync(resolve(root, "package.json"), "utf-8"),
    );
    expect(pkg.scripts["build:docs"]).toBeDefined();
  });

  test("scripts/copy-out-to-docs.mjs exists", () => {
    expect(
      existsSync(resolve(root, "scripts/copy-out-to-docs.mjs")),
    ).toBe(true);
  });
});

// ─── 6.7 验证 .gitignore 正确性 (Requirements 7.1, 7.2) ──────────────────

describe("6.7 .gitignore 正确性", () => {
  const gitignorePath = resolve(root, ".gitignore");

  test("contains .netlify ignore rule", () => {
    const content = readFileSync(gitignorePath, "utf-8");
    expect(content).toContain(".netlify");
  });

  test("does NOT contain _redirects or _headers as ignored patterns", () => {
    const content = readFileSync(gitignorePath, "utf-8");
    const lines = content.split("\n").map((l) => l.trim());
    const ignoreLines = lines.filter((l) => l && !l.startsWith("#"));
    for (const line of ignoreLines) {
      expect(line).not.toMatch(/^_redirects$/);
      expect(line).not.toMatch(/^_headers$/);
    }
  });
});
