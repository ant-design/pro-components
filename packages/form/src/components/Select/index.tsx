import React from 'react';
import type { SelectProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';
import type { DataValueType } from '@ant-design/pro-field/lib/components/Select/SearchSelect';

export type ProFormSelectProps = ProFormItemProps<
  SelectProps<any> & {
    /**
     * 是否在输入框聚焦时触发搜索
     *
     * @default false
     */
    searchOnFocus?: boolean;
    /**
     * 选择完一个之后是否清空搜索项重新搜索
     *
     * @default false
     */
    resetAfterSelect?: boolean;
    /** 自定义选项渲染 */
    optionItemRender?: (item: DataValueType<any>) => React.ReactNode;
  }
> & {
  valueEnum?: ProSchema['valueEnum'];
  params?: ProSchema['params'];
  request?: ProSchema['request'];
  options?: SelectProps<any>['options'] | string[];
  mode?: SelectProps<any>['mode'] | 'singe';
  showSearch?: SelectProps<any>['showSearch'];
  readonly?: boolean;
};

/**
 * 选择框
 *
 * @param
 */
const ProFormSelectComponents = React.forwardRef<any, ProFormSelectProps>(
  (
    { fieldProps, children, params, proFieldProps, mode, valueEnum, request, showSearch, options },
    ref,
  ) => {
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        params={params}
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
  ({ fieldProps, children, params, proFieldProps, mode, valueEnum, request, options }, ref) => {
    const props: Omit<SelectProps<any>, 'options'> & {
      options?: ProFormSelectProps['options'];
    } = {
      options,
      mode: (mode as 'multiple') || 'multiple',
      labelInValue: true,
      showSearch: true,
      showArrow: false,
      autoClearSearchValue: true,
      optionLabelProp: 'label',
      filterOption: false,
      ...fieldProps,
    };
    return (
      <ProField
        mode="edit"
        valueEnum={runFunction(valueEnum)}
        request={request}
        params={params}
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
});

const ProFormSearchSelect = createField<ProFormSelectProps>(SearchSelect, {
  customLightMode: true,
});

const WrappedProFormSelect: typeof ProFormSelect & {
  SearchSelect: typeof ProFormSearchSelect;
} = ProFormSelect as any;

WrappedProFormSelect.SearchSelect = ProFormSearchSelect;

export default WrappedProFormSelect;
