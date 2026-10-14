---
group: PageContainer
title: PageContainer Page Container
atomId: PageContainer
---

# PageContainer - Page Container

PageContainer is a page container component that provides a unified page layout structure. It includes standardized page elements such as page title, breadcrumb navigation, and page operation area, allowing you to quickly build pages with consistent layouts.

- Automatically handles page title and breadcrumb navigation
- Supports page-level operation buttons and toolbars
- Provides standardized page layout structure
- Supports advanced features like watermarks and loading states

## When to Use

- When you need unified page title and breadcrumb navigation
- When you need page-level operation buttons
- When you need standardized page layout
- When you need page-level loading states
- When you need page watermark functionality

## Code Demo

`title`, `breadcrumb`, and children form the basic page layout.

<code src="../../demos/layout/page-container/basic.tsx" background="var(--main-bg-color)" title="Basic Usage" description="PageContainer provides standard page layout structure"></code>

`extra` adds a page level action.

<code src="../../demos/layout/page-container/header-extra.tsx" title="Header action"></code>

`tabList`, `tabActiveKey`, and `onTabChange` control page tabs.

<code src="../../demos/layout/page-container/tabs.tsx" title="Page tabs"></code>

`footer` adds a page footer action area.

<code src="../../demos/layout/page-container/footer.tsx" title="Footer action"></code>

`loading` accepts a boolean, SpinProps, or custom content. Each example shows one form.

<code src="../../demos/layout/page-container/loading.tsx" title="Boolean loading state"></code>
<code src="../../demos/layout/page-container/loading-spin.tsx" title="Custom loading tip"></code>
<code src="../../demos/layout/page-container/loading-custom.tsx" title="Custom loading content"></code>

`token.paddingInlinePageContainerContent` sets horizontal padding around the content.

<code src="../../demos/layout/page-container/token.tsx" title="Custom content padding"></code>

<code src="../../demos/layout/page-container/fix-header.tsx" background="var(--main-bg-color)" title="fixedHeader: fixed header" description="Scroll inside the demo; the title stays visible"></code>

<code src="../../demos/layout/page-container/hide-bread-menu.tsx" background="var(--main-bg-color)" title="breadcrumbRender=false: hide breadcrumb" description="Keep the page title without rendering breadcrumbs"></code>

## API

### PageContainer

| Parameter          | Description                                       | Type                                                  | Default |
| ------------------ | ------------------------------------------------- | ----------------------------------------------------- | ------- |
| title              | Page title, set false to hide                     | `ReactNode \| false`                                  | -       |
| subTitle           | Page subtitle                                     | `ReactNode`                                           | -       |
| extra              | Page operation area                               | `ReactNode`                                           | -       |
| extraContent       | Extra content beside the operation area           | `ReactNode`                                           | -       |
| content            | Page content                                      | `ReactNode`                                           | -       |
| footer             | Footer toolbar (items aligned right)              | `ReactNode[]`                                         | -       |
| loading            | Loading state                                     | `boolean \| SpinProps \| ReactNode`                   | false   |
| header             | Header configuration                              | `Partial<PageHeaderProps> & { children?: ReactNode }` | -       |
| pageHeaderRender   | Custom pageHeader, return false to hide           | `(props: PageContainerProps) => ReactNode \| false`   | -       |
| affixProps         | Affix configuration, same as antd                 | `Omit<AffixProps, 'children'>`                        | -       |
| breadcrumb         | Breadcrumb configuration                          | `BreadcrumbProps`                                     | -       |
| breadcrumbRender   | Custom breadcrumb rendering, return false to hide | `PageHeaderProps['breadcrumbRender'] \| false`        | -       |
| waterMarkProps     | Watermark configuration                           | `WatermarkProps`                                      | -       |
| token              | Custom token                                      | `pageContainerToken`                                  | -       |
| stylish            | Style configuration                               | `GenerateStyle<PageContainerToken>`                   | -       |
| footerStylish      | Footer style configuration                        | `GenerateStyle<PageContainerToken>`                   | -       |
| footerToolBarProps | Footer toolbar configuration                      | `FooterToolbarProps`                                  | -       |
| tabList            | Tab configuration (passed to PageHeader tabs)     | `(TabPaneProps & { key?: React.Key })[]`              | -       |
| tabActiveKey       | Currently active tab                              | `TabsProps['activeKey']`                              | -       |
| onTabChange        | Tab change callback                               | `TabsProps['onChange']`                               | -       |
| tabBarExtraContent | Extra area on the tab bar                         | `TabsProps['tabBarExtraContent']`                     | -       |
| tabProps           | Other tabs configs                                | `TabsProps`                                           | -       |
| fixedHeader        | Fix PageHeader to the top of the page             | `boolean`                                             | -       |
| children           | Children                                          | `ReactNode`                                           | -       |

### PageHeaderProps

| Parameter  | Description    | Type              | Default |
| ---------- | -------------- | ----------------- | ------- |
| title      | Title          | `ReactNode`       | -       |
| subTitle   | Subtitle       | `ReactNode`       | -       |
| extra      | Operation area | `ReactNode`       | -       |
| breadcrumb | Breadcrumb     | `BreadcrumbProps` | -       |
| tags       | Tags           | `TagProps[]`      | -       |
| avatar     | Avatar         | `AvatarProps`     | -       |
| backIcon   | Back icon      | `ReactNode`       | -       |
| onBack     | Back event     | `() => void`      | -       |

## Design Guidelines

PageContainer provides standardized page layout, ensuring consistency in page structure across the entire application. It follows Ant Design design guidelines, providing a consistent user experience.
