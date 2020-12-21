import React from 'react';
import { Form } from 'antd';
import type { FormProps } from 'antd/lib/form/Form';
import Group from '../../components/Group';
import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';

export type ProFormProps = {
  // ProForm 基础表单，暂无特殊属性
  onFinish?: (formData: any) => Promise<void>;
} & FormProps &
  CommonFormProps;

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
