import type { FormItemProps } from 'antd';
import type React from 'react';
import type {
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../../../utils/typing';

export type ProFormItemHelpFunction = (params: {
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
}) => React.ReactNode;

type WarpFormItemProps = {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  addonWarpStyle?: React.CSSProperties;
  convertValue?: SearchConvertKeyFn;
  help?: React.ReactNode | ProFormItemHelpFunction;
};

export type ProFormItemProps = Omit<FormItemProps, keyof WarpFormItemProps> & {
  ignoreFormItem?: boolean;
  valueType?: ProFieldValueType;
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  proFormFieldKey?: any;
  fieldProps?: Record<string, any>;
} & WarpFormItemProps;
