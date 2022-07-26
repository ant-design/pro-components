import type { ProSchemaValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import React from 'react';
import type { CommonFormProps } from './BaseForm';
import type { FieldProps, GroupProps } from './interface';

export type FiledContextProps = {
  fieldProps?: FieldProps<unknown>;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProSchemaValueType<'text'>;
      dateFormat?: string;
      /** 数据转化的地方 */
      transform?: SearchTransformKeyFn;
    },
  ) => void;
  /** Form 组件的类型 */
  formComponentType?: string;

  /** 表单的 getPopupContainer 控制 */
  getPopupContainer?: (e: HTMLElement) => ParentNode;
} & Pick<CommonFormProps, 'formRef' | 'grid'>;

const FieldContext = React.createContext<FiledContextProps>({});

export { FieldContext };

export default FieldContext;
