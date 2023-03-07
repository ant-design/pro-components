import { FieldLabel, parseValueToDay } from '@ant-design/pro-utils';
import { ConfigProvider, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../index';

// 兼容代码-----------
import 'antd/es/date-picker/style';
import { useDatePickerStyle } from '../DatePicker';
//----------------------;

/**
 * 时间选择组件
 *
 * @param
 */
const FieldTimePicker: ProFieldFC<
  {
    text: string | number;
    format: string;
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    light,
    label,
    format,
    render,
    renderFormItem,
    plain,
    fieldProps,
    lightLabel,
    labelTrigger,
  },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const { componentSize } = ConfigProvider?.useConfig?.() || { componentSize: 'middle' };
  const size = componentSize;
  const { hashId, prefixCls, wrapSSR } = useDatePickerStyle();
  const finalFormat = fieldProps?.format || format || 'HH:mm:ss';

  const isNumberOrMoment = dayjs.isDayjs(text) || typeof text === 'number';

  if (mode === 'read') {
    const dom = (
      <span ref={ref}>
        {text ? dayjs(text, isNumberOrMoment ? undefined : finalFormat).format(finalFormat) : '-'}
      </span>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const { disabled, onChange, placeholder, allowClear, value } = fieldProps;
    const dayValue = parseValueToDay(value, finalFormat) as dayjs.Dayjs;
    if (light) {
      const valueStr: string = (dayValue && dayValue.format(finalFormat)) || '';
      dom = wrapSSR(
        <div
          className={`${prefixCls}-light ${hashId}`}
          onClick={(e) => {
            // 点击label切换下拉菜单
            const isLabelClick = lightLabel?.current?.labelRef?.current?.contains(
              e.target as HTMLElement,
            );
            if (isLabelClick) {
              setOpen(!open);
            } else {
              setOpen(true);
            }
          }}
        >
          <TimePicker
            value={dayValue}
            format={format}
            ref={ref}
            {...fieldProps}
            onChange={async (v) => {
              await onChange?.(v);
              await setOpen(false);
            }}
            onOpenChange={(isOpen) => {
              if (!labelTrigger) {
                setOpen(isOpen);
              }
            }}
            open={open}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            value={valueStr}
            allowClear={allowClear}
            onClear={() => onChange?.(null)}
            expanded={open}
            ref={lightLabel}
          />
        </div>,
      );
    } else {
      dom = (
        <DatePicker.TimePicker
          ref={ref}
          format={format}
          bordered={plain === undefined ? true : !plain}
          {...fieldProps}
          value={dayValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

/**
 * 时间区间选择
 *
 * @param param0
 * @param ref
 */
const FieldTimeRangePickerComponents: ProFieldFC<{
  text: string[] | number[];
  format: string;
}> = ({ text, mode, format, render, renderFormItem, plain, fieldProps }, ref) => {
  const finalFormat = fieldProps?.format || format || 'HH:mm:ss';
  const [startText, endText] = Array.isArray(text) ? text : [];
  const startTextIsNumberOrMoment = dayjs.isDayjs(startText) || typeof startText === 'number';
  const endTextIsNumberOrMoment = dayjs.isDayjs(endText) || typeof endText === 'number';

  const parsedStartText: string = startText
    ? dayjs(startText, startTextIsNumberOrMoment ? undefined : finalFormat).format(finalFormat)
    : '';
  const parsedEndText: string = endText
    ? dayjs(endText, endTextIsNumberOrMoment ? undefined : finalFormat).format(finalFormat)
    : '';

  if (mode === 'read') {
    const dom = (
      <div ref={ref}>
        <div>{parsedStartText || '-'}</div>
        <div>{parsedEndText || '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const { value } = fieldProps;
    const momentValue = parseValueToDay(value, finalFormat) as dayjs.Dayjs[];

    const dom = (
      <TimePicker.RangePicker
        ref={ref}
        format={format}
        bordered={plain === undefined ? true : !plain}
        {...fieldProps}
        value={momentValue}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

const FieldTimeRangePicker = React.forwardRef(FieldTimeRangePickerComponents);

export { FieldTimeRangePicker };

export default React.forwardRef(FieldTimePicker);
