import React from 'react';

import ProDescriptions from '@ant-design/pro-descriptions';

export default () => {
  return (
    <>
      <ProDescriptions
        title="高级定义列表request columns"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: {
              id: '这是一段文本columns',
              date: '20200809',
              money: '1212100',
              state: 'all',
              state2: 'open',
            },
          });
        }}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
            },
          },
          {
            title: '状态2',
            key: 'state2',
            dataIndex: 'state2',
            // request={() => [
            //   { label: '全部', value: 'all' },
            //   { label: '未解决', value: 'open' },
            //   { label: '已解决', value: 'closed' },
            //   { label: '解决中', value: 'processing' },
            // ]},
          },
          {
            title: '时间',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: 'money',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
      />
    </>
  );
};
