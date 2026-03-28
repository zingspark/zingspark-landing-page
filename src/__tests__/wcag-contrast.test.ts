/**
 * Feature: light-mode-color-polish, Property 2: 辅助文字 WCAG AA 对比度
 *
 * Validates: Requirements 2.3
 *
 * For any light-mode --muted-foreground and --background color combination,
 * the WCAG contrast ratio should be >= 4.5:1 (AA level for normal text).
 *
 * This test:
 * 1. Implements oklch → sRGB → relative luminance conversion
 * 2. Implements WCAG contrast ratio calculation
 * 3. Verifies actual CSS variable values meet the threshold
 * 4. Uses fast-check to fuzz-test the contrast calculation pipeline
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import fc from "fast-check";
import { describe, expect, test } from "vitest";

// ─── oklch → sRGB conversion helpers ────────────────────────────────────────

/**
 * Convert oklch(L, C, H) to oklab(L, a, b).
 * L is lightness [0,1], C is chroma >= 0, H is hue in degrees.
 */
function oklchToOklab(
  L: number,
  C: number,
  H: number,
): [number, number, number] {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  return [L, a, b];
}

/**
 * Convert oklab(L, a, b) to linear sRGB (r, g, b) in [0,1].
 * Uses the standard OKLab → linear sRGB matrix via LMS intermediate.
 */
function oklabToLinearSrgb(
  L: number,
  a: number,
  b: number,
): [number, number, number] {
  // OKLab → LMS (cube root domain)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  // Undo cube root
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // LMS → linear sRGB
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bOut = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return [r, g, bOut];
}

/**
 * Apply sRGB gamma (linear → sRGB transfer function) to a single channel.
 */
function linearToSrgbGamma(c: number): number {
  if (c <= 0.0031308) {
    return 12.92 * c;
  }
  return 1.055 * c ** (1 / 2.4) - 0.055;
}

/**
 * Convert oklch(L, C, H) to sRGB [0,1] values (clamped).
 */
function oklchToSrgb(
  L: number,
  C: number,
  H: number,
): [number, number, number] {
  const [labL, labA, labB] = oklchToOklab(L, C, H);
  const [lr, lg, lb] = oklabToLinearSrgb(labL, labA, labB);
  return [
    Math.max(0, Math.min(1, linearToSrgbGamma(lr))),
    Math.max(0, Math.min(1, linearToSrgbGamma(lg))),
    Math.max(0, Math.min(1, linearToSrgbGamma(lb))),
  ];
}

// ─── WCAG relative luminance & contrast ratio ───────────────────────────────

/**
 * Compute WCAG 2.x relative luminance from sRGB [0,1] values.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function srgbToRelativeLuminance(r: number, g: number, b: number): number {
  const linearize = (c: number) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Compute WCAG contrast ratio between two relative luminance values.
 * Returns a value >= 1.
 */
function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Full pipeline: compute WCAG contrast ratio between two oklch colors.
 */
function wcagContrastFromOklch(
  L1: number,
  C1: number,
  H1: number,
  L2: number,
  C2: number,
  H2: number,
): number {
  const [r1, g1, b1] = oklchToSrgb(L1, C1, H1);
  const [r2, g2, b2] = oklchToSrgb(L2, C2, H2);
  const lum1 = srgbToRelativeLuminance(r1, g1, b1);
  const lum2 = srgbToRelativeLuminance(r2, g2, b2);
  return contrastRatio(lum1, lum2);
}

// ─── Parse oklch values from CSS ────────────────────────────────────────────

/**
 * Parse an oklch(L C H) string and return [L, C, H].
 */
function parseOklch(value: string): [number, number, number] {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) {
    throw new Error(`Cannot parse oklch value: "${value}"`);
  }
  return [
    Number.parseFloat(match[1]),
    Number.parseFloat(match[2]),
    Number.parseFloat(match[3]),
  ];
}

/**
 * Extract a CSS variable value from the :root block of globals.css.
 */
function extractRootVariable(cssContent: string, varName: string): string {
  // Match :root { ... } block
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  if (!rootMatch) throw new Error(":root block not found in CSS");
  const body = rootMatch[1];
  const varRegex = new RegExp(
    `${varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*([^;]+);`,
  );
  const match = body.match(varRegex);
  if (!match) throw new Error(`Variable ${varName} not found in :root`);
  return match[1].trim();
}

// ─── Actual CSS values ──────────────────────────────────────────────────────

const globalsCssPath = resolve(process.cwd(), "src/app/globals.css");
const cssContent = readFileSync(globalsCssPath, "utf-8");

const mutedFgValue = extractRootVariable(cssContent, "--muted-foreground");
const bgValue = extractRootVariable(cssContent, "--background");

const [mfL, mfC, mfH] = parseOklch(mutedFgValue);
const [bgL, bgC, bgH] = parseOklch(bgValue);

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("Feature: light-mode-color-polish, Property 2: 辅助文字 WCAG AA 对比度", () => {
  /**
   * Validates: Requirements 2.3
   *
   * Verify the actual --muted-foreground and --background values
   * have WCAG AA contrast >= 4.5:1.
   */
  test("actual --muted-foreground vs --background contrast >= 4.5:1 (WCAG AA)", () => {
    const ratio = wcagContrastFromOklch(mfL, mfC, mfH, bgL, bgC, bgH);
    expect(
      ratio,
      `WCAG contrast ratio between --muted-foreground (${mutedFgValue}) and ` +
        `--background (${bgValue}) is ${ratio.toFixed(4)}, expected >= 4.5`,
    ).toBeGreaterThanOrEqual(4.5);
  });

  /**
   * Validates: Requirements 2.3
   *
   * Property: contrast ratio is always >= 1 for any two colors.
   * Uses fast-check to generate random oklch color pairs and verify
   * the contrast calculation function always returns >= 1.
   */
  test("contrast ratio is always >= 1 for any random oklch pair", () => {
    const oklchArb = fc.record({
      L: fc.double({ min: 0, max: 1, noNaN: true }),
      C: fc.double({ min: 0, max: 0.4, noNaN: true }),
      H: fc.double({ min: 0, max: 360, noNaN: true }),
    });

    fc.assert(
      fc.property(oklchArb, oklchArb, (color1, color2) => {
        const ratio = wcagContrastFromOklch(
          color1.L,
          color1.C,
          color1.H,
          color2.L,
          color2.C,
          color2.H,
        );
        expect(ratio).toBeGreaterThanOrEqual(1);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Validates: Requirements 2.3
   *
   * Property: contrast ratio is symmetric — contrast(a, b) === contrast(b, a).
   * Uses fast-check to verify symmetry across random oklch pairs.
   */
  test("contrast ratio is symmetric: contrast(a,b) === contrast(b,a)", () => {
    const oklchArb = fc.record({
      L: fc.double({ min: 0, max: 1, noNaN: true }),
      C: fc.double({ min: 0, max: 0.4, noNaN: true }),
      H: fc.double({ min: 0, max: 360, noNaN: true }),
    });

    fc.assert(
      fc.property(oklchArb, oklchArb, (color1, color2) => {
        const ratio1 = wcagContrastFromOklch(
          color1.L,
          color1.C,
          color1.H,
          color2.L,
          color2.C,
          color2.H,
        );
        const ratio2 = wcagContrastFromOklch(
          color2.L,
          color2.C,
          color2.H,
          color1.L,
          color1.C,
          color1.H,
        );
        expect(ratio1).toBeCloseTo(ratio2, 10);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Validates: Requirements 2.3
   *
   * Property: identical colors always produce contrast ratio of exactly 1.
   * Uses fast-check to verify this identity property.
   */
  test("identical colors always produce contrast ratio of 1", () => {
    const oklchArb = fc.record({
      L: fc.double({ min: 0, max: 1, noNaN: true }),
      C: fc.double({ min: 0, max: 0.4, noNaN: true }),
      H: fc.double({ min: 0, max: 360, noNaN: true }),
    });

    fc.assert(
      fc.property(oklchArb, (color) => {
        const ratio = wcagContrastFromOklch(
          color.L,
          color.C,
          color.H,
          color.L,
          color.C,
          color.H,
        );
        expect(ratio).toBeCloseTo(1, 10);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * Validates: Requirements 2.3
   *
   * Property: black vs white should produce the maximum contrast ratio (21:1).
   * oklch black = (0, 0, 0), oklch white = (1, 0, 0).
   */
  test("black vs white produces maximum contrast ratio of 21:1", () => {
    const ratio = wcagContrastFromOklch(0, 0, 0, 1, 0, 0);
    expect(ratio).toBeCloseTo(21, 0);
  });
});
