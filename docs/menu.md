---
title: menu 的相关能力
order: 9
sidemenu: false
nav:
  title: 能力展示
  order: 1
---

# menu 的各种操作

ProLayout 提供了强大的 menu，但是这样必然会封装很多行为，导致需要一些特殊逻辑的用户感到不满。所以我们提供了很多的 API，期望可以满足绝大部分客户的方式。

## 从服务器加载 menu

从服务器加载 menu 主要使用的 API 是 `menuDataRender` 和 `menuRender`,`menuDataRender`可以控制当前的菜单数据，`menuRender`可以控制菜单的 dom 节点。

<code src="./demo/dynamicMenu.tsx" />

## 从服务器加载 menu 并且使用 icon

这里主要是一个演示，我们需要准备一个枚举来进行 icon 的渲染，可以显著的减少打包的大小

<code src="./demo/antd@4MenuIconFormServe.tsx" />

## 从服务器加载 menu 并且使用旧版本 icon

使用兼容包来实现，虽然比较简单，但是会造成打包太大

<code src="./demo/antd@3MenuIconFormServe.tsx" />

## 自定义 menu 的内容

通过 `menuItemRender`, `subMenuItemRender`,`title`,`logo`,`menuHeaderRender` 可以非常方便的自定义 menu 的样式。如果实在是不满意，可以使用 `menuRender` 完全的自定义。

<code src="./demo/customizeMenu.tsx" />

## 我是高手，我喜欢混着用

<code src="./demo/materialMenu.tsx" />

## 关闭时完全收起 menu

<code src="./demo/hideMenu.tsx" />

## 相关 API 展示

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | layout 的 左上角 的 title | ReactNode | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | ReactNode \| ()=>ReactNode | - |
| loading | layout 的加载态 | boolean | - |
| menuHeaderRender | 渲染 logo 和 title | ReactNode \| (logo,title)=>ReactNode | - |
| menuRender | 自定义菜单的 render 方法 | (props: HeaderViewProps) => ReactNode | - |
| layout | layout 的菜单模式,sidemenu：右侧导航，topmenu：顶部导航 | 'sidemenu' \| 'topmenu' | `'sidemenu'` |
| breakpoint | 触发响应式布局的[断点](https://ant.design/components/grid-cn/#Col) | `Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' }` | `lg` |
| menuItemRender | 自定义菜单项的 render 方法 | (itemProps: MenuDataItem) => ReactNode | - |
| subMenuItemRender | 自定义拥有子菜单菜单项的 render 方法 | (itemProps: MenuDataItem) => ReactNode | - |
| menu | 关于 menu 的配置，暂时只有 locale,locale 可以关闭 menu 的自带的全球化 | { locale: boolean, defaultOpenAll: boolean } | `{ locale: true }` |
| iconfontUrl | 使用 [IconFont](https://ant.design/components/icon-cn/#components-icon-demo-iconfont) 的图标配置 | string | - |
| siderWidth | 侧边菜单宽度 | number | 256 |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| onCollapse | 菜单的折叠收起事件 | (collapsed: boolean) => void | - |
| disableMobile | 禁止自动切换到移动页面 | boolean | false |
| links | 显示在菜单右下角的快捷操作 | ReactNode[] | - |
| menuProps | 传递到 antd menu 组件的 props, 参考 (https://ant.design/components/menu-cn/) | MenuProps | undefined |

在 4.5.13 以后 Layout 通过 `menuProps` 支持 [Menu](https://ant.design/components/menu-cn/#Menu) 的大部分 props。
