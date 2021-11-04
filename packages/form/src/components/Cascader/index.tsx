import React from 'react';
import ProField from '../Field';
import type { CascaderProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import type { ProSchema } from '@ant-design/pro-utils';
/**
 * 级联选择框
 *
 * @param
 */
const ProFormCascader: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<CascaderProps> & {
    valueEnum?: ProSchema['valueEnum'];
    params?: ProSchema['params'];
    request?: ProSchema['request'];
  }
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProField
      mode="edit"
      valueType="cascader"
      fieldProps={fieldProps}
      ref={ref}
      request={request}
      params={params}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormCascader);
