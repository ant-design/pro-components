/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useMemo } from 'react';
import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction, isDeepEqualReact } from '@ant-design/pro-utils';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

export type ProFormFieldProps<T = any, FiledProps = Record<string, any>> = ProSchema<
  T,
  ProFormFieldItemProps<FiledProps> & {
    mode?: 'edit' | 'read' | 'update';
    // 用来判断是不是被嵌套渲染的 dom
    isDefaultDom?: boolean;
    ref?: any;
    plain?: boolean;
    text?: any;
    getFieldProps?: () => Record<string, any>;
    getFormItemProps?: () => Record<string, any>;
    /**
     * dependencies value
     */
    dependenciesValues?: Record<string, any>;
  },
  any,
  any
>;

const ProFormField: React.FC<
  ProFormFieldProps & {
    onChange?: Function;
    autoFocus?: boolean;
  }
> = (props) => {
  const {
    fieldProps,
    children,
    labelCol,
    label,
    autoFocus,
    isDefaultDom,
    render,
    proFieldProps,
    renderFormItem,
    valueType,
    initialValue,
    onChange,
    valueEnum,
    params,
    name,
    dependenciesValues,
    cacheForSwr = false,
    valuePropName = 'value',
    ...restProps
  } = props;

  const propsParams = useMemo(() => {
    return dependenciesValues
      ? {
          ...params,
          // dependencies change
          ...(dependenciesValues || {}),
        }
      : params;
  }, [dependenciesValues, params]);

  const childrenRender = useMemo(() => {
    // 防止 formItem 的值被吃掉
    if (children) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          ...restProps,
          onChange: (...restParams: any) => {
            if (fieldProps?.onChange) {
              (fieldProps?.onChange as any)?.(...restParams);
              return;
            }
            onChange?.(...restParams);
          },
          ...children.props,
        });
      }
      return children as JSX.Element;
    }
    return;
  }, [children, fieldProps?.onChange, onChange, restProps]);

  if (childrenRender) {
    return childrenRender;
  }

  return (
    <ProField
      valuePropName={valuePropName}
      text={fieldProps?.[valuePropName]}
      render={render as any}
      renderFormItem={renderFormItem as any}
      valueType={(valueType as 'text') || 'text'}
      cacheForSwr={cacheForSwr}
      fieldProps={{
        autoFocus,
        ...fieldProps,
        onChange: (...restParams: any) => {
          if (fieldProps?.onChange) {
            (fieldProps?.onChange as any)?.(...restParams);
            return;
          }
          onChange?.(...restParams);
        },
      }}
      valueEnum={runFunction(valueEnum)}
      {...proFieldProps}
      {...restProps}
      mode={proFieldProps?.mode || 'edit'}
      params={propsParams}
    />
  );
};

export default createField<ProFormFieldProps>(
  memo(ProFormField, (prevProps, nextProps) => {
    return isDeepEqualReact(nextProps, prevProps, ['onChange', 'onBlur']);
  }),
) as <FiledProps, DataType = {}>(
  props: ProFormFieldProps<DataType, FiledProps>,
) => React.ReactElement;
