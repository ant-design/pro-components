import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      title="使用 formRef 重置"
      trigger={<Button type="primary">打开表单</Button>}
      formRef={formRef}
      submitter={{
        searchConfig: { resetText: '重置字段' },
        resetButtonProps: { onClick: () => formRef.current?.resetFields() },
      }}
      onFinish={async () => true}
    >
      <ProFormText name="name" label="客户名称" initialValue="青禾科技" />
    </ModalForm>
  );
};
