---
group: Field
title: ProField Atomic Component
---

# ProField

> This component is an internal component, please do not use it directly.

It is an atomic information component that standardizes field definitions across components such as ProForm, ProTable, ProList, and Filter.

## DEMO

### Issue regression scenarios

<code src="../../demos/field/search-select-request.tsx" title="Remote search: SearchSelect.request and showSearch.onSearch"></code>
<code src="../../demos/field/digit-affixes.tsx" title="Number affixes: ProFormDigit.fieldProps"></code>
<code src="../../demos/field/mixed-value-enum.tsx" title="Mixed values: ProFormSelect.valueEnum"></code>
<code src="../../demos/field/controlled-tree-select.tsx" title="Controlled popup: ProFormTreeSelect.fieldProps.open"></code>
<code src="../../demos/field/readonly-empty-digit.tsx" title="Empty read-only value: ProFormDigit.readonly"></code>

<code src="../../demos/field/value-types/field-text.tsx" title="Text: ProField.valueType=text"></code>
<code src="../../demos/field/value-types/field-textarea.tsx" title="Text area: valueType=textarea"></code>
<code src="../../demos/field/value-types/field-password.tsx" title="Password: valueType=password"></code>
<code src="../../demos/field/value-types/field-avatar.tsx" title="Avatar: valueType=avatar"></code>
<code src="../../demos/field/value-types/field-image.tsx" title="Image: valueType=image"></code>
<code src="../../demos/field/value-types/field-money.tsx" title="Money: valueType=money"></code>
<code src="../../demos/field/value-types/field-digit.tsx" title="Number: valueType=digit"></code>
<code src="../../demos/field/value-types/field-digit-range.tsx" title="Number range: valueType=digitRange"></code>
<code src="../../demos/field/value-types/field-second.tsx" title="Seconds: valueType=second"></code>
<code src="../../demos/field/value-types/field-percent.tsx" title="Percent: valueType=percent"></code>
<code src="../../demos/field/value-types/field-progress.tsx" title="Progress: valueType=progress"></code>
<code src="../../demos/field/value-types/field-rate.tsx" title="Rating: valueType=rate"></code>
<code src="../../demos/field/value-types/field-slider.tsx" title="Slider: valueType=slider"></code>
<code src="../../demos/field/value-types/field-radio.tsx" title="Radio: valueType=radio"></code>
<code src="../../demos/field/value-types/field-radio-button.tsx" title="Button radio: valueType=radioButton"></code>
<code src="../../demos/field/value-types/field-checkbox.tsx" title="Checkbox: valueType=checkbox"></code>
<code src="../../demos/field/value-types/field-switch.tsx" title="Switch: valueType=switch"></code>
<code src="../../demos/field/value-types/field-segmented.tsx" title="Segmented: valueType=segmented"></code>
<code src="../../demos/field/value-types/field-color.tsx" title="Color: valueType=color"></code>
<code src="../../demos/field/value-types/field-date.tsx" title="Date: valueType=date"></code>
<code src="../../demos/field/value-types/field-date-time.tsx" title="Date time: valueType=dateTime"></code>
<code src="../../demos/field/value-types/field-date-week.tsx" title="Week: valueType=dateWeek"></code>
<code src="../../demos/field/value-types/field-date-month.tsx" title="Month: valueType=dateMonth"></code>
<code src="../../demos/field/value-types/field-date-quarter.tsx" title="Quarter: valueType=dateQuarter"></code>
<code src="../../demos/field/value-types/field-date-year.tsx" title="Year: valueType=dateYear"></code>
<code src="../../demos/field/value-types/field-time.tsx" title="Time: valueType=time"></code>
<code src="../../demos/field/value-types/field-from-now.tsx" title="Relative time: valueType=fromNow"></code>
<code src="../../demos/field/value-types/field-date-range.tsx" title="Date range: valueType=dateRange"></code>
<code src="../../demos/field/value-types/field-date-time-range.tsx" title="Date time range: valueType=dateTimeRange"></code>
<code src="../../demos/field/value-types/field-time-range.tsx" title="Time range: valueType=timeRange"></code>
<code src="../../demos/field/value-types/field-date-week-range.tsx" title="Week range: valueType=dateWeekRange"></code>
<code src="../../demos/field/value-types/field-date-month-range.tsx" title="Month range: valueType=dateMonthRange"></code>
<code src="../../demos/field/value-types/field-date-quarter-range.tsx" title="Quarter range: valueType=dateQuarterRange"></code>
<code src="../../demos/field/value-types/field-date-year-range.tsx" title="Year range: valueType=dateYearRange"></code>
<code src="../../demos/field/value-types/field-code.tsx" title="Code: valueType=code"></code>
<code src="../../demos/field/value-types/field-json-code.tsx" title="JSON: valueType=jsonCode"></code>
<code src="../../demos/field/value-types/field-select.tsx" title="Select: valueType=select and valueEnum"></code>
<code src="../../demos/field/value-types/field-select-request.tsx" title="Async options: ProField.request"></code>
<code src="../../demos/field/value-types/field-cascader.tsx" title="Cascader: valueType=cascader"></code>
<code src="../../demos/field/value-types/field-tree-select.tsx" title="Tree select: valueType=treeSelect"></code>
<code src="../../demos/field/value-types/field-percent-color.tsx" title="Percent color: valueType.showColor"></code>
<code src="../../demos/field/value-types/field-empty-text.tsx" title="Empty text: ProField.emptyText"></code>

<code src="../../demos/field/regressions/reg-disabled-text.tsx" title="Disabled input: ProField.fieldProps.disabled" debug></code>
<code src="../../demos/field/regressions/reg-disabled-color.tsx" title="Disabled color: color.fieldProps.disabled" debug></code>
<code src="../../demos/field/regressions/reg-money-symbol.tsx" title="Currency symbol: money.fieldProps.customSymbol" debug></code>
<code src="../../demos/field/regressions/reg-money-popover.tsx" title="Money popover: ProField.numberPopoverRender" debug></code>
<code src="../../demos/field/regressions/reg-image-width.tsx" title="Image width: valueType.width" debug></code>
<code src="../../demos/field/regressions/reg-checkbox-label-in-value.tsx" title="Labeled checkbox values: checkbox labelInValue" debug></code>
<code src="../../demos/field/regressions/reg-select-opt-group.tsx" title="Option groups: ProField.request.optionType" debug></code>
<code src="../../demos/field/regressions/reg-cascader-request.tsx" title="Async cascader: cascader.request" debug></code>
<code src="../../demos/field/regressions/reg-percent-symbol.tsx" title="Negative sign: percent.showSymbol" debug></code>
<code src="../../demos/field/regressions/reg-empty-percent.tsx" title="Empty percent: ProField.emptyText" debug></code>

<code src="../../demos/field/search-value.tsx" title="Controlled search: fieldProps.searchValue" debug></code>

<code src="../../demos/field/search-value-autoClearSearchValue.tsx" title="Clear search on selection: fieldProps.autoClearSearchValue" debug></code>

<code src="../../demos/field/field-tree-request.tsx" title="Async tree options: ProFormTreeSelect.request" debug></code>
<code src="../../demos/field/field-tree-field-names.tsx" title="Tree field mapping: fieldProps.fieldNames" debug></code>
<code src="../../demos/field/field-tree-search-value.tsx" title="Controlled tree search: fieldProps.searchValue" debug></code>

<code src="../../demos/field/select-request.tsx" title="Independent form requests: ProFormSelect.request" debug></code>

<code src="../../demos/field/field-search-remote.tsx" title="Fetch on search: ProFormSelect.request" debug></code>
<code src="../../demos/field/field-search-local.tsx" title="Local search: fetchDataOnSearch=false" debug></code>

## API

```typescript | pure
import   Field from '@ant-design/pro-field';

return <Field text="100" valueType="money" mode={state} />;
```

### Properties

| Parameters     | Description                                                                               | Type                                                                       | Default Value |
| -------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| text           | The value to be formatted                                                                 | `ReactNode \| ReactNode[] \| Record<string,any> \| Record<string,any>[]`  | -             |
| valueType      | The type of formatting                                                                    | `ProFieldValueTypeInput`                                                   | -             |
| mode           | The mode of the component                                                                 | `read` \| `edit` \| `update`                                               | `read`        |
| readonly       | Whether it is read-only                                                                   | `boolean`                                                                  | -             |
| request        | Read enum from remote server                                                              | `(params, props) => Promise<RequestOptionsType[]>`                         | -             |
| emptyText      | Display for empty values                                                                  | `ReactNode`                                                                | -             |
| formItemRender | Custom DOM rendering when `mode=update \| edit`, typically used for rendering input boxes | `(text, props, dom) => JSX.Element`                                        | -             |
| render         | Custom DOM rendering when `mode=read`, purely for display purposes                        | `(text, props, dom) => JSX.Element`                                        | -             |
