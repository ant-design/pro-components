# ProField 包体积 / 去重备忘（RFC 阶段 0～2）

关联 RFC：[docs/rfc/2026-04-profield-dedup-and-bundle-size.md](../rfc/2026-04-profield-dedup-and-bundle-size.md)。

## valueType 类型分层（`src/utils/typing.ts`）

| 名称                                  | 含义                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `ProFieldValueType`                   | `ProFieldValueTypeWithFieldProps` 的键全集（Schema + 内置 Field）           |
| `ProFieldSchemaLayoutValueType`       | `group` / `formList` / `formSet` / `divider` / `dependency`，走 Schema 管道 |
| `ProFieldBuiltinValueType`            | `Exclude<ProFieldValueType, …>`，与 `ValueTypeToComponent` 映射键一致       |
| `PRO_FIELD_SCHEMA_LAYOUT_VALUE_TYPES` | 上述布局类字面量数组，供运行时校验或文档生成复用                            |

`ValueTypeToComponent.tsx` 中映射类型为 `Record<ProFieldBuiltinValueType, ProRenderFieldPropsType>`，新增/调整内置类型时需同时改 `ProFieldValueTypeWithFieldProps` 与本映射。

Form 侧：`src/form/typing.ts` 从 `utils/typing` re-export valueType 相关符号；运行时入参优先记 **`ProFieldValueTypeInput`**（= 字符串联合 `ProFieldValueType` | 对象简写 `ProFieldValueObjectType`）。

**ProDescriptions**：`src/descriptions/typing.ts` 同步 re-export；`FieldRender` 的 `valueType` 为 **`ProFieldValueTypeInput`**，且用 `Omit<…, 'valueType'>` 与 `ProSchema` 上原 `valueType`（含函数形式）避免交叉类型冲突。

## `ValueTypeToComponent.tsx` 阶段 1（sameRenderPair）

| 指标                    | 值         |
| ----------------------- | ---------- |
| 实施日期                | 2026-04-08 |
| 重构前（行数，`wc -l`） | 596        |
| 重构后（行数，`wc -l`） | 314        |

内置 `valueType` 的 `render` 与 `formItemRender` 此前为逐字重复；现已通过 `sameRenderPair`（[src/field/ValueTypeToComponent.tsx](../../src/field/ValueTypeToComponent.tsx)）合并为 **同一函数引用**，行为与合并前一致。若某类型未来需要读写分叉，应对该 key 改回显式 `{ render, formItemRender }`。

## 阶段 2（`fieldMode`）

| 指标     | 值                                                                       |
| -------- | ------------------------------------------------------------------------ |
| 实施日期 | 2026-04-08                                                               |
| 入口文件 | [src/field/internal/fieldMode.ts](../../src/field/internal/fieldMode.ts) |

- `isProFieldReadMode`：`mode === 'read'`。
- `isProFieldEditOrUpdateMode`：`mode === 'edit' || mode === 'update'`（多数 Field* 编辑态）。
- `isProFieldEditOnlyMode`：**仅** `mode === 'edit'`（与重构前一致：Radio、Checkbox、Cascader、TreeSelect 等对 `update` 仍不进入该分支，避免行为变化）。

`Select` / `Cascader` / `TreeSelect` 内原 `mode !== 'read'` 的早期 `return` 已改为 `!isProFieldReadMode(mode)`。

## 阶段 3：字段依赖与 tree shaking

### `src/field` 导入审计（2026-04）

- **antd**：各子模块普遍使用 `import { Button, … } from 'antd'` 或 `import type { X } from 'antd'` 的**具名导入**，利于打包器做模块级 tree-shaking（与用户侧 bundler 解析方式一致时）。
- **`@ant-design/icons`**：均为具名图标导入（如 `SearchOutlined`），无 `import * as Icons` 类写法。
- **未发现**：`import * as … from 'antd'`（在 `src/field` 范围内检索）。
- `src/field` 的运行时依赖直接导入 `provider` / `utils` 的具体模块，避免经过聚合入口拉入无关代码。
- 字段只使用 8 个翻译键，`fieldLocale.ts` 保留这些消息的同步快照；`fieldLocaleParity.test.ts` 逐语言与完整消息表对照。字段仍遵循 `ProConfigProvider` 自定义 intl 与 antd locale。
- `package.json` 将 `field/initDayjs` 标记为有副作用，防止打包器清除日期插件初始化。
- `scripts/checkFieldTreeShaking.mjs` 验证首屏静态依赖不会保留按需字段或完整语言表，并验证日期插件留在对应 chunk。

默认 `ProField` 的 `valueType` 可在运行时变化。`FieldLoaders.tsx` 用静态路径的 `import()` 建立按需 chunk，首屏只同步加载文本和索引字段。首次请求其他类型时显示 `data-pro-field-loading` 占位；同一类型的请求共用 Promise，完成后渲染组件。ESM 构建保留 `import()`，消费方打包器负责产出和加载 chunk。UMD 构建仍包含全部字段。

`field` 聚合入口导出的其他 `FieldXxx` 也经过同一加载器，避免静态 re-export 把按需 chunk 重新并入首屏；内部 `ProFormXxx` 直接导入字段实现，保持表单控件首次渲染同步。

可在表单显示前或 SSR 渲染前预加载所需类型，以避免占位：

```tsx
import { preloadProFieldValueType } from '@ant-design/pro-components';

await preloadProFieldValueType('money');
```

只需要部分字段时，也可使用公开的 `createProField` 与选定字段组合：

```tsx
import { createProField, FieldText } from '@ant-design/pro-components';

const TextOnlyProField = createProField((text, _valueType, props) => (
  <FieldText {...props} text={String(text)} />
));
```

`ValueTypeToComponent.tsx` 的 SchemaForm 字段映射仍静态引用全部内置字段，属于后续独立优化范围。

### 维护约定（摘要）

- 新增内置 `valueType`：优先使用 `sameRenderPair`（见 `ValueTypeToComponent.tsx`），读写分叉时再写显式 `{ render, formItemRender }`。
- `mode` 分支：使用 `src/field/internal/fieldMode.ts` 内 helper，勿复制三态判断。

## 后续（未实施）

- 懒加载重依赖或按域拆分 `ValueTypeToComponent`（单独评审 SSR/测试）。
- 各 Field 内进一步抽「只读格式化 / pickProProps」：按组件个案。
- CI 体积对比（size-limit）：可选，见 RFC 开放问题 1。
