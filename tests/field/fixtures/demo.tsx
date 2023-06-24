import type { ProFieldFCMode } from '@ant-design/pro-components';
import Field from '@ant-design/pro-field';
import { Descriptions } from 'antd';
import dayjs from 'dayjs';

export default ({
  state,
  plain,
}: {
  state: ProFieldFCMode;
  plain: boolean;
}) => (
  <>
    <Descriptions column={2}>
      <Descriptions.Item label="文本">
        <Field
          text="这是一段文本"
          valueType="text"
          mode={state}
          plain={plain}
        />
      </Descriptions.Item>
      <Descriptions.Item label="头像">
        <Field
          text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4"
          mode="read"
          valueType="avatar"
        />
      </Descriptions.Item>
      <Descriptions.Item label="空字符串">
        <Field text="" mode="read" />
      </Descriptions.Item>
      <Descriptions.Item label="日期区间">
        <Field
          text={[
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ]}
          plain={plain}
          valueType="dateRange"
          mode={state}
        />
      </Descriptions.Item>
      <Descriptions.Item label="index">
        <Field text={0} valueType="index" mode={state} plain={plain} />
        <Field text={0} valueType="indexBorder" mode={state} plain={plain} />
      </Descriptions.Item>
      <Descriptions.Item label="金额">
        <Field text="100" valueType="money" mode={state} plain={plain} />
      </Descriptions.Item>
      <Descriptions.Item label="百分比">
        <Field text="100" valueType="percent" mode={state} plain={plain} />
      </Descriptions.Item>
      <Descriptions.Item label="选择框">
        <Field
          text="open"
          mode={state}
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
          text="open"
          mode={state}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
      </Descriptions.Item>
      <Descriptions.Item label="进度条">
        <Field text="40" valueType="progress" mode={state} plain={plain} />
      </Descriptions.Item>
      <Descriptions.Item label="日期时间">
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          valueType="dateTime"
          mode={state}
          plain={plain}
        />
      </Descriptions.Item>
      <Descriptions.Item label="日期">
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          valueType="date"
          mode={state}
          plain={plain}
        />
      </Descriptions.Item>
      <Descriptions.Item label="日期区间">
        <Field
          text={[
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ]}
          plain={plain}
          valueType="dateTimeRange"
          mode={state}
        />
      </Descriptions.Item>
      <Descriptions.Item label="dateRange">
        <Field
          text={[
            dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            dayjs('2019-11-16 12:50:26').valueOf(),
          ]}
          plain={plain}
          valueType="dateTimeRange"
          mode={state}
        />
      </Descriptions.Item>
      <Descriptions.Item label="时间">
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          plain={plain}
          valueType="time"
          mode={state}
        />
      </Descriptions.Item>
      <Descriptions.Item label="密码">
        <Field
          text="password"
          plain={plain}
          valueType="password"
          mode={state}
        />
      </Descriptions.Item>
      <Descriptions.Item label="代码块">
        <Field
          text={`
yarn run v1.22.0
$ eslint --format=pretty ./packages
Done in 9.70s.
          `}
          valueType="code"
          mode={state}
          plain={plain}
        />
      </Descriptions.Item>
      <Descriptions.Item label="JSON 代码块">
        <Field
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
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`}
          valueType="jsonCode"
          mode={state}
          plain={plain}
        />
      </Descriptions.Item>
    </Descriptions>
  </>
);
