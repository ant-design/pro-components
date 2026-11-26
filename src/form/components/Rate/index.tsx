import type { RateProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldRate } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';
/**
 * 评分组件
 *
 * @param
 */

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  rate: {
    render: (text, props) => <FieldRate {...props} text={text} />,
    formItemRender: (text, props) => <FieldRate {...props} text={text} />,
  },
};

const ProFormRate: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<RateProps>
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  const proContext = useContext(ProProvider);
  const valueTypeMap = useMemo(
    () =>
      mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
    [proContext.valueTypeMap],
  );
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
      <ProField
        valueType="rate"
        fieldProps={fieldProps}
        ref={ref}
        proFieldProps={proFieldProps}
        fieldConfig={{
          ignoreWidth: true,
        }}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormRate);
