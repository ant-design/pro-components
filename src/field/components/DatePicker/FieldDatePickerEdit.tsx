import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { IntlType } from '../../../provider';
import { parseValueToDay } from '../../../utils/parseValueToMoment';
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
    disabled: _disabled,
    value,
    placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
  } = fieldProps;

  /**
   * #8863:字符串值需按 picker 的 format 解析,
   * 如 '23/3/2024' + format: 'DD/MM/YYYY',不传 formatter 时
   * dayjs 走 ISO 解析会得到 Invalid Date。
   */
  const dayValue = parseValueToDay(value, format) as dayjs.Dayjs;

  const dom = (
    <DatePicker
      picker={picker}
      showTime={showTime}
      format={format}
      placeholder={placeholder}
      ref={ref as React.Ref<any>}
      {...fieldProps}
      variant={variant ?? fieldProps?.variant}
      value={dayValue}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
