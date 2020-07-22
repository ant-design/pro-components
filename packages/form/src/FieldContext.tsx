import React from 'react';
import { FormItemProps } from 'antd/lib/form';
import { GroupProps } from './interface';

export interface FiledContextProps {
  fieldStyle?: React.CSSProperties;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
}

const FieldContext = React.createContext<FiledContextProps>({});

export default FieldContext;
