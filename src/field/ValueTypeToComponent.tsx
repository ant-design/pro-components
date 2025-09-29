import { Avatar } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { FieldText } from '.';
import type { ProRenderFieldPropsType } from '../provider';
import { pickProProps } from '../utils';
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

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

const ValueTypeToComponentMap: Record<string, ProRenderFieldPropsType> = {
  progress: {
    render: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldProgress fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
    formItemRender: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldProgress fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
  },
  money: {
    render: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldMoney fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
    formItemRender: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldMoney fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
  },
  percent: {
    render: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldPercent fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
    formItemRender: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return <FieldPercent fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />;
    },
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
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'week', ...props.fieldProps }}
          format="YYYY-W"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'week', ...props.fieldProps }}
          format="YYYY-W"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
  },
  dateMonthRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'month', ...props.fieldProps }}
          format="YYYY-MM"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'month', ...props.fieldProps }}
          format="YYYY-MM"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
  },
  dateQuarterRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'quarter', ...props.fieldProps }}
          format="YYYY-Q"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'quarter', ...props.fieldProps }}
          format="YYYY-Q"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
  },
  dateYearRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'year', ...props.fieldProps }}
          format="YYYY"
          {...props}
          text={text}
        />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{ picker: 'year', ...props.fieldProps }}
          format="YYYY"
          {...props}
          text={text}
        />
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
        <FieldDatePicker showTime format="YYYY-MM-DD HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker showTime format="YYYY-MM-DD HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
  },
  dateTimeRange: {
    render: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker showTime format="YYYY-MM-DD HH:mm:ss" {...props} text={text} />
      </FieldHOC>
    ),
    formItemRender: (text, props) => (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker showTime format="YYYY-MM-DD HH:mm:ss" {...props} text={text} />
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
    render: (text) => <Avatar shape="circle" size={22} src={text as string} />,
    formItemRender: (text) => <Avatar shape="circle" size={22} src={text as string} />,
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
    render: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = Array.isArray(props.placeholder)
        ? props.placeholder[0]
        : typeof props.placeholder === 'string'
          ? props.placeholder
          : undefined;
      const textValue = typeof text === 'number' ? text : Number(text) || 0;
      return <FieldDigit fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={textValue} />;
    },
    formItemRender: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = Array.isArray(props.placeholder)
        ? props.placeholder[0]
        : typeof props.placeholder === 'string'
          ? props.placeholder
          : undefined;
      const textValue = typeof text === 'number' ? text : Number(text) || 0;
      return <FieldDigit fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={textValue} />;
    },
  },
  digitRange: {
    render: (text, props) => <FieldDigitRange {...props} text={text} />,
    formItemRender: (text, props) => <FieldDigitRange {...props} text={text} />,
  },
  second: {
    render: (text, props) => <FieldSecond {...props} placeholder={props.placeholder as string} text={text} />,
    formItemRender: (text, props) => <FieldSecond {...props} placeholder={props.placeholder as string} text={text} />,
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
    render: (text, props) =>
      'valueEnum' in props ? (
        <FieldHOC isLight={props.light}>
          <FieldSelect {...props} text={text} />
        </FieldHOC>
      ) : (
        <FieldText {...props} text={text as string} />
      ),
    formItemRender: (text, props) =>
      'valueEnum' in props ? (
        <FieldHOC isLight={props.light}>
          <FieldSelect {...props} text={text} />
        </FieldHOC>
      ) : (
        <FieldText {...props} text={text as string} />
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
    render: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return (
        <FieldCascader {...props} fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />
      );
    },
    formItemRender: (text, props) => {
      const fieldProps = pickProProps(props.fieldProps);
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : undefined;
      return (
        <FieldCascader {...props} fieldProps={fieldProps} mode={props.mode} placeholder={placeholder} text={text} />
      );
    },
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
