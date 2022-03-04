import React from 'react';
import type { InputNumberProps } from 'antd';
import ProFormField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';

export type ProFormDigitProps = ProFormFieldItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigitProps> = (
  { fieldProps, min, proFieldProps, max, ...rest },
  ref,
) => {
  return (
    <ProFormField
      mode="edit"
      valueType="digit"
      fieldProps={{
        min,
        max,
        ...fieldProps,
      }}
      ref={ref}
      filedConfig={{
        defaultProps: {
          width: '100%',
        },
      }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormDigit);
