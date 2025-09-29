import type { RateProps } from 'antd';
import React from 'react';
import { FieldRate } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

/**
 * 评分组件
 *
 * @param
 */
const ProFormRate: React.FC<ProFormFieldItemProps<RateProps>> = ({ fieldProps, proFieldProps, ref, ...rest }) => {
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
        ref={ref}
        fieldConfig={{
          ignoreWidth: true,
        }}
        fieldProps={fieldProps}
        proFieldProps={proFieldProps}
        valueType="rate"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormRate;
