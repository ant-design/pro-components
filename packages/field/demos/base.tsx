import React, { useState } from 'react';
import { Radio, Switch, Space, Descriptions } from 'antd';
import moment from 'moment';

import Field, { FieldFCMode } from '../src/index';

export default () => {
  const [state, setState] = useState<FieldFCMode>('read');
  const [plain, setPlain] = useState<boolean>(false);
  return (
    <>
      <Space>
        <Radio.Group onChange={(e) => setState(e.target.value as FieldFCMode)} value={state}>
          <Radio value="read">只读</Radio>
          <Radio value="edit">编辑</Radio>
        </Radio.Group>
        简约模式
        <Switch checked={plain} onChange={(checked) => setPlain(checked)} />
      </Space>
      <br />
      <br />
      <Descriptions column={2}>
        <Descriptions.Item label="文本">
          <Field text="这是一段文本" valueType="text" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="金额">
          <Field text="100" valueType="money" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <Field text="100" valueType="percent" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <Field text="40" valueType="progress" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间">
          <Field text={moment().valueOf()} valueType="dateTime" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="日期">
          <Field text={moment().valueOf()} valueType="date" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="日期区间">
          <Field
            text={[moment().add(-1, 'd').valueOf(), moment().valueOf()]}
            plain={plain}
            valueType="dateTimeRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间">
          <Field text={moment().valueOf()} plain={plain} valueType="time" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="代码块">
          <Field
            text={`
            yarn run v1.22.0
            $ eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./packages
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
};
