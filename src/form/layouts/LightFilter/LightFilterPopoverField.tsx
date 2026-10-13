import type { WarpFieldLightPopoverRenderProps } from '../../components/FormItem/warpFieldLightTypes';
import { LightWrapper } from './LightWrapper';
import ProFormItem from '../../components/FormItem';

/**
 * LightFilter 非下拉 light 字段的 Popover 实现（仅由 LightFilter / 按需 fallback 引用）。
 */
export function LightFilterPopoverField({
  field,
  label,
  valuePropName,
  restOtherProps,
  help,
  ignoreFormItem,
  transform,
  dataFormat,
  valueType,
  messageVariables,
  convertValue,
  formItemKey,
  variant,
  placement,
  allowClear,
  footerRender,
  labelFormatter,
  fieldAllowClear,
}: WarpFieldLightPopoverRenderProps) {
  return (
    <ProFormItem
      label={undefined}
      tooltip={false}
      valuePropName={valuePropName}
      key={formItemKey}
      {...restOtherProps}
      help={help}
      ignoreFormItem={ignoreFormItem}
      transform={transform}
      dataFormat={dataFormat}
      valueType={valueType}
      messageVariables={messageVariables}
      convertValue={convertValue}
    >
      <LightWrapper
        label={label}
        valuePropName={valuePropName}
        variant={variant}
        allowClear={fieldAllowClear ?? allowClear}
        footerRender={footerRender}
        placement={placement as any}
        labelFormatter={labelFormatter}
        valueType={valueType}
      >
        {field}
      </LightWrapper>
    </ProFormItem>
  );
}
