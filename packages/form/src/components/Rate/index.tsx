import type { RateProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../interface';
import ProField from '../Field';
/**
 * 评分组件
 *
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<any, ProFormFieldItemProps<RateProps>> = (
  { fieldProps, proFieldProps, ...rest },
  ref,
) => {
  return (
    <ProField
      valueType="rate"
      mode="edit"
      fieldProps={fieldProps}
      ref={ref}
      proFieldProps={proFieldProps}
      filedConfig={{
        ignoreWidth: true,
      }}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormRate);
