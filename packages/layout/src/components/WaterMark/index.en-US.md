---
title: WaterMark - Watermark Component
order: 0
atomId: WaterMark
legacy: /layout
---

# WaterMark - Watermark Component

Add a watermark to a specific area of the page.

## When to use

Use when you need to add a watermark to indicate copyright on a page.

## Code Demo

### Frontend Watermark

The watermark component is implemented as a frontend watermark by default, which means the watermark will be displayed on top of the content. The default `zIndex` is set to 9. If you don't want the watermark to cover the content on top, you can adjust this value to a value lower than the `zIndex` of the content on top.

<code src="./demos/frontend.tsx" ></code>

### Text Watermark

Specify the text watermark content using the `content` property.

<code src="./demos/text.tsx" ></code>

### Multiline Text Watermark

Specify the multiline text watermark content using the `content` property as an array of strings.

<code src="./demos/textRows.tsx" ></code>

### Image Watermark

Specify the image URL using the `image` property. To ensure the image is high-definition and not stretched, please provide the width and height of the watermark image, and upload a logo image with at least double the width and height.

<code src="./demos/image.tsx" ></code>

### Custom Configuration

Here are some common configuration options. If you need further customization, please contact us.

<code src="./demos/custom.tsx" background="var(--main-bg-color)"></code>

## API

### Basic Parameters

| Property  | Description                                                                                                            | Type                   | Default           | Version |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------- | ------- |
| width     | Width of the watermark                                                                                                 | number                 | 120               | 2.2.0   |
| height    | Height of the watermark                                                                                                | number                 | 64                | 2.2.0   |
| rotate    | Rotation angle of the watermark in degrees                                                                             | number                 | -22               | 2.2.0   |
| image     | Image source, it is recommended to export a 2x or 3x image, the watermark will be rendered with the image if specified | `string`               | -                 | 2.2.0   |
| zIndex    | The `z-index` of the appended watermark elements                                                                       | number                 | 9                 | 2.2.0   |
| content   | Text content of the watermark                                                                                          | `string` \| `string[]` | -                 | 2.2.0   |
| fontColor | Text color of the watermark                                                                                            | `string`               | `rgba(0,0,0,.15)` | 2.2.0   |
| fontSize  | Font size                                                                                                              | `string` \| `number`   | 16                | 2.2.0   |

### Advanced Parameters

| Property      | Description                                                                                                                                         | Type                | Default                | Version |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------- | ------- |
| markStyle     | Style of the watermark layer                                                                                                                        | React.CSSProperties | -                      | 2.3.0   |
| markClassName | Class name of the watermark layer                                                                                                                   | string              | -                      | 2.3.0   |
| gapX          | Horizontal spacing between watermarks                                                                                                               | number              | 212                    | 2.4.0   |
| gapY          | Vertical spacing between watermarks                                                                                                                 | number              | 222                    | 2.4.0   |
| offsetLeft    | Horizontal offset of the watermark when drawing on the canvas. Normally, the watermark is drawn in the middle position, i.e. `offsetTop = gapX / 2` | number              | `offsetTop = gapX / 2` | 2.4.0   |
| offsetTop     | Vertical offset of the watermark when drawing on the canvas. Normally, the watermark is drawn in the middle position, i.e. `offsetTop = gapY / 2`   | number              | `offsetTop = gapY / 2` | 2.4.0   |

### Watermark API Visualization

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
