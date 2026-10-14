import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [saved, setSaved] = useState('');

  return (
    <>
      <ModalForm<{ name: string }>
        title="自定义提交区"
        trigger={<Button type="primary">打开表单</Button>}
        submitter={{
          render: (props, defaultButtons) => [
            ...defaultButtons,
            <Button key="extra" onClick={() => props.submit()}>
              额外提交
            </Button>,
          ],
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
          message={`已提交：${saved}`}
          style={{ marginTop: 16 }}
        />
      )}
    </>
  );
};
