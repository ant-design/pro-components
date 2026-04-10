import React from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string[];
      format?: string;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
      showTime?: boolean;
      picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
    } & ProFieldLightProps
  >
>[0] & {
  parsedStartText: string;
  parsedEndText: string;
};

export function FieldRangePickerRead(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, render, fieldProps, parsedStartText, parsedEndText } =
    props;
  const dom = (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <div>{parsedStartText || '-'}</div>
      <div>{parsedEndText || '-'}</div>
    </div>
  );
  if (render) {
    return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
  }
  return dom;
}
