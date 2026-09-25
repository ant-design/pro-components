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

<code src="../../demos/layout/page-container/basic.tsx" background="var(--main-bg-color)" title="Basic Usage" description="PageContainer provides standard page layout structure"></code>

<code src="../../demos/layout/page-container/fix-header.tsx" background="var(--main-bg-color)" title="Fixed Header" description="You can fix the page header to keep it visible when content scrolls"></code>

<code src="../../demos/layout/page-container/hide-bread-menu.tsx" background="var(--main-bg-color)" title="Hide Breadcrumb" description="You can hide breadcrumb navigation to simplify page structure"></code>

## API

### PageContainer

| Parameter        | Description                 | Type                                       | Default |
| ---------------- | --------------------------- | ------------------------------------------ | ------- |
| title            | Page title, set false to hide | `ReactNode \| false`                     | -       |
| subTitle         | Page subtitle               | `ReactNode`                                | -       |
| extra            | Page operation area         | `ReactNode`                                | -       |
| extraContent     | Extra content beside the operation area | `ReactNode`                     | -       |
| content          | Page content                | `ReactNode`                                | -       |
| footer           | Footer toolbar (items aligned right) | `ReactNode[]`                      | -       |
| loading          | Loading state               | `boolean \| SpinProps \| ReactNode`        | false   |
| header           | Header configuration        | `Partial<PageHeaderProps> & { children?: ReactNode }` | - |
| pageHeaderRender | Custom pageHeader, return false to hide | `(props: PageContainerProps) => ReactNode \| false` | - |
| affixProps       | Affix configuration, same as antd | `Omit<AffixProps, 'children'>`       | -       |
| breadcrumb       | Breadcrumb configuration    | `BreadcrumbProps`                          | -       |
| breadcrumbRender | Custom breadcrumb rendering, return false to hide | `PageHeaderProps['breadcrumbRender'] \| false` | - |
| waterMarkProps   | Watermark configuration     | `WatermarkProps`                           | -       |
| token            | Custom token                | `pageContainerToken`                       | -       |
| stylish          | Style configuration         | `GenerateStyle<PageContainerToken>`        | -       |
| footerStylish    | Footer style configuration  | `GenerateStyle<PageContainerToken>`        | -       |
| footerToolBarProps | Footer toolbar configuration | `FooterToolbarProps`                     | -       |
| tabList          | Tab configuration (passed to PageHeader tabs) | `(TabPaneProps & { key?: React.Key })[]` | - |
| tabActiveKey     | Currently active tab        | `TabsProps['activeKey']`                   | -       |
| onTabChange      | Tab change callback         | `TabsProps['onChange']`                    | -       |
| tabBarExtraContent | Extra area on the tab bar  | `TabsProps['tabBarExtraContent']`          | -       |
| tabProps         | Other tabs configs          | `TabsProps`                                | -       |
| fixedHeader      | Fix PageHeader to the top of the page | `boolean`                        | -       |
| children         | Children                    | `ReactNode`                                | -       |

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
