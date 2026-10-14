---
group: Field
title: ProField 原子组件
---

# ProField

> 该组件为内部组件，请勿直接使用。

原子信息组件，统一 ProForm、ProTable、ProList、Filter 等组件里面的字段定义。

## DEMO

### Issue 回归场景

<code src="../../demos/field/search-select-request.tsx" title="远程搜索：SearchSelect.request 与 showSearch.onSearch"></code>
<code src="../../demos/field/digit-affixes.tsx" title="数字前后缀：ProFormDigit.fieldProps"></code>
<code src="../../demos/field/mixed-value-enum.tsx" title="混合枚举：ProFormSelect.valueEnum"></code>
<code src="../../demos/field/controlled-tree-select.tsx" title="受控展开：ProFormTreeSelect.fieldProps.open"></code>
<code src="../../demos/field/readonly-empty-digit.tsx" title="只读空值：ProFormDigit.readonly"></code>

<code src="../../demos/field/value-types/field-text.tsx" title="文本：ProField.valueType=text"></code>
<code src="../../demos/field/value-types/field-textarea.tsx" title="文本域：valueType=textarea"></code>
<code src="../../demos/field/value-types/field-password.tsx" title="密码：valueType=password"></code>
<code src="../../demos/field/value-types/field-avatar.tsx" title="头像：valueType=avatar"></code>
<code src="../../demos/field/value-types/field-image.tsx" title="图片：valueType=image"></code>
<code src="../../demos/field/value-types/field-money.tsx" title="金额：valueType=money"></code>
<code src="../../demos/field/value-types/field-digit.tsx" title="数字：valueType=digit"></code>
<code src="../../demos/field/value-types/field-digit-range.tsx" title="数字范围：valueType=digitRange"></code>
<code src="../../demos/field/value-types/field-second.tsx" title="秒格式化：valueType=second"></code>
<code src="../../demos/field/value-types/field-percent.tsx" title="百分比：valueType=percent"></code>
<code src="../../demos/field/value-types/field-progress.tsx" title="进度条：valueType=progress"></code>
<code src="../../demos/field/value-types/field-rate.tsx" title="评分：valueType=rate"></code>
<code src="../../demos/field/value-types/field-slider.tsx" title="滑块：valueType=slider"></code>
<code src="../../demos/field/value-types/field-radio.tsx" title="单选：valueType=radio"></code>
<code src="../../demos/field/value-types/field-radio-button.tsx" title="按钮单选：valueType=radioButton"></code>
<code src="../../demos/field/value-types/field-checkbox.tsx" title="多选：valueType=checkbox"></code>
<code src="../../demos/field/value-types/field-switch.tsx" title="开关：valueType=switch"></code>
<code src="../../demos/field/value-types/field-segmented.tsx" title="分段选择：valueType=segmented"></code>
<code src="../../demos/field/value-types/field-color.tsx" title="颜色：valueType=color"></code>
<code src="../../demos/field/value-types/field-date.tsx" title="日期：valueType=date"></code>
<code src="../../demos/field/value-types/field-date-time.tsx" title="日期时间：valueType=dateTime"></code>
<code src="../../demos/field/value-types/field-date-week.tsx" title="周：valueType=dateWeek"></code>
<code src="../../demos/field/value-types/field-date-month.tsx" title="月：valueType=dateMonth"></code>
<code src="../../demos/field/value-types/field-date-quarter.tsx" title="季度：valueType=dateQuarter"></code>
<code src="../../demos/field/value-types/field-date-year.tsx" title="年：valueType=dateYear"></code>
<code src="../../demos/field/value-types/field-time.tsx" title="时间：valueType=time"></code>
<code src="../../demos/field/value-types/field-from-now.tsx" title="相对时间：valueType=fromNow"></code>
<code src="../../demos/field/value-types/field-date-range.tsx" title="日期范围：valueType=dateRange"></code>
<code src="../../demos/field/value-types/field-date-time-range.tsx" title="日期时间范围：valueType=dateTimeRange"></code>
<code src="../../demos/field/value-types/field-time-range.tsx" title="时间范围：valueType=timeRange"></code>
<code src="../../demos/field/value-types/field-date-week-range.tsx" title="周范围：valueType=dateWeekRange"></code>
<code src="../../demos/field/value-types/field-date-month-range.tsx" title="月范围：valueType=dateMonthRange"></code>
<code src="../../demos/field/value-types/field-date-quarter-range.tsx" title="季度范围：valueType=dateQuarterRange"></code>
<code src="../../demos/field/value-types/field-date-year-range.tsx" title="年范围：valueType=dateYearRange"></code>
<code src="../../demos/field/value-types/field-code.tsx" title="代码：valueType=code"></code>
<code src="../../demos/field/value-types/field-json-code.tsx" title="JSON：valueType=jsonCode"></code>
<code src="../../demos/field/value-types/field-select.tsx" title="下拉选择：valueType=select 与 valueEnum"></code>
<code src="../../demos/field/value-types/field-select-request.tsx" title="异步选项：ProField.request"></code>
<code src="../../demos/field/value-types/field-cascader.tsx" title="级联选择：valueType=cascader"></code>
<code src="../../demos/field/value-types/field-tree-select.tsx" title="树形选择：valueType=treeSelect"></code>
<code src="../../demos/field/value-types/field-percent-color.tsx" title="百分比颜色：valueType.showColor"></code>
<code src="../../demos/field/value-types/field-empty-text.tsx" title="空值文本：ProField.emptyText"></code>

<code src="../../demos/field/regressions/reg-disabled-text.tsx" title="禁用输入：ProField.fieldProps.disabled" debug></code>
<code src="../../demos/field/regressions/reg-disabled-color.tsx" title="禁用颜色：color.fieldProps.disabled" debug></code>
<code src="../../demos/field/regressions/reg-money-symbol.tsx" title="货币符号：money.fieldProps.customSymbol" debug></code>
<code src="../../demos/field/regressions/reg-money-popover.tsx" title="金额编辑气泡：ProField.numberPopoverRender" debug></code>
<code src="../../demos/field/regressions/reg-image-width.tsx" title="图片宽度：valueType.width" debug></code>
<code src="../../demos/field/regressions/reg-checkbox-label-in-value.tsx" title="带标签的多选值：checkbox labelInValue" debug></code>
<code src="../../demos/field/regressions/reg-select-opt-group.tsx" title="分组选项：ProField.request.optionType" debug></code>
<code src="../../demos/field/regressions/reg-cascader-request.tsx" title="异步级联：cascader.request" debug></code>
<code src="../../demos/field/regressions/reg-percent-symbol.tsx" title="负数符号：percent.showSymbol" debug></code>
<code src="../../demos/field/regressions/reg-empty-percent.tsx" title="空百分比：ProField.emptyText" debug></code>

<code src="../../demos/field/search-value.tsx" title="受控搜索词：fieldProps.searchValue" debug></code>

<code src="../../demos/field/search-value-autoClearSearchValue.tsx" title="自动清除搜索词：fieldProps.autoClearSearchValue" debug></code>

<code src="../../demos/field/field-tree-request.tsx" title="异步树节点：ProFormTreeSelect.request" debug></code>
<code src="../../demos/field/field-tree-field-names.tsx" title="树节点映射：fieldProps.fieldNames" debug></code>
<code src="../../demos/field/field-tree-search-value.tsx" title="受控树搜索：fieldProps.searchValue" debug></code>

<code src="../../demos/field/select-request.tsx" title="独立表单请求：ProFormSelect.request" debug></code>

<code src="../../demos/field/field-search-remote.tsx" title="输入时请求：ProFormSelect.request" debug></code>
<code src="../../demos/field/field-search-local.tsx" title="本地筛选：fetchDataOnSearch=false" debug></code>

## API

```typescript | pure
import   Field from '@ant-design/pro-field';

return <Field text="100" valueType="money" mode={state} />;
```

### 参数

| 参数           | 说明                                                           | 类型                                                                 | 默认值 |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ------ |
| text           | 需要格式化的值                                                 | `ReactNode \| ReactNode[] \| Record<string,any> \| Record<string,any>[]` | -  |
| valueType      | 格式化的类型                                                   | `ProFieldValueTypeInput`                                             | -      |
| mode           | 组件的模式                                                     | `read` \| `edit` \| `update`                                         | `read` |
| readonly       | 是否只读                                                       | `boolean`                                                            | -      |
| request        | 从服务器读取枚举                                               | `(params, props) => Promise<RequestOptionsType[]>`                   | -      |
| emptyText      | 空值时的展示                                                   | `ReactNode`                                                          | -      |
| formItemRender | 自定义 `mode=update \| edit` 下的 dom 表现，一般用于渲染编辑框 | `(text, props, dom) => JSX.Element`                                  | -      |
| render         | 自定义 `mode=read` 下的 dom 表现，只是单纯的表现形式           | `(text, props, dom) => JSX.Element`                                  | -      |
