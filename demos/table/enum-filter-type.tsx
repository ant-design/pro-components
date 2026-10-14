import { ProTable } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string; status: 'open' | 'done' };

const tasks: Task[] = [
  { id: 1, title: '检查首页', status: 'open' },
  { id: 2, title: '更新文档', status: 'done' },
];

export default () => {
  const [filterType, setFilterType] = useState<'query' | 'light'>('query');

  return (
    <>
      <Segmented
        value={filterType}
        onChange={(value) => setFilterType(value as 'query' | 'light')}
        options={[
          { label: '查询表单', value: 'query' },
          { label: '轻量筛选', value: 'light' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ProTable<Task>
        rowKey="id"
        columns={[
          { title: '任务', dataIndex: 'title', search: false },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: { open: '待处理', done: '已完成' },
            fieldProps: { style: { width: 60 } },
          },
        ]}
        search={{ filterType }}
        pagination={false}
        request={async ({ status }) => {
          const data = tasks.filter((task) => !status || task.status === status);
          return { data, total: data.length, success: true };
        }}
      />
    </>
  );
};
