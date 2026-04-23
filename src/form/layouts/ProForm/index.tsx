import type { FormProps } from 'antd';
import { Form } from 'antd';
import React, { useCallback } from 'react';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import { Group, ProFormItem } from '../../components';

export type ProFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = Omit<FormProps<T>, 'onFinish'> & CommonFormProps<T, U>;

function ProForm<T = Record<string, any>>(
  props: ProFormProps<T> & {
    children?: React.ReactNode | React.ReactNode[];
  },
) {
  const contentRender = useCallback(
    (
      items: React.ReactNode[],
      submitter: React.ReactNode,
      _form: unknown,
    ) => (
      <>
        {items}
        {submitter}
      </>
    ),
    [],
  );

  return (
    <BaseForm
      layout="vertical"
      contentRender={contentRender}
      {...props}
    />
  );
}

ProForm.Group = Group;
ProForm.useForm = Form.useForm;
ProForm.Item = ProFormItem;
ProForm.useWatch = Form.useWatch;
ProForm.ErrorList = Form.ErrorList;
ProForm.Provider = Form.Provider;
ProForm.useFormInstance = Form.useFormInstance;
ProForm.EditOrReadOnlyContext = EditOrReadOnlyContext;

export { ProForm };
