
import { Avatar } from 'antd';
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
import FieldHOC from './FieldHOC';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import dayjs from 'dayjs';
import { FieldText } from '.';
import { pickProProps } from '@ant-design/pro-utils';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
  
  
const ValueTypeToComponentMap: Record<string, ProRenderFieldPropsType> = {
  progress: {
    render: (text, props) => <FieldProgress
      {...props}
      text={text}
      fieldProps={{
        status: props.status ? props.status : undefined,
        ...pickProProps(props.fieldProps),
      }}
    />,
    formItemRender: (text, props) => <FieldProgress
      {...props}
      text={text}
      fieldProps={{
        status: props.status ? props.status : undefined,
        ...pickProProps(props.fieldProps),
      }}
    />,
  },
  money: {
    render: (text, props) => <FieldMoney
      {...props}
      text={text}
      fieldProps={{
        ...pickProProps(props.fieldProps),
      }}
    />,
    formItemRender: (text, props) => <FieldMoney
      {...props}
      text={text}
      fieldProps={{
        ...pickProProps(props.fieldProps),
      }}
    />,
  },
  percent: {
    render: (text, props) => <FieldPercent
      {...props}
      text={text}
      fieldProps={{
        ...pickProProps(props.fieldProps),
      }}
    />,
    formItemRender: (text, props) => <FieldPercent
      {...props}
      text={text}
      fieldProps={{
        ...pickProProps(props.fieldProps),
      }}
    />,
  },
  image: {
    render: (text, props) => <FieldImage {...props} text={text} />,
    formItemRender: (text, props) => <FieldImage {...props} text={text} />,
  },
  date: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM-DD" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM-DD" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateWeek: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-wo" picker="week" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-wo" picker="week" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateWeekRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-W" showTime fieldProps={{ picker: 'week', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-W" showTime fieldProps={{ picker: 'week', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateMonthRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-MM" showTime fieldProps={{ picker: 'month', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-MM" showTime fieldProps={{ picker: 'month', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateQuarterRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-Q" showTime fieldProps={{ picker: 'quarter', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-Q" showTime fieldProps={{ picker: 'quarter', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateYearRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY" showTime fieldProps={{ picker: 'year', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY" showTime fieldProps={{ picker: 'year', ...props.fieldProps }} {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateMonth: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM" picker="month" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM" picker="month" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateQuarter: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-[Q]Q" picker="quarter" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-[Q]Q" picker="quarter" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateYear: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY" picker="year" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY" picker="year" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateRange: {
    render: (text, props) => <FieldRangePicker format="YYYY-MM-DD" {...props} text={text} />,
    formItemRender: (text, props) => <FieldRangePicker format="YYYY-MM-DD" {...props} text={text} />,
  },
  dateTime: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM-DD HH:mm:ss" showTime {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM-DD HH:mm:ss" showTime {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateTimeRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-MM-DD HH:mm:ss" showTime {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker format="YYYY-MM-DD HH:mm:ss" showTime {...props} text={text} />
      </FieldHOC>
    ),
  },
  time: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldTimePicker format="HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldTimePicker format="HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
  },
  timeRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldTimeRangePicker format="HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldTimeRangePicker format="HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
  },
  fromNow: {
    render: (text, props) => <FieldFromNow {...props} text={text} />,
    formItemRender: (text, props) => <FieldFromNow {...props} text={text} />,
  },
  index: {
    render: (text) => <FieldIndexColumn>{(text as number) + 1}</FieldIndexColumn>,
    formItemRender: (text) => <FieldIndexColumn>{(text as number) + 1}</FieldIndexColumn>,
  },
  indexBorder: {
    render: (text) => <FieldIndexColumn border>{(text as number) + 1}</FieldIndexColumn>,
    formItemRender: (text) => <FieldIndexColumn border>{(text as number) + 1}</FieldIndexColumn>,
  },
  avatar: {
    render: (text) => <Avatar src={text as string} size={22} shape="circle" />,
    formItemRender: (text) => <Avatar src={text as string} size={22} shape="circle" />,
  },
  code: {
    render: (text, props) => <FieldCode {...props} text={text} />,
    formItemRender: (text, props) => <FieldCode {...props} text={text} />,
  },
  jsonCode: {
    render: (text, props) => <FieldCode language="json" {...props} text={text} />,
    formItemRender: (text, props) => <FieldCode language="json" {...props} text={text} />,
  },
  textarea: {
    render: (text, props) => <FieldTextArea {...props} text={text} />,
    formItemRender: (text, props) => <FieldTextArea {...props} text={text} />,
  },
  digit: {
    render: (text, props) => <FieldDigit {...props} text={text} />,
    formItemRender: (text, props) => <FieldDigit {...props} text={text} />,
  },
  digitRange: {
    render: (text, props) => <FieldDigitRange {...props} text={text} />,
    formItemRender: (text, props) => <FieldDigitRange {...props} text={text} />,
  },
  second: {
    render: (text, props) => <FieldSecond {...props} text={text} />,
    formItemRender: (text, props) => <FieldSecond {...props} text={text} />,
  },
  select: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldSelect {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldSelect {...props} text={text} />
      </FieldHOC>
    ),
  },
  text: {
    render: (text, props) => (
      (props.valueEnum || props.request)? 
      <FieldHOC isLight={props.light}>
        <FieldSelect {...props} text={text} />
      </FieldHOC>
      : <FieldText text={text as string} {...props} />
    ),
    formItemRender: (text, props) => (
      (props.valueEnum || props.request)? 
      <FieldHOC isLight={props.light}>
        <FieldSelect {...props} text={text} />
      </FieldHOC>
      : <FieldText text={text as string} {...props} />
    ),
  },
  checkbox: {
    render: (text, props) => <FieldCheckbox {...props} text={text} />,
    formItemRender: (text, props) => <FieldCheckbox {...props} text={text} />,
  },
  radio: {
    render: (text, props) => <FieldRadio {...props} text={text} />,
    formItemRender: (text, props) => <FieldRadio {...props} text={text} />,
  },
  radioButton: {
    render: (text, props) => <FieldRadio radioType="button" {...props} text={text} />,
    formItemRender: (text, props) => <FieldRadio radioType="button" {...props} text={text} />,
  },
  rate: {
    render: (text, props) => <FieldRate {...props} text={text} />,
    formItemRender: (text, props) => <FieldRate {...props} text={text} />,
  },
  slider: {
    render: (text, props) => <FieldSlider {...props} text={text} />,
    formItemRender: (text, props) => <FieldSlider {...props} text={text} />,
  },
  switch: {
    render: (text, props) => <FieldSwitch {...props} text={text} />,
    formItemRender: (text, props) => <FieldSwitch {...props} text={text} />,
  },
  option: {
    render: (text, props) => <FieldOptions {...props} text={text} />,
    formItemRender: (text, props) => <FieldOptions {...props} text={text} />,
  },
  password: {
    render: (text, props) => <FieldPassword {...props} text={text} />,
    formItemRender: (text, props) => <FieldPassword {...props} text={text} />,
  },
  cascader: {
    render: (text, props) => <FieldCascader {...props} text={text} />,
    formItemRender: (text, props) => <FieldCascader {...props} text={text} />,
  },
  treeSelect: {
    render: (text, props) => <FieldTreeSelect {...props} text={text} />,
    formItemRender: (text, props) => <FieldTreeSelect {...props} text={text} />,
  },
  color: {
    render: (text, props) => <FieldColorPicker {...props} text={text} />,
    formItemRender: (text, props) => <FieldColorPicker {...props} text={text} />,
  },
  segmented: {
    render: (text, props) => <FieldSegmented {...props} text={text} />,
    formItemRender: (text, props) => <FieldSegmented {...props} text={text} />,
  },
};

export default ValueTypeToComponentMap;