import React, { memo, useContext, useMemo } from 'react';
import { PureProField } from '../../../field';
import type { ProSchema } from '../../../utils';
import { isDeepEqualReact, runFunction, useRefFunction } from '../../../utils';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import type { ProFormFieldItemProps } from '../../typing';
import warpField from '../FormItem/warpField';

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
    formItemRender,
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
          ...((children?.props as any) || {}),
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
    <PureProField
      text={fieldProps?.[valuePropName]}
      render={render}
      formItemRender={formItemRender}
      valueType={valueType || 'text'}
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

const ProFormField = warpField<ProFormFieldProps>?.(
  memo(BaseProFormField, (prevProps, nextProps) => {
    return isDeepEqualReact(nextProps, prevProps, ['onChange', 'onBlur']);
  }),
) as <FiledProps, DataType = Record<string, any>>(
  props: ProFormFieldProps<DataType, FiledProps>,
) => React.ReactElement;

export default ProFormField;
