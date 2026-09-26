---
group: Field
title: ProField Atomic Component
---

# ProField

> This component is an internal component, please do not use it directly.

It is an atomic information component that standardizes field definitions across components such as ProForm, ProTable, ProList, and Filter.

## DEMO

<code src="../../demos/field/base.tsx" ></code>

<code src="../../demos/field/_base-test.tsx" debug></code>

<code src="../../demos/field/search-value.tsx" debug></code>

<code src="../../demos/field/search-value-autoClearSearchValue.tsx" debug></code>

<code src="../../demos/field/tree-select-search-value.tsx" debug></code>

<code src="../../demos/field/select-request.tsx" debug></code>

<code src="../../demos/field/select-local-search.tsx" debug></code>

## API

```typescript | pure
import   Field from '@ant-design/pro-field';

return <Field text="100" valueType="money" mode={state} />;
```

### Properties

| Parameters     | Description                                                                               | Type                                                                       | Default Value |
| -------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| text           | The value to be formatted                                                                 | `ReactNode \| ReactNode[] \| Record<string,any> \| Record<string,any>[]`  | -             |
| valueType      | The type of formatting                                                                    | `ProFieldValueTypeInput`                                                   | -             |
| mode           | The mode of the component                                                                 | `read` \| `edit` \| `update`                                               | `read`        |
| readonly       | Whether it is read-only                                                                   | `boolean`                                                                  | -             |
| request        | Read enum from remote server                                                              | `(params, props) => Promise<RequestOptionsType[]>`                         | -             |
| emptyText      | Display for empty values                                                                  | `ReactNode`                                                                | -             |
| formItemRender | Custom DOM rendering when `mode=update \| edit`, typically used for rendering input boxes | `(text, props, dom) => JSX.Element`                                        | -             |
| render         | Custom DOM rendering when `mode=read`, purely for display purposes                        | `(text, props, dom) => JSX.Element`                                        | -             |
