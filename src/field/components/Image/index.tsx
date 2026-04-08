import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldImageEdit } from './FieldImageEdit';
import { FieldImageRead } from './FieldImageRead';
import type { FieldImageProps } from './types';

export type { FieldImageProps };

/**
 * 数字组件
 */
const FieldImage = React.forwardRef<
  any,
  Parameters<ProFieldFC<FieldImageProps>>[0]
>(
  (
    {
      text,
      mode: type,
      render,
      formItemRender,
      fieldProps,
      placeholder,
      width,
    },
    ref,
  ) => {
    const intl = useIntl();
    const placeholderValue =
      (Array.isArray(placeholder) ? placeholder[0] : placeholder) ||
      intl.getMessage('tableForm.inputPlaceholder', '请输入');

    if (isProFieldReadMode(type)) {
      return FieldImageRead(
        {
          text,
          mode: type,
          render,
          formItemRender,
          fieldProps,
          placeholder,
          width,
        },
        ref,
      );
    }
    if (isProFieldEditOrUpdateMode(type)) {
      return FieldImageEdit(
        {
          text,
          mode: type,
          render,
          formItemRender,
          fieldProps,
          placeholder,
          width,
          placeholderValue,
        },
        ref,
      );
    }
    return null;
  },
);

export default FieldImage as ProFieldFC<FieldImageProps>;
