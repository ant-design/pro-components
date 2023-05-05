import { InputNumber } from 'antd';
import toNumber from 'lodash.tonumber';
import type { ReactNode } from 'react';
import React, { Fragment, useMemo } from 'react';
import type { ProFieldFC } from '../../index';
import {
  getColorByRealValue,
  getRealTextWithPrecision,
  getSymbolByRealValue,
} from './util';

// 兼容代码-----------
import { useIntl } from '@ant-design/pro-provider';
import 'antd/lib/input-number/style';
//------------

export type PercentPropInt = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  text?: number | string;
  precision?: number;
  showColor?: boolean;
  showSymbol?: boolean | ((value: any) => boolean);
  placeholder?: string;
};

/**
 * 百分比组件
 *
 * @param PercentPropInt
 */
const FieldPercent: ProFieldFC<PercentPropInt> = (
  {
    text,
    prefix,
    precision,
    suffix = '%',
    mode,
    showColor = false,
    render,
    renderFormItem,
    fieldProps,
    placeholder,
    showSymbol: propsShowSymbol,
  },
  ref,
) => {
  const intl = useIntl();
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const realValue = useMemo(
    () =>
      typeof text === 'string' && (text as string).includes('%')
        ? toNumber((text as string).replace('%', ''))
        : toNumber(text),
    [text],
  );
  const showSymbol = useMemo(() => {
    if (typeof propsShowSymbol === 'function') {
      return propsShowSymbol?.(text);
    }
    return propsShowSymbol;
  }, [propsShowSymbol, text]);

  if (mode === 'read') {
    /** 颜色有待确定, 根据提供 colors: ['正', '负'] | boolean */
    const style = showColor ? { color: getColorByRealValue(realValue) } : {};

    const dom = (
      <span style={style} ref={ref}>
        {prefix && <span>{prefix}</span>}
        {showSymbol && <Fragment>{getSymbolByRealValue(realValue)} </Fragment>}
        {getRealTextWithPrecision(Math.abs(realValue), precision)}
        {suffix && suffix}
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
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <InputNumber
        ref={ref}
        formatter={(value) => {
          if (value && prefix) {
            return `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d)$)/g, ',');
          }
          return value;
        }}
        parser={(value) => (value ? value.replace(/.*\s|,/g, '') : '')}
        placeholder={placeholderValue}
        {...fieldProps}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldPercent);
