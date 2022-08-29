---
title: ActionGuide - 操作指引
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ActionGuide - 操作指引

## 代码演示

### 基本使用

<code src="./demos/basic.tsx" height="600px" iframe="500px" title="基本使用" />

### 分页指示器主题

<code src="./demos/paginationTheme-index.tsx" height="600px" iframe="400px" title="索引主题" />
<code src="./demos/paginationTheme-dot.tsx" height="600px" iframe="400px" title="指示点主题" />

### 展示的分页指示器数量

<code src="./demos/pagination-disaplay-size.tsx" height="600px" iframe="400px" title="显示的分页项数量" />

### 隐藏/显示遮罩

<code src="./demos/mask.tsx" height="600px" iframe="400px" title="不显示遮罩" />

### 允许跳过

<code src="./demos/skip.tsx" height="600px" iframe="400px" title="允许跳过" />

### 自定义按钮区

<code src="./demos/renderButton.tsx" height="600px" iframe="400px" title="自定义按钮区" />

## API

### ActionGuideContainer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 【可选】操作指引标题 | `ReactNode \| ((idx: number) => ReactNode)` | - |
| `curShadow` | 【可选】当前元素的阴影 | `false \| CSSProperties["boxShadow"]` | `0 0 15px #333` |
| `pagination` | 【可选】分页指示器 | `false \| ((idx: number, action: ActionGuideAction) => ReactNode)` | 默认显示指示点主题分页 |
| `scrollToTarget` | 【可选】是否滚动页面至目标元素完全显示 | `boolean` | `true` |
| `defaultIndex` | 【可选】默认打开第几步的信息 | `number` | `1` |
| `paginationTheme` | 【可选】指定分页指示器主题 | `index \| dot `：其中`index`会显示页码指示器，而`dot`只显示操作点 | `dot` |
| `showPaginationSize` | 【可选】默认显示几个指示器 | `number` | `3` |
| `paginationClickabled` | 【可选】分页指示器是否可以点击 | `boolean` | `true` |
| `actionRef` | 【可选】用于获取一些操作方法 | `ActionGuideAction`: 其中包括以下方法： - `show: (idx: number \| "first" \| "last") => void` | - |
| `popoverProps` | 【可选】配置除`title`、`content`、`visible`、`destroyTooltipOnHide`外的其他的气泡弹窗属性，详情参考：[Popover](https://ant.design/components/popover-cn/) | `PopoverProps` | - |
| `canSkip` | 【可选】是否允许跳过 | `boolean` | `true` |
| `renderButton` | 【可选】渲染操作按钮的函数或`ReactNode[]` | `(params: RenderButtonParams) => ReactNode \| ReactNode[]` | 默认操作按钮 |
| `mask` | 【可选】是否显示遮罩层 | `boolean` | `true` |

### ActionGuideItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `step` | 【必填】当前属于第几步的指引，起始索引为：`1` | `number` | - |
| `content` | 【必填】操作指引的主要内容 | `ReactNode \| ((idx: number) => ReactNode)` | - |
| `popoverProps` | 【可选】配置除`title`、`content`、`visible`外的其他的气泡弹窗属性，详情参考：[Popover](https://ant.design/components/popover-cn/)，优先级比`ActionGuideContainer`的更高，可以覆盖其属性 | `PopoverProps` | - |
