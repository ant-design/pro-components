# ProForm 公开类型 API（维护者备忘）

面向 `@ant-design/pro-components/form` 与根包 `form` 重导出。实现以 `src/form/index.tsx` 为准。

## 分层

| 层 | 主要类型 | 定义位置 |
| --- | --- | --- |
| 表单壳 | `CommonFormProps`, `BaseFormProps`, `ProFormInstance`, `ProFormRef`, `SyncToUrl` | `BaseForm/BaseForm.tsx`, `BaseForm/typing.ts` |
| 栅格 | `ProFormGridConfig`, `GridHelpers`, `SpanConfig` | `typing.ts`, `helpers/grid.tsx`, `layouts/QueryFilter` |
| 表单项 | `ProFormItemProps`, `ProFormItemHelpFunction` | `components/FormItem/typing.ts` |
| 字段 | `ProFormFieldItemProps`, `ExtendsProps`, `ProFormItemCreateConfig`, `ProFormFieldRemoteProps` | `typing.ts` |
| 字段工厂 | `createProFormField`, `useProFormFieldShell`, `ProFormFieldShellFunctionProps` | `FormItem/createProFormField.tsx`, `useProFormFieldShell.tsx` |
| Schema | `ProFormColumnsType`, `FormSchema`, `FormFieldType`, `BetaSchemaForm` 相关 helpers | `components/SchemaForm/typing.ts` |
| Form.Item 键 | `pickProFormItemProps`, `omitProFormItemProps`, `proFormItemPropKeys` | `utils/pickProFormItemProps` |

## 命名约定

- **`ProFormItemProps`**：antd `Form.Item` + Pro 扩展（`transform`, `convertValue`, `valueType`, addon 等）。**单一来源** `FormItem/typing.ts`。
- **`ProFormFieldItemProps<T, K>`**：具体 `ProFormXxx` / `ProFormField` 的 props = 字段控件 + `Omit<ProFormItemProps, 'valueType'>` + 栅格 + `ExtendsProps`。
- 勿再将 `ProFormFieldItemProps` 别名成 `ProFormItemProps`（已在 #9751 移除误导性 re-export）。

## 类型 import 约定（内部）

- `ProFormInstance` / `ProFormRef` / `SyncToUrl`：优先 `BaseForm/typing.ts`（不经过 `BaseForm` 运行时 barrel）。
- `CommonFormProps` / `BaseFormProps`：类型仅 import 时可用 `BaseForm/BaseForm.tsx`（类型仍在该文件，尚未拆到纯类型模块）。

## 已知松散类型（后续收紧）

- `ProFormRenderValueTypeItem.label`、`getFieldProps` / `getFormItemProps` 返回 `any`（Schema 运行时函数形态）。
- `ProFormItemCreateConfig.defaultProps?: Record<string, any>`。
- `ExtendsProps` 与 `ProFormFieldItemProps` 均含 `secondary`（重复但合并无害）。
- `FiledContextProps` 拼写别名保留，`FieldContextProps` 为推荐名。

## 消费者推荐 import

```ts
import type {
  ProFormFieldItemProps,
  ProFormInstance,
  ProFormColumnsType,
  ExtendsProps,
} from '@ant-design/pro-components/form';
import { createProFormField, pickProFormItemProps } from '@ant-design/pro-components/form';
```
