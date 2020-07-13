import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

import ProFormDatePicker from './components/DatePicker';
import ProFormText from './components/Text';

const ProForm: React.FC<FormProps> = ({ children, ...rest }) => {
  return <Form {...rest}>{children}</Form>;
};

export { ProFormDatePicker, ProFormText };

export default ProForm;
