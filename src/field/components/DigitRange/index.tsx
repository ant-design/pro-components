import { useControlledState } from '@rc-component/util';
import React, { useCallback, useRef } from 'react';
import { proTheme, useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldDigitRangeEdit } from './FieldDigitRangeEdit';
import { FieldDigitRangeRead } from './FieldDigitRangeRead';
import type { FieldDigitRangeProps, ValuePair } from './types';

export type { FieldDigitRangeProps, Value, ValuePair } from './types';

/**
 * 数字范围组件
 */
const FieldDigitRange: ProFieldFC<FieldDigitRangeProps> = (
  {
    text,
    mode: type,
    render,
    placeholder,
    formItemRender,
    fieldProps,
    separator = '~',
    separatorWidth = 30,
  },
  ref,
) => {
  const { value, defaultValue, onChange, id } = fieldProps;
  const intl = useIntl();

  const { token } = proTheme.useToken();
  const [valuePair, setValuePairInner] = useControlledState(
    () => defaultValue,
    value,
  );
  const setValuePair = useCallback(
    (
      updater:
        | ValuePair
        | undefined
        | ((prev: ValuePair | undefined) => ValuePair | undefined),
    ) => {
      setValuePairInner((prev: ValuePair | undefined) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: ValuePair | undefined) => ValuePair | undefined)(
                prev,
              )
            : updater;
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );
  const valuePairRef = useRef(valuePair);

  if (isProFieldReadMode(type)) {
    return FieldDigitRangeRead(
      {
        text,
        mode: type,
        render,
        placeholder,
        formItemRender,
        fieldProps,
        separator,
        separatorWidth,
      },
      ref,
    );
  }

  if (isProFieldEditOrUpdateMode(type)) {
    const placeholderValue = fieldProps?.placeholder ||
      placeholder || [
        intl.getMessage('tableForm.inputPlaceholder', '请输入'),
        intl.getMessage('tableForm.inputPlaceholder', '请输入'),
      ];

    return FieldDigitRangeEdit(
      {
        text,
        mode: type,
        render,
        placeholder,
        formItemRender,
        fieldProps,
        separator,
        separatorWidth,
        valuePair,
        valuePairRef,
        setValuePair,
        token,
        placeholderValue,
      },
      ref,
    );
  }
  return null;
};

export default React.forwardRef(FieldDigitRange);
