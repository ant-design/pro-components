import type { FormItemProps } from 'antd';
import type React from 'react';
import { LightWrapper } from '../../layouts/LightFilter/LightWrapper';
import type {
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../../../utils/typing';
import type { LightFilterFooterRender } from '../../typing';
import ProFormItem from './index';
import type { ProFormItemProps } from './typing';

export type WarpFieldLightPopoverItemProps = {
  field: React.ReactElement;
  label?: React.ReactNode;
  valuePropName?: string;
  restOtherProps: FormItemProps;
  help?: ProFormItemProps['help'];
  ignoreFormItem?: boolean;
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  valueType?: ProFieldValueType;
  messageVariables?: FormItemProps['messageVariables'];
  convertValue?: SearchConvertKeyFn;
  formItemKey?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
  placement?: string;
  allowClear?: boolean;
  footerRender?: LightFilterFooterRender;
  labelFormatter?: (value: any) => string;
  fieldAllowClear?: boolean;
};

/**
 * LightFilter 非下拉字段：Popover 包裹层，与 warpField 主路径拆分以便按需加载。
 */
export function WarpFieldLightPopoverItem({
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
}: WarpFieldLightPopoverItemProps) {
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
