import React from 'react';
import ProField from '../Field';
import type { RateProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
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
