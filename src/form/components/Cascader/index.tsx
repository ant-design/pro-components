import type { CascaderProps } from 'antd';
import React, { useContext } from 'react';
import { FieldCascader } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
import ProField from '../Field';

/**
 * 级联选择框
 *
 */
const ProFormCascader: React.FC<ProFormFieldItemProps<CascaderProps<any>> & ProFormFieldRemoteProps> = ({
  fieldProps,
  request,
  params,
  proFieldProps,
  ref,
  ...rest
}) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        cascader: {
          render: (text, props) => <FieldCascader {...props} placeholder={props.placeholder as string} text={text} />,
          formItemRender: (text, props) => (
            <FieldCascader {...props} placeholder={props.placeholder as string} text={text} />
          ),
        },
      }}
    >
      <ProField
        ref={ref}
        fieldConfig={{ customLightMode: true }}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        params={params}
        proFieldProps={proFieldProps}
        request={request}
        valueType="cascader"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormCascader;
