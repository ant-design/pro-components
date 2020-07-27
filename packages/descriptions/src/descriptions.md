---
title: ProDescriptions
nav:
  title: 描述列表
  path: /descriptions
---

# ProDescriptions

高级描述列表组件，提供一个更加方便快速的方案来构建描述列表。

## DEMO

<code src="../demos/base.tsx" />

## API

```typescript | pure
import ProDescriptions from '@ant-design/pro-descriptions';

return <ProDescriptions text="100" valueType="money" />;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 需要格式化的值 | any | - |
| valueType | 格式化的类型 | ValueType | - |
| mode | 组件的模式 | - | - |
| plain | 精简模式 | - | - |
| renderFromItem | 自定义 `mode=update | edit` 下的 dom 表现，一般用于渲染编辑框 | - | - |
| render | 自定义 `mode=read` 下的 dom 表现，只是单纯的表现形式 | - | - |
