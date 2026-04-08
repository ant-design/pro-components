import React from 'react';
import type { ProFieldFC } from '../../types';

type FieldTextReadProps = Parameters<
  ProFieldFC<{ text: string; emptyText?: React.ReactNode }>
>[0] & {
  emptyText: React.ReactNode;
};

export function FieldTextRead(props: FieldTextReadProps) {
  const { text, mode, render, fieldProps, emptyText } = props;
  const { prefix = '', suffix = '' } = fieldProps || {};
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
