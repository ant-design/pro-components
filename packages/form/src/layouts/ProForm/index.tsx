import React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import FormRender from '../../FormRender';

export interface ProFormProps extends FormProps {
  // TODO
}
const ProForm: React.FC<ProFormProps> = props => {
  return <FormRender {...props} formContentRender={content => content} />;
};

export default ProForm;
