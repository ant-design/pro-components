﻿import type { TreeSelectProps } from 'antd';
import type { RefSelectProps } from 'antd/es/select';
import React from 'react';
import { FieldTreeSelect } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
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
 * 树选择器
 *
 * @param
 */
const ProFormTreeSelect: React.FC<ProFormTreeSelectProps<any>> = ({
  fieldProps,
  request,
  params,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        treeSelect: {
          render: (text, props) => <FieldTreeSelect {...props} text={text} />,
          formItemRender: (text, props) => <FieldTreeSelect {...props} text={text} />,
        },
      }}
    >
      <ProFormField
        ref={ref}
        fieldConfig={{ customLightMode: true }}
        fieldProps={fieldProps}
        params={params}
        proFieldProps={proFieldProps}
        request={request}
        valueType="treeSelect"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormTreeSelect;
