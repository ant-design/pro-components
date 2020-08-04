import React from 'react';
import moment from 'moment';

import ProDescriptions from '@ant-design/pro-descriptions';
import { Button } from 'antd';

export default () => {
  return (
    <>
      <ProDescriptions
        title="高级定义列表request"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本', date: '20200730', money: '12121' },
          });
        }}
      >
        <ProDescriptions.Item label="文本id" dataIndex="id" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item label="文本money" dataIndex="money" valueType="money" />
      </ProDescriptions>

      <ProDescriptions
        title="高级定义列表request columns"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本columns', date: '文本666', money: '1212100' },
          });
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'id',
            copyable: true,
            ellipsis: true,
            width: 200,
            hideInSearch: true,
          },
          {
            title: '状态',
            dataIndex: 'state',
            initialValue: 'all',
            filters: true,
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
            title: '标签',
            dataIndex: 'labels',
            width: 120,
            // render: (_, row) => (
            //   <Space>
            //     {row.labels.map(({ name, id, color }) => (
            //       <Tag color={color} key={id}>
            //         {name}
            //       </Tag>
            //     ))}
            //   </Space>
            // ),
          },
          {
            title: '时间',
            key: 'since',
            dataIndex: 'data',
            valueType: 'date',
          },
          {
            title: 'qian',
            key: 'qian',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
      />

      <ProDescriptions column={2} title="高级定义列表">
        <ProDescriptions.Item label="文本" valueType="option">
          <Button type="primary">提交</Button>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="文本">这是一段文本www</ProDescriptions.Item>
        <ProDescriptions.Item label="金额" valueType="money">
          100
        </ProDescriptions.Item>
        <ProDescriptions.Item label="百分比" valueType="percent">
          100
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="选择框"
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        >
          open
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="远程选择框"
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        >
          closed
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条" valueType="progress">
          40
        </ProDescriptions.Item>
        <ProDescriptions.Item label="日期时间" valueType="dateTime">
          {moment().valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="日期" valueType="date">
          {moment().valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="日期区间" valueType="dateTimeRange">
          {[moment().add(-1, 'd').valueOf(), moment().valueOf()]}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="时间" valueType="time">
          {moment().valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="代码块" valueType="code">
          {`
            yarn run v1.22.0
            $ eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./packages
            Done in 9.70s.
          `}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="JSON 代码块" valueType="jsonCode">
          {`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`}
        </ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};
