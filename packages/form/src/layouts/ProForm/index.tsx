import React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface ProFormProps extends FormProps, CommonFormProps {
  // TODO
}
const ProForm: React.FC<ProFormProps> = (props) => {
  return (
    <BaseForm
      {...props}
      contentRender={(items, submiter) => {
        return (
          <>
            {items}
            {submiter}
          </>
        );
      }}
    />
  );
};

export default ProForm;
