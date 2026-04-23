import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC, ProFieldLightProps } from '../../types';
import { FieldTimePickerEdit } from './FieldTimePickerEdit';
import { FieldTimePickerLightEdit } from './FieldTimePickerLightEdit';
import { FieldTimePickerRead } from './FieldTimePickerRead';
import { FieldTimeRangePickerEdit } from './FieldTimeRangePickerEdit';
import { FieldTimeRangePickerLightEdit } from './FieldTimeRangePickerLightEdit';
import { FieldTimeRangePickerRead } from './FieldTimeRangePickerRead';

/**
 * 时间选择组件
 */
const FieldTimePicker: ProFieldFC<
  {
    text: string | number;
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    light,
    label,
    format = 'HH:mm:ss',
    render,
    formItemRender,
    fieldProps,
    lightLabel,
    variant,
  },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const intl = useIntl();
  const finalFormat = fieldProps?.format || format;

  if (isProFieldReadMode(mode)) {
    return FieldTimePickerRead(
      {
        text,
        mode,
        light,
        label,
        format,
        render,
        formItemRender,
        fieldProps,
        lightLabel,
        variant,
        finalFormat,
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
      formItemRender,
      fieldProps,
      variant,
      finalFormat,
    };
    if (light) {
      return FieldTimePickerLightEdit(
        {
          ...editProps,
          lightLabel,
          open,
          setOpen,
          intl,
        },
        ref,
      );
    }
    return FieldTimePickerEdit(editProps, ref);
  }
  return null;
};

/**
 * 时间区间选择
 */
const FieldTimeRangePickerComponents: ProFieldFC<
  {
    text: string[] | number[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  } & ProFieldLightProps
> = (
  {
    text,
    light,
    label,
    mode,
    lightLabel,
    format = 'HH:mm:ss',
    render,
    formItemRender,
    fieldProps,
    variant,
  },
  ref,
) => {
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const finalFormat = fieldProps?.format || format;
  const [startText, endText] = Array.isArray(text) ? text : [];
  const startTextIsNumberOrMoment =
    dayjs.isDayjs(startText) || typeof startText === 'number';
  const endTextIsNumberOrMoment =
    dayjs.isDayjs(endText) || typeof endText === 'number';

  const parsedStartText: string = startText
    ? dayjs(
        startText,
        startTextIsNumberOrMoment ? undefined : finalFormat,
      ).format(finalFormat)
    : '';
  const parsedEndText: string = endText
    ? dayjs(endText, endTextIsNumberOrMoment ? undefined : finalFormat).format(
        finalFormat,
      )
    : '';

  if (isProFieldReadMode(mode)) {
    return FieldTimeRangePickerRead(
      {
        text,
        light,
        label,
        mode,
        lightLabel,
        format,
        render,
        formItemRender,
        fieldProps,
        variant,
        parsedStartText,
        parsedEndText,
      },
      ref,
    );
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    const editProps = {
      text,
      label,
      mode,
      format,
      render,
      formItemRender,
      fieldProps,
      variant,
      finalFormat,
    };
    if (light) {
      return FieldTimeRangePickerLightEdit(
        {
          ...editProps,
          lightLabel,
          open,
          setOpen,
          intl,
        },
        ref,
      );
    }
    return FieldTimeRangePickerEdit(editProps, ref);
  }
  return null;
};

const FieldTimeRangePicker = React.forwardRef(FieldTimeRangePickerComponents);

export { FieldTimeRangePicker };

export default React.forwardRef(FieldTimePicker);
