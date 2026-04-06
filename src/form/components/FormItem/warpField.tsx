import { FieldContext as RcFieldContext } from '@rc-component/form';
import type { FormItemProps } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import {
  pickProFormItemProps,
  stringify,
  useDeepCompareMemo,
  useRefFunction,
} from '../../../utils';
import FieldContext from '../../FieldContext';
import { useGridHelpers } from '../../helpers';
import type {
  ExtendsProps,
  ProFormFieldItemProps,
  ProFormItemCreateConfig,
} from '../../typing';
import { buildWarpFieldLightProps } from './warpFieldLightProps';
import {
  isWarpFieldIgnoreWidth,
  resolveWarpFieldClassName,
  resolveWarpFieldStyle,
} from './warpFieldLayout';
import {
  computeWarpFieldProFieldKey,
  mergeWarpFieldFieldProps,
  mergeWarpFieldFormItemProps,
  mergeWarpFieldOtherProps,
  mergeWarpFieldProFieldProps,
} from './warpFieldMerge';
import { WarpFieldDependencyWrapper } from './warpFieldDependency';
import {
  WarpFieldFormItemShell,
  WarpFieldInnerField,
} from './warpFieldNodes';

export const TYPE = Symbol('ProFormComponent');

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

    const isIgnoreWidth = useMemo(
      () => isWarpFieldIgnoreWidth(valueType, ignoreWidth),
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
    const changedProps = useDeepCompareMemo(
      () => {
        return {
          formItemProps: getFormItemProps?.(),
          fieldProps: getFieldProps?.(),
        };
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getFieldProps, getFormItemProps, rest.dependenciesValues, onlyChange],
    );

    const fieldProps: Record<string, any> = useDeepCompareMemo(() => {
      return mergeWarpFieldFieldProps({
        ignoreFormItem,
        restValue: rest.value,
        placeholder,
        disabled: props.disabled,
        contextFieldProps: contextValue.fieldProps,
        changedFieldProps: changedProps.fieldProps,
        restFieldProps: rest.fieldProps,
      });
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
      () =>
        mergeWarpFieldFormItemProps({
          contextFormItemProps: contextValue.formItemProps,
          restFormItemProps,
          changedFormItemProps: changedProps.formItemProps,
          restFormItemPropsExplicit: rest.formItemProps,
        }),
      [
        changedProps.formItemProps,
        contextValue.formItemProps,
        rest.formItemProps,
        restFormItemProps,
      ],
    );

    const otherProps = useDeepCompareMemo(
      () =>
        mergeWarpFieldOtherProps({
          messageVariables,
          defaultFormItemProps,
          formItemProps,
        }),
      [defaultFormItemProps, formItemProps, messageVariables],
    );

    const { prefixName } = useContext(RcFieldContext);

    const proFieldKey = useDeepCompareMemo(() => {
      return computeWarpFieldProFieldKey({
        name: otherProps?.name,
        prefixName,
        formKey: contextValue.formKey,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      return resolveWarpFieldStyle({
        width,
        grid: contextValue.grid,
        isIgnoreWidth,
        fieldStyle: fieldProps?.style,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringify(fieldProps?.style), contextValue.grid, isIgnoreWidth, width]);

    const className = useDeepCompareMemo(() => {
      return resolveWarpFieldClassName({
        width,
        fieldClassName: fieldProps?.className,
        isIgnoreWidth,
      });
    }, [width, fieldProps?.className, isIgnoreWidth]);

    const fieldProFieldProps = useDeepCompareMemo(() => {
      return mergeWarpFieldProFieldProps({
        contextProFieldProps: contextValue.proFieldProps,
        mode: rest?.mode,
        readonly,
        params: rest.params,
        proFieldKey,
        cacheForSwr,
        proFieldProps,
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
        <WarpFieldInnerField
          Field={Field}
          rest={rest as P}
          fieldFieldProps={fieldFieldProps}
          fieldProFieldProps={fieldProFieldProps}
          fieldKey={props.proFormFieldKey || props.name}
          fieldRef={props?.fieldRef}
        />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldProFieldProps, fieldFieldProps, rest]);

    // 使用useMemo包裹避免不必要的re-render
    const formItem = useDeepCompareMemo(() => {
      return (
        <WarpFieldFormItemShell
          itemKey={props.proFormFieldKey || otherProps.name?.toString()}
          label={label && proFieldProps?.light !== true ? label : undefined}
          tooltip={proFieldProps?.light !== true && tooltip}
          valuePropName={valuePropName}
          otherProps={otherProps}
          ignoreFormItem={ignoreFormItem}
          transform={transform}
          dataFormat={fieldProps?.format}
          valueType={valueType}
          messageVariables={{
            label: (label as string) || '',
            ...otherProps?.messageVariables,
          }}
          convertValue={convertValue}
          lightProps={buildWarpFieldLightProps({
            fieldProps,
            valueType,
            bordered,
            allowClear,
            fieldAllowClear: field?.props?.allowClear,
            proFieldLight: proFieldProps?.light,
            label,
            customLightMode,
            lightFilterLabelFormatter,
            valuePropName,
            footerRender: field?.props?.footerRender,
            restLightProps: rest.lightProps,
            otherPropsLightProps: otherProps.lightProps,
          })}
        >
          {field}
        </WarpFieldFormItemShell>
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
  > = (wrapperProps) => {
    const { dependencies } = wrapperProps;
    return (
      <WarpFieldDependencyWrapper
        dependencies={dependencies}
        originDependencies={wrapperProps.originDependencies}
        renderDirect={<FieldWithContext dependencies={dependencies} {...wrapperProps} />}
        renderWithDependencyValues={(values) => (
          <FieldWithContext
            dependenciesValues={values}
            dependencies={dependencies}
            {...wrapperProps}
          />
        )}
      />
    );
  };

  return DependencyWrapper;
}

export default warpField;
