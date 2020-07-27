---
title: ProSkeleton
nav:
  title: 骨架屏
  path: /skeleton
---

# ProSkeleton

页面级别的骨架屏，不支持自定义

## DEMO

### List

<code src="../demos/list.tsx" />

### 结果页

<code src="../demos/result.tsx" />

### 详情页

<code src="../demos/descriptions.tsx" />

## API

```typescript | pure
import Skeleton from '@ant-design/pro-Skeleton';

return <Skeleton type="list" />;
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
