import React from 'react';
import ProFormField from '../Field';

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

const ProFormAutoComplete = ProFormAutoCompleteComponents as <T = any>(
  props: T,
) => React.ReactElement;

export default ProFormAutoComplete;
