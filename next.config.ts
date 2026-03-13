import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    typedRoutes: true,
    output: isDev ? undefined : "export",
    distDir: isDev ? ".next" : "docs",
    images: {
      unoptimized: true,
    },
  };
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
