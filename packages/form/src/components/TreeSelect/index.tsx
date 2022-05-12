import React from 'react';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../interface';
import type { TreeSelectProps } from 'antd';
import ProFormField from '../Field';
import type { RefSelectProps } from 'antd/lib/select';

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
      mode="edit"
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
