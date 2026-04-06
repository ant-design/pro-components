# ProForm 内部架构备忘（RFC 阶段 0 交付）

本文档描述 `src/form/BaseForm/BaseForm.tsx` 的主数据流与副作用，供重构时对照顺序敏感点。实现以代码为准；如有出入以代码优先。

## 类型文件（RFC 阶段 4）

- **`src/form/typing/layout.ts`** — `ProFormGridConfig`（栅格/行列）。
- **`src/form/typing/fieldItem.ts`** — `ProFormFieldItemProps`、`ExtendsProps`、`ProFormGroupProps` 等字段层类型。
- **`src/form/typing/index.ts`** — 统一 re-export；对外仍通过 `import { … } from '@ant-design/pro-form'` 或 `from './typing'`。
- **未并入本目录**：提交管线见 `BaseForm/BaseFormTypes.ts`（`CommonFormProps` 等）；Schema 列类型见 `components/SchemaForm/typing.ts`——避免与上述模块循环依赖。

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

### `BaseFormComponents`（Form 子树内）

| 位置 | 依赖 / 说明 |
|------|-------------|
| `useEffect` | `props.initialValues`：在非 syncToUrl、无 request 时，用 `noteOnce` 提示 initialValues 仅初始化生效 |
| `useImperativeHandle` | `[omitNil, transformKey, formRef.current]`：向 `formRef` 暴露 `getFieldsFormatValue` 等（基于 `formRef.current`） |
| `useEffect` | `[]`：挂载后调用 `onInit(finalValues, { ...formRef, ...formatValues })` |

顺序敏感：`onInit` 仅在挂载跑一次；与外层 `request` 导致的重渲染无关（仍在 mount 后首次执行）。

### `BaseForm`（外层）

| 位置 | 依赖 / 说明 |
|------|-------------|
| `useRequestFormCacheBump` | 挂载时调用 `bumpRequestFormCacheId()`（等同原 `requestFormCacheId += 0`） |
| `useEffect`（在 `useUrlFormSync` 内） | `syncToInitialValues`：为 false 时清空 `urlParamsMergeInitialValues` |
| `useEffect`（在 `useUrlFormSync` 内） | `extraUrlParams`, `getGenParams`, `syncToUrl`：当 `syncToUrl` 时，将 `genParams(syncToUrl, getGenParams(), 'set')` 写回 URL（**与 extraUrlParams 同步相关**） |
| `useImperativeHandle` | `[!initialData]`：将 `formRef` 暴露给 `propsFormRef` |

顺序敏感：

- URL 与 `request`：`request` 为真且 loading 时整表先 `Spin`，`initialData` 到达后再渲染 `Form`；`useUrlSearchParams` 与 `useFetchData` 并行，合并顺序见 `initialValues` 三元（`syncToUrlAsImportant`）。
- `onFinish` 内 `syncToUrl` 依赖当前 `urlSearch` 做 key 清空（`#3547`），改动时需保留该逻辑。

## 相关路径（仓库根）

- `src/form/BaseForm/BaseForm.tsx` — 外壳：请求/URL/transform、`<Form />` 与 Provider
- `src/form/BaseForm/BaseFormComponents.tsx` — `Form` 子树：`ProFormContext`、Submitter、`contentRender`、format 方法、`onInit`
- `src/form/BaseForm/BaseFormTypes.ts` — `ProFormInstance` / `BaseFormProps` / `CommonFormProps` 等类型（供 `BaseForm` 与 `BaseFormComponents` 共用，避免循环依赖）
- `src/form/context/ProFormFieldProviders.tsx` — `EditOrReadOnlyContext` / `ProConfigProvider` / `FieldContext` / `FormListContext` 聚合
- `src/form/initial/defaultFormKey.ts` — `requestFormCacheId`、`bumpRequestFormCacheId`
- `src/form/initial/useRequestFormCacheBump.ts` — 挂载时 bump 缓存键
- `src/form/initial/useProFormRequestData.ts` — `useFetchData` 封装 + `shouldShowRequestSpin` / `requestPendingEmpty`
- `src/form/initial/useProFormInitialValuesMerge.ts` — `Form` 与 `BaseFormComponents` 两套 `initialValues` 合并
- `src/form/sync/useUrlFormSync.ts` — URL 与 `initialValues` 合并用状态
- `src/form/sync/genParams.ts` — `syncToUrl` 与查询参数转换
- `src/form/submit/useProFormTransformKey.ts` — `transformKey` 管线 + `setFieldValueType`（`transformKeyRef` / `fieldsValueType`）
- `src/form/submit/useProFormFinishHandler.ts` — `Form` 的 `onFinish`（异步、`loading`、`syncToUrl` / #3547）
- `src/form/BaseForm/covertFormName.ts` — `NamePath` 归一化
- `src/form/components/FormItem/warpFieldLayout.ts` — `warpField` 宽度/className 纯函数（可单测，与 `warpField.tsx` 行为一致）
- `src/form/components/FormItem/warpFieldMerge.ts` — `fieldProps` / `formItemProps` / `otherProps` / `proFieldKey` / `proFieldProps` 合并纯函数（顺序见文件头 JSDoc；`pickProFormItemProps` 仍在 `warpField` 内先于 `mergeWarpFieldFormItemProps` 调用）
- `src/form/components/FormItem/warpFieldLightProps.ts` — `buildWarpFieldLightProps`：轻量模式 `lightProps` 合并（原 `omitUndefined({ ...fieldProps, ... })`）
- `src/form/components/FormItem/warpFieldNodes.tsx` — `WarpFieldInnerField` / `WarpFieldFormItemShell`：内层 Field 与 `ProFormItem` 壳
- `src/form/components/FormItem/warpFieldDependency.tsx` — `WarpFieldDependencyWrapper`：`dependencies` 时 `ProFormDependency`，否则直渲染

阶段 2 相关单测（RFC 验收）：`tests/form/warpFieldLayout.test.ts`、`warpFieldMerge.test.ts`、`warpFieldLightProps.test.ts`、`warpFieldDependency.test.tsx`。

其中 **`warpFieldLightProps.test.ts`** 含命名用例 `LightFilter: proFieldLight sets lightProps.light…`，与纯函数 `buildWarpFieldLightProps` 一并作为「带/不带轻量模式」的验收；不要求再单独做整表 E2E，除非产品要求。

## `warpField` 内合并顺序（阶段 2 总览）

实现以 `src/form/components/FormItem/warpField.tsx` 文件头 JSDoc 为准；子步骤细节见 `warpFieldMerge.ts`、`warpFieldLightProps.ts`、`warpFieldLayout.ts`。

## Bundle（阶段 2 拆分）

- 未新增 npm 依赖；新增文件为 **纯 TS/TSX 模块**，随 `@ant-design/pro-form` 现有入口打包，由 bundler **tree-shaking** 未引用路径。
- 预期 **gzip 体积变化在噪声级**；若某版本对比出现可感知上涨，在对应 PR 说明是否为新功能而非本重构。

## Schema 专用 `getFieldProps` / `getFormItemProps`

- **来源**：`BetaSchemaForm` / `columns` 常把 `getFieldProps`、`getFormItemProps` 配在列上；运行时仍进入 **`warpField`**，与 `changedProps` 合并（见 `warpField.tsx`）。
- **命令式**：一般直接写 `fieldProps` / `formItemProps`，不经过上述函数。
- **收敛**：是否在类型或目录上标「仅 Schema」属 RFC **阶段 3**；当前行为以代码合并顺序为准（`warpFieldMerge` 文件头 JSDoc）。

## Schema 路径（RFC 阶段 3 备忘）

- **入口**：`src/form/components/SchemaForm/index.tsx` 导出 `BetaSchemaForm`（默认导出）；`layoutType` 映射到 `DrawerForm` / `QueryFilter` / `LightFilter` / `ModalForm` / `StepsForm` / `Embed` / `ProForm` 等（见文件内 `FormLayoutType`）。
- **列 → 节点**：`renderValueType`（`src/form/components/SchemaForm/valueType/index.tsx` 等）与 `ValueTypeToComponent`（`src/field/ValueTypeToComponent`）协作，最终仍落到各 `ProFormXxx`（经 `warpField` 包装）。
- **对齐测试**：`tests/form/schemaImperativeAlignment.test.tsx` — 覆盖 `valueType` **text、digit、select、dateTime、switch**：`BetaSchemaForm` 单列与对应 `ProFormText` / `ProFormDigit` / `ProFormSelect` / `ProFormDateTimePicker` / `ProFormSwitch` 在相同 `initialValues` 下 `getFieldsValue(true)` 一致（`dateTime` 用 `dayjs` 时间戳比较）。新增类型时建议在此文件追加一条用例。

### `getFieldProps` / `getFormItemProps` 在 Schema 中的生成（便于阶段 3 对照）

`BetaSchemaForm` 在 `genItems`（`SchemaForm/index.tsx`）里调用 **`buildSchemaColumnGetters`**、**`mergeOriginColumnToItemType`**（`SchemaForm/normalizeColumnToItemType.ts`），把列配置整理为 `ItemType`，其中列上的 `fieldProps` / `formItemProps` 经 `runFunction` 与 `formRef` 绑定为 `getFieldProps` / `getFormItemProps`。命令式路径直接传 `fieldProps` / `formItemProps` 对象；二者在 `warpField` 内汇入同一套 merge（`warpFieldMerge.ts`）。

单测：`tests/form/normalizeColumnToItemType.test.ts`。

### `SchemaForm/valueType` 目录

- **`valueType/index.tsx`**：`renderValueType` 管道（先跑容器/布局类步骤，再走默认 `field`）。
- **`valueType/pipeline/`**：`ignore`、`group`、`formList`、`formSet`、`divider`、`dependency`（与 `field.tsx` 分离，便于浏览）。
- **`valueType/field.tsx`**：默认落到 `ProFormField` 的路径。

## 回归基线

```bash
npm test -- tests/form
npm run lint
```
