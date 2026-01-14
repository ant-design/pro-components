---
group: PageHeader
category: Components
type: Navigation
title: PageHeader Page Header
cols: 1
subtitle:
cover: https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg
---

A header with common actions and design elements built in.

## When To Use

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

## PageHeader

| Param            | Description                                                    | Type                                       | Default value  | Version |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------ | -------------- | ------- |
| avatar           | Avatar next to the title bar                                   | [AvatarProps](/components/avatar/)         | -              |         |
| backIcon         | Custom back icon, if false, the back icon will not be rendered | ReactNode \| boolean                       | `<ArrowLeft/>` |         |
| breadcrumb       | Breadcrumb configuration                                       | [BreadcrumbProps](/components/breadcrumb/) | -              |         |
| extra            | Operating area, at the end of the line of the title            | ReactNode                                  | -              |         |
| ghost            | PageHeader type, will change background color                  | boolean                                    | true           |         |
| subTitle         | Custom subtitle text                                           | ReactNode                                  | -              |         |
| tags             | Tag list next to title                                         | [TagProps](/components/tag/)[]             | -              |         |
| title            | Custom title text                                              | ReactNode                                  | -              |         |
| onBack           | Back button click event                                        | () => void                                 | -              |         |
| footer           | PageHeader footer, generally used to render TabBar             | ReactNode                                  | -              |         |
| breadcrumbRender | Custom breadcrumb area content                                 | (props, originBreadcrumb) => ReactNode     | -              |         |

## Code Examples

<code src="../../../demos/layout/PageHeader/basic.tsx" background="var(--main-bg-color)" title="Basic Page Header" description="Standard header, suitable for use in scenarios that require a brief description"></code>

<code src="../../../demos/layout/PageHeader/ghost.tsx" background="var(--main-bg-color)" title="white background mode" description="The default PageHeader is a transparent background. In some cases, PageHeader needs its own background color"></code>

<code src="../../../demos/layout/PageHeader/breadcrumb.tsx" background="var(--main-bg-color)" title="Use with breadcrumbs" description="With breadcrumbs, it is suitable for deeper pages, allowing users to navigate quickly"></code>
