---
nav:
  title: Layout
group: PageHeader
category: Components
type: 导航
title: PageHeader
cols: 1
subtitle: 页头
cover: https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg
---

页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题、页面内容简介、页面级操作等、页面级导航组成。

## 何时使用

当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。

## PageHeader

| 参数             | 说明                                             | 类型                                                  | 默认值         | 版本   |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------- | -------------- | ------ |
| avatar           | 标题栏旁的头像                                   | [AvatarProps](/components/avatar/)                    | -              |        |
| backIcon         | 自定义 back icon ，如果为 false 不渲染 back icon | ReactNode \| boolean                                  | \\<ArrowLeft /> |        |
| breadcrumb       | 面包屑的配置                                     | [BreadcrumbProps](/components/breadcrumb/)             | -              |        |
| extra            | 操作区，位于标题行的右侧                         | ReactNode                                             | -              |        |
| ghost            | pageHeader 的类型，将会改变背景颜色               | boolean                                               | true           |        |
| subTitle         | 自定义的二级标题文字                             | ReactNode                                             | -              |        |
| tags             | title 旁的 tag 列表                              | [TagProps](/components/tag/)[]                        | -              |        |
| title            | 自定义标题文字                                   | ReactNode                                             | -              |        |
| onBack           | 返回按钮的点击事件                               | () => void                                            | -              |        |
| footer           | PageHeader 的页脚，一般用于渲染 TabBar           | ReactNode                                             | -              |        |
| breadcrumbRender | 自定义面包屑区域的内容                           | (props, originBreadcrumb) => ReactNode                | -              |        |

## 代码演示

<code src="../../../demos/layout/PageHeader/basic.tsx" background="var(--main-bg-color)" title="标准样式" description="标准页头，适合使用在需要简单描述的场景"></code>

<code src="../../../demos/layout/PageHeader/ghost.tsx" background="var(--main-bg-color)" title="白底模式" description="默认 PageHeader 是透明底色的。在某些情况下，PageHeader 需要自己的背景颜色"></code>

<code src="../../../demos/layout/PageHeader/breadcrumb.tsx" background="var(--main-bg-color)" title="带面包屑页头" description="带面包屑页头，适合层级比较深的页面，让用户可以快速导航"></code>

