import type { SegmentedProps } from 'antd';
import React from 'react';
import { FieldSegmented } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
import ProFormField from '../Field';

/**
 * 分段控制器
 *
 * @param
 */
const ProFormSegmented: React.FC<ProFormFieldItemProps<SegmentedProps> & ProFormFieldRemoteProps> = ({
  fieldProps,
  request,
  params,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        segmented: {
          render: (text, props) => <FieldSegmented {...props} text={text} />,
          formItemRender: (text, props) => <FieldSegmented {...props} text={text} />,
        },
      }}
    >
      <ProFormField
        ref={ref}
        fieldConfig={{ customLightMode: true }}
        fieldProps={fieldProps}
        params={params}
        proFieldProps={proFieldProps}
        request={request}
        valueType="segmented"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormSegmented;
