import { omitUndefined } from '@ant-design/pro-utils';
import omit from 'omit.js';
import type { ProFormFieldProps } from '../../Field';
import ProFormField from '../../Field';
import type { ProSchemaRenderValueTypeFunction } from '../typing';
import ProFormDependency from '../../Dependency';
import React from 'react';

export const field: ProSchemaRenderValueTypeFunction<any, any> = (
  item,
  { action, formRef, type, originItem },
) => {
  /** 公用的 类型 props */
  const formFieldProps = {
    ...omit(item, [
      'dataIndex',
      'width',
      'render',
      'renderFormItem',
      'renderText',
      'title',
    ]),
    name: item.name || item.key || item.dataIndex,
    width: item.width as 'md',
    render: item?.render
      ? (dom, entity, renderIndex) =>
          item?.render?.(dom, entity, renderIndex, action?.current, {
            type,
            ...item,
            key: item.key?.toString(),
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
          })
      : undefined,
  } as Omit<ProFormFieldProps, 'fieldProps' | 'formItemProps'>;

  const defaultRender = () => {
    return <ProFormField {...formFieldProps} ignoreFormItem={true} />;
  };

  const renderFormItem = item?.renderFormItem
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined });
        return item?.renderFormItem?.(
          {
            type,
            ...item,
            key: item.key?.toString(),
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
            originProps: originItem,
          },
          {
            ...renderConfig,
            defaultRender,
            type,
          },
          formRef.current!,
        );
      }
    : undefined;

  const getField = () => {
    if (item?.renderFormItem) {
      const dom = renderFormItem?.(null, {});

      if (!dom || item.ignoreFormItem) return dom;
    }

    return (
      <ProFormField
        {...formFieldProps}
        key={[item.key, item.index || 0].join('-')}
        renderFormItem={renderFormItem}
      />
    );
  };

  if (item.dependencies) {
    return (
      <ProFormDependency
        name={item.dependencies || []}
        key={item.key as React.Key}
      >
        {getField}
      </ProFormDependency>
    );
  }

  return getField();
};
