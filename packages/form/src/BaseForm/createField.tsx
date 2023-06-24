import {
  isDeepEqualReact,
  omitUndefined,
  pickProFormItemProps,
  usePrevious,
} from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import classnames from 'classnames';
import { FieldContext as RcFieldContext } from 'rc-field-form';
import { noteOnce } from 'rc-util/lib/warning';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { stringify } from 'use-json-comparison';
import { ProFormDependency, ProFormItem } from '../components';
import FieldContext from '../FieldContext';
import { useGridHelpers } from '../helpers';
import type {
  ExtendsProps,
  ProFormFieldItemProps,
  ProFormItemCreateConfig,
} from '../typing';

export const TYPE = Symbol('ProFormComponent');

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  s: 216,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  sm: 216,
  m: 328,
  // 标准宽度，适用于大部分字段长度。
  md: 328,
  l: 440,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  lg: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552,
};

const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate'];

type ProFormComponent<P, Extends> = React.ComponentType<P & Extends>;

/**
 * 处理fieldProps和formItemProps为function时传进来的方法
 * 目前只在SchemaForm时可能会有
 */
type FunctionFieldProps = {
  getFormItemProps?: () => Record<string, any>;
  getFieldProps?: () => Record<string, any>;
};

/**
 * 这个方法的主要作用的帮助 Field 增加 FormItem 同时也会处理 lightFilter
 *
 * @param Field
 * @param config
 */
function createField<P extends ProFormFieldItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps & FunctionFieldProps> {
  // 标记是否是 ProForm 的组件
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  Field.displayName = 'ProFormComponent';

  const FieldWithContext: React.FC<P & ExtendsProps & FunctionFieldProps> = (
    props,
  ) => {
    const {
      valueType: tmpValueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ignoreWidth,
      defaultProps,
      ...defaultFormItemProps
    } = { ...props?.filedConfig, ...config } || {};
    const {
      label,
      tooltip,
      placeholder,
      width,
      bordered,
      messageVariables,
      ignoreFormItem,
      transform,
      convertValue,
      readonly,
      allowClear,
      colSize,
      getFormItemProps,
      getFieldProps,
      filedConfig,
      cacheForSwr,
      proFieldProps,
      ...rest
    } = { ...defaultProps, ...props };
    const valueType = tmpValueType || rest.valueType;

    // 有些 valueType 不需要宽度
    const isIgnoreWidth = useMemo(
      () => ignoreWidth || ignoreWidthValueType.includes(valueType),
      [ignoreWidth, valueType],
    );

    const [, forceUpdate] = useState<[]>();

    // onChange触发fieldProps,formItemProps重新执行
    const [onlyChange, forceUpdateByOnChange] = useState<[]>();

    /**
     * 从 context 中拿到的值
     */
    const contextValue = React.useContext(FieldContext);

    /**
     * dependenciesValues change to trigger re-execute of getFieldProps and getFormItemProps
     */
    const changedProps = useMemo(
      () => {
        return {
          formItemProps: getFormItemProps?.(),
          fieldProps: getFieldProps?.(),
        };
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getFieldProps, getFormItemProps, rest.dependenciesValues, onlyChange],
    );

    const fieldProps: Record<string, any> = useMemo(() => {
      const newFieldProps: any = {
        ...(ignoreFormItem ? omitUndefined({ value: rest.value }) : {}),
        placeholder,
        disabled: props.disabled,
        ...contextValue.fieldProps,
        ...changedProps.fieldProps,
        // 支持未传递getFieldProps的情况
        // 某些特殊hack情况下覆盖原来设置的fieldProps参数
        ...rest.fieldProps,
      };

      newFieldProps.style = omitUndefined(newFieldProps?.style);
      return newFieldProps;
    }, [
      ignoreFormItem,
      rest.value,
      rest.fieldProps,
      placeholder,
      props.disabled,
      contextValue.fieldProps,
      changedProps.fieldProps,
    ]);

    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);

    const formItemProps: FormItemProps = useMemo(
      () => ({
        ...contextValue.formItemProps,
        ...restFormItemProps,
        ...changedProps.formItemProps,
        // 支持未传递getFormItemProps的情况
        // 某些特殊hack情况下覆盖原来设置的formItemProps参数
        ...rest.formItemProps,
      }),
      [
        changedProps.formItemProps,
        contextValue.formItemProps,
        rest.formItemProps,
        restFormItemProps,
      ],
    );

    const otherProps = useMemo(
      () => ({
        messageVariables,
        ...defaultFormItemProps,
        ...formItemProps,
      }),
      [defaultFormItemProps, formItemProps, messageVariables],
    );

    noteOnce(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      !rest['defaultValue'],
      '请不要在 Form 中使用 defaultXXX。如果需要默认值请使用 initialValues 和 initialValue。',
    );

    const { prefixName } = useContext(RcFieldContext);
    const proFieldKey = useMemo(() => {
      let name = otherProps?.name;
      if (Array.isArray(name)) name = name.join('_');
      if (Array.isArray(prefixName) && name)
        name = `${prefixName.join('.')}.${name}`;
      const key = name && `form-${contextValue.formKey ?? ''}-field-${name}`;
      return key;

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringify(otherProps?.name), prefixName, contextValue.formKey]);

    const prefRest = usePrevious(rest);

    const onChange = useCallback(
      (...restParams: any[]) => {
        if (getFormItemProps || getFieldProps) {
          forceUpdateByOnChange([]);
        } else if (rest.renderFormItem) {
          forceUpdate([]);
        }
        fieldProps?.onChange?.(...restParams);
      },
      [getFieldProps, getFormItemProps, fieldProps, rest.renderFormItem],
    );

    const style = useMemo(() => {
      const newStyle = {
        width:
          width && !WIDTH_SIZE_ENUM[width]
            ? width
            : contextValue.grid
            ? '100%'
            : undefined,
        ...fieldProps?.style,
      };

      if (isIgnoreWidth) Reflect.deleteProperty(newStyle, 'width');

      return omitUndefined(newStyle);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringify(fieldProps?.style), contextValue.grid, isIgnoreWidth, width]);

    const className = useMemo(() => {
      const isSizeEnum = width && WIDTH_SIZE_ENUM[width];
      return (
        classnames(fieldProps?.className, {
          'pro-field': isSizeEnum,
          [`pro-field-${width}`]: isSizeEnum && !isIgnoreWidth,
        }) || undefined
      );
    }, [width, fieldProps?.className, isIgnoreWidth]);

    const fieldProFieldProps = useMemo(() => {
      return omitUndefined({
        ...contextValue.proFieldProps,
        mode: rest?.mode,
        readonly,
        params: rest.params,
        proFieldKey: proFieldKey,
        cacheForSwr,
        ...proFieldProps,
      });
    }, [
      rest?.mode,
      rest.params,
      readonly,
      proFieldKey,
      cacheForSwr,
      proFieldProps,
    ]);

    const fieldFieldProps = useMemo(() => {
      return {
        onChange,
        allowClear,
        ...fieldProps,
        style,
        className,
      };
    }, [allowClear, className, onChange, fieldProps, style]);
    const field = useMemo(() => {
      return (
        <Field
          // @ts-ignore
          key={props.proFormFieldKey || props.name}
          // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
          // 比如 ProFormSelect 的 request
          {...(rest as P)}
          fieldProps={fieldFieldProps}
          proFieldProps={fieldProFieldProps}
          ref={props?.fieldRef}
        />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      fieldProFieldProps,
      fieldFieldProps,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isDeepEqualReact(prefRest, rest, [
        'onChange',
        'onBlur',
        'onFocus',
        'record',
      ])
        ? undefined
        : {},
    ]);

    // 使用useMemo包裹避免不必要的re-render
    const formItem = useMemo(() => {
      return (
        <ProFormItem
          // 全局的提供一个 tip 功能，可以减少代码量
          // 轻量模式下不通过 FormItem 显示 label
          label={label && proFieldProps?.light !== true ? label : undefined}
          tooltip={proFieldProps?.light !== true && tooltip}
          valuePropName={valuePropName}
          // @ts-ignore
          key={props.proFormFieldKey || otherProps.name?.toString()}
          // @ts-ignore
          {...otherProps}
          ignoreFormItem={ignoreFormItem}
          transform={transform}
          dataFormat={fieldProps?.format}
          valueType={valueType}
          messageVariables={{
            label: (label as string) || '',
            ...otherProps?.messageVariables,
          }}
          convertValue={convertValue}
          lightProps={omitUndefined({
            ...fieldProps,
            valueType,
            bordered,
            allowClear: field?.props?.allowClear ?? allowClear,
            light: proFieldProps?.light,
            label,
            customLightMode,
            labelFormatter: lightFilterLabelFormatter,
            valuePropName,
            footerRender: field?.props?.footerRender,
            // 使用用户的配置覆盖默认的配置
            ...rest.lightProps,
            ...otherProps.lightProps,
          })}
        >
          {field}
        </ProFormItem>
      );
    }, [
      label,
      proFieldProps?.light,
      tooltip,
      valuePropName,
      props.proFormFieldKey,
      otherProps,
      ignoreFormItem,
      transform,
      fieldProps,
      valueType,
      convertValue,
      bordered,
      field,
      allowClear,
      customLightMode,
      lightFilterLabelFormatter,
      rest.lightProps,
    ]);

    const { ColWrapper } = useGridHelpers(rest);

    return <ColWrapper>{formItem}</ColWrapper>;
  };

  const DependencyWrapper: React.FC<
    P &
      ExtendsProps &
      FunctionFieldProps & {
        originDependencies?: string[];
      }
  > = (props) => {
    const { dependencies } = props;
    return dependencies ? (
      <ProFormDependency
        name={dependencies}
        originDependencies={props?.originDependencies}
      >
        {(values) => {
          return (
            <FieldWithContext
              dependenciesValues={values}
              dependencies={dependencies}
              {...props}
            />
          );
        }}
      </ProFormDependency>
    ) : (
      <FieldWithContext dependencies={dependencies} {...props} />
    );
  };

  return DependencyWrapper;
}

export { createField };
