---
title: Query/LightFilter
atomId: QueryFilter,LightFilter
group: Form
---

# QueryFilter / LightFilter

QueryFilter and LightFilter solve the problem of using the form with other components, such as Table, List, etc., and avoid complicated style settings. QueryFilter and LightFilter are supported by default in ProTable as their own filter forms.

### Query Filter

<code src="../../demos/form/query-filter/query-filter.tsx" title="Basic Usage"></code>

<code src="../../demos/form/query-filter/_query-filter-test.tsx" title="Basic Usage (debug)" debug></code>

### Collapsed by default

<code src="../../demos/form/query-filter/query-filter-collapsed.tsx" title="QueryFilter — collapsed by default"></code>

### Vertical layout

<code src="../../demos/form/query-filter/query-filter-vertical.tsx" title="QueryFilter — vertical layout"></code>

### Search field

<code src="../../demos/form/query-filter/search-filter.tsx" background="var(--main-bg-color)" title="QueryFilter — search input"></code>

### Default visible field count

<code src="../../demos/form/query-filter/query-filter-default-form-items-number.tsx" background="var(--main-bg-color)" title="QueryFilter — default visible items (defaultFormItemsNumber)"></code>

<code src="../../demos/form/query-filter/query-filter-default-cols-number.tsx" background="var(--main-bg-color)" title="QueryFilter — default columns when collapsed"></code>

## Light Filter

<code src="../../demos/form/query-filter/light-filter.tsx" title="LightFilter — Basic"></code>

### Custom footer

<code src="../../demos/form/query-filter/light-filter-footer.tsx" title="LightFilter — custom footer"></code>

<code src="../../demos/form/query-filter/light-filter-bordered.tsx" title="LightFilter — border mode"></code>

### Collapsed overlay

All filters are collapsed initially regardless of value; field `secondary` is ignored while collapsed.

<code src="../../demos/form/query-filter/light-filter-collapse.tsx" title="LightFilter — collapsed mode"></code>

### Popover placement

Defaults to `bottomLeft`.

<code src="../../demos/form/query-filter/light-filter-placement.tsx" title="LightFilter — popover placement"></code>

## API

### QueryFilter

QueryFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters             | Description                                                                                                                                                            | Type                                                                                      | Default |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------- |
| collapsed              | Whether or not to collapse out-of-bounds form items for controlled mode                                                                                                | `boolean`                                                                                 | -       |
| defaultCollapsed       | Whether or not to collapse out-of-order form items in default state                                                                                                    | `boolean`                                                                                 | true    |
| onCollapse             | Callback when toggling the collapsed state of the form                                                                                                                 | `(collapsed)=>void`                                                                       | -       |
| submitterColSpanProps  | Props of the col where the submit button is located (must include `span`)                                                                                              | `Omit<ColProps, 'span'> & { span: number }`                                               | -       |
| defaultColsNumber      | The default number of form controls displayed in a collapsed state. Only one row of controls is displayed at most, and when exceeded, a collapse/hide button is shown. | `number`                                                                                  | -       |
| defaultFormItemsNumber | The difference from defaultColsNumber is that the specified number of controls will be displayed, and when exceeded, a collapse/hide button will be shown.             | `number`                                                                                  | -       |
| labelWidth             | Label width                                                                                                                                                            | `number` \| `'auto'`                                                                      | `80`    |
| span                   | Width of form items                                                                                                                                                    | `number` \| `{ xs: number; sm: number; md: number; lg: number; xl: number; xxl: number }` | -       |
| split                  | whether each line has a split line                                                                                                                                     | `boolean`                                                                                 | -       |
| preserve               | If set to false, the form data will be lost after being put away                                                                                                       | `boolean`                                                                                 | true    |

#### Responsive Breakpoint Rules

Note that the values of the breakpoints are the size of the form container and not the viewport size. Breakpoint configuration inherits from antd design tokens and is consistent with [Grid](https://ant.design/components/grid) responsive breakpoints.

##### Rules for default layout

Breakpoints use antd design tokens (xs=576, sm=768, md=992, lg=1200, xl=1600 by default):

| container-width breakpoint  | single-row display form single-column count (including action area) | default layout |
| -------------------------- | ------------------------------------------------------------------- | -------------- |
| `≧ 1600px`                 | 4 columns                                                           | `horizontal`   |
| `≧ 768px && < 1600px`      | 3 columns                                                           | `horizontal`   |
| `≧ 576px && < 768px`       | 2 columns                                                           | `vertical`     |
| `< 576px`                  | 1 column                                                            | `vertical`     |

##### Rules when forcing top and bottom layout

| container width breakpoint  | single row display table single column count (including operation area) |
| -------------------------- | ----------------------------------------------------------------------- |
| `≧ 1600px`                 | 4 columns                                                               |
| `≧ 992px && < 1600px`      | 3 columns                                                               |
| `≧ 576px && < 992px`       | 2 columns                                                               |
| `< 576px`                  | 1 column                                                                |

### LightFilter

LightFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters    | Description                                                                          | Type                                                                                                                        | Default                      |
| ------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| collapse      | Whether to collapse all fields by default                                            | `boolean`                                                                                                                   | `false`                      |
| collapseLabel | Label of collapsed area                                                              | `ReactNode`                                                                                                                 | `MoreFilter <DownOutlined/>` |
| variant       | Visual variant                                                                       | `'outlined' \| 'filled' \| 'borderless'`                                                                                    | -                            |
| ignoreRules   | Whether to ignore rules (rules are usually not recommended in LightFilter scenarios) | `boolean`                                                                                                                   | -                            |
| footerRender  | Footer content. Set to `false` to remove default footer buttons                      | `((onConfirm?: (e?: React.MouseEvent) => void, onClear?: (e?: React.MouseEvent) => void) => JSX.Element \| false) \| false` | -                            |
| popoverProps  | Pass-through props to inner Popover (collapsed overlay), e.g. `classNames`           | `Omit<PopoverProps, 'children' \| 'content' \| 'trigger' \| 'open' \| 'onOpenChange' \| 'placement'>`                       | -                            |
| placement     | The position where the selection box pops up                                         | `TooltipPlacement`                                                                                                          | `bottomLeft`                 |
