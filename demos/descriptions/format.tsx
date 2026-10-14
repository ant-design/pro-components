import { ProDescriptions } from '@ant-design/pro-components';

import { FIXED_BASE_DATE } from '../mockData';

const Demo = () => {
  return (
    <>
      <ProDescriptions
        column={2}
        title="高级定义列表"
        tooltip="包含了从服务器请求，columns等功能"
        columns={[
          {
            label: '日期',
            fieldProps: {
              format: 'YYYY.MM.DD',
            },
            valueType: 'date',
            children: FIXED_BASE_DATE.valueOf(),
          },
          {
            label: '日期区间',
            fieldProps: {
              format: 'YYYY.MM.DD HH:mm:ss',
            },
            valueType: 'dateTimeRange',
            children: [
              FIXED_BASE_DATE.add(-1, 'd').valueOf(),
              FIXED_BASE_DATE.valueOf(),
            ],
          },
          {
            label: '时间',
            fieldProps: {
              format: 'YYYY.MM.DD',
            },
            valueType: 'time',
            children: FIXED_BASE_DATE.valueOf(),
          },
          {
            label: '时间日期',
            fieldProps: {
              format: 'YYYY.MM.DD HH:mm:ss',
            },
            valueType: 'dateTime',
            children: FIXED_BASE_DATE.valueOf(),
          },
          {
            label: '更新时间',
            fieldProps: {
              format: 'YYYY.MM.DD',
            },
            valueType: 'fromNow',
            children: FIXED_BASE_DATE.add(-1, 'month').valueOf(),
          },
        ]}
      />
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
