---
title: Demos
order: 0
legacy: /layout

group: Layout
---

# ProLayout - Advanced Layout

ProLayout provides a standard, yet flexible, middle and backend layout, with one-click layout switching and automatic menu generation. It can be used with PageContainer to automatically generate breadcrumbs, page headers, and provide a low-cost solution to access the footer toolbar.

## Code Demo

### Content width

Switch `contentWidth` between `Fluid` and `Fixed` to compare the content area on a wide screen.

<code src="../../demos/layout/enum-switch.tsx" iframe="750" title="contentWidth: fluid or fixed"></code>

### Basic Usage

Define the menu with `route`, and use `location.pathname` to mark the active page. Clicking a menu item updates the path.

<code src="../../demos/layout/base.tsx" iframe="650" title="Basic Usage"></code>

### Controlled sidebar collapse

`collapsed` controls the sidebar state, and `onCollapse` syncs changes from the built-in collapse button.

<code src="../../demos/layout/api.tsx" iframe="650" title="Controlled sidebar collapse"></code>

### Navigation Modes

Each example sets one `layout` value: `side`, `top`, or `mix`.

<code src="../../demos/layout/sider-mode.tsx" iframe="650" title="Sidebar Navigation (Default)"></code>

<code src="../../demos/layout/top-mode.tsx" iframe="650" title="Top Navigation"></code>

<code src="../../demos/layout/mix-mode.tsx" iframe="650" title="Mixed Navigation"></code>

`navTheme="realDark"` applies the dark navigation theme.

<code src="../../demos/layout/classicMode.tsx" iframe="650" title="Dark navigation theme"></code>

### Menu Configuration

`menu.collapsedShowTitle` keeps menu names visible when the sidebar is collapsed; `collapsedWidth` leaves enough room for the text.

<code src="../../demos/layout/collapsed-show-title.tsx" iframe="650" title="Show menu titles when collapsed"></code>

`siderMenuType="sub"` displays nested routes as expandable submenus. Selecting an item updates the current path.

<code src="../../demos/layout/menu-group.tsx" iframe="650" title="siderMenuType: submenu style"></code>

`menuExtraRender` adds a search input to the sidebar, and `postMenuData` filters its items. Type the matching text to narrow the menu.

<code src="../../demos/layout/search-menu.tsx" title="menuExtraRender + postMenuData: search menu" iframe="650"></code>

`layout="mix"`, `splitMenus`, and `menu.type="group"` show module navigation above grouped sidebar items.

<code src="../../demos/layout/site-menu.tsx" iframe="650" title="Grouped menu in mixed navigation"></code>

Child routes without names share the named parent menu item. Switch between New and Detail to see the same menu selection.

<code src="../../demos/layout/multiple-menu-one-path.tsx" title="Multiple routes for one menu" iframe="650"></code>

### Open All Menus by Default

Set `menu.defaultOpenAll` to expand every submenu on first render.

<code src="../../demos/layout/default-open-all-menu.tsx" title="menu.defaultOpenAll" iframe="650"></code>

### Always expand all submenus

Set both `menu.defaultOpenAll` and `menu.ignoreFlatMenu` to keep every submenu open after collapsing and expanding the sidebar. Use the sidebar button to try it.

<code src="../../demos/layout/always-default-open-all-menu.tsx" title="menu.ignoreFlatMenu" iframe="650"></code>

### Load Menu from Server

`menu.request` returns menu routes asynchronously. This demo uses a local delay to simulate a server response.

<code src="../../demos/layout/dynamic-menu.tsx" title="menu.request: async menu" iframe="650"></code>

Set `suppressSiderWhenMenuEmpty` to hide the sidebar when the route menu is empty.

<code src="../../demos/layout/hide-empty-menu.tsx" title="Hide sidebar for an empty menu" iframe="650"></code>

### Customize Menu Content

`menuItemRender` customizes ordinary menu items.

<code src="../../demos/layout/customize-menu.tsx" title="menuItemRender" iframe="650"></code>

`subMenuItemRender` customizes submenu titles.

<code src="../../demos/layout/customize-sub-menu.tsx" title="subMenuItemRender" iframe="650"></code>

`menuHeaderRender` customizes the sidebar header.

<code src="../../demos/layout/customize-menu-header.tsx" title="menuHeaderRender" iframe="650"></code>

### Custom Footer

Return `DefaultFooter` from `footerRender` to show copyright information at the bottom of the layout.

<code src="../../demos/layout/footer.tsx" iframe="650" title="footerRender: default footer"></code>

`footerRender` adds a footer action area. Save and Reset update the visible page status.

<code src="../../demos/layout/footer-global-tools.tsx" iframe="650" title="Footer toolbar"></code>

`headerRender` shows a global announcement above the default header.

<code src="../../demos/layout/header-announcement.tsx" iframe="650" title="Global announcement"></code>

### Layout Nesting & Navigation

The outer sidebar and inner top bar use separate `route` lists for two levels of navigation.

<code src="../../demos/layout/nested-layout.tsx" iframe="650" title="Nested ProLayout: sidebar and top bar"></code>

`headerContentRender` places `ProBreadcrumb` in the mixed layout's header; the page content hides its duplicate breadcrumb.

<code src="../../demos/layout/top-breadcrumb.tsx" iframe="650" title="headerContentRender: top breadcrumb"></code>

`menuHeaderRender` turns the sidebar header into a way back to the project list; menu items switch project pages.

<code src="../../demos/layout/immersive-navigation.tsx" iframe="650" title="Custom sidebar header navigation"></code>

`headerRender={false}` hides the default top header so the page can render its own toolbar.

<code src="../../demos/layout/immersive-navigation-top.tsx" iframe="650" title="Hide header and use a page toolbar"></code>

### Cross-site navigation

> For the default card layout, each item should have `desc` set to a truthy value. For grouped layout, each item should include `children` with length greater than 0.

`appList.children` groups apps, `desc` shows card details, and `itemClick` displays the selected app on the page.

<code src="../../demos/layout/app-list-group.tsx" title="Grouped app cards" iframe="650"></code>

### Theme & Style Customization

`token.header` changes the header background and navigation text colors.

<code src="../../demos/layout/theme.tsx" iframe="650" title="Style the header with tokens"></code>

`ProConfigProvider dark` applies the dark theme to the layout.

<code src="../../demos/layout/dark.tsx" iframe="650" title="Dark theme"></code>

`bgLayoutImgList` positions a background image. This example embeds its SVG so it works offline.

<code src="../../demos/layout/background-context.tsx" iframe="650" title="Content background image"></code>

`token.sider` sets the sidebar background, text, and selected item colors.

<code src="../../demos/layout/design-menu-css.tsx" iframe="650" title="Customize menu style"></code>

`siderWidth={256}` sets the desktop sidebar to 256px.

<code src="../../demos/layout/design-sider-menu.tsx" iframe="650" title="siderWidth: 256px sidebar"></code>

`token.bgLayout` and `token.pageContainer.colorBgPageContainer` use the same background color to reduce visual layers.

<code src="../../demos/layout/page-simplify.tsx" iframe="650" title="Unify page backgrounds"></code>

### Extra demos

Examples that were previously not wired in the docs: `ConfigProvider` prefix, `breadcrumbRender`, `menuRender`, grouped `appList`, nested top layout, etc.

`ConfigProvider.prefixCls` changes component class prefixes. The generated layout class is shown in the example.

<code src="../../demos/layout/config-provider.tsx" iframe="650" title="Custom class prefix with ConfigProvider"></code>

`menu.type="group"` displays project and report routes as separate menu groups.

<code src="../../demos/layout/menu-group-complex.tsx" iframe="650" title="menu.type: grouped menu"></code>

`menuRender` wraps the default menu with a blue border on the right side of the sidebar.

<code src="../../demos/layout/hide-menu.tsx" iframe="650" title="menuRender: custom menu container"></code>

An outer top bar and inner sidebar provide navigation within a module.

<code src="../../demos/layout/top-menu-nested.tsx" iframe="650" title="Nested ProLayout: top bar and sidebar"></code>

`breadcrumbRender` prepends Home to the project breadcrumb trail.

<code src="../../demos/layout/breadcrumbs-repeat.tsx" iframe="650" title="breadcrumbRender: prepend Home"></code>

Without `desc`, `appList` uses its compact list style.

<code src="../../demos/layout/app-list-group-simple.tsx" iframe="650" title="Compact grouped app list"></code>

### Others

`collapsedButtonRender={false}` hides the built-in control, while `headerContentRender` places a custom collapse button in the header.

<code src="../../demos/layout/customize-collapsed.tsx" iframe="650" title="headerContentRender: header collapse button"></code>

`postMenuData` adds a collapse control to the sidebar menu.

<code src="../../demos/layout/customize-collapsed-menu.tsx" iframe="650" title="postMenuData: collapse menu item"></code>

`menuFooterRender` adds a help button below the sidebar menu. Click it to see the response.

<code src="../../demos/layout/custom-sider.tsx" iframe="650" title="menuFooterRender: sidebar footer"></code>

`iconfontUrl` loads a local IconFont script; route `icon` values name symbols from that script.

<code src="../../demos/layout/IconFont.tsx" iframe="650" title="iconfontUrl: IconFont menu icons"></code>

Route `icon` can also receive a React node.

<code src="../../demos/layout/menu-icons.tsx" iframe="650" title="icon: React icon node"></code>

Pass an SVG URL to use that image in the menu.

<code src="../../demos/layout/menu-icons-svg.tsx" iframe="650" title="icon: local SVG URL"></code>

`ProCard.ghost` makes a parent card transparent while its child keeps its own appearance.

<code src="../../demos/layout/ghost.tsx" iframe="650" title="ProCard.ghost: transparent container"></code>

### Help panels

`dataSource` defines categories and articles. `defaultSelectedKey` selects the initial article.

<code src="../../demos/layout/help.tsx" iframe="650" title="Basic help panel"></code>

Use `valueTypeMap` for custom content and `footer` for article feedback.

<code src="../../demos/layout/help-custom-type.tsx" iframe="450" title="Custom help content"></code>

<code src="../../demos/layout/help-footer.tsx" iframe="450" title="Help panel footer"></code>

Each overlay has its own API and example.

<code src="../../demos/layout/proHelpModal.tsx" iframe="650" title="Help modal"></code>

<code src="../../demos/layout/proHelpDrawer.tsx" iframe="650" title="Help drawer"></code>

<code src="../../demos/layout/proHelpPopover.tsx" iframe="450" title="Help popover"></code>

`Draggable` moves `ProHelpPanel` by its handle within the preview area.

<code src="../../demos/layout/draggableHelp.tsx" iframe="850" title="Draggable help panel"></code>

### Error boundaries

The default boundary catches child render errors and shows a fallback.

<code src="../../demos/layout/error-boundaries.tsx" title="Built-in error boundary" iframe="650"></code>

`ErrorBoundary={CustomBoundary}` supplies a custom fallback component.

<code src="../../demos/layout/error-boundaries-custom.tsx" title="Custom error boundary" iframe="650"></code>

`splitMenus` puts top-level items in the header and child items in the sidebar of a mixed layout.

<code src="../../demos/layout/split-menus.tsx" title="splitMenus: split navigation" iframe="650"></code>

`pure` hides layout navigation and decoration, leaving only the page content.

<code src="../../demos/layout/split-menus-pure.tsx" title="pure: minimal layout" iframe="650"></code>

`fixSiderbar` fixes the sidebar in place.

<code src="../../demos/layout/split-menus-fixed.tsx" title="fixSiderbar: fixed sidebar" iframe="650"></code>

Set `splitMenus={false}` to keep all menu levels in the same sidebar.

<code src="../../demos/layout/split-menus-disabled.tsx" title="splitMenus: disabled" iframe="650"></code>
