import type { CascaderProps } from 'antd';
import React, { useContext } from 'react';
import { FieldCascader } from '../../../field';
import { ProConfigProvider } from '../../../provider';
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
          render: (text, props) => (
            <FieldCascader
              {...props}
              text={text}
              placeholder={props.placeholder as string}
            />
          ),
          formItemRender: (text, props) => (
            <FieldCascader
              {...props}
              text={text}
              placeholder={props.placeholder as string}
            />
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
        fieldConfig={{ customLightMode: true }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormCascader);
