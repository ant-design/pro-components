import React from 'react';
import ProFormCascader from '../Cascader';
import ProFormCheckbox from '../Checkbox';
import ProFormDatePicker from '../DatePicker';
import ProFormDateTimePicker from '../DatePicker/DateTimePicker';
import ProFormTimePicker from '../DatePicker/TimePicker';
import ProFormDateRangePicker from '../DateRangePicker';
import { ProFormDateMonthRangePicker } from '../DateRangePicker/DateMonthRangePicker';
import { ProFormDateQuarterRangePicker } from '../DateRangePicker/DateQuarterRangePicker';
import { ProFormDateTimeRangePicker } from '../DateRangePicker/DateTimeRangePicker';
import { ProFormDateWeekRangePicker } from '../DateRangePicker/DateWeekRangePicker';
import { ProFormDateYearRangePicker } from '../DateRangePicker/DateYearRangePicker';
import { ProFormTimeRangePicker } from '../DateRangePicker/TimeRangePicker';
import ProFormDigit from '../Digit';
import ProFormDigitRange from '../Digit/DigitRange';
import ProFormFieldSet from '../FieldSet';
import ProFormSelect from '../Select';
import ProFormSlider from '../Slider';
import ProFormSwitch from '../Switch';
import ProFormText from '../Text';
import ProFormTextArea from '../TextArea';
import ProFormTreeSelect from '../TreeSelect';

const createLightFormField = (Field: React.ComponentType<Record<string, any>>) => {
  const LightField = (props: Record<string, any>) => {
    const { proFieldProps, ...rest } = props;
    return <Field {...rest} proFieldProps={{ light: true, ...proFieldProps }} />;
  };
  LightField.displayName = 'LightFormField';
  return LightField;
};

/**
 * 显式启用 LightFilter 轻量样式：仅使用 `lightForm.xxx` 的表单项会进入轻量模式。
 * 放入 `LightFilter` 不再自动为子项设置 `proFieldProps.light`。
 */
export const lightForm = {
  input: createLightFormField(ProFormText),
  password: createLightFormField(ProFormText.Password),
  text: createLightFormField(ProFormText),
  textArea: createLightFormField(ProFormTextArea),
  select: createLightFormField(ProFormSelect),
  searchSelect: createLightFormField(ProFormSelect.SearchSelect),
  treeSelect: createLightFormField(ProFormTreeSelect),
  cascader: createLightFormField(ProFormCascader),
  digit: createLightFormField(ProFormDigit),
  digitRange: createLightFormField(ProFormDigitRange),
  slider: createLightFormField(ProFormSlider),
  date: createLightFormField(ProFormDatePicker),
  dateTime: createLightFormField(ProFormDateTimePicker),
  time: createLightFormField(ProFormTimePicker),
  timeRange: createLightFormField(ProFormTimeRangePicker),
  dateRange: createLightFormField(ProFormDateRangePicker),
  dateTimeRange: createLightFormField(ProFormDateTimeRangePicker),
  weekRange: createLightFormField(ProFormDateWeekRangePicker),
  monthRange: createLightFormField(ProFormDateMonthRangePicker),
  quarterRange: createLightFormField(ProFormDateQuarterRangePicker),
  yearRange: createLightFormField(ProFormDateYearRangePicker),
  timePickerRange: createLightFormField(ProFormTimePicker.RangePicker),
  checkboxGroup: createLightFormField(ProFormCheckbox.Group),
  fieldSet: createLightFormField(ProFormFieldSet),
  switch: createLightFormField(ProFormSwitch),
} as const;
