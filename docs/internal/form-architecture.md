# ProForm 内部架构备忘（RFC 阶段 0 交付）

本文档描述 `src/form/BaseForm/BaseForm.tsx` 的主数据流与副作用，供重构时对照顺序敏感点。实现以代码为准；如有出入以代码优先。

## 类型文件（RFC 阶段 4）

- **`src/form/typing/layout.ts`** — `ProFormGridConfig`（栅格/行列）。
- **`src/form/typing/fieldItem.ts`** — `ProFormFieldItemProps`、`ExtendsProps`、`ProFormGroupProps` 等字段层类型。
- **`src/form/typing/index.ts`** — 统一 re-export；对外仍通过 `import { … } from '@ant-design/pro-form'` 或 `from './typing'`。
- **未并入本目录**：`CommonFormProps` 等仍定义在 `BaseForm/BaseForm.tsx` 附近；Schema 列类型见 `components/SchemaForm/typing.ts`。

## 主数据流

```
params + request?  → useFetchData → initialData
URL (syncToUrl)    → urlSearch / urlParamsMergeInitialValues → 与 initialValues 合并 → Form.initialValues

用户编辑 → onValuesChange → transformKey(changedValues) / transformKey(values)

提交 → onFinish → getFieldsFormatValue（经 transformKey 管线）→ 用户 onFinish；若 syncToUrl → setUrlSearch(genParams(...))
```

`transformKey` 管线（概念顺序，与实现一致）：

1. `conversionMomentValue`（日期、`fieldsValueType`、`dateFormatter`）
2. `transformKeySubmitValue`（`transformKeyRef` 中各字段 `transform`）

## BaseForm 中副作用（useEffect / useImperativeHandle）清单

### `BaseFormComponents`（与 `BaseForm.tsx` 同文件，Form 子树内）

| 位置 | 依赖 / 说明 |
|------|-------------|
| `useEffect` | `props.initialValues`：在非 syncToUrl、无 request 时，用 `noteOnce` 提示 initialValues 仅初始化生效 |
| `useImperativeHandle` | `[omitNil, transformKey, formRef.current]`：向 `formRef` 暴露 `getFieldsFormatValue` 等（基于 `formRef.current`） |
| `useEffect` | `[]`：挂载后调用 `onInit(finalValues, { ...formRef, ...formatValues })` |

顺序敏感：`onInit` 仅在挂载跑一次；与外层 `request` 导致的重渲染无关（仍在 mount 后首次执行）。

### `BaseForm`（外层）

| 位置 | 依赖 / 说明 |
|------|-------------|
| `useEffect` | `[]`：`requestFormCacheId` 缓存（等同原 `requestFormCacheId += 0`） |
| `useEffect` | `syncToInitialValues`：为 false 时清空 `urlParamsMergeInitialValues` |
| `useEffect` | `extraUrlParams`, `getGenParams`, `syncToUrl`：当 `syncToUrl` 时，将 `genParams(syncToUrl, getGenParams(), 'set')` 写回 URL（**与 extraUrlParams 同步相关**） |
| `useImperativeHandle` | `[!initialData]`：将 `formRef` 暴露给 `propsFormRef` |

顺序敏感：

- URL 与 `request`：`request` 为真且 loading 时整表先 `Spin`，`initialData` 到达后再渲染 `Form`；`useUrlSearchParams` 与 `useFetchData` 并行，合并顺序见 `initialValues` 三元（`syncToUrlAsImportant`）。
- `onFinish` 内 `syncToUrl` 依赖当前 `urlSearch` 做 key 清空（`#3547`），改动时需保留该逻辑。

## 相关路径（仓库根，与当前实现一致）

- `src/form/BaseForm/BaseForm.tsx` — 请求、`genParams` / URL、`transformKey`、`BaseFormComponents`（同文件）、`Form` 与各类 Provider
- `src/form/components/FormItem/warpField.tsx` — 字段包装与合并逻辑
- `src/form/components/SchemaForm/` — `BetaSchemaForm` 与 `valueType` 管道

## Schema 专用 `getFieldProps` / `getFormItemProps`

- **来源**：`BetaSchemaForm` / `columns` 常把 `getFieldProps`、`getFormItemProps` 配在列上；运行时仍进入 **`warpField`**，与 `changedProps` 合并（见 `warpField.tsx`）。
- **命令式**：一般直接写 `fieldProps` / `formItemProps`，不经过上述函数。
- **收敛**：是否在类型或目录上标「仅 Schema」属 RFC **阶段 3**；当前行为以 `warpField.tsx` 内合并顺序为准。

## Schema 路径（RFC 阶段 3 备忘）

- **入口**：`src/form/components/SchemaForm/index.tsx` 导出 `BetaSchemaForm`（默认导出）；`layoutType` 映射到 `DrawerForm` / `QueryFilter` / `LightFilter` / `ModalForm` / `StepsForm` / `Embed` / `ProForm` 等（见文件内 `FormLayoutType`）。
- **列 → 节点**：`renderValueType`（`src/form/components/SchemaForm/valueType/index.tsx` 等）与 `ValueTypeToComponent`（`src/field/ValueTypeToComponent`）协作，最终仍落到各 `ProFormXxx`（经 `warpField` 包装）。
- **对齐测试**：`tests/form/schemaImperativeAlignment.test.tsx` — 覆盖 `valueType` **text、digit、select、dateTime、switch、date、checkbox**：`BetaSchemaForm` 单列与对应 `ProFormText` / `ProFormDigit` / `ProFormSelect` / `ProFormDateTimePicker` / `ProFormSwitch` / `ProFormDatePicker` / `ProFormCheckbox` 在相同 `initialValues` 下 `getFieldsValue(true)` 一致（日期类用 `dayjs` 时间戳比较）。新增类型时建议在此文件追加一条用例。

### `SchemaForm/valueType` 目录

- **`valueType/index.tsx`**：`renderValueType` 管道（先跑容器/布局类步骤，再走默认 `field`）。
- **`valueType/`** 下各模块：`ignore`、`group`、`formList`、`formSet`、`divider`、`dependency`（与 `field.tsx` 分离，便于浏览）。
- **`valueType/field.tsx`**：默认落到 `ProFormField` 的路径。

## 回归基线

```bash
npm test -- tests/form
npm run lint
```
