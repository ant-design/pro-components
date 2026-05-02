import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldDigitEdit } from './FieldDigitEdit';
import { FieldDigitRead } from './FieldDigitRead';
import type { FieldDigitProps } from './types';

export type { FieldDigitProps };

/**
 * 数字组件
 */
const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, placeholder, formItemRender, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');

  if (isProFieldReadMode(type)) {
    return FieldDigitRead(
      { text, mode: type, render, placeholder, formItemRender, fieldProps },
      ref,
    );
  }
  if (isProFieldEditOrUpdateMode(type)) {
    return FieldDigitEdit(
      {
        text,
        mode: type,
        render,
        placeholder,
        formItemRender,
        fieldProps,
        placeholderValue,
      },
      ref,
    );
  }
  return null;
};

export default React.forwardRef(FieldDigit);
