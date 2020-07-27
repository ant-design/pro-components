import React, { Fragment, ReactNode, useMemo } from 'react';
import toNumber from 'lodash.tonumber';

import { getColorByRealValue, getSymbolByRealValue, getRealTextWithPrecision } from './util';

export interface PercentPropInt {
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: number | string;
  precision?: number;
  showColor?: boolean;
  showSymbol?: boolean;
}

const Percent: React.SFC<PercentPropInt> = ({
  value,
  prefix,
  precision,
  showSymbol,
  suffix = '%',
  showColor = false,
}) => {
  const realValue = useMemo(
    () =>
      typeof value === 'string' && value.includes('%')
        ? toNumber(value.replace('%', ''))
        : toNumber(value),
    [value],
  );
  /** 颜色有待确定, 根据提供 colors: ['正', '负'] | boolean */
  const style = showColor ? { color: getColorByRealValue(realValue) } : {};

  return (
    <span style={style}>
      {prefix && <span>{prefix}</span>}
      {showSymbol && <Fragment>{getSymbolByRealValue(realValue)}&nbsp;</Fragment>}
      {getRealTextWithPrecision(realValue, precision)}
      {suffix && suffix}
    </span>
  );
};

export default Percent;
