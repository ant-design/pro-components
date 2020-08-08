import React from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import Group from '../../components/Group';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface ProFormProps extends FormProps, CommonFormProps {
  // ProForm 基础表单，暂无特殊属性
}

const ProForm: React.FC<ProFormProps> & {
  Group: typeof Group;
  useForm: typeof Form.useForm;
} = (props) => {
  return (
    <BaseForm
      layout="vertical"
      submitter={{
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: (_, dom) => dom.reverse(),
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        );
      }}
      {...props}
    />
  );
};

ProForm.Group = Group;
ProForm.useForm = Form.useForm;

export default ProForm;
