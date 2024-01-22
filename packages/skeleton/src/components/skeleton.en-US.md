---
title: ProSkeleton
atomId: ProSkeleton
nav:
  title: Components
---

# ProSkeleton

> This component is an internal component, please do not use it directly.

Page-level skeleton screen, does not support customization

## Installation and initialization

```typescript | pure
import Skeleton from '@ant-design/pro-skeleton';

return <Skeleton type="list" />;
```

## DEMO

### List

<code src="../demos/list.tsx" oldtitle="List"></code>

<code src="../demos/list.static.tsx" oldtitle="List" debug></code>

### Results page

<code src="../demos/result.tsx" oldtitle="Results page"></code>

### Details page

<code src="../demos/descriptions.tsx" oldtitle="Details page"></code>

## API

| parameter | description | type | default value |
| --- | --- | --- | --- |
| type | Different types of skeleton screens | `'list' \| 'result' \| 'descriptions'` | list |
| active | Whether to show dynamic | boolean | true |
| pageHeader | Whether to display pageHeader's skeleton screen descriptions and list are valid | - | - |
| statistic | number of statistic skeleton screens | `number` \| `false` | - |
| list | skeleton screen of the list, you can control the number | `number` \| `false` | - |
| toolbar | Action bar skeleton screen of the list | boolean | - |
| renderFormItem | Customize the dom performance under `mode=update or edit`, generally used to render edit boxes | - | - |
| render | Customize the dom performance under `mode=read`, which is just a simple form of expression | - | - |
