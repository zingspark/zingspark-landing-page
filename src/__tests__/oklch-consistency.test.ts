/**
 * Feature: light-mode-color-polish, Property 3: oklch 色彩空间一致性
 *
 * Validates: Requirements 7.5
 *
 * For all CSS custom properties in :root and .dark blocks of globals.css,
 * every color-type variable value should use the oklch(...) format.
 * This includes both `oklch(L C H)` and `oklch(L C H / alpha%)` variants.
 * Non-color variables (e.g. --radius) are excluded.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import fc from "fast-check";
import { describe, expect, test } from "vitest";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Regex that matches oklch values:
 * - oklch(L C H)
 * - oklch(L C H / alpha%)
 * - oklch(0 0 0 / 15%)
 */
const OKLCH_REGEX = /^oklch\(.+\)$/;

/**
 * Non-color CSS variable names to exclude from oklch validation.
 * These variables hold non-color values (lengths, radii, etc.).
 */
const NON_COLOR_VARS = new Set(["--radius"]);

/**
 * Parse a CSS block (the content between { and }) and extract
 * all CSS custom property declarations as key-value pairs.
 */
function parseBlockVariables(blockBody: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const varRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(blockBody)) !== null) {
    vars[match[1].trim()] = match[2].trim();
  }
  return vars;
}

/**
 * Extract all CSS variables from the :root block.
 */
function parseRootVariables(cssContent: string): Record<string, string> {
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  if (!rootMatch) return {};
  return parseBlockVariables(rootMatch[1]);
}

/**
 * Extract all CSS variables from the .dark block.
 */
function parseDarkVariables(cssContent: string): Record<string, string> {
  const darkMatch = cssContent.match(/^\.dark\s*\{([^}]+)\}/m);
  if (!darkMatch) return {};
  return parseBlockVariables(darkMatch[1]);
}

/**
 * Filter out non-color variables, keeping only color-type CSS custom properties.
 */
function filterColorVariables(
  vars: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (!NON_COLOR_VARS.has(key)) {
      result[key] = value;
    }
  }
  return result;
}

// ─── Load CSS ───────────────────────────────────────────────────────────────

const globalsCssPath = resolve(process.cwd(), "src/app/globals.css");
const cssContent = readFileSync(globalsCssPath, "utf-8");

const rootColorVars = filterColorVariables(parseRootVariables(cssContent));
const darkColorVars = filterColorVariables(parseDarkVariables(cssContent));

const rootEntries = Object.entries(rootColorVars);
const darkEntries = Object.entries(darkColorVars);
const allEntries = [
  ...rootEntries.map(([k, v]) => ({ block: ":root", name: k, value: v })),
  ...darkEntries.map(([k, v]) => ({ block: ".dark", name: k, value: v })),
];

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("Feature: light-mode-color-polish, Property 3: oklch 色彩空间一致性", () => {
  /**
   * Validates: Requirements 7.5
   *
   * Verify all :root color variables use oklch format.
   */
  test("all :root color variables use oklch format", () => {
    expect(rootEntries.length).toBeGreaterThan(0);

    for (const [name, value] of rootEntries) {
      expect(
        OKLCH_REGEX.test(value),
        `:root variable "${name}" does not use oklch format. Value: "${value}"`,
      ).toBe(true);
    }
  });

  /**
   * Validates: Requirements 7.5
   *
   * Verify all .dark color variables use oklch format.
   */
  test("all .dark color variables use oklch format", () => {
    expect(darkEntries.length).toBeGreaterThan(0);

    for (const [name, value] of darkEntries) {
      expect(
        OKLCH_REGEX.test(value),
        `.dark variable "${name}" does not use oklch format. Value: "${value}"`,
      ).toBe(true);
    }
  });

  /**
   * Validates: Requirements 7.5
   *
   * Property test: randomly sample variable name subsets from both :root and .dark,
   * verify each sampled variable uses oklch format.
   * Uses fast-check with at least 100 iterations.
   */
  test("random subsets of color variables all use oklch format (property-based sampling)", () => {
    expect(allEntries.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.subarray(allEntries, { minLength: 1 }), (subset) => {
        for (const entry of subset) {
          expect(
            OKLCH_REGEX.test(entry.value),
            `${entry.block} variable "${entry.name}" does not use oklch format. Value: "${entry.value}"`,
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Validates: Requirements 7.5
   *
   * Property test: for any randomly chosen single variable from the combined set,
   * it should match the oklch regex.
   */
  test("any randomly chosen color variable uses oklch format", () => {
    expect(allEntries.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...allEntries), (entry) => {
        expect(
          OKLCH_REGEX.test(entry.value),
          `${entry.block} variable "${entry.name}" does not use oklch format. Value: "${entry.value}"`,
        ).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Validates: Requirements 7.5
   *
   * Verify that non-color variables (like --radius) are correctly excluded
   * and that we have a reasonable number of color variables in each block.
   */
  test("color variable extraction excludes non-color vars like --radius", () => {
    const allRootVars = parseRootVariables(cssContent);
    expect(allRootVars).toHaveProperty("--radius");
    expect(rootColorVars).not.toHaveProperty("--radius");
    // :root should have many color variables
    expect(rootEntries.length).toBeGreaterThanOrEqual(10);
    // .dark should have many color variables
    expect(darkEntries.length).toBeGreaterThanOrEqual(10);
  });
});
