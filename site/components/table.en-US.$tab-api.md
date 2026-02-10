---
group: Table
title: Demos
order: 0
legacy: /table
---

## Code Demo

### Basic Usage

<code src="../../demos/table/single.tsx" background="var(--main-bg-color)" title="Query Table"></code>

<code src="../../demos/table/normal.tsx" background="var(--main-bg-color)" title="Table without Search Form"></code>

<code src="../../demos/table/dataSource.tsx" background="var(--main-bg-color)" title="Using DataSource" debug></code>

<code src="../../demos/table/no-title.tsx" id="no-title-table" background="var(--main-bg-color)" title="Table without ToolBar"></code>

### Search & Filter

<code src="../../demos/table/no-option.tsx" background="var(--main-bg-color)" title="Query Table (No Buttons)"></code>

<code src="../../demos/table/lightfilter.tsx" background="var(--main-bg-color)" title="Lightweight Filter"></code>

<code src="../../demos/table/search.tsx" background="var(--main-bg-color)" title="Built-in keyWords Search"></code>

<code src="../../demos/table/search_option.tsx" background="var(--main-bg-color)" title="Custom Search Options"></code>

<code src="../../demos/table/open-rules.tsx" background="var(--main-bg-color)" title="Required Query Form"></code>

Try to use initialValue to solve the problem, required fields are more frustrating.

### Search Form Customization

When the built-in form items don't meet our basic needs, we need to customize the default components, which we can use with `fieldProps` and `formItemRender`.

`fieldProps` can pass the props through and set the select style and multi-select issues.

`formItemRender` does the rewriting logic, passing in item and props for rendering, but note that we have to assign `value` and `onChange` to the props, otherwise the form won't get the parameters.

```tsx | pure
formItemRender: (
  _,
  { type, defaultRender, formItemProps, fieldProps, ...rest },
  form,
) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...fieldProps} placeholder="Please enter" />;
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

<code src="../../demos/table/linkage_form.tsx" background="var(--main-bg-color)" title="Dynamic Linkage Search"></code>

<code src="../../demos/table/form.tsx" background="var(--main-bg-color)" title="Manipulating Query Forms with formRef"></code>

### Table Features

<code src="../../demos/table/batchOption.tsx" background="var(--main-bg-color)" title="Batch Operations"></code>

<code src="../../demos/table/table-nested.tsx" background="var(--main-bg-color)" title="Nested Tables"></code>

<code src="../../demos/table/split.tsx" background="var(--main-bg-color)" title="Left-Right Structure"></code>

<code src="../../demos/table/pollinga.tsx" background="var(--main-bg-color)" title="Table Polling"></code>

<code src="../../demos/table/dateFormatter.tsx" background="var(--main-bg-color)" title="dateFormatter - Date Formatting"></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="../../demos/table/listToolBar.tsx" background="var(--main-bg-color)" title="Toolbar Customization"></code>

<code src="../../demos/table/renderTable.tsx" background="var(--main-bg-color)" title="Table Body Customization"></code>

### Card Table

<code src="../../demos/table/card-title.tsx" background="var(--main-bg-color)" desc="Use card title with actions on the left."></code>

### Value Type Examples

#### valueType - Date

<code src="../../demos/table/valueTypeDate.tsx" background="var(--main-bg-color)"></code>

#### valueType - Numeric

<code src="../../demos/table/valueTypeNumber.tsx" background="var(--main-bg-color)"></code>

#### valueType - Style

<code src="../../demos/table/valueType.tsx" background="var(--main-bg-color)"></code>

#### valueType - Selection

<code src="../../demos/table/valueType_select.tsx" background="var(--main-bg-color)"></code>

### Internationalization

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

import { ProProvider } from '@ant-design/pro-components';
const enUSIntl = createIntl('en_US', enUS);
const values = useContext(ProProvider)

// Usage
<ProProvider.Provider value={{ ...values, intl: enUSIntl }}>
  <ProTable />
</ProProvider.Provider>;
```

<code src="../../demos/table/intl.tsx" background="var(--main-bg-color)" title="Internationalization"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../demos/table/rtl_table.tsx" background="var(--main-bg-color)"></code>

### Theme

<code src="../../demos/table/theme.tsx" background="var(--main-bg-color)" iframe="550" title="Dark Theme / Compact Theme"></code>

### Custom Error Boundaries

<code src="../../demos/table/error-boundaries.tsx" background="var(--main-bg-color)" iframe="572"></code>

<code src="../../demos/table/error-boundaries-false.tsx" title="Disable Error Boundary" iframe="462"></code>

<code src="../../demos/table/config-provider.tsx" debug background="var(--main-bg-color)"></code>

## List ToolBar

<code src="../../demos/table/ListToolBar/basic.tsx" background="var(--main-bg-color)" title="Basic Usage"></code>

<code src="../../demos/table/ListToolBar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="No Title" desc="When no title is provided, the search bar is placed in front."></code>

<code src="../../demos/table/ListToolBar/multipleLine.tsx" background="var(--main-bg-color)" title="Double Row Layout" desc="Double row layout form."></code>

<code src="../../demos/table/ListToolBar/tabs.tsx" background="var(--main-bg-color)" title="With Tabs" desc="Tabs should be used with `multipleLine` set to `true`."></code>

<code src="../../demos/table/ListToolBar/menu.tsx" background="var(--main-bg-color)" title="Title Dropdown Menu"></code>

#### TableDropdown

<code src="../../demos/table/edittable-rules.tsx" background="var(--main-bg-color)" title="TableDropdown" debug></code>
