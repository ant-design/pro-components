import React from 'react';

import ProDescriptions from '@ant-design/pro-descriptions';
import { Button } from 'antd';

export default () => {
  return (
    <>
      <ProDescriptions.Item label="文本" valueType="option">
        <Button key="primary" type="primary">
          提交
        </Button>
      </ProDescriptions.Item>
      <ProDescriptions
        column={2}
        title="高级定义列表"
        tooltip="包含了从服务器请求，columns等功能"
        request={async () => ({
          data: [{ id: 1, money: 12345 }],
          success: true,
        })}
        columns={[
          {
            title: () => '文本 2',
            key: 'text',
            dataIndex: 'id',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: { type: 'money', showSymbol: false },
          },
        ]}
      />
    </>
  );
};
