import React from 'react';
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
  showSearch?: SelectProps<any>['showSearch'];
};

/**
 * 文本选择组件
 * @param
 */
const ProFormSelect = React.forwardRef<any, ProFormSelectProps>(
  ({ fieldProps, children, proFieldProps, mode, valueEnum, request, showSearch, options }, ref) => {
    return (
      <ProField
        mode="edit"
        valueEnum={valueEnum}
        request={request}
        valueType="text"
        fieldProps={{
          options,
          mode,
          showSearch,
          ...fieldProps,
        }}
        ref={ref}
        {...proFieldProps}
      >
        {children}
      </ProField>
    );
  },
);

// 不这样写 valueEnum 和 request 会被 pick 掉
// @ts-ignore
ProFormSelect.type = 'ProField';

export default createField<ProFormSelectProps>(ProFormSelect, {
  customLightMode: true,
});
