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

<code src="../../demos/table/data-source.tsx" background="var(--main-bg-color)" title="Using DataSource" debug></code>

<code src="../../demos/table/no-title.tsx" id="no-title-table" background="var(--main-bg-color)" title="Table without ToolBar"></code>

### Search filter type switch

Use a segmented control to toggle `search.filterType` between the full query form (`query`) and lightweight filter (`light`).

<code src="../../demos/table/enum-filter-type.tsx" background="var(--main-bg-color)" title="Search filter type switch"></code>

### Search & Filter

<code src="../../demos/table/no-option.tsx" background="var(--main-bg-color)" title="Query Table (No Buttons)"></code>

<code src="../../demos/table/light-filter.tsx" background="var(--main-bg-color)" title="Lightweight Filter"></code>

<code src="../../demos/table/search.tsx" background="var(--main-bg-color)" title="Built-in keyWords Search"></code>

<code src="../../demos/table/search-option.tsx" background="var(--main-bg-color)" title="Custom Search Options"></code>

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
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="../../demos/table/linkage-form.tsx" background="var(--main-bg-color)" title="Dynamic Linkage Search"></code>

<code src="../../demos/table/form.tsx" background="var(--main-bg-color)" title="Manipulating Query Forms with formRef"></code>

#### Why you should not manually wire `value` / `onChange`

Fields wrapped by ProTable's search Form get `value` (or `valuePropName`) and `onChange` (or `trigger`) injected — the Form owns the synchronization. Practically:

- Do not rely on component `onChange` for aggregation (use Form `onValuesChange` instead). You may still subscribe to `onChange` when needed.
- Do not control values with raw `value` / `defaultValue` on widgets; defaults belong in Form `initialValues`. `initialValues` is not reactive — use `setFieldsValue`.
- Prefer `form.setFieldsValue` over scattering `useState`.

#### Why does `defaultValue` look ignored?

Child fields are switched to controlled mode, so standalone `defaultValue` will not behave as usual. Prefer Form `initialValues` (via `search.defaultCollapsed`/`form` configs as documented) or imperative updates through `formRef`.

### Table Features

<code src="../../demos/table/batch-option.tsx" background="var(--main-bg-color)" title="Batch Operations"></code>

<code src="../../demos/table/table-nested.tsx" background="var(--main-bg-color)" title="Nested Tables"></code>

<code src="../../demos/table/split.tsx" background="var(--main-bg-color)" title="Left-Right Structure"></code>

<code src="../../demos/table/polling.tsx" background="var(--main-bg-color)" title="Table Polling"></code>

<code src="../../demos/table/date-formatter.tsx" background="var(--main-bg-color)" title="dateFormatter - Date Formatting"></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="../../demos/table/list-toolbar.tsx" background="var(--main-bg-color)" title="Toolbar Customization"></code>

<code src="../../demos/table/render-table.tsx" background="var(--main-bg-color)" title="Table Body Customization"></code>

### Card Table

For branded layouts you can bend the defaults: configure the outer card via `cardProps` (often `cardProps.title` for the heading) and put primary actions in `headerTitle` (see demo).

<code src="../../demos/table/card-title.tsx" background="var(--main-bg-color)" desc="Use card title with actions on the left."></code>

### Value Type Examples

#### valueType - Date

<code src="../../demos/table/value-type-date.tsx" background="var(--main-bg-color)"></code>

#### valueType - Numeric

<code src="../../demos/table/value-type-number.tsx" background="var(--main-bg-color)"></code>

#### valueType - Style

<code src="../../demos/table/value-type.tsx" background="var(--main-bg-color)"></code>

#### valueType - Selection

<code src="../../demos/table/value-type-select.tsx" background="var(--main-bg-color)"></code>

#### Custom valueType

<code src="../../demos/table/customization-value-type.tsx" background="var(--main-bg-color)"></code>

### Internationalization

ProTable ships default strings for the toolbar/query area. Below is **the shape of messages** overridable through `createIntl`; pair it with antd `ConfigProvider` locale exactly as shown in `intl.tsx`.

```typescript | pure
export const proTableIntlShape = {
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: { clear: 'Clear' },
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
```

<code src="../../demos/table/intl.tsx" background="var(--main-bg-color)" title="Internationalization"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../demos/table/rtl-table.tsx" background="var(--main-bg-color)"></code>

### Theme

<code src="../../demos/table/theme.tsx" background="var(--main-bg-color)" iframe="550" title="Dark Theme / Compact Theme"></code>

### Custom Error Boundaries

<code src="../../demos/table/error-boundaries.tsx" background="var(--main-bg-color)" iframe="572"></code>

<code src="../../demos/table/error-boundaries-false.tsx" title="Disable Error Boundary" iframe="462"></code>

<code src="../../demos/table/config-provider.tsx" debug background="var(--main-bg-color)"></code>

<code src="../../demos/table/_single-test.tsx" debug background="var(--main-bg-color)"></code>

### Extra demos

Column state (`columnsState`), custom column-setting icon, and `contentWords`-style items.

<code src="../../demos/table/dynamic-columns-state.tsx" background="var(--main-bg-color)" title="Controlled columnsState"></code>

<code src="../../demos/table/columns-setting-custom-icon.tsx" background="var(--main-bg-color)" title="Custom column setting icon"></code>

<code src="../../demos/table/content-words-item.tsx" background="var(--main-bg-color)" title="Custom content search fields"></code>

## List ToolBar

Customize the table toolbar area.

### Examples

<code src="../../demos/table/list-toolbar/basic.tsx" background="var(--main-bg-color)" title="Basic Usage"></code>

<code src="../../demos/table/list-toolbar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="No Title" desc="When no title is provided, the search bar is placed in front."></code>

<code src="../../demos/table/list-toolbar/multiple-line.tsx" background="var(--main-bg-color)" title="Double Row Layout" desc="Double row layout form."></code>

<code src="../../demos/table/list-toolbar/tabs.tsx" background="var(--main-bg-color)" title="With Tabs" desc="Tabs should be used with `multipleLine` set to `true`."></code>

<code src="../../demos/table/list-toolbar/menu.tsx" background="var(--main-bg-color)" title="Title Dropdown Menu"></code>

#### EditableProTable inside ProForm

<code src="../../demos/table/edit-table-rules.tsx" background="var(--main-bg-color)" title="Editable table with column validation in ProForm" debug></code>
