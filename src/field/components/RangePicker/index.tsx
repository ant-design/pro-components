import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC, ProFieldLightProps } from '../../types';
import { FieldRangePickerEdit } from './FieldRangePickerEdit';
import { FieldRangePickerRead } from './FieldRangePickerRead';

/**
 * 日期范围选择组件
 */
const FieldRangePicker: ProFieldFC<
  {
    text: string[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    showTime?: boolean;
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    light,
    label,
    format = 'YYYY-MM-DD',
    render,
    picker,
    formItemRender,
    showTime,
    lightLabel,
    variant: propsVariant,
    fieldProps,
  },
  ref,
) => {
  const intl = useIntl();

  const [startText, endText] = Array.isArray(text) ? text : [];
  const [open, setOpen] = React.useState<boolean>(false);
  const genFormatText = useCallback(
    (formatValue: dayjs.Dayjs) => {
      if (typeof fieldProps?.format === 'function') {
        return fieldProps?.format?.(formatValue);
      }
      return fieldProps?.format || format || 'YYYY-MM-DD';
    },
    [fieldProps, format],
  );
  const parsedStartText: string = startText
    ? dayjs(startText).format(genFormatText(dayjs(startText)))
    : '';
  const parsedEndText: string = endText
    ? dayjs(endText).format(genFormatText(dayjs(endText)))
    : '';

  if (isProFieldReadMode(mode)) {
    return FieldRangePickerRead(
      {
        text,
        mode,
        light,
        label,
        format,
        render,
        picker,
        formItemRender,
        showTime,
        lightLabel,
        variant: propsVariant,
        fieldProps,
        parsedStartText,
        parsedEndText,
      },
      ref,
    );
  }

  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldRangePickerEdit(
      {
        text,
        mode,
        light,
        label,
        format,
        render,
        picker,
        formItemRender,
        showTime,
        lightLabel,
        variant: propsVariant,
        fieldProps,
        open,
        setOpen,
        intl,
      },
      ref,
    );
  }
  return null;
};

export default React.forwardRef(FieldRangePicker);
