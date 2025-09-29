import type { ProFieldFCMode } from '@xxlabs/pro-components';
import { ProField as Field } from '@xxlabs/pro-components';
import { Descriptions } from 'antd';
import dayjs from 'dayjs';

export default ({ state, plain }: { state: ProFieldFCMode; plain: boolean }) => (
  <>
    <Descriptions column={2}>
      <Descriptions.Item label="文本">
        <Field mode={state} plain={plain} text="这是一段文本" valueType="text" />
      </Descriptions.Item>
      <Descriptions.Item label="头像">
        <Field mode="read" text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4" valueType="avatar" />
      </Descriptions.Item>
      <Descriptions.Item label="空字符串">
        <Field mode="read" text="" />
      </Descriptions.Item>
      <Descriptions.Item label="日期区间">
        <Field
          mode={state}
          plain={plain}
          text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
          valueType="dateRange"
        />
      </Descriptions.Item>
      <Descriptions.Item label="index">
        <Field mode={state} plain={plain} text={0} valueType="index" />
        <Field mode={state} plain={plain} text={0} valueType="indexBorder" />
      </Descriptions.Item>
      <Descriptions.Item label="金额">
        <Field mode={state} plain={plain} text="100" valueType="money" />
      </Descriptions.Item>
      <Descriptions.Item label="百分比">
        <Field mode={state} plain={plain} text="100" valueType="percent" />
      </Descriptions.Item>
      <Descriptions.Item label="选择框">
        <Field
          mode={state}
          text="open"
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
        />
      </Descriptions.Item>
      <Descriptions.Item label="远程选择框">
        <Field
          mode={state}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
          text="open"
        />
      </Descriptions.Item>
      <Descriptions.Item label="进度条">
        <Field mode={state} plain={plain} text="40" valueType="progress" />
      </Descriptions.Item>
      <Descriptions.Item label="日期时间">
        <Field mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="dateTime" />
      </Descriptions.Item>
      <Descriptions.Item label="日期">
        <Field mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="date" />
      </Descriptions.Item>
      <Descriptions.Item label="日期区间">
        <Field
          mode={state}
          plain={plain}
          text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
          valueType="dateTimeRange"
        />
      </Descriptions.Item>
      <Descriptions.Item label="dateRange">
        <Field
          mode={state}
          plain={plain}
          text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
          valueType="dateTimeRange"
        />
      </Descriptions.Item>
      <Descriptions.Item label="时间">
        <Field mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="time" />
      </Descriptions.Item>
      <Descriptions.Item label="密码">
        <Field mode={state} plain={plain} text="password" valueType="password" />
      </Descriptions.Item>
      <Descriptions.Item label="代码块">
        <Field
          mode={state}
          plain={plain}
          text={`
yarn run v1.22.0
$ eslint --format=pretty ./packages
Done in 9.70s.
          `}
          valueType="code"
        />
      </Descriptions.Item>
      <Descriptions.Item label="JSON 代码块">
        <Field
          mode={state}
          plain={plain}
          text={`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`}
          valueType="jsonCode"
        />
      </Descriptions.Item>
    </Descriptions>
  </>
);
