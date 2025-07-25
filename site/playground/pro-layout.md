---
title: ProLayout
atomId: ProLayout
nav:
  title: Playground
  path: /playground
---

# Layout Playground

## Layout 自定义

<code src="../../demos/layout/dynamic-settings.tsx"  background="var(--main-bg-color)" iframe="500" title="属性展示"></code>

## 水印自定义

> 水印组件已移除，请直接使用 antd 的 Watermark 组件：[Watermark 文档](https://ant.design/components/watermark-cn/)

```tsx
import { Watermark } from 'antd';

export default () => (
  <Watermark content="Ant Design">
    <div style={{ height: 500 }} />
  </Watermark>
);
```
