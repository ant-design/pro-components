---
title: PageContainer - 页容器
atomId: PageContainer
---

# PageContainer - 页容器

PageContainer 是为了减少繁杂的面包屑配置和标题，很多页面都需要面包屑和标题的配置。当然也可以关掉自动生成的，而使用自己的配置。

PageContainer 封装了 antd 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageContainer 支持 Tabs 和 PageHeader 的所有属性。

为了方便进行表单等操作我们增加了一个 footer 属性，可以获得一个一直悬浮在底部的操作栏。如果觉得不方便也可以直接使用 FooterToolbar 来承载操作，两者表现基本相同，但是 FooterToolbar 拥有更多自定义的配置。

```tsx | pure
<PageContainer
  content="欢迎使用 ProLayout 组件"
  tabList={[
    {
      tab: '基本信息',
      key: 'base',
    },
    {
      tab: '详细信息',
      key: 'info',
    },
  ]}
  extra={[
    <Button key="3">操作</Button>,
    <Button key="2">操作</Button>,
    <Button key="1" type="primary">
      主操作
    </Button>,
  ]}
  footer={[
    <Button key="rest">重置</Button>,
    <Button key="submit" type="primary">
      提交
    </Button>,
  ]}
>
  {children}
</PageContainer>
```

## 代码演示

### 基本使用

<code src="./demos/basic.tsx" title="基本使用" iframe="650px" desc="基本使用"></code>

### 固定表头

<code src="./demos/fixHeader.tsx" title="固定表头" iframe="650px" desc="通过 `fixedHeader` 固定表头，只有在溢出容器时才会开始计算。"></code>

### 隐藏面包屑

<code src="./demos/hideBreadMenu.tsx" title="隐藏面包屑" iframe="650px" desc="不配置 `header` 属性中的 `breadcrumb` 即可。"></code>

### 页面加载中

<code src="./demos/loading.tsx" title="页面加载中" iframe="650px" desc="通过 `loading` 属性配置页面加载。"></code>

## API

PageContainer 封装了 ant design 的 PageHeader 组件，增加了 tabList 和 content。 根据当前的路由填入 title 和 breadcrumb。它依赖 Layout 的 route 属性。当然你可以传入参数来复写默认值。 PageContainer 支持 [Tabs](https://ant.design/components/tabs-cn/) 和 [PageHeader](https://4x.ant.design/components/page-header-cn/) 的所有属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 内容区 | ReactNode | - |
| extraContent | 额外内容区，位于 content 的右侧 | ReactNode | - |
| tabList | tab 标题列表 | `{key: string, tab: ReactNode}[]` | - |
| tabActiveKey | 当前高亮的 tab 项 | string | - |
| onTabChange | 切换面板的回调 | `(key) => void` | - |
| tabBarExtraContent | tab bar 上额外的元素 | `React.ReactNode` | - |
| header | [PageHeader](https://ant.design/components/page-header-cn/) 的所有属性 | `PageHeaderProps` | - |
| ghost | 配置头部区域的背景颜色为透明 | boolean | false |
| fixedHeader | 固定 pageHeader 的内容到顶部，如果页面内容较少，最好不要使用，会有严重的遮挡问题 | `boolean` | - |
| affixProps | 固钉的配置，与 antd 完全相同 | `AffixProps` | - |
| footer | 悬浮在底部的操作栏，传入一个数组，会自动加空格 | `ReactNode[]` | - |
| waterMarkProps | 配置水印，Layout 会透传给 PageContainer，但是以 PageContainer 的配置优先 | [WaterMarkProps](/components/water-mark) | - |
| tabProps | Tabs 的相关属性，只有卡片样式的页签支持新增和关闭选项。使用 `closable={false}` 禁止关闭 | [TabsProps](https://ant.design/components/tabs-cn/#Tabs) | - |

> fixedHeader 使用了 antd 的 Affix 实现，默认监听 body，如果你的滚动条不在 body 上需要人肉[设置](https://ant.design/components/affix-cn/)一下。

### FooterToolbar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 额外内容区，位于 content 的右侧 | `ReactNode` | - |
| children | 内容区域 | `ReactNode`\|`ReactNode[]` | - |

FooterToolbar api 比较简单，主要功能是实现了在 layout 中自动控制浮动，使其不会挡住菜单。如果你没有使用 ProLayout 需要通过 style 来自定义宽度和浮动。

```tsx | pure
<FooterToolbar
  style={{
    left: 208,
    width: `calc(100% - 208px)`,
  }}
>
  <Button>提交</Button>
</FooterToolbar>
```

### ProBreadcrumb

配置与面包屑相同，只是增加了自动根据路由计算面包屑的功能。此功能必须要在 ProLayout 中使用。

```tsx | pure
import { ProBreadcrumb, ProLayout } from '@ant-design/pro-components';

return (props) => (
  <ProLayout
    {...props}
    // 将面包屑显示在顶部
    headerContentRender={() => {
      return <ProBreadcrumb />;
    }}
  />
);
```
