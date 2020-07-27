import React from 'react';
import { FormItemProps } from 'antd/lib/form';
import { GroupProps, FieldProps } from './interface';

export interface FiledContextProps {
  fieldProps?: FieldProps;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
}

const FieldContext = React.createContext<FiledContextProps>({});

export default FieldContext;
