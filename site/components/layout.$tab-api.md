---
group: Layout
title: Demos
order: 0
---

## 代码演示

### 内容宽度

切换 `contentWidth` 的 `Fluid` 与 `Fixed`，观察宽屏下内容区宽度的变化。

<code src="../../demos/layout/enum-switch.tsx" iframe="750" title="contentWidth：流式与定宽"></code>

### 基础用法

使用 `route` 声明菜单，`location.pathname` 标记当前页面；点击菜单后更新路径。

<code src="../../demos/layout/base.tsx" iframe="650" title="基础使用"></code>

### 受控侧栏折叠

`collapsed` 控制侧栏状态，`onCollapse` 同步内置折叠按钮的操作。

<code src="../../demos/layout/api.tsx" iframe="650" title="受控侧栏折叠"></code>

### 导航模式

下面三个示例分别仅设置 `layout="side"`、`layout="top"` 和 `layout="mix"`，对比导航位置。

<code src="../../demos/layout/sider-mode.tsx" iframe="650" title="侧栏导航（默认推荐）"></code>

<code src="../../demos/layout/top-mode.tsx" iframe="650" title="顶部导航"></code>

<code src="../../demos/layout/mix-mode.tsx" iframe="650" title="混合导航"></code>

`navTheme="realDark"` 将导航切换为暗色主题。

<code src="../../demos/layout/classicMode.tsx" iframe="650" title="暗色导航主题"></code>

### 菜单配置

`menu.collapsedShowTitle` 在侧边栏收起时显示菜单名称，`collapsedWidth` 为文字留出空间。

<code src="../../demos/layout/collapsed-show-title.tsx" iframe="650" title="折叠菜单显示标题"></code>

`siderMenuType="sub"` 将二级路由显示为可展开的子菜单，点击菜单项会更新当前路径。

<code src="../../demos/layout/menu-group.tsx" iframe="650" title="siderMenuType：子菜单样式"></code>

`menuExtraRender` 在侧栏放入搜索框，`postMenuData` 按关键词筛选菜单项。输入“项目”可看到两个匹配项。

<code src="../../demos/layout/search-menu.tsx" title="menuExtraRender + postMenuData：搜索菜单" iframe="650"></code>

`layout="mix"` 配合 `splitMenus` 和 `menu.type="group"`，在顶栏切换模块并在侧栏显示模块内的菜单。

<code src="../../demos/layout/site-menu.tsx" iframe="650" title="混合导航中的分组菜单"></code>

在一个带名称的菜单路由下声明无名称的子路由；切换新建页与详情页时共用“产品列表”菜单项。

<code src="../../demos/layout/multiple-menu-one-path.tsx" title="多个路由对应一个菜单项" iframe="650"></code>

### 默认打开所有菜单

设置 `menu.defaultOpenAll`，首次显示时展开所有菜单分组。

<code src="../../demos/layout/default-open-all-menu.tsx" title="menu.defaultOpenAll" iframe="650"></code>

### 总是打开所有菜单

同时设置 `menu.defaultOpenAll` 与 `menu.ignoreFlatMenu`，收起再展开侧栏后仍展开所有分组。可以用侧栏底部按钮验证。

<code src="../../demos/layout/always-default-open-all-menu.tsx" title="menu.ignoreFlatMenu" iframe="650"></code>

### 从服务器加载 menu

`menu.request` 异步返回菜单路由。示例用本地延迟模拟服务器响应。

<code src="../../demos/layout/dynamic-menu.tsx" title="menu.request 异步菜单" iframe="650"></code>

当路由菜单为空时，`suppressSiderWhenMenuEmpty` 可以隐藏侧栏。

<code src="../../demos/layout/hide-empty-menu.tsx" title="空菜单时隐藏侧栏" iframe="650"></code>

### 自定义 menu 的内容

`menuItemRender` 自定义普通菜单项的内容。

<code src="../../demos/layout/customize-menu.tsx" title="menuItemRender 菜单项" iframe="650"></code>

`subMenuItemRender` 自定义子菜单标题。

<code src="../../demos/layout/customize-sub-menu.tsx" title="subMenuItemRender 子菜单" iframe="650"></code>

`menuHeaderRender` 自定义侧栏顶部内容。

<code src="../../demos/layout/customize-menu-header.tsx" title="menuHeaderRender 菜单头部" iframe="650"></code>

### 自定义页脚与工具栏

`footerRender` 返回 `DefaultFooter`，在布局底部显示版权信息。

<code src="../../demos/layout/footer.tsx" iframe="650" title="footerRender：默认页脚"></code>

`footerRender` 自定义底部操作区。点击保存或重置可查看页面内的状态变化。

<code src="../../demos/layout/footer-global-tools.tsx" iframe="650" title="页脚工具栏"></code>

`headerRender` 在默认页头上方显示全局公告。

<code src="../../demos/layout/header-announcement.tsx" iframe="650" title="全局公告"></code>

### 布局嵌套与导航

外层侧栏与内层顶栏使用各自的 `route`，展示两级导航。

<code src="../../demos/layout/nested-layout.tsx" title="两层 ProLayout：侧栏与顶栏" iframe="650"></code>

`headerContentRender` 在混合布局的顶栏显示 `ProBreadcrumb`；页面内容区关闭重复面包屑。

<code src="../../demos/layout/top-breadcrumb.tsx" title="headerContentRender：顶部面包屑" iframe="650"></code>

`menuHeaderRender` 将侧栏头部改为返回项目列表的入口；点击菜单切换项目页面。

<code src="../../demos/layout/immersive-navigation.tsx" title="自定义侧栏头部导航" iframe="650"></code>

`headerRender={false}` 隐藏默认顶栏，页面内再渲染自己的工具栏。

<code src="../../demos/layout/immersive-navigation-top.tsx" title="隐藏顶栏并自定义页面工具栏" iframe="650"></code>

### 跨站点导航

> 使用默认卡片展示，请确保每一项都有 desc，且值为真；使用分组展示，请确保每一项都有 children，且长度大于 0；

`appList` 的 `children` 定义分组，`desc` 展示应用卡片说明；`itemClick` 在页面内显示所选应用。

<code src="../../demos/layout/app-list-group.tsx" title="分组应用卡片" iframe="650"></code>

### 主题与样式定制

`token.header` 修改页头背景及导航文字颜色。

<code src="../../demos/layout/theme.tsx" iframe="650" title="通过 token 修改页头样式"></code>

`ProConfigProvider dark` 为布局设置暗色主题。

<code src="../../demos/layout/dark.tsx" iframe="650" title="暗色主题"></code>

`bgLayoutImgList` 指定背景图的位置和宽度；示例图使用内嵌 SVG，便于离线查看。

<code src="../../demos/layout/background-context.tsx" iframe="650" title="内容区背景图"></code>

`token.sider` 设置侧边菜单背景色、文字色及选中项颜色。

<code src="../../demos/layout/design-menu-css.tsx" iframe="650" title="定制菜单样式"></code>

`siderWidth={256}` 将桌面侧栏设为 256px。

<code src="../../demos/layout/design-sider-menu.tsx" iframe="650" title="siderWidth：侧栏宽度 256px"></code>

`token.bgLayout` 与 `token.pageContainer.colorBgPageContainer` 使用相同背景色，减少页面层次。

<code src="../../demos/layout/page-simplify.tsx" iframe="650" title="统一页面背景"></code>

### 补充示例

此前未挂载文档的示例，涵盖 `ConfigProvider` 前缀、`breadcrumbRender`、`menuRender`、分组 `appList`、顶层嵌套布局等。

`ConfigProvider.prefixCls` 修改组件类名前缀；示例直接显示生成的布局类名。

<code src="../../demos/layout/config-provider.tsx" iframe="650" title="ConfigProvider 自定义类名前缀"></code>

`menu.type="group"` 将项目与报表路由分别显示为菜单组。

<code src="../../demos/layout/menu-group-complex.tsx" iframe="650" title="menu.type：分组菜单"></code>

`menuRender` 包裹默认菜单，在侧栏右侧添加蓝色边框。

<code src="../../demos/layout/hide-menu.tsx" iframe="650" title="menuRender：自定义菜单容器"></code>

外层顶栏与内层侧栏组合成模块内导航。

<code src="../../demos/layout/top-menu-nested.tsx" iframe="650" title="两层 ProLayout：顶栏与侧栏"></code>

`breadcrumbRender` 在项目面包屑前插入“首页”。

<code src="../../demos/layout/breadcrumbs-repeat.tsx" iframe="650" title="breadcrumbRender：前置首页"></code>

省略 `desc` 时，`appList` 使用精简列表样式。

<code src="../../demos/layout/app-list-group-simple.tsx" iframe="650" title="精简分组应用列表"></code>

### 其他

`collapsedButtonRender={false}` 隐藏默认按钮，`headerContentRender` 在顶栏放入自定义折叠按钮。

<code src="../../demos/layout/customize-collapsed.tsx" title="headerContentRender：顶栏折叠按钮" iframe="650"></code>

`postMenuData` 把折叠入口放进侧栏菜单。

<code src="../../demos/layout/customize-collapsed-menu.tsx" title="postMenuData：菜单内折叠按钮" iframe="650"></code>

`menuFooterRender` 在侧栏菜单底部添加帮助按钮；点击按钮可查看反馈内容。

<code src="../../demos/layout/custom-sider.tsx" iframe="650" title="menuFooterRender：侧栏底部区域"></code>

`iconfontUrl` 加载本地 IconFont 脚本，路由的 `icon` 使用脚本中的 symbol 名称。

<code src="../../demos/layout/IconFont.tsx" title="iconfontUrl：IconFont 菜单图标" iframe="650"></code>

路由 `icon` 也可以传入 React 节点。

<code src="../../demos/layout/menu-icons.tsx" title="icon：React 图标节点" iframe="650"></code>

传入 SVG URL 时，菜单直接使用该图片资源。

<code src="../../demos/layout/menu-icons-svg.tsx" title="icon：本地 SVG URL" iframe="650"></code>

`ProCard.ghost` 让页面内的父卡片透明，保留子卡片的外观。

<code src="../../demos/layout/ghost.tsx" title="ProCard.ghost：透明容器" iframe="650"></code>

### 帮助面板

`ProHelp` 的 `dataSource` 定义分类和文章，`ProHelpPanel` 通过 `defaultSelectedKey` 指定默认文章。

<code src="../../demos/layout/help.tsx" iframe="650" title="基础帮助面板"></code>

`valueTypeMap` 扩展文章内容类型；`footer` 在文章底部添加评分区。

<code src="../../demos/layout/help-custom-type.tsx" iframe="450" title="自定义帮助内容类型"></code>

<code src="../../demos/layout/help-footer.tsx" iframe="450" title="帮助面板页脚"></code>

`ProHelpModal`、`ProHelpDrawer` 与 `ProHelpPopover` 分别演示弹窗、抽屉和气泡帮助。

<code src="../../demos/layout/proHelpModal.tsx" iframe="650" title="弹窗帮助"></code>

<code src="../../demos/layout/proHelpDrawer.tsx" iframe="650" title="抽屉帮助"></code>

<code src="../../demos/layout/proHelpPopover.tsx" iframe="450" title="气泡帮助"></code>

<code src="../../demos/layout/async-load-help.tsx" iframe="650" title="远程加载帮助"></code>

`Draggable` 使用拖动条移动 `ProHelpPanel`，并限制在预览区域内。

<code src="../../demos/layout/draggableHelp.tsx" iframe="850" title="拖动帮助面板"></code>

### 错误边界

默认错误边界会捕获子组件的渲染错误，显示兜底界面。

<code src="../../demos/layout/error-boundaries.tsx" title="内置错误边界" iframe="650"></code>

`ErrorBoundary={CustomBoundary}` 指定自定义兜底组件。

<code src="../../demos/layout/error-boundaries-custom.tsx" title="自定义错误边界" iframe="650"></code>

`splitMenus` 在混合布局中将一级菜单放在顶部，子菜单放在侧栏。

<code src="../../demos/layout/split-menus.tsx" title="splitMenus：分栏菜单" iframe="650"></code>

`pure` 隐藏布局导航与装饰，仅保留页面内容。

<code src="../../demos/layout/split-menus-pure.tsx" title="pure：纯净模式" iframe="650"></code>

`fixSiderbar` 固定分栏菜单的侧栏。

<code src="../../demos/layout/split-menus-fixed.tsx" title="fixSiderbar：固定侧栏" iframe="650"></code>

设置 `splitMenus={false}` 可将菜单保留在同一侧栏。

<code src="../../demos/layout/split-menus-disabled.tsx" title="splitMenus：关闭分栏" iframe="650"></code>
