import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { FieldLabel, parseValueToDay } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string | number;
      format?: string;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    } & ProFieldLightProps
  >
>[0] & {
  finalFormat: string;
  format: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  intl: IntlType;
};

export function FieldTimePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    light,
    label,
    format,
    formItemRender,
    fieldProps,
    lightLabel,
    variant,
    finalFormat,
    open,
    setOpen,
    intl,
  } = props;
  const { disabled, value } = fieldProps;
  const dayValue = parseValueToDay(value, finalFormat) as dayjs.Dayjs;

  let dom: React.ReactNode;
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
              ref={ref as React.Ref<any>}
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
        ref={ref as React.Ref<any>}
        format={format}
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
