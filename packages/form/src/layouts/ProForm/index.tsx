import React from 'react';
import { Form } from 'antd';
import type { FormProps } from 'antd/lib/form/Form';
import Group from '../../components/Group';
import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';

export type ProFormProps<T> = Omit<FormProps<T>, 'onFinish'> & CommonFormProps<T>;

function ProForm<T = Record<string, any>>(props: ProFormProps<T>) {
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
}

ProForm.Group = Group;
ProForm.useForm = Form.useForm;

export default ProForm;
