import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; status: 'open' | 'done' };

const tasks: Task[] = [
  { id: 1, title: '检查首页', status: 'open' },
  { id: 2, title: '更新文档', status: 'done' },
  { id: 3, title: '修复布局', status: 'open' },
];

export default () => {
  const [activeKey, setActiveKey] = useState('open');

  return (
    <ProTable<Task>
      rowKey="id"
      columns={[{ title: '任务', dataIndex: 'title' }]}
      dataSource={tasks.filter((task) => task.status === activeKey)}
      search={false}
      pagination={false}
      toolbar={{
        title: '任务状态',
        multipleLine: true,
        tabs: {
          activeKey,
          onChange: (key) => setActiveKey(String(key)),
          items: [
            { key: 'open', tab: '待处理' },
            { key: 'done', tab: '已完成' },
          ],
        },
      }}
    />
  );
};
