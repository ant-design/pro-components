import type { SelectProps } from 'antd';
import type { BaseOptionType } from 'antd/lib/cascader';
import type { DefaultOptionType, RefSelectProps } from 'antd/lib/select';
import React, { useContext } from 'react';
import { FieldSelect } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { runFunction } from '../../../utils';
import FieldContext from '../../FieldContext';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';

export type ProFormSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> = ProFormFieldItemProps<
  SelectProps<ValueType, OptionType> & {
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
    /**
     * 当搜索关键词发生变化时是否请求远程数据
     *
     * @default true
     */
    fetchDataOnSearch?: boolean;
    /** 自定义选项渲染 */
    optionItemRender?: (item: ValueType) => React.ReactNode;
  },
  RefSelectProps
> & {
  options?: SelectProps<ValueType, OptionType>['options'] | string[];
  mode?: SelectProps<ValueType, OptionType>['mode'] | 'single';
  showSearch?: SelectProps<ValueType, OptionType>['showSearch'];
  readonly?: boolean;
  onChange?: SelectProps<ValueType, OptionType>['onChange'];
} & ProFormFieldRemoteProps;

/**
 * 选择框
 *
 * @param
 */
const ProFormSelectComponents = <T, OptionType extends BaseOptionType = any>(
  {
    fieldProps,
    children,
    params,
    proFieldProps,
    mode,
    valueEnum,
    request,
    showSearch,
    options,
    ...rest
  }: ProFormSelectProps<T, OptionType>,
  ref: any,
) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        select: {
          render: (text, props) => <FieldSelect {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldSelect {...props} text={text} />
          ),
        },
      }}
    >
      <ProFormField<any>
        valueEnum={runFunction(valueEnum)}
        request={request}
        params={params}
        valueType="select"
        fieldConfig={{ customLightMode: true }}
        fieldProps={
          {
            options,
            mode,
            showSearch,
            getPopupContainer: context.getPopupContainer,
            ...fieldProps,
          } as SelectProps<any>
        }
        ref={ref}
        proFieldProps={proFieldProps}
        {...rest}
      >
        {children}
      </ProFormField>
    </ProConfigProvider>
  );
};

const SearchSelect = React.forwardRef<any, ProFormSelectProps<any>>(
  (
    {
      fieldProps,
      children,
      params,
      proFieldProps,
      mode,
      valueEnum,
      request,
      options,
      ...rest
    },
    ref,
  ) => {
    const finalMode = fieldProps?.mode || mode || 'multiple';
    const props: Omit<SelectProps<any>, 'options'> & {
      options?: ProFormSelectProps['options'];
    } = {
      options,
      labelInValue: true,
      showSearch: true,
      suffixIcon: null,
      autoClearSearchValue: true,
      optionLabelProp: 'label',
      ...fieldProps,
      mode:
        finalMode === 'single' ? undefined : (finalMode as 'multiple' | 'tags'), // 确保mode正确设置
    };
    const context = useContext(FieldContext);
    return (
      <ProConfigProvider
        valueTypeMap={{
          select: {
            render: (text, valueTypeProps) => (
              <FieldSelect {...valueTypeProps} text={text} />
            ),
            formItemRender: (text, valueTypeProps) => (
              <FieldSelect {...valueTypeProps} text={text} />
            ),
          },
        }}
      >
        <ProFormField<any>
          valueEnum={runFunction(valueEnum)}
          request={request}
          params={params}
          valueType="select"
          fieldConfig={{ customLightMode: true }}
          fieldProps={{
            getPopupContainer: context.getPopupContainer,
            ...props,
          }}
          ref={ref}
          proFieldProps={proFieldProps}
          {...rest}
        >
          {children}
        </ProFormField>
      </ProConfigProvider>
    );
  },
);

const ProFormSelect = React.forwardRef(ProFormSelectComponents) as <
  T,
  OptionType extends BaseOptionType = any,
>(
  props: ProFormSelectProps<T, OptionType>,
) => React.ReactElement;

const ProFormSearchSelect = SearchSelect as <
  T,
  OptionType extends BaseOptionType = any,
>(
  props: ProFormSelectProps<T, OptionType>,
) => React.ReactElement;

const WrappedProFormSelect = ProFormSelect as (<
  T,
  OptionType extends BaseOptionType = any,
>(
  props: ProFormSelectProps<T, OptionType>,
) => React.ReactElement) & {
  SearchSelect: typeof ProFormSearchSelect;
};

WrappedProFormSelect.SearchSelect = ProFormSearchSelect;

// @ts-ignore
WrappedProFormSelect.displayName = 'ProFormComponent';

export default WrappedProFormSelect;
