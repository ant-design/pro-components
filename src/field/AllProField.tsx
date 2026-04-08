import { Avatar } from 'antd';
import React from 'react';
import {
  pickProProps,
  type ProFieldTextType,
  type ProFieldValueObjectType,
  type ProFieldValueType,
} from '../utils';
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
import { wrapProFieldLight } from './internal/ProFieldLightWrapper';
import { createProField, type ProFieldRenderText } from './ProFieldCore';
import type { ProFieldRenderProps } from './types';

const defaultRenderTextByObject = (
  text: ProFieldTextType,
  valueType: ProFieldValueObjectType,
  props: ProFieldRenderProps,
) => {
  const pickFormItemProps = pickProProps(props.fieldProps);
  if (valueType.type === 'progress') {
    return (
      <FieldProgress
        {...props}
        text={text as number}
        fieldProps={{
          status: valueType.status ? valueType.status : undefined,
          ...pickFormItemProps,
        }}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney
        locale={valueType.locale}
        {...props}
        fieldProps={pickFormItemProps}
        text={text as number}
        moneySymbol={valueType.moneySymbol}
      />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <FieldPercent
        {...props}
        text={text as number}
        showSymbol={valueType.showSymbol}
        precision={valueType.precision}
        fieldProps={pickFormItemProps}
        showColor={valueType.showColor}
      />
    );
  }

  if (valueType.type === 'image') {
    return (
      <FieldImage {...props} text={text as string} width={valueType.width} />
    );
  }

  return text as React.ReactNode;
};

/** 内置 valueType 分支（读写共用，具体展示由子 Field 的 mode 决定） */
function renderDefaultValueTypeLeaf(
  dataValue: ProFieldTextType,
  valueType: ProFieldValueType,
  props: ProFieldRenderProps,
): React.ReactNode {
  /** 如果是金额的值 */
  if (valueType === 'money') {
    return <FieldMoney {...props} text={dataValue as number} />;
  }

  /** 如果是日期的值 */
  if (valueType === 'date') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY-MM-DD"
        {...props}
      />,
    );
  }

  /** 如果是周的值 */
  if (valueType === 'dateWeek') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY-wo"
        picker="week"
        {...props}
      />,
    );
  }

  /** 如果是周范围的值 */
  if (valueType === 'dateWeekRange') {
    const { fieldProps, ...otherProps } = props;
    return wrapProFieldLight(
      props.light,
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY-W"
        showTime
        fieldProps={{
          picker: 'week',
          ...fieldProps,
        }}
        {...otherProps}
      />,
    );
  }

  /** 如果是月范围的值 */
  if (valueType === 'dateMonthRange') {
    const { fieldProps, ...otherProps } = props;
    return wrapProFieldLight(
      props.light,
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY-MM"
        showTime
        fieldProps={{
          picker: 'month',
          ...fieldProps,
        }}
        {...otherProps}
      />,
    );
  }

  /** 如果是季范围的值 */
  if (valueType === 'dateQuarterRange') {
    const { fieldProps, ...otherProps } = props;
    return wrapProFieldLight(
      props.light,
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY-Q"
        showTime
        fieldProps={{
          picker: 'quarter',
          ...fieldProps,
        }}
        {...otherProps}
      />,
    );
  }

  /** 如果是年范围的值 */
  if (valueType === 'dateYearRange') {
    const { fieldProps, ...otherProps } = props;
    return wrapProFieldLight(
      props.light,
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY"
        showTime
        fieldProps={{
          picker: 'year',
          ...fieldProps,
        }}
        {...otherProps}
      />,
    );
  }

  /** 如果是月的值 */
  if (valueType === 'dateMonth') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY-MM"
        picker="month"
        {...props}
      />,
    );
  }

  /** 如果是季度的值 */
  if (valueType === 'dateQuarter') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY-[Q]Q"
        picker="quarter"
        {...props}
      />,
    );
  }

  /** 如果是年的值 */
  if (valueType === 'dateYear') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY"
        picker="year"
        {...props}
      />,
    );
  }

  /** 如果是日期范围的值 */
  if (valueType === 'dateRange') {
    return (
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY-MM-DD"
        {...props}
      />
    );
  }

  /** 如果是日期加时间类型的值 */
  if (valueType === 'dateTime') {
    return wrapProFieldLight(
      props.light,
      <FieldDatePicker
        text={dataValue as string}
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
      />,
    );
  }

  /** 如果是日期加时间类型的值的值 */
  if (valueType === 'dateTimeRange') {
    return wrapProFieldLight(
      props.light,
      <FieldRangePicker
        text={dataValue as string[]}
        format="YYYY-MM-DD HH:mm:ss"
        showTime
        {...props}
      />,
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'time') {
    return wrapProFieldLight(
      props.light,
      <FieldTimePicker
        text={dataValue as string}
        format="HH:mm:ss"
        {...props}
      />,
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'timeRange') {
    return wrapProFieldLight(
      props.light,
      <FieldTimeRangePicker
        text={dataValue as string[]}
        format="HH:mm:ss"
        {...props}
      />,
    );
  }

  if (valueType === 'fromNow') {
    return <FieldFromNow text={dataValue as string} {...props} />;
  }

  if (valueType === 'index') {
    return <FieldIndexColumn>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return (
      <FieldIndexColumn border>{(dataValue as number) + 1}</FieldIndexColumn>
    );
  }

  if (valueType === 'progress') {
    return <FieldProgress {...props} text={dataValue as number} />;
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return <FieldPercent text={dataValue as number} {...props} />;
  }

  if (
    valueType === 'avatar' &&
    typeof dataValue === 'string' &&
    props.mode === 'read'
  ) {
    return <Avatar src={dataValue as string} size={22} shape="circle" />;
  }

  if (valueType === 'code') {
    return <FieldCode text={dataValue as string} {...props} />;
  }

  if (valueType === 'jsonCode') {
    return <FieldCode text={dataValue as string} language="json" {...props} />;
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

  if (
    valueType === 'select' ||
    (valueType === 'text' && (props.valueEnum || props.request))
  ) {
    return wrapProFieldLight(
      props.light,
      <FieldSelect text={dataValue as string} {...props} />,
    );
  }

  if (valueType === 'checkbox') {
    return <FieldCheckbox text={dataValue as string} {...props} />;
  }

  if (valueType === 'radio') {
    return <FieldRadio text={dataValue as string} {...props} />;
  }

  if (valueType === 'radioButton') {
    return (
      <FieldRadio radioType="button" text={dataValue as string} {...props} />
    );
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
}

/** 只读：空值占位、context valueTypeMap 的 render、内置 valueType */
export const defaultRenderRead: ProFieldRenderText = (
  dataValue,
  valueType,
  props,
  valueTypeMap,
) => {
  const { mode = 'read', emptyText = '-' } = props;

  if (
    emptyText !== false &&
    mode === 'read' &&
    valueType !== 'option' &&
    valueType !== 'switch'
  ) {
    if (
      typeof dataValue !== 'boolean' &&
      typeof dataValue !== 'number' &&
      !dataValue
    ) {
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

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    delete props.ref;
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

  return renderDefaultValueTypeLeaf(
    dataValue,
    valueType as ProFieldValueType,
    props,
  );
};

/** 编辑：context valueTypeMap 的 formItemRender、内置 valueType */
export const defaultRenderEdit: ProFieldRenderText = (
  dataValue,
  valueType,
  props,
  valueTypeMap,
) => {
  delete props.emptyText;

  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(dataValue, valueType, props);
  }

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    delete props.ref;
    return customValueTypeConfig.formItemRender?.(
      dataValue,
      {
        text: dataValue as React.ReactNode,
        ...props,
      },
      <>{dataValue}</>,
    );
  }

  return renderDefaultValueTypeLeaf(
    dataValue,
    valueType as ProFieldValueType,
    props,
  );
};

/** 按 mode 调度（直接调用 defaultRenderText 时与旧行为一致） */
export const defaultRenderText: ProFieldRenderText = (
  dataValue,
  valueType,
  props,
  valueTypeMap,
) => {
  const m = props.mode ?? 'read';
  return m === 'edit' || m === 'update'
    ? defaultRenderEdit(dataValue, valueType, props, valueTypeMap)
    : defaultRenderRead(dataValue, valueType, props, valueTypeMap);
};

export const ProField = createProField(
  { renderRead: defaultRenderRead, renderEdit: defaultRenderEdit },
  {
    pickProPropsWithValueTypeMap: true,
  },
);
