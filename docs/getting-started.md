---
title: 快速开始
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
---

## 安装

当前 ProComponents 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。

```shell
$ npm i @ant-design/pro-table --save
```

当前 ProComponents 提供了如下组件可直接使用：

- @ant-design/pro-form
- @ant-design/pro-layout
- @ant-design/pro-table
- @ant-design/pro-list
- @ant-design/pro-descriptions
- @ant-design/pro-card
- @ant-design/pro-skeleton

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

```jsx
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
