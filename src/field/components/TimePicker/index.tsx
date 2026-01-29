import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, parseValueToDay } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../PureProField';

/**
 * 时间选择组件
 *
 * @param
 */
const FieldTimePicker: ProFieldFC<
  {
    text: string | number;
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    light,
    label,
    format = 'HH:mm:ss',
    render,
    formItemRender,
    plain,
    fieldProps,
    lightLabel,
    variant,
  },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const intl = useIntl();
  const finalFormat = fieldProps?.format || format;

  const isNumberOrMoment = dayjs.isDayjs(text) || typeof text === 'number';

  if (mode === 'read') {
    const dom = (
      <span ref={ref}>
        {text
          ? dayjs(text, isNumberOrMoment ? undefined : finalFormat).format(
              finalFormat,
            )
          : '-'}
      </span>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const { disabled, value } = fieldProps;
    const dayValue = parseValueToDay(value, finalFormat) as dayjs.Dayjs;

    if (light) {
      dom = (
        <FieldLabel
          onClick={() => {
            fieldProps?.onOpenChange?.(true);
            setOpen(true);
          }}
          style={
            dayValue
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          label={label}
          disabled={disabled}
          variant={variant ?? fieldProps?.variant}
          value={
            dayValue || open ? (
              <TimePicker
                variant={variant ?? fieldProps?.variant}
                format={format}
                ref={ref}
                {...fieldProps}
                placeholder={
                  fieldProps.placeholder ??
                  intl.getMessage('tableForm.selectPlaceholder', '请选择')
                }
                value={dayValue}
                onOpenChange={(isOpen) => {
                  setOpen(isOpen);
                  fieldProps?.onOpenChange?.(isOpen);
                }}
                open={open}
              />
            ) : null
          }
          downIcon={dayValue || open ? false : undefined}
          allowClear={false}
          ref={lightLabel}
        />
      );
    } else {
      dom = (
        <DatePicker.TimePicker
          ref={ref}
          format={format}
          variant={
            plain === undefined ? 'outlined' : plain ? 'borderless' : 'outlined'
          }
          {...fieldProps}
          value={dayValue}
        />
      );
    }
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
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
const FieldTimeRangePickerComponents: ProFieldFC<
  {
    text: string[] | number[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  } & ProFieldLightProps
> = (
  {
    text,
    light,
    label,
    mode,
    lightLabel,
    format = 'HH:mm:ss',
    render,
    formItemRender,
    plain,
    fieldProps,
    variant,
  },
  ref,
) => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const finalFormat = fieldProps?.format || format;
  const [startText, endText] = Array.isArray(text) ? text : [];
  const startTextIsNumberOrMoment =
    dayjs.isDayjs(startText) || typeof startText === 'number';
  const endTextIsNumberOrMoment =
    dayjs.isDayjs(endText) || typeof endText === 'number';

  const parsedStartText: string = startText
    ? dayjs(
        startText,
        startTextIsNumberOrMoment ? undefined : finalFormat,
      ).format(finalFormat)
    : '';
  const parsedEndText: string = endText
    ? dayjs(endText, endTextIsNumberOrMoment ? undefined : finalFormat).format(
        finalFormat,
      )
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
    const dayValue = parseValueToDay(
      fieldProps.value,
      finalFormat,
    ) as dayjs.Dayjs[];
    let dom;
    if (light) {
      const {
        disabled,
        placeholder = [
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
        ],
      } = fieldProps;
      dom = (
        <FieldLabel
          onClick={() => {
            fieldProps?.onOpenChange?.(true);
            setOpen(true);
          }}
          style={
            dayValue
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          label={label}
          disabled={disabled}
          variant={variant ?? fieldProps?.variant}
          placeholder={placeholder}
          value={
            dayValue || open ? (
              <TimePicker.RangePicker
                variant={variant ?? fieldProps?.variant}
                format={format}
                ref={ref}
                {...fieldProps}
                placeholder={placeholder}
                value={dayValue}
                onOpenChange={(isOpen) => {
                  setOpen(isOpen);
                  fieldProps?.onOpenChange?.(isOpen);
                }}
                open={open}
              />
            ) : null
          }
          downIcon={dayValue || open ? false : undefined}
          allowClear={false}
          ref={lightLabel}
        />
      );
    } else {
      dom = (
        <TimePicker.RangePicker
          ref={ref}
          format={format}
          variant={
            plain === undefined ? variant : plain ? 'borderless' : 'outlined'
          }
          {...fieldProps}
          value={dayValue}
        />
      );
    }
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

const FieldTimeRangePicker = React.forwardRef(FieldTimeRangePickerComponents);

export { FieldTimeRangePicker };

export default React.forwardRef(FieldTimePicker);
