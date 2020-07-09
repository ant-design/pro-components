import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

import ProFormDatePicker from './components/datePicker';
import ProFormText from './components/text';

const ProForm: React.FC<FormProps> = ({ children, ...rest }) => {
  return <Form {...rest}>{children}</Form>;
};

export { ProFormDatePicker, ProFormText };

export default ProForm;
