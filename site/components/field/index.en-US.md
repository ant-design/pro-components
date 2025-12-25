---
group: Field
title: ProField - Atomic Component
---

# ProField

> This component is an internal component, please do not use it directly.

It is an atomic information component that standardizes field definitions across components such as ProForm, ProTable, ProList, and Filter.

## DEMO

<code src="../../../demos/field/base.tsx" ></code>

<code src="../../../demos/field/base_test.tsx" debug></code>

<code src="../../../demos/field/search-value.tsx" debug></code>

<code src="../../../demos/field/search-value-autoClearSearchValue.tsx" debug></code>

<code src="../../../demos/field/tree-select-search-value.tsx" debug></code>

<code src="../../../demos/field/select-request.tsx" debug></code>

## API

```typescript | pure
import   Field from '@ant-design/pro-field';

return <Field text="100" valueType="money" mode={state} />;
```

### Properties

| Parameters | Description | Type | Default Value |
| --- | --- | --- | --- |
| text | The value to be formatted | any | - |
| valueType | The type of formatting | ValueType | - |
| mode | The mode of the component | `read` \| `edit` \| `update` | `read` |
| plain | Simplified mode | boolean | false |
| formItemRender | Custom DOM rendering when `mode=update \| edit`, typically used for rendering input boxes | `(item: any, config: any) => ReactNode` | - |
| render | Custom DOM rendering when `mode=read`, purely for display purposes | `(item: any, config: any) => ReactNode` | - |
