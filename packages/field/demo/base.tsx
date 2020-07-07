import React, { useState } from 'react';
import { Button, Descriptions } from 'antd';
import moment from 'moment';

import Field, { FieldFCType } from '../src/index';

export default () => {
  const [state, setState] = useState<FieldFCType>('read');
  return (
    <>
      <Button
        onClick={() => {
          setState(state === 'read' ? 'edit' : 'read');
        }}
      >
        切换
      </Button>
      <br />
      <br />
      <Descriptions column={2}>
        <Descriptions.Item label="金额">
          <Field text="100" valueType="money" type={state} />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <Field text="100" valueType="percent" type={state} />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <Field text="40" valueType="progress" type={state} />
        </Descriptions.Item>
        <Descriptions.Item label="日期">
          <Field text={moment().valueOf()} valueType="dateTime" type={state} />
        </Descriptions.Item>
        <Descriptions.Item label="日期区间">
          <Field
            text={[
              moment()
                .add(-1, 'd')
                .valueOf(),
              moment().valueOf(),
            ]}
            valueType="dateTimeRange"
            type={state}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
