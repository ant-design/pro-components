import type { ReactNode } from 'react';
import { omitUndefined } from '../../../utils';

/**
 * LightFilter / 轻量模式传给 ProFormItem 的 lightProps 合并。
 * 顺序：展开 fieldProps → 固定字段 → rest.lightProps → otherProps.lightProps（后者覆盖前者）。
 */
export function buildWarpFieldLightProps(options: {
  fieldProps: Record<string, any>;
  valueType: unknown;
  bordered?: boolean;
  allowClear?: boolean;
  /** 来自已渲染 Field 元素的 props.allowClear，优先于 allowClear */
  fieldAllowClear?: boolean;
  proFieldLight?: boolean;
  label?: ReactNode;
  customLightMode?: unknown;
  lightFilterLabelFormatter?: unknown;
  valuePropName?: string;
  footerRender?: unknown;
  restLightProps?: Record<string, any>;
  otherPropsLightProps?: Record<string, any>;
}): Record<string, any> {
  return omitUndefined({
    ...options.fieldProps,
    valueType: options.valueType,
    bordered: options.bordered,
    allowClear: options.fieldAllowClear ?? options.allowClear,
    light: options.proFieldLight,
    label: options.label,
    customLightMode: options.customLightMode,
    labelFormatter: options.lightFilterLabelFormatter,
    valuePropName: options.valuePropName,
    footerRender: options.footerRender,
    ...options.restLightProps,
    ...options.otherPropsLightProps,
  });
}
