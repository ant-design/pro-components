---
title: StepsForm
order: 1
atomId: StepsForm
nav:
  title: Components
---

# StepsForm

StepsForm manages the data of sub forms through a Provider, each word form is a complete set of data that is combined in StepsForm to form the final data. It also comes with a progress bar and a related API to manage the progress bar.

> StepsForm inherits from Form.Provider, see the documentation [here](https://ant.design/components/form/#Form.Provider), the value of the transformed moment is a function provided by ProForm, so `onFormFinish` and `onFormChange` where the values are untransformed.

## Step-by-Step Forms

<code src="./demos/steps-from.tsx" ></code>

## Step-by-Step Forms - Multi-Card

<code src="./demos/multi-card-step-form.tsx"  background="var(--main-bg-color)" ></code>

## Step-by-Step Forms - Works with Modal

<code src="./demos/modal-step-form.tsx"  background="var(--main-bg-color)" ></code>

## StepForm in edit scene

<code src="./demos/add-or-edit-step-form.tsx" oldtitle="自定义分步表单按钮"></code>

## API

| Parameters      | Description                                                                                                                                 | Type                                               | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| current         | The number of steps in the current form, starting from `0`                                                                                  | `number`                                           | 0       |
| onCurrentChange | current The event that changed                                                                                                              | `(current:number)=>void`                           | -       |
| onFinish        | Triggered when the last step of the form was submitted successfully                                                                         | `(values:T)=>void`                                 | -       |
| stepsProps      | StepsForm's own props for Steps, used in the same way as [antd](https://ant.design/components/steps/), but without the current and onChange | [ props](https://ant.design/components/steps/#API) | -       |
| stepFormRender  | Customize the currently displayed form, return dom inside the form                                                                          | `(form) => ReactNode`                              | -       |
| stepsFormRender | Customize the entire form area, returning the dom on the outside of the form                                                                | `(form,submitter) => ReactNode`                    | -       |
| stepsRender     | Customize the stepsizer                                                                                                                     | `(steps,dom)=> ReactNode`                          | -       |
| formRef         | A reference to the StepForm action for custom triggering                                                                                    | `MutableRefObject<FormInstance>`                   | -       |

### StepForm

Exactly the same as [ProForm](/components/form), except that onFinish supports Promise, so if it returns `false`, it won't jump to the next step.

| Parameters | Description                 | Type                         | Default |
| ---------- | --------------------------- | ---------------------------- | ------- |
| onFinish   | form submit success trigger | `(values:T)=>Promise<false>` | -       |
