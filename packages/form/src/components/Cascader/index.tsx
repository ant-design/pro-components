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
  );
};

export default React.forwardRef(ProFormCascader);
