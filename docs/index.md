---
title: 介绍
order: 10
side: false
hero:
  title: ProLayout
  desc: 🏆 Use Ant Design Table like a Pro!
  actions:
    - text: 快速开始 →
      link: /getting-started
features:
  - icon: https://gw.alipayobjects.com/os/q/cms/images/k9ziitmp/13668549-b393-42a2-97c3-a6365ba87ac2_w96_h96.png
    title: 简单易用
    desc: 开箱即用的 Layout 组件，一步即可生成layout
  - icon: https://gw.alipayobjects.com/os/q/cms/images/k9ziik0f/487a2685-8f68-4c34-824f-e34c171d0dfd_w96_h96.png
    title: Ant Design
    desc: 与 Ant Design 设计体系一脉相承，无缝对接 antd 项目，兼容 antd 3.x & 4.x
  - icon: https://gw.alipayobjects.com/os/q/cms/images/k9ziip85/89434dcf-5f1d-4362-9ce0-ab8012a85924_w96_h96.png
    title: 国际化
    desc: 提供完备的国际化语言支持，与 Ant Design 体系打通
  - icon: https://gw.alipayobjects.com/mdn/rms_05efff/afts/img/A*-3XMTrwP85wAAAAAAAAAAABkARQnAQ
    title: 预设样式
    desc: 样式风格与 antd 一脉相承，无需魔改，浑然天成
  - icon: https://gw.alipayobjects.com/os/q/cms/images/k9ziieuq/decadf3f-b53a-4c48-83f3-a2faaccf9ff7_w96_h96.png
    title: 预设行为
    desc: 路由可以默认的生成菜单和面包屑, 并且自动更新浏览器的 title
  - icon: https://gw.alipayobjects.com/os/q/cms/images/k9zij2bh/67f75d56-0d62-47d6-a8a5-dbd0cb79a401_w96_h96.png
    title: Typescript
    desc: 使用 TypeScript 开发，提供完整的类型定义文件

footer: Open-source MIT Licensed | Copyright © 2017-present
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

<code src="./demo/base.tsx" />
