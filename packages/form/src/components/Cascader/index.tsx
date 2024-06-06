import { FieldCascader } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import type { CascaderProps } from 'antd';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProField from '../Field';
/**
 * 级联选择框
 *
 * @param
 */
const ProFormCascader: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<CascaderProps<any>> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        cascader: {
          render: (text, props) => <FieldCascader {...props} text={text} />,
          renderFormItem: (text, props) => (
            <FieldCascader {...props} text={text} />
          ),
        },
      }}
    >
      <ProField
        valueType="cascader"
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        ref={ref}
        request={request}
        params={params}
        filedConfig={{ customLightMode: true }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormCascader);
