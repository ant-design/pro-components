---
title: ProField
nav:
  title: ProField
  path: /field
---

# ProField

提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。

## API

```typescript | pure
import render from '@ant-design/pro-field';

render('{name:"qixian"}', 'code');
```

### 参数

| 参数      | 说明                                      | 类型      | 默认值 |
| --------- | ----------------------------------------- | --------- | ------ |
| text      | 需要格式化的值                            | any       | -      |
| valueType | 格式化的类型                              | ValueType | -      |
| item      | 如果 valueType 是 function ，需要的默认值 | -         | -      |
| props     | 多余的参数                                | -         | -      |
