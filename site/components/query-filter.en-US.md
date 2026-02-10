---
title: Query/LightFilter
atomId: QueryFilter,LightFilter
group: Form
---

# QueryFilter / LightFilter

QueryFilter and LightFilter solve the problem of using the form with other components, such as Table, List, etc., and avoid complicated style settings. QueryFilter and LightFilter are supported by default in ProTable as their own filter forms.

### Query Filter

<code src="../../demos/form/QueryFilter/query-filter.tsx" ></code>

### Query filter - put away by default

<code src="../../demos/form/QueryFilter/query-filter-collapsed.tsx" ></code>

### query-filter-vertical-layout

<code src="../../demos/form/QueryFilter/query-filter-vertical.tsx" ></code>

### query-filter-search

<code src="../../demos/form/QueryFilter/search-filter.tsx" background="var(--main-bg-color)" ></code>

### query-filter-defaultFormItemsNumber

<code src="../../demos/form/QueryFilter/query-filter-defaultFormItemsNumber.tsx" background="var(--main-bg-color)"></code>

### Lightweight filtering

<code src="../../demos/form/QueryFilter/light-filter.tsx" ></code>

### Light filtering - border mode

<code src="../../demos/form/QueryFilter/light-filter-bordered.tsx" ></code>

### Light filtering - collapsed mode

All options in collapsed mode are collapsed by default, with or without values, and the control's `secondary` will no longer be valid.

<code src="../../demos/form/QueryFilter/light-filter-collapse.tsx" ></code>

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

| container-width breakpoint  | single-row display form single-column count (including action area) | default layout |
| -------------------------- | ------------------------------------------------------------------- | -------------- |
| `≧ 1200px`                 | 4 columns                                                           | `horizontal`   |
| `≧ 992px && < 1200px`      | 3 columns                                                           | `horizontal`   |
| `≧ 768px && < 992px`       | 3 columns                                                           | `horizontal`   |
| `≧ 576px && < 768px`       | 2 columns                                                           | `vertical`     |
| `< 576px`                  | 1 column                                                            | `vertical`     |

##### Rules when forcing top and bottom layout

| container width breakpoint  | single row display table single column count (including operation area) |
| -------------------------- | ----------------------------------------------------------------------- |
| `≧ 1200px`                 | 4 columns                                                               |
| `≧ 768px && < 1200px`      | 3 columns                                                               |
| `≧ 576px && < 768px`       | 2 columns                                                               |
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
