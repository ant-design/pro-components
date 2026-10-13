import type { FormItemProps } from 'antd';
import type React from 'react';
import type {
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
} from '../../../utils/typing';

/** 函数式 help：接收字段校验消息，返回自定义的帮助内容 */
export type ProFormItemHelpFunction = (params: {
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
}) => React.ReactNode;

export type WarpFormItemProps = {
  /** @name 前置的 dom */
  addonBefore?: React.ReactNode;
  /** @name 后置的 dom */
  addonAfter?: React.ReactNode;
  /**
   * 包裹的样式，一般没用
   */
  addonWarpStyle?: React.CSSProperties;
  /**
   * @name 获取时转化值，一般用于将数据格式化为组件接收的格式
   * @param value 字段的值
   * @param namePath 字段的 name
   * @param entity 整个表单的数据
   * @returns 字段新的值
   */
  convertValue?: SearchConvertKeyFn;
  help?: React.ReactNode | ProFormItemHelpFunction;
};

export type ProFormItemProps = Omit<FormItemProps, keyof WarpFormItemProps> & {
  ignoreFormItem?: boolean;
  valueType?: ProFieldValueType;
  /**
   * @name 提交时转化值，一般用于将值转化为提交的数据
   * @param value 字段的值
   * @param namePath 从根到当前字段的路径（string[]），如 `['user','profile','name']`
   * @param allValues 根级表单对象（与 `transformKeySubmitValue` 中传入的 values 同源引用）
   * @returns 字段新的值，如果返回对象，会和所有值 merge 一次
   */
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  proFormFieldKey?: any;
  fieldProps?: Record<string, any>;
} & WarpFormItemProps;
