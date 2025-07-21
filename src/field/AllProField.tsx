import { Avatar } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useContext } from 'react';
import type {
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '../provider';
import ProConfigContext from '../provider';
import {
  omitUndefined,
  pickProProps,
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueObjectType,
  ProFieldValueType,
  useDeepCompareMemo,
  useRefFunction,
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
import FieldHOC from './FieldHOC';
import { ProFieldPropsType } from './PureProField';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

/** 默认的 Field 需要实现的功能 */

export type ProFieldFC<T = {}> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldPropsType & T
>;

/** 轻量筛选的field属性 */
export type ProFieldLightProps = {
  // label和clear图标的ref
  lightLabel?: React.RefObject<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>;

  // 是否点击了label
  labelTrigger?: boolean;
};

/** Value type by function */
export type ProFieldValueTypeFunction<T> = (
  item: T,
) => ProFieldValueType | ProFieldValueObjectType;

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
const defaultRenderTextByObject = (
  text: ProFieldTextType,
  valueType: ProFieldValueObjectType,
  props: RenderProps,
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

  // eslint-disable-next-line no-param-reassign
  delete props.emptyText;

  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(dataValue, valueType, props);
  }

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    // eslint-disable-next-line no-param-reassign
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
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-MM-DD"
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是周的值 */
  if (valueType === 'dateWeek') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-wo"
          picker="week"
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是周范围的值 */
  if (valueType === 'dateWeekRange') {
    const { fieldProps, ...otherProps } = props;
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          text={dataValue as string[]}
          format="YYYY-W"
          showTime
          fieldProps={{
            picker: 'week',
            ...fieldProps,
          }}
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
          text={dataValue as string[]}
          format="YYYY-MM"
          showTime
          fieldProps={{
            picker: 'month',
            ...fieldProps,
          }}
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
          text={dataValue as string[]}
          format="YYYY-Q"
          showTime
          fieldProps={{
            picker: 'quarter',
            ...fieldProps,
          }}
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
          text={dataValue as string[]}
          format="YYYY"
          showTime
          fieldProps={{
            picker: 'year',
            ...fieldProps,
          }}
          {...otherProps}
        />
      </FieldHOC>
    );
  }

  /** 如果是月的值 */
  if (valueType === 'dateMonth') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-MM"
          picker="month"
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是季度的值 */
  if (valueType === 'dateQuarter') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-[Q]Q"
          picker="quarter"
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是年的值 */
  if (valueType === 'dateYear') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY"
          picker="year"
          {...props}
        />
      </FieldHOC>
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
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是日期加时间类型的值的值 */
  if (valueType === 'dateTimeRange') {
    // 值不存在的时候显示 "-"
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          text={dataValue as string[]}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'time') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimePicker
          text={dataValue as string}
          format="HH:mm:ss"
          {...props}
        />
      </FieldHOC>
    );
  }

  /** 如果是时间类型的值 */
  if (valueType === 'timeRange') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimeRangePicker
          text={dataValue as string[]}
          format="HH:mm:ss"
          {...props}
        />
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
};

const ProFieldComponent: React.ForwardRefRenderFunction<
  any,
  ProFieldPropsType
> = (
  {
    text,
    valueType = 'text',
    mode = 'read',
    onChange,
    formItemRender,
    value,
    readonly,
    fieldProps: restFieldProps,
    ...rest
  },
  ref: any,
) => {
  const context = useContext(ProConfigContext);

  const onChangeCallBack = useRefFunction((...restParams: any[]) => {
    restFieldProps?.onChange?.(...restParams);
    onChange?.(...restParams);
  });

  const fieldProps: any = useDeepCompareMemo(() => {
    return (
      (value !== undefined || restFieldProps) && {
        value,
        // fieldProps 优先级更高，在类似 LightFilter 场景下需要覆盖默认的 value 和 onChange
        ...omitUndefined(restFieldProps),
        onChange: onChangeCallBack,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, restFieldProps, onChangeCallBack]);

  const renderedDom = defaultRenderText(
    mode === 'edit'
      ? (fieldProps?.value ?? text ?? '')
      : (text ?? fieldProps?.value ?? ''),
    valueType || 'text',
    omitUndefined({
      ref,
      ...rest,
      mode: readonly ? 'read' : mode,
      formItemRender: formItemRender
        ? (curText: any, props: ProFieldFCRenderProps, dom: JSX.Element) => {
            const { placeholder: _placeholder, ...restProps } = props;
            const newDom = formItemRender(curText, restProps, dom);
            // formItemRender 之后的dom可能没有props，这里会帮忙注入一下
            if (React.isValidElement(newDom))
              return React.cloneElement(newDom, {
                ...fieldProps,
                ...((newDom.props as any) || {}),
              });
            return newDom;
          }
        : undefined,
      placeholder: formItemRender
        ? undefined
        : (rest?.placeholder ?? fieldProps?.placeholder),
      fieldProps: pickProProps(
        omitUndefined({
          ...fieldProps,
          placeholder: formItemRender
            ? undefined
            : (rest?.placeholder ?? fieldProps?.placeholder),
        }),
        Object.keys(context.valueTypeMap || {})?.includes(valueType as string),
      ),
    }),
    context.valueTypeMap || {},
  );

  return <React.Fragment>{renderedDom}</React.Fragment>;
};

export const ProField = React.forwardRef(
  ProFieldComponent,
) as typeof ProFieldComponent;
