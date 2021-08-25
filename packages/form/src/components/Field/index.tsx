import React from 'react';
import ProField from '@ant-design/pro-field';
import type { InputProps, SelectProps } from 'antd';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormItemCreateConfig } from '../../BaseForm/createField';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';
import ProFormDependency from '../Dependency';

export type ProFormFieldProps<T = any, FiledProps = InputProps & SelectProps<string>> = ProSchema<
  T,
  ProFormFieldItemProps<FiledProps> & {
    mode?: 'edit' | 'read' | 'update';
    // 用来判断是不是被嵌套渲染的 dom
    isDefaultDom?: boolean;
    ref?: any;
    plain?: boolean;
    text?: any;
  },
  any,
  any
>;
/**
 * 最普通的 Text 组件
 *
 * @param
 */
const ProFormField: React.FC<
  ProFormFieldProps<any> & {
    onChange?: Function;
    /** 给自定义组件行为开的口子 */
    filedConfig?: ProFormItemCreateConfig;
  }
> = React.forwardRef((props, ref) => {
  const {
    fieldProps,
    children,
    labelCol,
    label,
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
    valuePropName = 'value',
    ...restProps
  } = props;
  // 防止 formItem 的值被吃掉
  if (children) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...restProps,
        onChange: (...restParams: any) => {
          (fieldProps?.onChange as any)?.(...restParams);
          onChange?.(...restParams);
        },
        ...children.props,
      });
    }
    return children as JSX.Element;
  }

  const renderDom = (values?: Record<string, any>) => {
    const propsParams = values ? { ...params, ...(values || {}) } : params;
    return (
      <ProField
        ref={ref}
        valuePropName={valuePropName}
        text={fieldProps?.[valuePropName]}
        render={render as any}
        renderFormItem={renderFormItem as any}
        valueType={(valueType as 'text') || 'text'}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
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

  if (restProps.dependencies && restProps.request && restProps?.mode !== 'read') {
    return (
      <ProFormDependency name={restProps.dependencies}>
        {(values) => {
          return renderDom(values);
        }}
      </ProFormDependency>
    );
  }

  return renderDom();
});

export default createField<ProFormFieldProps>(ProFormField) as <FiledProps, DataType = {}>(
  props: ProFormFieldProps<DataType, FiledProps> & {
    /** 给自定义组件行为开的口子 */
    filedConfig?: ProFormItemCreateConfig;
  },
) => React.ReactElement;
