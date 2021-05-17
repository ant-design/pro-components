import React, { useRef } from 'react';
import { Button } from 'antd';

import type { ProDescriptionsActionType } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';

export default () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  return (
    <ProDescriptions
      actionRef={actionRef}
      title="高级定义列表 request"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: { id: '这是一段文本', date: '20200730', money: '12121' },
        });
      }}
      extra={<Button type="link">修改</Button>}
    >
      <ProDescriptions.Item dataIndex="id" />
      <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
      <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
      <ProDescriptions.Item label="文本" valueType="option">
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.reload();
          }}
          key="reload"
        >
          刷新
        </Button>
        <Button key="rest">重置</Button>
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
