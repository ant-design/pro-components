[English](./README.md) | 简体中文 [changelog](./changelog.zh-CN.md)

[![](https://img.shields.io/npm/dw/@ant-design/pro-layout.svg)](https://www.npmjs.com/package/@ant-design/pro-layout) [![npm package](https://img.shields.io/npm/v/@ant-design/pro-layout.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@ant-design/pro-layout) [![](https://img.shields.io/github/issues/ant-design/ant-design-pro-layout.svg)](https://github.com/ant-design/ant-design-pro-layout/issues) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro-layout.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design-pro-layout) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro-layout.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design-pro-layout?type=dev) [![Build Status](https://dev.azure.com/chenshuai2144/Pro-Layout/_apis/build/status/ant-design.ant-design-pro-layout?branchName=master)](https://dev.azure.com/chenshuai2144/Pro-Layout/_build/latest?definitionId=2&branchName=master)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

![image](https://user-images.githubusercontent.com/8186664/55930941-276e6580-5c56-11e9-800d-bc284bda4daf.png)

开箱即用的中台前端/设计解决方案。此仓库是 Ant Design Pro 的 layout, 是为了方便快速的使用 layout 而开发。

</div>

## 使用

```bash
npm i @ant-design/pro-layout --save
// or
yarn add @ant-design/pro-layout
```

```jsx
import BasicLayout from '@ant-design/pro-layout';

render(<BasicLayout />, document.getElementById('root'));
```

## API

> 所有以 `Render` 后缀的方法都可以通过传入 `false` 来使其不渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | layout 的 左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| onMenuHeaderClick | menu 菜单的头部点击事件 | (e: React.MouseEvent<HTMLDivElement>) => void | - |
| layout | layout 的菜单模式,sidemenu：右侧导航，topmenu：顶部导航 | 'sidemenu' \| 'topmenu' | `'sidemenu'` |
| contentWidth | layout 的内容模式,Fluid：定宽 1200px，Fixed：自适应 | 'Fluid' \| 'Fixed' | `'Fluid'` |
| navTheme | 导航的主题 | 'light' \| 'dark' | `'dark'` |
| fixedHeader | 是否固定 header 到顶部 | boolean | `false` |
| fixSiderbar | 是否固定导航 | boolean | `false` |
| autoHideHeader | 是否下滑时自动隐藏 header | boolean' | `false` |
| menu | 关于 menu 的配置，暂时只有 locale,locale 可以关闭 menu 的自带的全球化 | { locale: boolean } | `{ locale: true }` |
| iconfontUrl | 使用 [IconFont](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) 的图标配置 | string | - |
| locale | 当前 layout 的语言设置 | 'zh-CN' \| 'zh-TW' \| 'en-US' | navigator.language |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| siderWidth | 侧边菜单宽度 | number | 256 |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| onCollapse | 菜单的折叠收起事件 | (collapsed: boolean) => void | - |
| headerRender | 自定义头的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| rightContentRender | 自定义头右部的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| collapsedButtonRender | 自定义 collapsed button 的方法 | (collapsed: boolean) => ReactNode | - |
| footerRender | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| pageTitleRender | 自定义页面标题的显示方法 | (props: BasicLayoutProps) => ReactNode | - |
| menuRender | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| menuItemRender | 自定义菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |
| menuDataRender | menuData 的 render 方法，用来自定义 menuData | `(menuData: MenuDataItem[]) => MenuDataItem[]` | - |
| route | 用于生成菜单和面包屑。umi 的 Layout 会自动带有 | [route](#Route) | - |

在 4.5.13 以后 Layout 支持 [Menu](https://ant.design/components/menu-cn/#Menu) 的大部分 props。

### SettingDrawer

> SettingDrawer 提供了一个图形界面来设置 layout 的配置。不建议在正式环境中使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| settings | layout 的设置 | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onSettingChange | [`Settings`](#Settings) 发生更改事件 | (settings: [`Settings`](#Settings) ) => void | - |

### PageHeaderWrapper

PageHeaderWrapper 封装了 ant design 的 PageHeader 组件，增加了 tabList，和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageHeaderWrapper 支持 [Tabs](https://ant.design/components/tabs-cn/) 和 [PageHeader](https://ant.design/components/page-header-cn/) 的所有属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于 content 的右侧 | ReactNode | - |
| tabList | tab 标题列表 | `Array<{key: string, tab: ReactNode}>` | - |
| tabActiveKey | 当前高亮的 tab 项 | string | - |
| onTabChange | 切换面板的回调 | `(key) => void` | - |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | - |

### RouteContext

RouteContext 可以提供 Layout 的内置的数据。例如 isMobile 和 collapsed，你可以消费这些数据来自定义一些行为。

```tsx
import { RouteContext } from '@ant-design/pro-layout';

const Page = () => (
  <RouteContext.Consumer>
    {value => {
      return value.title;
    }}
  </RouteContext.Consumer>
);
```

### GridContent

GridContent 封装了 [等宽](https://preview.pro.ant.design/dashboard/analysis?layout=topmenu&contentWidth=Fixed)和 [流式](https://preview.pro.ant.design/dashboard/analysis?layout=topmenu) 的逻辑。你可以在 [preview](https://preview.pro.ant.design/dashboard/analysis) 中查看预览效果。

| 参数         | 说明     | 类型               | 默认值 |
| ------------ | -------- | ------------------ | ------ |
| contentWidth | 内容模式 | 'Fluid' \| 'Fixed' | -      |

### getMenuData

根据 router 信息来生成 menuData 和 breadcrumb。

```js
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

```js
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

```ts
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
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: 'Fluid' | 'Fixed';
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
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

```ts
// 可以通过 import { MenuDataItem } from '@ant-design/pro-layout/typings'
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

```ts
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

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 Ant Design Pro。
- 通过 [Issue](http://github.com/ant-design/ant-design-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/ant-design-pro/pulls) 改进 Pro 的代码。
