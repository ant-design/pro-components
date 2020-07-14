import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm from '../../BaseForm';
import Submiter from '../../components/Submiter';

export interface ProFormProps extends FormProps {
  // TODO
}
const ProForm: React.FC<ProFormProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <BaseForm
      {...props}
      form={form}
      contentRender={(items) => {
        return (
          <>
            {items}
            <Submiter form={form} />
          </>
        );
      }}
    />
  );
};

export default ProForm;
