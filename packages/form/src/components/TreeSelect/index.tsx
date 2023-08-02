import type { TreeSelectProps } from 'antd';
import type { RefSelectProps } from 'antd/lib/select';
import React from 'react';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';

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
 * 级联选择框
 *
 * @param
 */
const ProFormTreeSelect: React.ForwardRefRenderFunction<
  any,
  ProFormTreeSelectProps<any>
> = ({ fieldProps, request, params, proFieldProps, ...rest }, ref) => {
  return (
    <ProFormField
      valueType="treeSelect"
      fieldProps={fieldProps}
      ref={ref}
      request={request}
      params={params}
      filedConfig={{ customLightMode: true }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

const WarpProFormTreeSelect: React.FC<ProFormTreeSelectProps> =
  React.forwardRef(ProFormTreeSelect);

export default WarpProFormTreeSelect;
