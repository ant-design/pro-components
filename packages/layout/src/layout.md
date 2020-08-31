---
title: ProLayout - 高级布局
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProLayout - 高级布局

## 安装和初始化

```bash
npm i @ant-design/pro-layout --save
// or
yarn add @ant-design/pro-layout
```

```jsx | pure
import BasicLayout from '@ant-design/pro-layout';

render(<BasicLayout />, document.getElementById('root'));
```

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

## API

> 所有以 `Render` 后缀的方法都可以通过传入 `false` 来使其不渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | layout 的左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| pure | 是否删除掉所有的自带界面 | boolean | - |
| loading | layout 的加载态 | boolean | - |
| location | 当前应用会话的位置信息。如果你的应用创建了自定义的 history，则需要显示指定 location 属性，详见 [issue](https://github.com/ant-design/pro-components/issues/327) | [history.location](https://reactrouter.com/web/api/history) | isBrowser ? window.location : undefined |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| onMenuHeaderClick | menu 菜单的头部点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void` | - |
| onTopMixMenuHeaderClick | mix 模式下顶部栏的头部点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void` | - |
| contentStyle | layout 的内容区 style | CSSProperties | - |
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
| headerTitleRender | 自定义头标题的方法,mix 模式下生效 | (props: BasicLayoutProps) => ReactNode | - |
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

```tsx | pure
import { RouteContext, RouteContextType } from '@ant-design/pro-layout';

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

const { breadcrumb, menuData } = getMenuData(routes, menu, formatMessage, menuDataRender);
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

### 数据结构

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
// 可以通过 import { RouterTypes } from '@ant-design/pro-layout/lib/typings';
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

### 远程加载菜单

ProLayout 提供了强大的 menu，但是这样必然会封装很多行为，导致需要一些特殊逻辑的用户感到不满。所以我们提供了很多的 API，期望可以满足绝大部分客户的方式。

#### 从服务器加载 menu

从服务器加载 menu 主要使用的 API 是 `menuDataRender` 和 `menuRender`,`menuDataRender`可以控制当前的菜单数据，`menuRender`可以控制菜单的 dom 节点。

<code src="./demos/dynamicMenu.tsx" />

#### 从服务器加载 menu 并且使用 icon

这里主要是一个演示，我们需要准备一个枚举来进行 icon 的渲染，可以显著的减少打包的大小

<code src="./demos/antd@4MenuIconFormServe.tsx" />

#### 从服务器加载 menu 并且使用旧版本 icon

使用兼容包来实现，虽然比较简单，但是会造成打包太大

<code src="./demos/antd@3MenuIconFormServe.tsx" />

#### 自定义 menu 的内容

通过 `menuItemRender`, `subMenuItemRender`,`title`,`logo`,`menuHeaderRender` 可以非常方便的自定义 menu 的样式。如果实在是不满意，可以使用 `menuRender` 完全的自定义。

<code src="./demos/customizeMenu.tsx" />

#### 关闭时完全收起 menu

<code src="./demos/hideMenu.tsx" />

## Example 展示

<code src="./demos/base.tsx" />

#### 自定义页脚

ProLayout 默认不提供页脚，要是和 Pro 官网相同的样式，需要自己引入一下页脚。

<code src="./demos/footer.tsx" />

这里用于展示 ProLayout 的各种应用，如果你觉得你的用法能帮助到别人，欢迎 PR。

#### 搜索菜单

<code src="./demos/searchMenu.tsx" />

#### 多个路由对应一个菜单项

<code src="./demos/MultipleMenuOnePath.tsx" />

#### 默认打开所有菜单

<code src="./demos/DefaultOpenAllMenu.tsx" />

#### 带参数的面包屑

<code src="./demos/BreadcrumbsRepeat.tsx" />

#### IconFont

<code src="./demos/IconFont.tsx" />

#### 嵌套布局

<code src="./demos/Nested.tsx" />

#### 另外一种嵌套布局

<code src="./demos/TopmenuNested.tsx" />
