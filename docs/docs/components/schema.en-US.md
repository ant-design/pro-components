<!-----
title: Universal Configuration Overview order
order: 1
apiHeader: false
----->

# Universal Configuration

In the `ProComponents`, we have used the same definition as tables for components, while also extending some fields to meet additional requirements, allowing them to fulfill more needs.

| Field Name | Type | Description |
| --- | --- | --- |
| `key` | `React.key` | Determines the unique value of this column, commonly used for cases where dataIndex is duplicated |
| `dataIndex` | `React.key` \| `React.key[]` | Key mapped to an entity, and arrays will be transformed into `[a,b] => Entity.a.b` |
| `valueType` | `ProFieldValueType` | The rendering method of the data. We provide some built-in options, and you can also customize the valueType |
| `title` | `ReactNode` \|`(props,type,dom)=> ReactNode` | Content of the title, which serves as the label in a form |
| `tooltip` | `string` | Shows an icon next to the title, and displays the tooltip when the mouse hovers over it |
| `valueEnum` | `(Entity)=> ValueEnum` \| `ValueEnum` | Supports objects and maps, where maps can use other basic types as keys |
| `fieldProps` | `(form,config)=>fieldProps`\| `fieldProps` | Props passed to the rendering component. They are also passed when customizing |
| `formItemProps` | `(form,config)=>formItemProps` \| `formItemProps` | Configuration passed to Form.Item |
| `renderText` | `(text: any, record: Entity, index: number, action: ProCoreActionType) => any` | The modified data is consumed by the rendering component defined by valueType |
| `render` | `(dom,entity,index, action, schema) => React.ReactNode` | Custom DOM for read-only mode. The `render` method only manages read-only mode, while the editing mode should use `renderFormItem` |
| `renderFormItem` | `(schema,config,form) => React.ReactNode` | Custom editing mode that returns a ReactNode, automatically wrapping value and onChange |
| `request` | `(params,props) => Promise<{label,value}[]>` | Requests network data remotely, usually used for selection-type components |
| `params` | `Record<string, any>` | Additional parameters passed to `request`. The component does not process them, but changes will trigger a new data request in `request` |
| `hideInForm` | `boolean` | Hidden in the form |
| `hideInTable` | `boolean` | Hidden in the table |
| `hideInSearch` | `boolean` | Hidden in the search form of the table |
| `hideInDescriptions` | `boolean` | Hidden in the descriptions |
| `rowProps` | [RowProps](https://ant.design/components/grid/#Row) | Passed to the Row when the `grid` mode is enabled, only effective in `ProFormGroup`, `ProFormList`, `ProFormFieldSet` |
| `colProps` | [ColProps](https://ant.design/components/grid/#Col) | Passed to the Col when the `grid` mode is enabled |

## Definition to TypeScript

```tsx | pure
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
  /** @name Specify the unique value for this column */
  key?: string | number;
  /**
   * Supports an array, [a,b] will be transformed to obj.a.b
   *
   * @name Key mapped to the entity
   */
  dataIndex?: string | number | (string | number)[];
  /** Choose how to render the corresponding mode */
  valueType?: ((entity: T, type: ProSchemaComponentTypes) => U) | U;

  /**
   * Support ReactNode
   *
   * @name Title
   */
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ) => React.ReactNode)
    | React.ReactNode;

  /** @name Display an icon, hover shows some tooltip information */
  tooltip?: string | LabelTooltipType;

  /** @deprecated You can use tooltip, this change is to align with antd */
  tip?: string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;

  /**
   * Return a node, automatically wraps value and onChange
   *
   * @name Custom edit mode
   */
  renderFormItem?: (
    item: ProSchema<T, U, Extra>,
    config: {
      index?: number;
      value?: any;
      onSelect?: (value: any) => void;
      type: ProSchemaComponentTypes;
      defaultRender: (newItem: ProSchema<T, U, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * Must return a string
   *
   * @name Custom define render
   */
  renderText?: (
    text: any,
    record: T,
    index: number,
    action: ProCoreActionType,
  ) => any;

  fieldProps?: any;
  /** @name Type mapping for values */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /** @name Request enumeration from the server */
  request?: ProFieldRequestData<ProSchema>;

  /** @name Parameters for server requests, changes will trigger reload */
  params?: {
    [key: string]: any;
  };
  /** @name Hidden in descriptions */
  hideInDescriptions?: boolean;
} & Extra;
```

## valueType Lists

<!--<code src="./valueType.tsx" title="schema form"></code>-->

valueType is the soul of ProComponents. ProComponents maps it to different form items based on valueType. Here are the commonly supported form items:

| valueType       | Description                   |
| --------------- | ----------------------------- |
| `password`      | Password input box            |
| `money`         | Money input box               |
| `textarea`      | Text area                     |
| `date`          | Date                          |
| `dateTime`      | Date and time                 |
| `dateWeek`      | Week                          |
| `dateMonth`     | Month                         |
| `dateQuarter`   | Quarter input                 |
| `dateYear`      | Year input                    |
| `dateRange`     | Date range                    |
| `dateTimeRange` | Date and time range           |
| `time`          | Time                          |
| `timeRange`     | Time range                    |
| `text`          | Text box                      |
| `select`        | Dropdown box                  |
| `treeSelect`    | Tree dropdown box             |
| `checkbox`      | Checkbox                      |
| `rate`          | Star rating component         |
| `radio`         | Radio button                  |
| `radioButton`   | Button radio button           |
| `progress`      | Progress bar                  |
| `percent`       | Percentage component          |
| `digit`         | Number input box              |
| `second`        | Seconds formatting            |
| `avatar`        | Avatar                        |
| `code`          | Code box                      |
| `switch`        | Switch                        |
| `fromNow`       | Relative to current time      |
| `image`         | Image                         |
| `jsonCode`      | Code box with JSON formatting |
| `color`         | Color picker                  |
| `cascader`      | Cascading select box          |
| `segmented`     | Segmented control             |
| `group`         | Group                         |
| `formList`      | Form list                     |
| `formSet`       | Form set                      |
| `divider`       | Divider                       |
| `dependency`    | Dependency                    |

Here, you can explore the display effects of each valueType through the available demos.

### Passing function as a value

A single value may not represent multiple types effectively, and `progress` is a good example of this. Therefore, we support passing a function. You can use it like this:

```tsx | pure
const columns = {
  title: '进度',
  key: 'progress',
  dataIndex: 'progress',
  valueType: (item: T) => ({
    type: 'progress',
    status: item.status !== 'error' ? 'active' : 'exception',
  }),
};
```

### Supported return values

#### progress

```js
return {
  type: 'progress',
  status: 'success' | 'exception' | 'normal' | 'active',
};
```

#### money

```js
return { type: 'money', locale: 'en-Us' };
```

#### percent

```js
return { type: 'percent', showSymbol: true | false, precision: 2 };
```

If the provided valueType does not meet our requirements, we can use a custom valueType to define a custom business component.

### Custom valueType

<!--<code src="./customization-value-type.tsx" title="schema form"></code>-->

### valueEnum

A valueEnum needs to be passed as an argument, and ProTable will automatically retrieve the corresponding enum based on the value and generate a dropdown selection box in the form. It looks like this:

```ts | pure
const valueEnum = {
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

// It can also be set as a function.
const valueEnum = (row) =>
  row.isMe
    ? {
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      }
    : {
        open: {
          text: '等待解决',
          status: 'Error',
        },
        closed: {
          text: '已回应',
          status: 'Success',
        },
      };
```

> It's worth noting that there is no row in the form, so the value of row is null. You can use this to determine what options to display in the form.

Enumerations for the current column values.

```typescript | pure
interface IValueEnum {
  [key: string]:
    | ReactNode
    | {
        text: ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      };
}
```

Using a Map to make valueEnum more flexible can be useful in certain scenarios where number or boolean types are needed. For example:

<!--<code src="./valueEnum-map.tsx" title="valueEnum using Map"></code>-->

## Remote Data

Supported components: `Select`, `TreeSelect`, `Cascader`, `Checkbox`, `Radio`, `RadioButton`.

The following parameters are supported to handle remote data: `request`,`params`,`fieldProps.options`,`valueEnum`. Each of these attributes has a different usage.

### `valueEnum`

valueEnum is the most basic usage. It supports passing an [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) or a [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) as an argument. It offers more extensive definitions compared to options, such as the commonly seen various [badges](https://ant.design/components/badge-cn/#Badge) in tables.

```tsx | pure
const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};
```

```tsx | pure
import { ProFormSelect } from '@ant-design/pro-components';

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

export default () => (
  <ProFormSelect
    name="select2"
    label="Select"
    params={{}}
    valueType="select"
    valueEnum={valueEnum}
    placeholder="Please select a country"
  />
);
```

### `fieldProps.options`

options is a standard defined by antd, but it is only supported by some components. ProComponents extends these components, enabling `select`, `checkbox`, `radio` and `radioButton` to all support `options`, and their usage is the same.

```tsx | pure
const options = [
  { label: '全部', value: 'all' },
  { label: '未解决', value: 'open' },
  { label: '已解决', value: 'closed' },
  { label: '解决中', value: 'processing' },
  {
    label: '特殊选项',
    value: 'optGroup',
    optionType: 'optGroup',
    options: [
      { label: '不解决', value: 'no' },
      { label: '已废弃', value: 'clear' },
    ],
  },
];

// Alternatively, the label may not be required
const options = ['chapter', 'chapter2'];

// Definition in Column
const columns = [
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: 'item 1',
          value: 'a',
        },
        {
          label: 'item 2',
          value: 'b',
        },
        {
          label: 'item 3',
          value: 'c',
        },
      ],
    },
  },
];
```

```tsx | pure
import { ProFormSelect } from '@ant-design/pro-components';

const options = [
  {
    label: 'item 1',
    value: 'a',
  },
  {
    label: 'item 2',
    value: 'b',
  },
  {
    label: 'item 3',
    value: 'c',
  },
];

export default () => (
  <ProFormSelect
    name="select2"
    label="Select"
    valueType="select"
    fieldProps={{ options }}
    placeholder="Please select a country"
  />
);
```

### `request` and `params`

> You can use debounceTime to adjust the debounce time for requests, with a default value of 10ms.

Most of the time, we fetch data from the network. However, creating a custom hook to handle data requests can be cumbersome, as it requires defining various states. To simplify this process, we provide `request` and `params` to fetch data.

- `request`:`request` is a promise that should return data in the same format as the options.
- `params`: Typically, `request` is lazy-loaded, and modifying `params` will trigger a new `request`.

```tsx | pure
const request = async () => [
  { label: '全部', value: 'all' },
  { label: '未解决', value: 'open' },
  { label: '已解决', value: 'closed' },
  { label: '解决中', value: 'processing' },
];

<ProFormSelect
  name="select2"
  label="Select"
  params={{}}
  valueType="select"
  debounceTime={1000}
  request={request}
  placeholder="Please select a country"
/>;

// Definition in Column
const columns = [
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    request,
    params: {},
  },
];
```

```tsx | pure
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const request = async (params) => {
  console.log(params);
  return [
    { label: params.text, value: 'all' },
    { label: '未解决', value: 'open' },
    { label: '已解决', value: 'closed' },
    { label: '解决中', value: 'processing' },
  ];
};

export default () => (
  <ProForm>
    <ProFormText label="相互依赖的" initialValue="所有的" name="text" />
    <ProFormSelect
      name="select2"
      label="Select"
      valueType="select"
      dependencies={['text']}
      request={request}
      placeholder="Please select a country"
    />
  </ProForm>
);
```

In practical usage, `request` has a 5-second cache, which may result in delayed data updates. If you require frequent updates, it is recommended to use `state` along with `fieldProps.options` instead.
