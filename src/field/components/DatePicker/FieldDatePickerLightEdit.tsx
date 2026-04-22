import { DatePicker } from 'antd';
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
      showTime?: boolean;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
      picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
    } & ProFieldLightProps
  >
>[0] & {
  format: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  intl: IntlType;
};

export function FieldDatePickerLightEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    format,
    label,
    formItemRender,
    showTime,
    fieldProps,
    picker,
    lightLabel,
    variant,
    open,
    setOpen,
  } = props;

  const { disabled, value } = fieldProps;

  const dayValue = parseValueToDay(value) as dayjs.Dayjs;

  const dom = (
    <FieldLabel
      label={label}
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
      disabled={disabled}
      value={
        dayValue || open ? (
          <DatePicker
            picker={picker}
            showTime={showTime}
            format={format}
            ref={ref as React.Ref<any>}
            {...fieldProps}
            value={dayValue}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              fieldProps?.onOpenChange?.(isOpen);
            }}
            open={open}
          />
        ) : undefined
      }
      allowClear={false}
      downIcon={dayValue || open ? false : undefined}
      variant={variant}
      ref={lightLabel}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
