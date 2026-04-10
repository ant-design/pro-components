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

export function FieldDatePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    format,
    label,
    light,
    formItemRender,
    showTime,
    fieldProps,
    picker,
    lightLabel,
    variant,
    open,
    setOpen,
    intl,
  } = props;

  let dom: React.ReactNode;
  const {
    disabled,
    value,
    placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
  } = fieldProps;

  const dayValue = parseValueToDay(value) as dayjs.Dayjs;

  if (light) {
    dom = (
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
  } else {
    dom = (
      <DatePicker
        picker={picker}
        showTime={showTime}
        format={format}
        placeholder={placeholder}
        variant={variant}
        ref={ref as React.Ref<any>}
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
