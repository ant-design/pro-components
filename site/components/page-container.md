---
group: PageContainer
title: PageContainer 页容器
atomId: PageContainer
---

# PageContainer - 页容器

PageContainer 是一个页面容器组件，提供了统一的页面布局结构。它包含了页面标题、面包屑导航、页面操作区等标准化的页面元素，让您可以快速构建具有一致性的页面布局。

- 自动处理页面标题和面包屑导航
- 支持页面级别的操作按钮和工具栏
- 提供标准化的页面布局结构
- 支持水印、加载状态等高级功能

## 何时使用

- 需要统一的页面标题、面包屑导航时
- 需要页面级别的操作按钮时
- 需要标准化的页面布局时
- 需要页面级别的加载状态时
- 需要页面水印功能时

## 代码演示

<code src="../../../demos/layout/PageContainer/basic.tsx" background="var(--main-bg-color)" title="基础用法" description="PageContainer 提供了标准的页面布局结构"></code>

<code src="../../../demos/layout/PageContainer/fixHeader.tsx" background="var(--main-bg-color)" title="固定头部" description="可以固定页面头部，在内容滚动时保持可见"></code>

<code src="../../../demos/layout/PageContainer/hideBreadMenu.tsx" background="var(--main-bg-color)" title="隐藏面包屑" description="可以隐藏面包屑导航，简化页面结构"></code>

## API

### PageContainer

| 参数             | 说明             | 类型                                       | 默认值 |
| ---------------- | ---------------- | ------------------------------------------ | ------ |
| title            | 页面标题         | `ReactNode`                                | -      |
| subTitle         | 页面副标题       | `ReactNode`                                | -      |
| extra            | 页面操作区       | `ReactNode`                                | -      |
| content          | 页面内容         | `ReactNode`                                | -      |
| loading          | 加载状态         | `boolean \| SpinProps`                     | false  |
| header           | 头部配置         | `PageHeaderProps`                          | -      |
| breadcrumb       | 面包屑配置       | `BreadcrumbProps`                          | -      |
| breadcrumbRender | 自定义面包屑渲染 | `(props: PageContainerProps) => ReactNode` | -      |
| waterMarkProps   | 水印配置         | `WatermarkProps`                           | -      |
| children         | 子元素           | `ReactNode`                                | -      |

### PageHeaderProps

| 参数       | 说明     | 类型              | 默认值 |
| ---------- | -------- | ----------------- | ------ |
| title      | 标题     | `ReactNode`       | -      |
| subTitle   | 副标题   | `ReactNode`       | -      |
| extra      | 操作区   | `ReactNode`       | -      |
| breadcrumb | 面包屑   | `BreadcrumbProps` | -      |
| tags       | 标签     | `TagProps[]`      | -      |
| avatar     | 头像     | `AvatarProps`     | -      |
| backIcon   | 返回图标 | `ReactNode`       | -      |
| onBack     | 返回事件 | `() => void`      | -      |

## 设计规范

PageContainer 提供了标准化的页面布局，确保整个应用的页面结构一致性。它遵循 Ant Design 的设计规范，提供了一致的用户体验。
