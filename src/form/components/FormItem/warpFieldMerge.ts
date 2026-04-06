import type { FormItemProps } from 'antd';
import { omitUndefined } from '../../../utils';

/**
 * warpField 内 fieldProps 合并顺序（后者覆盖前者）：
 * 1. ignoreFormItem 时注入 value
 * 2. placeholder、disabled
 * 3. FieldContext.fieldProps（BaseForm 全局）
 * 4. getFieldProps?.()（Schema 动态）
 * 5. rest.fieldProps（组件显式传入）
 *
 * 最后对 style 做一次 omitUndefined。
 */
export function mergeWarpFieldFieldProps(options: {
  ignoreFormItem?: boolean;
  restValue: unknown;
  placeholder?: string | string[];
  disabled?: boolean;
  contextFieldProps?: Record<string, any>;
  changedFieldProps?: Record<string, any>;
  restFieldProps?: Record<string, any>;
}): Record<string, any> {
  const {
    ignoreFormItem = false,
    restValue,
    placeholder,
    disabled,
    contextFieldProps = {},
    changedFieldProps = {},
    restFieldProps = {},
  } = options;

  const newFieldProps: Record<string, any> = {
    ...(ignoreFormItem ? omitUndefined({ value: restValue }) : {}),
    placeholder,
    disabled,
    ...contextFieldProps,
    ...changedFieldProps,
    ...restFieldProps,
  };
  newFieldProps.style = omitUndefined(newFieldProps?.style);
  return newFieldProps;
}

/**
 * formItemProps 合并顺序：
 * 1. FieldContext.formItemProps
 * 2. pickProFormItemProps(rest) — 根上传给 Form.Item 的白名单属性
 * 3. getFormItemProps?.()（Schema 动态）
 * 4. rest.formItemProps（显式 formItemProps）
 */
export function mergeWarpFieldFormItemProps(options: {
  contextFormItemProps?: FormItemProps;
  restFormItemProps: FormItemProps;
  changedFormItemProps?: FormItemProps;
  restFormItemPropsExplicit?: FormItemProps;
}): FormItemProps {
  const {
    contextFormItemProps = {},
    restFormItemProps,
    changedFormItemProps = {},
    restFormItemPropsExplicit = {},
  } = options;

  return {
    ...contextFormItemProps,
    ...restFormItemProps,
    ...changedFormItemProps,
    ...restFormItemPropsExplicit,
  };
}

/**
 * otherProps：最终传给 ProFormItem 的表单项 props。
 * 顺序：messageVariables → fieldConfig/config 默认表单项 → 合并后的 formItemProps（后者覆盖前者）。
 */
export function mergeWarpFieldOtherProps(options: {
  messageVariables?: Record<string, any>;
  defaultFormItemProps: Record<string, any>;
  formItemProps: FormItemProps;
}): Record<string, any> {
  return {
    messageVariables: options.messageVariables,
    ...options.defaultFormItemProps,
    ...options.formItemProps,
  };
}

/** 与原先 proFieldKey 字符串规则一致 */
export function computeWarpFieldProFieldKey(options: {
  name: FormItemProps['name'];
  prefixName?: FormItemProps['name'];
  formKey?: string;
}): string | undefined {
  let name = options.name as any;
  if (Array.isArray(name)) name = name.join('_');
  if (Array.isArray(options.prefixName) && name) {
    name = `${(options.prefixName as any[]).join('.')}.${name}`;
  }
  return name && `form-${options.formKey ?? ''}-field-${name}`;
}

/** proFieldProps 合并：Context → mode/readonly/params/key/cache → 组件 proFieldProps */
export function mergeWarpFieldProFieldProps(options: {
  contextProFieldProps?: Record<string, any>;
  mode?: any;
  readonly?: boolean;
  params?: any;
  proFieldKey?: string;
  cacheForSwr?: any;
  proFieldProps?: Record<string, any>;
}): Record<string, any> {
  return omitUndefined({
    ...options.contextProFieldProps,
    mode: options.mode,
    readonly: options.readonly,
    params: options.params,
    proFieldKey: options.proFieldKey,
    cacheForSwr: options.cacheForSwr,
    ...options.proFieldProps,
  });
}
