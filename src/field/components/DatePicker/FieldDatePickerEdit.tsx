import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { parseValueToDay } from '../../../utils';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string | number;
    format?: string;
    showTime?: boolean;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  }>
>[0] & {
  format: string;
  intl: IntlType;
};

export function FieldDatePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    format,
    formItemRender,
    showTime,
    fieldProps,
    picker,
    variant,
    intl,
  } = props;

  const {
    disabled,
    value,
    placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
  } = fieldProps;

  const dayValue = parseValueToDay(value) as dayjs.Dayjs;

  const dom = (
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

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
