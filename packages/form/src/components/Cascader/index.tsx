import React from 'react';
import ProField from '../Field';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../interface';
import type { CascaderProps } from 'antd';
/**
 * 级联选择框
 *
 * @param
 */
const ProFormCascader: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<CascaderProps<any>> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProField
      mode="edit"
      valueType="cascader"
      fieldProps={fieldProps}
      ref={ref}
      request={request}
      params={params}
      filedConfig={{ customLightMode: true }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormCascader);
