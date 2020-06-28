import React, { Fragment, ReactNode, useMemo } from 'react';
import toNumber from 'lodash.tonumber';

import {
  getColorByRealValue,
  getSymbolByRealValue,
  getRealTextWithPrecision,
} from './util';
import { FieldFC } from '../../index';
import { Input, InputNumber } from 'antd';

export interface PercentPropInt {
  prefix?: ReactNode;
  suffix?: ReactNode;
  text?: number | string;
  precision?: number;
  showColor?: boolean;
  showSymbol?: boolean;
}

const FieldPercent: FieldFC<PercentPropInt> = ({
  text,
  prefix,
  precision,
  showSymbol,
  suffix = '%',
  type,
  showColor = false,
  render,
  renderFormItem,
  formItemProps,
}) => {
  if (type === 'read') {
    const realValue = useMemo(
      () =>
        typeof text === 'string' && (text as string).includes('%')
          ? toNumber((text as string).replace('%', ''))
          : toNumber(text),
      [text],
    );
    /** 颜色有待确定, 根据提供 colors: ['正', '负'] | boolean */
    const style = showColor ? { color: getColorByRealValue(realValue) } : {};

    const dom = (
      <span style={style}>
        {prefix && <span>{prefix}</span>}
        {showSymbol && (
          <Fragment>{getSymbolByRealValue(realValue)}&nbsp;</Fragment>
        )}
        {getRealTextWithPrecision(realValue, precision)}
        {suffix && suffix}
      </span>
    );
    if (render) {
      return render(
        text,
        { type, ...formItemProps, prefix, precision, showSymbol, suffix },
        dom,
      );
    }
  }
  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumber
        formatter={value => {
          if (value) {
            return `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return '';
        }}
        parser={value =>
          value
            ? value.replace(new RegExp(`\\${prefix}\\s?|(,*)`, 'g'), '')
            : ''
        }
        {...formItemProps}
        defaultValue={text}
      />
    );
  }
  return null;
};

export default FieldPercent;
