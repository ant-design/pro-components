# ProForm 内部架构备忘（RFC 阶段 0 交付）

本文档描述 `src/form/BaseForm/BaseForm.tsx` 的主数据流与副作用，供重构时对照顺序敏感点。实现以代码为准；如有出入以代码优先。

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

## 回归基线

```bash
npm test -- tests/form
npm run lint
```
