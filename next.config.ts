import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfigForPhase = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    typedRoutes: true,
    output: isDev ? undefined : "export",
    trailingSlash: !isDev,
    images: {
      unoptimized: true,
    },
  };
};

const withNextIntl = createNextIntlPlugin();
export default function config(phase: string): NextConfig {
  return withNextIntl(nextConfigForPhase(phase));
}
