import ProField from '@ant-design/pro-field';
import type { ProSchema } from '@ant-design/pro-utils';
import {
  isDeepEqualReact,
  runFunction,
  useRefFunction,
} from '@ant-design/pro-utils';
import React, { memo, useContext, useMemo } from 'react';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import { createField } from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../typing';

export type ProFormFieldProps<
  T = any,
  FiledProps = Record<string, any>,
> = ProSchema<
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
    originDependencies?: Record<string, any>;
  },
  any,
  any
>;

const BaseProFormField: React.FC<
  ProFormFieldProps & {
    onChange?: (...args: any) => any;
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

  const modeContext = useContext(EditOrReadOnlyContext);

  const propsParams = useMemo(() => {
    // 使用dependencies时 dependenciesValues是有值的
    // 此时如果存在request，注入dependenciesValues
    return dependenciesValues && restProps.request
      ? {
          ...params,
          ...(dependenciesValues || {}),
        }
      : params;
  }, [dependenciesValues, params, restProps.request]);

  const memoUnChange = useRefFunction((...restParams: any) => {
    if (fieldProps?.onChange) {
      (fieldProps?.onChange as any)?.(...restParams);
      return;
    }
  });

  const memoFieldProps = useMemo(
    () => ({
      autoFocus,
      ...fieldProps,
      onChange: memoUnChange,
    }),
    [autoFocus, fieldProps, memoUnChange],
  );

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
      return <>{children}</>;
    }
    return;
  }, [children, fieldProps?.onChange, onChange, restProps]);

  if (childrenRender) {
    return childrenRender;
  }

  return (
    <ProField
      text={fieldProps?.[valuePropName]}
      render={render as any}
      renderFormItem={renderFormItem as any}
      valueType={(valueType as 'text') || 'text'}
      cacheForSwr={cacheForSwr}
      fieldProps={memoFieldProps}
      valueEnum={runFunction(valueEnum)}
      {...proFieldProps}
      {...restProps}
      mode={proFieldProps?.mode || modeContext.mode || 'edit'}
      params={propsParams}
    />
  );
};

const ProFormField = createField<ProFormFieldProps>(
  memo(BaseProFormField, (prevProps, nextProps) => {
    return isDeepEqualReact(nextProps, prevProps, ['onChange', 'onBlur']);
  }),
) as <FiledProps, DataType = Record<string, any>>(
  props: ProFormFieldProps<DataType, FiledProps>,
) => React.ReactElement;

export default ProFormField;
