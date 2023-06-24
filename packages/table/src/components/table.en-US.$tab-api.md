---
title: Demo
order: 0
legacy: /table
---

## Code Demo

### Querying a table

<code src="../demos/single.tsx"  background="var(--main-bg-color)" ></code>

<code src="../demos/dataSource.tsx"  background="var(--main-bg-color)" debug></code>

### Downgrade to a normal table

<code src="../demos/normal.tsx"  background="var(--main-bg-color)" ></code>

### Lightweight filter replacement query form

<code src="../demos/lightfilter.tsx"  background="var(--main-bg-color)" ></code>

### Forms without ToolBar

<code src="../demos/no-title.tsx" ></code>

### Nested tables

<code src="../demos/table-nested.tsx"  background="var(--main-bg-color)" ></code>

### Left and right structure

<code src="../demos/split.tsx"  background="var(--main-bg-color)" ></code>

### Batch manipulation of tables

<code src="../demos/batchOption.tsx"  background="var(--main-bg-color)" ></code>

### Manipulating query forms with formRef

<code src="../demos/form.tsx"  background="var(--main-bg-color)" ></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../demos/rtl_table.tsx"  background="var(--main-bg-color)" ></code>

### Controlled table settings columns

You can hide some columns by default, but in the action column you can select

<code src="../demos/columnsStateMap.tsx"  background="var(--main-bg-color)" ></code>

### Tables polling network data

<code src="../demos/pollinga.tsx"  background="var(--main-bg-color)" ></code>

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

<code src="../demos/linkage_form.tsx"  background="var(--main-bg-color)" ></code>

### Form action customization

<code src="../demos/search_option.tsx"  background="var(--main-bg-color)" ></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="../demos/listToolBar.tsx"  background="var(--main-bg-color)" ></code>

### Required Inquiry Form

Try to use initialValue to solve the problem, required fields are more frustrating

<code src="../demos/open-rules.tsx" ></code>

### Form body customization

<code src="../demos/renderTable.tsx"  background="var(--main-bg-color)" ></code>

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
import { ConfigProvider } from '@ant-design/pro-provide';
// use
<ConfigProvider
  value={{
    intl: enUSIntl,
  }}
>
  <ProTable />
</ConfigProvider>;
```

<code src="../demos/intl.tsx"  background="var(--main-bg-color)" ></code>

### Table using self-contained keyWords search

<code src="../demos/search.tsx"  background="var(--main-bg-color)" ></code>

### Value type examples

#### valueType - Date class

<code src="../demos/valueTypeDate.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - numeric class

<code src="../demos/valueTypeNumber.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - Style Classes

<code src="../demos/valueType.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - Selection Classes

<code src="../demos/valueType_select.tsx"  background="var(--main-bg-color)" ></code>

<code src="../demos/config-provider.tsx" debug  background="var(--main-bg-color)" ></code>

## List ToolBar

<code src="../demos/ListToolBar/basic.tsx" background="var(--main-bg-color)" title="列表工具栏-基本使用"></code>

<code src="../demos/ListToolBar/no-title.tsx" background="var(--main-bg-color)" title="无标题" desc="列表工具栏-没有标题的情况下搜索框会前置。"></code>

<code src="../demos/ListToolBar/multipleLine.tsx" background="var(--main-bg-color)" title="双行布局" desc="列表工具栏-双行的情况下会有双行的布局形式。"></code>

<code src="../demos/ListToolBar/tabs.tsx" background="var(--main-bg-color)" title="带标签" desc="列表工具栏-标签需配合 `multipleLine` 为 `true` 时使用。"></code>

<code src="../demos/ListToolBar/menu.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单"></code>

#### TableDropdown

<code src="../demos/edittable-rules.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单" debug></code>
