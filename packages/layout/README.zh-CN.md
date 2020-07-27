[English](./README.md) | 简体中文 [changelog](./changelog.zh-CN.md)

[![](https://img.shields.io/npm/dw/@ant-design/pro-layout.svg)](https://www.npmjs.com/package/@ant-design/pro-layout) [![npm package](https://img.shields.io/npm/v/@ant-design/pro-layout.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-layout) [![](https://img.shields.io/github/issues/ant-design/ant-design-pro-layout.svg)](https://github.com/ant-design/ant-design-pro-layout/issues) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro-layout.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design-pro-layout) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro-layout.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design-pro-layout?type=dev) ![](https://github.com/ant-design/ant-design-pro-layout/workflows/.github/workflows/test.yml/badge.svg)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

![image](https://gw.alipayobjects.com/zos/antfincdn/raCkHezMns/Kapture%2525202019-11-25%252520at%25252019.15.12.gif)

开箱即用的中台前端/设计解决方案。此仓库是 Ant Design Pro 的 layout, 是为了方便快速的使用 layout 而开发。

</div>

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

## API

> 所有以 `Render` 后缀的方法都可以通过传入 `false` 来使其不渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | layout 的 左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| pure | 是否删除掉所有的自带界面 | boolean | - |
| loading | layout 的加载态 | boolean | - |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| onMenuHeaderClick | menu 菜单的头部点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void` | - |
| contentStyle | layout 的 内容区 style | CSSProperties | - |
| layout | layout 的菜单模式,side：右侧导航，top：顶部导航 | 'side' \| 'top' | `'side'` |
| contentWidth | layout 的内容模式,Fluid：定宽 1200px，Fixed：自适应 | 'Fluid' \| 'Fixed' | `'Fluid'` |
| navTheme | 导航的主题 | 'light' \| 'dark' | `'dark'` |
| fixedHeader | 是否固定 header 到顶部 | boolean | `false` |
| fixSiderbar | 是否固定导航 | boolean | `false` |
| breakpoint | 触发响应式布局的[断点](https://ant.design/components/grid-cn/#Col) | `Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' }` | `lg` |
| menu | 关于 menu 的配置，暂时只有 locale,locale 可以关闭 menu 的自带的全球化 | { locale: boolean, defaultOpenAll: boolean } | `{ locale: true }` |
| iconfontUrl | 使用 [IconFont](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) 的图标配置 | string | - |
| locale | 当前 layout 的语言设置 | 'zh-CN' \| 'zh-TW' \| 'en-US' | navigator.language |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| siderWidth | 侧边菜单宽度 | number | 256 |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| onCollapse | 菜单的折叠收起事件 | (collapsed: boolean) => void | - |
| onPageChange | 页面切换时触发 | (location: Location) => void | - |
| headerRender | 自定义头的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| headerTitleRender | 自定义头标题的方法 | (props: BasicLayoutProps) => ReactNode | - |
| headerContentRender | 自定义头内容的方法 | (props: BasicLayoutProps) => ReactNode | - |
| rightContentRender | 自定义头右部的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| collapsedButtonRender | 自定义 collapsed button 的方法 | (collapsed: boolean) => ReactNode | - |
| footerRender | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| pageTitleRender | 自定义页面标题的显示方法 | (props: BasicLayoutProps) => ReactNode | - |
| menuRender | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| postMenuData | 在显示前对菜单数据进行查看，修改不会触发重新渲染 | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |
| menuItemRender | 自定义菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |
| subMenuItemRender | 自定义拥有子菜单菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |
| menuDataRender | menuData 的 render 方法，用来自定义 menuData | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |
| breadcrumbRender | 自定义面包屑的数据 | (route)=>route | - |
| route | 用于生成菜单和面包屑。umi 的 Layout 会自动带有 | [route](#Route) | - |
| disableMobile | 禁止自动切换到移动页面 | boolean | false |
| links | 显示在菜单右下角的快捷操作 | ReactNode[] | - |
| menuProps | 传递到 antd menu 组件的 props, 参考 (https://ant.design/components/menu-cn/) | MenuProps | undefined |

在 4.5.13 以后 Layout 通过 `menuProps` 支持 [Menu](https://ant.design/components/menu-cn/#Menu) 的大部分 props。

### SettingDrawer

> SettingDrawer 提供了一个图形界面来设置 layout 的配置。不建议在正式环境中使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onSettingChange | [`Settings`](#Settings) 发生更改事件 | (settings: [`Settings`](#Settings) ) => void | - |
| hideHintAlert | 删除下方的提示信息 | boolean | - |

### PageContainer

PageContainer 封装了 ant design 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageContainer 支持 [Tabs](https://ant.design/components/tabs-cn/) 和 [PageHeader](https://ant.design/components/page-header-cn/) 的所有属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于 content 的右侧 | ReactNode | - |
| tabList | tab 标题列表 | `Array<{key: string, tab: ReactNode}>` | - |
| tabActiveKey | 当前高亮的 tab 项 | string | - |
| onTabChange | 切换面板的回调 | `(key) => void` | - |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | - |

### PageLoading

一个简单的加载页面

| 参数 | 说明         | 类型      | 默认值 |
| ---- | ------------ | --------- | ------ |
| tip  | 加载的小说明 | ReactNode | -      |

### RouteContext

RouteContext 可以提供 Layout 的内置的数据。例如 isMobile 和 collapsed，你可以消费这些数据来自定义一些行为。

```tsx
import { RouteContext, RouteContextType } from '../index';

const Page = () => (
  <RouteContext.Consumer>
    {(value: RouteContextType) => {
      return value.title;
    }}
  </RouteContext.Consumer>
);
```

### GridContent

GridContent 封装了 [等宽](https://preview.pro.ant.design/dashboard/analysis?layout=top&contentWidth=Fixed)和 [流式](https://preview.pro.ant.design/dashboard/analysis?layout=top) 的逻辑。你可以在 [preview](https://preview.pro.ant.design/dashboard/analysis) 中查看预览效果。

| 参数         | 说明     | 类型               | 默认值 |
| ------------ | -------- | ------------------ | ------ |
| contentWidth | 内容模式 | 'Fluid' \| 'Fixed' | -      |

### getMenuData

根据 router 信息来生成 menuData 和 breadcrumb。

```js | pure
import { getMenuData } from '@ant-design/pro-layout';

const { breadcrumb, menuData } = getMenuData(
  routes,
  menu,
  formatMessage,
  menuDataRender,
);
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| routes | 路由的配置信息 | [route[]](#Route) | - |
| menu | menu 的配置项，默认 `{locale: true}` | `{ locale: boolean }` | - |
| menuDataRender | menuData 的 render 方法，用来自定义 menuData | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |
| formatMessage | react-intl 的 formatMessage 方法 | `(data: { id: any; defaultMessage?: string }) => string;` | - |

### getPageTitle

getPageTitle 封装了根据 menuData 上生成的 title 的逻辑。

```js | pure
import { getPageTitle } from '@ant-design/pro-layout';

const title = getPageTitle({
  pathname,
  breadcrumb,
  menu,
  title,
  formatMessage,
});
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pathname | 当前的 pathname | location.pathname | - |
| breadcrumb | MenuDataItem 的合集 | `{ [path: string]: MenuDataItem }` | - |
| menu | menu 的配置项，默认 `{locale: true}` | `{ locale: boolean }` | - |
| title | title 的类型 | string | 'Ant Design Pro' |
| formatMessage | react-intl 的 formatMessage 方法 | `(data: { id: any; defaultMessage?: string }) => string;` | - |

## 数据结构

> 为了方便查看和使用，这里使用了 Typescript 的 方式来书写。

### Settings

```ts | pure
// 可以通过 import { Settings } from '@ant-design/pro-layout/defaultSettings'
// 来获取这个类型
export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme: 'light' | 'dark';
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `side` or `top`
   */
  layout: 'side' | 'top';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is top
   */
  contentWidth: 'Fluid' | 'Fixed';
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;
}
```

### MenuDataItem

```ts | pure
// 可以通过 import { MenuDataItem } from '@ant-design/pro-layout'
// 来获取这个类型

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}
```

### Route

```ts | pure
// 可以通过 import { RouterTypes } from '@ant-design/pro-layout/typings'
// 来获取这个类型
export interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon: string;
    name: string;
    path: string;
    // 可选二级菜单
    children?: Route['routes'];
  }>;
}
```

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 Ant Design Pro。
- 通过 [Issue](http://github.com/ant-design/ant-design-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/ant-design-pro/pulls) 改进 Pro 的代码。
