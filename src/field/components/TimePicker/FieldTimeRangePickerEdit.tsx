import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { parseValueToDay } from '../../../utils';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string[] | number[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  }>
>[0] & {
  finalFormat: string;
  format: string;
};

export function FieldTimeRangePickerEdit(
  props: Props,
  ref: React.Ref<unknown>,
) {
  const { text, mode, format, formItemRender, fieldProps, variant, finalFormat } =
    props;

  const dayValue = parseValueToDay(
    fieldProps.value,
    finalFormat,
  ) as dayjs.Dayjs[];

  const dom = (
    <TimePicker.RangePicker
      ref={ref as React.Ref<any>}
      format={format}
      variant={variant}
      {...fieldProps}
      value={dayValue}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
