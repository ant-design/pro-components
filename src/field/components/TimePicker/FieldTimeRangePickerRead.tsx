import React from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string[] | number[];
      format?: string;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    } & ProFieldLightProps
  >
>[0] & {
  parsedStartText: string;
  parsedEndText: string;
};

export function FieldTimeRangePickerRead(
  props: Props,
  ref: React.Ref<unknown>,
) {
  const { text, mode, render, fieldProps, parsedStartText, parsedEndText } =
    props;
  const start = parsedStartText;
  const end = parsedEndText;
  const content = !start && !end ? '-' : `${start || '-'} ~ ${end || '-'}`;
  const dom = <div ref={ref as React.Ref<HTMLDivElement>}>{content}</div>;
  if (render) {
    return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
  }
  return dom;
}
