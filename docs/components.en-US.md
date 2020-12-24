---
title: Component Overview
order: 0
group:
  path: /
nav:
  title: Component
  path: /components
---

# Architecture Design

ProComponents was developed to reduce the cost of implementing CRUD in the middle and backend, with the idea of reducing the necessary state maintenance and focusing more on the business.

- [ProLayout](/components/layout) solves the layout problem and provides out-of-the-box menu and breadcrumb functionality
- [ProTable](/components/table) solves table issues, abstracts web requests and table formatting
- [ProForm](/components/form) solves form issues, pre-defines common layouts and behaviors
- [ProCard](/components/card) provides card slicing and raster layout capabilities
- [ProDescriptions](/components/descriptions) provides the ability to use the same configuration as a table
- [ProSkeleton](/components/skeleton) Page level skeleton screen

## CRUD

ProTable, ProDescriptions, and ProForm are all wrapped based on ProFields; ProTable and ProDescriptions render different ProFields based on valueType, and Form is wrapped by a different Form is wrapped by a different FormField.

ProForm can easily implement read-only mode, ProTable can quickly implement query forms and editable forms, ProDescriptions can implement node editing, and here is an example You can switch between three components.

<code src="../packages/table/src/demos/crud.tsx">

## Form layout toggle

The main feature of ProForm is that it has a lot of pre-defined layouts, so if you need to switch you just need to change the Layout of the outer wrapper, here is a demo.

<code src="../packages/form/src/demos/layout-change.tsx">

## General Configuration

ProTable, ProDescriptions share a common set of configurations that can use the same columns and requests to generate data, the only difference being that Table requires an array, while ProDescriptions only requires an object. Here are the specific configurations.

```tsx | pure
/**
 * Commonly supported render for each component
 */export type
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
  /**
   * @name Determines the unique value of this column
   */
  key?: React.ReactText;
  /**
   * @name The key mapped to the entity
   * @description supports a number, [a,b] will be converted to obj.a.b
   */
  dataIndex?: string | number | (string | number)[];
  /**
   * Select how to render the corresponding pattern
   */
  valueType?: ((entity: T, type: ProSchemaComponentTypes) => U) | U;

  /**
   * @name title
   * @description supports ReactNode and methods
   */
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ReactNode, ) => React.)
    | ReactNode;

  /**
   *@name shows an icon, hover shows some hints
   */
  tooltip?: string;

  /**
   * @deprecated you can use tooltip, this change is for consistency with antd
   */
  tip?: string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;

  /**
   * @name Customize the edit schema
   * @description returns a node that will automatically wrap value and onChange
   */
  renderFormItem?: (
    item: ProSchema<T, U, Extra>,
    config: {
      index?: number;
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProSchemaComponentTypes;
      defaultRender: (newItem: ProSchema<T, U, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * @name Custom render
   * @description must return string
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;

  fieldProps?: any;
  /**
   * @name The type of the mapped value
   */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /**
   * @name request enum from server
   */
  request?: ProFieldRequestData<ProSchema>;

  /**
   * @name Parameter requested from the server, changes will trigger a reload
   */
  params?: {
    [key: string]: any;
  };
  /**
   * @name hidden in descriptions
   */
  hideInDescriptions?: boolean;
} & Extra;
```
