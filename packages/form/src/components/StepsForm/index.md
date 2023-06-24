---
title: StepsForm - 分步表单
atomId: StepsForm
order: 1
---

# StepsForm - 分步表单

StepsForm 通过 Provider 来管理子表单的数据，每个子表单都是完整的数据，在 StepsForm 组合成最后的数据。同时自带了一个进度条，和管理进度条的相关 API.

> StepsForm 继承了 Form.Provider ，相关文档可以看[这里](https://ant.design/components/form-cn/#Form.Provider),转化 moment 的值是 ProForm 提供的功能，所以 `onFormFinish` 和 `onFormChange` 其中的值都是未经转化的。

## 分步表单

<code src="./demos/steps-from.tsx" title="分步表单"></code>

## 分步表单垂直模式

<code src="./demos/steps-form-vertical.tsx" title="分步表单垂直模式"></code>

## 自定义分步表单按钮

<code src="./demos/customize-steps-from.tsx" title="自定义分步表单按钮"></code>

## 分步表单-多卡片

<code src="./demos/multi-card-step-form.tsx"  background="var(--main-bg-color)" title="分步表单-多卡片"></code>

## 分步表单-与 Modal 配合使用

<code src="./demos/modal-step-form.tsx"  background="var(--main-bg-color)" title="分步表单-与 Modal 配合使用"></code>

## 编辑场景下的分步表单

<code src="./demos/add-or-edit-step-form.tsx" title="自定义分步表单按钮"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前表单的步骤数，从 `0` 开始 | `number` | 0 |
| onCurrentChange | current 发生改变的事件 | `(current:number)=>void` | - |
| onFinish | 表单最后一步提交成功触发，如果返回`true`就会自动重置表单(包括`StepForm`变回第一步) | `(values:T)=>void \| boolean` | - |
| stepsProps | StepsForm 自带的 Steps 的 props，使用方式与 [antd](https://ant.design/components/steps-cn/) 相同，但是去掉了 current 和 onChange | [props](https://ant.design/components/steps-cn/#API) | - |
| stepFormRender | 自定义当前展示的表单，返回 dom 在表单内部 | `(form) => ReactNode` | - |
| stepsFormRender | 自定义整个表单区域，返回的 dom 在表单的外部 | `(form,submitter) => ReactNode` | - |
| stepsRender | 自定义步骤器 | `(steps,dom)=>ReactNode` | - |
| formRef | StepForm action 的引用，便于自定义触发 | `MutableRefObject<FormInstance>` | - |

### StepForm

与 [ProForm](/components/form) 完全相同，只是 onFinish 支持了 Promise，如果返回 `false`, 就不会跳转下一步。

| onFinish | 表单提交成功触发 | `(values:T)=>Promise<false>` | - |
