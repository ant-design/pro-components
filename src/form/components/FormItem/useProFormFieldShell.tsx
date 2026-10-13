import { FieldContext as RcFieldContext } from '@rc-component/form';
import { useComposeRef } from '@rc-component/util';
import type { FormItemProps } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useState } from 'react';
import {
  isDropdownValueType,
  omitProFormItemProps,
  omitUndefined,
  pickProFormItemProps,
  stringify,
  useDeepCompareMemo,
  useRefFunction,
} from '../../../utils';
import FieldContext from '../../FieldContext';
import { useGridHelpers } from '../../helpers';
import { LightFilterFieldContext } from '../../layouts/LightFilter/LightFilterFieldContext';
import type {
  ExtendsProps,
  ProFormFieldItemProps,
  ProFormItemCreateConfig,
} from '../../typing';
import type { ProFormItemProps } from './typing';
import ProFormItem from './index';
import { createWarpFieldLazyBoundary } from './warpFieldAsync';
import type { WarpFieldLightPopoverRenderProps } from './warpFieldLightTypes';

const StandaloneLightPopoverBoundary =
  createWarpFieldLazyBoundary<WarpFieldLightPopoverRenderProps>(() =>
    import('../../layouts/LightFilter/LightFilterPopoverField').then(
      (module) => ({
        default: module.LightFilterPopoverField,
      }),
    ),
  );

const WIDTH_SIZE_ENUM = {
  xs: 104,
  s: 216,
  sm: 216,
  m: 328,
  md: 328,
  l: 440,
  lg: 440,
  xl: 552,
};

const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate'];

export type ProFormFieldShellFunctionProps = {
  getFormItemProps?: () => Record<string, any>;
  getFieldProps?: () => Record<string, any>;
};

export type UseProFormFieldShellOptions<P extends ProFormFieldItemProps> = {
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>;
  config?: ProFormItemCreateConfig;
};

/**
 * Pro 表单项外壳：Form.Item、栅格、light、props 合并等逻辑。
 * 由 {@link createProFormField} 调用，一般无需直接使用。
 */
export function useProFormFieldShell<P extends ProFormFieldItemProps = any>(
  props: P & ExtendsProps & ProFormFieldShellFunctionProps,
  forwardedRef: React.Ref<any>,
  options: UseProFormFieldShellOptions<P>,
): React.ReactNode {
  const { Field, config } = options;
  const {
    valueType: tmpValueType,
    customLightMode,
    lightFilterLabelFormatter,
    valuePropName = 'value',
    ignoreWidth,
    defaultProps,
    help: _configHelp,
    ...defaultFormItemProps
  } = { ...props?.fieldConfig, ...config } as ProFormItemCreateConfig;
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
    colSize: _colSize,
    getFormItemProps,
    getFieldProps,
    fieldConfig: _fieldConfig,
    cacheForSwr,
    proFieldProps,
    ...rest
  } = { ...defaultProps, ...props };
  const valueType = tmpValueType || rest.valueType;

  const isIgnoreWidth = useMemo(
    () => ignoreWidth || ignoreWidthValueType.includes(valueType),
    [ignoreWidth, valueType],
  );

  const [, forceUpdate] = useState<[]>();
  const [onlyChange, forceUpdateByOnChange] = useState<[]>();

  const contextValue = React.useContext(FieldContext);
  const lightFilterFieldContext = React.useContext(LightFilterFieldContext);

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

  const restFormItemProps = pickProFormItemProps(rest);

  const formItemProps: FormItemProps = useDeepCompareMemo(
    () => ({
      ...contextValue.formItemProps,
      ...restFormItemProps,
      ...changedProps.formItemProps,
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
    () => {
      const merged: FormItemProps = {
        messageVariables,
        ...defaultFormItemProps,
        ...formItemProps,
      };
      if (contextValue.skipFieldRules) {
        return { ...merged, rules: [] };
      }
      return merged;
    },
    [defaultFormItemProps, formItemProps, messageVariables, contextValue.skipFieldRules],
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

  const mergedFieldRef = useComposeRef(
    forwardedRef as any,
    props?.fieldRef as any,
  );

  const fieldComponentProps = useMemo(
    () => omitProFormItemProps(rest),
    [rest],
  );

  const field = useDeepCompareMemo(() => {
    return (
      <Field
        key={props.proFormFieldKey || props.name}
        {...(fieldComponentProps as P)}
        readonly={readonly}
        fieldProps={fieldFieldProps}
        proFieldProps={fieldProFieldProps}
        ref={mergedFieldRef}
      />
    );
  }, [
    Field,
    fieldProFieldProps,
    fieldFieldProps,
    fieldComponentProps,
    mergedFieldRef,
    readonly,
    props.name,
    props.proFormFieldKey,
  ]);

  const isLightField = proFieldProps?.light === true;
  const isLightMode = isLightField && !customLightMode;

  const formItem = useDeepCompareMemo(() => {
    const { help, ...restOtherProps } = otherProps as ProFormItemProps;

    if (isLightMode && !isDropdownValueType(valueType)) {
      const formItemKey = props.proFormFieldKey || otherProps.name?.toString();
      const messageVariablesMerged = {
        label: (label as string) || '',
        ...otherProps?.messageVariables,
      };
      const lightFallback = (
        <ProFormItem
          label={undefined}
          tooltip={false}
          valuePropName={valuePropName}
          key={formItemKey}
          {...restOtherProps}
          help={help}
          ignoreFormItem={ignoreFormItem}
          transform={transform}
          dataFormat={fieldProps?.format}
          valueType={valueType}
          messageVariables={messageVariablesMerged}
          convertValue={convertValue}
        >
          {field}
        </ProFormItem>
      );
      const lightPopoverProps: WarpFieldLightPopoverRenderProps = {
        field: field as React.ReactElement,
        label,
        valuePropName,
        restOtherProps,
        help,
        ignoreFormItem,
        transform,
        dataFormat: fieldProps?.format,
        valueType,
        messageVariables: messageVariablesMerged,
        convertValue,
        formItemKey,
        variant: rest.variant ?? fieldProps?.variant,
        placement: rest.placement,
        allowClear,
        footerRender: (field as React.ReactElement)?.props?.footerRender,
        fieldAllowClear: (field as React.ReactElement)?.props?.allowClear,
        labelFormatter: lightFilterLabelFormatter,
      };

      if (lightFilterFieldContext.renderLightPopoverField) {
        return lightFilterFieldContext.renderLightPopoverField(lightPopoverProps);
      }

      return (
        <StandaloneLightPopoverBoundary
          enabled
          fallback={lightFallback}
          {...lightPopoverProps}
        />
      );
    }

    return (
      <ProFormItem
        valuePropName={valuePropName}
        key={props.proFormFieldKey || otherProps.name?.toString()}
        {...restOtherProps}
        help={help}
        noStyle={otherProps?.noStyle ?? isLightField}
        label={isLightField ? undefined : label}
        tooltip={isLightField ? undefined : tooltip}
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
    isLightField,
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
    lightFilterFieldContext.renderLightPopoverField,
    rest.variant,
    rest.placement,
  ]);

  const { ColWrapper } = useGridHelpers(rest);

  return <ColWrapper>{formItem}</ColWrapper>;
}
