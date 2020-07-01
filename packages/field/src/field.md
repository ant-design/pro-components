---
title: ProField
nav:
  title: ProField
  path: /field
---

# ProField

原子信息组件，统一 ProForm、ProTable、ProList、Filter 等组件里面的字段定义。

## DEMO

<code src="../demo/base.tsx" />

## API

```typescript | pure
import render from '@ant-design/pro-field';

render('{name:"qixian"}', 'code');
```

### 参数

| 参数      | 说明           | 类型      | 默认值 |
| --------- | -------------- | --------- | ------ |
| text      | 需要格式化的值 | any       | -      |
| valueType | 格式化的类型   | ValueType | -      |
| props     | 多余的参数     | -         | -      |
