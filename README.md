English | [简体中文](./README.zh-CN.md)

<h1 align="center">Ant Design Pro Layout</h1>

<div align="center">

![image](https://user-images.githubusercontent.com/8186664/55930941-276e6580-5c56-11e9-800d-bc284bda4daf.png)

An out-of-box UI solution for enterprise applications as a React boilerplate. This repository is the layout of Ant Design Pro and was developed for quick and easy use of the layout.

</div>

## Usage

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

### BasicLayout

> All methods at the beginning of the rendering can prevent rendering by passing in `false`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | layout in the upper left corner title | ReactNode | `'Ant Design Pro'` |
| logo | layout top left logo url | ReactNode \| ()=>ReactNode | - |
| layout | layout menu mode, sidemenu: right navigation, topmenu: top navigation | 'sidemenu' \| 'topmenu' | `sidemenu'` |
| contentWidth | content mode of layout, Fluid: fixed width 1200px, Fixed: adaptive | 'Fluid' \| 'Fixed' | `Fluid'` |
| navTheme | Navigation menu theme | 'light' \| 'dark' | `dark` |
| fixedHeader | whether to fix header to top | boolean | `false` |
| FixSiderbar | Whether to fix navigation menu | boolean | `false` |
| autoHideHeader | automatically hide the header when sliding | boolean' | `false` |
| menu | About the configuration of the menu, only locale, locale can turn off the globalization of the menu | { locale: boolean } | `{ locale: true }` |
| iconfontUrl | Use [IconFont](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) icon configuration | string | - |
| locale | The language setting of the layout | 'zh-CN' \| 'zh-TW' \| 'en-US'` | navigator.language |
| settings | layout settings | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| collapsed | control menu's collapse and expansion | boolean | true |
| onCollapse | folding collapse event of menu | (collapsed: boolean) => void | - |
| renderHeader | custom header render method | (props: BasicLayoutProps) => ReactNode | - |
| renderFooter | custom footer render method | (props: BasicLayoutProps) => ReactNode | - |
| renderMenu | custom menu render method | (props: HeaderViewProps) => ReactNode | - |
| renderMenuItem | the render method of a custom menu item | [(itemProps: MenuDataItem) => ReactNode](#MenuDataItem) | - |
| breadcrumbNameMap | Used to assist in the generation of bread crumbs. Umi will automatically bring | { [path: string]: [MenuDataItem](#MenuDataItem) } | - |

### SettingDrawer

> SettingDrawer provides a graphical interface to set the layout configuration. Not recommended for use in a product environment.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| settings | layout settings | [`Settings`](#Settings) | [`Settings`](#Settings) | - |
| onSettingChange | The setting changes event | (settings: [Settings](#Settings)) => void | - |

## Data Structure

> For ease of viewing and use, Typescript is used here to write.

### Settings

```ts
// can be done via import { Settings } from '@ant-design/pro-layout/defaultSettings' to get this type

export interface Settings {
  /**
   * theme for nav menu
   */
  navTheme: 'light' | 'dark';;
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
// can be imported { MenuDataItem } from '@ant-design/pro-layout/typings' to get this type

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

## Browsers support

Modern browsers and IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Use Ant Design Pro in your daily work.
- Submit [issues](http://github.com/ant-design/ant-design-pro/issues) to report bugs or ask questions.
- Propose [pull requests](http://github.com/ant-design/ant-design-pro/pulls) to improve our code.
