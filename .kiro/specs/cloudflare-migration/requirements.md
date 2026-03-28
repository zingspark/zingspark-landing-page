# 需求文档

## 简介

将 zingspark-landing-page 项目的部署平台从 Netlify 迁移到 Cloudflare Pages。项目是一个 Next.js 16 静态导出站点（`output: "export"`），使用 pnpm 构建，支持中英文国际化。迁移需要移除所有 Netlify 相关配置，添加 Cloudflare Pages 配置，并通过 GitHub Actions 实现推送后自动部署。同时需保持现有的根路径重定向规则和静态导出模式不变。

## 术语表

- **Landing_Page**: zingspark-landing-page 项目，即本次迁移的目标 Next.js 静态站点
- **Netlify**: 当前使用的部署平台，需要被移除
- **Cloudflare_Pages**: 目标部署平台，用于托管静态站点
- **GitHub_Actions**: GitHub 提供的 CI/CD 服务，用于自动化构建和部署流程
- **Static_Export**: Next.js 的静态导出模式（`output: "export"`），将站点构建为纯静态 HTML/CSS/JS 文件
- **Redirects_Config**: Cloudflare Pages 的 `_redirects` 文件，用于定义 URL 重定向规则
- **Headers_Config**: Cloudflare Pages 的 `_headers` 文件，用于定义 HTTP 响应头
- **Build_Output**: 构建产物目录 `out/`，包含所有静态文件

## 需求

### 需求 1：移除 Netlify 配置

**用户故事：** 作为开发者，我希望移除所有 Netlify 相关的配置文件和依赖，以便项目不再包含过时的部署配置。

#### 验收标准

1. WHEN 迁移完成后，THE Landing_Page SHALL 不包含根目录下的 `netlify.toml` 文件
2. WHEN 迁移完成后，THE Landing_Page SHALL 不包含 `.netlify` 目录及其所有内容
3. WHEN 迁移完成后，THE Landing_Page SHALL 不包含 `package.json` 中任何 Netlify 相关的依赖项或脚本

### 需求 2：添加 Cloudflare Pages 重定向配置

**用户故事：** 作为网站访客，我希望访问根路径 `/` 时能被自动重定向到 `/en/`，以便获得正确的语言版本页面。

#### 验收标准

1. THE Landing_Page SHALL 在 `public/` 目录中包含一个 `_redirects` 文件，用于定义 Cloudflare Pages 的重定向规则
2. WHEN 用户访问根路径 `/` 时，THE Redirects_Config SHALL 返回 302 状态码并重定向到 `/en/`
3. WHEN 构建完成后，THE Build_Output SHALL 在 `out/` 目录中包含 `_redirects` 文件

### 需求 3：配置静态资源缓存头

**用户故事：** 作为开发者，我希望静态资源拥有合理的缓存策略，以便提升网站加载性能。

#### 验收标准

1. THE Landing_Page SHALL 在 `public/` 目录中包含一个 `_headers` 文件，用于定义 Cloudflare Pages 的 HTTP 响应头
2. THE Headers_Config SHALL 为 `/_next/static/*` 路径下的资源设置 `Cache-Control: public, max-age=31536000, immutable` 响应头
3. WHEN 构建完成后，THE Build_Output SHALL 在 `out/` 目录中包含 `_headers` 文件

### 需求 4：配置 GitHub Actions 自动部署

**用户故事：** 作为开发者，我希望代码推送到 main 分支后能自动部署到 Cloudflare Pages，以便实现持续部署。

#### 验收标准

1. THE Landing_Page SHALL 在 `.github/workflows/` 目录中包含一个部署工作流文件
2. WHEN 代码推送到 `main` 分支时，THE GitHub_Actions SHALL 自动触发构建和部署流程
3. THE GitHub_Actions SHALL 使用 `pnpm` 安装依赖并执行 `pnpm build` 命令进行构建
4. THE GitHub_Actions SHALL 使用 Cloudflare 官方的 `wrangler-action` 将 `out/` 目录部署到 Cloudflare_Pages
5. THE GitHub_Actions SHALL 通过 GitHub Secrets 中的 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` 进行身份验证
6. IF 构建过程失败，THEN THE GitHub_Actions SHALL 终止部署流程并报告错误

### 需求 5：保持静态导出模式

**用户故事：** 作为开发者，我希望迁移后项目仍然使用 Next.js 静态导出模式，以便与 Cloudflare Pages 的静态托管兼容。

#### 验收标准

1. THE Landing_Page SHALL 保持 `next.config.ts` 中 `output: "export"` 的配置不变
2. THE Landing_Page SHALL 保持 `trailingSlash: true` 的配置不变
3. THE Landing_Page SHALL 保持 `images.unoptimized: true` 的配置不变
4. WHEN 执行 `pnpm build` 后，THE Static_Export SHALL 在 `out/` 目录中生成完整的静态站点文件

### 需求 6：保持 GitHub Pages 文档部署兼容

**用户故事：** 作为开发者，我希望迁移到 Cloudflare Pages 后，现有的 `docs/` 目录和 `build:docs` 脚本仍然正常工作，以便 GitHub Pages 文档部署不受影响。

#### 验收标准

1. THE Landing_Page SHALL 保持 `package.json` 中 `build:docs` 脚本不变
2. THE Landing_Page SHALL 保持 `docs/` 目录结构不变
3. WHEN 执行 `pnpm build:docs` 后，THE Landing_Page SHALL 将构建产物正确复制到 `docs/` 目录

### 需求 7：更新版本控制忽略规则

**用户故事：** 作为开发者，我希望 `.gitignore` 文件正确反映新的部署配置，以便不会将不必要的文件提交到仓库。

#### 验收标准

1. THE Landing_Page SHALL 在 `.gitignore` 中保留 `.netlify` 的忽略规则（避免残留文件被意外提交）
2. WHEN 迁移完成后，THE Landing_Page SHALL 确保 `.gitignore` 不会忽略 Cloudflare Pages 部署所需的配置文件（如 `_redirects`、`_headers`）
