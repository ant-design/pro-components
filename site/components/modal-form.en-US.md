---
title: Modal/DrawerForm
atomId: ModalForm,DrawerForm
group: Form
---

# Modal/DrawerForm - Floating Forms

ModalForm and DrawerForm are a variant of ProForm, which is still a form in essence. So you can't customize the footer with `footer`, if you want to define the footer you need to use `submitter.render` to customize it. These two forms behave like ProForm and can be modified directly from ProForm.

ModalForm and DrawerForm both provide triggers to reduce state usage, if you need to use state control you can use `open` and `onOpenChange` to control opening and closing.

## Modal Forms

`trigger` opens the modal. Returning `true` from `onFinish` closes it and displays the submitted value.

<code src="../../demos/form/modal-form/modal-form.tsx" background="var(--main-bg-color)" title="ModalForm: open and submit"></code>

## Drawer Forms

`trigger` opens the drawer. Returning `true` from `onFinish` closes it and displays the submitted value.

<code src="../../demos/form/modal-form/drawer-form.tsx" background="var(--main-bg-color)" title="DrawerForm: open and submit"></code>

`resize` lets you drag the drawer's left edge to adjust its width within the configured limits.

<code src="../../demos/form/modal-form/drawer-form-resize.tsx" background="var(--main-bg-color)" title="DrawerForm: resize"></code>

## Nested Drawer Forms

<code src="../../demos/form/modal-form/drawer-form-nested.tsx" background="var(--main-bg-color)" title="Nested DrawerForm"></code>

## Nested Modal Forms

<code src="../../demos/form/modal-form/modal-form-nested.tsx" background="var(--main-bg-color)" title="Nested ModalForm"></code>

Open `ModalForm` from a `ProFormList` row and inspect its separate submitted value.

<code src="../../demos/form/_modalform-test.tsx" title="Open ModalForm from a list row"></code>

### Close and reopen while loading

`destroyOnHidden` unmounts the form when it closes. The following demos show ModalForm and DrawerForm reloading their async `request` after reopening.

<code src="../../demos/form/modal-form/_modal-form-request-destroy.tsx" background="var(--main-bg-color)" title="ModalForm: reload after closing"></code>

<code src="../../demos/form/modal-form/_drawer-form-request-destroy.tsx" background="var(--main-bg-color)" title="DrawerForm: reload after closing"></code>

## Custom Modal Forms' Button

`submitter.render` adds an extra button that calls `submit()`.

<code src="../../demos/form/modal-form/modal-form-submitter.tsx" background="var(--main-bg-color)" title="Custom Modal submitter"></code>

`submitter.searchConfig` changes the submit and cancel labels.

<code src="../../demos/form/modal-form/modal-form-submitter-text.tsx" background="var(--main-bg-color)" title="Submit button labels"></code>

`resetButtonProps` changes the cancel button style.

<code src="../../demos/form/modal-form/modal-form-submitter-button-props.tsx" background="var(--main-bg-color)" title="Button style"></code>

`submitter={false}` hides the footer actions.

<code src="../../demos/form/modal-form/modal-form-submitter-hidden.tsx" background="var(--main-bg-color)" title="Hidden footer"></code>

## Use open and onOpenChange

<code src="../../demos/form/modal-form/open-on-open-change.tsx" background="var(--main-bg-color)" title="Controlled ModalForm open"></code>

<code src="../../demos/form/modal-form/drawer-open-on-open-change.tsx" background="var(--main-bg-color)" title="Controlled DrawerForm open"></code>

## Set Form Values Before the First Open

antd Modal renders its content lazily by default. Before the first open, an
instance created by `Form.useForm()` is not connected to the Form inside
ModalForm, so calling `setFieldsValue` produces the “Instance created by
`useForm` is not connected” warning. Passing `form={form}` alone does not mount
the Form early.

If the interaction must call `setFieldsValue` before opening the modal, set
`modalProps={{ forceRender: true }}`. The following example is directly
verifiable:

<code src="../../demos/form/modal-form/use-form-before-open.tsx" background="var(--main-bg-color)" title="useForm: set values before the first open"></code>

You can also avoid calling the instance too early:

- Use `initialValues` or `request` so data is initialized after the Form
  mounts. When editing different records, combine this with
  `modalProps={{ destroyOnHidden: true }}` so the next open mounts a fresh Form.
- Capture or use the connected instance in `onInit`.
- When using ModalForm's built-in `trigger`, write values in
  `onOpenChange(true)`. In v3, the first open callback is flushed after the
  internal Form mounts.

## Reset Form

Call `formRef.current.resetFields()` to reset the fields.

<code src="../../demos/form/modal-form/modal-form-reset.tsx" background="var(--main-bg-color)" title="Reset after submit"></code>

Call `reset()` in `submitter.render` to add a custom reset button.

<code src="../../demos/form/modal-form/modal-form-reset-render.tsx" background="var(--main-bg-color)" title="Custom reset button"></code>

## API

### ModalForm

ModalForm combines Modal and ProForm to reduce tedious state management.

| Parameters    | Description                                                                                                                                    | Type                                                        | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| trigger       | The dom used to trigger the Modal to open, usually the button                                                                                  | `JSX.Element`                                               | -       |
| open          | whether to open                                                                                                                                | `boolean`                                                   | -       |
| onOpenChange  | trigger when open changes                                                                                                                      | `(open:boolean)=>void`                                      | -       |
| modalProps    | Modal's props, used in the same way as [antd](https://ant.design/components/modal/). Note: 'open' is not supported, please use the global open | `Omit<ModalProps, 'open'>`                                  | -       |
| title         | The title of the popup box                                                                                                                     | `ModalProps['title']`                                       | -       |
| width         | The width of the modal                                                                                                                         | `ModalProps['width']`                                       | -       |
| onFinish      | Triggered when submitting data. If returns a truthy value, it will close the modal (and reset form if `destroyOnHidden` is enabled)            | `(values: any) => Promise<any>`                             | -       |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms)                                                                                | `number`                                                    | -       |
| submitter     | Submit button configurations in the same way as [ProForm](https://procomponents.ant.design/components/form)                                    | [ProForm](https://procomponents.ant.design/components/form) | -       |

### DrawerForm

DrawerForm combines Drawer and ProForm to reduce tedious state management.

| Parameters    | Description                                                                                                                                      | Type                             | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ------- |
| trigger       | The dom used to trigger the opening of the Modal, typically the button                                                                           | `JSX.Element`                    | -       |
| open          | whether to open                                                                                                                                  | `boolean`                        | -       |
| onOpenChange  | trigger when open changes                                                                                                                        | `(open:boolean)=>void`           | -       |
| drawerProps   | Drawer's props, used in the same way as [antd](https://ant.design/components/drawer/). Note: 'open' is not supported, please use the global open | `Omit<DrawerProps, 'open'>`      | -       |
| title         | The title of the drawer                                                                                                                          | `DrawerProps['title']`           | -       |
| size          | Size of the drawer                                                                                                                               | `DrawerProps['size']`            | -       |
| width         | Width of the drawer, deprecated, please use `size`                                                                                               | `DrawerProps['size']`            | -       |
| resizable     | Whether to use antd native drag resize (ignored when `resize` is set)                                                                            | `DrawerProps['resizable']`       | -       |
| resize        | Whether to allow drag resize. When set to `true`, default config will be used                                                                    | `CustomizeResizeType \| boolean` | `false` |
| onFinish      | Triggered when submitting data. If returns a truthy value, it will close the drawer (and reset form if `destroyOnHidden` is enabled)             | `(values: any) => Promise<any>`  | -       |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms)                                                                                  | `number`                         | -       |
