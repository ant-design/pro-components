import type { ReactNode } from 'react';
import React, { Fragment } from 'react';
import type { ProFieldFC } from '../../types';
import type { PercentPropInt } from './types';
import {
  getColorByRealValue,
  getRealTextWithPrecision,
  getSymbolByRealValue,
} from './util';

type Props = Parameters<ProFieldFC<PercentPropInt>>[0] & {
  realValue: number;
  showSymbol: boolean | undefined;
};

export function FieldPercentRead(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    prefix,
    precision,
    mode,
    showColor = false,
    render,
    fieldProps,
    suffix = '%',
    realValue,
    showSymbol,
  } = props;

  const style = showColor ? { color: getColorByRealValue(realValue) } : {};

  const dom = (
    <span style={style} ref={ref as React.Ref<HTMLSpanElement>}>
      {prefix && <span>{prefix}</span>}
      {showSymbol && <Fragment>{getSymbolByRealValue(realValue)} </Fragment>}
      {getRealTextWithPrecision(Math.abs(realValue), precision)}
      {suffix && (suffix as ReactNode)}
    </span>
  );
  if (render) {
    return render(
      text,
      { mode, ...fieldProps, prefix, precision, showSymbol, suffix },
      dom,
    );
  }
  return dom;
}
