import React from 'react';
import ProField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';
import type { ProSchema } from '@ant-design/pro-utils';
import type { TreeSelectProps } from 'antd';

/**
 * 级联选择框
 *
 * @param
 */
const ProFormTreeSelect: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<TreeSelectProps<any>> & {
    valueEnum?: ProSchema['valueEnum'];
    params?: ProSchema['params'];
    request?: ProSchema['request'];
  }
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProField
      mode="edit"
      valueType="treeSelect"
      fieldProps={fieldProps}
      ref={ref}
      request={request}
      params={params}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

const WarpProFormTreeSelect: React.FC<
  ProFormFieldItemProps<TreeSelectProps<any>> & {
    valueEnum?: ProSchema['valueEnum'];
    params?: ProSchema['params'];
    request?: ProSchema['request'];
  }
> = React.forwardRef(ProFormTreeSelect);

export default WarpProFormTreeSelect;
