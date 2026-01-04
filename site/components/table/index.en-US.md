---
group: Table
title: ProTable Advanced Table
order: 0
legacy: /table
atomId: ProTable
---

# ProTable - Advanced Table

ProTable was created to solve the problem of having to write a lot of sample code for tables in a project, so a lot of common logic was encapsulated in it. These wrappers can be simply categorized as pre-defined behaviors and pre-defined logic.

Thanks to ProForm's capabilities, ProForm can take many forms, switch between query form types, set up deformations to become a simple Form form, perform new creation, etc.

![layout
](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

If you are an internal network user, you are welcome to use our [TechUI Studio](https://techui-studio.antfin-inc.com/) visual configuration to generate initial code.

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

`request` is also supported in column configuration, but only for a few [valueType](/components/schema#valuetype).

### ProTable

| Property           | Description                                                                                                                                 | Type                                                                                                                                                                                                                                | Default Value                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| columns            | Column configuration capability, supports an array                                                                                          | `ProColumns<T, ValueType>[]`                                                                                                                                                                                                        | -                                                                   |
| request            | How to get `dataSource`                                                                                                                     | `(params: U & {pageSize?: number, current?: number, keyword?: string}, sort: Record<string, SortOrder>, filter: Record<string, FilterValue>) => Promise<{data: T[], success?: boolean, total?: number}>`                            | -                                                                   |
| params             | Additional parameters used for `request` query, once changed will trigger reloading                                                         | `U`                                                                                                                                                                                                                                 | -                                                                   |
| polling            | Whether to poll, polling indicates the polling interval, 0 to close polling, greater than 0 to open polling, minimum polling time is 2000ms | `number \| ((dataSource: T[]) => number) \| undefined`                                                                                                                                                                              | -                                                                   |
| postData           | Process the data obtained through `request`                                                                                                 | `(data: T[]) => T[]`                                                                                                                                                                                                                | -                                                                   |
| defaultData        | Default data                                                                                                                                | `T[]`                                                                                                                                                                                                                               | -                                                                   |
| dataSource         | Table data, ProTable recommends using `request` to load                                                                                     | `T[]`                                                                                                                                                                                                                               | -                                                                   |
| onDataSourceChange | Triggered when Table data changes                                                                                                           | `(dataSource: T[]) => void`                                                                                                                                                                                                         | -                                                                   |
| actionRef          | Reference to Table action for custom triggering                                                                                             | `React.Ref<ActionType \| undefined>`                                                                                                                                                                                                | -                                                                   |
| formRef            | The form instance of the query form can be obtained for some flexible configuration                                                         | `TableFormItem<T>['formRef']`                                                                                                                                                                                                       | -                                                                   |
| toolBarRender      | Render toolbar, support returning a dom array, will automatically increase margin-right                                                     | `ToolBarProps<T>['toolBarRender'] \| false`                                                                                                                                                                                         | -                                                                   |
| optionsRender      | Custom render toolbar options                                                                                                               | `ToolBarProps<T>['optionsRender']`                                                                                                                                                                                                  | -                                                                   |
| onLoad             | Triggered after the data is loaded, it will be triggered multiple times                                                                     | `(dataSource: T[]) => void`                                                                                                                                                                                                         | -                                                                   |
| onLoadingChange    | Triggered when loading is modified, usually caused by network requests                                                                      | `(loading: boolean \| SpinProps \| undefined) => void`                                                                                                                                                                              | -                                                                   |
| onRequestError     | Triggered when data loading fails                                                                                                           | `(error: Error) => void`                                                                                                                                                                                                            | -                                                                   |
| tableClassName     | className of the encapsulated table                                                                                                         | `string`                                                                                                                                                                                                                            | -                                                                   |
| tableStyle         | style of the encapsulated table                                                                                                             | [CSSProperties](https://www.htmlhelp.com/reference/css/properties.html)                                                                                                                                                             | -                                                                   |
| headerTitle        | The title of the top-left corner                                                                                                            | `ReactNode`                                                                                                                                                                                                                         | -                                                                   |
| tooltip            | Tooltip next to the title                                                                                                                   | `string \| LabelTooltipType`                                                                                                                                                                                                        | -                                                                   |
| options            | table toolbar, not displayed when set to false, passing function will trigger when clicked                                                  | `{{ density?: boolean, fullScreen?: boolean \| function, reload?: boolean \| function, reloadIcon?: React.ReactNode, densityIcon?: React.ReactNode, setting?: boolean \|` [SettingOptionType](#menu-bar-options-configuration) `}}` | `{ fullScreen: false, reload: true, density: true, setting: true }` |
| search             | Whether to display the search form, when the object is passed in, it is the configuration of the search form                                | `false` \| [SearchConfig](#search-search-form)                                                                                                                                                                                      | -                                                                   |
| defaultSize        | Default size                                                                                                                                | SizeType                                                                                                                                                                                                                            | -                                                                   |
| dateFormatter      | Convert dayjs format data to a specific type, false will not be converted                                                                   | `"string"` \| `"number"` \| ((value: dayjs.Dayjs, valueType: string) => string \| number) \| `false`                                                                                                                                | `"string"`                                                          |
| beforeSearchSubmit | Make some changes before searching                                                                                                          | `(params: Partial<U>) => any`                                                                                                                                                                                                       | -                                                                   |
| onSizeChange       | The table size has changed                                                                                                                  | `(size: DensitySize) => void`                                                                                                                                                                                                       | -                                                                   |
| type               | pro-table type                                                                                                                              | `ProSchemaComponentTypes`                                                                                                                                                                                                           | -                                                                   |
| form               | type="form" and Form configuration of search form                                                                                           | `Omit<ProFormProps & QueryFilterProps, 'form'>`                                                                                                                                                                                     | -                                                                   |
| onSubmit           | Triggered when the form is submitted                                                                                                        | `(params: U) => void`                                                                                                                                                                                                               | -                                                                   |
| onReset            | Triggered when the form is reset                                                                                                            | `() => void`                                                                                                                                                                                                                        | -                                                                   |
| columnEmptyText    | Display when it is empty, display `-` when it is not set, false can turn off this function                                                  | `ProFieldEmptyText`                                                                                                                                                                                                                 | `-`                                                                 |
| tableRender        | Custom rendering table function                                                                                                             | `(props: ProTableProps<T, U, ValueType>, defaultDom: ReactNode, domList: {toolbar: ReactNode, alert: ReactNode, table: ReactNode}) => ReactNode`                                                                                    | -                                                                   |
| tableViewRender    | Render table view, used for customizing ProList, not recommended for direct use                                                             | `(props: TableProps<DataSource>, defaultDom: JSX.Element) => JSX.Element \| undefined`                                                                                                                                              | -                                                                   |
| searchFormRender   | Render search form                                                                                                                          | `(props: ProTableProps<T, U, ValueType>, defaultDom: JSX.Element) => ReactNode`                                                                                                                                                     | -                                                                   |
| toolbar            | Transparent transmission of `ListToolBar` configuration items                                                                               | [ListToolBarProps](#listtoolbarprops)                                                                                                                                                                                               | -                                                                   |
| tableExtraRender   | dom rendering between table and search form                                                                                                 | `(props: ProTableProps<T, U, ValueType>, dataSource: T[]) => ReactNode`                                                                                                                                                             | -                                                                   |
| manualRequest      | Do you need to manually trigger the first request? When configured as `true`, the search form cannot be hidden                              | `boolean`                                                                                                                                                                                                                           | false                                                               |
| editable           | Related configuration of editable table                                                                                                     | `RowEditableConfig<T>`                                                                                                                                                                                                              | -                                                                   |
| cardProps          | Settings for the card outside the table                                                                                                     | `ProCardProps \| false`                                                                                                                                                                                                             | -                                                                   |
| cardBordered       | Border of Card components around Table and Search                                                                                           | `boolean \| {search?: boolean, table?: boolean}`                                                                                                                                                                                    | false                                                               |
| ghost              | Ghost mode, that is, whether to cancel the padding of the table content area.                                                               | `boolean`                                                                                                                                                                                                                           | false                                                               |
| debounceTime       | Debounce time                                                                                                                               | `number`                                                                                                                                                                                                                            | 10                                                                  |
| revalidateOnFocus  | Automatically re-request when the window is focused                                                                                         | `boolean`                                                                                                                                                                                                                           | `false`                                                             |
| columnsState       | Column Status Control, you can operate the display hide                                                                                     | `ColumnStateType`                                                                                                                                                                                                                   | -                                                                   |
| name               | The name of the editable table, through which you can communicate directly with the form without nesting                                    | `NamePath`                                                                                                                                                                                                                          | -                                                                   |
| ErrorBoundary      | Comes with error handling function to prevent blank screen. `ErrorBoundary=false` turn off default ErrorBoundary                            | `React.ComponentClass<any, any> \| false`                                                                                                                                                                                           | Built-in ErrorBoundary                                              |
| style              | Style of the outer container                                                                                                                | `React.CSSProperties`                                                                                                                                                                                                               | -                                                                   |
| rowSelection       | Selection configuration                                                                                                                     | `TableProps<T>['rowSelection'] & {alwaysShowAlert?: boolean} \| false`                                                                                                                                                              | -                                                                   |

#### RecordCreator

| Property         | Description                                                         | Type              | Default Value |
| ---------------- | ------------------------------------------------------------------- | ----------------- | ------------- |
| record           | The row data to be added, generally contains a unique key           | `T`               | `{}`          |
| position         | Where does the line increase, start or end                          | `top` \| `bottom` | `bottom`      |
| (...buttonProps) | [ButtonProps](https://ant.design/components/button-cn/#API) of antd | ButtonProps       | —             |

#### ColumnStateType

| Property        | Description                                                                                                                             | Type                                         | Default |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------- |
| defaultValue    | The default value of the column status, only for the first time. Used for resetting value                                               | `Record<string, ColumnsState>;`              | -       |
| value           | Column status, support controlled mode                                                                                                  | `Record<string, ColumnsState>;`              | -       |
| onChange        | Triggered after the column status value changes                                                                                         | `(value:Record<string, ColumnsState>)=>void` | -       |
| persistenceKey  | The key of the persistence column is used to determine if it is the same table                                                          | `string \| number`                           | -       |
| persistenceType | The type of persistence column, localStorage is also existing after closing the browser, sessionStorage closes the browser will be lost | `localStorage \| sessionStorage`             | -       |

#### Search Search form

| Property         | Description                                              | Type                                                                        | Default Value    |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| filterType       | Filter form type                                         | `'query'` \| `'light'`                                                      | `'query'`        |
| searchText       | Search button text                                       | `string`                                                                    | Search           |
| resetText        | reset button text                                        | `string`                                                                    | Reset            |
| submitText       | The text of the submit button                            | `string`                                                                    | Submit           |
| labelWidth       | Label width                                              | `'number'` \| `'auto'`                                                      | 80               |
| span             | Configure the number of columns in the query form        | `'number'` \| [`'ColConfig'`](#ColConfig)                                   | defaultColConfig |
| className        | Encapsulated search Form className                       | `string`                                                                    | -                |
| collapseRender   | Collapse button render                                   | `((collapsed: boolean,showCollapseButton?: boolean) => ReactNode)`\|`false` | -                |
| defaultCollapsed | Whether to collapse by default                           | `boolean`                                                                   | `true`           |
| collapsed        | Whether collapsed                                        | `boolean`                                                                   | -                |
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
  setting?: boolean | SettingOptionType;
  search?: (OptionSearchProps & { name?: string }) | boolean;
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

:::tip Local sort/filter with `request`
When you provide `request`, ProTable will trigger a reload on sort/filter changes and pass server-related `sort` / `filter` into `request(params, sort, filter)` by default.

If you want **client-side** sorting/filtering (and **do not** want to trigger `request`):

- **Local filter**: configure both `filters` and `onFilter` (a function or `true`).
- **Local sort**: set `sorter` to a compare function, or `{ compare }`. Avoid `sorter: true` (it means server-side sorting).
  :::

| Property                               | Description                                                                                                                                                                                                                                  | Type                                                                                                  | Default Value |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| title                                  | Basically the same as in antd, but supports passing in a method                                                                                                                                                                              | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)`                         | -             |
| tooltip                                | An icon will be displayed after the title, and some information will be prompted after hover                                                                                                                                                 | `string`                                                                                              | -             |
| ellipsis                               | Whether to abbreviate automatically                                                                                                                                                                                                          | `boolean` \| `{showTitle?: boolean}`                                                                  | -             |
| copyable                               | Whether to support copying                                                                                                                                                                                                                   | `boolean`                                                                                             | -             |
| valueEnum                              | The value enumeration will automatically convert the value as a key to retrieve the content to be displayed                                                                                                                                  | [valueEnum](/components/schema#valueenum)                                                             | -             |
| valueType                              | The type of value, which will generate different renderers                                                                                                                                                                                   | [`valueType`](/components/schema#valuetype)                                                           | `text`        |
| order                                  | The weight in the query form, the weight is ranked first                                                                                                                                                                                     | `number`                                                                                              | -             |
| fieldProps                             | The props of the query form will be transparently transmitted to the form item. If it is rendered as Input, all props of input are supported. Similarly, if it is select, all props of select are also supported. Also supports method input | `(form,config)=>Record \| Record`                                                                     | -             |
| `formItemProps`                        | The configuration passed to Form.Item can be configured with rules, but the default query form rules does not take effect. Need to configure `ignoreRules`                                                                                   | `(form,config)=>formItemProps` \| `formItemProps`                                                     | -             |
| renderText                             | Render like table, but must return string. If you just want to convert enumeration, you can use [valueEnum](/components/schema#valueenum)                                                                                                    | `(text: any,record: T,index: number,action: UseFetchDataAction<T>) => string`                         | -             |
| render                                 | Render similar to table, the first parameter becomes dom, and the fourth parameter action is added                                                                                                                                           | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => ReactNode \| ReactNode[]` | -             |
| formItemRender                         | Render the input components of the query form                                                                                                                                                                                                | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode`                | -             |
| search                                 | Configuration column search related, false is hidden                                                                                                                                                                                         | `false` \| `{ transform: (value: any) => any }`                                                       | true          |
| sorter                                 | Basically same as antd, newly added support for string override this field when requesting field                                                                                                                                             | `function \| boolean \| string \| { compare: function, multiple: number }`                            | -             |
| search.transform                       | The key of the conversion value, generally used for the conversion of the event interval                                                                                                                                                     | `(value: any) => any`                                                                                 | -             |
| [editable](/components/editable-table) | Whether it is editable in the edit table, the parameters of the function are the same as the render of the table                                                                                                                             | `false` \| `(text: any, record: T,index: number) => boolean`                                          | true          |
| colSize                                | The number of grids occupied by a form item, `proportion = colSize*span`, `colSize` defaults to 1, `span` is 8, `span` is `form={{span:8}}` global setting Of                                                                                | `number`                                                                                              | -             |
| hideInTable                            | Do not show this column in Table                                                                                                                                                                                                             | `boolean`                                                                                             | -             |
| hideInForm                             | Do not show this column in Form                                                                                                                                                                                                              | `boolean`                                                                                             | -             |
| hideInDescriptions                     | Do not show this column in Descriptions                                                                                                                                                                                                      | `boolean`                                                                                             | -             |
| hideInSetting                          | Do not display in configuration tool                                                                                                                                                                                                         | `boolean`                                                                                             | -             |
| filters                                | The filter menu item in the header. When the value is true, valueEnum is automatically generated                                                                                                                                             | `boolean` \| `object[]`                                                                               | false         |
| onFilter                               | Filter the form, use the built-in ProTable when it is true, turn off local filtering when it is false                                                                                                                                        | `(value, record) => boolean` \| `false`                                                               | false         |
| request                                | Request enumeration from server                                                                                                                                                                                                              | [request](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)                | -             |
| initialValue                           | Initial value of query form item                                                                                                                                                                                                             | `any`                                                                                                 | -             |
| disable                                | Status of `disabled` in column settings                                                                                                                                                                                                      | `boolean` \| `{ checkbox: boolean; }`                                                                 | -             |
| ignoreRules                            | Ignore rules, LightFilter should not support rules, the default is false.                                                                                                                                                                    | `boolean`                                                                                             | false         |
| readonly                               | read only                                                                                                                                                                                                                                    | `boolean`                                                                                             | -             |
| listKey                                | List key, private property                                                                                                                                                                                                                   | `string`                                                                                              | -             |

### valueType value type

ProTable encapsulates some commonly used value types to reduce repeated `render` operations. Configure a [`valueType`](/components/schema#valuetype) to display formatted response data.

### Batch operation

Like antd, batch operations need to be set to "rowSelection" to enable. Unlike antd, pro-table provides an alert to carry some information. You can customize it with `tableAlertRender` and `tableAlertOptionRender`. Set or return false to close.

| Property               | Description                                                                                              | Type                                                                                                | Default Value |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------- |
| alwaysShowAlert        | Always show alert, no choice not to show by default (`rowSelection` built-in attribute)                  | `boolean`                                                                                           | -             |
| tableAlertRender       | Customize the information area on the left side of the batch operation toolbar, not displayed when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | -             |
| tableAlertOptionRender | Customize the option area on the right side of the bulk operation toolbar, not displayed when false      | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | -             |

### Searching for forms

ProTable will generate a Form for filtering list data based on columns, and the final value will be returned based on the first parameter via `request`, which looks like.

```jsx | pure
<ProTable request={(params,sort,filter)=>{all params}}>
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

SearchProps is a property of antd's [Input.Search](https://ant.design/components/input-cn/#Input.Search).

#### Setting

| Parameters | Description                 | Type                  | Default |
| ---------- | --------------------------- | --------------------- | ------- |
| icon       | icon                        | `ReactNode`           | -       |
| tooltip    | tooltip Description         | `string`              | -       |
| key        | operation unique identifier | `string`              | -       |
| onClick    | set to be triggered         | `(key: string)=>void` | -       |

#### ListToolBarMenu

| Parameters | Description                  | Type                                  | Default  |
| ---------- | ---------------------------- | ------------------------------------- | -------- |
| type       | type                         | `inline` \| `dropdown` \| `tab`       | `inline` |
| activeKey  | current value                | `string`                              | -        |
| items      | menu items                   | `{ key: string; label: ReactNode }[]` | -        |
| onChange   | Callback for switching menus | `(activeKey)=>void`                   | -        |

#### ListToolBarTabs

| Parameters | Description                      | Type                                | Default |
| ---------- | -------------------------------- | ----------------------------------- | ------- |
| activeKey  | currently selected item          | `string`                            | -       |
| items      | menu items                       | `{ key: string; tab: ReactNode }[]` | -       |
| onChange   | Callback for toggling menu items | `(activeKey)=>void`                 | -       |

#### TableDropdown

| Parameters     | Description                                                                   | Type        | Default |
| -------------- | ----------------------------------------------------------------------------- | ----------- | ------- |
| key            | Unique identifier                                                             | `string`    | -       |
| name           | Content                                                                       | `ReactNode` | -       |
| (...Menu.Item) | [Menu.Item](https://ant.design/components/menu-cn/#Menu.Item) from Ant Design | `Menu.Item` | -       |
