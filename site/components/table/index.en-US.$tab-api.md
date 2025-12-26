---
group: Table
title: Demos
order: 0
legacy: /table
---

## Code Demo

### Querying a table

<code src="../../../demos/table/single.tsx"  background="var(--main-bg-color)" ></code>

<code src="../../../demos/table/dataSource.tsx"  background="var(--main-bg-color)" debug></code>

### Downgrade to a normal table

<code src="../../../demos/table/normal.tsx"  background="var(--main-bg-color)" ></code>

### Lightweight filter replacement query form

<code src="../../../demos/table/lightfilter.tsx"  background="var(--main-bg-color)" ></code>

### Forms without ToolBar

<code src="../../../demos/table/no-title.tsx" id="no-title-table" ></code>

### Nested tables

<code src="../../../demos/table/table-nested.tsx"  background="var(--main-bg-color)" ></code>

### Left and right structure

<code src="../../../demos/table/split.tsx"  background="var(--main-bg-color)" ></code>

### Batch manipulation of tables

<code src="../../../demos/table/batchOption.tsx"  background="var(--main-bg-color)" ></code>

### Manipulating query forms with formRef

<code src="../../../demos/table/form.tsx"  background="var(--main-bg-color)" ></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../../demos/table/rtl_table.tsx"  background="var(--main-bg-color)" ></code>

### Controlled table settings columns

You can hide some columns by default, but in the action column you can select

### Tables polling network data

<code src="../../../demos/table/pollinga.tsx"  background="var(--main-bg-color)" ></code>

### Search form customization

When the built-in form items don't meet our basic needs, we need to customize the default components, which we can use with `fieldProps` and `formItemRender`.

`fieldProps` can pass the props through and set the select style and multi-select issues.

`formItemRender` does the rewriting logic, passing in item and props for rendering, but note that we have to assign `value` and `onChange` to the props, otherwise the form won't get the parameters.

```tsx | pure
formItemRender: (_, { type, defaultRender, formItemProps, fieldProps, . .rest }, form) => {
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

The definition of `formItemRender`, the exact value of which can be seen by opening the console.

```tsx | pure
 formItemRender?: (
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

<code src="../../../demos/table/linkage_form.tsx"  background="var(--main-bg-color)" ></code>

### Form action customization

<code src="../../../demos/table/search_option.tsx"  background="var(--main-bg-color)" ></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="../../../demos/table/listToolBar.tsx"  background="var(--main-bg-color)" ></code>

### Required Inquiry Form

Try to use initialValue to solve the problem, required fields are more frustrating

<code src="../../../demos/table/open-rules.tsx" ></code>

### Form body customization

<code src="../../../demos/table/renderTable.tsx"  background="var(--main-bg-color)" ></code>

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

// Generate the intl objectimport { afterEach, describe, expect, it, vi } from 'vitest';
import   { ProProvider } from '@ant-design/pro-components';
const enUSIntl = createIntl('en_US', enUS);
const values = useContext(ProProvider)

// 使用
<ProProvider.Provider value={{ ...values, intl: enUSIntl }}>
  <ProTable />
</ProProvider.Provider>;
```

<code src="../../../demos/table/intl.tsx"  background="var(--main-bg-color)" ></code>

### Table using self-contained keyWords search

<code src="../../../demos/table/search.tsx"  background="var(--main-bg-color)" ></code>

### Value type examples

#### valueType - Date class

<code src="../../../demos/table/valueTypeDate.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - numeric class

<code src="../../../demos/table/valueTypeNumber.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - Style Classes

<code src="../../../demos/table/valueType.tsx"  background="var(--main-bg-color)" ></code>

#### valueType - Selection Classes

<code src="../../../demos/table/valueType_select.tsx"  background="var(--main-bg-color)" ></code>

<code src="../../../demos/table/config-provider.tsx" debug  background="var(--main-bg-color)" ></code>

## List ToolBar

<code src="../../../demos/table/ListToolBar/basic.tsx" background="var(--main-bg-color)" title="列表工具栏-基本使用"></code>

<code src="../../../demos/table/ListToolBar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="无标题" desc="列表工具栏-没有标题的情况下搜索框会前置。"></code>

<code src="../../../demos/table/ListToolBar/multipleLine.tsx" background="var(--main-bg-color)" title="双行布局" desc="列表工具栏-双行的情况下会有双行的布局形式。"></code>

<code src="../../../demos/table/ListToolBar/tabs.tsx" background="var(--main-bg-color)" title="带标签" desc="列表工具栏-标签需配合 `multipleLine` 为 `true` 时使用。"></code>

<code src="../../../demos/table/ListToolBar/menu.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单"></code>

#### TableDropdown

<code src="../../../demos/table/edittable-rules.tsx" background="var(--main-bg-color)" title="列表工具栏-标题下拉菜单" debug></code>
