---
title: ProLayout - 快速开始
order: 1
group:
  path: /
nav:
  title: 快速开始
  path: /docs
---

# ProLayout - 快速开始

Layout 作为协助进行页面级整体布局工具，在每个项目中都必不可少，而且在中后台中是非常雷同的。所以我们抽象了 ProLayout 来减少重复代码，并且吃掉其中的脏逻辑。

## 布局

Layout 的基础能力就是布局，在 ProLayout 中我们抽象了三种布局方式，分别的 `side`,`top` 和 `mix`。 我们可以使用 layout 属性来切换他们,在[这里](/_demos/base-2)可以做一个简单的尝试。

### side 模式

![side](https://gw.alipayobjects.com/zos/antfincdn/gXkuc%26RmT7/64038246-E2BF-4840-8898-5AF531897A44.png)

### top 模式

![top](https://gw.alipayobjects.com/zos/antfincdn/d39gv%26sKfC/F12A0CEC-3DBC-4815-851C-1120B91827A5.png)

### mix 模式

![mix](https://gw.alipayobjects.com/zos/antfincdn/n7u4rg4HRd/BECE52FC-BD40-4F2A-AE40-8E7ECD02760F.png)

## 自定义布局

ProLayout 提供一些 api 删除用户不需要的区域。在 SettingDrawer 也提供一些配置来进行设置。

![setting-drawer-render](https://gw.alipayobjects.com/zos/antfincdn/mCXDkK2pJ0/60298863-F5A5-4af2-923A-13EF912DB0E1.png)

- `headerRender` 可以自定义顶栏
- `footerRender` 可以自定义页脚
- `menuRender` 可以自定义菜单区域
- `menuHeaderRender` 自定义的菜单头区域
- `menuExtraRender` 可以为菜单增加一个额外内容，在菜单头和菜单之间

> 在 layout 中所有的 xxxRender 都可以传入 false，来关闭渲染。

### 收起展开

一些时候我们会发现 `collapsed` 和 `onCollapse` 设置默认收起并不生效，这是因为 ProLayout 中内置了 `breakpoint` 来触发收起的机制，我们可以设置 `breakpoint={false}` 来关掉这个机制。

### 自定义菜单的宽度

siderWidth 可以自定义菜单的宽度，你可以设置的更短或者更长 FooterToolbar 等组件会自动支持，但是可能需要做一些样式上的处理，不然菜单展示可能会有一些小问题。

菜单收起宽度是无法自定义的，因为涉及到动画和巨量的 css 改动，自定义难道很大。

### 自动切割菜单

自动切割菜单是 `mix` 模式专属的能力，他可以把第一级的菜单放置到顶栏中。我们可以设置 `splitMenus=true` 来打开它，为了体验良好最好给每个一级菜单都设置一个重定向,这样可以防止切换到白屏页面。

![切割菜单](https://gw.alipayobjects.com/zos/antfincdn/H9hDMcrUh1/5438EB45-27F8-4B4F-8740-54F7BE55075C.png)

## 自定义菜单

ProLayout 会自动生成菜单，同时根据 pathname 进行自动选中。配合 PageContainer 可以实现自动推算面包屑和页面标题。如果和 umi 配置使用，只需要将 Page 的 props 交个 ProLayout 就根据 config 中的 routers 的配置 可以自动生成菜单的配置。

为了提供更多的功能，我们扩展了 routers 配置，增加了几个配置方便自定义，数据结构定义如下:

```ts | pure
// 可以通过 import { MenuDataItem } from '@ant-design/pro-layout'
// 来获取这个类型
export interface MenuDataItem {
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

- name 用于配置在菜单中的名称，同时会修改为浏览器标签页标题
- icon 代表菜单的体表，只 antd 的图表，iconfont 需要自己定义
- locale 可以设置菜单名称的国际化表示
- hideInMenu 会把这个路由配置在 menu 中隐藏这个路由，name 不填会有相同的效果
- hideChildrenInMenu 会把这个路由的子节点在 menu 中隐藏

> ProLayout 其实是读取的 props 中的 route 和 location。这两个属性是 umi 默认注入的。

### 从服务器获取

有些时候我们希望服务器来管理我们的路由，所以希望菜单时服务器进行分发的数据。我们提供了 `menuDataRender` 来进行修改数据，但是要注意 `menuDataRender` 会触发重新渲染，并且还会支持的国际化和权限的配置，如果你不需要国际化，建议使用 `postMenuData` 可以显著的提升性能。

服务器需要返回的数据与 `MenuDataItem` 相同，`menuDataRender` 需要返回一个数组，如果你想拥有更好的性能可以试试使用 props 中的 route 属性，这里有个 [demo](/menu)。

## PageContainer

PageContainer 是为了减少繁杂的面包屑配置和标题，很多页面都需要面包屑和标题的配置。当然也可以关掉自动生成的，而使用自己的配置。

![PageContainer](https://gw.alipayobjects.com/zos/antfincdn/74fprCn%2403/BBFF4972-8CD0-47C3-AFA8-FD67171A9A45.png)

PageContainer 封装了 antd 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageContainer 支持 Tabs 和 PageHeader 的所有属性。

为了方便进行表单等操作我们增加了一个 footer 属性，可以获得一个一直悬浮在底部的操作栏。如果觉得不方便也可以直接使用 FooterToolbar 来承载操作，两者表现基本相同，但是 FooterToolbar 拥有更多自定义的配置。

```tsx | pure
<PageContainer
  content="欢迎使用 ProLayout 组件"
  tabList={[
    {
      tab: '基本信息',
      key: 'base',
    },
    {
      tab: '详细信息',
      key: 'info',
    },
  ]}
  extra={[
    <Button key="3">操作</Button>,
    <Button key="2">操作</Button>,
    <Button key="1" type="primary">
      主操作
    </Button>,
  ]}
  footer={[<Button>重置</Button>, <Button type="primary">提交</Button>]}
>
  {children}
</PageContainer>
```

## Footer

页脚一般一般会展示一些公司和版权信息，默认的 ProLayout 不提供 Footer,但是提供了一个 Footer 组件，支持配置一些超链接和一些版权信息。

```tsx | pure
<Footer
  copyright="2019 蚂蚁金服体验技术部出品"
  links={[
    {
      key: 'Ant Design Pro',
      title: 'Ant Design Pro',
      href: 'https://pro.ant.design',
      blankTarget: true,
    },
    {
      key: 'github',
      title: <GithubOutlined />,
      href: 'https://github.com/ant-design/ant-design-pro',
      blankTarget: true,
    },
    {
      key: 'Ant Design',
      title: 'Ant Design',
      href: 'https://ant.design',
      blankTarget: true,
    },
  ]}
/>
```

## GridContent

GridContent 是个简单的语法糖，封装了 ProLayout 的 `contentWidth` 配置，`contentWidth` 如果设置为 `Fixed` 定宽模式，最宽只有 `1200px`。

使用方式：

```tsx | pure
<GridContent>{children}</GridContent>
```

## 高级用法

RouteContext 提供一个可以根据 layout 的数据来进行一些操作, PageContainer 和 FooterToolbar 都是依赖 RouteContext 的数据来实现功能。

```tsx | pure
import { RouteContext, RouteContextType } from '@ant-design/pro-layout';

const Page = () => (
  <RouteContext.Consumer>
    {(value: RouteContextType) => {
      const { isMobile, hasHeader, hasSiderMenu, collapsed } = value;
      // 用户的标题
      return value.title;
    }}
  </RouteContext.Consumer>
);
```

- [API](/api)
- [菜单 的 demo](/menu)
- [页脚](/footer)
- [更多的例子](/example)
