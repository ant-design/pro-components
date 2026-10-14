import { ProList } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; owner: 'me' | 'team' };

const tasks: Task[] = [
  { id: 1, title: '检查首页', owner: 'me' },
  { id: 2, title: '更新组件文档', owner: 'team' },
  { id: 3, title: '修复移动端布局', owner: 'me' },
];

export default () => {
  const [activeKey, setActiveKey] = useState('all');

  return (
    <ProList<Task>
      rowKey="id"
      columns={[{ title: '任务', dataIndex: 'title', listSlot: 'title' }]}
      dataSource={tasks.filter((task) => activeKey === 'all' || task.owner === activeKey)}
      pagination={false}
      toolbar={{
        menu: {
          activeKey,
          items: [
            { key: 'all', label: '全部任务' },
            { key: 'me', label: '我的任务' },
          ],
          onChange: (key) => setActiveKey(String(key)),
        },
      }}
    />
  );
};
