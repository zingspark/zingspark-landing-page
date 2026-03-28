# 实施计划：文案升级（Copy Upgrade）

## 概述

按照设计文档中的文案对照表，逐区域替换 `messages/en.json` 和 `messages/zh.json` 中的宣传文案值。仅修改 JSON 值，不修改任何键名，不修改任何组件代码。实现语言为 JSON 值替换（无编程语言选择需求）。

## 任务

- [x] 1. 升级英文翻译文件 `messages/en.json`
  - [x] 1.1 更新 Meta 区域文案：替换 `Meta.title` 和 `Meta.description` 为设计文档中的升级值
    - `Meta.title` → "Zingspark — Where Agents Come Alive"
    - `Meta.description` → 120–160 字符的品牌描述
    - _需求: 7.1, 7.2_
  - [x] 1.2 更新 Hero 区域文案：替换 `Hero.line1`、`Hero.line2`、`Hero.description`，保留 `Hero.cta` 和 `Hero.scrollDown` 不变
    - `Hero.line1` 不超过 5 个单词，`Hero.line2` 不超过 5 个单词
    - _需求: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 1.3 更新 Vision 区域文案：替换 `Vision.tagline`、`Vision.subtitle`、`Vision.description`
    - `Vision.tagline` 不超过 8 个单词
    - _需求: 2.1, 2.2, 2.3, 2.4_
  - [x] 1.4 更新 Capabilities 区域文案：替换 `Capabilities.title` 及 `items.framework`、`items.hardware`、`items.global` 的 `title` 和 `description`
    - 每个 description 在 15–40 个单词之间
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 1.5 更新 Universities、Jobs、Recruitment、Footer 区域文案
    - 替换 `Universities.title`（不超过 12 个单词）、`Jobs.title`、`Jobs.subtitle`、`Recruitment.title`、`Recruitment.subtitle`、`Footer.slogan`
    - 保留 `Jobs.clickHint` 和所有 Recruitment 表单字段不变
    - _需求: 4.1, 4.2, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.3, 7.4_

- [x] 2. 升级中文翻译文件 `messages/zh.json`
  - [x] 2.1 更新 Meta 区域文案：替换 `Meta.title` 和 `Meta.description` 为设计文档中的升级值
    - `Meta.title` 不超过 30 个汉字，`Meta.description` 在 60–80 个汉字之间
    - _需求: 7.1, 7.2_
  - [x] 2.2 更新 Hero 区域文案：替换 `Hero.line1`、`Hero.line2`、`Hero.description`，保留 `Hero.cta` 和 `Hero.scrollDown` 不变
    - `Hero.line1` 不超过 10 个汉字，`Hero.line2` 不超过 10 个汉字
    - _需求: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [x] 2.3 更新 Vision 区域文案：替换 `Vision.tagline`、`Vision.subtitle`、`Vision.description`
    - `Vision.tagline` 不超过 12 个汉字
    - _需求: 2.1, 2.2, 2.3, 2.4_
  - [x] 2.4 更新 Capabilities 区域文案：替换 `Capabilities.title` 及 `items.framework`、`items.hardware`、`items.global` 的 `title` 和 `description`
    - 每个 description 在 20–60 个汉字之间
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 2.5 更新 Universities、Jobs、Recruitment、Footer 区域文案
    - 替换 `Universities.title`（不超过 16 个汉字）、`Jobs.title`、`Jobs.subtitle`、`Recruitment.title`、`Recruitment.subtitle`、`Footer.slogan`
    - 保留 `Jobs.clickHint` 和所有 Recruitment 表单字段不变
    - _需求: 4.1, 4.2, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.3, 7.4_

- [x] 3. 检查点 — 验证文案一致性与质量
  - [x] 3.1 验证两个 JSON 文件语法正确：`JSON.parse` 无异常
    - _需求: 8.5_
  - [x] 3.2 验证键路径集合与升级前完全一致：不新增、不删除任何键
    - _需求: 8.6, 9.5_
  - [x] 3.3 验证所有功能文案未被修改：Header 全部、Theme 全部、Language 全部、Hero.cta、Hero.scrollDown、Jobs.clickHint、Recruitment 表单字段
    - _需求: 9.1, 9.2, 9.3, 9.4, 1.4, 5.3, 6.3, 7.4_
  - [x] 3.4 验证所有宣传文案值为非空字符串
    - _需求: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 4.1, 5.1, 5.2, 6.1, 6.2, 7.1, 7.2, 7.3_
  - [x] 3.5 验证升级文案不含禁用词（"revolutionary", "game-changing", "disruptive", "颠覆性", "革命性", "划时代"）
    - _需求: 8.2_
  - [x]* 3.6 编写属性测试验证 Hero 标题长度约束
    - **属性 6: Hero 标题长度约束**
    - **验证: 需求 1.1, 1.2**
  - [x]* 3.7 编写属性测试验证 Vision 标语长度约束
    - **属性 7: Vision 标语长度约束**
    - **验证: 需求 2.1**
  - [x]* 3.8 编写属性测试验证 Capabilities 描述长度约束
    - **属性 8: Capabilities 描述长度约束**
    - **验证: 需求 3.5**
  - [x]* 3.9 编写属性测试验证 Universities 标题长度约束
    - **属性 9: Universities 标题长度约束**
    - **验证: 需求 4.2**
  - [x]* 3.10 编写属性测试验证 Meta 标题与描述长度约束
    - **属性 10: Meta 标题长度约束**
    - **属性 11: Meta 描述长度约束**
    - **验证: 需求 7.1, 7.2**

- [x] 4. 最终检查点 — 确保构建成功
  - [x] 4.1 运行 `pnpm build` 确保构建成功，无因文案变更导致的编译错误
    - 确保所有测试通过，如有问题请向用户确认。
    - _需求: 8.5, 9.6_

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP
- 所有升级值均来自设计文档中的文案对照表
- 不新增、不删除任何翻译键
- 不修改任何组件源代码文件
- 属性测试验证设计文档中定义的正确性属性
