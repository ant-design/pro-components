---
group: Field
title: ProField 原子组件
---

# ProField

> 该组件为内部组件，请勿直接使用。

原子信息组件，统一 ProForm、ProTable、ProList、Filter 等组件里面的字段定义。

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

### 参数

| 参数           | 说明                                                           | 类型                                                                 | 默认值 |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ------ |
| text           | 需要格式化的值                                                 | `ReactNode \| ReactNode[] \| Record<string,any> \| Record<string,any>[]` | -  |
| valueType      | 格式化的类型                                                   | `ProFieldValueTypeInput`                                             | -      |
| mode           | 组件的模式                                                     | `read` \| `edit` \| `update`                                         | `read` |
| readonly       | 是否只读                                                       | `boolean`                                                            | -      |
| request        | 从服务器读取枚举                                               | `(params, props) => Promise<RequestOptionsType[]>`                   | -      |
| emptyText      | 空值时的展示                                                   | `ReactNode`                                                          | -      |
| formItemRender | 自定义 `mode=update \| edit` 下的 dom 表现，一般用于渲染编辑框 | `(text, props, dom) => JSX.Element`                                  | -      |
| render         | 自定义 `mode=read` 下的 dom 表现，只是单纯的表现形式           | `(text, props, dom) => JSX.Element`                                  | -      |
