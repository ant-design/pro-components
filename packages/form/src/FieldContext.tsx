import React from 'react';
import { FormItemProps } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import { ProFieldValueType } from '@ant-design/pro-field';
import { GroupProps, FieldProps } from './interface';

export interface FiledContextProps {
  fieldProps?: FieldProps;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  setFieldValueType?: (name: NamePath, valueType?: ProFieldValueType) => void;
}

const FieldContext = React.createContext<FiledContextProps>({});

export default FieldContext;
