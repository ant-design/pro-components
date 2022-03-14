import React from 'react';
import type { FormProps } from 'antd';
import { Row } from 'antd';
import { Form } from 'antd';
import { Group, ProFormItem } from '../../components';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';

export type ProFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T>;

function ProForm<T = Record<string, any>>({ rowProps, grid, ...props }: ProFormProps<T>) {
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
            {grid ? (
              <Row gutter={8} {...rowProps}>
                {items}
              </Row>
            ) : (
              items
            )}
            {submitter}
          </>
        );
      }}
      grid={grid}
      {...props}
    />
  );
}

ProForm.Group = Group;
ProForm.useForm = Form.useForm;
ProForm.Item = ProFormItem;

export { ProForm };
