---
title: ProTable
order: 0
legacy: /table
atomId: ProTable
nav:
  title: Components
---

# ProTable - Advanced Tables

ProTable was created to solve the problem of having to write a lot of sample code for tables in a project, so a lot of common logic was encapsulated in it. These wrappers can be simply categorized as pre-defined behaviors and pre-defined logic.

Thanks to ProForm's capabilities, ProForm can take many forms, switch between query form types, set up deformations to become a simple Form form, perform new creation, etc.

![layout
](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

## When to Use

When your forms need to interact with the server or need multiple cell styles, ProTable is the right choice.

## API

ProTable puts a layer of wrapping on top of antd's Table, supports some presets, and encapsulates some behaviors. Only api's that differ from antd Table are listed here.

### request

`request` is the most important API of ProTable, `request` takes an object. The object must have `data` and `success` in it, and `total` is also required if manual paging is needed. `request` takes over the `loading` settings and re-executes them when the query form is queried and the `params` parameters are modified. Also the query form values and `params` parameters are brought in. The following is an example.

```tsx | pure
<ProTable<DataType, Params>
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

| Property           | Description                                                                                                    | Type                                                                                                                                                                                                                                | Default Value                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| request            | How to get `dataSource`                                                                                        | `(params?: {pageSize,current},sort,filter) => {data,success,total}`                                                                                                                                                                 | -                                                                  |
| params             | Additional parameters used for `request` query, once changed will trigger reloading                            | `object`                                                                                                                                                                                                                            | -                                                                  |
| postData           | Process the data obtained through `request`                                                                    | `(data: T[]) => T[]`                                                                                                                                                                                                                | -                                                                  |
| defaultData        | Default data                                                                                                   | `T[]`                                                                                                                                                                                                                               | -                                                                  |
| dataSource         | Table data, protable recommends using request to load                                                          | `T[]`                                                                                                                                                                                                                               | -                                                                  |
| onDataSourceChange | Triggered when Table data changes                                                                              | `(dataSource: T[]) => void`                                                                                                                                                                                                         | -                                                                  |
| actionRef          | Reference to Table action for custom triggering                                                                | `MutableRefObject<ActionType>`                                                                                                                                                                                                      | -                                                                  |
| formRef            | The form instance of the query form can be obtained for some flexible configuration                            | `MutableRefObject<FormInstance>`                                                                                                                                                                                                    | -                                                                  |
| toolBarRender      | Render toolbar, support returning a dom array, will automatically increase margin-right                        | `(action) => ReactNode[]`                                                                                                                                                                                                           | -                                                                  |
| onLoad             | Triggered after the data is loaded, it will be triggered multiple times                                        | `(dataSource: T[]) => void`                                                                                                                                                                                                         | -                                                                  |
| onLoadingChange    | Triggered when loading is modified, usually caused by network requests                                         | `(loading:boolean)=>void`                                                                                                                                                                                                           | -                                                                  |
| onRequestError     | Triggered when data loading fails                                                                              | `(error) => void`                                                                                                                                                                                                                   | -                                                                  |
| tableClassName     | className of the encapsulated table                                                                            | `string`                                                                                                                                                                                                                            | -                                                                  |
| tableStyle         | style of the encapsulated table                                                                                | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html)                                                                                                                                                             | -                                                                  |
| options            | table toolbar, not displayed when set to false                                                                 | `{{ density?: boolean, fullScreen?: boolean \| function, reload?: boolean \| function, reloadIcon?: React.ReactNode, densityIcon?: React.ReactNode, setting?: boolean \|` [SettingOptionType](#menu-bar-options-configuration) `}}` | `{ fullScreen: false, reload :true, density: true, setting: true}` |
| search             | Whether to display the search form, when the object is passed in, it is the configuration of the search form   | `false` \| [SearchConfig](#search-search-form)                                                                                                                                                                                      | -                                                                  |
| dateFormatter      | Convert moment format data to a specific type, false will not be converted                                     | `"string"` \| `"number"` \| ((value: Moment, valueType: string) => string \| number) \|`false`                                                                                                                                      | `"string"`                                                         |
| defaultSize        | Default size                                                                                                   | SizeType                                                                                                                                                                                                                            | -                                                                  |
| beforeSearchSubmit | Make some changes before searching                                                                             | `(params:T)=>T`                                                                                                                                                                                                                     | -                                                                  |
| onSizeChange       | The table size has changed                                                                                     | `(size:'default' \|'middle' \|'small') => void`                                                                                                                                                                                     | -                                                                  |
| type               | pro-table type                                                                                                 | `"form"`                                                                                                                                                                                                                            | -                                                                  |
| form               | antd form configuration                                                                                        | [FormProps](https://ant.design/components/form-cn/#API)                                                                                                                                                                             | -                                                                  |
| onSubmit           | Triggered when the form is submitted                                                                           | `(params: U) => void`                                                                                                                                                                                                               | -                                                                  |
| onReset            | Triggered when the form is reset                                                                               | `() => void`                                                                                                                                                                                                                        | -                                                                  |
| columnEmptyText    | Display when it is empty, display `-` when it is not set, false can turn off this function                     | `string` \| `false`                                                                                                                                                                                                                 | false                                                              |
| tableRender        | Custom rendering table function                                                                                | `(props,dom,domList:{ toolbar,alert,table}) => ReactNode`                                                                                                                                                                           | -                                                                  |
| toolbar            | Transparent transmission of `ListToolBar` configuration items                                                  | [ListToolBarProps](#listtoolbarprops)                                                                                                                                                                                               | -                                                                  |
| tableExtraRender   | The main function of the custom table                                                                          | `(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode;`                                                                                                                                                                       | -                                                                  |
| manualRequest      | Do you need to manually trigger the first request? When configured as `true`, the search form cannot be hidden | `boolean`                                                                                                                                                                                                                           | false                                                              |
| editable           | Related configuration of editable table                                                                        | [TableRowEditable](/en-US/components/editable-table#editable-edit-line-configuration)                                                                                                                                               | -                                                                  |
| cardBordered       | Border of Card components around Table and Search                                                              | `boolean \| {search?: boolean, table?: boolean}`                                                                                                                                                                                    | false                                                              |
| ghost              | Ghost mode, that is, whether to cancel the padding of the table content area.                                  | `boolean`                                                                                                                                                                                                                           | false                                                              |
| debounceTime       | Debounce time                                                                                                  | `number`                                                                                                                                                                                                                            | 10                                                                 |
| revalidateOnFocus  | Automatically re-request when the window is focused                                                            | `boolean`                                                                                                                                                                                                                           | `false`                                                            |
| columnsState       | Column Status Control, you can operate the display hide                                                        | `ColumnStateType`                                                                                                                                                                                                                   | -                                                                  |

#### RecordCreator

| Property         | Description                                                         | Type              | Default Value |
| ---------------- | ------------------------------------------------------------------- | ----------------- | ------------- |
| record           | The row data to be added, generally contains a unique key           | `T`               | `{}`          |
| position         | Where does the line increase, start or end                          | `top` \| `bottom` | `bottom`      |
| (...buttonProps) | [ButtonProps](https://ant.design/components/button-cn/#API) of antd | ButtonProps       | —             |

#### ColumnStateType

| Property        | Description                                                                                                                             | Type                                             | Default |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| defaultValue    | The default value of the column status, only for the first time. Used for resetting value                                               | `Record <string, ColumnsState>;`                 |         |
| value           | Column status, support controlled mode                                                                                                  | `Record <string, ColumnsState>;`                 |         |
| onChange        | Column status After changing                                                                                                            | `(value: Record <string, ColumnsState>) => void` |         |
| PersistenceKey  | The key of the persistence column is used to determine if it is the same table                                                          | `string \| Number`                               |         |
| PersistenceType | The type of persistence column, localStorage is also existing after closing the browser, sessionStorage closes the browser will be lost | `localStorage \| sessionStorage`                 |         |

#### Search Search form

| Property         | Description                                              | Type                                                                        | Default Value    |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| filterType       | Filter form type                                         | `'query'` \| `'light'`                                                      | `'query'`        |
| searchText       | Search button text                                       | `string`                                                                    | Search           |
| resetText        | reset button text                                        | `string`                                                                    | reset            |
| submitText       | The text of the submit button                            | `string`                                                                    | Submit           |
| labelWidth       | Label width                                              | `'number'` \| `'auto'`                                                      | 80               |
| span             | Configure the number of columns in the query form        | `'number'` \| [`'ColConfig'`](#ColConfig)                                   | defaultColConfig |
| className        | Encapsulated search Form className                       | `string`                                                                    | -                |
| collapseRender   | Collapse button render                                   | `((collapsed: boolean,showCollapseButton?: boolean) => ReactNode)`\|`false` | -                |
| defaultCollapsed | Whether to collapse by default                           | `boolean`                                                                   | true             |
| collapsed        | collapsed                                                | `boolean`                                                                   | -                |
| onCollapse       | Collapse button event                                    | `(collapsed: boolean) => void;`                                             | -                |
| optionRender     | Custom action bar                                        | `((searchConfig,formProps,dom) => ReactNode[])`\|`false`                    | -                |
| showHiddenNum    | Whether to show the number of hidden items after storing | `boolean`                                                                   | `false`          |

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

#### Menu bar options configuration

```tsx | pure
export type OptionsType =
  | ((e: React.MouseEvent<HTMLSpanElement>, action?: ActionType) => void)
  | boolean;

export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
  reloadIcon?: React.ReactNode;
  densityIcon?: React.ReactNode;
};

export type SettingOptionType = {
  draggable?: boolean;
  checkable?: boolean;
  showListItemOption?: boolean;
  checkedReset?: boolean;
  listsHeight?: number;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  settingIcon?: React.ReactNode;
};
```

#### ActionRef manually triggered

Sometimes we need to manually trigger the reload of the table and other operations, we can use actionRef, the editable table also provides some operations to help us achieve our requirements faster.

```tsx | pure
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// refresh
ref.current.reload();

// Refresh and clear, the page number will also be reset, excluding the form
ref.current.reloadAndRest();

// Reset to default values, including forms
ref.current.reset();

// Clear the selected item
ref.current.clearSelected();

// start editing
ref.current.startEditable(rowKey);

// end editing
ref.current.cancelEditable(rowKey);
```

### Columns column definition

> Requesting remote data is more complicated, please see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

| Property                               | Description                                                                                                                                                                                                                                  | Type                                                                                                  | Default Value |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| title                                  | Basically the same as in antd, but supports passing in a method                                                                                                                                                                              | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)`                         | -             |
| tooltip                                | An icon will be displayed after the title, and some information will be prompted after hover                                                                                                                                                 | `string`                                                                                              | -             |
| ellipsis                               | Whether to abbreviate automatically                                                                                                                                                                                                          | `boolean`                                                                                             | -             |
| copyable                               | Whether to support copying                                                                                                                                                                                                                   | `boolean`                                                                                             | -             |
| valueEnum                              | The value enumeration will automatically convert the value as a key to retrieve the content to be displayed                                                                                                                                  | [valueEnum](/components/schema#valueenum)                                                             | -             |
| valueType                              | The type of value, which will generate different renderers                                                                                                                                                                                   | [`valueType`](/components/schema#valuetype)                                                           | `text`        |
| order                                  | The weight in the query form, the weight is ranked first                                                                                                                                                                                     | `number`                                                                                              | -             |
| fieldProps                             | The props of the query form will be transparently transmitted to the form item. If it is rendered as Input, all props of input are supported. Similarly, if it is select, all props of select are also supported. Also supports method input | `(form,config)=>Record \| Record`                                                                     | -             |
| `formItemProps`                        | The configuration passed to Form.Item can be configured with rules, but the default query form rules does not take effect. Need to configure `ignoreRules`                                                                                   | `(form,config)=>formItemProps` \| `formItemProps`                                                     | -             |
| renderText                             | Render like table, but must return string. If you just want to convert enumeration, you can use [valueEnum](/components/schema#valueenum)                                                                                                    | `(text: any,record: T,index: number,action: UseFetchDataAction<T> ) => string`                        | -             |
| render                                 | Render similar to table, the first parameter becomes dom, and the fourth parameter action is added                                                                                                                                           | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => ReactNode \| ReactNode[]` | -             |
| renderFormItem                         | Render the input components of the query form                                                                                                                                                                                                | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode`                | -             |
| search                                 | Configuration column search related, false is hidden                                                                                                                                                                                         | `false` \| `{ transform: (value: any) => any }`                                                       | true          |
| search.transform                       | The key of the conversion value, generally used for the conversion of the event interval                                                                                                                                                     | `(value: any) => any`                                                                                 | -             |
| [editable](/components/editable-table) | Whether it is editable in the edit table, the parameters of the function are the same as the render of the table                                                                                                                             | `false` \| `(text: any, record: T,index: number) => boolean`                                          | true          |
| colSize                                | The number of grids occupied by a form item, `proportion = colSize*span`, `colSize` defaults to 1, `span` is 8, `span` is `form={{span:8}}` global setting Of                                                                                | `number`                                                                                              | -             |
| hideInSearch                           | Do not show this item in the query form                                                                                                                                                                                                      | `boolean`                                                                                             | -             |
| hideInTable                            | Do not show this column in Table                                                                                                                                                                                                             | `boolean`                                                                                             | -             |
| hideInForm                             | Do not show this column in Form                                                                                                                                                                                                              | `boolean`                                                                                             | -             |
| hideInDescriptions                     | Do not show this column in Descriptions                                                                                                                                                                                                      | `boolean`                                                                                             | -             |
| filters                                | The filter menu item in the header. When the value is true, valueEnum is automatically generated                                                                                                                                             | `boolean` \| `object[]`                                                                               | false         |
| onFilter                               | Filter the form, use the built-in ProTable when it is true, turn off local filtering when it is false                                                                                                                                        | `(value, record) => boolean` \|`false`                                                                | false         |
| request                                | Request enumeration from server                                                                                                                                                                                                              | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)                | -             |
| initialValue                           | Initial value of query form item                                                                                                                                                                                                             | `any`                                                                                                 | -             |

### valueType value type

ProTable encapsulates some commonly used value types to reduce repeated `render` operations. Configure a [`valueType`](/components/schema#valuetype) to display formatted response data.

### Batch operation

Like antd, batch operations need to be set to "rowSelection" to enable. Unlike antd, pro-table provides an alert to carry some information. You can customize it with `tableAlertRender` and `tableAlertOptionRender`. Set or return false to close.

| Property               | Description                                                                                              | Type                                                                                                 | Default Value |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| alwaysShowAlert        | Always show alert, no choice not to show by default                                                      | `boolean`                                                                                            | -             |
| tableAlertRender       | Customize the information area on the left side of the batch operation toolbar, not displayed when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\| `false` | -             |
| tableAlertOptionRender | Customize the option area on the right side of the bulk operation toolbar, not displayed when false      | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\| `false` | -             |

### Searching for forms

ProTable will generate a Form for filtering list data based on columns, and the final value will be returned based on the first parameter via `request`, which looks like.

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

As per the specification, table forms do not require any mandatory parameters, and all clicks on search and reset will trigger a `request` to initiate a query.

Form's columns are generated with different types based on [`valueType`](/components/schema#valuetype).

> Columns with a valueType of index indexBorder option and no dataIndex and key will be ignored.

### ListToolbar

Toolbar section for customizing forms.

#### ListToolBarProps

Toolbar configuration properties for lists and tables

| Parameters   | Description                                              | Type                         | Default |
| ------------ | -------------------------------------------------------- | ---------------------------- | ------- |
| title        | title                                                    | `ReactNode`                  | -       |
| subTitle     | subTitle                                                 | `ReactNode`                  | -       |
| tooltip      | tooltip Description                                      | `string`                     | -       |
| search       | query area                                               | `ReactNode` \| `SearchProps` | -       |
| actions      | actions area                                             | `ReactNode[]`                | -       |
| settings     | settings area                                            | `(ReactNode \| Setting)[]`   | -       |
| filter       | The filter area, usually used with `LightFilter`         | `ReactNode`                  | -       |
| multipleLine | Whether to display multiple lines                        | `boolean`                    | `false` |
| menu         | menu configuration                                       | `ListToolBarMenu`            | -       |
| tabs         | Tabs configuration, only valid if `multipleLine` is true | `ListToolBarTabs`            | -       |

SearchProps is a property of antd's [Input.Search](https://ant.design/components/input/#Input.Search).

#### Setting

| Parameters | Description                 | Type                  | Default |
| ---------- | --------------------------- | --------------------- | ------- |
| icon       | icon                        | `ReactNode`           | -       |
| tooltip    | tooltip Description         | `string`              | -       |
| key        | operation unique identifier | `string`              | -       |
| onClick    | set to be triggered         | `(key: string)=>void` | -       |

#### ListToolBarMenu

| parameters | description                  | type                                  | default    |
| ---------- | ---------------------------- | ------------------------------------- | ---------- |
| type       | type                         | `inline` \| `dropdown` \| `tab`       | `dropdown` |
| activeKey  | current value                | `string`                              | -          |
| items      | menu items                   | `{ key: string; label: ReactNode }[]` | -          |
| onChange   | Callback for switching menus | `(activeKey)=>void`                   | -          |

#### ListToolBarTabs

| parameters | description                      | type                                | default |
| ---------- | -------------------------------- | ----------------------------------- | ------- |
| activeKey  | currently selected item          | `string`                            | -       |
| items      | menu items                       | `{ key: string; tab: ReactNode }[]` | -       |
| onChange   | Callback for toggling menu items | `(activeKey)=>void`                 | -       |

#### TableDropdown

| parameters     | description                                                                   | type        | default |
| -------------- | ----------------------------------------------------------------------------- | ----------- | ------- |
| key            | Unique identifier                                                             | `string`    | -       |
| name           | Content                                                                       | `ReactNode` | -       |
| (...Menu.Item) | [Menu.Item](https://ant.design/components/menu-cn/#Menu.Item) from Ant Design | Menu.Item   | -       |
