import React from 'react';
import type { InputNumberProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

type ProFormDigitProps = ProFormItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigitProps> = (
  { fieldProps, min, proFieldProps, max },
  ref,
) => {
  return (
    <ProField
      mode="edit"
      valueType="digit"
      fieldProps={{
        min,
        max,
        ...fieldProps,
      }}
      ref={ref}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormDigitProps>(React.forwardRef(ProFormDigit));
