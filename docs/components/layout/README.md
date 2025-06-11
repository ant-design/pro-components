# @ant-design/pro-layout

![](https://gw.alipayobjects.com/zos/antfincdn/HSeAGqaEwn/1586504755352-479bf47d-97a6-4080-afed-d38ffe905e57.png)

ProLayout provides a standard, yet flexible, middle and backend layout, with one-click layout switching and automatic menu generation. It can be used with PageContainer to automatically generate breadcrumbs, page headers, and provide a low-cost solution to access the footer toolbar.

## When to use

ProLayout can be used to reduce layout costs when content needs to be carried on a page.

### Use with umi plugins

ProLayout works best with umi. umi automatically injects the routes from config.ts into the configured layout for us, so we don't have to write the menus by hand.

ProLayout extends umi's router configuration, adding name, icon, locale, hideInMenu, hideChildrenInMenu and other configurations, so that it is easier to generate menus in one place. The data format is as follows.

```ts | pure
export interface MenuDataItem {
  /** @name submenu */
  children?: MenuDataItem[];
  /** @name Hide child nodes in the menu */
  hideChildrenInMenu?: boolean;
  /** @name hideSelf and children in menu */
  hideInMenu?: boolean;
  /** @name Icon of the menu */
  icon?: React.ReactNode;
  /** @name Internationalization key for custom menus */
  locale?: string | false;
  /** @name The name of the menu */
  name?: string;
  /** @name is used to calibrate the selected value, default is path */
  key?: string;
  /** @name disable menu option */
  disabled?: boolean;
  /** @name path */
  path?: string;
  /**
   * When this node is selected, the node of parentKeys is also selected
   *
   * @name custom parent node
   */
  parentKeys?: string[];
  /** @name hides itself and elevates child nodes to its level */
  flatMenu?: boolean;

  [key: string]: any;
}
```

ProLayout will automatically select the menu based on `location.pathname` and automatically generate the corresponding breadcrumbs. If you don't want to use it, you can configure `selectedKeys` and `openKeys` yourself for controlled configuration.

## Install

Using npm:

```bash
$ npm install --save  @ant-design/pro-layout
```

or using yarn:

```bash
$ yarn add @ant-design/pro-layout
```
