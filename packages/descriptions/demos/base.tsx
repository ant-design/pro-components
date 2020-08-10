import React from 'react';
import moment from 'moment';

import ProDescriptions from '@ant-design/pro-descriptions';
import { Button } from 'antd';

export default () => {
  return (
    <>
      <ProDescriptions column={2} title="高级定义列表" tip="包含了从服务器请求，columns等功能！">
        <ProDescriptions.Item label="文本" valueType="option">
          <Button type="primary">提交</Button>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="文本">这是一段文本</ProDescriptions.Item>
        <ProDescriptions.Item label="金额" tip="仅供参考，以实际为准" valueType="money">
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
