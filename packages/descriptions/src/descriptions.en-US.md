---
title: ProDescriptions
legacy: /descriptions
group:
  path: /
nav:
  title: Components
  path: /components
  order: 1
---

## ProDescriptions - Advanced Definition List

## When to use

Advanced Descriptions List component to provide a more convenient and faster solution to build description lists.

ProDescriptions was created to solve the problem of having to write a lot of sample code for Descriptions in a project, so a lot of common logic was encapsulated in it. Writing a Descriptions in React inevitably requires defining some of the same properties. So ProDescriptions by default encapsulates the logic of requesting network, columns display.

For example, if ProDescriptions encapsulates the behavior of the request network, ProDescriptions will bring the data in props.params into the request by default, and if the interface happens to be the same as our definition, it will be very easy to implement a query.

```tsx | pure
import request from 'umi-request';

const fetchData = (params) =>
  request<{
    data: T{};
  }>('https://proapi.azurewebsites.net/github/issues', {
    params,
  });

const keyWords = "Ant Design"

<ProDescriptions<T,U> request={fetchData} />;
```

We agree that request has one parameter and `params` will take its own `params` in props. The type is as follows:

```tsx | pure
(params: U) => RequestData;
```

There are also conventions for ProDescriptions with the results of the request back, of the following type.

```tsx | pure
interface RequestData {
  data: Datum{};
  success: boolean;
}
```

## Code Demo

### List of basic definitions

Basic use.

<code src="./demos/base.tsx" />

### Requesting data remotely

Display the definition list by requesting interface data

<code src="./demos/request.tsx" />

### Configure data by request and columns

Display the definition list by requesting interface data and columns

<code src="./demos/columns.tsx" />

### Configuring data with dataSource and columns

ProDescriptions supports the same dataSource as Table

<code src="./demos/data-source.tsx" />

### Editable list of definitions

API is the same as ProTable

<code src="./demos/editable.tsx" />

## API

### ProDescriptions

> See antd's [Descriptions](https://ant.design/components/descriptions-cn/) for more features

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| title | The title of the description list, displayed at the top | `ReactNode` | - |
| tooltip | A complementary description of the content, displayed after hover | `string` | - |
| loading | Show a loading skeleton screen, the skeleton screen and the dom will not correspond to each other | `boolean` | - |
| extra | Description of the action area of the list, shown in the top right | `string` \| `ReactNode` | - |
| bordered | Whether to show borders | boolean | false |
| column | The number of `ProDescriptionsItems` in a row, either written as a pixel value or supporting responsive object writing `{ xs: 8, sm: 16, md: 24}` | number | 3 |
| size | Set the size of the list. Can be set to `middle`, `small`, or none (only if `bordered={true}` is set) | `default` \| `middle` \| `small` | - |
| layout | describe the layout | `horizontal` \| `vertical` | `horizontal` |
| colon | configure the default value of `colon` for `ProDescriptions.Item` | boolean | true |
| request | Request data, set dataIndex for ProDescriptions.Item if columns are not set | - | - |
| onRequestError | Handles request errors. |
| columns | Column definitions to use with request [columns](/components/table#columns) | - | - |
| editable | EditableConfig]('#editable') | - |

### editable edit configuration

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| form | Form instance of editable form, use `Form.useForm` to generate and use | `FormInstance` | - |
| editableKeys | Row being edited, controlled attributes. The default `key` will use the configuration of `rowKey`, if there is no configuration, it will use the `index`, it is recommended to use rowKey | `Key[]` | - |
| onChange | Triggered when row data is modified | `(editableKeys: Key[], editableRows: T[]) => void` | - |
| onSave | Triggered when a row is saved, only update | `(key: Key, row: T,newLine?:newLineConfig) => Promise<any>` | - |
| onDelete | Triggered when a row is deleted | `(key: Key, row: T) => Promise<any>` | - |
| onCancel | Triggered when cancel editing a line | `(key: Key, row: T,newLine?:newLineConfig) => Promise<any>` | - |
| actionRender | Custom edit mode action bar | `(row: T, config: ActionRenderConfig<T>) => ReactNode[]` | - |
| deletePopconfirmMessage | The pop-up confirmation box prompt message when deleting | `ReactNode` | `Delete this line? ` |
| onlyOneLineEditorAlertMessage | Only one line can be edited | `ReactNode` | `Only one line can be edited at the same time` |
| onlyAddOneLineAlertMessage | Only one line can be added at the same time | `ReactNode` | `Only add one line` |

### ProDescriptions.Item

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| label | Description of the content | ReactNode | - |
| tooltip | Additional description of the content, displayed after hover | string | - |
| span | Number of columns to include | number | 1 |
| valueType | The type of formatting | `ValueType` | - |
| valueEnum | Enumeration of current column values [valueEnum](/components/table#valueenum) | `{[key:string`\|`number]:any}` | - |
| request | Enumerate data from a network request | `()=>Promise<{[key:string`\|`number]:any}>` | - |
| dataIndex | Returns the key of the data to be used with the request for ProDescriptions for a configurable list of definitions | `React.Text` \| `React.Text[]` | - |
| editable | editable in the edit table, the function takes the same arguments as render for table | `false` \| `(text: any, record: T,index: number) => boolean` | true |

> span is the number of Description. span={2} will take up the width of two DescriptionItems.

### ActionRef

We need to trigger a manual update of the description list when we perform an action, or a tab switch, etc. Pure props are hard to solve this problem, so we provide a ref to support some default actions.

```tsx | pure
const ref = useRef<ActionType>();

// Refresh once every two seconds
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

`ActionRef` also supports some other behaviors that may reduce your coding costs in some cases, but the ref is out of the react lifecycle, so these actions are uncontrolled.

```tsx | pure
// Refresh
ref.current.reload();
```
