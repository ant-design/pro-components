---
title: Quick Start
order: 2
group:
  path: /
nav:
  title: Documentation
  path: /docs
---

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

It's recommended to use less, it's easier to customize the theme and to load it on demand.
