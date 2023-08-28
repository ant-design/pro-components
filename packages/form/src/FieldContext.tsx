import type {
  ProFieldProps,
  ProFieldValueType,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import type { CommonFormProps } from './BaseForm';
import type { FieldProps, ProFormGroupProps } from './typing';

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

const FieldContext = React.createContext<FiledContextProps>({});

export { FieldContext };

export default FieldContext;
