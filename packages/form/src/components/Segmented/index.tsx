import type { TreeSelectProps } from 'antd';
import type { RefSelectProps } from 'antd/lib/select';
import React from 'react';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../interface';
import ProFormField from '../Field';

/**
 * 分段控制器
 *
 * @param
 */
const ProFormSegmented: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProFormField
      valueType="segmented"
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

const WarpProFormSegmented: React.FC<
  ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> & ProFormFieldRemoteProps
> = React.forwardRef(ProFormSegmented);

export default WarpProFormSegmented;
