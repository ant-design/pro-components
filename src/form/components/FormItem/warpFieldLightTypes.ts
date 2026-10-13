import type { FormItemProps } from 'antd';
import type React from 'react';
import type {
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../../../utils/typing';
import type { LightFilterFooterRender } from '../../typing';
import type { ProFormItemProps } from './typing';

/** LightFilter Popover 字段渲染入参（类型层，不依赖 LightWrapper） */
export type WarpFieldLightPopoverRenderProps = {
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
