import React from 'react';
import type { FormProps } from 'antd';
import { Row } from 'antd';
import { Form } from 'antd';
import { Group, ProFormItem } from '../../components';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { useGridHelpers } from '../../helpers';

export type ProFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T>;

function ProForm<T = Record<string, any>>({ rowProps, ...props }: ProFormProps<T>) {
  const { WrapperRow } = useGridHelpers(props.grid);

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
            {<WrapperRow {...rowProps}>{items}</WrapperRow>}
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
ProForm.Item = ProFormItem;

export { ProForm };
