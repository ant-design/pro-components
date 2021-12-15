import React from 'react';
import ProField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';
import type { ProSchema } from '@ant-design/pro-utils';
import type { CascaderProps } from 'antd';
/**
 * 级联选择框
 *
 * @param
 */
const ProFormCascader: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<CascaderProps<any>> & {
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
