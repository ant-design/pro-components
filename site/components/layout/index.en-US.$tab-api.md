---
title: Demos
order: 0
legacy: /layout

group: Layout
---

# ProLayout - Advanced Layout

ProLayout provides a standard, yet flexible, middle and backend layout, with one-click layout switching and automatic menu generation. It can be used with PageContainer to automatically generate breadcrumbs, page headers, and provide a low-cost solution to access the footer toolbar.

## Code Demo

### Basic Usage

<code src="../../../demos/layout/base.tsx" iframe="650" title="Basic Usage"></code>

### Navigation Modes

<code src="../../../demos/layout/siderMode.tsx" iframe="650" title="Sidebar Navigation (Default)"></code>

<code src="../../../demos/layout/topMode.tsx" iframe="650" title="Top Navigation"></code>

<code src="../../../demos/layout/mixMode.tsx" iframe="650" title="Mixed Navigation"></code>

<code src="../../../demos/layout/classicMode.tsx" iframe="650" title="Classic Navigation"></code>

### Menu Configuration

<code src="../../../demos/layout/collapsedShowTitle.tsx" iframe="650" title="Show Title When Collapsed"></code>

<code src="../../../demos/layout/menu-group.tsx" iframe="650" title="Non-grouped Menu"></code>

<code src="../../../demos/layout/searchMenu.tsx" iframe="650" title="Search Menu"></code>

<code src="../../../demos/layout/MultipleMenuOnePath.tsx" iframe="650" title="Multiple Routes for One Menu"></code>

### Open All Menus by Default

<code src="../../../demos/layout/DefaultOpenAllMenu.tsx" iframe="650"></code>

### Load Menu from Server

ProLayout provides a powerful menu, but this necessarily encapsulates a lot of behavior, leading to dissatisfaction for users who need some special logic. So we provide a number of APIs that are expected to satisfy the vast majority of our clients in this way.

The main APIs used to load menu from the server are `menuDataRender` and `menuRender`, `menuDataRender` controls the current menu data and `menuRender` controls the menu's dom node.

<code src="../../../demos/layout/dynamicMenu.tsx" iframe="650"></code>

### Customize Menu Content

With `menuItemRender`, `subMenuItemRender`, `title`, `logo`, `menuHeaderRender` you can customize the menu style very easily. If you are really not satisfied, you can use `menuRender` to fully customize it.

<code src="../../../demos/layout/customizeMenu.tsx" iframe="650"></code>

### Custom Footer

ProLayout does not provide footer by default, if you want to have the same style as Pro official website, you need to introduce a footer by yourself.

<code src="../../../demos/layout/footer.tsx" iframe="650"></code>

<code src="../../../demos/layout/footer-global-tools.tsx" iframe="650" title="Footer Toolbar & Announcements"></code>

### Layout Nesting & Navigation

<code src="../../../demos/layout/Nested.tsx" iframe="650" title="Nested Layout"></code>

<code src="../../../demos/layout/top-breadcrumb.tsx" iframe="650" title="Breadcrumb on Top"></code>

<code src="../../../demos/layout/immersive-navigation.tsx" iframe="650" title="Multi-level Navigation"></code>

<code src="../../../demos/layout/immersive-navigation-top.tsx" iframe="650" title="Immersive Navigation"></code>

### Theme & Style Customization

<code src="../../../demos/layout/theme.tsx" iframe="650" title="Modify Style via Token"></code>

<code src="../../../demos/layout/dark.tsx" iframe="650" title="Dark Theme"></code>

<code src="../../../demos/layout/designMenuCss.tsx" iframe="650" title="Customize Menu Style"></code>

### Others

<code src="../../../demos/layout/customize-collapsed.tsx" iframe="650" title="Customized Collapse"></code>

<code src="../../../demos/layout/IconFont.tsx" iframe="650" title="Using IconFont"></code>

<code src="../../../demos/layout/ghost.tsx" iframe="650" title="Ghost Mode"></code>
