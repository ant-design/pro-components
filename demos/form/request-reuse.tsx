import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

const RequestReuse = () => {
  const [id, setId] = useState(0);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        {[0, 1, 0].map((value, index) => (
          <Button key={`${value}-${index}`} onClick={() => setId(value)}>
            参数 {value}
          </Button>
        ))}
      </Space>
      <ProForm
        key="request-reuse-form"
        params={{ id }}
        request={async ({ id: requestId }) => ({
          name: `服务端返回：参数 ${requestId}（${new Date().toLocaleTimeString()}）`,
        })}
        submitter={false}
      >
        <ProFormText name="name" label="请求结果" width="lg" />
      </ProForm>
    </Space>
  );
};

export default RequestReuse;
