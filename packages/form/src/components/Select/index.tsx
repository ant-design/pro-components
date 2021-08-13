import React from 'react';
import type { SelectProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormFieldItemProps } from '../../interface';
import type { ExtendsProps } from '../../BaseForm/createField';
import createField from '../../BaseForm/createField';

export type ProFormSelectProps<T = any> = ProFormFieldItemProps<
  SelectProps<T> & {
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
    optionItemRender?: (item: T) => React.ReactNode;
  }
> & {
  valueEnum?: ProSchema['valueEnum'];
  params?: ProSchema['params'];
  request?: ProSchema['request'];
  options?: SelectProps<any>['options'] | string[];
  mode?: SelectProps<any>['mode'] | 'single';
  showSearch?: SelectProps<any>['showSearch'];
  readonly?: boolean;
};

/**
 * 选择框
 *
 * @param
 */
const ProFormSelectComponents = React.forwardRef<any, ProFormSelectProps<any>>(
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

const SearchSelect = React.forwardRef<any, ProFormSelectProps<any>>(
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
}) as <T>(props: ProFormSelectProps<T> & ExtendsProps) => React.ReactElement;

const ProFormSearchSelect = createField<ProFormSelectProps>(SearchSelect, {
  customLightMode: true,
}) as <T>(props: ProFormSelectProps<T> & ExtendsProps) => React.ReactElement;

const WrappedProFormSelect = ProFormSelect as (<T = any>(
  props: ProFormSelectProps<T>,
) => React.ReactElement) & {
  SearchSelect: typeof ProFormSearchSelect;
};

WrappedProFormSelect.SearchSelect = ProFormSearchSelect;

export default WrappedProFormSelect;
