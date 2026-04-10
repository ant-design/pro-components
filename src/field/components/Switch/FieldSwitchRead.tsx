import React from 'react';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: boolean;
    variant?: 'outlined' | 'borderless' | 'filled';
  }>
>[0] & {
  readLabel: React.ReactNode;
};

export function FieldSwitchRead(props: Props) {
  const { text, mode, render, fieldProps, readLabel } = props;
  if (render) {
    return render(text, { mode, ...fieldProps }, <>{readLabel}</>);
  }
  return readLabel ?? '-';
}
