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

<code src="../../demos/layout/page-container/basic.tsx" background="var(--main-bg-color)" title="基础用法" description="PageContainer 提供了标准的页面布局结构"></code>

<code src="../../demos/layout/page-container/fix-header.tsx" background="var(--main-bg-color)" title="固定头部" description="可以固定页面头部，在内容滚动时保持可见"></code>

<code src="../../demos/layout/page-container/hide-bread-menu.tsx" background="var(--main-bg-color)" title="隐藏面包屑" description="可以隐藏面包屑导航，简化页面结构"></code>

## API

### PageContainer

| 参数             | 说明             | 类型                                       | 默认值 |
| ---------------- | ---------------- | ------------------------------------------ | ------ |
| title            | 页面标题，false 时不展示 | `ReactNode \| false`               | -      |
| subTitle         | 页面副标题       | `ReactNode`                                | -      |
| extra            | 页面操作区       | `ReactNode`                                | -      |
| extraContent     | 操作区旁边的额外内容 | `ReactNode`                            | -      |
| content          | 页面内容         | `ReactNode`                                | -      |
| footer           | 页脚工具栏（数组中的元素会靠右排列） | `ReactNode[]`                  | -      |
| loading          | 加载状态         | `boolean \| SpinProps \| ReactNode`        | false  |
| header           | 头部配置         | `Partial<PageHeaderProps> & { children?: ReactNode }` | - |
| pageHeaderRender | 自定义 pageHeader，返回 false 不展示 | `(props: PageContainerProps) => ReactNode \| false` | - |
| affixProps       | 固钉的配置，与 antd 完全相同 | `Omit<AffixProps, 'children'>`  | -      |
| breadcrumb       | 面包屑配置       | `BreadcrumbProps`                          | -      |
| breadcrumbRender | 自定义面包屑渲染，返回 false 不展示 | `PageHeaderProps['breadcrumbRender'] \| false` | - |
| waterMarkProps   | 水印配置         | `WatermarkProps`                           | -      |
| token            | 自定义的 token   | `pageContainerToken`                       | -      |
| stylish          | 样式配置         | `GenerateStyle<PageContainerToken>`        | -      |
| footerStylish    | 页脚样式配置     | `GenerateStyle<PageContainerToken>`        | -      |
| footerToolBarProps | 页脚工具栏配置 | `FooterToolbarProps`                       | -      |
| tabList          | 标签页配置（透传 PageHeader tabs） | `(TabPaneProps & { key?: React.Key })[]` | - |
| tabActiveKey     | 当前选中标签页   | `TabsProps['activeKey']`                   | -      |
| onTabChange      | 标签页切换回调   | `TabsProps['onChange']`                    | -      |
| tabBarExtraContent | tab 上额外的区域 | `TabsProps['tabBarExtraContent']`        | -      |
| tabProps         | tabs 的其他配置  | `TabsProps`                                | -      |
| fixedHeader      | 固定 PageHeader 到页面顶部 | `boolean`                        | -      |
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
