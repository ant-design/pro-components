import type { SegmentedProps } from 'antd';
import React from 'react';
import FieldSegmented from '../../../field/components/Segmented';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
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

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  segmented: {
    render: (text, props) => <FieldSegmented {...props} text={text} />,
    formItemRender: (text, props) => <FieldSegmented {...props} text={text} />,
  },
};

const ProFormSegmented: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<SegmentedProps> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
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
