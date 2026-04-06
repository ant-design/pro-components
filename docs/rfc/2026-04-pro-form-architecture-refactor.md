# RFC: ProForm 架构重构


| 元数据      | 内容                                                                                                                                                                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **状态**   | Draft                                                                                                                                                                                                                                          |
| **创建日期** | 2026-04-06                                                                                                                                                                                                                                     |
| **范围**   | `@ant-design/pro-form` / `src/form`                                                                                                                                                                                                            |
| **相关文件** | `src/form/BaseForm/BaseForm.tsx`、`src/form/components/FormItem/warpField.tsx`（导出函数名为 `**warpField`**，与英文 *wrap* 拼写不同，**禁止**在 non-major 中重命名）、`src/form/layouts/SchemaForm`、`src/form/BetaSchemaForm`、`src/form/typing.ts`、`src/form/index.tsx` |


## 摘要

`ProForm` 当前在单文件内聚合 URL 同步、请求与初始值、提交管线、布局与多层 Context，字段层通过 `warpField` 统一包装导致分支复杂；同时存在「手写 `ProFormXxx`」与「`SchemaForm` / `BetaSchemaForm`」两条建单路径，行为需对齐但实现分叉。本 RFC 提议在 **不破坏对外 API 与默认行为**（除非单独发 major 并提供迁移说明）的前提下，分阶段拆分职责、提升可测性与可维护性。

## 背景：复杂度从哪来


| 来源          | 说明                                                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **单文件职责过多** | `BaseForm.tsx`（约近千行）集中：URL 同步、`request`/初始值、`transformKey` 提交、日期转换、`submitter`、网格布局、`FieldContext`、只读/编辑、`formRef` 增强等 |
| **字段包装层厚**  | `warpField` 合并 `fieldConfig`、`LightFilter`、宽度、`FormItem`、依赖等，`props` 分叉多                                               |
| **上下文叠加**   | `FieldContext`、`ProFormContext`、`GridContext`、`EditOrReadOnlyContext`、`FormListContext`、`RcFieldContext` 等，阅读成本高       |
| **两条建单路径**  | 手写 `ProFormXxx` vs `SchemaForm` / `BetaSchemaForm`（`columns` + `valueType`），行为要对齐但实现分叉                                 |
| **类型面宽**    | `typing.ts` 与各组件 props 交叉引用，改动牵一发而动全身                                                                                  |


### 建议厘清的一条主数据流（摸底用）

```
params → request → initialValues → 表单项
onFinish → transformKey → conversionMomentValue → 返回值（及可选 URL 同步）
```

## 目标与非目标

### 目标

1. **行为不变**：对外 API、默认行为保持兼容（若需 breaking change，单独 major + 迁移文档）。
2. **结构清晰**：能明确回答「数据从哪来、何时提交、谁管布局」。
3. **可测**：URL、`request`、`transform`、`submit` 等核心逻辑可单元测试，少依赖整棵 React 树。
4. **渐进**：按阶段合 PR，每阶段可发布、可回滚。

### 非目标（本 RFC 不一次性解决）

- 全面重写 `antd` Form 或替换为其他表单引擎。
- 无差别删除 Context（可先整理边界与文档，再按需收敛）。

## 现状架构要点（便于评审对齐）

- **BaseForm**（`src/form/BaseForm/BaseForm.tsx`）：`CommonFormProps` 与大量副作用（`useEffect`）共存；URL 与 `request` 竞态风险高。
- **warpField**（`src/form/components/FormItem/warpField.tsx`）：统一入口厚，易与 Schema 专用约定（如函数形态 `getFieldProps`）交织。
- **Schema 路径**：`valueType` 扩展分散，与命令式路径共享规则但不总是同一套实现。

## 提议方案：分阶段重构

### 阶段 0：摸底与基线（约 1～2 天）


| 工作项    | 说明                                                                                        |
| ------ | ----------------------------------------------------------------------------------------- |
| 数据流文档化 | 固化 `params → request → initialValues` 与 `onFinish → transformKey → conversionMomentValue` |
| 副作用清单  | 列出 `BaseForm` 内所有 `useEffect` 及依赖，标出顺序敏感点（避免双请求、死循环）                                      |
| 回归基线   | 跑通并固定现有 form 相关测试 + 关键 demos                                                              |


**交付物**：`docs/internal/form-architecture.md`（或等价说明）+ CI 绿作为基线。

### 阶段 1：拆分 `BaseForm`（优先，收益最大）

将 `src/form/BaseForm/BaseForm.tsx` 拆为 **纯逻辑模块 + 薄 UI 组装**。下表「建议路径」均相对于 `**src/form/`**（即新建目录形如 `src/form/sync/useUrlFormState.ts`，**不要**在仓库根目录单独建顶层 `form/`）。


| 模块（建议路径，父目录为 `src/form/`）       | 职责                                                                          |
| ------------------------------- | --------------------------------------------------------------------------- |
| `sync/useUrlFormState`          | `syncToUrl` / `extraUrlParams` / 与 `useUrlSearchParams` 交互                  |
| `submit/useFormSubmitPipeline`  | `omitNil`、`transformKeySubmitValue`、`conversionMomentValue`、与 `onFinish` 衔接 |
| `initial/useFormInitialData`    | `request`、`params`、`initialValues` 合并、`onInit` 时机                           |
| `context/ProFormFieldProviders` | 仅负责将 `fieldProps` / `formItemProps` / `groupProps` / `grid` 等注入 Context     |


**BaseForm 本体**（仍可置于 `src/form/BaseForm/BaseForm.tsx` 或邻近文件）只保留：`Form` 壳、`contentRender`、`Submitter`、组合上述 hooks。

**验收**：`BaseForm` 主文件行数明显下降；上述模块各有单元测试（输入 props/状态 → 输出值或调用次数）。

### 阶段 2：收敛字段层（`warpField` + `FormItem`）


| 工作项  | 说明                                                                                        |
| ---- | ----------------------------------------------------------------------------------------- |
| 职责拆分 | 将「LightFilter 专用」「宽度 `width`」「`ignoreFormItem`」等拆成独立小函数或子组件，避免单函数内多层分支                    |
| 统一入口 | 明确 `pickProFormItemProps` / `omitUndefined` 的调用顺序，用简短注释或类型固定，减少「仅 Schema 才走函数 props」的隐式规则 |
| 可选   | `FieldContext` 类型修正（如 `FiledContextProps` 拼写）与字段收敛一起做，避免大范围重命名冲突                          |


**验收**：单测覆盖「带/不带 LightFilter」「`ignoreFormItem`」「`dependency`」各一条；bundle 无明显上涨或说明原因。

### 阶段 3：`SchemaForm` 与命令式路径对齐


| 工作项    | 说明                                                                        |
| ------ | ------------------------------------------------------------------------- |
| 纯函数抽象  | `column → 表单项描述` 的不依赖 React 的纯函数；`SchemaForm` 与文档化示例共用同一套规则               |
| 收敛专用分支 | 对仅 Schema 才有的能力（如 `getFieldProps`）：要么提升为通用能力并文档化，要么收紧为 Schema 私有并隔离目录     |
| 目录分组   | `SchemaForm` / `valueType/*` 按类别分组（布局类 / 表单控件类 / 容器类），便于按需加载与 Code Review |


**验收**：同一组 `columns` 在「Schema 渲染」与「手写 `ProFormXxx`」上行为一致（至少关键用例对齐测试）。

### 阶段 4：类型与导出整理


| 工作项              | 说明                                                                        |
| ---------------- | ------------------------------------------------------------------------- |
| 按域拆分 `typing.ts` | 例如：`submit.ts`、`fieldItem.ts`、`layout.ts`、`schema.ts`，`index` 再 re-export |
| 对外兼容             | `src/form/index.tsx` 保持导出不变，仅内部路径调整                                       |


## 风险与顺序建议


| 风险                     | 缓解                                   |
| ---------------------- | ------------------------------------ |
| 第一步大改 `warpField` 对外行为 | **先拆 `BaseForm`**，再动字段层，风险更可控        |
| URL 同步与 `request` 竞态   | 阶段 1 重点补测试；重构时保持副作用顺序可观测             |
| 类型大挪移引发下游 breakage     | 阶段 4 以 re-export 为主，避免用户 import 路径断裂 |


**每阶段结束**：若对外行为或类型有变，更新 changelog 与迁移提示。

## 排期（粗略，视人力调整）


| 阶段  | 内容                       | 周期     |
| --- | ------------------------ | ------ |
| 0   | 摸底 + 基线                  | 1～2 天  |
| 1   | 拆分 `BaseForm`            | 3～7 天  |
| 2   | `warpField` / `FormItem` | 3～5 天  |
| 3   | Schema 对齐                | 5～10 天 |
| 4   | 类型整理                     | 2～4 天  |


## 成功标准

- 主路径无行为回归：`npm test -- tests/form` 通过（见附录「阶段完成定义」）；若改动公共 API 或快照，更新对应快照并说明原因。
- `BaseForm` 与提交/初始/URL 相关逻辑具备可单测模块。
- 文档能支撑新贡献者理解数据流与扩展点（阶段 0 交付物或等价说明）。

## 开放问题

1. `docs/internal/` 是否纳入仓库，或仅发布在维护者 wiki？
2. 是否与 `@umijs/use-params` 解耦或抽象接口，便于非 Umi 环境测试？
3. `BetaSchemaForm` 与 `SchemaForm` 长期是否合并命名与导出策略？

**在问题未决议前（实施默认策略）**：不改变是否新增 `docs/internal`、不新增对 `@umijs/use-params` 的抽象层、不合并或重命名 `BetaSchemaForm` / `SchemaForm`；仅做本 RFC 分阶段内的结构与测试补强。

---

## 附录：AI / 自动化辅助实施指南

本附录用于约束 **AI 辅助或脚本化** 改动时的边界，减少副作用顺序错误与对外破坏。与人读的正文重复处，以本附录为执行优先。

### 路径锚点（仓库根：`pro-components/`）


| 概念        | 路径                                                                           |
| --------- | ---------------------------------------------------------------------------- |
| 表单公共入口    | `src/form/index.tsx`                                                         |
| BaseForm  | `src/form/BaseForm/BaseForm.tsx`                                             |
| 字段包装      | `src/form/components/FormItem/warpField.tsx`                                 |
| 类型聚合      | `src/form/typing.ts`                                                         |
| Form 相关测试 | `tests/form/`（如 `base.test.tsx`、`schemaForm.test.tsx`、`dependency.test.tsx`） |


### MUST

- **保持对外导出**：`src/form/index.tsx` 的公开导出列表与类型对外语义不变，除非走 **major** 并在 changelog / 迁移文档中说明。
- **先测后拆**：从 `BaseForm` 抽离 hook 或移动 `useEffect` 前，确保相关 `tests/form` 可运行；对竞态场景优先补最小单测或注释「顺序敏感」。
- **分阶段单 PR**：同一 PR 内 **不要** 同时做大范围 `BaseForm` 拆分与 `warpField` 行为变更；遵循阶段 1 → 2 顺序。
- **阶段 4 类型迁移**：内部拆文件后通过 **re-export** 保持用户侧 `import { … } from '@ant-design/pro-form'` 行为不变。

### MUST NOT

- **禁止** 为「整洁」擅自调整 `useEffect` 依赖数组或执行顺序，除非对照阶段 0 的副作用清单并补充针对性测试。
- **禁止** 合并或重排 `onFinish` 中与 `transformKeySubmitValue`、`conversionMomentValue` 相关的处理顺序（除非测试证明等价且评审同意）。
- **禁止** 在无 major 计划时将 `warpField` **重命名**为 `wrapField` 等（现有 API 与文件名均为 `warpField`）。
- **禁止** 引入新的 npm 依赖用于表单重构（项目严控体积；确有需求需单独评审）。
- **禁止** 在无测试支撑时调整 Context Provider 嵌套顺序或拆分方式。

### 反模式（避免）

- 「顺手」删除看似未使用的 props 或 context 字段（可能为文档化扩展点或依赖隐式行为）。
- 在单 PR 内既改 demos 又改核心逻辑且无独立 commit / 无测试分层，导致回滚困难。
- 仅依赖手动点选验证而跳过 `tests/form`（CI 为权威基线之一）。

### 阶段完成定义（Definition of Done）

合并前在本地至少执行：

```bash
npm test -- tests/form
npm run lint
```

若修改了 `src/form` 下实现且可能影响快照：

```bash
npm run test:update -- tests/form
```

（仅在快照变更**符合预期**时使用，并在 PR 中说明。）

触及 `BaseForm` 请求/URL 逻辑时，建议额外跑与 query、初始值相关的用例（如 `queryFilter`、`lightFilter` 相关测试，若存在）。

### 与人读章节的对应关系


| 正文阶段 | AI 额外自检                                      |
| ---- | -------------------------------------------- |
| 0    | 是否产出副作用清单与数据流笔记（可放在 PR 描述或 `docs/internal/`） |
| 1    | 新 hook 是否单测覆盖；`useEffect` 是否有顺序注释或测试         |
| 2    | `warpField` 分支是否用单测矩阵覆盖，而非仅 snapshot         |
| 3    | Schema 与命令式路径是否共享同一套纯函数或对齐测试                 |
| 4    | 是否仅移动类型 + re-export，未改对外类型名                  |


---

*本 RFC 为架构与阶段规划，实施时以具体 PR 与代码审阅为准。*