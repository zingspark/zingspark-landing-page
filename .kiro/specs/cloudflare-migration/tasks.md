# 实施计划：Cloudflare 迁移

## 概述

将 zingspark-landing-page 从 Netlify 迁移到 Cloudflare Pages。按照"移除旧配置 → 添加新配置 → 创建部署工作流 → 验证"的顺序逐步实施，确保每一步都可增量验证。

## 任务

- [x] 1. 添加 Cloudflare Pages 配置文件
  - [x] 1.1 创建 `public/_redirects` 文件
    - 添加 `/ /en/ 302` 重定向规则，确保根路径访问重定向到英文版
    - _需求: 2.1, 2.2_
  - [x] 1.2 创建 `public/_headers` 文件
    - 为 `/_next/static/*` 路径设置 `Cache-Control: public, max-age=31536000, immutable` 响应头
    - _需求: 3.1, 3.2_

- [x] 2. 创建 GitHub Actions 部署工作流
  - [x] 2.1 创建 `.github/workflows/deploy.yml` 文件
    - 触发条件：`push` 到 `main` 分支
    - 运行环境：`ubuntu-latest`
    - 步骤：checkout → 设置 Node.js 22.x → corepack enable 激活 pnpm → pnpm install --frozen-lockfile → pnpm build → 使用 `cloudflare/wrangler-action@v3` 部署 `out/` 目录
    - 通过 GitHub Secrets 引用 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
    - _需求: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 3. 移除 Netlify 相关配置
  - [x] 3.1 删除根目录下的 `netlify.toml` 文件
    - _需求: 1.1_
  - [x] 3.2 删除 `.netlify/` 目录及其所有内容
    - _需求: 1.2_

- [x] 4. 验证 `.gitignore` 规则
  - [x] 4.1 确认 `.gitignore` 中保留 `.netlify` 忽略规则
    - 检查现有规则，确保 `.netlify` 行存在（防止残留文件被意外提交）
    - _需求: 7.1_
  - [x] 4.2 确认 `.gitignore` 不会忽略 `_redirects` 和 `_headers` 文件
    - 检查是否有通配符规则可能匹配这些文件，如有则添加排除规则
    - _需求: 7.2_

- [x] 5. 检查点 - 配置验证
  - 确保所有配置文件已正确创建，Netlify 文件已移除。运行 `pnpm build` 确认构建仍然正常，检查 `out/` 目录中包含 `_redirects` 和 `_headers` 文件。如有问题请向用户确认。

- [x] 6. 编写迁移验证测试
  - [x] 6.1 编写单元测试验证 Netlify 配置已移除
    - 验证 `netlify.toml` 不存在、`.netlify/` 目录不存在、`package.json` 中无 Netlify 相关依赖
    - _需求: 1.1, 1.2, 1.3_
  - [x] 6.2 编写单元测试验证 `_redirects` 文件正确性
    - 验证 `public/_redirects` 存在且包含 `/ /en/ 302` 规则
    - _需求: 2.1, 2.2_
  - [x] 6.3 编写单元测试验证 `_headers` 文件正确性
    - 验证 `public/_headers` 存在且包含正确的缓存头配置
    - _需求: 3.1, 3.2_
  - [x] 6.4 编写单元测试验证 GitHub Actions 工作流正确性
    - 验证 `.github/workflows/deploy.yml` 存在，包含正确的触发条件、构建步骤和部署配置
    - _需求: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 6.5 编写单元测试验证 Next.js 配置保持不变
    - 验证 `next.config.ts` 包含 `output: "export"`、`trailingSlash: true`、`images.unoptimized: true`
    - _需求: 5.1, 5.2, 5.3_
  - [x] 6.6 编写单元测试验证 GitHub Pages 文档兼容性
    - 验证 `package.json` 中 `build:docs` 脚本存在，`scripts/copy-out-to-docs.mjs` 文件存在
    - _需求: 6.1, 6.2_
  - [x] 6.7 编写单元测试验证 `.gitignore` 正确性
    - 验证包含 `.netlify` 忽略规则，不忽略 `_redirects` 和 `_headers`
    - _需求: 7.1, 7.2_

- [x] 7. 最终检查点 - 确保所有测试通过
  - 运行 `pnpm vitest --run` 确保所有测试通过。如有问题请向用户确认。

## 备注

- 标记 `*` 的子任务为可选，可跳过以加快 MVP 进度
- 每个任务引用了具体的需求编号以确保可追溯性
- 部署前需在 Cloudflare Dashboard 创建 Pages 项目，并在 GitHub 仓库 Settings → Secrets 中配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
- 本任务列表仅涉及代码和配置变更，不包含 Cloudflare Dashboard 或 GitHub Settings 中的手动操作
