import { omit } from '@rc-component/util';
import React from 'react';
import { omitUndefined } from '../../../../utils';
import ProFormDependency from '../../Dependency';
import type { ProFormFieldProps } from '../../Field';
import ProFormField from '../../Field';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const field: ProSchemaRenderValueTypeFunction<any, any> = (item, { action, formRef, type, originItem }) => {
  /** 公用的 类型 props */
  const formFieldProps = {
    ...omit(item, ['dataIndex', 'width', 'render', 'formItemRender', 'renderText', 'title']),
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
    const { key, ...rest } = formFieldProps;
    return <ProFormField key={key} {...rest} ignoreFormItem={true} />;
  };

  const formItemRender = item?.formItemRender
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined });
        return item?.formItemRender?.(
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
    if (item?.formItemRender) {
      const dom = formItemRender?.(null, {});
      if (!dom || item.ignoreFormItem) return dom;
    }

    return (
      <ProFormField {...formFieldProps} key={[item.key, item.index || 0].join('-')} formItemRender={formItemRender} />
    );
  };

  if (item.dependencies) {
    return (
      <ProFormDependency key={item.key as React.Key} name={item.dependencies || []}>
        {getField}
      </ProFormDependency>
    );
  }

  return getField();
};
