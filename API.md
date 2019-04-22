# API

> 所有 render 开头的方法都可以通过传入 `false` 来使其不渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logo | layout 的 左上角 logo 的 url | string | '' |
| renderLogo | 自定义 logo 的 render 方法。 | (logo:string) => ReactNode | - |
| lang | 当前 layout 的语言设置 | 'zh-CN' | 'zh-TW' | 'en-US'` | navigator.language |
| settings | layout 的设置 | 见 [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onChangeSetting | layout 的 设置发生更改事件 | (settings: Settings) => void | - |
| renderSettingDrawer | 自定义设置窗口的 render | (settings: Settings) => ReactNode | - |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| onChangeLayoutCollapsed | 菜单的折叠收起事件 | (collapsed: boolean) => void | - |
| renderHeader | 自定义头的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| renderFooter | 自定义页脚的 render 方法 | (props: BasicLayoutProps) => ReactNode | - |
| renderMenu | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| onLogoClick | logo 的 单击事件,默认会回到主页 | (e: React.MouseEvent) => void | () => window.history.pushState({}, '', '/') |
| renderMenuItem | 自定义菜单项的 render 方法 | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |
| breadcrumbNameMap | 用于辅助生成面包屑。umi 会自动带有 | { [path: string]: [MenuDataItem](#MenuDataItem) } | - |

# 数据结构

> 为了方便查看和使用，这里使用了 Typescript 的 方式来书写。

## Settings

```ts
// 可以通过 import { Settings } from '@ant-design/pro-layout/defaultSettings'
// 来获取这个类型

export declare type MenuTheme = 'light' | 'dark';

export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme;
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
  contentWidth: ContentWidth;
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
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;
}
```

## MenuDataItem

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
