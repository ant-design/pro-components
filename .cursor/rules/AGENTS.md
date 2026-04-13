# AGENTS.md

> Ant Design Pro Components 项目开发指南 - 为 AI 编程助手提供项目上下文和开发规范

## 📑 目录

- [项目背景](#项目背景)
- [快速开始](#快速开始)
- [代码规范](#代码规范)
  - [基本编码规范](#基本编码规范)
  - [命名规范](#命名规范)
  - [TypeScript 规范](#typescript-规范)
  - [样式规范](#样式规范)
  - [代码格式化](#代码格式化)
- [开发指南](#开发指南)
  - [测试指南](#测试指南)
  - [演示代码规范](#演示代码规范)
  - [国际化规范](#国际化规范)
  - [ProField 与 valueType（RFC）](#profield-valuetype-rfc)
  - [组件开发模板](#组件开发模板)
- [文档和 Changelog](#文档和-changelog-规范)
- [Git 和 Pull Request](#git-和-pull-request-规范)
- [质量保证](#质量保证)
- [工具链和环境](#工具链和环境)
- [常见问题和故障排查](#常见问题和故障排查)

---

## 项目背景

这是 [ant-design/pro-components](https://github.com/ant-design/pro-components) 的源代码仓库，是基于 antd 的企业级高级组件库，发布为 npm 包 `@ant-design/pro-components`。

### 核心特性

- 基于 antd 6.x 和 React 18+ 开发
- 使用 TypeScript 编写，提供完整类型定义
- 包含 ProForm、ProTable、ProLayout、ProList 等高级组件
- 采用 `@ant-design/cssinjs` 样式方案，与 antd 设计系统一致
- 支持 Design Token 主题系统
- 支持国际化（i18n），包含多语言 locales
- 支持服务端渲染（SSR）
- 依赖 antd，遵循 Ant Design 设计规范

### 与 antd 的关系

- pro-components 是 antd 的扩展，不替代 antd
- 组件设计、API 命名、样式规范均遵循 antd 约定
- 新增组件时需参考 antd 的 API 设计原则

---

## 快速开始

### 开发环境要求

- **Node.js**: >= 18.12.0（推荐 LTS 版本）
- **包管理器**: pnpm（项目使用 `packageManager: "pnpm@9.6.0"`）
- **浏览器兼容性**: 现代浏览器（Chrome 80+、Edge、Firefox、Safari）
- **编辑器**: VS Code（推荐）或其他支持 TypeScript 的编辑器

### 安装依赖

```bash
pnpm install
```

### 常用开发命令

```bash
pnpm start              # 启动开发服务器（dumi 文档）
pnpm run build          # 构建项目（father）
pnpm test               # 运行测试（vitest）
pnpm run lint           # 代码检查（eslint + tsc）
pnpm run prettier       # 代码格式化
pnpm run test:coverage  # 测试覆盖率报告
```

### 项目结构

```
pro-components/
├── src/                      # 组件源代码
│   ├── form/                 # ProForm 表单
│   ├── table/                # ProTable 表格
│   ├── layout/               # ProLayout 布局
│   ├── list/                 # ProList 列表
│   ├── provider/             # 国际化与配置
│   ├── utils/                # 工具函数
│   └── index.tsx             # 组件总入口
├── tests/                    # 测试文件
├── demos/                    # 文档演示
├── scripts/                  # 构建和工具脚本
├── package.json
├── tsconfig.json
├── vitest.config.mts         # Vitest 配置
└── .dumirc.ts               # Dumi 文档配置
```

---

## 代码规范

### 基本编码规范

- ✅ 使用 TypeScript 和 React 书写
- ✅ 使用函数式组件和 Hooks，**避免类组件**
- ✅ 使用 `forwardRef` 实现组件 ref 传递
- ✅ 使用提前返回（early returns）提高代码可读性
- ✅ 避免引入新依赖，严控打包体积
- ✅ 兼容现代浏览器
- ✅ 支持服务端渲染（SSR）
- ✅ 保持向下兼容，避免 breaking change
- ✅ 组件名使用大驼峰（PascalCase），如 `ProForm`、`ProTable`
- ✅ 属性名使用小驼峰（camelCase），如 `onSubmit`、`defaultValue`
- ✅ 合理使用 `React.memo`、`useMemo` 和 `useCallback` 优化性能
- ✅ 使用 `clsx` 处理类名拼接
- ✅ 优先使用 antd 内置组件，减少外部依赖

### 命名规范

Ant Design 生态命名要求使用**完整名称**而非缩写。

#### Props 命名

| 用途           | 命名规则                                | 示例                          |
| -------------- | --------------------------------------- | ----------------------------- |
| 初始化属性     | `default` + `PropName`                  | `defaultValue`、`defaultOpen` |
| 强制渲染       | `forceRender`                           | `forceRender`                 |
| 子组件强制渲染 | `force` + `SubComponentName` + `Render` | `forcePanelRender`            |
| 子组件渲染     | `SubComponentName` + `Render`           | `titleRender`、`footerRender` |
| 数据源         | `dataSource`                            | `dataSource`                  |
| 面板开启       | 使用 `open`，避免使用 `visible`         | `open`、`defaultOpen`         |
| 显示相关       | `show` + `PropName`                     | `showSearch`、`showHeader`    |
| 功能性         | `PropName` + `able`                     | `disabled`、`readable`        |
| 禁用           | `disabled`                              | `disabled`                    |
| 额外内容       | `extra`                                 | `extra`                       |
| 图标           | `icon`                                  | `icon`、`prefixIcon`          |
| 触发器         | `trigger`                               | `trigger`                     |
| 类名           | `className`                             | `className`                   |
| 样式对象       | `style`                                 | `style`                       |

#### 事件命名

| 类型         | 命名规则                                | 示例                  |
| ------------ | --------------------------------------- | --------------------- |
| 触发事件     | `on` + `EventName`                      | `onClick`、`onChange` |
| 子组件事件   | `on` + `SubComponentName` + `EventName` | `onPanelChange`       |
| 前置事件     | `before` + `EventName`                  | `beforeUpload`        |
| 后置事件     | `after` + `EventName`                   | `afterClose`          |
| 连续动作完成 | `on` + `EventName` + `Complete`         | `onUploadComplete`    |

#### 组件引用（Ref）

组件应提供 `ref` 属性，结构如下：

```tsx
interface ComponentRef {
  nativeElement: HTMLElement;
  focus: VoidFunction;
  blur: VoidFunction;
  // 其他方法...
}
```

#### 组件 Token 命名

格式：`variant (optional)` + `semantic part` + `semantic part variant (optional)` + `css property` + `size/disabled (optional)`

示例：`buttonPrimaryColor`、`inputPaddingBlock`、`menuItemActiveBg`。

### API 文档规范

#### API 表格格式

| Property  | Description | Type                         | Default      | Version |
| --------- | ----------- | ---------------------------- | ------------ | ------- |
| htmlType  | 按钮原生类型 | string                       | `button`     | -       |
| type      | 按钮类型     | `primary` \| `default` \| ... | `default`    | -       |
| disabled  | 是否禁用     | boolean                      | false        | -       |
| minLength | 最小长度     | number                       | 0            | -       |
| style     | 自定义样式   | CSSProperties                | -            | -       |

#### API 文档要求

- ✅ 字符串类型的默认值使用反引号包裹，如 `` `button` ``
- ✅ 布尔类型直接使用 `true` 或 `false`
- ✅ 数字类型直接使用数字，如 `0`、`100`
- ✅ 函数类型使用箭头函数表达式，如 `(e: Event) => void`
- ✅ 无默认值使用 `-`
- ✅ 描述首字母大写，结尾无句号
- ✅ API 按字母顺序排列
- ✅ 新增属性需要声明可用版本号

### 样式规范

- 使用 `@ant-design/cssinjs` 作为样式解决方案，与 antd 一致
- 避免硬编码颜色、尺寸、间距，使用 Design Token
- 组件应支持暗色模式、RTL 布局
- 使用 CSS 逻辑属性（如 `margin-inline-start`）替代方向性属性
- 动画使用 `@rc-component/motion` 或 CSS 过渡，尊重 `prefers-reduced-motion`
- 样式覆盖使用类选择器，提高样式特异性

---

## TypeScript 规范

### 基本原则

- ✅ 所有组件和函数必须提供准确的类型定义
- ✅ 避免使用 `any` 类型，尽可能精确地定义类型
- ✅ 使用接口（interface）而非类型别名（type）定义对象结构
- ✅ 导出所有公共接口类型，方便用户使用
- ✅ 严格遵循 TypeScript 类型设计原则，确保类型安全
- ✅ 确保编译无任何类型错误或警告（通过 `pnpm run tsc`）

### 组件类型定义

```tsx
// ✅ 正确：使用 interface 定义 Props
interface ProFormProps {
  submitter?: ProFormDependencyProps;
  onFinish?: (values: any) => Promise<boolean | void>;
}

// ✅ 正确：组件 Props 接口命名
interface ComponentNameProps {
  // ...
}

// ✅ 正确：使用 ForwardRefRenderFunction 定义 ref
const Component = React.forwardRef<ComponentRef, ComponentProps>((props, ref) => {
  // ...
});
```

### 类型使用最佳实践

- ✅ 适当使用泛型增强类型灵活性
- ✅ 使用字面量联合类型定义有限的选项集合
- ✅ 避免使用 `enum`，优先使用联合类型和 `as const`
- ✅ 尽可能依赖 TypeScript 的类型推断
- ✅ 只在必要时使用类型断言（`as`）

```tsx
// ✅ 推荐：使用联合类型和 as const
const ButtonTypes = ['primary', 'default', 'dashed'] as const;
type ButtonType = (typeof ButtonTypes)[number];

// ❌ 不推荐：使用 enum
enum ButtonType {
  Primary = 'primary',
  Default = 'default',
}
```

---

## 代码格式化

### 工具配置

| 工具     | 用途             | 配置文件   |
| -------- | ---------------- | ---------- |
| ESLint   | 代码质量检查     | 项目配置   |
| Prettier | 代码格式化       | `.prettierrc` |
| pretty-quick | pre-commit 格式化 | -      |

### 格式化命令

```bash
pnpm run prettier   # 格式化所有文件
pnpm run lint       # ESLint 检查 + TypeScript 检查
```

### 导入顺序

建议按以下顺序组织导入：

```typescript
// 1. React 导入
import React, { forwardRef, useState } from 'react';
// 2. 第三方库导入
import clsx from 'clsx';
import type { ProColumns } from '@ant-design/pro-components';
// 3. Ant Design / pro-components 内部导入
import { Form } from 'antd';
// 4. 相对路径导入
import { helperFunction } from './helpers';
// 5. 类型导入
import type { RefType } from './types';
```

---

## 开发指南

### 测试指南

#### 测试框架和工具

- 使用 **Vitest** 和 **React Testing Library** 编写单元测试
- 测试覆盖率要求尽量提高，关键逻辑需覆盖
- 测试文件放在 `tests/` 目录，与 `src` 结构对应

#### 运行测试

```bash
pnpm test                  # 运行所有测试
pnpm run test:coverage     # 生成覆盖率报告
pnpm run test:ui           # 启动 Vitest UI
```

#### 测试最佳实践

- ✅ 测试用户行为而非实现细节
- ✅ 使用有意义的测试描述（`describe` 和 `it`）
- ✅ 每个测试用例应该独立，不依赖其他测试
- ✅ 测试边界情况和错误处理

### 演示代码规范

#### Demo 基本要求

- ✅ demo 代码尽可能简洁
- ✅ 避免冗余代码，方便用户复制到项目直接使用
- ✅ 每个 demo 聚焦展示一个功能点
- ✅ 提供中英文两个版本的说明
- ✅ 遵循展示优先原则，确保视觉效果良好

#### 文件组织

- Demo 放在 `demos/` 或组件目录下的 `demos/` 子目录
- 命名：短横线连接的小写英文单词，如 `basic.tsx`、`custom-filter.tsx`

#### TSX 代码规范

- 导入顺序：React → 依赖库 → antd → pro-components → 类型
- 使用函数式组件和 Hooks
- 2 空格缩进，箭头函数，驼峰命名
- 优先使用 antd 和 pro-components 内置组件

### 国际化规范

#### 本地化配置

- 本地化配置文件在 `src/provider/locale/` 下，命名规则如 `zh_CN.tsx`、`en_US.tsx`
- 添加或修改本地化配置时，需同时修改所有语言的配置
- 带有 `${}` 的变量将在实际使用处被替换

#### 使用方式

```tsx
import { IntlProvider, useIntl } from '@ant-design/pro-provider';

export function TestComp() {
  const intl = useIntl();
  return <div>{intl.getMessage('key')}</div>;
}
```

### ProField 与 valueType（RFC） {#profield-valuetype-rfc}

内置表格/表单字段通过 `valueType` 映射到 `src/field` 下具体组件；**ProDescriptions** 使用相同符号（`src/descriptions/typing.ts` re-export）。去重与包体积约定见 RFC：[docs/rfc/2026-04-profield-dedup-and-bundle-size.md](../../docs/rfc/2026-04-profield-dedup-and-bundle-size.md)。内部备忘：[docs/internal/profield-bundle-notes.md](../../docs/internal/profield-bundle-notes.md)。

- **新增内置 `valueType`**：在 `src/field/ValueTypeToComponent.tsx` 的 `ValueTypeToComponentMap` 中注册（`Record<ProFieldBuiltinValueType, …>`）。`PureProField` / `ProFormField` 的 `valueType` 入参类型为 **`ProFieldValueTypeInput`**（字符串 `ProFieldValueType` 或 money/percent 等对象简写），定义在 `src/utils/typing.ts`。若表格 **`render`** 与表单 **`formItemRender`** 对应 JSX **完全一致**，必须使用 **`sameRenderPair(fn)`**，禁止复制双轨；仅当读写分叉时再写显式 `{ render, formItemRender }`。
- **字段子组件 `mode` 分支**：优先使用 `src/field/internal/fieldMode.ts` 中的 `isProFieldReadMode`、`isProFieldEditOrUpdateMode`、`isProFieldEditOnlyMode`（其中「仅 edit、不含 update」的历史语义由 `isProFieldEditOnlyMode` 保持），避免在多个文件重复手写 `mode === 'read'` 等判断。
- **依赖导入**：`antd`、`@ant-design/icons` 使用**具名导入**；避免 `import * as antd` 等易拉大全量的写法。

---

## 文档和 Changelog 规范

### 基本要求

- ✅ 提供中英文两个版本
- ✅ 新的属性需要声明可用的版本号
- ✅ 属性命名符合 antd API 命名规则

### 文档锚点 ID 规范

- 中文标题建议手动指定英文锚点：`## 中文标题 {#english-anchor-id}`
- 锚点 ID 符合 `^[a-zA-Z][\w-:\.]*$`，长度不超过 32 字符

### Changelog 规范

#### 核心原则

1. **文件位置**：在 `CHANGELOG.en-US.md` 和 `CHANGELOG.zh-CN.md` 书写每个版本的变更
2. **有效性过滤**：忽略用户无感知的改动，保持 CHANGELOG 有效性
3. **开发者视角**：描述「用户的原始问题」和「对开发者的影响」
4. **双语输出**：同时提供中文版和英文版
5. **PR 链接**：尽量给出原始 PR 链接，社区 PR 加上贡献者链接

#### Emoji 规范

| Emoji  | 用途                   |
| ------ | ---------------------- |
| 🐞     | 修复 Bug               |
| 💄     | 样式更新或 token 更新  |
| 🆕     | 新增特性 / 新增属性    |
| 🔥     | 极其值得关注的新增特性 |
| 🇺🇸🇨🇳   | 国际化改动             |
| 📖 📝  | 文档或网站改进         |
| ✅     | 新增或更新测试用例     |
| 🛎     | 更新警告/提示信息      |
| ⌨️ ♿  | 可访问性增强           |
| 🗑     | 废弃或移除             |
| 🛠     | 重构或工具链优化       |
| ⚡️     | 性能提升               |

#### 格式示例

**中文**：`Emoji 组件名 动词/描述 … [#PR](链接) [@贡献者]`

**英文**：`Emoji 动词 组件名 描述 … [#PR](链接) [@贡献者]`（动词在前，如 Fix / Add / Support）

---

## Git 和 Pull Request 规范

### 分支管理

**禁止直接提交到以下保护分支**：

- `master`：主分支
- `feature`：特性分支
- `next`：下一个版本分支

### 分支命名规范

| 类型     | 格式                              | 示例                       |
| -------- | --------------------------------- | -------------------------- |
| 功能开发 | `feat/description-of-feature`    | `feat/add-form-validation` |
| 问题修复 | `fix/issue-number-or-description`| `fix/table-sort-issue`     |
| 文档更新 | `docs/what-is-changed`            | `docs/update-api`          |
| 代码重构 | `refactor/what-is-changed`        | `refactor/form-component`  |
| 样式修改 | `style/what-is-changed`           | `style/fix-padding`        |
| 测试相关 | `test/what-is-changed`            | `test/add-form-tests`      |

### Pull Request 规范

#### PR 标题

- 使用英文，格式：`类型: 简短描述`
- 示例：`fix: fix ProTable sort behavior`、`feat: add ProForm layout support`

#### PR 内容

- 默认使用英文，简洁清晰描述改动
- 可附中文说明

#### PR 提交注意事项

1. **合并策略**：新特性提交至 `feature`，其余提交至 `master`
2. **审核流程**：需维护者审核，CI 通过
3. **工具标注**：使用 Cursor 提交的代码请在 PR body 末尾标注：`> Submitted by Cursor`

---

## 质量保证

### 代码质量要求

- ✅ 确保代码运行正常，无控制台错误
- ✅ 适配常见浏览器
- ✅ 避免过时 API
- ✅ 通过 ESLint 和 TypeScript 检查

### 性能要求

- ✅ 避免不必要的重新渲染
- ✅ 合理使用 `React.memo`、`useMemo`、`useCallback`
- ✅ 支持 Tree Shaking

### 兼容性要求

- ✅ 依赖 antd ^6.0.0、React >=18.0.0
- ✅ 兼容 Chrome 80+ 浏览器
- ✅ 支持服务端渲染（SSR）
- ✅ 保持向下兼容，避免 breaking change

---

## 工具链和环境

### 开发工具

- **编辑器**：VS Code 或支持 TypeScript 的编辑器
- **代码检查**：ESLint + TypeScript
- **格式化**：Prettier
- **Git hooks**：yorkie（pre-commit: pretty-quick，commit-msg: fabric verify-commit）

### 构建工具

| 工具  | 用途               |
| ----- | ------------------ |
| Father | 组件编译（lib/es） |
| Dumi  | 文档站点           |
| Vite  | 测试运行环境       |

### 相关配置文件

| 配置文件       | 说明             |
| -------------- | ---------------- |
| `package.json` | 项目配置和脚本   |
| `tsconfig.json`| TypeScript 配置  |
| `vitest.config.mts` | Vitest 配置  |
| `.dumirc.ts`   | Dumi 文档配置    |

---

## 常见问题和故障排查

### 开发相关问题

#### 启动开发服务器失败

```bash
# 确认 Node.js 版本
node -v  # 应该 >= 18

# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 样式不生效

- 确保 antd 和 `@ant-design/cssinjs` 正确引入
- 检查 `ConfigProvider` 是否正确包裹

#### TypeScript 类型错误

```bash
pnpm run tsc
```

### 测试相关问题

### 构建相关问题

```bash
pnpm run build
```

---

## 参考资料

- [API Naming Rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)
- [Ant Design 开发指南](https://github.com/ant-design/ant-design/wiki/Development)
- [React 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

---

## 特别说明

如果使用 AI 编程助手（如 Cursor）进行开发，请在提交 PR 时在末尾标注：`> Submitted by Cursor`
