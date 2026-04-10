import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldTextEdit } from './FieldTextEdit';
import { FieldTextRead } from './FieldTextRead';

/**
 * 最基本的组件，就是个普通的 Input
 */
const FieldText: ProFieldFC<{
  text: string;
  emptyText?: React.ReactNode;
}> = (
  { text, mode, render, formItemRender, fieldProps, emptyText = '-' },
  ref,
) => {
  const { autoFocus } = fieldProps || {};

  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current, []);

  useEffect(() => {
    if (autoFocus) {
      queueMicrotask(() => {
        inputRef.current?.focus();
      });
    }
  }, [autoFocus]);

  if (isProFieldReadMode(mode)) {
    return (
      <FieldTextRead
        text={text}
        mode={mode}
        render={render}
        formItemRender={formItemRender}
        fieldProps={fieldProps}
        emptyText={emptyText}
      />
    );
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return (
      <FieldTextEdit
        text={text}
        mode={mode}
        render={render}
        formItemRender={formItemRender}
        fieldProps={fieldProps}
        emptyText={emptyText}
        inputRef={inputRef}
        intl={intl}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldText);
