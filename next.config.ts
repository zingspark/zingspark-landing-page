import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // 输出目录改为 docs
  distDir: "docs",
  // 生产环境优化
  productionBrowserSourceMaps: false,
  // 压缩配置
  compress: true,
  // 图片优化配置
  images: {
    // 图片格式优化
    formats: ["image/avif", "image/webp"],
    // 图片尺寸配置
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最小缓存时间
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天
  },
  // 静态资源优化
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
