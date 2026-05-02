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

const createLightFilterField = (Field: React.ComponentType<Record<string, any>>) => {
  const FieldWrapper = (props: Record<string, any>) => {
    const { proFieldProps, ...rest } = props;
    return <Field {...rest} proFieldProps={{ light: true, ...proFieldProps }} />;
  };
  FieldWrapper.displayName = 'LightFilterField';
  return FieldWrapper;
};

/** 挂在 `LightFilter` 上的轻量字段（`LightFilter.input` 等） */
export const lightFilterFieldComponents = {
  input: createLightFilterField(ProFormText),
  password: createLightFilterField(ProFormText.Password),
  text: createLightFilterField(ProFormText),
  textArea: createLightFilterField(ProFormTextArea),
  select: createLightFilterField(ProFormSelect),
  searchSelect: createLightFilterField(ProFormSelect.SearchSelect),
  treeSelect: createLightFilterField(ProFormTreeSelect),
  cascader: createLightFilterField(ProFormCascader),
  digit: createLightFilterField(ProFormDigit),
  digitRange: createLightFilterField(ProFormDigitRange),
  slider: createLightFilterField(ProFormSlider),
  date: createLightFilterField(ProFormDatePicker),
  dateTime: createLightFilterField(ProFormDateTimePicker),
  time: createLightFilterField(ProFormTimePicker),
  timeRange: createLightFilterField(ProFormTimeRangePicker),
  dateRange: createLightFilterField(ProFormDateRangePicker),
  dateTimeRange: createLightFilterField(ProFormDateTimeRangePicker),
  weekRange: createLightFilterField(ProFormDateWeekRangePicker),
  monthRange: createLightFilterField(ProFormDateMonthRangePicker),
  quarterRange: createLightFilterField(ProFormDateQuarterRangePicker),
  yearRange: createLightFilterField(ProFormDateYearRangePicker),
  timePickerRange: createLightFilterField(ProFormTimePicker.RangePicker),
  checkboxGroup: createLightFilterField(ProFormCheckbox.Group),
  fieldSet: createLightFilterField(ProFormFieldSet),
  switch: createLightFilterField(ProFormSwitch),
} as const;
