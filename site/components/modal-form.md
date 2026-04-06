---
group: Form
title: Modal/Drawer 浮层表单
atomId: ModalForm,DrawerForm
order: 2
---

# 浮层表单

ModalForm 和 DrawerForm 是 ProForm 的一个变体，本质上仍然是个表单。所以无法通过 `footer` 来自定义页脚，如果要定义页脚需要使用 `submitter.render` 来进行自定义。这两个表单的表现与 ProForm 相同，可以从 ProForm 直接修改而来。

ModalForm 和 DrawerForm 都提供了 trigger 来减少 state 的使用，如果你需要使用 state 来控制可以使用 `open` 和 `onOpenChange` 来控制打开与关闭。

## Modal 表单

<code src="../../demos/form/ModalForm/modal-form.tsx" background="var(--main-bg-color)"></code>

## Drawer 表单

<code src="../../demos/form/ModalForm/drawer-form.tsx" background="var(--main-bg-color)"></code>

## 嵌套浮层表单

<code src="../../demos/form/ModalForm/drawer-form-nested.tsx" debug  background="var(--main-bg-color)" title="Drawer Forms"></code>

### Debug：请求加载中关闭（Modal + Drawer）

<code src="../../demos/form/ModalForm/modal-form-request-destroy-debug.tsx" debug background="var(--main-bg-color)" title="Debug: destroyOnHidden + request (Modal & Drawer)"></code>

## 自定义 Modal 表单按钮

<code src="../../demos/form/ModalForm/modal-form-submitter.tsx" background="var(--main-bg-color)"></code>

## 使用 open 和 onOpenChange

<code src="../../demos/form/ModalForm/open-on-open-change.tsx" background="var(--main-bg-color)"></code>

## 重置表单

<code src="../../demos/form/ModalForm/modal-form-reset.tsx" background="var(--main-bg-color)"></code>

## API

### ModalForm

ModalForm 组合了 Modal 和 ProForm 可以减少繁琐的状态管理。

| 参数          | 说明                                                                                                                               | 类型                            | 默认值 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------ |
| trigger       | 用于触发 Modal 打开的 dom，一般是 Button                                                                                           | `JSX.Element`                   | -      |
| open          | 是否打开                                                                                                                           | `boolean`                       | -      |
| onOpenChange  | open 改变时触发                                                                                                                    | `(open: boolean) => void`       | -      |
| modalProps    | Modal 的 props，使用方式与 [antd](https://ant.design/components/modal-cn/) 相同。注意：不支持传入 `open`，请使用顶层的 `open` 控制 | `Omit<ModalProps, 'open'>`      | -      |
| title         | 弹框的标题                                                                                                                         | `ModalProps['title']`           | -      |
| width         | 弹框的宽度                                                                                                                         | `ModalProps['width']`           | -      |
| onFinish      | 提交数据时触发，返回真值会关闭弹框；若配置了 `destroyOnHidden` 还会在关闭后重置表单                                                | `(values: any) => Promise<any>` | -      |
| submitTimeout | 提交数据时，禁用取消按钮的超时时间（毫秒）                                                                                         | `number`                        | -      |
| submitter     | 提交按钮相关配置，使用方式与 [ProForm](/components/form) 相同                                                                      | `SubmitterProps \| false`       | -      |

### DrawerForm

DrawerForm 组合了 Drawer 和 ProForm 可以减少繁琐的状态管理。

| 参数          | 说明                                                                                                                                 | 类型                             | 默认值  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ------- |
| trigger       | 用于触发抽屉打开的 dom，一般是 Button                                                                                                | `JSX.Element`                    | -       |
| open          | 是否打开                                                                                                                             | `boolean`                        | -       |
| onOpenChange  | open 改变时触发                                                                                                                      | `(open: boolean) => void`        | -       |
| drawerProps   | Drawer 的 props，使用方式与 [antd](https://ant.design/components/drawer-cn/) 相同。注意：不支持传入 `open`，请使用顶层的 `open` 控制 | `Omit<DrawerProps, 'open'>`      | -       |
| title         | 抽屉的标题                                                                                                                           | `DrawerProps['title']`           | -       |
| width         | 抽屉的宽度（受控属性，使用时权重高于 `resize`）                                                                                      | `DrawerProps['width']`           | -       |
| resize        | 是否允许拖拽调整抽屉宽度；为 `true` 时使用默认配置，也可以传入对象进行配置                                                           | `CustomizeResizeType \| boolean` | `false` |
| onFinish      | 提交数据时触发，返回真值会关闭抽屉；若配置了 `destroyOnHidden` 还会在关闭后重置表单                                                  | `(values: any) => Promise<any>`  | -       |
| submitTimeout | 提交数据时，禁用取消按钮的超时时间（毫秒）                                                                                           | `number`                         | -       |
