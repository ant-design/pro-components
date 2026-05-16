---
title: StepsForm
order: 1
atomId: StepsForm
group: Form
---

# StepsForm

StepsForm orchestrates nested step forms via a context Provider: each inner form holds a full snapshot of values, then StepsForm merges them after the final submission. Built-in Steps UI and helpers track progress.

> StepsForm extends antd [`Form.Provider`](https://ant.design/components/form/#Form.Provider). Serialization of dates (for example converting `dayjs` for submit) follows ProForm’s pipeline, so payloads in **`onFormFinish` / `onFormChange`** are still the raw Field values managed by Provider.

## Basic step flow

<code src="../../demos/form/steps-form/basic.tsx" title="Basic StepsForm"></code>

## Vertical steps layout

<code src="../../demos/form/steps-form/steps-form-vertical.tsx" title="StepsForm vertical"></code>

## Custom step actions

<code src="../../demos/form/steps-form/customize-steps-form.tsx" title="Custom step buttons"></code>

## Multiple cards layout

<code src="../../demos/form/steps-form/multi-card-step-form.tsx" background="var(--main-bg-color)" title="StepsForm multi-card"></code>

## Embedded in Modal

<code src="../../demos/form/steps-form/modal-step-form.tsx" background="var(--main-bg-color)" title="StepsForm + Modal"></code>

## Create & edit presets

<code src="../../demos/form/steps-form/add-or-edit-step-form.tsx" title="Create/edit scenario"></code>

## StepsForm

| Parameters       | Description                                                                                                                           | Type                                                         | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| current          | Active step index, starting from `0`                                                                                                  | `number`                                                     | `0`     |
| onCurrentChange  | Fired when `current` changes                                                                                                         | `(current: number) => void`                                   | -       |
| onFinish         | Last step succeeds; returning a truthy value resets flows back to step 1                                                            | `(values: T) => Promise<boolean \| void> \| boolean \| void` | -       |
| stepsProps       | Props forwarded to antd `<Steps>` (without `current` / `onChange`)                                                                      | [`Steps`](https://ant.design/components/steps/#API)          | -       |
| stepFormRender   | Customize the rendered form body for the active step                                                                                 | `(formDom: ReactNode) => ReactNode`                          | -       |
| stepsFormRender  | Customize the wrapper around the submitter                                                                                             | `(formDom: ReactNode, submitter: ReactNode) => ReactNode`     | -       |
| stepsRender      | Completely replace the Steps header/footer region                                                                                       | `(steps, dom) => ReactNode`                                  | -       |
| formRef          | Latest `ProFormInstance` for the visible step                                                                                          | `MutableRefObject<ProFormInstance<any> \| null \| undefined>` | -       |

### StepForm

Exactly the same as [ProForm](/components/form), except that onFinish supports Promise, so if it returns `false`, it won't jump to the next step.

| Parameters | Description                 | Type                                              | Default |
| ---------- | --------------------------- | ------------------------------------------------- | ------- |
| onFinish   | Form submit success trigger | `(values: T) => Promise<boolean \| void> \| void` | -       |
