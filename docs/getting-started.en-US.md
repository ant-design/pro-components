---
title: Quick Start
order: 2
group:
  path: /
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
$ npm i @ant-design/pro-table --save
```

Current ProComponents provides the following components for direct use.

- `npm i @ant-design/pro-form --save`
- `npm i @ant-design/pro-layout --save`
- `npm i @ant-design/pro-table --save`
- `npm i @ant-design/pro-list --save`
- `npm i @ant-design/pro-descriptions --save`
- `npm i @ant-design/pro-card --save`
- `npm i @ant-design/pro-skeleton --save`

## Using in a project

Each package is a separate component package, and is used in the following example.

```tsx
import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';

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

All our packages use less for style management and easy theme customization. If you don't have less-loader you can try to import css from `dist`.

```tsx | pure
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
```

It is recommended to use less, which allows for easy theme customization and on-demand loading.
