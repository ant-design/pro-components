import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import type {
  ProFieldProps,
  ProFieldValueType,
  SearchTransformKeyFn,
} from '../utils';
import type { CommonFormProps } from './BaseForm';
import type { FieldProps, ProFormGroupProps } from './typing';

/** @deprecated 拼写历史遗留；新代码请使用 {@link FieldContextProps} */
export type FiledContextProps = {
  fieldProps?: FieldProps<unknown>;
  proFieldProps?: ProFieldProps;
  formItemProps?: FormItemProps;
  groupProps?: ProFormGroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType;
      dateFormat?: string;
      /** 数据转化的地方 */
      transform?: SearchTransformKeyFn;
    },
  ) => void;
  /** Form 组件的类型 */
  formComponentType?: string;
  /** 获取表单实例计数器 */
  formKey?: string;

  /** 表单的 getPopupContainer 控制 */
  getPopupContainer?: (e: HTMLElement) => ParentNode;
} & Pick<CommonFormProps, 'formRef' | 'grid'>;

/** `FieldContext` 的值类型（与 `FiledContextProps` 相同，修正命名） */
export type FieldContextProps = FiledContextProps;

const FieldContext = React.createContext<FiledContextProps>({});

export { FieldContext };

export default FieldContext;
