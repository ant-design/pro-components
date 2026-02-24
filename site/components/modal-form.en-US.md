---
title: Modal/DrawerForm
atomId: ModalForm,DrawerForm
group: Form
---

# Modal/DrawerForm - Floating Forms

ModalForm and DrawerForm are a variant of ProForm, which is still a form in essence. So you can't customize the footer with `footer`, if you want to define the footer you need to use `submitter.render` to customize it. These two forms behave like ProForm and can be modified directly from ProForm.

ModalForm and DrawerForm both provide triggers to reduce state usage, if you need to use state control you can use `open` and `onOpenChange` to control opening and closing.

## Modal Forms

<code src="../../demos/form/ModalForm/modal-form.tsx" background="var(--main-bg-color)" old></code>

## Drawer Forms

<code src="../../demos/form/ModalForm/drawer-form.tsx" background="var(--main-bg-color)" old></code>

## Nested Drawer Forms

<code src="../../demos/form/ModalForm/drawer-form-nested.tsx" debug  background="var(--main-bg-color)" oldtitle="Drawer Forms"></code>

### Debug: Close while loading (Modal + Drawer)

<code src="../../demos/form/ModalForm/modal-form-request-destroy-debug.tsx" debug background="var(--main-bg-color)" title="Debug: destroyOnHidden + request (Modal & Drawer)"></code>

## Custom Modal Forms' Button

<code src="../../demos/form/ModalForm/modal-form-submitter.tsx" background="var(--main-bg-color)" old></code>

## Use open and onOpenChange

<code src="../../demos/form/ModalForm/open-on-open-change.tsx" background="var(--main-bg-color)" old></code>

## Reset Form

<code src="../../demos/form/ModalForm/modal-form-reset.tsx" background="var(--main-bg-color)" old></code>

## API

### ModalForm

ModalForm combines Modal and ProForm to reduce tedious state management.

| Parameters    | Description                                                                                                                                    | Type                                                        | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| trigger       | The dom used to trigger the Modal to open, usually the button                                                                                  | `ReactNode`                                                 | -       |
| open          | whether to open                                                                                                                                | `boolean`                                                   | -       |
| onOpenChange  | trigger when open changes                                                                                                                      | `(open:boolean)=>void`                                      | -       |
| modalProps    | Modal's props, used in the same way as [antd](https://ant.design/components/modal/). Note: 'open' is not supported, please use the global open | [props](https://ant.design/components/modal/#API)           | -       |
| title         | The title of the popup box                                                                                                                     | `ReactNode`                                                 | -       |
| width         | The width of the modal                                                                                                                         | `number`                                                    | -       |
| onFinish      | Triggered when submitting data. If returns a truthy value, it will close the modal (and reset form if `destroyOnHidden` is enabled)            | `(values: any) => Promise<any>`                             | -       |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms)                                                                                | `number`                                                    | -       |
| submitter     | Submit button configurations in the same way as [ProForm](https://procomponents.ant.design/components/form)                                    | [ProForm](https://procomponents.ant.design/components/form) | -       |

### DrawerForm

DrawerForm combines Drawer and ProForm to reduce tedious state management.

| Parameters    | Description                                                                                                                                      | Type                                               | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------- |
| trigger       | The dom used to trigger the opening of the Modal, typically the button                                                                           | `ReactNode`                                        | -       |
| open          | whether to open                                                                                                                                  | 
| onOpenChange  | trigger when open changes                                                                                                                        | `(open:boolean)=>void`                             | -       |
| drawerProps   | Drawer's props, used in the same way as [antd](https://ant.design/components/drawer/). Note: 'open' is not supported, please use the global open | [props](https://ant.design/components/drawer#api) | -       |
| onFinish      | Triggered when submitting data. If returns a truthy value, it will close the drawer (and reset form if `destroyOnHidden` is enabled)             | `(values: any) => Promise<any>`                    | -       |
| submitTimeout | Disable timeout for the Cancel button when submitting data (ms)                                                                                  | `number`                                           | -       |
