---
title: Schema Form
order: 1
atomId: BetaSchemaForm
nav:
  title: component
---

# JSON form

SchemaForm is a tool for generating forms based on JSON Schema. SchemaForm will be mapped into different [form items](/components/schema) according to valueType.

> **Tips**： If you encounter a stuck problem or have higher performance requirements, you can [reference example](#high-performance-code-examples).

## API

SchemaForm provides the same API as [ProForm](/components/form#proform), and adds some APIs, the following SchemaForm new APIs.

| Field name     | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layoutType`   | [`ProFormLayoutType`](/components/schema-form#proformlayouttype)                            | Form layout mode used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `steps`        | `StepFormProps[]`                                                                           | The distributed form configuration in `layoutType=steps` needs to configure columns to be used as an array                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `columns`      | [`ProFormColumnsType` \| `ProFormColumnsType[]`](/components/schema-form#schema-definition) | The definition of the form is generally a json object. If it is a distributed form, it needs to be generated using a json array Multiple forms                                                                                                                                                                                                                                                                                                                                                                                |
| `shouldUpdate` | `(newValues: Record<string, any>, oldValues: Record<string, any>) => boolean \| boolean`    | Fine-grained control whether to render. <br /> When it is `true` the form items are automatically re-rendered. <br /> When it is `false` will not update the form item, but can use [dependencies to trigger the update](#combining-shouldupdatefalse-with-dependencies-to-trigger-updates). <br /> When it is `function`, judge whether to re-render according to the return value Renders the form item, equivalent to directly assigning `true` or `false`. [Reference Example](#dynamically-control-whether-to-re-render) |

## ProFormLayoutType

| Field name              | Description                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Form`                  | [ProForm](/components/form) is the basic form type                                                                                                                                                        |
| `ModalForm`             | Pop-up form, after configuration, it supports all configurations of [ModalForm](/components/modal-form)                                                                                                   |
| `DrawerForm`            | Drawer form, after configuration, it supports all configurations of [DrawerForm](/components/modal-form)                                                                                                  |
| `StepsForm`\|`StepForm` | After configuration, it is a step-by-step form. There are two modes: one is to use `steps` and `columns` to generate, the other is to use `layoutType=StepsForm` to nest `layoutType=StepForm` To achieve |
| `LightFilter`           | Lightweight filtering, after configuration, it supports all configurations of [`LightFilter`](/components/query-filter)                                                                                   |
| `QueryFilter`           | Query form, after configuration, all configurations of [`QueryFilter`](/components/query-filter) are supported                                                                                            |
| `Embed`                 | Embedded mode, only generates form items, does not generate Form, can be mixed with other forms                                                                                                           |

## Schema definition

The most important thing about the SchemaForm form is the type definition of the Schema. We use the same form definition as the table, while extending some fields.

| Field name           | Type                                                                                                          | Description                                                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `key`                | `React.key`                                                                                                   | Determine the unique value of this column, generally used in the case of repeated dataIndex                                                                                                                                                |
| `dataIndex`          | `React.key` \| `React.key[]`                                                                                  | The key mapped to the entity, the array will be converted `[a,b] => Entity.a.b`                                                                                                                                                            |
| `valueType`          | `ProFieldValueType`                                                                                           | The rendering method of data, we have part of it, you can customize the valueType                                                                                                                                                          |
| `title`              | `ReactNode` \|`(props,type,dom)=> ReactNode`                                                                  | The content of the title, which is label in the form                                                                                                                                                                                       |
| `tooltip`            | `string`                                                                                                      | An icon will be displayed next to the title, and it will be displayed after the mouse is floating                                                                                                                                          |
| `valueEnum`          | `(Entity)=> ValueEnum` \| `ValueEnum`                                                                         | Support object and Map, Map supports other basic types as keys                                                                                                                                                                             |
| `fieldProps`         | `(form,config)=>fieldProps`\| `fieldProps`                                                                    | The props passed to the rendered component, and also passed when customizing                                                                                                                                                               |
| `formItemProps`      | `(form,config)=>formItemProps` \| `formItemProps`                                                             | Configuration passed to Form.Item                                                                                                                                                                                                          |
| `renderText`         | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any`                                | The modified data will be consumed by the rendering component defined by valueType                                                                                                                                                         |
| `render`             | `(dom,entity,index, action, schema) => React.ReactNode`                                                       | custom read-only mode dom, read-only mode managed by `render` method only, edit mode needs to use `renderFormItem`                                                                                                                         |
| `renderFormItem`     | `(schema,config,form) => React.ReactNode`                                                                     | Custom edit mode, return a ReactNode, will automatically wrap value and onChange. ~~If it returns false,null,undefined, the item will not be displayed~~ It is recommended to use dependent components to control whether to render or not |
| `request`            | `(params,props) => Promise<{label,value}[]>`                                                                  | Request network data remotely, generally used to select class components                                                                                                                                                                   |
| `params`             | `Record<string, any>`                                                                                         | The additional parameters passed to `request` will not be processed by the component, but changes will cause `request` to request data again                                                                                               |
| `dependencies`       | `string \| number \| (string \| number)[]`                                                                    | After the dependent values changes, trigger renderFormItem, fieldProps, formItemProps to re-execute, and inject values into params [example](#use-dependencies-to-trigger-fieldprops-formitemprops-renderformitem-updates)                 |
| `hideInDescriptions` | `boolean`                                                                                                     | Hide in descriptions                                                                                                                                                                                                                       |
| `hideInForm`         | `boolean`                                                                                                     | Hide in Form                                                                                                                                                                                                                               |
| `hideInTable`        | `boolean`                                                                                                     | Hide in Table                                                                                                                                                                                                                              |
| `hideInSearch`       | `boolean`                                                                                                     | Hide in the query form of Table                                                                                                                                                                                                            |
| `columns`            | `ProFormColumnsType[] \| (values) => ProFormColumnsType[]`                                                    | nested，when valueType is dependency ，please use `(values) => ProFormColumnsType[]`, other valueType use `ProFormColumnsType[]`                                                                                                             |
| `rowProps`           | Passed to `Row` when `grid` mode is enabled, Applies only to `ProFormGroup`, `ProFormList`, `ProFormFieldSet` | [RowProps](https://ant.design/components/grid/#Row)                                                                                                                                                                                        |
| `colProps`           | Passed to `Col` when `grid` mode is enabled                                                                   | [ColProps](https://ant.design/components/grid/#Col)                                                                                                                                                                                        |

## Code example

### JSON to generate the form

<code src="./demos/schema.tsx" oldtitle="schema form"></code>

### JSON to generate distributed forms

<code src="./demos/steps-form.tsx" oldtitle="schema form"></code>

### Embed in ProForm

<code src="./demos/embed.tsx" oldtitle="schema form"></code>

### Use ProFormDependency

<code src="./demos/dependency.tsx" oldtitle="schema dependency"></code>

## High performance code examples

### Combining shouldUpdate=false with dependencies to trigger updates

<code src="./demos/dependencies.tsx" oldtitle="schema dependencies"></code>

### Dynamically control whether to re-render

<code src="./demos/dynamic-rerender.tsx" oldtitle="dynamic rerender"></code>
