import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { FieldLabel, parseValueToDay } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string[];
      format?: string;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
      showTime?: boolean;
      picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
    } & ProFieldLightProps
  >
>[0] & {
  format: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  intl: IntlType;
};

export function FieldRangePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    light,
    label,
    format,
    picker,
    formItemRender,
    showTime,
    lightLabel,
    variant: propsVariant,
    fieldProps,
    open,
    setOpen,
    intl,
  } = props;

  const dayValue = parseValueToDay(fieldProps.value) as dayjs.Dayjs[];
  const handleRangeChange = (value: any) => {
    fieldProps?.onChange?.(value);

    if (!value) {
      setOpen(false);
    }
  };

  let dom: React.ReactNode;
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
        disabled={fieldProps.disabled}
        value={
          dayValue || open ? (
            <DatePicker.RangePicker
              picker={picker}
              showTime={showTime}
              format={format}
              {...fieldProps}
              placeholder={
                fieldProps.placeholder ?? [
                  intl.getMessage('tableForm.selectPlaceholder', '请选择'),
                  intl.getMessage('tableForm.selectPlaceholder', '请选择'),
                ]
              }
              value={dayValue}
              onOpenChange={(isOpen) => {
                if (dayValue) setOpen(isOpen);
                fieldProps?.onOpenChange?.(isOpen);
              }}
              onChange={handleRangeChange}
            />
          ) : null
        }
        variant={propsVariant}
        allowClear={false}
        ref={lightLabel}
        downIcon={dayValue || open ? false : undefined}
      />
    );
  } else {
    dom = (
      <DatePicker.RangePicker
        ref={ref as React.Ref<any>}
        format={format}
        showTime={showTime}
        placeholder={[
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
        ]}
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
