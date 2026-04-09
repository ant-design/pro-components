# ProField 包体积 / 去重备忘（RFC 阶段 0～2）

关联 RFC：[docs/rfc/2026-04-profield-dedup-and-bundle-size.md](../rfc/2026-04-profield-dedup-and-bundle-size.md)。

## valueType 类型分层（`src/utils/typing.ts`）

| 名称 | 含义 |
| ---- | ---- |
| `ProFieldValueType` | `ProFieldValueTypeWithFieldProps` 的键全集（Schema + 内置 Field） |
| `ProFieldSchemaLayoutValueType` | `group` / `formList` / `formSet` / `divider` / `dependency`，走 Schema 管道 |
| `ProFieldBuiltinValueType` | `Exclude<ProFieldValueType, …>`，与 `ValueTypeToComponent` 映射键一致 |
| `PRO_FIELD_SCHEMA_LAYOUT_VALUE_TYPES` | 上述布局类字面量数组，供运行时校验或文档生成复用 |

`ValueTypeToComponent.tsx` 中映射类型为 `Record<ProFieldBuiltinValueType, ProRenderFieldPropsType>`，新增/调整内置类型时需同时改 `ProFieldValueTypeWithFieldProps` 与本映射。

Form 侧：`src/form/typing.ts` 从 `utils/typing` re-export valueType 相关符号；运行时入参优先记 **`ProFieldValueTypeInput`**（= 字符串联合 `ProFieldValueType` | 对象简写 `ProFieldValueObjectType`）。

**ProDescriptions**：`src/descriptions/typing.ts` 同步 re-export；`FieldRender` 的 `valueType` 为 **`ProFieldValueTypeInput`**，且用 `Omit<…, 'valueType'>` 与 `ProSchema` 上原 `valueType`（含函数形式）避免交叉类型冲突。

## `ValueTypeToComponent.tsx` 阶段 1（sameRenderPair）

| 指标 | 值 |
| ---- | -- |
| 实施日期 | 2026-04-08 |
| 重构前（行数，`wc -l`） | 596 |
| 重构后（行数，`wc -l`） | 314 |

内置 `valueType` 的 `render` 与 `formItemRender` 此前为逐字重复；现已通过 `sameRenderPair`（[src/field/ValueTypeToComponent.tsx](../../src/field/ValueTypeToComponent.tsx)）合并为 **同一函数引用**，行为与合并前一致。若某类型未来需要读写分叉，应对该 key 改回显式 `{ render, formItemRender }`。

## 阶段 2（`fieldMode`）

| 指标 | 值 |
| ---- | -- |
| 实施日期 | 2026-04-08 |
| 入口文件 | [src/field/internal/fieldMode.ts](../../src/field/internal/fieldMode.ts) |

- `isProFieldReadMode`：`mode === 'read'`。
- `isProFieldEditOrUpdateMode`：`mode === 'edit' || mode === 'update'`（多数 Field* 编辑态）。
- `isProFieldEditOnlyMode`：**仅** `mode === 'edit'`（与重构前一致：Radio、Checkbox、Cascader、TreeSelect 等对 `update` 仍不进入该分支，避免行为变化）。

`Select` / `Cascader` / `TreeSelect` 内原 `mode !== 'read'` 的早期 `return` 已改为 `!isProFieldReadMode(mode)`。

## 阶段 3（进行中）：导入约定与映射耦合

### `src/field` 导入审计（2026-04）

- **antd**：各子模块普遍使用 `import { Button, … } from 'antd'` 或 `import type { X } from 'antd'` 的**具名导入**，利于打包器做模块级 tree-shaking（与用户侧 bundler 解析方式一致时）。
- **`@ant-design/icons`**：均为具名图标导入（如 `SearchOutlined`），无 `import * as Icons` 类写法。
- **未发现**：`import * as … from 'antd'`（在 `src/field` 范围内检索）。
- **已知耦合**：`ValueTypeToComponent.tsx` 仍在文件顶部静态 `import` 全部内置 `Field*`，因此「只用到少数 valueType」的用户若从**主包入口**拉取 ProField 映射，仍会随映射文件带上全部字段实现路径——进一步缩小需懒加载或拆文件 + 单独评审，见 RFC 开放问题 2。

### 维护约定（摘要）

- 新增内置 `valueType`：优先使用 `sameRenderPair`（见 `ValueTypeToComponent.tsx`），读写分叉时再写显式 `{ render, formItemRender }`。
- `mode` 分支：使用 `src/field/internal/fieldMode.ts` 内 helper，勿复制三态判断。

## 后续（未实施）

- 懒加载重依赖或按域拆分 `ValueTypeToComponent`（单独评审 SSR/测试）。
- 各 Field 内进一步抽「只读格式化 / pickProProps」：按组件个案。
- CI 体积对比（size-limit）：可选，见 RFC 开放问题 1。
