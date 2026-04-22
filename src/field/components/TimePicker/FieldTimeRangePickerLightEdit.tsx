import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { FieldLabel, parseValueToDay } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string[] | number[];
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

export function FieldTimeRangePickerLightEdit(
  props: Props,
  ref: React.Ref<unknown>,
) {
  const {
    text,
    mode,
    label,
    format,
    formItemRender,
    fieldProps,
    variant,
    lightLabel,
    finalFormat,
    open,
    setOpen,
    intl,
  } = props;

  const dayValue = parseValueToDay(
    fieldProps.value,
    finalFormat,
  ) as dayjs.Dayjs[];

  const {
    disabled,
    placeholder = [
      intl.getMessage('tableForm.selectPlaceholder', '请选择'),
      intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    ],
  } = fieldProps;

  const dom = (
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
      variant={variant}
      placeholder={placeholder}
      value={
        dayValue || open ? (
          <TimePicker.RangePicker
            variant={variant ?? fieldProps?.variant}
            format={format}
            ref={ref as React.Ref<any>}
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

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
