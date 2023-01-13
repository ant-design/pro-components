---
title: Quick Start
order: 2

nav:
  title: Documentation
  path: /docs
---

## ProComponents

ProComponents is a template component based on Ant Design that provides a higher level of abstraction support out of the box. It can significantly improve the efficiency of creating CRUD pages and focus more on them.

- [ProLayout](/components/layout) solves layout problems, provides out-of-the-box menu and breadcrumb functionality
- [ProTable](/components/table) Form template component, abstracting web requests and form formatting
- [ProForm](/components/form) Form template component, presets common layouts and behaviors
- [ProCard](/components/card) provides card slicing and raster layout capabilities
- [ProDescriptions](/components/descriptions) Definition list template component, a companion component to ProTable
- [ProSkeleton](/components/skeleton) Page level skeleton screen

ProComponents is focused on middle and backend CRUD and has a lot of pre-defined styles and behaviors. These behaviors and styles can be difficult to change, so if your business requires rich customization it is recommended to use Ant Design directly.

## Installation

Currently each component of ProComponents is a separate package, you need to install the corresponding npm package in your project and use it.

```shell
$ npm i @ant-design/pro-components --save
```

Current ProComponents provides the following components for direct use.

- `npm i @ant-design/pro-components --save`

## Using in a project

Each package is a separate component package, and is used in the following example.

```tsx | pure
import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="name" label="姓名" />
    </ProForm>
  );
};
```
