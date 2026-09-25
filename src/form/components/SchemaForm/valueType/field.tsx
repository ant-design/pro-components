import { omit } from '@rc-component/util';
import React from 'react';
import { omitUndefined } from '../../../../utils';
import ProFormDependency from '../../Dependency';
import type { ProFormFieldProps } from '../../Field';
import ProFormField from '../../Field';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

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
      'formItemRender',
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
    const { key, ...rest } = formFieldProps;
    return <ProFormField key={key} {...rest} ignoreFormItem={true} />;
  };

  const formItemRender = item?.formItemRender
    ? (_: any, config: any) => {
        const renderConfig = {
          ...omitUndefined({
            ...config,
            onChange: undefined,
            // Do not hand the wrapper back to user-rendered ProForm fields.
            // Spreading config into one of those fields would recursively call
            // this same formItemRender forever (#9676).
            formItemRender: undefined,
          }),
        };
        // `defaultRender` and `type` are control metadata rather than field
        // props. Keep direct/destructured access for compatibility, but make
        // them non-enumerable so `{...config}` cannot feed a newly-created
        // defaultRender function back into another ProForm field and trigger
        // an update loop (#9676).
        Object.defineProperties(renderConfig, {
          defaultRender: {
            configurable: true,
            enumerable: false,
            value: defaultRender,
          },
          type: {
            configurable: true,
            enumerable: false,
            value: type,
          },
        });
        return item?.formItemRender?.(
          {
            type,
            ...item,
            key: item.key?.toString(),
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
            originProps: originItem,
          },
          renderConfig,
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
      <ProFormField
        {...formFieldProps}
        key={[item.key, item.index || 0].join('-')}
        formItemRender={formItemRender}
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
