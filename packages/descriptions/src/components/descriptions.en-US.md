---
title: ProDescriptions
atomId: ProDescriptions
nav:
  title: ProDescriptions - 高级定义列表
  order: 1
---

# ProDescriptions

## When to use

The advanced description list component provides a more convenient and faster solution to build a description list.

ProDescriptions was born to solve the problem of writing a lot of boilerplate code of Descriptions in the project, so many common logics are encapsulated in it. Writing a Descriptions in React will inevitably need to define some similar properties. So ProDescriptions encapsulates the request network by default, and the logic shown in the columns column.

For example, ProDescriptions encapsulates the behavior of the request network, and ProDescriptions will bring the data in props.params into the request by default. If the interface happens to be the same as our definition, it will be very simple to implement a query.

```tsx | pure
import request from'umi-request';

const fetchData = (params) =>
  request<{
    data: T{};
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });

const keyWords = "Ant Design"

<ProDescriptions<T,U> request={fetchData} />;
```

We agree that request has a parameter, and `params` will carry the `params` in props. The types are as follows:

```tsx | pure
(params: U) => RequestData;
```

There are also some conventions on the ProDescriptions of the results returned by the request, the types are as follows:

```tsx | pure
interface RequestData {
  data: Datum{};
  success: boolean;
}
```

## Code Demo

### Basic definition list

### Basic usage

<code src="../demos/base.tsx" oldtitle="Basic definition list"></code>

### Request data remotely

Display the definition list by requesting interface data

<code src="../demos/request.tsx" oldtitle="remote request data"></code>

### columns configuration

Display the definition list by requesting interface data and columns

<code src="../demos/columns.tsx" oldtitle="columns configuration"></code>

### format configuration

Format the date according to format

<code src="../demos/format.tsx" oldtitle="format configuration"></code>

### dataSource configuration data

ProDescriptions supports the same dataSource as Table

<code src="../demos/use-data-source.tsx" oldtitle="dataSource configuration data"></code>

### Editable definition list

API is the same as ProTable

<code src="../demos/editable.tsx" oldtitle="Editable definition list"></code>

## API

### ProDescriptions

> For more features, see [Descriptions](https://ant.design/components/descriptions-cn/) of antd

| Parameters     | Description                                                                                                                                  | Type                                           | Default Value |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------- |
| title          | The title of the description list, displayed at the top                                                                                      | `ReactNode`                                    | -             |
| tooltip        | Supplementary description of the content, displayed after hover                                                                              | `string`                                       | -             |
| loading        | Display a loaded skeleton screen, the skeleton screen and dom will not correspond one-to-one                                                 | `boolean`                                      | -             |
| extra          | Describe the operation area of ​​the list, displayed on the upper right                                                                      | `string` \| `ReactNode`                        | -             |
| bordered       | Whether to display the border                                                                                                                | boolean                                        | false         |
| column         | The number of `ProDescriptionsItems` in a row, can be written as pixel value or support responsive object writing `{ xs: 8, sm: 16, md: 24}` | number                                         | 3             |
| size           | Set the size of the list. Can be set to `middle`, `small`, or left blank (only setting `bordered={true}` takes effect)                       | `default` \| `middle` \| `small`               | -             |
| layout         | Description layout                                                                                                                           | `horizontal` \| `vertical`                     | `horizontal`  |
| colon          | Configure the default value of `colon` of `ProDescriptions.Item`                                                                             | boolean                                        | true          |
| request        | Request data, when columns are not set, ProDescriptions.Item needs to set the corresponding dataIndex                                        | -                                              | -             |
| onRequestError | Handling request errors, by default an error will be thrown directly                                                                         | -                                              | -             |
| columns        | Column definition, used with request [columns](/components/table#columns)                                                                    | -                                              | -             |
| editable       | Editable related configuration                                                                                                               | [EditableConfig](#editable-edit-configuration) | -             |

### editable edit configuration

| Property                      | Description                                                                                                                                                                            | Type                                                                     | Default Value                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| form                          | The form instance of the editable form, use `Form.useForm` to generate and use                                                                                                         | `FormInstance`                                                           | -                                              |
| formProps                     | form properties can be configured, but onFinish is not supported                                                                                                                       | [\`FormProps'](https://procomponents.ant.design/components/form#proform) | -                                              |
| editableKeys                  | Row being edited, controlled attributes. The default`key` will use the configuration of `rowKey`, if there is no configuration, it will use the`index`,it is recommended to use rowKey | `Key[]`                                                                  | -                                              |
| onChange                      | Triggered when row data is modified                                                                                                                                                    | `(editableKeys: Key[], editableRows: T[]) => void`                       | -                                              |
| onSave                        | Triggered when a row is saved                                                                                                                                                          | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>`  | -                                              |
| onDelete                      | Triggered when a row is deleted                                                                                                                                                        | `(key: Key, row: T) => Promise<any>`                                     | -                                              |
| onCancel                      | Triggered when cancel editing a line                                                                                                                                                   | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>`  | -                                              |
| actionRender                  | Custom edit mode action bar                                                                                                                                                            | `(row: T, config: ActionRenderConfig,defaultDom) => ReactNode[]`         | -                                              |
| deletePopconfirmMessage       | The pop-up confirmation box prompt message when deleting                                                                                                                               | `ReactNode`                                                              | `Delete this line?`                            |
| onlyOneLineEditorAlertMessage | Only one line can be edited                                                                                                                                                            | `ReactNode`                                                              | `Only one line can be edited at the same time` |
| onlyAddOneLineAlertMessage    | Only one line can be added at the same time                                                                                                                                            | `ReactNode`                                                              | `Only add one line`                            |

### ProDescriptions.Item

| Parameters | Description                                                                                                                    | Type                                                         | Default Value |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------- |
| label      | Description of content                                                                                                         | ReactNode                                                    | -             |
| tooltip    | Supplementary description of the content, displayed after hover                                                                | string                                                       | -             |
| ellipsis   | Whether to abbreviate automatically                                                                                            | `boolean`                                                    | -             |
| copyable   | Whether to support copying                                                                                                     | `boolean`                                                    | -             |
| span       | number of columns included                                                                                                     | number                                                       | 1             |
| valueType  | Formatted type                                                                                                                 | `ValueType`                                                  | -             |
| valueEnum  | Enumeration of current column values ​​[valueEnum](/components/table#valueenum)                                                | `Record`                                                     | -             |
| request    | Request enumerated data from the network                                                                                       | `()=>Promise<{[key:string`\|`number]:any}>`                  | -             |
| dataIndex  | The key of the returned data is used in conjunction with the request of ProDescriptions for the definition list of the profile | `React.Text` \| `React.Text[]`                               | -             |
| editable   | Whether it is editable in the edit table, the parameters of the function are the same as the render of the table               | `false` \| `(text: any, record: T,index: number) => boolean` | true          |

> span is the number of Description.Item. span={2} will occupy the width of two DescriptionItem.

### ActionRef

We need to manually trigger the update of the description list when performing an operation or tab switching. It is difficult to solve this problem with pure props, so we provide a ref to support some default operations.

```tsx | pure
const ref = useRef<ActionType>();

// refresh every two seconds
useEffect(() => {
  setInterval(() => {
    ref.current.reload();
  }, 2000);
}, []);

// hooks binding
<ProDescriptions actionRef={ref} />;

// class
<ProDescriptions actionRef={(ref) => (this.ref = ref)} />;
```

`ActionRef` also supports some other behaviors, which will reduce your coding cost in some cases, but ref will break away from the life cycle of react, so these actions are not controlled.

```tsx | pure
// refresh
ref.current.reload();
```
