---
title: 快速开始
order: 2

nav:
  title: 文档
  path: /docs
---

## ProComponents

ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著地提升制作 CRUD 页面的效率，更加专注于页面。

- [ProLayout](/components/layout) 解决布局的问题，提供开箱即用的菜单和面包屑功能
- [ProTable](/components/table) 表格模板组件，抽象网络请求和表格格式化
- [ProForm](/components/form) 表单模板组件，预设常见布局和行为
- [ProCard](/components/card) 提供卡片切分以及栅格布局能力
- [ProDescriptions](/components/descriptions) 定义列表模板组件，ProTable 的配套组件
- [ProSkeleton](/components/skeleton) 页面级别的骨架屏

在使用之前可以查看一下典型的 Demo 来判断组件是否适合你们的业务。ProComponents 专注于中后台的 CRUD, 预设了相当多的样式和行为。这些行为和样式更改起来会比较困难，如果你的业务需要丰富的自定义建议直接使用 Ant Design。

## 安装

当前 ProComponents 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。

```shell
$ npm i @ant-design/pro-components --save
```

当前 ProComponents 提供了如下组件可直接使用：

- `npm i @ant-design/pro-components --save`

## 在项目中使用

每一个包都是一个独立的组件包，使用示例如下 ：

```jsx
import React from 'react';
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

我们所有的包都使用 CSS-in-JS 管理样式，只需引入 js 即可。
