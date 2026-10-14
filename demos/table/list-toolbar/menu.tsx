import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; scope: 'app' | 'doc' };

const tasks: Task[] = [
  { id: 1, title: '发布应用', scope: 'app' },
  { id: 2, title: '更新帮助文档', scope: 'doc' },
];

export default () => {
  const [activeKey, setActiveKey] = useState('app');

  return (
    <ProTable<Task>
      rowKey="id"
      columns={[{ title: '任务', dataIndex: 'title' }]}
      dataSource={tasks.filter((task) => task.scope === activeKey)}
      search={false}
      pagination={false}
      toolbar={{
        menu: {
          type: 'tab',
          activeKey,
          items: [
            { key: 'app', label: '应用任务' },
            { key: 'doc', label: '文档任务' },
          ],
          onChange: (key) => setActiveKey(String(key)),
        },
      }}
    />
  );
};
