import type { FormItemProps } from 'antd';
import React, { memo } from 'react';
import type {
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../../../utils';
import ProFormItem from './index';

type WarpFieldInnerFieldProps<P> = {
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>;
  rest: P;
  fieldFieldProps: Record<string, any>;
  fieldProFieldProps: Record<string, any>;
  fieldKey: React.Key;
  fieldRef: React.Ref<any> | undefined;
};

/**
 * warpField 内层控件：将 Pro 组件与合并后的 fieldProps / proFieldProps 连接。
 */
export function WarpFieldInnerField<P>({
  Field,
  rest,
  fieldFieldProps,
  fieldProFieldProps,
  fieldKey,
  fieldRef,
}: WarpFieldInnerFieldProps<P>) {
  return (
    <Field
      // @ts-ignore
      key={fieldKey}
      {...(rest as P)}
      fieldProps={fieldFieldProps}
      proFieldProps={fieldProFieldProps}
      ref={fieldRef}
    />
  );
}

export type WarpFieldFormItemShellProps = {
  itemKey: React.Key;
  /** 已处理轻量模式：非 light 时展示的 label */
  label: React.ReactNode | undefined;
  /** 已处理轻量模式后的 tooltip（与 warpField 原逻辑一致，可为 false） */
  tooltip: FormItemProps['tooltip'] | false;
  valuePropName: string | undefined;
  otherProps: Record<string, any>;
  ignoreFormItem: boolean | undefined;
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  valueType?: ProFieldValueType;
  messageVariables: Record<string, any>;
  convertValue?: SearchConvertKeyFn;
  lightProps: Record<string, any>;
  children: React.ReactNode;
};

/**
 * warpField 内层表单项壳：ProFormItem + lightProps。
 */
export const WarpFieldFormItemShell = memo(function WarpFieldFormItemShell({
  itemKey,
  label,
  tooltip,
  valuePropName,
  otherProps,
  ignoreFormItem,
  transform,
  dataFormat,
  valueType,
  messageVariables,
  convertValue,
  lightProps,
  children,
}: WarpFieldFormItemShellProps) {
  return (
    <ProFormItem
      label={label}
      tooltip={tooltip}
      valuePropName={valuePropName}
      // @ts-ignore
      key={itemKey}
      // @ts-ignore
      {...(otherProps as FormItemProps)}
      ignoreFormItem={ignoreFormItem}
      transform={transform}
      dataFormat={dataFormat}
      valueType={valueType}
      messageVariables={messageVariables}
      convertValue={convertValue}
      lightProps={lightProps}
    >
      {children}
    </ProFormItem>
  );
});
