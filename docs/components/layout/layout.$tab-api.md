---
title: DEMO
order: 0
---

## 代码演示

<code src="../demos/base.tsx"  iframe="650" title="基础使用"></code>

<code src="../demos/help.tsx"   iframe="650" title="高级帮助"></code>

<code src="../demos/draggableHelp.tsx"  debug iframe="650" title="支持拖动的高级帮助"></code>

<code src="../demos/proHelpModal.tsx"   iframe="650" title="浮层高级帮助"></code>

<code src="../demos/async-load-help.tsx"   iframe="650" title="远程加载帮助"></code>

<code src="../demos/theme.tsx" iframe="650" title="通过 token 修改样式"></code>

<code src="../demos/debug-demo.tsx"  debug background="var(--main-bg-color)" iframe="550" title="黑色主紧凑主题"></code>

<code src="../demos/dark.tsx" iframe="650" title="黑色主题"></code>

<code src="../demos/siderMode.tsx" iframe="650" title="侧栏导航 中后台产品默认推荐"></code>

<code src="../demos/mixMode.tsx" iframe="650" title="混合导航"></code>

<code src="../demos/topMode.tsx" iframe="650" title="顶部导航"></code>

<code src="../demos/designSiderMenu.tsx" iframe="650" title="侧栏导航宽度256px"></code>

<code src="../demos/footer-global-tools.tsx" iframe="650" title="页脚工具栏和全局公告"></code>

<code src="../demos/collapsedShowTitle.tsx" iframe="650" title=" 收起时展示 title"></code>

<code src="../demos/menu-group.tsx" iframe="650" title="不分组菜单样式"></code>

<code src="../demos/classicMode.tsx" iframe="650" title="经典导航样式"></code>

<code src="../demos/background-context.tsx" iframe="650" title="通过调整页面背景内容调整整体氛围"></code>

<code src="../demos/designMenuCss.tsx" iframe="650" title="定制菜单样式"></code>

<code src="../demos/pageSimplify.tsx" iframe="650" title="通过设置页背景和卡片样式简化界面层次"></code>

<code src="../demos/customSider.tsx" iframe="650" title="自定侧栏菜单下方区域"></code>

<code src="../demos/siteMenu.tsx" iframe="650" title="菜单展开-站点地图"></code>

### 从服务器加载 menu

ProLayout 提供了强大的菜单功能，但是这样必然会封装很多行为，导致需要一些特殊逻辑的用户感到不满。所以我们提供了很多的 API，期望可以满足绝大部分客户的方式。

从服务器加载 menu 主要使用的 API 是 `menuDataRender` 和 `menuRender`,`menuDataRender`可以控制当前的菜单数据，`menuRender`可以控制菜单的 dom 节点。

<code src="../demos/dynamicMenu.tsx" iframe="650"></code>

### 从服务器加载 menu 并且使用 icon

这里主要是一个演示，我们需要准备一个枚举来进行 icon 的渲染，可以显著的减少打包的大小

<code src="../demos/antd@4MenuIconFormServe.tsx" iframe="610"></code>

### 自定义 menu 的内容

通过 `menuItemRender`, `subMenuItemRender`,`title`,`logo`,`menuHeaderRender` 可以非常方便的自定义 menu 的样式。如果实在是不满意，可以使用 `menuRender` 完全的自定义。

<code src="../demos/customizeMenu.tsx" iframe="650"></code>

### 自定义页脚

ProLayout 默认不提供页脚，要是和 Pro 官网相同的样式，需要自己引入一下页脚。

<code src="../demos/footer.tsx" iframe="650"></code>

这里用于展示 ProLayout 的各种应用，如果你觉得你的用法能帮助到别人，欢迎 PR。

<code src="../demos/searchMenu.tsx" title="搜索菜单" iframe="650"></code>

<code src="../demos/MultipleMenuOnePath.tsx" title="多个路由对应一个菜单项" iframe="650"></code>

### 默认打开所有菜单

menu 配置 `defaultOpenAll` 可以默认打开所有菜单

<code src="../demos/DefaultOpenAllMenu.tsx" iframe="650"></code>

### 总是打开所有菜单

折叠按钮反复切换后 `defaultOpenAll` 将失效，menu 配置 `ignoreFlatMenu` 可以忽略手动折叠过的菜单，实现总是默认打开所有菜单。因为计算时机在组件渲染前，所以异步菜单不生效。

<code src="../demos/AlwaysDefaultOpenAllMenu.tsx" iframe="650"></code>

<code src="../demos/IconFont.tsx" title="使用 IconFont" iframe="650"></code>

### 吸顶 header

PageContainer 配置 `fixedHeader` 可以将吸顶 header。

<code src="../demos/ghost.tsx" title="ghost 模式" iframe="650"></code>

<code src="../demos/Nested.tsx" title="嵌套布局" iframe="650"></code>

<code src="../demos/customize-collapsed.tsx" title="自定义的 collapse" iframe="650"></code>

<code src="../demos/top-breadcrumb.tsx" title="面包屑显示在顶部" iframe="650"></code>

<code src="../demos/immersive-navigation.tsx" title="多级站点导航" iframe="650"></code>

<code src="../demos/immersive-navigation-top.tsx" title="沉浸式导航" iframe="650"></code>

### 跨站点导航 - simple 分组

> 使用默认卡片展示，请确保每一项都有 desc，且值为真；使用分组展示，请确保每一项都有 children，且长度大于 0；

<code src="../demos/appList-group.tsx" title="跨站点导航列表 分组模式" iframe="650"></code>

<code src="../demos/error-boundaries.tsx" title="layout 自带了错误处理功能，防止白屏" iframe="650"></code>

<code src="../demos/splitMenus.tsx" title="splitMenus" debug iframe="650"></code>
