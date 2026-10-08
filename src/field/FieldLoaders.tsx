import type { ProFieldValueTypeInput } from '../utils/typing';
import { loadableField } from './internal/loadableField';

export const FieldCascader = loadableField(
  () => import('./components/Cascader'),
  (module) => module.default,
);
export const FieldCheckbox = loadableField(
  () => import('./components/Checkbox'),
  (module) => module.default,
);
export const FieldCode = loadableField(
  () => import('./components/Code'),
  (module) => module.default,
);
export const FieldColorPicker = loadableField(
  () => import('./components/ColorPicker'),
  (module) => module.default,
);
export const FieldDatePicker = loadableField(
  () => import('./components/DatePicker'),
  (module) => module.default,
);
export const FieldDigit = loadableField(
  () => import('./components/Digit'),
  (module) => module.default,
);
export const FieldDigitRange = loadableField(
  () => import('./components/DigitRange'),
  (module) => module.default,
);
export const FieldFromNow = loadableField(
  () => import('./components/FromNow'),
  (module) => module.default,
);
export const FieldImage = loadableField(
  () => import('./components/Image'),
  (module) => module.default,
);
export const FieldMoney = loadableField(
  () => import('./components/Money'),
  (module) => module.default,
);
export const FieldOptions = loadableField(
  () => import('./components/Options'),
  (module) => module.default,
);
export const FieldPassword = loadableField(
  () => import('./components/Password'),
  (module) => module.default,
);
export const FieldPercent = loadableField(
  () => import('./components/Percent'),
  (module) => module.default,
);
export const FieldProgress = loadableField(
  () => import('./components/Progress'),
  (module) => module.default,
);
export const FieldRadio = loadableField(
  () => import('./components/Radio'),
  (module) => module.default,
);
export const FieldRangePicker = loadableField(
  () => import('./components/RangePicker'),
  (module) => module.default,
);
export const FieldRate = loadableField(
  () => import('./components/Rate'),
  (module) => module.default,
);
export const FieldSecond = loadableField(
  () => import('./components/Second'),
  (module) => module.default,
);
export const FieldSegmented = loadableField(
  () => import('./components/Segmented'),
  (module) => module.default,
);
export const FieldSelect = loadableField(
  () => import('./components/Select'),
  (module) => module.default,
);
export const FieldSlider = loadableField(
  () => import('./components/Slider'),
  (module) => module.default,
);
export const FieldSwitch = loadableField(
  () => import('./components/Switch'),
  (module) => module.default,
);
export const FieldTextArea = loadableField(
  () => import('./components/TextArea'),
  (module) => module.default,
);
export const FieldTimePicker = loadableField(
  () => import('./components/TimePicker'),
  (module) => module.default,
);
export const FieldTimeRangePicker = loadableField(
  () => import('./components/TimePicker'),
  (module) => module.FieldTimeRangePicker,
);
export const FieldTreeSelect = loadableField(
  () => import('./components/TreeSelect'),
  (module) => module.default,
);

const byValueType: Record<string, { preload: () => Promise<void> }> = {
  money: FieldMoney,
  date: FieldDatePicker,
  dateWeek: FieldDatePicker,
  dateMonth: FieldDatePicker,
  dateQuarter: FieldDatePicker,
  dateYear: FieldDatePicker,
  dateTime: FieldDatePicker,
  dateRange: FieldRangePicker,
  dateWeekRange: FieldRangePicker,
  dateMonthRange: FieldRangePicker,
  dateQuarterRange: FieldRangePicker,
  dateYearRange: FieldRangePicker,
  dateTimeRange: FieldRangePicker,
  time: FieldTimePicker,
  timeRange: FieldTimeRangePicker,
  fromNow: FieldFromNow,
  progress: FieldProgress,
  percent: FieldPercent,
  code: FieldCode,
  jsonCode: FieldCode,
  textarea: FieldTextArea,
  digit: FieldDigit,
  digitRange: FieldDigitRange,
  second: FieldSecond,
  select: FieldSelect,
  checkbox: FieldCheckbox,
  radio: FieldRadio,
  radioButton: FieldRadio,
  rate: FieldRate,
  slider: FieldSlider,
  switch: FieldSwitch,
  option: FieldOptions,
  password: FieldPassword,
  image: FieldImage,
  cascader: FieldCascader,
  treeSelect: FieldTreeSelect,
  color: FieldColorPicker,
  segmented: FieldSegmented,
};

export function preloadProFieldValueType(valueType: ProFieldValueTypeInput) {
  const type = typeof valueType === 'object' ? valueType.type : valueType;
  return byValueType[type]?.preload() ?? Promise.resolve();
}

/** Useful for SSR and tests that require an entirely synchronous first render. */
export async function preloadAllProFieldValueTypes() {
  await Promise.all(
    [...new Set(Object.values(byValueType))].map((field) => field.preload()),
  );
}
