# RFC: ProField 去重与包体积优化


| 元数据      | 内容                                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **状态**   | **Accepted**；阶段 0～2 已实施（2026-04-08）；**阶段 3 部分推进**：开发约定与导入审计已写入 AGENTS / 内部备忘；体积预算 CI、按域拆 `ValueTypeToComponent`、懒加载仍待评审 |
| **创建日期** | 2026-04-08                                                                                                                                                     |
| **阶段 1 实现** | `src/field/ValueTypeToComponent.tsx` 内 `sameRenderPair`；备忘见 `docs/internal/profield-bundle-notes.md`                                                                 |
| **阶段 2 实现** | `src/field/internal/fieldMode.ts`：`isProFieldReadMode`、`isProFieldEditOrUpdateMode`、`isProFieldEditOnlyMode`（原仅为 `mode === 'edit'` 的交互分支保持不变，不含 `update`） |
| **类型分层** | `src/utils/typing.ts`：`ProFieldValueType`、`ProFieldSchemaLayoutValueType`、`ProFieldBuiltinValueType`；`ValueTypeToComponent` 映射为 `Record<ProFieldBuiltinValueType, …>` |
| **范围**   | `src/field`（`PureProField` / `ProFieldCore`、`ValueTypeToComponent.tsx`、各 `components/*`）、与 ProField 耦合的 `src/form/components/Field` 等                          |
| **相关文件** | `src/field/ValueTypeToComponent.tsx`、`src/field/PureProField.tsx`、`src/field/ProFieldCore.tsx`、`src/field/components/`**、`src/form/components/Field/index.tsx` |


## 摘要

`ProField` 层承担「`valueType` → 具体展示组件」的映射与读写两套渲染（表格/描述 **render** 与表单 **formItemRender**）。当前实现中，**同一 valueType 下 `render` 与 `formItemRender` 大量逐字重复**，且 **按类型拆分的组件目录在 props 组装上存在相似样板**，不利于维护，也不利于 **tree-shaking 与侧向重复依赖** 的收敛。

本 RFC 的主目标是：**在保持对外 API 与默认行为兼容**（非 major 不 intentional breaking）的前提下，**减少重复代码**，并 **可度量地降低 `@ant-design/pro-components` 中与 ProField 相关的有效包体积**（以 esbuild / rollup 分析与 `size-limit` 或等价手段为准）。

## 背景：重复与体积从哪来


| 来源                            | 说明                                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `**ValueTypeToComponent` 双轨** | 多数 `valueType` 在 `ValueTypeToComponent.tsx` 中同时定义 `render` 与 `formItemRender`，二者常为实现相同的 JSX，仅复制粘贴两份。                    |
| **字段子组件形态相近**                 | `components/Digit`、`components/Text`、`components/Select` 等在「接 `text` / `fieldProps` / `mode`」等模式上重复相似逻辑，缺少薄层工厂或共享 hook。 |
| **依赖与导入粒度**                   | 单文件集中 `import` 多类 antd/rc 组件时，若未保持 **按需路径** 或 **可被分析的死代码消除**，易放大用户侧 bundle；需对照现有 father / 用户 bundler 行为验证。              |
| **与 `src/form` 的边界**          | `ProFormField` → `PureProField` 与 Schema 路径共享规则，但历史上「表单专用 props」与「只读展示」分叉，易产生两套近似分支。                                    |


### 只读（read）与编辑（edit）：能不能分开看？

可以，而且要分清 **三层** 里「分开」分别指什么：


| 层次                            | 现状             | 说明                                                                                                                                                                                                                                                                                              |
| ----------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core 调度**                   | **已分开**        | `src/field/ProFieldCore.tsx` 中 `createProField` 支持传入 **双函数**：`{ renderRead, renderEdit }`（类型 `ProFieldDualRender`）；运行时按 `effectiveMode` **只调用其一**，注释明确：**避免在单函数内反复判断 mode**。`PureProField`（`PureProField.tsx`）已使用 `createProField({ renderRead: pureRenderRead, renderEdit: pureRenderEdit })`。 |
| `**ValueTypeToComponent` 映射** | **名义双轨、常实质重复** | 每个 `valueType` 同时写 `render`（表格/描述等 **读展示**）与 `formItemRender`（表单 **编辑**）。很多条目里两段 JSX **是同一个 `FieldXxx`、同一套 props**，属于 **同一展示组件写了两遍**，去重目标应是 **合并为工厂** `(props) => ({ render: …, formItemRender: … })`，而不是把「读」「写」当成两套无关实现。                                                                       |
| **字段子组件 `components/*`**      | **单文件内分支**     | 如 `Digit`、`Select` 等常见写法是 **一个组件文件** 内 `if (mode === 'read')` / `else`：只读与编辑 **共享 import 与类型**，便于就近改。若分支过长，可 **同目录** 抽 `FooRead` / `FooEdit` 子组件 **仅提升可读性**，对外仍导出原 `Foo`；是否拆文件属个案，不是本 RFC 的硬性要求。                                                                                                |


**结论**：从运行时路径看，**read 与 edit 在 Core 层已经分开调度**；从维护与体积看，**最肥的重复**往往在 `ValueTypeToComponent` 里「同一只读组件贴两次」。本 RFC 阶段 1 优先处理该层工厂合并；字段文件内的 mode 分支是否再拆，按复杂度可选。

### 建议度量的基线（实施前）

1. **重复度**：对 `ValueTypeToComponent.tsx` 中 `render` / `formItemRender` 成对条目做统计（行数、可合并条目数）。
2. **体积**：对 `src/field` 单独做一次打包分析（或 `pnpm run build` 产物 + `source-map-explorer` / `rollup-plugin-visualizer` 等），记录 gzip 与未压缩体积基线。
3. **导出面**：列出 `src/field/index.tsx`（及主包 re-export）的 **公开导出**，避免优化时误伤用户侧 `import { X } from '@ant-design/pro-components'`。

## 目标与非目标

### 目标

1. **去重**：优先合并 **语义完全一致** 的 `render` / `formItemRender`（工厂函数、小工具函数或 `const fieldPair = (C) => ({ render, formItemRender })` 等），减少同步修改两处的心智负担。
2. **包体积**：在行为不变前提下，通过 **更细的模块边界、合并重复逻辑、审视顶层副作用 import** 等，使 ProField 相关 chunk **可观测下降**（CI 或发布前脚本对比基线）。
3. **可测**：对抽取的工厂函数 / 归一化逻辑补充 **单元测试**（输入 props → 输出 element 类型或关键 props），避免仅靠 snapshot。
4. **渐进**：分阶段 PR，每阶段可单独发布与回滚。

### 非目标（本 RFC 不一次性解决）

- 改变 `**valueType` 字符串枚举** 或对外 TypeScript 类型名（除非走 major + 迁移说明）。
- **为体积** 擅自把大量组件改为 **异步 `import()`** 导致用户侧行为变化（如水合顺序、首屏闪烁），除非单独 RFC 评审 SSR/CSR 策略。
- 引入 **新的 npm 依赖** 仅用于体积（项目严控依赖；确有需求需单独评审）。

## 提议方案：分阶段实施

### 阶段 0：基线与清单（约 1～2 天）


| 工作项  | 说明                                                                            |
| ---- | ----------------------------------------------------------------------------- |
| 重复清单 | 标注 `ValueTypeToComponent.tsx` 中可合并的 `render`/`formItemRender` 对（完全等价 vs 需微调）。 |
| 体积基线 | 记录构建产物或分析报告中 `field` 相关占比；可选在 CI 增加 **非阻断** 体积对比 job。                         |
| 导出清单 | 确认 `src/field` 对外 API 与文档一致，重构时 **不删公开导出**。                                   |


**交付物**：本目录下或 `docs/internal/profield-bundle-notes.md` 的简短笔记（可选）+ 基线数字。

### 阶段 1：`ValueTypeToComponent` 去重（优先，风险低）

- **当前**：已用 `sameRenderPair` 合并内置 map 中全部 **完全一致** 的 `render` / `formItemRender`（见 `docs/internal/profield-bundle-notes.md` 行数对比）。
- 对 **仅有细微差异**（如 `placeholder` 解析）的条目，抽 **共享 `buildFieldProps(text, props)`**，两处仅传不同入口（若未来出现读写分叉再评估）。
- **验收**：`tests/field` + 与 ProField 相关的 `tests/form` 全绿；无公开 API 变更。

### 阶段 2：字段子组件内部复用（中风险）

- **当前**：已在 `src/field/internal/fieldMode.ts` 抽取 **mode 判断纯函数**，并在各 `Field*` 内将 `mode === 'read'` / `mode === 'edit' || mode === 'update'` / 仅 `mode === 'edit'` 三类分支替换为对应 helper，避免跨文件复制相同判断；**未**改动 JSX 结构与事件顺序。
- 进一步：重复的「只读格式化 / `pickProProps`」等可继续按组件个案抽 `utils.ts`（本迭代未强制）。
- **禁止** 为「整洁」改变组件嵌套顺序或 key 生成规则（可能影响动画与受控行为）。

### 阶段 3：包体积专项（与阶段 1/2 穿插）


| 方向       | 说明                                                          | 进展（2026-04） |
| -------- | ----------------------------------------------------------- | ------------- |
| **导入路径** | 核对 antd / `@ant-design/icons` 等是否保持按需；避免 `import * as` 拉全量。 | 已对 `src/field` 做抽样：`antd` / `@ant-design/icons` 均为**具名导入**，未发现 `import * as antd`；详见 `docs/internal/profield-bundle-notes.md`。 |
| **侧向依赖** | 将仅被少数 valueType 使用的重依赖限制在 **懒加载子路径**（若做，必须单独评审 SSR 与测试策略）。  | 未实施；仍属开放项。 |
| **文档**   | 在 `AGENTS.md` 或字段开发说明中明确：**新增 valueType 应优先复用工厂**，避免再复制双轨。  | 已写入 `.cursor/rules/AGENTS.md`「ProField 与 valueType（RFC）」。 |
| **映射文件体积** | `ValueTypeToComponent.tsx` 顶层仍集中 `import` 各 `Field*`，与「单文件可维护性 vs chunk 形态」的权衡见开放问题 2。 | 仅文档记录，未改模块图。 |


## 风险与缓解


| 风险                    | 缓解                                                           |
| --------------------- | ------------------------------------------------------------ |
| 抽取工厂后 JSX 微差异导致展示回归   | 对高流量 valueType（`text`、`digit`、`select`、`date`*）加 RTL 或最小行为测试 |
| 体积优化改变 chunk 分割影响按需加载 | 发布前用分析工具对比；必要时仅合并 **源码重复** 不改变模块图                            |
| 与 `src/form` 共用类型循环依赖 | 类型放 `types.ts` 或 `utils` 层；禁止 field→form→field 硬引用           |


## 成功标准

- `render` / `formItemRender` **重复代码行数显著下降**（PR 中给出去重前后 diffstat 或统计）。
- **包体积**：至少一条可引用指标改善（例如 field 相关 gzip 下降 ≥ 约定阈值，或由维护者在 PR 中写明分析截图与结论）。
- **测试**：`pnpm test -- tests/field`（若存在）及受影响 `tests/form` 通过；触及行为时补充用例而非仅靠快照。

## 与 ProForm RFC 的关系

- `docs/rfc/2026-04-pro-form-architecture-refactor.md` 侧重 **表单壳、warpField、Schema 路径对齐**；本 RFC 侧重 `**src/field` 展示层与 valueType 映射**。
- 二者均遵循：**Never break userspace**；非 major 不改公开导出与默认行为。

## 开放问题

1. 是否在 CI 中引入 **体积预算**（size-limit）作为 **警告** 而非硬门禁？
2. 是否将 `ValueTypeToComponent` 按域拆文件（可维护性）与 **单 chunk 体积** 之间如何权衡？

---

*本 RFC 为提案；实施以具体 PR、代码审阅与基线数据为准。*