import { Avatar } from 'antd';
import type { ReactNode } from 'react';
import { FieldText } from '.';
import { ProRenderFieldPropsType } from '../provider';
import { pickProProps } from '../utils';
import type { ProFieldBuiltinValueType } from '../utils/typing';
import FieldCascader from './components/Cascader';
import FieldCheckbox from './components/Checkbox';
import FieldCode from './components/Code';
import FieldColorPicker from './components/ColorPicker';
import FieldDatePicker from './components/DatePicker';
import FieldDigit from './components/Digit';
import FieldDigitRange from './components/DigitRange';
import FieldFromNow from './components/FromNow';
import FieldImage from './components/Image';
import FieldIndexColumn from './components/IndexColumn';
import FieldMoney from './components/Money';
import FieldOptions from './components/Options';
import FieldPassword from './components/Password';
import FieldPercent from './components/Percent';
import FieldProgress from './components/Progress';
import FieldRadio from './components/Radio';
import FieldRangePicker from './components/RangePicker';
import FieldRate from './components/Rate';
import FieldSecond from './components/Second';
import FieldSegmented from './components/Segmented';
import FieldSelect from './components/Select';
import FieldSlider from './components/Slider';
import FieldSwitch from './components/Switch';
import FieldTextArea from './components/TextArea';
import FieldTimePicker, { FieldTimeRangePicker } from './components/TimePicker';
import FieldTreeSelect from './components/TreeSelect';
import './initDayjs';
import { wrapProFieldLight } from './internal/ProFieldLightWrapper';

/**
 * Built-in valueTypes use identical JSX for `render` (read) and `formItemRender` (edit).
 * If a valueType needs different read vs edit behavior, use an explicit
 * `{ render, formItemRender }` object for that key instead.
 */
function sameRenderPair(
  fn: (text: any, props: any) => ReactNode,
): ProRenderFieldPropsType {
  return {
    render: fn as ProRenderFieldPropsType['render'],
    formItemRender: fn as ProRenderFieldPropsType['formItemRender'],
  };
}

/** 内置 valueType → render / formItemRender；键集合与 {@link ProFieldBuiltinValueType} 一致 */
const ValueTypeToComponentMap: Record<
  ProFieldBuiltinValueType,
  ProRenderFieldPropsType
> = {
  progress: sameRenderPair((text, props) => {
    const fieldProps = pickProProps(props.fieldProps);
    const placeholder =
      typeof props.placeholder === 'string' ? props.placeholder : undefined;
    return (
      <FieldProgress
        mode={props.mode}
        text={text}
        placeholder={placeholder}
        fieldProps={fieldProps}
      />
    );
  }),
  money: sameRenderPair((text, props) => {
    const fieldProps = pickProProps(props.fieldProps);
    const placeholder =
      typeof props.placeholder === 'string' ? props.placeholder : undefined;
    return (
      <FieldMoney
        mode={props.mode}
        text={text}
        placeholder={placeholder}
        fieldProps={fieldProps}
      />
    );
  }),
  percent: sameRenderPair((text, props) => {
    const fieldProps = pickProProps(props.fieldProps);
    const placeholder =
      typeof props.placeholder === 'string' ? props.placeholder : undefined;
    return (
      <FieldPercent
        mode={props.mode}
        text={text}
        placeholder={placeholder}
        fieldProps={fieldProps}
      />
    );
  }),
  image: sameRenderPair((text, props) => <FieldImage {...props} text={text} />),
  date: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker format="YYYY-MM-DD" {...props} text={text} />,
    ),
  ),
  dateWeek: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker format="YYYY-wo" picker="week" {...props} text={text} />,
    ),
  ),
  dateWeekRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldRangePicker
        format="YYYY-W"
        showTime
        fieldProps={{ picker: 'week', ...props.fieldProps }}
        {...props}
        text={text}
      />,
    ),
  ),
  dateMonthRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldRangePicker
        format="YYYY-MM"
        showTime
        fieldProps={{ picker: 'month', ...props.fieldProps }}
        {...props}
        text={text}
      />,
    ),
  ),
  dateQuarterRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldRangePicker
        format="YYYY-Q"
        showTime
        fieldProps={{ picker: 'quarter', ...props.fieldProps }}
        {...props}
        text={text}
      />,
    ),
  ),
  dateYearRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldRangePicker
        format="YYYY"
        showTime
        fieldProps={{ picker: 'year', ...props.fieldProps }}
        {...props}
        text={text}
      />,
    ),
  ),
  dateMonth: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker
        format="YYYY-MM"
        picker="month"
        {...props}
        text={text}
      />,
    ),
  ),
  dateQuarter: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker
        format="YYYY-[Q]Q"
        picker="quarter"
        {...props}
        text={text}
      />,
    ),
  ),
  dateYear: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker format="YYYY" picker="year" {...props} text={text} />,
    ),
  ),
  dateRange: sameRenderPair((text, props) => (
    <FieldRangePicker format="YYYY-MM-DD" {...props} text={text} />
  )),
  dateTime: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldDatePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
        text={text}
      />,
    ),
  ),
  dateTimeRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldRangePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
        text={text}
      />,
    ),
  ),
  time: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldTimePicker format="HH:mm:ss" {...props} text={text} />,
    ),
  ),
  timeRange: sameRenderPair((text, props) =>
    wrapProFieldLight(
      props.light,
      <FieldTimeRangePicker format="HH:mm:ss" {...props} text={text} />,
    ),
  ),
  fromNow: sameRenderPair((text, props) => (
    <FieldFromNow {...props} text={text} />
  )),
  index: sameRenderPair((text) => (
    <FieldIndexColumn>{(text as number) + 1}</FieldIndexColumn>
  )),
  indexBorder: sameRenderPair((text) => (
    <FieldIndexColumn border>{(text as number) + 1}</FieldIndexColumn>
  )),
  avatar: sameRenderPair((text) => (
    <Avatar src={text as string} size={22} shape="circle" />
  )),
  code: sameRenderPair((text, props) => <FieldCode {...props} text={text} />),
  jsonCode: sameRenderPair((text, props) => (
    <FieldCode language="json" {...props} text={text} />
  )),
  textarea: sameRenderPair((text, props) => (
    <FieldTextArea {...props} text={text} />
  )),
  digit: sameRenderPair((text, props) => {
    const fieldProps = pickProProps(props.fieldProps);
    const placeholder = Array.isArray(props.placeholder)
      ? props.placeholder[0]
      : typeof props.placeholder === 'string'
        ? props.placeholder
        : undefined;
    const textValue = typeof text === 'number' ? text : Number(text) || 0;
    return (
      <FieldDigit
        text={textValue}
        placeholder={placeholder}
        mode={props.mode}
        fieldProps={fieldProps}
      />
    );
  }),
  digitRange: sameRenderPair((text, props) => (
    <FieldDigitRange {...props} text={text} />
  )),
  second: sameRenderPair((text, props) => (
    <FieldSecond
      {...props}
      text={text}
      placeholder={props.placeholder as string}
    />
  )),
  select: sameRenderPair((text, props) =>
    wrapProFieldLight(props.light, <FieldSelect {...props} text={text} />),
  ),
  text: sameRenderPair((text, props) =>
    'valueEnum' in props ? (
      wrapProFieldLight(props.light, <FieldSelect {...props} text={text} />)
    ) : (
      <FieldText {...props} text={text as string} />
    ),
  ),
  checkbox: sameRenderPair((text, props) => (
    <FieldCheckbox {...props} text={text} />
  )),
  radio: sameRenderPair((text, props) => <FieldRadio {...props} text={text} />),
  radioButton: sameRenderPair((text, props) => (
    <FieldRadio radioType="button" {...props} text={text} />
  )),
  rate: sameRenderPair((text, props) => <FieldRate {...props} text={text} />),
  slider: sameRenderPair((text, props) => (
    <FieldSlider {...props} text={text} />
  )),
  switch: sameRenderPair((text, props) => (
    <FieldSwitch {...props} text={text} />
  )),
  option: sameRenderPair((text, props) => (
    <FieldOptions {...props} text={text} />
  )),
  password: sameRenderPair((text, props) => (
    <FieldPassword {...props} text={text} />
  )),
  cascader: sameRenderPair((text, props) => {
    const fieldProps = pickProProps(props.fieldProps);
    const placeholder =
      typeof props.placeholder === 'string' ? props.placeholder : undefined;
    return (
      <FieldCascader
        {...props}
        mode={props.mode}
        text={text}
        placeholder={placeholder}
        fieldProps={fieldProps}
      />
    );
  }),
  treeSelect: sameRenderPair((text, props) => (
    <FieldTreeSelect {...props} text={text} />
  )),
  color: sameRenderPair((text, props) => (
    <FieldColorPicker {...props} text={text} />
  )),
  segmented: sameRenderPair((text, props) => (
    <FieldSegmented {...props} text={text} />
  )),
};

export default ValueTypeToComponentMap;
