---
title: Query/LightFilter
atomId: QueryFilter,LightFilter
nav:
  title: Components
---

# QueryFilter / LightFilter

QueryFilter and LightFilter solve the problem of using the form with other components, such as Table, List, etc., and avoid complicated style settings. QueryFilter and LightFilter are supported by default in ProTable as their own filter forms.

### Query Filter

<code src="./demos/query-filter.tsx" ></code>

### Query filter - put away by default

<code src="./demos/query-filter-collapsed.tsx" ></code>

### query-filter-vertical-layout

<code src="./demos/query-filter-vertical.tsx" ></code>

### query-filter-search

<code src="./demos/search-filter.tsx" background="var(--main-bg-color)" ></code>

### Lightweight filtering

<code src="./demos/light-filter.tsx" ></code>

### Light filtering - border mode

<code src="./demos/light-filter-bordered.tsx" ></code>

### Light filtering - collapsed mode

All options in collapsed mode are collapsed by default, with or without values, and the control's `secondary` will no longer be valid.

<code src="./demos/light-filter-collapse.tsx" ></code>

## API

### QueryFilter

QueryFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| collapsed | Whether or not to collapse out-of-bounds form items for controlled mode | `boolean` | - |
| defaultCollapsed | Whether or not to collapse out-of-order form items in default state | `boolean` | true |
| onCollapse | Callback when toggling the collapsed state of the form | `(collapsed)=>void` | - |
| hideRequiredMark | Hide the required markers for all form items, **hide by default** | `boolean` | true |
| submitterColSpanProps | Props of the col where the submit button is located. | ColProps | - |
| defaultColsNumber | The default number of controls to be displayed in the collapsed state, if not set or less than 0, one line of controls will be displayed; if the number is greater than or equal to the number of controls, the expand button will be hidden | `number` | - |
| labelWidth | label width | `number` \| `'auto'` | `98` |
| span | width of form items | `number[0 - 24]` | - |
| split | whether each line has a split line | `boolean` | - |
| preserve | If set to false, the form data will be lost after being put away | `boolean` | true |

#### Responsive Breakpoint Rules

Note that the values of the breakpoints are the size of the form container and not the viewport size.

##### Rules for default layout

| container-width breakpoint | single-row display form single-column count (including action area) | default layout |
| --- | --- | --- |
| `≧ 1352px` | 4 columns | `horizontal` |
| `≧ 1062px` | 3 columns | `horizontal` |
| `≧ 701px && < 1063px` | 3 columns | `horizontal` |
| `≧ 701px && < 1063px` | 3 columns | `horizontal` |
| `≧ 513px && < 701px` | 2 columns | `vertical` |
| `< 513px` | 1 column | `vertical` |

##### Rules when forcing top and bottom layout

| container width breakpoint | single row display table single column count (including operation area) |
| --- | --- |
| `≧ 1057px` | 4 columns |
| `≧ 785px && < 1057px` | 3 columns |
| `≧ 513px && < 785px` | 2 columns |
| < 513px\` | 1 column |

### LightFilter

LightFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| collapse | whether to collapse all fields by default | `boolean` | `false` |
| collapseLabel | label of collapsed area | `ReactNode` | `MoreFilter <DownOutlined/>` |
| placement | The position where the selection box pops up: `bottomLeft` `bottomRight` `topLeft` `topRight` | string | bottomLeft |
