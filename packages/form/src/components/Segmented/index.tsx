import type { SegmentedProps } from 'antd';
import React from 'react';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';

/**
 * 分段控制器
 *
 * @param
 */
const ProFormSegmented: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<SegmentedProps> & ProFormFieldRemoteProps
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
  ProFormFieldItemProps<SegmentedProps> & ProFormFieldRemoteProps
> = React.forwardRef(ProFormSegmented);

export default WarpProFormSegmented;
