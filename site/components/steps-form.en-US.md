---
title: StepsForm
order: 1
atomId: StepsForm
group: Form
---

# StepsForm

StepsForm orchestrates nested step forms via a context Provider: each inner form holds a full snapshot of values, then StepsForm merges them after the final submission. Built-in Steps UI and helpers track progress.

> StepsForm extends antd [`Form.Provider`](https://ant.design/components/form/#Form.Provider). Serialization of dates (for example converting `dayjs` for submit) follows ProForm’s pipeline, so payloads in **`onFormFinish` / `onFormChange`** are still the raw Field values managed by Provider.

When steps are split into components, each `StepForm` owns a separate Form instance, so a single `useWatch` outside StepsForm cannot watch across every step. Read merged values with `stepsFormRef.current?.getAllFieldsValue()`, lift the reactive value from `onFormChange` into parent state, and pass it to other steps for conditional fields or request parameters.

## Basic step flow

Two `StepsForm.StepForm` children collect project and owner fields, which are combined on submit.

<code src="../../demos/form/steps-form/basic.tsx" title="Basic StepsForm"></code>

## Vertical steps layout

`stepsProps.orientation='vertical'` stacks the steps vertically.

<code src="../../demos/form/steps-form/steps-form-vertical.tsx" title="Vertical StepsForm"></code>

`allowStepSelect` lets users click a step without validating the previous one.

<code src="../../demos/form/steps-form/steps-form-selectable.tsx" title="Select a step directly"></code>

## Custom step actions

`submitter.render` changes the Previous and Next button labels for each step.

<code src="../../demos/form/steps-form/customize-steps-form.tsx" title="Custom step buttons"></code>

## Multiple cards layout

Each `StepsForm.StepForm` can contain multiple `ProCard` sections to group fields within a step.

<code src="../../demos/form/steps-form/multi-card-step-form.tsx" background="var(--main-bg-color)" title="StepsForm multi-card"></code>

## Embedded in Modal

`stepsFormRender` places the steps and submit controls inside a Modal.

<code src="../../demos/form/steps-form/modal-step-form.tsx" background="var(--main-bg-color)" title="StepsForm in a Modal"></code>

## Prefill edit data

Use `formMapRef` to access the first step's form instance and populate its project name after loading edit data. The final submission is shown below the form.

<code src="../../demos/form/steps-form/add-or-edit-step-form.tsx" title="Prefill edit data with formMapRef"></code>

## StepsForm

| Parameters      | Description                                                                              | Type                                                              | Default |
| --------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| current         | Active step index, starting from `0`                                                     | `number`                                                          | `0`     |
| onCurrentChange | Fired when `current` changes                                                             | `(current: number) => void`                                       | -       |
| onFinish        | Last step succeeds; returning a truthy value resets flows back to step 1                 | `(values: T) => Promise<boolean \| void>`                         | -       |
| stepsProps      | Props forwarded to antd `<Steps>`                                                        | [`StepsProps`](https://ant.design/components/steps/#API)          | -       |
| formProps       | Common props passed to the inner ProForm                                                 | `ProFormProps`                                                    | -       |
| stepFormRender  | Customize the rendered form body for the active step                                     | `(formDom: ReactNode) => ReactNode`                               | -       |
| stepsFormRender | Customize the wrapper around the submitter                                               | `(formDom: ReactNode, submitter: ReactNode) => ReactNode`         | -       |
| stepsRender     | Completely replace the Steps header/footer region                                        | `(steps, dom) => ReactNode`                                       | -       |
| layoutRender    | Customize the whole layout; place stepsDom and formDom anywhere                          | `({stepsDom, formDom}) => ReactNode`                              | -       |
| formRef         | Latest `ProFormInstance` for the visible step                                            | `MutableRefObject<ProFormInstance<any> \| null \| undefined>`     | -       |
| stepsFormRef    | Steps container ref: merged values, per-step form instance, step jump without validation | `MutableRefObject<StepsFormRef \| null \| undefined>`             | -       |
| formMapRef      | formMapRef of all step forms                                                             | `MutableRefObject<MutableRefObject<FormInstance \| undefined>[]>` | -       |
| allowStepSelect | Whether clicking the step bar switches steps (without triggering validation)             | `boolean`                                                         | `false` |
| submitter       | Unified submitter config, lower priority than each StepForm's config                     | `SubmitterProps<{step,onPre,form}> \| false`                      | -       |
| containerStyle  | Container style                                                                          | `React.CSSProperties`                                             | -       |

### StepForm

Exactly the same as [ProForm](/components/form), except that onFinish supports Promise, so if it returns `false`, it won't jump to the next step.

| Parameters | Description                 | Type                                              | Default |
| ---------- | --------------------------- | ------------------------------------------------- | ------- |
| onFinish   | Form submit success trigger | `(values: T) => Promise<boolean \| void> \| void` | -       |
