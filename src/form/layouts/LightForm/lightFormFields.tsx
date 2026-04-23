import React from 'react';
import ProFormCascader from '../../components/Cascader';
import ProFormCheckbox from '../../components/Checkbox';
import ProFormDatePicker from '../../components/DatePicker';
import ProFormDateTimePicker from '../../components/DatePicker/DateTimePicker';
import ProFormTimePicker from '../../components/DatePicker/TimePicker';
import ProFormDateRangePicker from '../../components/DateRangePicker';
import { ProFormDateMonthRangePicker } from '../../components/DateRangePicker/DateMonthRangePicker';
import { ProFormDateQuarterRangePicker } from '../../components/DateRangePicker/DateQuarterRangePicker';
import { ProFormDateTimeRangePicker } from '../../components/DateRangePicker/DateTimeRangePicker';
import { ProFormDateWeekRangePicker } from '../../components/DateRangePicker/DateWeekRangePicker';
import { ProFormDateYearRangePicker } from '../../components/DateRangePicker/DateYearRangePicker';
import { ProFormTimeRangePicker } from '../../components/DateRangePicker/TimeRangePicker';
import ProFormDigit from '../../components/Digit';
import ProFormDigitRange from '../../components/Digit/DigitRange';
import ProFormFieldSet from '../../components/FieldSet';
import ProFormSelect from '../../components/Select';
import ProFormSlider from '../../components/Slider';
import ProFormSwitch from '../../components/Switch';
import ProFormText from '../../components/Text';
import ProFormTextArea from '../../components/TextArea';
import ProFormTreeSelect from '../../components/TreeSelect';

const createLightFormField = (Field: React.ComponentType<Record<string, any>>) => {
  const LightField = (props: Record<string, any>) => {
    const { proFieldProps, ...rest } = props;
    return <Field {...rest} proFieldProps={{ light: true, ...proFieldProps }} />;
  };
  LightField.displayName = 'LightFormField';
  return LightField;
};

/** 挂在 `LightForm` 上的轻量字段子组件（`LightForm.input` 等） */
export const lightFormFieldComponents = {
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
