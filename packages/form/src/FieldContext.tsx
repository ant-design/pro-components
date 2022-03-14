import React from 'react';
import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { ProSchemaValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import type { GroupProps, FieldProps } from './interface';
import type { CommonFormProps } from './BaseForm';

export type FiledContextProps = {
  fieldProps?: FieldProps;
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

export default FieldContext;
