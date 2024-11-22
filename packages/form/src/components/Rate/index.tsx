import type { RateProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { FieldRate } from '@ant-design/pro-field';
/**
 * 评分组件
 *
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<
  any,
  ProFormFieldItemProps<RateProps>
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        rate: {
          render: (text, props) => <FieldRate {...props} text={text} />,
          formItemRender: (text, props) => <FieldRate {...props} text={text} />,
        },
      }}
    >
      <ProField
        valueType="rate"
        fieldProps={fieldProps}
        ref={ref}
        proFieldProps={proFieldProps}
        filedConfig={{
          ignoreWidth: true,
        }}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormRate);
