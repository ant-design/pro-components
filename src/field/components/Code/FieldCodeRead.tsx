import React from 'react';
import type { ProFieldFC } from '../../types';

type FieldCodeReadProps = Parameters<
  ProFieldFC<{ text: string; language?: 'json' | 'text' }>
>[0] & {
  code: string;
  token: {
    colorTextSecondary: string;
    fontFamilyCode: string;
  };
};

export function FieldCodeRead(
  props: FieldCodeReadProps,
  ref: React.Ref<unknown>,
) {
  const { code, mode, render, fieldProps, token } = props;
  const dom = (
    <pre
      ref={ref as React.Ref<HTMLPreElement>}
      {...fieldProps}
      style={{
        padding: 16,
        overflow: 'auto',
        fontSize: '85%',
        lineHeight: 1.45,
        color: token.colorTextSecondary,
        fontFamily: token.fontFamilyCode,
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        borderRadius: 3,
        width: 'min-content',
        ...fieldProps?.style,
      }}
    >
      <code>{code}</code>
    </pre>
  );
  if (render) {
    return render(code, { mode, ...fieldProps, ref }, dom);
  }
  return dom;
}
