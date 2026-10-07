import type { RateProps } from 'antd';
import React from 'react';
import FieldRate from '../../../field/components/Rate';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';
/**
 * 评分组件
 *
 * @param
 */

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  rate: {
    render: (text, props) => <FieldRate {...props} text={text} />,
    formItemRender: (text, props) => <FieldRate {...props} text={text} />,
  },
};

const ProFormRate: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<RateProps>
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
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
