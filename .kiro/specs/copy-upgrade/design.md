# 设计文档：文案升级（Copy Upgrade）

## 概述

对 `messages/en.json` 和 `messages/zh.json` 中的所有宣传性文案进行全面升级。本次变更不涉及任何组件代码、键名结构或功能性文案，仅替换 JSON 值。

品牌调性目标：克制、精炼、有未来感、技术自信但不浮夸。

## 架构

### 变更范围

```
messages/
├── en.json  ← 修改宣传文案值
└── zh.json  ← 修改宣传文案值
```

不涉及其他文件。

### 可修改键 vs 不可修改键

| 区域 | 可修改键 | 不可修改键 |
|------|---------|-----------|
| Meta | `title`, `description` | — |
| Header | — | 全部保留 |
| Hero | `line1`, `line2`, `description` | `cta`, `scrollDown` |
| Vision | `tagline`, `subtitle`, `description` | — |
| Capabilities | `title`, `items.*.title`, `items.*.description` | — |
| Universities | `title` | — |
| Jobs | `title`, `subtitle` | `clickHint` |
| Recruitment | `title`, `subtitle` | `note`, `name`, `email`, `phone`, `school`, `education`, `educationOptions.*`, `interest`, `interestPlaceholder`, `message`, `messagePlaceholder`, `submit`, `sending`, `selectDegree` |
| Footer | `slogan` | `company`, `offices`, `copyright`, `email`, `icp`, `police` |
| Theme | — | 全部保留 |
| Language | — | 全部保留 |

## 数据模型

### 文案升级对照表

以下为每个可修改键的 **当前值 → 升级值** 完整对照。

#### Meta

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Meta.title` | en | Zingspark — Native AI Agent R&D & Cross-Domain Deployment | Zingspark — Where Agents Come Alive |
| `Meta.title` | zh | 星跃智启 Zingspark — 原生 AI Agent 研发与跨领域场景落地 | 星跃智启 Zingspark — 让智能体真正运转 |
| `Meta.description` | en | Zingspark is a Frontier Lab dedicated to building universal agents that break the boundaries between the physical and digital worlds. | Zingspark is a research lab engineering autonomous agents that perceive, reason, and operate across digital and physical environments. |
| `Meta.description` | zh | 星跃智启是一家前沿实验室，致力于构建打破物理与数字世界边界的通用智能体。 | 星跃智启是一家专注于自主智能体研发的前沿实验室，构建能感知、推理并在数字与物理环境中自如运作的 Agent 系统。 |

#### Hero

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Hero.line1` | en | Native AI Agents. | Agents That Act. |
| `Hero.line1` | zh | 原生 AI Agent | 让 Agent 真正行动 |
| `Hero.line2` | en | Redefining Intelligence. | Intelligence, Unchained. |
| `Hero.line2` | zh | 重新定义智能 | 释放智能的全部可能 |
| `Hero.description` | en | LLMs are just the brain. Agents give AI eyes, limbs, and the power to act. | Language models think. Agents do. We build the systems that close the gap between reasoning and real-world execution. |
| `Hero.description` | zh | 大语言模型只是大脑，Agent 才是赋予 AI 视觉、四肢与执行力的关键。 | 大模型负责思考，Agent 负责执行。我们构建从推理到现实行动的完整闭环。 |

#### Vision

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Vision.tagline` | en | Empowering Paradigm Shifts with Native AI. | From Reasoning to Reality. |
| `Vision.tagline` | zh | 以原生 AI 驱动范式跃迁 | 从推理到现实 |
| `Vision.subtitle` | en | Native Intelligence. Leaping into the Future. | Building agents that don't just understand the world — they operate in it. |
| `Vision.subtitle` | zh | 原生智能，跃迁未来 | 构建不止于理解世界，更能在其中运作的智能体。 |
| `Vision.description` | en | As a Frontier Lab, Zingspark is dedicated to building universal agents that break the boundaries between the physical and digital worlds. | We research and engineer autonomous agent systems — from multi-step planning and tool orchestration to embodied interaction — designed to work reliably in open-ended environments. |
| `Vision.description` | zh | 作为一家前沿实验室，星跃智启致力于构建打破物理与数字世界边界的通用智能体。 | 我们研究并构建自主智能体系统——从多步规划、工具编排到具身交互——使其在开放环境中稳定可靠地运行。 |

#### Capabilities

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Capabilities.title` | en | Core Competencies | What We Build |
| `Capabilities.title` | zh | 核心能力 | 我们在做什么 |
| `items.framework.title` | en | Deep Framework Deconstruction | Agent Architecture |
| `items.framework.title` | zh | 深度框架解构 | 智能体架构 |
| `items.framework.description` | en | Deep expertise in leading multi-agent frameworks like OpenClaw, MetaGPT, and CrawlAI. Active contributors to top-tier Agent open-source projects. | Deep fluency in multi-agent orchestration, planning pipelines, and tool-use protocols. We contribute to and build upon the leading open-source agent infrastructure. |
| `items.framework.description` | zh | 深度解构 OpenClaw、MetaGPT、CrawlAI 等主流多智能体框架，作为顶级 Agent 开源项目的活跃贡献者。 | 深入掌握多智能体编排、规划流水线与工具调用协议，持续贡献并构建于前沿开源智能体基础设施之上。 |
| `items.hardware.title` | en | Software-Hardware Synergy | Digital to Physical |
| `items.hardware.title` | zh | 软硬件协同 | 从数字到物理 |
| `items.hardware.description` | en | Capability to extend from digital systems to physical hardware ecosystems, developing Agents with real-world interaction abilities. | Extending agent capabilities from screen-bound tasks to sensor-rich, real-world environments — bridging code and hardware into unified systems. |
| `items.hardware.description` | zh | 具备从数字系统走向实体硬件生态的能力，开发具有真实世界交互能力的 Agent。 | 将智能体能力从屏幕端任务延伸至传感器密集的真实环境，让代码与硬件融为一体。 |
| `items.global.title` | en | Global Reach | Global-Native |
| `items.global.title` | zh | 全球化能力 | 全球化基因 |
| `items.global.description` | en | Professional English communication skills and a tech stack synchronized with the international frontier in real-time. | A team that thinks, ships, and collaborates across borders — with a research stack aligned to the global state of the art. |
| `items.global.description` | zh | 具备英文专业沟通能力，技术栈与国际前沿实时同步。 | 一支跨越国界思考、交付与协作的团队，研究栈与全球最前沿保持同步。 |

#### Universities

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Universities.title` | en | A Group of Geeks, with the World's Brightest Minds | Built by Minds from the World's Leading Institutions |
| `Universities.title` | zh | 一群极客，和全球最顶尖的大脑 | 汇聚全球顶尖学府的研究者与工程师 |

#### Jobs

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Jobs.title` | en | Open Positions | We're Hiring |
| `Jobs.title` | zh | 开放岗位 | 正在招募 |
| `Jobs.subtitle` | en | Find your role in shaping the future of AI Agents. | The problems are hard. The team is small. The impact is real. |
| `Jobs.subtitle` | zh | 在 AI Agent 的未来中找到你的角色 | 问题很难，团队精锐，影响力真实可见。 |

#### Recruitment

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Recruitment.title` | en | Join the Spark | Work With Us |
| `Recruitment.title` | zh | 加入星跃 | 与我们同行 |
| `Recruitment.subtitle` | en | We're looking for exceptional minds to build the future of intelligence together. | If you care about making agents that actually work, we should talk. |
| `Recruitment.subtitle` | zh | 与一群很酷的人，共同创造酷的未来。 | 如果你在意的是让智能体真正可用，我们应该聊聊。 |

#### Footer

| 键 | 语言 | 当前值 | 升级值 |
|---|---|---|---|
| `Footer.slogan` | en | Native AI Agents. Redefining Intelligence. | Agents That Act. Intelligence, Unchained. |
| `Footer.slogan` | zh | 原生 AI Agent，重新定义智能 | 让 Agent 真正行动，释放智能的全部可能。 |

## 正确性属性

### 属性 1：翻译键完整性守恒

*对于任意* `messages/en.json` 和 `messages/zh.json` 中的翻译键路径集合，升级后的键路径集合应与升级前完全一致——不新增、不删除任何键。

**验证: 需求 8.6, 9.5**

### 属性 2：功能文案不变性

*对于任意* 被标记为 Functional_Copy 的翻译键（Header 全部、Theme 全部、Language 全部、Hero.cta、Hero.scrollDown、Jobs.clickHint、Recruitment 表单相关字段），其在 en.json 和 zh.json 中的值应与升级前完全一致。

**验证: 需求 1.4, 5.3, 6.3, 7.4, 9.1, 9.2, 9.3, 9.4**

### 属性 3：JSON 语法有效性

*对于* 升级后的 `messages/en.json` 和 `messages/zh.json`，`JSON.parse()` 应成功解析且不抛出异常。

**验证: 需求 8.5**

### 属性 4：宣传文案非空性

*对于任意* 被标记为 Marketing_Copy 的翻译键，其在 en.json 和 zh.json 中的升级后值应为非空字符串（长度 > 0，且不全为空白字符）。

**验证: 需求 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1–3.4, 4.1, 5.1, 5.2, 6.1, 6.2, 7.1, 7.2, 7.3**

### 属性 5：禁用词排除

*对于任意* 升级后的 Marketing_Copy 值，不应包含以下任何词汇（不区分大小写）："revolutionary", "game-changing", "disruptive", "颠覆性", "革命性", "划时代"。

**验证: 需求 8.2**

### 属性 6：Hero 标题长度约束

`Hero.line1` 英文值不超过 5 个单词，中文值不超过 10 个汉字。`Hero.line2` 英文值不超过 5 个单词，中文值不超过 10 个汉字。

**验证: 需求 1.1, 1.2**

### 属性 7：Vision 标语长度约束

`Vision.tagline` 英文值不超过 8 个单词，中文值不超过 12 个汉字。

**验证: 需求 2.1**

### 属性 8：Capabilities 描述长度约束

*对于任意* `Capabilities.items.*.description`，英文值在 15–40 个单词之间，中文值在 20–60 个汉字之间。

**验证: 需求 3.5**

### 属性 9：Universities 标题长度约束

`Universities.title` 英文值不超过 12 个单词，中文值不超过 16 个汉字。

**验证: 需求 4.2**

### 属性 10：Meta 标题长度约束

`Meta.title` 英文值不超过 60 个字符，中文值不超过 30 个汉字。

**验证: 需求 7.1**

### 属性 11：Meta 描述长度约束

`Meta.description` 英文值在 120–160 个字符之间，中文值在 60–80 个汉字之间。

**验证: 需求 7.2**

## 测试策略

### 属性测试配置

- **测试库**: fast-check
- **测试框架**: Playwright Test 配合 fast-check
- **标签格式**: `Feature: copy-upgrade, Property {number}: {property_text}`

### 测试实现方式

由于本次变更仅涉及 JSON 文件值替换，所有属性测试均为纯数据验证，不需要渲染组件或启动浏览器：

1. 直接 import `messages/en.json` 和 `messages/zh.json`
2. 对 JSON 结构进行断言
3. 使用 fast-check 生成随机键路径进行遍历验证

### 单元测试覆盖

- 验证所有 Marketing_Copy 键的值已变更（不等于旧值）
- 验证所有 Functional_Copy 键的值未变更（等于旧值）
- 验证 JSON 解析成功
- 验证禁用词不存在
- 验证各长度约束

## 错误处理

本次变更仅修改静态 JSON 文件值，不涉及运行时逻辑，因此无需额外的错误处理机制。唯一的风险是 JSON 语法错误，通过属性 3 的测试覆盖。
