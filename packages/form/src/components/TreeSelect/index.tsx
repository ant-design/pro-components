import type { TreeSelectProps } from 'antd';
import type { RefSelectProps } from 'antd/es/select';
import React from 'react';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../interface';
import ProFormField from '../Field';

/**
 * 级联选择框
 *
 * @param
 */
const ProFormTreeSelect: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProFormField
      valueType="treeSelect"
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

const WarpProFormTreeSelect: React.FC<
  ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> & ProFormFieldRemoteProps
> = React.forwardRef(ProFormTreeSelect);

export default WarpProFormTreeSelect;
