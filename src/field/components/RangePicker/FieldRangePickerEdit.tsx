import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { parseValueToDay } from '../../../utils';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    showTime?: boolean;
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  }>
>[0] & {
  format: string;
  intl: IntlType;
};

export function FieldRangePickerEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode,
    format,
    picker,
    formItemRender,
    showTime,
    fieldProps,
    intl,
    variant: propsVariant,
  } = props;

  /** #8863:字符串值按 format 解析,避免非 ISO 格式(如 '23/3/2024')解析失败 */
  const parserFormat =
    typeof fieldProps.format === 'string' || Array.isArray(fieldProps.format)
      ? fieldProps.format
      : format;
  const dayValue = parseValueToDay(
    fieldProps.value,
    parserFormat,
  ) as dayjs.Dayjs[];

  const dom = (
    <DatePicker.RangePicker
      ref={ref as React.Ref<any>}
      picker={picker}
      format={format}
      showTime={showTime}
      placeholder={[
        intl.getMessage('tableForm.selectPlaceholder', '请选择'),
        intl.getMessage('tableForm.selectPlaceholder', '请选择'),
      ]}
      {...fieldProps}
      variant={propsVariant ?? fieldProps?.variant}
      value={dayValue}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
