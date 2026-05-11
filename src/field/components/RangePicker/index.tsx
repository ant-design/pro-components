import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC, ProFieldLightProps } from '../../types';
import { formatDate } from '../DatePicker/datePickerUtils';
import { FieldRangePickerEdit } from './FieldRangePickerEdit';
import { FieldRangePickerLightEdit } from './FieldRangePickerLightEdit';
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
  const mergedPicker = fieldProps?.picker ?? picker;
  const parsedStartText: string = startText
    ? formatDate(startText, fieldProps?.format || format, mergedPicker)
    : '';
  const parsedEndText: string = endText
    ? formatDate(endText, fieldProps?.format || format, mergedPicker)
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
    const editProps = {
      text,
      mode,
      label,
      format,
      render,
      picker,
      formItemRender,
      showTime,
      variant: propsVariant,
      fieldProps,
      intl,
    };
    if (light) {
      return FieldRangePickerLightEdit(
        {
          ...editProps,
          lightLabel,
          open,
          setOpen,
        },
        ref,
      );
    }
    return FieldRangePickerEdit(editProps, ref);
  }
  return null;
};

export default React.forwardRef(FieldRangePicker);
