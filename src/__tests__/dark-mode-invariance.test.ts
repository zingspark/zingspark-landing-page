/**
 * Feature: light-mode-color-polish, Property 1: 深色模式样式不变性
 *
 * Validates: Requirements 2.6, 3.6, 4.6, 5.5, 6.5, 7.4
 *
 * For all CSS custom properties and component styles with `.dark` selector
 * or `dark:` prefix, the values after optimization should remain identical
 * to the pre-optimization baseline. This ensures light-mode-only changes
 * do not accidentally affect dark mode.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import fc from "fast-check";
import { describe, expect, test } from "vitest";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Parse the `.dark { ... }` block from globals.css and extract all
 * CSS custom property declarations as key-value pairs.
 */
function parseDarkBlockVariables(cssContent: string): Record<string, string> {
  const vars: Record<string, string> = {};

  // Match top-level `.dark { ... }` block (not nested like `.dark .foo`)
  const darkBlockRegex = /^\.dark\s*\{([^}]+)\}/gm;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = darkBlockRegex.exec(cssContent)) !== null) {
    const blockBody = blockMatch[1];
    // Extract --variable: value pairs
    const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let varMatch: RegExpExecArray | null;
    while ((varMatch = varRegex.exec(blockBody)) !== null) {
      vars[varMatch[1].trim()] = varMatch[2].trim();
    }
  }

  return vars;
}

/**
 * Parse all `.dark .className { ... }` blocks from globals.css and extract
 * their full CSS declarations as a map of selector → declarations string.
 */
function parseDarkSelectorBlocks(cssContent: string): Record<string, string> {
  const blocks: Record<string, string> = {};

  // Match `.dark .something { ... }` blocks
  const darkSelectorRegex = /^(\.dark\s+\.[\w-]+(?:::[\w-]+)?)\s*\{([^}]+)\}/gm;
  let match: RegExpExecArray | null;

  while ((match = darkSelectorRegex.exec(cssContent)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();
    blocks[selector] = body;
  }

  return blocks;
}

/**
 * Extract all `dark:` prefixed Tailwind class names from a source file.
 * Returns a sorted, deduplicated array of class names.
 */
function extractDarkPrefixClasses(source: string): string[] {
  const classes = new Set<string>();
  // Match dark:xxx patterns in className strings, template literals, etc.
  const regex = /dark:[\w[\]/.#()-]+/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(source)) !== null) {
    classes.add(match[0]);
  }

  return [...classes].sort();
}

// ─── Baselines ──────────────────────────────────────────────────────────────

const globalsCssPath = resolve(process.cwd(), "src/app/globals.css");
const cssContent = readFileSync(globalsCssPath, "utf-8");

/**
 * Baseline snapshot: all CSS variables in the `.dark` block.
 * These values must remain unchanged after light-mode optimizations.
 */
const DARK_BLOCK_VARIABLES_BASELINE: Record<string, string> = {
  "--background": "oklch(0.065 0.02 265)",
  "--foreground": "oklch(0.96 0.005 250)",
  "--card": "oklch(0.1 0.025 265)",
  "--card-foreground": "oklch(0.96 0.005 250)",
  "--popover": "oklch(0.1 0.025 265)",
  "--popover-foreground": "oklch(0.96 0.005 250)",
  "--primary": "oklch(0.68 0.17 255)",
  "--primary-foreground": "oklch(0.065 0.02 265)",
  "--secondary": "oklch(0.15 0.03 265)",
  "--secondary-foreground": "oklch(0.96 0.005 250)",
  "--muted": "oklch(0.15 0.03 265)",
  "--muted-foreground": "oklch(0.65 0.02 255)",
  "--accent": "oklch(0.15 0.03 265)",
  "--accent-foreground": "oklch(0.96 0.005 250)",
  "--destructive": "oklch(0.704 0.191 22.216)",
  "--border": "oklch(1 0 0 / 10%)",
  "--input": "oklch(1 0 0 / 14%)",
  "--ring": "oklch(0.68 0.17 255)",
};

/**
 * Baseline snapshot: all `.dark .xxx` selector blocks in globals.css.
 * These CSS declarations must remain unchanged.
 */
const DARK_SELECTOR_BLOCKS_BASELINE: Record<string, string> =
  parseDarkSelectorBlocks(cssContent);

/**
 * Component files to check for `dark:` prefixed Tailwind classes.
 */
const COMPONENT_FILES = [
  "src/components/hero-section.tsx",
  "src/components/vision-section.tsx",
  "src/components/capability-section.tsx",
  "src/components/university-marquee.tsx",
  "src/components/jd-section.tsx",
  "src/components/recruitment-section.tsx",
  "src/components/site-header.tsx",
  "src/components/site-footer.tsx",
];

/**
 * Baseline snapshot: `dark:` prefixed classes per component file.
 * Built from the current (post-optimization) source files.
 */
const DARK_CLASSES_BASELINE: Record<string, string[]> = {};
for (const file of COMPONENT_FILES) {
  const filePath = resolve(process.cwd(), file);
  const source = readFileSync(filePath, "utf-8");
  DARK_CLASSES_BASELINE[file] = extractDarkPrefixClasses(source);
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("Feature: light-mode-color-polish, Property 1: 深色模式样式不变性", () => {
  // ── 1a: .dark block CSS variables match baseline ──

  test("all .dark CSS variables match the expected baseline values", () => {
    const actual = parseDarkBlockVariables(cssContent);

    // Ensure all baseline keys exist in actual
    const baselineKeys = Object.keys(DARK_BLOCK_VARIABLES_BASELINE);
    expect(baselineKeys.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...baselineKeys), (varName) => {
        expect(
          actual[varName],
          `.dark block: CSS variable "${varName}" is missing or changed.\n` +
            `Expected: ${DARK_BLOCK_VARIABLES_BASELINE[varName]}\n` +
            `Actual:   ${actual[varName] ?? "(missing)"}`,
        ).toBe(DARK_BLOCK_VARIABLES_BASELINE[varName]);
      }),
      { numRuns: 100 },
    );
  });

  test(".dark block has no extra unexpected CSS variables beyond baseline", () => {
    const actual = parseDarkBlockVariables(cssContent);
    const actualKeys = Object.keys(actual);
    const baselineKeys = new Set(Object.keys(DARK_BLOCK_VARIABLES_BASELINE));

    for (const key of actualKeys) {
      expect(
        baselineKeys.has(key),
        `.dark block: unexpected extra CSS variable "${key}" found with value "${actual[key]}"`,
      ).toBe(true);
    }
  });

  // ── 1b: .dark selector blocks in globals.css match baseline ──

  test("all .dark selector blocks in globals.css match baseline declarations", () => {
    const actual = parseDarkSelectorBlocks(cssContent);
    const baselineSelectors = Object.keys(DARK_SELECTOR_BLOCKS_BASELINE);

    if (baselineSelectors.length === 0) {
      // No .dark .xxx blocks found — that's fine, skip
      return;
    }

    fc.assert(
      fc.property(fc.constantFrom(...baselineSelectors), (selector) => {
        expect(
          actual[selector],
          `globals.css: dark selector block "${selector}" is missing or changed.\n` +
            `Expected declarations:\n${DARK_SELECTOR_BLOCKS_BASELINE[selector]}\n` +
            `Actual declarations:\n${actual[selector] ?? "(missing)"}`,
        ).toBe(DARK_SELECTOR_BLOCKS_BASELINE[selector]);
      }),
      { numRuns: 100 },
    );
  });

  // ── 1c: dark: prefixed Tailwind classes in components match baseline ──

  test("all dark: prefixed Tailwind classes in component files match baseline", () => {
    const filesWithDarkClasses = COMPONENT_FILES.filter(
      (f) => DARK_CLASSES_BASELINE[f].length > 0,
    );

    expect(
      filesWithDarkClasses.length,
      "Expected at least one component file to contain dark: prefixed classes",
    ).toBeGreaterThan(0);

    // Build entries: { file, darkClass }
    const entries: { file: string; darkClass: string }[] = [];
    for (const file of filesWithDarkClasses) {
      for (const cls of DARK_CLASSES_BASELINE[file]) {
        entries.push({ file, darkClass: cls });
      }
    }

    fc.assert(
      fc.property(fc.constantFrom(...entries), (entry) => {
        const filePath = resolve(process.cwd(), entry.file);
        const source = readFileSync(filePath, "utf-8");
        const actualClasses = extractDarkPrefixClasses(source);

        expect(
          actualClasses.includes(entry.darkClass),
          `${entry.file}: dark: class "${entry.darkClass}" is missing from the current source.\n` +
            `Baseline dark: classes: ${DARK_CLASSES_BASELINE[entry.file].join(", ")}`,
        ).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  test("no new unexpected dark: classes added to component files beyond baseline", () => {
    for (const file of COMPONENT_FILES) {
      const filePath = resolve(process.cwd(), file);
      const source = readFileSync(filePath, "utf-8");
      const actualClasses = extractDarkPrefixClasses(source);
      const baselineSet = new Set(DARK_CLASSES_BASELINE[file]);

      for (const cls of actualClasses) {
        expect(
          baselineSet.has(cls),
          `${file}: unexpected new dark: class "${cls}" found that is not in the baseline`,
        ).toBe(true);
      }
    }
  });

  // ── 1d: Random subset sampling verification ──

  test("random subsets of dark CSS variables all match baseline (sampling)", () => {
    const baselineKeys = Object.keys(DARK_BLOCK_VARIABLES_BASELINE);
    const actual = parseDarkBlockVariables(cssContent);

    fc.assert(
      fc.property(fc.subarray(baselineKeys, { minLength: 1 }), (subset) => {
        for (const varName of subset) {
          expect(actual[varName]).toBe(DARK_BLOCK_VARIABLES_BASELINE[varName]);
        }
      }),
      { numRuns: 100 },
    );
  });

  test("random subsets of dark: classes from random files all match baseline (sampling)", () => {
    const filesWithDarkClasses = COMPONENT_FILES.filter(
      (f) => DARK_CLASSES_BASELINE[f].length > 0,
    );

    if (filesWithDarkClasses.length === 0) return;

    fc.assert(
      fc.property(fc.constantFrom(...filesWithDarkClasses), (file) => {
        const baseline = DARK_CLASSES_BASELINE[file];
        const filePath = resolve(process.cwd(), file);
        const source = readFileSync(filePath, "utf-8");
        const actual = extractDarkPrefixClasses(source);

        // Every baseline class must exist in actual
        for (const cls of baseline) {
          expect(
            actual.includes(cls),
            `${file}: baseline dark: class "${cls}" missing from current source`,
          ).toBe(true);
        }

        // No extra classes beyond baseline
        const baselineSet = new Set(baseline);
        for (const cls of actual) {
          expect(
            baselineSet.has(cls),
            `${file}: unexpected dark: class "${cls}" not in baseline`,
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});
