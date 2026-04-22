import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { parseValueToDay } from '../../../utils';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string | number;
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  }>
>[0] & {
  finalFormat: string;
  format: string;
};

export function FieldTimePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, format, formItemRender, fieldProps, finalFormat } = props;
  const { value } = fieldProps;
  const dayValue = parseValueToDay(value, finalFormat) as dayjs.Dayjs;

  const dom = (
    <DatePicker.TimePicker
      ref={ref as React.Ref<any>}
      format={format}
      {...fieldProps}
      value={dayValue}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
