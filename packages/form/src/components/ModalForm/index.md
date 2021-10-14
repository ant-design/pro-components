---
title: Modal/Drawer - 浮层表单
order: 2
group:
  path: /
nav:
  title: 组件
  path: /components
---

# 浮层表单

ModalForm 和 DrawerForm 是 ProForm 的一个变体，本质上仍然是个表单。所以无法通过 `footer` 来自定义页脚,如果要定义页脚需要使用 `submitter.render` 来进行自定义。这两个表单的表现与 ProForm 相同，可以从 ProForm 直接修改而来。

ModalForm 和 DrawerForm 都提供了 trigger 来减少 state 的使用，如果你需要使用 state 来控制可以使用 `visible` 和 `onVisibleChange` 来控制打开与关闭。

## Modal 表单

<code src="./demos/modal-form.tsx"  background="#f5f5f5"  height="32px" title="Modal 表单" />

## Drawer 表单

<code src="./demos/drawer-form.tsx"  background="#f5f5f5" height="32px" title="Drawer 表单" />

## 嵌套浮层表单

<code src="./demos/drawer-form-nested.tsx" debug background="#f5f5f5" height="32px" title="Drawer Forms"/>

## 自定义 Modal 表单按钮

<code src="./demos/modal-form-submitter.tsx"  background="#f5f5f5" height="32px" title="自定义 Modal 表单按钮"/>

## 使用 visible 和 onVisibleChange

<code src="./demos/visible-on-visible-change.tsx"  background="#f5f5f5" height="32px" title="使用 visible 和 onVisibleChange"/>

## 重置表单

<code src="./demos/modal-form-reset.tsx"  background="#f5f5f5" height="32px" title="重置表单"/>

## API

### ModalForm

ModalForm 组合了 Modal 和 ProForm 可以减少繁琐的状态管理。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 用于触发 Modal 打开的 dom，一般是 button | `ReactNode` | - |
| visible | 是否打开 | `boolean` | - |
| onVisibleChange | visible 改变时触发 | `(visible:boolean)=>void` | - |
| modalProps | Modal 的 props，使用方式与 [antd](https://ant.design/components/modal-cn/) 相同。注意：不支持 'visible'，请使用全局的 visible | [props](https://ant.design/components/modal-cn/#API) | - |
| title | 弹框的标题 | `ReactNode` | - |
| width | 弹框的宽度 | `Number` | - |
| onFinish | 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 `destroyOnClose` 还会重置表单。 | `async (values)=>boolean` | - |
| submitter | 提交按钮相关配置，使用方式与[ProForm](https://procomponents.ant.design/components/form) 相同。 | [ProForm](https://procomponents.ant.design/components/form) | - |

### DrawerForm

DrawerForm 组合了 Drawer 和 ProForm 可以减少繁琐的状态管理。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 用于触发 Modal 打开的 dom，一般是 button | `ReactNode` | - |
| visible | 是否打开 | `boolean` | - |
| onVisibleChange | visible 改变时触发 | `(visible:boolean)=>void` | - |
| drawerProps | Drawer 的 props，使用方式与 [antd](https://ant.design/components/drawer-cn/) 相同。注意：不支持 'visible'，请使用全局的 visible | [props](https://ant.design/components/drawer-cn/#API) | - |
| title | 抽屉的标题 | `ReactNode` | - |
| width | 抽屉的宽度 | `Number` | - |
| onFinish | 提交数据时触发，如果返回一个 true。会关掉抽屉,如果配置了 `destroyOnClose` 还会重置表单。 | `async (values)=>boolean` | - |
