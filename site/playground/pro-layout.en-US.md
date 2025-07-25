---
title: ProLayout
nav:
  title: Playground
  path: /playground
---

# Layout Playground

## Layout 自定义

<code src="../../demos/layout/dynamic-settings.tsx"  background="var(--main-bg-color)" title="属性展示"></code>

## Watermark Customization

> Watermark component has been removed, please use antd Watermark component directly: [Watermark Documentation](https://ant.design/components/watermark/)

```tsx
import { Watermark } from 'antd';

export default () => (
  <Watermark content="Ant Design">
    <div style={{ height: 500 }} />
  </Watermark>
);
```
