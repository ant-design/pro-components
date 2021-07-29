---
title: ProTable
order: 0
legacy: /table
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProTable - Advanced Tables

ProTable was created to solve the problem of having to write a lot of sample code for tables in a project, so a lot of common logic was encapsulated in it. These wrappers can be simply categorized as pre-defined behaviors and pre-defined logic.

Thanks to ProForm's capabilities, ProForm can take many forms, switch between query form types, set up deformations to become a simple Form form, perform new creation, etc.

## When to Use

When your forms need to interact with the server or need multiple cell styles, ProTable is the right choice.

## Code Demo

### Querying a table

<code src="./demos/single.tsx" background="#f5f5f5" height="500px" />

### DataSource

<code src="./demos/dataSource.tsx" background="#f5f5f5" height="500px"/>

### Downgrade to a normal table

<code src="./demos/normal.tsx" background="#f5f5f5" height="400px"/>

### Lightweight filter replacement query form

<code src="./demos/lightfilter.tsx" background="#f5f5f5" height="400px"/>

### Forms without ToolBar

<code src="./demos/no-title.tsx" height="350px"/>

### Nested tables

<code src="./demos/table-nested.tsx" background="#f5f5f5" height="400px"/>

### Left and right structure

<code src="./demos/split.tsx" background="#f5f5f5" height="500px"/>

### Batch manipulation of tables

<code src="./demos/batchOption.tsx" background="#f5f5f5" height="420px"/>

### Manipulating query forms with formRef

<code src="./demos/form.tsx" background="#f5f5f5" height="320px"/>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="./demos/rtl_table.tsx" background="#f5f5f5" height="500px"/>

### Controlled table settings columns

You can hide some columns by default, but in the action column you can select

<code src="./demos/columnsStateMap.tsx" background="#f5f5f5" height="300px"/>

### Tables polling network data

<code src="./demos/pollinga.tsx" background="#f5f5f5" height="360px"/>

### Search form customization

When the built-in form items don't meet our basic needs, we need to customize the default components, which we can use with `fieldProps` and `renderFormItem`.

`fieldProps` can pass the props through and set the select style and multi-select issues.

`renderFormItem` does the rewriting logic, passing in item and props for rendering, but note that we have to assign `value` and `onChange` to the props, otherwise the form won't get the parameters.

```tsx | pure
renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, . .rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status ! == 'open') {
    return <Input {... .fieldProps} placeholder="Please enter test" />;
  }
  return defaultRender(_);
};
```

The definition of `renderFormItem`, the exact value of which can be seen by opening the console.

```tsx | pure
 renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="./demos/linkage_form.tsx" background="#f5f5f5" height="310px"/>

### Form action customization

<code src="./demos/search_option.tsx" background="#f5f5f5" height="310px"/>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="./demos/listToolBar.tsx" background="#f5f5f5" height="450px"/>

### Required Inquiry Form

Try to use initialValue to solve the problem, required fields are more frustrating

<code src="./demos/open-rules.tsx"  height="350px"/>

### Form body customization

<code src="./demos/renderTable.tsx" background="#f5f5f5" height="500px"/>

### Internationalization-related configuration

ProTable has built-in support for internationalization, and as a component with a relatively small amount of text, we can implement internationalization ourselves at a low cost.

Here is the full amount of text

```typescript | pure
const enLocale = {
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: {
    clear: 'Clear',
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact',
  },
};

// Generate the intl object
const enUSIntl = createIntl('en_US', enUS);

// use
<IntlProvider value={enUSIntl}>
  <ProTable />
</IntlProvider>;
```

<code src="./demos/intl.tsx" background="#f5f5f5" height="320px"/>

### Table using self-contained keyWords search

<code src="./demos/search.tsx" background="#f5f5f5" height="200px"/>

### Value type examples

#### valueType - Date class

<code src="./demos/valueTypeDate.tsx" background="#f5f5f5" height="350px"/>

#### valueType - numeric class

<code src="./demos/valueTypeNumber.tsx" background="#f5f5f5" height="350px"/>

#### valueType - Style Classes

<code src="./demos/valueType.tsx" background="#f5f5f5" height="680px"/>

#### valueType - Selection Classes

<code src="./demos/valueType_select.tsx" background="#f5f5f5" heigh="462px"/>

<code src="./demos/config-provider.tsx" debug background="#f5f5f5" heigh="462px"/>

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
| search | Whether to display the search form, pass in the object for the search form configuration | `false` \| [SearchConfig](#search-search-form) | true |
| dateFormatter | Converts moment format data to a specific type, false does not convert | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | make some changes before searching | `(params:T)=>T` | - |
| onSizeChange | table size changed | `(size: 'default' \| 'middle' \| 'small') => void` | - |
| columnsStateMap | State enumeration for columns | `{key:{ show,fixed }}}` | - |
| onColumnsStateChange | columns state changed | `(props: {key:{ show,fixed }}}) => void` | - |
| type | pro-table type | `"form"` | - |
| form | configuration of antd form | [FormProps](https://ant.design/components/form/#API) | - |
| onSubmit | Triggered when the form is submitted | `(params: U) => void` | - |
| onReset | Triggered when resetting the form | `() => void` | - |
| columnEmptyText | display when empty, display when not set `-`, false to disable this function | `string` \| `false` | false |
| tableRender | Custom rendering table function | `(props,dom,domList:{ toolbar,alert,table}) => ReactNode` | - |
| toolbar | pass through `ListToolBar` configuration items | [ListToolBarProps](#listtoolbarprops) | - |
| tableExtraRender | Custom table body functions | `(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode;` | - |
| manualRequest | Whether or not the first request needs to be triggered manually, with `true` not hiding the search form | `boolean` | false |
| editable | Configuration for editable tables | [TableRowEditable<T>](#editable) | - |
| cardBordered | Borders for Table and Search outer Card components | `boolean \| {search?: boolean, table?: boolean}` | false |
| debounceTime | debounce time | `number` | 10 |

#### RecordCreator

| property | description | type | default |
| --- | --- | --- | --- |
| record | The row to be added, generally containing a unique key | `T` | `{}` |
| position | where the row should be added, at the beginning or at the end | `top` \| `bottom` | `bottom` |
| (... .buttonProps) | antd's [ButtonProps](https://ant.design/components/button/#API) | ButtonProps | - |

#### Search Search form

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| filterType | filterFormType | `'query'` \| `'light'` | `'query'` |
| searchText | the text of the query button | `string` | query |
| resetText | The text of the reset button | `string` | reset |
| submitText | the text of the submit button | `string` | submit |
| labelWidth | The width of the label | `'number'` \| `'auto'` | 80 |
| span | Configure the number of columns in the query form | `'number'` \| [`'ColConfig'`](#ColConfig) | defaultColConfig |
| className | The className of the search form | `string` | - |
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
| onCancel | Triggered when you cancel editing a line | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<boolean>` | - |
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

#### ActionRef manual trigger

Sometimes we want to manually trigger actions such as reload of a table, we can use actionRef, editable tables also provide some actions to help us achieve our needs faster.

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

// Refresh
ref.current.reload();

// Refresh and clear, page number will be reset too
ref.current.reloadAndRest();

// reset to default values
ref.current.reset();

// Clear the selected item
ref.current.clearSelected();

// Start editing
ref.current.startEditable(rowKey);

// end editing
ref.current.cancelEditable(rowKey);
```

### Columns column definition

> Requesting remote data is more complicated, see [here](/components/field#RemoteData) for details.

| Properties | Description | Type | Default |
| --- | --- | --- | --- | --- |
| title | is basically the same as in antd, but supports passing in a method | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - - |
| tooltip | will show an icon after the title, and hover to prompt for some information | string | - |
| renderText | similar to render for table, but must return string, if you just want to transform the enumeration, you can use [valueEnum](#valueEnum) | `(text: any,record: T,index: number, action: UseFetchDataAction<T>) => string` | - | render |
| render | similar to render of table, the first parameter becomes dom, and the fourth parameter action is added | `(text: ReactNode,record: T,index: number,action: UseFetchDataAction<T>) => string RequestData<T>>) => ReactNode \| ReactNode[]` | - |
| ellipsis | whether to auto-indent | `boolean` | - |
| copyable | whether to support copying | `boolean` | - |
| valueEnum | An enumeration of values that will be automatically transformed to treat the value as a key to retrieve the content to be displayed | [valueEnum](#valueenum) | - |
| valueType | the type of the value | [`valueType`](/components/schema) | `text` |
| hideInSearch | do not show this item in the query form | `boolean` | - |
| hideInTable | do not show this column in Table | `boolean` | - |
| hideInForm | Do not show this column in Form mode | `boolean` | - |
| filters | Filter menu item in table header, automatically generated with valueEnum when value is true | `boolean` \| `object[]` | false |
| onFilter | Filter form, use ProTable's own when true, turn off local filtering when false | `(value, record) => boolean` \| 'false' | false |
| order | Query the weight of the form, with the higher weight sorted first | `number` | - |
| renderFormItem | Render the input component of the query form | `(item,{ type, defaultRender, formItemProps, fieldProps, ...rest },form) => ReactNode` | - |
| fieldProps | The props of the query form that will be passed through to the form item | `{ [prop: string]: any }` | - |
| search | search-related configuration columns, false is hidden | `false` \| `{ transform: (value: any) => any }` | - |
| search.transform | The key of the transformed value, typically used for transforming event intervals | `(value: any) => any` | - |
| editable | Whether or not editable in the edit table, the function's arguments are the same as the table's render | `false` \| `(text: any, record: T,index: number) => boolean` | true |
| colSize | the number of cells occupied by a form item, `occupy= colSize*span`, `colSize` defaults to 1, `span` is 8, `span` is `form={{span:8}}` set globally | `number` | - |

### ValueType type

ProTable encapsulates some commonly used value types to reduce duplicate `render` operations, and configures a [valueType](components/schema) to display the data for formatting responses.

### Batch operations

Unlike antd, which requires `rowSelection` to be set to enable bulk operations, pro-table provides an alert to carry some information. You can customize it with `tableAlertRender` and `tableAlertOptionRender`. It can be turned off by setting or returning false.

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| tableAlertRender | Customize the information area on the left side of the bulk action toolbar, does not display when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |
| tableAlertOptionRender | Customize the options area on the right side of the bulk action toolbar, not shown when false | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |

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

#### Code Demo

<code src="./demos/ListToolBar/basic.tsx" background="#f0f2f5"/>

<code src="./demos/ListToolBar/no-title.tsx" background="#f0f2f5"/>

<code src="./demos/ListToolBar/multipleLine.tsx" background="#f0f2f5"/>

<code src="./demos/ListToolBar/tabs.tsx" background="#f0f2f5"/>

<code src="./demos/ListToolBar/menu.tsx" background="#f0f2f5"/>

#### ListToolBarProps

Toolbar configuration properties for lists and tables

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| title | title | `ReactNode` | - |
| subTitle | subTitle | `ReactNode` | - |
| description | description | `ReactNode` | - |
| search | query area | `ReactNode` \| `SearchProps` | - |
| actions | actions area | `ReactNode[]` | - |
| settings | settings area | `(ReactNode \| Setting)[]` | - |
| filter | The filter area, usually used with `LightFilter` | `ReactNode` | - |
| multipleLine | Whether to display multiple lines | `boolean` | `false` |
| menu | menu configuration | `ListToolBarMenu` | - |
| tabs | Tabs configuration, only valid if `multipleLine` is true | `ListToolBarTabs` | - |

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
| activeKey  | current value                | string                                | -          |
| items      | menu items                   | `{ key: string; label: ReactNode }[]` | -          |
| onChange   | Callback for switching menus | `(activeKey)=>void`                   | -          |

#### ListToolBarTabs

| parameters | description                      | type                                | default |
| ---------- | -------------------------------- | ----------------------------------- | ------- |
| activeKey  | currently selected item          | `string`                            | -       |
| items      | menu items                       | `{ key: string; tab: ReactNode }[]` | -       |
| onChange   | Callback for toggling menu items | `(activeKey)=>void`                 | -       |
