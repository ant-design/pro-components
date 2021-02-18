import React from 'react';
import type { SelectProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormSelectProps = ProFormItemProps<SelectProps<any>> & {
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
  options?: SelectProps<any>['options'];
  mode?: SelectProps<any>['mode'];
  showSearch?: SelectProps<any>['showSearch'];
  readonly?: boolean;
};

/**
 * 文本选择组件
 *
 * @param
 */
const ProFormSelectComponents = React.forwardRef<any, ProFormSelectProps>(
  ({ fieldProps, children, proFieldProps, mode, valueEnum, request, showSearch, options }, ref) => {
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        valueType="select"
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

const SearchSelect = React.forwardRef<any, ProFormSelectProps>(
  ({ fieldProps, children, proFieldProps, mode, valueEnum, request, options }, ref) => {
    const props: SelectProps<any> = {
      options,
      mode,
      labelInValue: true,
      showSearch: true,
      ...fieldProps,
    };
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        valueType="select"
        fieldProps={props}
        ref={ref}
        {...proFieldProps}
      >
        {children}
      </ProField>
    );
  },
);

const ProFormSelect = createField<ProFormSelectProps>(ProFormSelectComponents, {
  customLightMode: true,
}) as React.FunctionComponent<ProFormSelectProps> & {
  SearchSelect: React.FunctionComponent<ProFormSelectProps>;
};

ProFormSelect.SearchSelect = SearchSelect;

export default ProFormSelect;
