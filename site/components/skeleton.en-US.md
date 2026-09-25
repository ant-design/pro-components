---
title: ProSkeleton
atomId: ProSkeleton
group: Skeleton
---

# ProSkeleton

> This component is an internal component, please do not use it directly.

Page-level skeleton screen, does not support customization

## Installation and initialization

```typescript | pure
import   Skeleton from '@ant-design/pro-skeleton';

return <Skeleton type="list" />;
```

## DEMO

### List

<code src="../../demos/skeleton/list.tsx" old></code>

<code src="../../demos/skeleton/list.static.tsx" old debug></code>

### Results page

<code src="../../demos/skeleton/result.tsx" old></code>

### Details page

<code src="../../demos/skeleton/descriptions.tsx" old></code>

## API

| parameter      | description                                                                                    | type                                   | default value |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- |
| type           | Different types of skeleton screens                                                            | `'list' \| 'result' \| 'descriptions'` | `list`        |
| active         | Whether to show dynamic                                                                        | `boolean`                              | `true`        |
| pageHeader     | Whether to display pageHeader's skeleton screen, set `false` to hide                           | `false`                                | -             |
| statistic      | Number of statistic skeleton screens, set `false` to hide, responsive when unset               | `number` \| `false`                    | -             |
| list           | Skeleton screen of the list, you can control the number, set `false` to hide                   | `number` \| `false`                    | `5`           |
| toolbar        | Action bar skeleton screen of the list, set `false` to hide                                    | `false`                                | -             |
| actionButton   | Action button skeleton screen of the list, set `false` to hide                                 | `false`                                | -             |
