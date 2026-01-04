---
group: Form
title: Schema Form JSON Form
order: 1
atomId: BetaSchemaForm
---

# Schema Form - JSON Form

SchemaForm is a tool that generates forms based on JSON Schema. SchemaForm maps to different [form items](/components/schema) based on `valueType`.

> **Tips**: If you encounter performance issues or have higher performance requirements, please refer to the [High Performance Code Example](#high-performance-mode).

## API

SchemaForm provides the same API as [ProForm](/components/form#proform) and adds some additional APIs. The following are the new APIs for SchemaForm.

| Property       | Type                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layoutType`   | [`ProFormLayoutType`](/components/schema-form#proformlayouttype)                                | The layout mode of the form                                                                                                                                                                                                                                                                                                                                                                                                |
| `steps`        | `StepFormProps[]`                                                                               | Step form configuration in `layoutType=steps`. Needs `columns` to be an array                                                                                                                                                                                                                                                                                                                                              |
| `columns`      | [`ProFormColumnsType[]` \| `ProFormColumnsType[][]`](/components/schema-form#schema-definition) | Form definition, generally a JSON object. For step forms, use a JSON array to generate multiple forms                                                                                                                                                                                                                                                                                                                      |
| `shouldUpdate` | `(newValues: Record<string, any>, oldValues: Record<string, any>) => boolean \| boolean`        | Fine-grained control over whether to render.<br /> If `true`, form items will automatically re-render.<br /> If `false`, form items will not update but can use [dependencies to trigger updates](#dependency-linkage),<br /> If `function`, it judges whether to re-render form items based on the return value, equivalent to directly assigning `true` or `false` [Reference Example](#dynamic-control-of-re-rendering) |
| `title`        | `ReactNode`                                                                                     | Form title                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `action`       | `React.Ref<ProCoreActionType \| undefined>`                                                     | Action for operating the form, supporting reload and other operations                                                                                                                                                                                                                                                                                                                                                      |
| `formRef`      | `React.Ref<ProFormInstance \| undefined>`                                                       | Get form instance, supports all methods of antd form                                                                                                                                                                                                                                                                                                                                                                       |
| `open`         | `boolean`                                                                                       | Control the visibility of ModalForm and DrawerForm                                                                                                                                                                                                                                                                                                                                                                         |

## ProFormLayoutType

| Property                | Description                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Form`                  | [ProForm](/components/form) is the basic form type                                                                                                                  |
| `ModalForm`             | Modal form, supports all configurations of [ModalForm](/components/modal-form)                                                                                      |
| `DrawerForm`            | Drawer form, supports all configurations of [DrawerForm](/components/modal-form)                                                                                    |
| `StepsForm`\|`StepForm` | Step form. There are two modes: one uses `steps` and `columns` to generate, the other is implemented by nesting `layoutType=StepForm` within `layoutType=StepsForm` |
| `LightFilter`           | Light filter, supports all configurations of [`LightFilter`](/components/query-filter)                                                                              |
| `QueryFilter`           | Query form, supports all configurations of [`QueryFilter`](/components/query-filter)                                                                                |
| `Embed`                 | Embedded mode, only generates form items, does not generate Form. Can be mixed                                                                                      |

## Schema Definition

The most important part of SchemaForm is the Schema type definition. We use the same form definition as the table, and extend some fields.

| Property              | Type                                                                           | Description                                                                                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `key`                 | `React.key`                                                                    | Determines the unique value of this column, generally used when dataIndex is duplicated                                                                                                                                                                                                          |
| `dataIndex`           | `React.key` \| `React.key[]`                                                   | The key mapped to the entity. Arrays will be converted `[a,b] => Entity.a.b`                                                                                                                                                                                                                     |
| `valueType`           | `ProFieldValueType`                                                            | How data is rendered. We come with a part, you can also customize valueType                                                                                                                                                                                                                      |
| `title`               | `ReactNode` \|`(props,type,dom)=> ReactNode`                                   | The content of the title, which is label in form                                                                                                                                                                                                                                                 |
| `tooltip`             | `string`                                                                       | Displays an icon next to the title, shown on hover                                                                                                                                                                                                                                               |
| `width`               | `number` \| `string`                                                           | Width.<br />`xs`: 104px - short numbers, short text<br />`sm`: 216px - short fields (name, phone)<br />`md`: 328px - standard width<br />`lg`: 440px - long fields (url, tags)<br />`xl`: 552px - long text (description, remarks)                                                               |
| `colSize`             | `number`                                                                       | The grid size occupied by each form item. Total width = span \* colSize. Default is 1                                                                                                                                                                                                            |
| `readonly`            | `boolean`                                                                      | Whether it is read-only mode                                                                                                                                                                                                                                                                     |
| `initialValue`        | `any`                                                                          | Default value of the form                                                                                                                                                                                                                                                                        |
| `valueEnum`           | `(Entity)=> ValueEnum` \| `ValueEnum`                                          | Supports object and Map. Map supports other basic types as keys                                                                                                                                                                                                                                  |
| `fieldProps`          | `(form,config)=>fieldProps`\| `fieldProps`                                     | Props passed to the rendered component. Also passed when customizing                                                                                                                                                                                                                             |
| `formItemProps`       | `(form,config)=>formItemProps` \| `formItemProps`                              | Configuration passed to Form.Item                                                                                                                                                                                                                                                                |
| `formItemProps.rules` | `Rule[]`                                                                       | Validation rules for form items. Note that if the current form item is `formList`, this rule only validates whether the list is empty, and only accepts the tuple `[{required: boolean, message: string}]` used to enable/disable non-empty validation and specify the empty list prompt message |
| `proFieldProps`       | `proFieldProps`                                                                | `props` set on `ProField`, internal property                                                                                                                                                                                                                                                     |
| `renderText`          | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any` | The modified data will be consumed by the rendering component defined by valueType                                                                                                                                                                                                               |
| `render`              | `(dom,entity,index, action, schema) => React.ReactNode`                        | Custom read-only mode dom. The `render` method only manages read-only mode. Edit mode needs to use `formItemRender`                                                                                                                                                                              |
| `formItemRender`      | `(schema,config,form) => React.ReactNode`                                      | Custom edit mode, returns a ReactNode, automatically wraps value and onChange. ~~Returning false, null, undefined will not hide the form item~~ Please use dependency component to control rendering of columns                                                                                  |
| `request`             | `(params,props) => Promise<{label,value}[]>`                                   | Request network data remotely, generally used for selection components                                                                                                                                                                                                                           |
| `params`              | `Record<string, any>`                                                          | Extra parameters passed to `request`. The component does not process them, but changes will cause `request` to re-request data                                                                                                                                                                   |
| `dependencies`        | `string \| number \| (string \| number)[]`                                     | When dependent values change, trigger formItemRender, fieldProps, formItemProps to re-execute, and inject values into params [Example](#dependency-linkage)                                                                                                                                      |
| `hideInDescriptions`  | `boolean`                                                                      | Hide in descriptions                                                                                                                                                                                                                                                                             |
| `hideInForm`          | `boolean`                                                                      | Hide in Form                                                                                                                                                                                                                                                                                     |
| `hideInTable`         | `boolean`                                                                      | Hide in Table                                                                                                                                                                                                                                                                                    |
| `hideInSearch`        | `boolean`                                                                      | Hide in query table of Table                                                                                                                                                                                                                                                                     |
| `columns`             | `ProFormColumnsType[] \| (values) => ProFormColumnsType[]`                     | Nested items. When valueType is dependency, please use `(values) => ProFormColumnsType[]`. Other cases use `ProFormColumnsType[]`                                                                                                                                                                |
| `colProps`            | [ColProps](https://ant.design/components/grid/#Col)                            | Passed to Col when grid mode is enabled                                                                                                                                                                                                                                                          |
| `rowProps`            | [RowProps](https://ant.design/components/grid/#Row)                            | Passed to Row when grid mode is enabled                                                                                                                                                                                                                                                          |
| `convertValue`        | `(value, namePath)=> any`                                                      | Convert value when getting, generally used to format data into a format received by the component, e.g. `[a,b] => a,b`                                                                                                                                                                           |
| `transform`           | `(value, namePath, allValues)=> any`                                           | Convert value when submitting, generally used to convert values into submitted data, e.g. `string => { newName: string }`                                                                                                                                                                        |
| `order`               | `number`                                                                       | Form sorting, default is index, larger order is more forward                                                                                                                                                                                                                                     |
| `debounceTime`        | `number`                                                                       | Request debounce time                                                                                                                                                                                                                                                                            |
| `defaultKeyWords`     | `string`                                                                       | Default keyword when searching                                                                                                                                                                                                                                                                   |
| `ignoreFormItem`      | `boolean`                                                                      | Do not wrap Form.Item, render component directly                                                                                                                                                                                                                                                 |

### Common ValueTypes

| ValueType    | Description        |
| ------------ | ------------------ |
| `text`       | Text input         |
| `textarea`   | Text area          |
| `password`   | Password input     |
| `digit`      | Digit input        |
| `money`      | Money input        |
| `select`     | Select             |
| `checkbox`   | Checkbox           |
| `radio`      | Radio              |
| `date`       | Date picker        |
| `dateRange`  | Date range picker  |
| `time`       | Time picker        |
| `switch`     | Switch             |
| `group`      | Form group         |
| `dependency` | Dependency linkage |
| `formList`   | Form list          |

### Difference between fieldProps and formItemProps

- **fieldProps**: Properties passed to the specific input component (such as Input, Select, DatePicker). For example `placeholder`, `allowClear`, `style`, etc.
- **formItemProps**: Properties passed to Ant Design's `Form.Item`. For example `label`, `name`, `rules`, `extra`, `help`, etc.

```javascript
{
  title: 'Title',
  dataIndex: 'title',
  formItemProps: {
    rules: [{ required: true, message: 'This field is required' }],
    extra: 'This is a supplementary explanation',
  },
  fieldProps: {
    placeholder: 'Please enter title',
    allowClear: true,
  },
}
```

## Code Examples - Layout Types

### Basic Form (Form)

The most basic usage of SchemaForm, generating standard form pages through JSON configuration. Supports defining form items via `columns` and switching layouts via `layoutType`.

<code src="../../../demos/form/SchemaForm/schema.tsx" title="Basic Schema Form"></code>

### Modal & Drawer Form

By setting `layoutType` to `ModalForm` or `DrawerForm`, you can quickly convert forms into modal or drawer modes without manually managing visible state.

<code src="../../../demos/form/SchemaForm/ModalAndDrawerForm.tsx" title="ModalForm and DrawerForm"></code>

### Step Form (StepsForm)

By setting `layoutType` to `StepsForm` or `StepForm`, you can generate step forms. In this case, `columns` should be a 2D array, where each array element represents the configuration of form items for a step.

<code src="../../../demos/form/SchemaForm/steps-form.tsx" title="JSON Generate Step Form"></code>

### Embedded Mode (Embed)

By setting `layoutType` to `Embed`, you can generate only form items without the Form container. This is useful when you need to embed SchemaForm into an existing ProForm or other containers.

<code src="../../../demos/form/SchemaForm/embed.tsx" title="Embed in ProForm"></code>

## Advanced Usage

### Dependency Linkage

Using `valueType: 'dependency'` can achieve complex form linkages. When dependent fields change, the current item update is automatically triggered.

<code src="../../../demos/form/SchemaForm/dependency.tsx" title="Use ProFormDependency"></code>

### High Performance Mode

For large forms, you can use `shouldUpdate` and `dependencies` for fine-grained rendering control to avoid re-rendering the entire form.

- **dependencies**: Specify dependent fields, update only when dependent fields change.
- **shouldUpdate**: Custom update logic, return false to prevent update.

<code src="../../../demos/form/SchemaForm/dependencies.tsx" title="Combine shouldUpdate=false and dependencies to trigger update"></code>

<code src="../../../demos/form/SchemaForm/dynamic-rerender.tsx" title="Dynamic control of re-rendering"></code>

### List Configuration (FormList)

Supports `valueType: 'formList'` to generate dynamically addable/removable list forms.

<code src="../../../demos/form/SchemaForm/form-list-required.tsx" title="FormList Required Validation" debug></code>
