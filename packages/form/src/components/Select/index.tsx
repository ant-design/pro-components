import React from 'react';
import { Form } from 'antd';
import { SelectProps } from 'antd/lib/select';
import ProField from '@ant-design/pro-field';
import { ProSchema } from '@ant-design/pro-utils';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

type ProFormSelectProps = ProFormItemProps<SelectProps<any>> & {
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
  options?: SelectProps<any>['options'];
  mode?: SelectProps<any>['mode'];
};

/**
 * 文本选择组件
 * @param
 */
const ProFormSelect = React.forwardRef<any, ProFormSelectProps>(
  ({ fieldProps, children, mode, valueEnum, request, options, ...restProps }, ref) => {
    return (
      <Form.Item {...restProps}>
        <ProField
          mode="edit"
          valueEnum={valueEnum}
          request={request}
          valueType="text"
          formItemProps={{
            options,
            mode,
            ...fieldProps,
          }}
          ref={ref}
        >
          {children}
        </ProField>
      </Form.Item>
    );
  },
);

// 不这样写 valueEnum 和 request 会被 pick 掉
// @ts-ignore
ProFormSelect.type = 'ProField';

export default createField<ProFormSelectProps>(ProFormSelect);
