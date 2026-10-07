import type { CascaderProps } from 'antd';
import React, { useContext } from 'react';
import FieldCascader from '../../../field/components/Cascader';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
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

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
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
};

const ProFormCascader: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<CascaderProps<any>> & ProFormFieldRemoteProps
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
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
