import React from 'react';
import { FormItemProps } from 'antd/lib/form';

export interface FiledContextProps {
  fieldStyle?: React.CSSProperties;
  formItemProps?: FormItemProps;
}

const FieldContext = React.createContext<FiledContextProps>({});

// TODO fix typescript
export function createField(Field: any): typeof Field {
  const FieldWithContext: React.FC<any> = (props: any) => {
    const { fieldStyle, formItemProps } = React.useContext(FieldContext);
    return (
      <Field style={fieldStyle} formItemProps={formItemProps} {...props} />
    );
  };
  return FieldWithContext;
}

export default FieldContext;
