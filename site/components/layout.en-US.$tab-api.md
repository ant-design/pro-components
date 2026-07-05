---
title: Demos
order: 0
legacy: /layout

group: Layout
---

# ProLayout - Advanced Layout

ProLayout provides a standard, yet flexible, middle and backend layout, with one-click layout switching and automatic menu generation. It can be used with PageContainer to automatically generate breadcrumbs, page headers, and provide a low-cost solution to access the footer toolbar.

## Code Demo

### Enum property switch

Use a segmented control to toggle `layout`, `contentWidth`, `siderMenuType`, and other enum props side by side.

<code src="../../demos/layout/enum-switch.tsx" iframe="750" title="Enum property switch"></code>

### Basic Usage

<code src="../../demos/layout/base.tsx" iframe="650" title="Basic Usage"></code>

### Common layout toggles

<code src="../../demos/layout/api.tsx" iframe="720" title="Layout prop toggles"></code>

### Navigation Modes

<code src="../../demos/layout/sider-mode.tsx" iframe="650" title="Sidebar Navigation (Default)"></code>

<code src="../../demos/layout/top-mode.tsx" iframe="650" title="Top Navigation"></code>

<code src="../../demos/layout/mix-mode.tsx" iframe="650" title="Mixed Navigation"></code>

<code src="../../demos/layout/classicMode.tsx" iframe="650" title="Classic Navigation"></code>

### Menu Configuration

<code src="../../demos/layout/collapsed-show-title.tsx" iframe="650" title="Show Title When Collapsed"></code>

<code src="../../demos/layout/menu-group.tsx" iframe="650" title="Non-grouped Menu"></code>

<code src="../../demos/layout/search-menu.tsx" title="Search Menu" iframe="650"></code>

<code src="../../demos/layout/site-menu.tsx" iframe="650" title="Expand menu — site map"></code>

<code src="../../demos/layout/multiple-menu-one-path.tsx" title="Multiple Routes for One Menu" iframe="650"></code>

### Open All Menus by Default

Set `defaultOpenAll` on `menu` to expand every submenu on first render.

<code src="../../demos/layout/default-open-all-menu.tsx" iframe="650"></code>

### Always expand all submenus

After toggling collapse repeatedly, `defaultOpenAll` may stop matching user intent. Set `ignoreFlatMenu` on `menu` to ignore manually collapsed state and keep the “expand all” behavior. This runs before render, so it does not apply to async menus.

<code src="../../demos/layout/always-default-open-all-menu.tsx" iframe="650"></code>

### Load Menu from Server

ProLayout provides a powerful menu, but this necessarily encapsulates a lot of behavior, leading to dissatisfaction for users who need some special logic. So we provide a number of APIs that are expected to satisfy the vast majority of our clients in this way.

The main APIs used to load menu from the server are `menuDataRender` and `menuRender`, `menuDataRender` controls the current menu data and `menuRender` controls the menu's dom node.

<code src="../../demos/layout/dynamic-menu.tsx" iframe="650"></code>

### Customize Menu Content

With `menuItemRender`, `subMenuItemRender`, `title`, `logo`, `menuHeaderRender` you can customize the menu style very easily. If you are really not satisfied, you can use `menuRender` to fully customize it.

<code src="../../demos/layout/customize-menu.tsx" iframe="650"></code>

### Custom Footer

ProLayout does not provide footer by default, if you want to have the same style as Pro official website, you need to introduce a footer by yourself.

<code src="../../demos/layout/footer.tsx" iframe="650"></code>

<code src="../../demos/layout/footer-global-tools.tsx" iframe="650" title="Footer Toolbar & Announcements"></code>

### Layout Nesting & Navigation

<code src="../../demos/layout/nested-layout.tsx" iframe="650" title="Nested Layout"></code>

<code src="../../demos/layout/top-breadcrumb.tsx" iframe="650" title="Breadcrumb on Top"></code>

<code src="../../demos/layout/immersive-navigation.tsx" iframe="650" title="Multi-level Navigation"></code>

<code src="../../demos/layout/immersive-navigation-top.tsx" iframe="650" title="Immersive Navigation"></code>

### Cross-site navigation

> For the default card layout, each item should have `desc` set to a truthy value. For grouped layout, each item should include `children` with length greater than 0.

<code src="../../demos/layout/app-list-group.tsx" title="App list — grouped mode" iframe="650"></code>

### Theme & Style Customization

<code src="../../demos/layout/theme.tsx" iframe="650" title="Modify Style via Token"></code>

<code src="../../demos/layout/dark.tsx" iframe="650" title="Dark Theme"></code>

<code src="../../demos/layout/background-context.tsx" iframe="650" title="Page background and overall mood"></code>

<code src="../../demos/layout/design-menu-css.tsx" iframe="650" title="Customize Menu Style"></code>

<code src="../../demos/layout/design-sider-menu.tsx" iframe="650" title="Sider width 256px"></code>

<code src="../../demos/layout/page-simplify.tsx" iframe="650" title="Simplify hierarchy via page background and cards"></code>

### Extra demos

Examples that were previously not wired in the docs: `ConfigProvider` prefix, `breadcrumbRender`, `menuRender`, grouped `appList`, nested top layout, etc.

<code src="../../demos/layout/config-provider.tsx" iframe="650" title="ConfigProvider prefixCls + ProLayout"></code>

<code src="../../demos/layout/menu-group-complex.tsx" iframe="650" title="Grouped menu (complex-menu.ts + menu.type=group)"></code>

<code src="../../demos/layout/hide-menu.tsx" iframe="650" title="Custom menuRender (sider container width)"></code>

<code src="../../demos/layout/top-menu-nested.tsx" iframe="650" title="Top layout nested inner ProLayout"></code>

<code src="../../demos/layout/breadcrumbs-repeat.tsx" iframe="650" title="breadcrumbRender: prepend home"></code>

<code src="../../demos/layout/app-list-group-simple.tsx" iframe="650" title="App list — grouped (minimal data)"></code>

### Others

<code src="../../demos/layout/customize-collapsed.tsx" iframe="650" title="Customized Collapse"></code>

<code src="../../demos/layout/custom-sider.tsx" iframe="650" title="Custom area below sider menu"></code>

<code src="../../demos/layout/menu-icons.tsx" iframe="650" title="Menu icons (SVG / React)"></code>

<code src="../../demos/layout/ghost.tsx" iframe="650" title="Ghost Mode"></code>

### Error boundaries

<code src="../../demos/layout/error-boundaries.tsx" title="Built-in error handling to avoid white screens" iframe="650"></code>

<code src="../../demos/layout/_debug-demo.tsx" debug background="var(--main-bg-color)" iframe="550" title="Dark compact theme"></code>

<code src="../../demos/layout/split-menus.tsx" title="splitMenus" debug iframe="650"></code>
