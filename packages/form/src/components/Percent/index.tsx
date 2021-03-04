import type { PercentFieldProps } from '@ant-design/pro-field';
import type { InputNumberProps } from 'antd';
import ProField from '@ant-design/pro-field';
import React from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

type ProFormPercentProps = ProFormItemProps<InputNumberProps> & PercentFieldProps;

/**
 * 数组选择组件
 *
 * @param
 */
const ProFormPercent: React.ForwardRefRenderFunction<any, ProFormPercentProps> = (props, ref) => {
  const {
    fieldProps,
    proFieldProps,
    showSymbol,
    precision,
    showColor,
    hideSymbolOnPositive,
    prefix,
    suffix,
  } = props;
  return (
    <ProField
      mode="edit"
      valueType={{
        type: 'percent',
        showSymbol,
        precision,
        showColor,
        hideSymbolOnPositive,
      }}
      fieldProps={fieldProps}
      ref={ref}
      prefix={prefix}
      suffix={suffix}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormPercentProps>(React.forwardRef(ProFormPercent));
export type { ProFormPercentProps };
