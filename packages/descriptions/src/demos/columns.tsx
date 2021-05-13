import React from 'react';

import ProDescriptions from '@ant-design/pro-descriptions';

export default () => {
  return (
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
            switch: true,
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
          valueType: 'select',
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
        },
        {
          title: '时间',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: '时间',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
          fieldProps: {
            format: 'DD.MM.YYYY',
          },
        },
        {
          title: '开关',
          key: 'switch',
          dataIndex: 'switch',
          valueType: 'switch',
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          fieldProps: {
            moneySymbol: '$',
          },
        },
        {
          title: '操作',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="link">
              链路
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="warning">
              报警
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="view">
              查看
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item dataIndex="percent" label="百分比" valueType="percent">
        100
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
