import { useIntl } from '@ant-design/pro-provider';
import {
  FieldLabel,
  compatibleBorder,
  parseValueToDay,
} from '@ant-design/pro-utils';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useState } from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../index';

// 兼容代码-----------
import 'antd/lib/date-picker/style';
//----------------------

dayjs.extend(weekOfYear);

const formatDate = (text: any, format: any) => {
  if (!text) return '-';
  if (typeof format === 'function') {
    return format(dayjs(text));
  } else {
    return dayjs(text).format(
      (Array.isArray(format) ? format[0] : format) || 'YYYY-MM-DD',
    );
  }
};

/**
 * 日期选择组件
 *
 * @param
 */
const FieldDatePicker: ProFieldFC<
  {
    text: string | number;
    format: string;
    showTime?: boolean;
    bordered?: boolean;
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    format,
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
    lightLabel,
  },
  ref,
) => {
  const intl = useIntl();

  const [open, setOpen] = useState<boolean>(false);

  if (mode === 'read') {
    const dom = formatDate(text, fieldProps.format || format);
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
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
                ref={ref}
                {...fieldProps}
                value={dayValue}
                onOpenChange={(isOpen) => {
                  setOpen(isOpen);
                  fieldProps?.onOpenChange?.(isOpen);
                }}
                {...compatibleBorder(false)}
                open={open}
              />
            ) : undefined
          }
          allowClear={false}
          downIcon={dayValue || open ? false : undefined}
          bordered={bordered}
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
          {...compatibleBorder(plain === undefined ? true : !plain)}
          ref={ref}
          {...fieldProps}
          value={dayValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};
export default React.forwardRef(FieldDatePicker);
