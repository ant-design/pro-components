---
group: Skeleton
title: ProSkeleton 骨架屏
atomId: ProSkeleton
---

# ProSkeleton - 骨架屏

> 该组件为内部组件，请勿直接使用。

页面级别的骨架屏，不支持自定义

## 安装和初始化

```typescript | pure
import   Skeleton from '@ant-design/pro-skeleton';

return <Skeleton type="list" />;
```

## DEMO

<code src="../../demos/skeleton/list.tsx" title="列表页面" ></code>

<code src="../../demos/skeleton/list.static.tsx" title="静态列表" debug></code>

<code src="../../demos/skeleton/result.tsx" title="结果页"></code>

<code src="../../demos/skeleton/descriptions.tsx" title="详情页"></code>

## API

| 参数           | 说明                                                           | 类型                                    | 默认值 |
| -------------- | -------------------------------------------------------------- | --------------------------------------- | ------ |
| type           | 不同类型的骨架屏                                               | `'list' \| 'result' \| 'descriptions'`  | `list` |
| active         | 是否显示动态                                                   | `boolean`                               | `true` |
| pageHeader     | 是否显示 pageHeader 的骨架屏，设为 `false` 隐藏                | `false`                                 | -      |
| statistic      | 统计信息骨架屏的数量，设为 `false` 隐藏，不设置时按屏幕宽度自适应 | `number` \| `false`                  | -      |
| list           | 列表的骨架屏，可以控制数量，设为 `false` 隐藏                  | `number` \| `false`                     | `5`    |
| toolbar        | 列表的操作栏骨架屏，设为 `false` 隐藏                          | `false`                                 | -      |
| actionButton   | 列表的操作按钮骨架屏，设为 `false` 隐藏                        | `false`                                 | -      |
