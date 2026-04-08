import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import { isNil } from '../../../utils';
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
  const proxyChange = useCallback(
    (value: number | string | null) => {
      let val = value ?? undefined;

      if (!fieldProps.stringMode && typeof val === 'string') {
        const numVal = Number(val);
        if (isNaN(numVal)) {
          const match = val.match(/^(\d+(?:\.\d+)?)/);
          if (match) {
            val = Number(match[1]);
          } else {
            val = undefined;
          }
        } else {
          val = numVal;
        }
      }
      if (
        typeof val === 'number' &&
        !isNil(val) &&
        !isNil(fieldProps.precision)
      ) {
        val = Number(val.toFixed(fieldProps.precision));
      }
      return val;
    },
    [fieldProps],
  );
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
        proxyChange,
      },
      ref,
    );
  }
  return null;
};

export default React.forwardRef(FieldDigit);
