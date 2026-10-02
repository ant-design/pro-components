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

<code src="../../demos/form/modal-form/modal-form.tsx" background="var(--main-bg-color)"></code>

## Drawer 表单

<code src="../../demos/form/modal-form/drawer-form.tsx" background="var(--main-bg-color)"></code>

## 嵌套浮层表单

<code src="../../demos/form/modal-form/drawer-form-nested.tsx" debug  background="var(--main-bg-color)" title="Drawer Forms"></code>

### Debug：请求加载中关闭（Modal + Drawer）

<code src="../../demos/form/modal-form/_modal-form-request-destroy.tsx" debug background="var(--main-bg-color)" title="Debug: destroyOnHidden + request (Modal & Drawer)"></code>

## 自定义 Modal 表单按钮

<code src="../../demos/form/modal-form/modal-form-submitter.tsx" background="var(--main-bg-color)"></code>

## 使用 open 和 onOpenChange

<code src="../../demos/form/modal-form/open-on-open-change.tsx" background="var(--main-bg-color)"></code>

## 在首次打开前设置表单值

antd Modal 默认懒渲染内容。首次打开前，`Form.useForm()` 创建的实例还没有连接到
ModalForm 内部的 Form，此时调用 `setFieldsValue` 会出现
“Instance created by `useForm` is not connected” 警告。只传 `form={form}` 不能提前挂载
Form。

如果交互必须先调用 `setFieldsValue` 再打开弹窗，请设置
`modalProps={{ forceRender: true }}`。下面的示例可以直接复制验证：

<code src="../../demos/form/modal-form/use-form-before-open.tsx" background="var(--main-bg-color)" title="useForm：首次打开前写入值"></code>

也可以采用以下方式避免过早调用实例：

- 使用 `initialValues` 或 `request`，让数据随 Form 挂载后初始化；编辑不同记录时配合
  `modalProps={{ destroyOnHidden: true }}`，确保下次打开重新挂载。
- 在 `onInit` 中保存或使用已经连接的表单实例。
- 使用 ModalForm 自带的 `trigger` 时，在 `onOpenChange(true)` 中写入值；v3 会等内部
  Form 挂载后再触发首次打开回调。

## 重置表单

<code src="../../demos/form/modal-form/modal-form-reset.tsx" background="var(--main-bg-color)"></code>

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
| size          | 抽屉的尺寸                                                                                                                           | `DrawerProps['size']`            | -       |
| width         | 抽屉的宽度，已废弃，请使用 `size`                                                                                                    | `DrawerProps['size']`            | -       |
| resizable     | 是否使用 antd 原生拖拽调整尺寸（配置 `resize` 时无效）                                                                              | `DrawerProps['resizable']`       | -       |
| resize        | 是否允许拖拽调整抽屉宽度；为 `true` 时使用默认配置，也可以传入对象进行配置                                                           | `CustomizeResizeType \| boolean` | `false` |
| onFinish      | 提交数据时触发，返回真值会关闭抽屉；若配置了 `destroyOnHidden` 还会在关闭后重置表单                                                  | `(values: any) => Promise<any>`  | -       |
| submitTimeout | 提交数据时，禁用取消按钮的超时时间（毫秒）                                                                                           | `number`                         | -       |
