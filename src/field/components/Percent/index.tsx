import { InputNumber } from 'antd';
import type { ReactNode } from 'react';
import { Fragment, useMemo } from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';
import { getColorByRealValue, getRealTextWithPrecision, getSymbolByRealValue, toNumber } from './util';

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
const FieldPercent: ProFieldFC<PercentPropInt> = ({
  text,
  prefix,
  precision,
  suffix = '%',
  mode,
  showColor = false,
  render,
  formItemRender,
  fieldProps,
  placeholder,
  showSymbol: propsShowSymbol,
  ref,
}) => {
  const intl = useIntl();
  const placeholderValue = placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
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
      <span ref={ref} style={style}>
        {prefix && <span>{prefix}</span>}
        {showSymbol && <Fragment>{getSymbolByRealValue(realValue)} </Fragment>}
        {getRealTextWithPrecision(Math.abs(realValue), precision)}
        {suffix && suffix}
      </span>
    );
    if (render) {
      return render(text, { mode, ...fieldProps, prefix, precision, showSymbol, suffix }, dom);
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
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldPercent;
