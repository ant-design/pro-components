import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useState } from 'react';

type Service = { key: number; createdAt: string };

const columns: ProColumns<Service>[] = [
  {
    title: '部署日期',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: dayjs('2024-01-15'),
  },
];

export default () => {
  const [date, setDate] = useState<unknown>();

  return (
    <div style={{ padding: 24 }}>
      <ProTable<Service>
        columns={columns}
        rowKey="key"
        options={false}
        pagination={false}
        dateFormatter="number"
        headerTitle="dateFormatter: number"
        request={(params) => {
          setDate(params.createdAt);
          return Promise.resolve({
            data: [{ key: 1, createdAt: '2024-01-15' }],
            success: true,
          });
        }}
      />
      <p>request 收到的部署日期（毫秒时间戳）：{JSON.stringify(date)}</p>
    </div>
  );
};
