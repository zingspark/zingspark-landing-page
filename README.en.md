# Zingspark Landing Page

Official landing page for **Zingspark (Shanghai) Tech Co., Ltd.**

[https://zingspark.tech](https://zingspark.tech)

English | [中文](./README.md)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | 16 | React full-stack framework (App Router, static export) |
| [React](https://react.dev) | 19 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first CSS |
| [Motion](https://motion.dev) (Framer Motion) | 12 | Animation engine |
| [next-intl](https://next-intl.dev) | 4 | Internationalization (Chinese / English) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Dark / light mode toggle |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Type safety |
| [Biome](https://biomejs.dev) | 2 | Formatting & linting |
| [Vitest](https://vitest.dev) | 4 | Unit & property-based testing |
| [fast-check](https://fast-check.dev) | 4 | Property-based testing (PBT) |
| [pnpm](https://pnpm.io) | 9+ | Package manager |

## Features

- **Six core sections**: Hero, Company Vision, Core Capabilities, Founder University Marquee, Job Listings (JD), and Recruitment Form
- **Bilingual (zh/en)**: Route-level i18n via `next-intl` with independent `/zh` and `/en` URLs, SEO-friendly
- **Dark / light mode**: Dark by default, one-click toggle, follows system preference; theme variables managed in OKLCH color space
- **Responsive design**: Optimized for mobile and desktop
- **SEO**: Meta tags, Open Graph, Twitter Card, JSON-LD structured data, Sitemap, robots.txt
- **Mailto form**: Recruitment form auto-composes an email template and sends via `mailto:`; clicking a job card auto-fills the interest field
- **Advanced animations**: Motion-powered Hero background (orbital rings, glow pulses), parallax scrolling, entrance animations, infinite marquee, aurora gradient backgrounds
- **Performance**: `next/dynamic` lazy-loads below-the-fold sections (Vision, Capabilities, University, JD, Recruitment, Footer) to reduce initial JS bundle
- **Brand color system**: Consistent gradient colors across the site enforced by property-based tests
- **Accessibility**: Decorative elements use `pointer-events-none` + `aria-hidden`; `prefers-reduced-motion` media query disables purely decorative animations

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale layout (i18n, theme provider, SEO metadata)
│   │   └── page.tsx            # Main page (Hero + LazySections)
│   ├── globals.css             # Global styles (Tailwind v4 + OKLCH theme vars + animations)
│   ├── layout.tsx              # Root layout (Inter font)
│   ├── page.tsx                # Root path redirect to /en
│   └── sitemap.ts              # Auto-generated sitemap
├── components/
│   ├── hero-section.tsx        # Hero section (orbital ring animation, gradient bg, CTA)
│   ├── vision-section.tsx      # Company vision (aurora bg, floating particles, geometric arcs)
│   ├── capability-section.tsx  # Core capability cards (3-col grid, hover effects, connection lines)
│   ├── university-marquee.tsx  # Founder university infinite scroll marquee
│   ├── jd-section.tsx          # Job listing card grid (click to auto-fill form)
│   ├── recruitment-section.tsx # Recruitment application form (mailto submit)
│   ├── lazy-sections.tsx       # Lazy-load wrapper (next/dynamic SSR=false)
│   ├── site-header.tsx         # Top navigation bar
│   ├── site-footer.tsx         # Footer (brand info, ICP filing)
│   ├── theme-toggle.tsx        # Theme toggle button
│   ├── language-toggle.tsx     # Language toggle button
│   ├── icons.tsx               # SVG icon component library (job icons, general icons)
│   └── json-ld.tsx             # SEO structured data
├── config/
│   └── site-config.ts          # Site config (company info, job list, university list)
├── i18n/
│   ├── routing.ts              # next-intl routing config
│   └── request.ts              # next-intl request config
├── lib/
│   └── utils.ts                # Utility functions (cn)
└── __tests__/
    ├── oklch-consistency.test.ts        # OKLCH color space consistency PBT
    ├── wcag-contrast.test.ts            # WCAG AA contrast ratio PBT
    ├── dark-mode-invariance.test.ts     # Dark mode style invariance PBT
    └── visual-polish-properties.test.tsx # Visual consistency PBT (icons, animations, brand colors)

messages/
├── en.json                     # English translations
└── zh.json                     # Chinese translations

scripts/
├── copy-out-to-docs.mjs        # Copy build output to docs/ directory
└── validate-copy-upgrade.mjs   # Copy upgrade validation script

public/images/
├── logo/                       # Zingspark logo
└── universities/               # Founder university logos (SVG/PNG)
```

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production (static export)
pnpm build

# Build and copy to docs/
pnpm build:docs

# Start production server
pnpm start

# Lint
pnpm lint

# Lint with auto-fix
pnpm lint:write

# Type check
pnpm typecheck
```

## Testing

The project uses Vitest + fast-check for property-based testing to verify design system correctness:

```bash
# Run all tests
pnpm vitest --run
```

Test coverage:
- OKLCH color space consistency: all CSS theme variables use `oklch()` format
- WCAG AA contrast: muted foreground vs background contrast ratio ≥ 4.5:1
- Dark mode invariance: light mode optimizations do not affect dark mode styles
- Visual consistency: job icon types, GPU-accelerated animation properties, brand gradient colors, decorative elements non-blocking

## Deployment

The project is configured for static export (`output: "export"`) and deployed to [Netlify](https://www.netlify.com/).

- Config: `netlify.toml`
- Build command: `pnpm build`
- Publish directory: `out`
- Root `/` redirects 302 to `/en/`

## Brand Colors

Core brand colors extracted from the Zingspark logo:

| Color | Usage |
|-------|-------|
| `#4893FC` | Brand blue (Primary) |
| `#969DFF` | Brand purple-blue (gradient mid) |
| `#BD99FE` | Brand purple (gradient end) |
| `#7B93FF` | Intermediate blue-purple blend |
| `#00B95C` | Brand green (hardware / capability cards) |
| `#FC413D` | Brand red (accent) |

## License

[MIT](./LICENSE) © 2026 Zingspark (Shanghai) Tech Co., Ltd.
