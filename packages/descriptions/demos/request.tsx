import React from 'react';

import ProDescriptions from '@ant-design/pro-descriptions';

export default () => {
  return (
    <>
      <ProDescriptions
        title="高级定义列表 request"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本', date: '20200730', money: '12121' },
          });
        }}
      >
        <ProDescriptions.Item label="文本" dataIndex="id" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
      </ProDescriptions>
    </>
  );
};
