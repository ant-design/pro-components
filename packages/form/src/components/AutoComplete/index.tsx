import React from 'react';
import { ProFormField } from '@ant-design/pro-form';

const ProFormAutoCompleteComponents = React.forwardRef<any, any>(({ children, ...rest }, ref) => {
  return (
    <ProFormField<any>
      valueType="autoComplete"
      filedConfig={{ customLightMode: true }}
      ref={ref}
      {...rest}
    >
      {children}
    </ProFormField>
  );
});

const ProFormAutoComplete = ProFormAutoCompleteComponents as <T>(props: any) => React.ReactElement;

export default ProFormAutoComplete;
