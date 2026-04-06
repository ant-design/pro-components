import { FieldContext as RcFieldContext } from '@rc-component/form';
import type { FormItemProps } from 'antd';
import { clsx } from 'clsx';
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
 * 为 Pro 字段组件补上 `ProFormItem` 壳，并处理轻量筛选（LightFilter）、宽度、`dependencies` 等。
 *
 * **本函数内 props 合并总顺序（与 `warpFieldMerge` / `warpFieldLightProps` 子模块一致）：**
 *
 * 1. `rest` 上非 Form.Item 的部分先经 **`pickProFormItemProps(rest)`** 得到 `restFormItemProps`（白名单）。
 * 2. **`mergeWarpFieldFieldProps`**：`ignoreFormItem` → placeholder/disabled → `FieldContext.fieldProps` → `getFieldProps?.()` → `rest.fieldProps`。
 * 3. **`mergeWarpFieldFormItemProps`**：`FieldContext.formItemProps` → `restFormItemProps` → `getFormItemProps?.()` → `rest.formItemProps`。
 * 4. **`mergeWarpFieldOtherProps`**：`messageVariables` → `fieldConfig`/默认表单项 → 上一步的 `formItemProps`。
 * 5. **`mergeWarpFieldProFieldProps`**：上下文 `proFieldProps` 与用户 `proFieldProps` 等。
 * 6. 样式/宽度：**`resolveWarpFieldStyle` / `resolveWarpFieldClassName`**（见 `warpFieldLayout.ts`）。
 * 7. 传给 `ProFormItem` 的 **`lightProps`**：**`buildWarpFieldLightProps`**（先展开 `fieldProps`，再写固定键，再 `rest.lightProps`，再 `otherProps.lightProps`；其中对值做 **`omitUndefined`**）。
 * 8. 有 **`dependencies`** 时外层由 **`WarpFieldDependencyWrapper`** 包 `ProFormDependency`（见 `warpFieldDependency.tsx`）。
 *
 * `getFieldProps` / `getFormItemProps` 多为 **SchemaForm** 列配置传入；合并规则与命令式 `ProFormXxx` 相同，见 `docs/internal/form-architecture.md`。
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
    const changedProps = useDeepCompareMemo(() => {
      return {
        formItemProps: getFormItemProps?.(),
        fieldProps: getFieldProps?.(),
      };
    }, [getFieldProps, getFormItemProps, rest.dependenciesValues, onlyChange]);

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

    // 使用useMemo包裹避免不必要的re-render
    const formItem = useDeepCompareMemo(() => {
      return (
        <WarpFieldFormItemShell
          itemKey={props.proFormFieldKey || otherProps.name?.toString()}
          label={label && proFieldProps?.light !== true ? label : undefined}
          tooltip={proFieldProps?.light !== true && tooltip}
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
          lightProps={omitUndefined({
            ...fieldProps,
            variant: rest.variant ?? fieldProps?.variant,
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
