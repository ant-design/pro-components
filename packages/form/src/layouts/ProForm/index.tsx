import React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import Group from '../../components/Group';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface ProFormProps extends FormProps, CommonFormProps {
  // ProForm 基础表单，暂无特殊属性
}

const ProForm: React.FC<ProFormProps> & { Group: typeof Group } = props => {
  return (
    <BaseForm
      layout="vertical"
      contentRender={(items, submiter) => {
        return (
          <>
            {items}
            {submiter}
          </>
        );
      }}
      {...props}
    />
  );
};

ProForm.Group = Group;

export default ProForm;
