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

- `npm i @ant-design/pro-form --save`
- `npm i @ant-design/pro-layout --save`
- `npm i @ant-design/pro-table --save`
- `npm i @ant-design/pro-list --save`
- `npm i @ant-design/pro-descriptions --save`
- `npm i @ant-design/pro-card --save`
- `npm i @ant-design/pro-skeleton --save`

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

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

我们所有的包都使用 less 来进行样式管理，方便进行主题的自定义。如果你没有 less-loader 可以尝试从 `dist` 中导入 css。

```tsx | pure
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
```

建议还是使用 less，可以方便进行主题自定义，来可以做到按需加载。
