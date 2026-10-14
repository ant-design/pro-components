import {
  FooterToolbar,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [saved, setSaved] = useState('');

  return (
    <div style={{ minHeight: 420 }}>
      <Card title="项目设置">
        <ProForm<{ name: string }>
          submitter={{
            render: (_, buttons) => <FooterToolbar>{buttons}</FooterToolbar>,
          }}
          onFinish={async ({ name }) => {
            setSaved(name);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="项目名称"
            rules={[{ required: true }]}
          />
        </ProForm>
        {saved && <Alert type="success" message={`已保存：${saved}`} />}
      </Card>
    </div>
  );
};
