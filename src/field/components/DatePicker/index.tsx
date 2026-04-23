import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useState } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC, ProFieldLightProps } from '../../types';
import { FieldDatePickerEdit } from './FieldDatePickerEdit';
import { FieldDatePickerLightEdit } from './FieldDatePickerLightEdit';
import { FieldDatePickerRead } from './FieldDatePickerRead';

dayjs.extend(weekOfYear);

/**
 * 日期选择组件
 */
const FieldDatePicker: ProFieldFC<
  {
    text: string | number;
    format?: string;
    showTime?: boolean;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    format = 'YYYY-MM-DD',
    label,
    light,
    render,
    formItemRender,
    showTime,
    fieldProps,
    picker,
    lightLabel,
    variant,
  },
  ref,
) => {
  const intl = useIntl();

  const [open, setOpen] = useState<boolean>(false);

  if (isProFieldReadMode(mode)) {
    return (
      <FieldDatePickerRead
        text={text}
        mode={mode}
        format={format}
        label={label}
        light={light}
        render={render}
        formItemRender={formItemRender}
        showTime={showTime}
        fieldProps={fieldProps}
        picker={picker}
        lightLabel={lightLabel}
        variant={variant}
      />
    );
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    const editProps = {
      text,
      mode,
      format,
      label,
      render,
      formItemRender,
      showTime,
      fieldProps,
      picker,
      variant,
      intl,
    };
    if (light) {
      return FieldDatePickerLightEdit(
        {
          ...editProps,
          lightLabel,
          open,
          setOpen,
        },
        ref,
      );
    }
    return FieldDatePickerEdit(editProps, ref);
  }
  return null;
};
export default React.forwardRef(FieldDatePicker);
