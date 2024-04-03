---
title: CRUD
nav:
  title: Playground
  path: /playground
---

# CRUD

ProTable，ProDescriptions，ProForm 都是基于 ProField 来进行封装。ProTable 和 ProDescriptions 根据 valueType 来渲染不同的 ProField，Form 则是通过不同的 FormField 来实现封装。

使用同样的底层实现为 ProTable，ProDescriptions，ProForm 打通带来了便利。ProForm 可以很方便的实现只读模式，ProTable 可以快速实现查询表单和可编辑表格。ProDescriptions 可以实现节点编辑，以下有个例子可以切换三个组件。

<code src="../../packages/table/src/demos/crud.tsx" iframe="650"></code>
