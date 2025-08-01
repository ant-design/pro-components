import type { SegmentedProps } from 'antd';
import React from 'react';
import { FieldSegmented } from '../../../field';
import { ProConfigProvider } from '../../../provider';
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
    <ProConfigProvider
      valueTypeMap={{
        segmented: {
          render: (text, props) => <FieldSegmented {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldSegmented {...props} text={text} />
          ),
        },
      }}
    >
      <ProFormField
        valueType="segmented"
        fieldProps={fieldProps}
        ref={ref}
        request={request}
        params={params}
        fieldConfig={{ customLightMode: true }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  );
};

const WarpProFormSegmented: React.FC<
  ProFormFieldItemProps<SegmentedProps> & ProFormFieldRemoteProps
> = React.forwardRef(ProFormSegmented);

export default WarpProFormSegmented;
