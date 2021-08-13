import React from 'react';
import ProField from '@ant-design/pro-field';
import type { RateProps } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';
/**
 * 评分组件
 *
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<any, ProFormFieldItemProps<RateProps>> = (
  { fieldProps, proFieldProps, ...rest },
  ref,
) => {
  return (
    <ProField
      valueType="rate"
      mode="edit"
      fieldProps={{
        ...fieldProps,
        onChange: (...restParams: any) => {
          (fieldProps?.onChange as any)?.(...restParams);
          (rest as any)?.onChange?.(...restParams);
        },
      }}
      ref={ref}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormFieldItemProps<RateProps>>(React.forwardRef(ProFormRate), {
  ignoreWidth: true,
});
