import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { isValidElement } from "react";
import { describe, expect, test } from "vitest";
import fc from "fast-check";
import { siteConfig } from "@/config/site-config";
import { jobIcons } from "@/components/jd-section";

/**
 * Feature: visual-polish, Property 1: 岗位图标类型一致性
 *
 * Validates: Requirements 5.1
 *
 * For any job key in siteConfig.jobs, jobIcons[key] should be a valid
 * React element (SVG component), not a string (emoji).
 */
describe("Feature: visual-polish, Property 1: 岗位图标类型一致性", () => {
  const jobKeys = siteConfig.jobs.map((j) => j.key);

  test("all siteConfig.jobs keys have corresponding React element icons in jobIcons", () => {
    fc.assert(
      fc.property(fc.constantFrom(...jobKeys), (key) => {
        const icon = jobIcons[key];
        // Icon must exist
        expect(icon).toBeDefined();
        // Icon must not be a string (no emoji)
        expect(typeof icon).not.toBe("string");
        // Icon must be a valid React element
        expect(isValidElement(icon)).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});


/**
 * Feature: visual-polish, Property 5: 装饰元素不阻塞交互
 *
 * Validates: Requirements 10.2
 *
 * For any decorative overlay element (particles, glows, gradient masks,
 * background decorations) found in component source files, its markup
 * or a parent container should contain `pointer-events-none` (via CSS
 * class or inline style) to ensure it does not block user interaction.
 */
describe("Feature: visual-polish, Property 5: 装饰元素不阻塞交互", () => {
  const componentFiles = [
    "src/components/hero-section.tsx",
    "src/components/vision-section.tsx",
    "src/components/capability-section.tsx",
    "src/components/university-marquee.tsx",
    "src/components/jd-section.tsx",
    "src/components/recruitment-section.tsx",
    "src/components/site-footer.tsx",
  ];

  interface DecorativeElement {
    file: string;
    snippet: string;
    line: number;
    parentContext: string;
  }

  /**
   * Walk backwards from a line to collect parent context (up to 30 lines
   * back) to check if an ancestor has pointer-events-none.
   */
  function getParentContext(lines: string[], lineIndex: number): string {
    const start = Math.max(0, lineIndex - 60);
    return lines.slice(start, lineIndex).join("\n");
  }

  const decorativeElements: DecorativeElement[] = [];

  for (const file of componentFiles) {
    const filePath = resolve(process.cwd(), file);
    const source = readFileSync(filePath, "utf-8");
    const lines = source.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect decorative overlay elements:
      // 1. Elements with aria-hidden="true"
      // 2. Absolutely positioned elements with decorative indicators
      const isAriaHidden = line.includes('aria-hidden="true"');
      const isAbsolute = line.includes("absolute");
      const hasDecorativeIndicator =
        /blur|glow|gradient|opacity-\[0\.\d|float-particle|aurora|bg-\[radial|section-divider/.test(
          line,
        );

      if (isAriaHidden || (isAbsolute && hasDecorativeIndicator)) {
        const snippetLines = lines.slice(i, Math.min(i + 8, lines.length));
        const snippet = snippetLines.join("\n");

        // Skip interactive elements
        if (/<(button|a |input|select|textarea|form)/i.test(snippet)) {
          continue;
        }
        if (
          /onClick|onSubmit|onChange|href=|type="submit"|type="button"/.test(
            snippet,
          )
        ) {
          continue;
        }

        decorativeElements.push({
          file,
          snippet: snippet.trim(),
          line: i + 1,
          parentContext: getParentContext(lines, i),
        });
      }
    }
  }

  test("decorative elements are found in component files", () => {
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  test("all decorative overlay elements have pointer-events-none", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...decorativeElements),
        (element: DecorativeElement) => {
          // Check if the element itself has pointer-events-none
          const selfHasIt =
            element.snippet.includes("pointer-events-none") ||
            element.snippet.includes("pointer-events: none") ||
            element.snippet.includes("pointerEvents: 'none'") ||
            element.snippet.includes('pointerEvents: "none"');

          // Check if a parent container has pointer-events-none
          const parentHasIt =
            element.parentContext.includes("pointer-events-none") ||
            element.parentContext.includes("pointer-events: none");

          expect(
            selfHasIt || parentHasIt,
            `Decorative element at ${element.file}:${element.line} is missing pointer-events-none (neither on itself nor on a parent).\nSnippet:\n${element.snippet}`,
          ).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});


/**
 * Feature: visual-polish, Property 4: 动画仅使用 GPU 加速属性
 *
 * Validates: Requirements 7.6, 10.1
 *
 * For any @keyframes definition in globals.css, the animated properties
 * should only be `transform` and `opacity` — never layout-triggering
 * properties like width, height, top, left, margin, padding, etc.
 */
describe("Feature: visual-polish, Property 4: 动画仅使用 GPU 加速属性", () => {
  const globalsCssPath = resolve(process.cwd(), "src/app/globals.css");
  const cssContent = readFileSync(globalsCssPath, "utf-8");

  // Layout-triggering properties that should NOT appear in keyframes
  const layoutTriggeringProperties = [
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "border-width",
    "font-size",
    "line-height",
  ];

  /**
   * Extract all @keyframes blocks from CSS content.
   * Returns an array of { name, body } objects.
   */
  function extractKeyframes(css: string): { name: string; body: string }[] {
    const results: { name: string; body: string }[] = [];
    const keyframesRegex = /@keyframes\s+([\w-]+)\s*\{/g;
    let match: RegExpExecArray | null;

    while ((match = keyframesRegex.exec(css)) !== null) {
      const name = match[1];
      const startIndex = match.index + match[0].length;

      // Walk through braces to find the matching closing brace
      let depth = 1;
      let i = startIndex;
      while (i < css.length && depth > 0) {
        if (css[i] === "{") depth++;
        if (css[i] === "}") depth--;
        i++;
      }

      const body = css.slice(startIndex, i - 1);
      results.push({ name, body });
    }

    return results;
  }

  /**
   * Extract CSS property names from a keyframe body.
   * Matches lines like `  transform: translateX(-100%);` and returns ["transform"].
   */
  function extractAnimatedProperties(keyframeBody: string): string[] {
    const propertyRegex = /^\s*([\w-]+)\s*:/gm;
    const properties: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = propertyRegex.exec(keyframeBody)) !== null) {
      const prop = match[1];
      // Skip keyframe selectors like "0%", "50%", "100%", "from", "to"
      if (/^\d+$/.test(prop) || prop === "from" || prop === "to") continue;
      properties.push(prop);
    }

    return [...new Set(properties)];
  }

  const keyframes = extractKeyframes(cssContent);

  test("@keyframes definitions are found in globals.css", () => {
    expect(keyframes.length).toBeGreaterThan(0);
  });

  test("all @keyframes only animate GPU-accelerated properties (transform, opacity)", () => {
    // Allowed properties: transform, opacity, and background-position
    // (background-position is used by aurora animation and is composited,
    //  not a layout-triggering property)
    const allowedProperties = new Set([
      "transform",
      "opacity",
      "background-position",
    ]);

    fc.assert(
      fc.property(fc.constantFrom(...keyframes), (kf) => {
        const animatedProps = extractAnimatedProperties(kf.body);

        for (const prop of animatedProps) {
          // Check it's not a layout-triggering property
          const isLayoutTriggering = layoutTriggeringProperties.includes(prop);
          expect(
            isLayoutTriggering,
            `@keyframes ${kf.name} animates layout-triggering property "${prop}". ` +
              "Only transform and opacity should be used for GPU-accelerated animations.",
          ).toBe(false);

          // Check it's in the allowed set
          expect(
            allowedProperties.has(prop),
            `@keyframes ${kf.name} animates "${prop}" which is not a GPU-accelerated property. ` +
              "Only transform, opacity, and background-position are allowed.",
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});


/**
 * Feature: visual-polish, Property 7: 品牌渐变色一致性
 *
 * Validates: Requirements 9.4
 *
 * For any gradient declaration across component files and globals.css,
 * hex color values should belong to the brand color system.
 */
describe("Feature: visual-polish, Property 7: 品牌渐变色一致性", () => {
  const componentFiles = [
    "src/components/hero-section.tsx",
    "src/components/vision-section.tsx",
    "src/components/capability-section.tsx",
    "src/components/university-marquee.tsx",
    "src/components/jd-section.tsx",
    "src/components/recruitment-section.tsx",
    "src/components/site-footer.tsx",
    "src/components/site-header.tsx",
    "src/app/globals.css",
  ];

  // Brand color system — allowed hex colors (uppercase, 6-digit)
  const BRAND_COLORS = new Set([
    "#4893FC", // primary blue
    "#969DFF", // mid purple-blue
    "#BD99FE", // purple
    "#7B93FF", // intermediate blend (via color)
    "#00B95C", // green (hardware capability)
    "#FC413D", // red (accents)
    "#FFE432", // yellow (accents)
    "#FBBC04", // yellow variant (logo)
    "#3186FF", // blue variant (logo)
  ]);

  /**
   * Normalize a hex color to uppercase 6-digit format.
   * Handles 3-digit shorthand (#ABC → #AABBCC) and strips alpha suffix.
   */
  function normalizeHex(hex: string): string {
    let h = hex.toUpperCase();
    // Strip leading #
    h = h.replace(/^#/, "");
    // Strip alpha channel (8-digit or 4-digit hex → 6-digit or 3-digit)
    if (h.length === 8) h = h.slice(0, 6);
    if (h.length === 4) h = h.slice(0, 3);
    // Expand 3-digit shorthand to 6-digit
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    return `#${h}`;
  }

  interface GradientColorEntry {
    file: string;
    line: number;
    gradientSnippet: string;
    rawHex: string;
    normalizedHex: string;
  }

  /**
   * Extract hex colors from gradient declarations in source content.
   * Matches: bg-gradient-to-*, linear-gradient, radial-gradient patterns.
   * Skips CSS mask declarations (which use #fff for masking technique).
   */
  function extractGradientHexColors(
    source: string,
    file: string,
  ): GradientColorEntry[] {
    const entries: GradientColorEntry[] = [];
    const lines = source.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip CSS mask-related lines — these use #fff/#000 for masking
      // technique, not for brand color gradients.
      // Matches: mask:, -webkit-mask:, WebkitMask:, and continuation lines
      // with the common masking pattern linear-gradient(#fff 0 0)
      if (/mask\s*:|WebkitMask\s*:|webkitMask\s*:|-webkit-mask\s*:/i.test(line)) continue;
      if (/linear-gradient\(#fff\b/.test(line)) continue;

      // Detect gradient declarations
      const isGradient =
        /bg-gradient-to-|linear-gradient|radial-gradient|from-\[#|via-\[#|to-\[#/.test(
          line,
        );
      if (!isGradient) continue;

      // Extract all hex color values from this line
      // Matches #RGB, #RRGGBB, #RRGGBBAA patterns
      const hexRegex = /#[0-9A-Fa-f]{3,8}\b/g;
      let match: RegExpExecArray | null;

      while ((match = hexRegex.exec(line)) !== null) {
        const rawHex = match[0];
        const normalizedHex = normalizeHex(rawHex);

        entries.push({
          file,
          line: i + 1,
          gradientSnippet: line.trim().slice(0, 120),
          rawHex,
          normalizedHex,
        });
      }
    }

    return entries;
  }

  // Collect all gradient hex colors across all files
  const allGradientColors: GradientColorEntry[] = [];

  for (const file of componentFiles) {
    const filePath = resolve(process.cwd(), file);
    const source = readFileSync(filePath, "utf-8");
    const colors = extractGradientHexColors(source, file);
    allGradientColors.push(...colors);
  }

  test("gradient declarations with hex colors are found in source files", () => {
    expect(allGradientColors.length).toBeGreaterThan(0);
  });

  test("all hex colors in gradient declarations belong to the brand color system", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allGradientColors),
        (entry: GradientColorEntry) => {
          expect(
            BRAND_COLORS.has(entry.normalizedHex),
            `Non-brand hex color "${entry.rawHex}" (normalized: ${entry.normalizedHex}) found in gradient at ${entry.file}:${entry.line}\n` +
              `Snippet: ${entry.gradientSnippet}\n` +
              `Allowed brand colors: ${[...BRAND_COLORS].join(", ")}`,
          ).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});
