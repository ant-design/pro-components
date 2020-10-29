import React from 'react';
import ProField from '@ant-design/pro-field';
import { RateProps } from 'antd/lib/rate';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 评分组件
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<any, ProFormItemProps<RateProps>> = (
  { fieldProps },
  ref,
) => {
  return <ProField valueType="rate" mode="edit" {...fieldProps} ref={ref} />;
};

export default createField<ProFormItemProps<RateProps>>(React.forwardRef(ProFormRate));
