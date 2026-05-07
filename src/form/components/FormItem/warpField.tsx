import { FieldContext as RcFieldContext } from '@rc-component/form';
import type { FormItemProps } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useState } from 'react';
import {
  isDropdownValueType,
  omitUndefined,
  pickProFormItemProps,
  stringify,
  useDeepCompareMemo,
  useRefFunction,
} from '../../../utils';
import FieldContext from '../../FieldContext';
import { useGridHelpers } from '../../helpers';
import { LightWrapper } from '../../layouts/LightFilter/LightWrapper';
import type {
  ExtendsProps,
  ProFormFieldItemProps,
  ProFormItemCreateConfig,
} from '../../typing';
import ProFormDependency from '../Dependency';
import ProFormItem from './index';

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
 * 这个方法的主要作用是帮助 Field 增加 FormItem 同时也会处理 lightFilter
 *
 * @param Field
 * @param config
 */
export function warpField<P extends ProFormFieldItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps & FunctionFieldProps> {
  // 标记是否是 ProForm 的组件
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
    } = { ...props?.fieldConfig, ...config };
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
      fieldConfig,
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
    const changedProps = useDeepCompareMemo(() => {
      return {
        formItemProps: getFormItemProps?.(),
        fieldProps: getFieldProps?.(),
      };
    }, [getFieldProps, getFormItemProps, rest.dependenciesValues, onlyChange]);

    const fieldProps: Record<string, any> = useDeepCompareMemo(() => {
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

    const formItemProps: FormItemProps = useDeepCompareMemo(
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

    const otherProps = useDeepCompareMemo(
      () => ({
        messageVariables,
        ...defaultFormItemProps,
        ...formItemProps,
      }),
      [defaultFormItemProps, formItemProps, messageVariables],
    );

    const { prefixName } = useContext(RcFieldContext);

    const proFieldKey = useDeepCompareMemo(() => {
      let name = otherProps?.name;
      if (Array.isArray(name)) name = name.join('_');
      if (Array.isArray(prefixName) && name)
        name = `${prefixName.join('.')}.${name}`;
      const key = name && `form-${contextValue.formKey ?? ''}-field-${name}`;
      return key;
    }, [stringify(otherProps?.name), prefixName, contextValue.formKey]);

    const onChange = useRefFunction((...restParams: any[]) => {
      if (getFormItemProps || getFieldProps) {
        forceUpdateByOnChange([]);
      } else if (rest.formItemRender) {
        forceUpdate([]);
      }
      fieldProps?.onChange?.(...restParams);
    });

    const style = useDeepCompareMemo(() => {
      const newStyle = {
        width:
          width && !WIDTH_SIZE_ENUM[width as 'xs']
            ? width
            : contextValue.grid
              ? '100%'
              : undefined,
        ...fieldProps?.style,
      };

      if (isIgnoreWidth) Reflect.deleteProperty(newStyle, 'width');

      return omitUndefined(newStyle);
    }, [stringify(fieldProps?.style), contextValue.grid, isIgnoreWidth, width]);

    const className = useDeepCompareMemo(() => {
      const isSizeEnum = width && WIDTH_SIZE_ENUM[width as 'xs'];
      return (
        clsx(fieldProps?.className, {
          'pro-field': isSizeEnum,
          [`pro-field-${width}`]: isSizeEnum && !isIgnoreWidth,
        }) || undefined
      );
    }, [width, fieldProps?.className, isIgnoreWidth]);

    const fieldProFieldProps = useDeepCompareMemo(() => {
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
      contextValue.proFieldProps,
      rest?.mode,
      rest.params,
      readonly,
      proFieldKey,
      cacheForSwr,
      proFieldProps,
    ]);

    const fieldFieldProps = useDeepCompareMemo(() => {
      return {
        onChange,
        allowClear,
        ...fieldProps,
        style,
        className,
      };
    }, [allowClear, className, onChange, fieldProps, style]);

    const field = useDeepCompareMemo(() => {
      return (
        <Field
          key={props.proFormFieldKey || props.name}
          // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
          // 比如 ProFormSelect 的 request
          {...(rest as P)}
          fieldProps={fieldFieldProps}
          proFieldProps={fieldProFieldProps}
          ref={props?.fieldRef}
        />
      );
    }, [fieldProFieldProps, fieldFieldProps, rest]);

    const isLightMode = proFieldProps?.light === true && !customLightMode;

    // 使用useMemo包裹避免不必要的re-render
    const formItem = useDeepCompareMemo(() => {
      // light 模式下（非下拉类）：由 Form.Item 正常注入 value，LightWrapper 作为 Form.Item
      // 的直接 children 接收 value/onChange，再把 Field 渲染在 Popover 内部
      if (isLightMode && !isDropdownValueType(valueType)) {
        return (
          <ProFormItem
            label={undefined}
            tooltip={false}
            valuePropName={valuePropName}
            key={props.proFormFieldKey || otherProps.name?.toString()}
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
          >
            <LightWrapper
              label={label}
              valuePropName={valuePropName}
              variant={rest.variant ?? fieldProps?.variant}
              allowClear={field?.props?.allowClear ?? allowClear}
              footerRender={field?.props?.footerRender}
              placement={rest.placement}
              labelFormatter={lightFilterLabelFormatter}
              valueType={valueType}
            >
              {field}
            </LightWrapper>
          </ProFormItem>
        );
      }

      // 轻量模式下 Form.Item 不展示 label/tooltip，防止 otherProps 展开时把 label 覆盖回来
      const otherPropsForFormItem = isLightMode
        ? { ...otherProps, label: undefined, tooltip: undefined }
        : otherProps;
      return (
        <ProFormItem
          label={!isLightMode ? label : undefined}
          tooltip={!isLightMode ? tooltip : undefined}
          valuePropName={valuePropName}
          key={props.proFormFieldKey || otherProps.name?.toString()}
          {...otherPropsForFormItem}
          ignoreFormItem={ignoreFormItem}
          transform={transform}
          dataFormat={fieldProps?.format}
          valueType={valueType}
          messageVariables={{
            label: (label as string) || '',
            ...otherProps?.messageVariables,
          }}
          convertValue={convertValue}
        >
          {field}
        </ProFormItem>
      );
    }, [
      isLightMode,
      label,
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
      rest.variant,
      rest.placement,
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

export default warpField;
