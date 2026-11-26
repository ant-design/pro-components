import type { RefSelectProps, TreeSelectProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldTreeSelect } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  treeSelect: {
    render: (text, props) => <FieldTreeSelect {...props} text={text} />,
    formItemRender: (text, props) => <FieldTreeSelect {...props} text={text} />,
  },
};

export type ProFormTreeSelectProps<T = any> = ProFormFieldItemProps<
  TreeSelectProps<T> & {
    /**
     * 当搜索关键词发生变化时是否请求远程数据
     *
     * @default true
     */
    fetchDataOnSearch?: boolean;
  },
  RefSelectProps
> &
  ProFormFieldRemoteProps;

/**
 * 树选择器
 *
 * @param
 */
const ProFormTreeSelect: React.ForwardRefRenderFunction<
  any,
  ProFormTreeSelectProps<any>
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  const proContext = useContext(ProProvider);
  const valueTypeMap = useMemo(
    () =>
      mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
    [proContext.valueTypeMap],
  );
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
      <ProFormField
        valueType="treeSelect"
        fieldProps={fieldProps}
        ref={ref}
        request={request}
        params={params}
        fieldConfig={{ customLightMode: true }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  );
};

const WarpProFormTreeSelect: React.FC<ProFormTreeSelectProps> =
  React.forwardRef(ProFormTreeSelect);

export default WarpProFormTreeSelect;
