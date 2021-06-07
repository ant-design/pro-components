# @ant-design/pro-table

> ProTable was created to solve the problem of having to write a lot of sample code for tables in a project, so a lot of common logic was encapsulated in it. These wrappers can be simply categorized as pre-defined behaviors and pre-defined logic.

![](https://cdn.nlark.com/yuque/0/2020/png/84868/1582038656687-065b40ef-5029-4bf7-8941-6e843570e4e0.png?x-oss-process=image%2Fresize%2Cw_2031)

ProTable puts a layer of wrapping on top of antd's Table, supports some presets, and encapsulates some behaviors. Only api's that differ from antd Table are listed here.

### request

`request` is the most important API of ProTable, `request` takes an object. The object must have `data` and `success` in it, and `total` is also required if manual paging is needed. `request` takes over the `loading` settings and re-executes them when the query form is queried and the `params` parameters are modified. Also the query form values and `params` parameters are brought in. The following is an example.

```tsx | pure
<ProTable<T, U>
  // params is a parameter that needs to be self-contained
  // This parameter has higher priority and will override the parameters of the query form
  params={params}
  request={async (
    // The first parameter params is the combination of the query form and params parameters
    // The first parameter will always have pageSize and current, which are antd specifications
    params: T & {
      pageSize: number;
      current: number;
    },
    sort,
    filter,
  ) => {
    // Here you need to return a Promise, and you can transform the data before returning it
    // If you need to transform the parameters you can change them here
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      // Please return true for success.
      // otherwise the table will stop parsing the data, even if there is data
      success: boolean,
      // not passed will use the length of the data, if it is paged you must pass
      total: number,
    };
  }}
/>
```

### ProTable

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| request | Method to get `dataSource` | `(params?: {pageSize,current},sort,filter) => {data,success,total}` | - |
| params | redundant parameters for `request` queries, triggering a reload if they change | `object` | - |
| postData | Processes the data obtained by `request` | `(data: T[]) => T[]` | - |
| defaultData | The default data | `T[]` | - |
| actionRef | A reference to the Table action for custom triggering | `MutableRefObject<FormInstance>` | - |
| formRef | A reference to the form instance of the query form, for some flexible configuration | `MutableRefObject<ActionType>` | - |
| toolBarRender | Renders the toolbar, supports returning a dom array, and will automatically add margin-right | `(action) => ReactNode[]` | - |
| onLoad | Triggered when data is loaded, will be triggered multiple times | `(dataSource: T[]) => void` | - |
| onLoadingChange | triggered when loading is modified, usually caused by network requests | `(loading:boolean)=> void` | - |
| onRequestError | Triggered when data loading fails | `(error) => void` | - |
| className of the encapsulated table | string | - |
| tableStyle | The style of the wrapped table | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html) | - |
| options | table toolbar, not shown when set to false | `{{ fullScreen: boolean \| function, reload: boolean \| function,setting: true }}` | `{ fullScreen: true, reload:true, setting: true}`` |
| search | Whether to display the search form, pass in the object for the search form configuration | `false`\| [SearchConfig](#search-search-form) | true |
| dateFormatter | Converts moment format data to a specific type, false does not convert | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | make some changes before searching | `(params:T)=>T` | - |
| onSizeChange | table size changed | `(size: 'default' \| 'middle' \| 'small') => void` | - |
| columnsStateMap | State enumeration for columns | `{key:{ show,fixed }}}` | - |
| onColumnsStateChange | columns state changed | `(props: {key:{ show,fixed }}}) => void` | - |
| type | pro-table type | `"form"` | - |
| form | configuration of antd form | [FormProps](https://ant.design/components/form-cn/#API) | - |
| onSubmit | Triggered when the form is submitted | `(params: U) => void` | - |
| onReset | Triggered when resetting the form | `() => void` | - |
| columnEmptyText | display when empty, display when not set `-`, false to disable this function | `string` \| `false` | false |
| tableRender | Custom rendering table function | `(props,dom,domList:{ toolbar,alert,table}) => ReactNode` | - |
| toolbar | pass through `ListToolBar` configuration items | [ListToolBarProps](#listtoolbarprops) | - |
| tableExtraRender | Custom table body functions | `(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode;` | - |
| manualRequest | Whether or not the first request needs to be triggered manually, with `true` not hiding the search form | `boolean` | false |
| editable | Configuration for editable tables | [TableRowEditable<T>](#editable) | - |
| cardBordered | Borders for Table and Search outer Card components | `boolean \| {search?: boolean, table?: boolean}` | false |

#### RecordCreator

| property | description | type | default |
| --- | --- | --- | --- |
| record | The row to be added, generally containing a unique key | `T` | `{}` |
| position | where the row should be added, at the beginning or at the end | `top` \| `bottom` | `bottom` |
| (... .buttonProps) | antd's [ButtonProps](https://ant.design/components/button-cn/#API) | ButtonProps | - |

#### Search Search form

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| filterType | filterFormType | `'query'` \| `'light'` | `'query'` |
| searchText | the text of the query button | `string` | query |
| resetText | The text of the reset button | `string` | reset |
| submitText | the text of the submit button | `string` | submit |
| labelWidth | The width of the label | `'number'` \| `'auto'` | 80 |
| span | Configure the number of columns in the query form | `'number'` \| [`'ColConfig'`](#ColConfig) | defaultColConfig |
| collapseRender | render of the collapse button | `(collapsed: boolean,showCollapseButton?: boolean,) => ReactNode` | - |
| defaultCollapsed | whether to collapse by default | `boolean` | true |
| collapsed | collapsed or not | `boolean` | - |
| onCollapse | The event of the collapsed button | `(collapsed: boolean) => void;` | - |
| optionRender | Custom action bar | `((searchConfig,formProps,dom) => ReactNode[])\|`false` | - |

### editable edit line configuration

| property | description | type | default |
| --- | --- | --- | --- |
| type | The type of editable form, single or multiple | `single` \| `multiple` | - |
| editableKeys | The row being edited, a controlled property. The default `key` will use the `rowKey` configuration, if not configured it will use `index`, it is recommended to use rowKey | `Key[]` | - |
| onChange | triggered when row data is modified | `(editableKeys: Key[], editableRows: T[]) => void` | - |
| onSave | Triggered when a row is savedd | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<boolean>` | - |
| onDelete | Triggered when a line is deleted | `(key: Key, row: T) => Promise<boolean>` | - |
| onCancel | Triggered when you cancel editing a line | `(key: Key, row: T,newLine?:newLineConfig) => Promise<boolean>` | - |
| actionRender | Customize the action bar for edit mode | `(row: T, config: ActionRenderConfig<T>) => ReactNode[]` | - |
| deletePopconfirmMessage | popup confirmation message when deleting | `ReactNode` | `Delete this row?` |
| onlyOneLineEditorAlertMessage | Message that only one line can be edited | `ReactNode` | `Only one line can be edited at a time` |
| onlyAddOneLineAlertMessage | A prompt that can only add one line at a time | `ReactNode` | `Can only add one line at a time` |

#### ColConfig

```tsx | pure
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

## Install

Using npm:

```bash
$ npm install --save  @ant-design/pro-table
```

or using yarn:

```bash
$ yarn add @ant-design/pro-table
```
