---
title: 介绍
order: 0
group:
  path: /layout
nav:
  title: 布局
  path: /layout
---

## 使用

```bash
npm i @ant-design/pro-layout --save
// or
yarn add @ant-design/pro-layout
```

```jsx | pure
import BasicLayout from '@ant-design/pro-layout';

render(<BasicLayout />, document.getElementById('root'));
```

## 示例

[site](https://ant-design.github.io/ant-design-pro-layout/)

# 基本使用

ProLayout 与 umi 配合使用会有最好的效果，umi 会把 config.ts 中的路由帮我们自动注入到配置的 layout 中，这样我们就可以免去手写菜单的烦恼。

ProLayout 扩展了 umi 的 router 配置，新增了 name，icon，locale,hideInMenu,hideChildrenInMenu 等配置，这样可以更方便的生成菜单，在一个地方配置即可。数据格式如下：

```ts | pure
export interface MenuDataItem {
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}
```

ProLayout 会根据 `location.pathname` 来自动选中菜单，并且自动生成相应的面包屑。如果不想使用可以自己配置 `selectedKeys` 和 `openKeys` 来进行受控配置。

## Demo

<code src="../demos/base.tsx" />
