import { Avatar } from 'antd';
import React from 'react';
import type { ProFieldFCRenderProps, ProRenderFieldPropsType } from '../provider';
import type { ProFieldRequestData, ProFieldTextType, ProFieldValueObjectType, ProFieldValueType } from '../utils';
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
import FieldText from './components/Text';
import FieldTextArea from './components/TextArea';
import FieldTimePicker, { FieldTimeRangePicker } from './components/TimePicker';
import FieldTreeSelect from './components/TreeSelect';
import FieldHOC from './FieldHOC';

type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'placeholder'> &
  ProRenderFieldPropsType & {
    /** 从服务器读取选项 */
    request?: ProFieldRequestData;
    emptyText?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    [key: string]: any;
  };

/**
 * Render valueType object
 *
 * @param text String | number
 * @param valueType ProColumnsValueObjectType
 */
const defaultRenderTextByObject = (text: ProFieldTextType, valueType: ProFieldValueObjectType, props: RenderProps) => {
  const pickFormItemProps = pickProProps(props.fieldProps);
  if (valueType.type === 'progress') {
    return (
      <FieldProgress
        {...props}
        fieldProps={{
          status: valueType.status ? valueType.status : undefined,
          ...pickFormItemProps,
        }}
        text={text as number}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney
        locale={valueType.locale}
        {...props}
        fieldProps={pickFormItemProps}
        moneySymbol={valueType.moneySymbol}
        text={text as number}
      />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <FieldPercent
        {...props}
        fieldProps={pickFormItemProps}
        precision={valueType.precision}
        showColor={valueType.showColor}
        showSymbol={valueType.showSymbol}
        text={text as number}
      />
    );
  }

  if (valueType.type === 'image') {
    return <FieldImage {...props} text={text as string} width={valueType.width} />;
  }

  return text as React.ReactNode;
};

/**
 * 根据不同的类型来转化数值
 *
 * @param dataValue
 * @param valueType
 */
export const defaultRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): React.ReactNode => {
  const { mode = 'read', emptyText = '-' } = props;

  if (emptyText !== false && mode === 'read' && valueType !== 'option' && valueType !== 'switch') {
    if (typeof dataValue !== 'boolean' && typeof dataValue !== 'number' && !dataValue) {
      const { fieldProps, render } = props;
      if (render) {
        return render(dataValue, { mode, ...fieldProps }, <>{emptyText}</>);
      }
      return <>{emptyText}</>;
    }
  }

  delete props.emptyText;

  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(dataValue, valueType, props);
  }

  const customValueTypeConfig = valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    delete props.ref;
    if (mode === 'read') {
      return customValueTypeConfig.render?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
          mode: mode || 'read',
        },
        <>{dataValue}</>,
      );
    }
    if (mode === 'update' || mode === 'edit') {
      return customValueTypeConfig.formItemRender?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
        },
        <>{dataValue}</>,
      );
    }
  }

  /** 如果是金额的值 */
  if (valueType === 'money') {
    return <FieldMoney {...props} text={dataValue as number} />;
  }

  /** 如果是日期的值 */
  if (valueType === 'date') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM-DD" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是周的值 */
  if (valueType === 'dateWeek') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-wo" picker="week" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是周范围的值 */
  if (valueType === 'dateWeekRange') {
    const { fieldProps, ...otherProps } = props;
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{
            picker: 'week',
            ...fieldProps,
          }}
          format="YYYY-W"
          text={dataValue as string[]}
          {...otherProps}
        />
      </FieldHOC>
    );
  }

  /** 如果是月范围的值 */
  if (valueType === 'dateMonthRange') {
    const { fieldProps, ...otherProps } = props;
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{
            picker: 'month',
            ...fieldProps,
          }}
          format="YYYY-MM"
          text={dataValue as string[]}
          {...otherProps}
        />
      </FieldHOC>
    );
  }

  /** 如果是季范围的值 */
  if (valueType === 'dateQuarterRange') {
    const { fieldProps, ...otherProps } = props;
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{
            picker: 'quarter',
            ...fieldProps,
          }}
          format="YYYY-Q"
          text={dataValue as string[]}
          {...otherProps}
        />
      </FieldHOC>
    );
  }

  /** 如果是年范围的值 */
  if (valueType === 'dateYearRange') {
    const { fieldProps, ...otherProps } = props;
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          showTime
          fieldProps={{
            picker: 'year',
            ...fieldProps,
          }}
          format="YYYY"
          text={dataValue as string[]}
          {...otherProps}
        />
      </FieldHOC>
    );
  }

  /** 如果是月的值 */
  if (valueType === 'dateMonth') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-MM" picker="month" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是季度的值 */
  if (valueType === 'dateQuarter') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY-[Q]Q" picker="quarter" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是年的值 */
  if (valueType === 'dateYear') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker format="YYYY" picker="year" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是日期范围的值 */
  if (valueType === 'dateRange') {
    return <FieldRangePicker format="YYYY-MM-DD" text={dataValue as string[]} {...props} />;
  }

  /** 如果是日期加时间类型的值 */
  if (valueType === 'dateTime') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker showTime format="YYYY-MM-DD HH:mm:ss" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是日期加时间类型的值的值 */
  if (valueType === 'dateTimeRange') {
    // 值不存在的时候显示 "-"
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker showTime format="YYYY-MM-DD HH:mm:ss" text={dataValue as string[]} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'time') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimePicker format="HH:mm:ss" text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'timeRange') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimeRangePicker format="HH:mm:ss" text={dataValue as string[]} {...props} />
      </FieldHOC>
    );
  }

  if (valueType === 'fromNow') {
    return <FieldFromNow text={dataValue as string} {...props} />;
  }

  if (valueType === 'index') {
    return <FieldIndexColumn>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return <FieldIndexColumn border>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'progress') {
    return <FieldProgress {...props} text={dataValue as number} />;
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return <FieldPercent text={dataValue as number} {...props} />;
  }

  if (valueType === 'avatar' && typeof dataValue === 'string' && props.mode === 'read') {
    return <Avatar shape="circle" size={22} src={dataValue as string} />;
  }

  if (valueType === 'code') {
    return <FieldCode text={dataValue as string} {...props} />;
  }

  if (valueType === 'jsonCode') {
    return <FieldCode language="json" text={dataValue as string} {...props} />;
  }

  if (valueType === 'textarea') {
    return <FieldTextArea text={dataValue as string} {...props} />;
  }

  if (valueType === 'digit') {
    return <FieldDigit text={dataValue as number} {...props} />;
  }

  if (valueType === 'digitRange') {
    return <FieldDigitRange text={dataValue as number[]} {...props} />;
  }

  if (valueType === 'second') {
    return <FieldSecond text={dataValue as number} {...props} />;
  }

  if (valueType === 'select' || (valueType === 'text' && (props.valueEnum || props.request))) {
    return (
      <FieldHOC isLight={props.light}>
        <FieldSelect text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  if (valueType === 'checkbox') {
    return <FieldCheckbox text={dataValue as string} {...props} />;
  }

  if (valueType === 'radio') {
    return <FieldRadio text={dataValue as string} {...props} />;
  }

  if (valueType === 'radioButton') {
    return <FieldRadio radioType="button" text={dataValue as string} {...props} />;
  }

  if (valueType === 'rate') {
    return <FieldRate text={dataValue as string} {...props} />;
  }
  if (valueType === 'slider') {
    return <FieldSlider text={dataValue as string} {...props} />;
  }
  if (valueType === 'switch') {
    return <FieldSwitch text={dataValue as boolean} {...props} />;
  }

  if (valueType === 'option') {
    return <FieldOptions text={dataValue as React.ReactNode} {...props} />;
  }

  if (valueType === 'password') {
    return <FieldPassword text={dataValue as string} {...props} />;
  }

  if (valueType === 'image') {
    return <FieldImage text={dataValue as string} {...props} />;
  }
  if (valueType === 'cascader') {
    return <FieldCascader text={dataValue as string} {...props} />;
  }

  if (valueType === 'treeSelect') {
    return <FieldTreeSelect text={dataValue as string} {...props} />;
  }

  if (valueType === 'color') {
    return <FieldColorPicker text={dataValue as string} {...props} />;
  }

  if (valueType === 'segmented') {
    return <FieldSegmented text={dataValue as string} {...props} />;
  }

  return <FieldText text={dataValue as string} {...props} />;
};
