import React from 'react';
import type { ProFieldFC } from '../../types';

type FieldAutoCompleteReadProps = Parameters<
  ProFieldFC<{ text: string; emptyText?: React.ReactNode }>
>[0] & {
  emptyText?: React.ReactNode;
};

/**
 * AutoComplete 的值即为字符串，只读时直接展示文本（与 FieldText 一致）。
 */
export function FieldAutoCompleteRead(props: FieldAutoCompleteReadProps) {
  const { text, mode, render, fieldProps, emptyText = '-' } = props;
  const { prefix = '', suffix = '' } = (fieldProps as any) || {};
  const dom = (
    <>
      {prefix}
      {text ?? emptyText}
      {suffix}
    </>
  );

  if (render) {
    return render(text, { mode, ...fieldProps }, dom) ?? emptyText;
  }
  return dom;
}
