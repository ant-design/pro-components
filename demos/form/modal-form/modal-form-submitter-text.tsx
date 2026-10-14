import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [saved, setSaved] = useState('');

  return (
    <>
      <ModalForm<{ name: string }>
        title="提交按钮文案"
        trigger={<Button type="primary">打开表单</Button>}
        submitter={{
          searchConfig: { submitText: '保存客户', resetText: '返回' },
        }}
        onFinish={async ({ name }) => {
          setSaved(name);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="客户名称"
          rules={[{ required: true }]}
        />
      </ModalForm>
      {saved && (
        <Alert
          type="success"
          message={`已保存：${saved}`}
          style={{ marginTop: 16 }}
        />
      )}
    </>
  );
};
