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

<code src="../../demos/table/data-source.tsx" background="var(--main-bg-color)" title="Using dataSource"></code>

<code src="../../demos/table/no-title.tsx" id="no-title-table" background="var(--main-bg-color)" title="Table without ToolBar"></code>

### Search filter type switch

Use a segmented control to toggle `search.filterType` between the full query form (`query`) and lightweight filter (`light`).

<code src="../../demos/table/enum-filter-type.tsx" background="var(--main-bg-color)" title="Search filter type switch"></code>

### Search & Filter

<code src="../../demos/table/no-option.tsx" background="var(--main-bg-color)" title="Query Table (No Buttons)"></code>

<code src="../../demos/table/light-filter.tsx" background="var(--main-bg-color)" title="Lightweight Filter"></code>

`options.search=true` shows the toolbar search field; `request` filters services using its `keyWords` parameter.

<code src="../../demos/table/search.tsx" background="var(--main-bg-color)" title="keyWords: toolbar search"></code>

<code src="../../demos/table/search-option.tsx" background="var(--main-bg-color)" title="Custom Search Options"></code>

`form.ignoreRules=false` applies required rules to search fields. Search with an empty task name to see the validation message.

<code src="../../demos/table/open-rules.tsx" background="var(--main-bg-color)" title="ignoreRules=false: validate search"></code>

By default, the search form ignores required column rules and accepts an empty query.

<code src="../../demos/table/open-rules-default.tsx" background="var(--main-bg-color)" title="Default ignoreRules behavior"></code>

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

`columns.formItemRender` changes the detail input for month, week, or custom periods. Search parameters appear below the table.

<code src="../../demos/table/linkage-form.tsx" background="var(--main-bg-color)" title="Linked search fields"></code>

`formRef.current.setFieldsValue` fills the search field. Use the table's Query button to see the filtered result.

<code src="../../demos/table/form.tsx" background="var(--main-bg-color)" title="formRef: set a search value"></code>

`formRef.current.submit()` submits the search form from a button outside it.

<code src="../../demos/table/form-ref-submit.tsx" background="var(--main-bg-color)" title="formRef: submit search externally"></code>

#### Why you should not manually wire `value` / `onChange`

Fields wrapped by ProTable's search Form get `value` (or `valuePropName`) and `onChange` (or `trigger`) injected — the Form owns the synchronization. Practically:

- Do not rely on component `onChange` for aggregation (use Form `onValuesChange` instead). You may still subscribe to `onChange` when needed.
- Do not control values with raw `value` / `defaultValue` on widgets; defaults belong in Form `initialValues`. `initialValues` is not reactive — use `setFieldsValue`.
- Prefer `form.setFieldsValue` over scattering `useState`.

#### Why does `defaultValue` look ignored?

Child fields are switched to controlled mode, so standalone `defaultValue` will not behave as usual. Prefer Form `initialValues` (via `search.defaultCollapsed`/`form` configs as documented) or imperative updates through `formRef`.

### Table Features

<code src="../../demos/table/batch-option.tsx" background="var(--main-bg-color)" title="Batch Operations"></code>

Use `virtual` with `scroll.y` to render only visible rows in a large local data set.

<code src="../../demos/table/virtual.tsx" background="var(--main-bg-color)" title="Virtual scrolling"></code>

<code src="../../demos/table/table-nested.tsx" background="var(--main-bg-color)" title="Nested Tables"></code>

`rowSelection.fixed="start"` keeps the selection column on the left while the table scrolls horizontally. Select all or one row to see the selected IDs.

<code src="../../demos/table/fixed-selection-column.tsx" background="var(--main-bg-color)" title="rowSelection.fixed: fixed selection column"></code>

`onRow` selects a server and updates the detail table. The two sections stack on narrow screens.

<code src="../../demos/table/split.tsx" background="var(--main-bg-color)" title="Left-Right Structure"></code>

`polling={2000}` requests data every two seconds. Watch the request count, then stop and restart polling with the button.

<code src="../../demos/table/polling.tsx" background="var(--main-bg-color)" title="polling: start and stop refreshes"></code>

`dateFormatter` controls the date value passed to `request`. Each example displays the received value below the table. Change the deployment date and submit the search to compare formats.

<code src="../../demos/table/date-formatter.tsx" background="var(--main-bg-color)" title="dateFormatter: string"></code>

<code src="../../demos/table/date-formatter-number.tsx" background="var(--main-bg-color)" title="dateFormatter: millisecond timestamp"></code>

<code src="../../demos/table/date-formatter-custom.tsx" background="var(--main-bg-color)" title="dateFormatter: custom function"></code>

### Toolbar Customization

Configure toolbar rendering using the `toolbar` property extension.

<code src="../../demos/table/list-toolbar.tsx" background="var(--main-bg-color)" title="Toolbar filter: toolbar.filter"></code>

`tableRender` places a menu beside the table. Selecting a menu item filters the services.

<code src="../../demos/table/render-table.tsx" background="var(--main-bg-color)" title="Customize table body"></code>

`tableExtraRender` shows a summary of the current data above the table.

<code src="../../demos/table/table-extra-render.tsx" background="var(--main-bg-color)" title="Table data summary"></code>

### Card Table

For branded layouts you can bend the defaults: configure the outer card via `cardProps` (often `cardProps.title` for the heading) and put primary actions in `headerTitle` (see demo).

<code src="../../demos/table/card-title.tsx" background="var(--main-bg-color)" desc="Use card title with actions on the left."></code>

### Value Type Examples

#### valueType - Date

<code src="../../demos/table/value-types/date.tsx" title="valueType: date — Date"></code>
<code src="../../demos/table/value-types/date-time.tsx" title="valueType: dateTime — Date and time"></code>
<code src="../../demos/table/value-types/time.tsx" title="valueType: time — Time"></code>
<code src="../../demos/table/value-types/from-now.tsx" title="valueType: fromNow — Relative time"></code>
<code src="../../demos/table/value-types/date-range.tsx" title="valueType: dateRange — Date range"></code>
<code src="../../demos/table/value-types/date-time-range.tsx" title="valueType: dateTimeRange — Date and time range"></code>

#### valueType - Numeric

<code src="../../demos/table/value-types/money.tsx" title="valueType: money — Amount"></code>
<code src="../../demos/table/value-types/digit.tsx" title="valueType: digit — Request count"></code>
<code src="../../demos/table/value-types/second.tsx" title="valueType: second — Response time"></code>
<code src="../../demos/table/value-types/percent.tsx" title="valueType: percent — Completion rate"></code>
<code src="../../demos/table/value-types/progress.tsx" title="valueType: progress — Deployment progress"></code>
<code src="../../demos/table/value-types/progress-status.tsx" title="Dynamic progress status: valueType(row).status"></code>

#### valueType - Style

<code src="../../demos/table/value-types/index.tsx" title="valueType: index — index"></code>
<code src="../../demos/table/value-types/index-border.tsx" title="valueType: indexBorder — index-border"></code>
<code src="../../demos/table/value-types/code.tsx" title="valueType: code — Code"></code>
<code src="../../demos/table/value-types/avatar.tsx" title="valueType: avatar — avatar"></code>
<code src="../../demos/table/value-types/image.tsx" title="valueType: image — image"></code>
<code src="../../demos/table/value-types/option.tsx" title="Action column: valueType option"></code>

#### valueType - Selection

<code src="../../demos/table/value-types/select.tsx" title="valueType: select — Status"></code>
<code src="../../demos/table/value-types/radio.tsx" title="valueType: radio — Status"></code>
<code src="../../demos/table/value-types/radio-button.tsx" title="valueType: radioButton — Status"></code>
<code src="../../demos/table/value-types/checkbox.tsx" title="valueType: checkbox — Service tags"></code>
<code src="../../demos/table/value-types/cascader.tsx" title="valueType: cascader — Tech stack"></code>
<code src="../../demos/table/value-types/tree-select.tsx" title="valueType: treeSelect — Department"></code>

#### Custom valueType

`ProProvider.valueTypeMap.priority` uses `render` for the priority tag and `formItemRender` for the row editor. Edit, change the priority, and save to see the new value.

<code src="../../demos/table/customization-value-type.tsx" title="Custom editable priority" background="var(--main-bg-color)"></code>

### Internationalization

ProTable ships default strings for the toolbar/query area. Below is **the shape of messages** overridable through `createIntl`; the example below switches Chinese, English, and Japanese with antd `ConfigProvider.locale` so you can compare the search buttons.

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

<code src="../../demos/table/intl.tsx" background="var(--main-bg-color)" title="ConfigProvider.locale: switch table language"></code>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="../../demos/table/rtl-table.tsx" background="var(--main-bg-color)"></code>

### Theme

Set `ConfigProvider.theme.algorithm` to apply the dark or compact algorithm separately.

<code src="../../demos/table/theme.tsx" iframe="400" title="Dark theme"></code>

<code src="../../demos/table/theme-compact.tsx" iframe="400" title="Compact theme"></code>

### Custom Error Boundaries

Click “Trigger render error” to see the fallback supplied by `ErrorBoundary={CustomBoundary}`, then reset the table.

<code src="../../demos/table/error-boundaries.tsx" title="ErrorBoundary: custom fallback" background="var(--main-bg-color)" iframe="572"></code>

<code src="../../demos/table/error-boundaries-false.tsx" title="Disable Error Boundary" iframe="462"></code>

### ConfigProvider prefix

`ConfigProvider.prefixCls` sets the CSS class prefix for ProTable and its antd children.

<code src="../../demos/table/config-provider.tsx" title="Custom class prefix"></code>

<code src="../../demos/table/_single-test.tsx" debug background="var(--main-bg-color)"></code>

### Extra demos

Column state (`columnsState`), custom column-setting icon, and `contentWords`-style items.

<code src="../../demos/table/dynamic-columns-state.tsx" background="var(--main-bg-color)" title="Controlled columnsState"></code>

<code src="../../demos/table/columns-setting-custom-icon.tsx" background="var(--main-bg-color)" title="Custom column setting icon"></code>

<code src="../../demos/table/content-words-item.tsx" background="var(--main-bg-color)" title="Custom content search fields"></code>

## List ToolBar

Customize the table toolbar area.

### Examples

<code src="../../demos/table/list-toolbar/basic.tsx" background="var(--main-bg-color)" title="Toolbar title and subtitle"></code>

<code src="../../demos/table/list-toolbar/no-title.tsx" id="listToolBar-no-title" background="var(--main-bg-color)" title="Search without title: toolbar.search" desc="Without a title, the search input appears at the start of the toolbar."></code>

<code src="../../demos/table/list-toolbar/multiple-line.tsx" background="var(--main-bg-color)" title="Two-row layout: toolbar.multipleLine"></code>

<code src="../../demos/table/list-toolbar/tabs.tsx" background="var(--main-bg-color)" title="Tabs: toolbar.tabs" desc="Tabs are used with `multipleLine: true`."></code>

<code src="../../demos/table/list-toolbar/menu.tsx" background="var(--main-bg-color)" title="Menu: toolbar.menu"></code>

#### EditableProTable inside ProForm

<code src="../../demos/table/edit-table-rules.tsx" background="var(--main-bg-color)" title="Editable table with column validation in ProForm" debug></code>
