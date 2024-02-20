---
title: WaterMark - 水印组件
order: 0
legacy: /layout
atomId: WaterMark
---

# WaterMark 水印组件

给页面的某个区域加上水印。

## 何时使用

页面需要添加水印标识版权时使用。

## 代码演示

### 前置水印

水印组件默认实现为前置水印，即设想水印会显示在内容的上方，zIndex 默认设置为 9，如果你不希望水印遮挡上层内容，可以调整该值到小于上层内容的 zIndex。

<code src="./demos/frontend.tsx" ></code>

### 文字水印

通过 `content` 指定文字水印内容。

<code src="./demos/text.tsx" ></code>

### 多行文字水印

通过 `content`设置 字符串数组 指定多行文字水印内容。

<code src="./demos/textRows.tsx" ></code>

### 图片水印

通过 `image` 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。

<code src="./demos/image.tsx" ></code>

### 自定义配置

这里给出一些通用配置项。如需进一步配置请联系我们。

<code src="./demos/custom.tsx" background="var(--main-bg-color)"></code>

## WaterMark

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 水印的宽度 | number | 120 | 2.2.0 |
| height | 水印的高度 | number | 64 | 2.2.0 |
| rotate | 水印绘制时，旋转的角度，单位 ° | number | -22 | 2.2.0 |
| image | 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 | `string` | - | 2.2.0 |
| zIndex | 追加的水印元素的 z-index | number | 9 | 2.2.0 |
| content | 水印文字内容 | `string` \| `string[]` | - | 2.2.0 |
| fontColor | 水印文字颜色 | `string` | `rgba(0,0,0,.15)` | 2.2.0 |
| fontSize | 文字大小 | `string` \| `number` | 16 | 2.2.0 |
| markStyle | 水印层的样式 | React.CSSProperties | - | 2.3.0 |
| markClassName | 水印层的类名 | string | - | 2.3.0 |
| gapX | 水印之间的水平间距 | number | 212 | 2.4.0 |
| gapY | 水印之间的垂直间距 | number | 222 | 2.4.0 |
| offsetLeft | 水印在 canvas 画布上绘制的水平偏移量，正常情况下，水印绘制在中间位置，即 `offsetLeft = gapX / 2` | number | `offsetLeft = gapX / 2` | 2.4.0 |
| offsetTop | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置，即 `offsetTop = gapY / 2` | number | `offsetTop = gapY / 2` | 2.4.0 |

### 水印 API 可视化

```jsx | inline
import react from 'react';

export default () => (
  <div>
    <img
      src="https://gw.alipayobjects.com/zos/alicdn/joeXYy8j3/jieping2021-01-11%252520xiawu4.47.15.png"
      width="100%"
    />
  </div>
);
```
