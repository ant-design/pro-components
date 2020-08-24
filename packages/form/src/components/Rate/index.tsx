import React from 'react';
import { Rate, Form } from 'antd';
import { RateProps } from 'antd/lib/rate';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

/**
 * 文本选择组件
 * @param
 */
const ProFormRate: React.ForwardRefRenderFunction<any, ProFormItemProps<RateProps>> = (
  { fieldProps, proFieldProps, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <Rate {...fieldProps} ref={ref} />
    </Form.Item>
  );
};

export default createField<ProFormItemProps<RateProps>>(React.forwardRef(ProFormRate));
