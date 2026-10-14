import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; date: string };

const tasks: Task[] = [
  { id: 1, title: '部署测试环境', date: '2026-10-12' },
  { id: 2, title: '发布正式版本', date: '2026-10-14' },
];

export default () => {
  const [date, setDate] = useState<string>();

  return (
    <ProTable<Task>
      rowKey="id"
      columns={[
        { title: '任务', dataIndex: 'title' },
        { title: '部署日期', dataIndex: 'date' },
      ]}
      dataSource={tasks.filter((task) => !date || task.date === date)}
      search={false}
      pagination={false}
      toolbar={{
        title: '按部署日期筛选',
        filter: (
          <LightFilter
            onFinish={async ({ date: value }) => {
              setDate(value);
              return true;
            }}
          >
            <ProFormDatePicker name="date" label="部署日期" />
          </LightFilter>
        ),
      }}
    />
  );
};
