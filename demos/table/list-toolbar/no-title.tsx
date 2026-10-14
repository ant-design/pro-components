import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string };

const tasks: Task[] = [
  { id: 1, title: '检查首页' },
  { id: 2, title: '更新组件文档' },
  { id: 3, title: '修复移动端布局' },
];

export default () => {
  const [keyword, setKeyword] = useState('');

  return (
    <ProTable<Task>
      rowKey="id"
      columns={[{ title: '任务', dataIndex: 'title' }]}
      dataSource={tasks.filter((task) => task.title.includes(keyword))}
      search={false}
      pagination={false}
      toolbar={{ search: { onSearch: setKeyword } }}
    />
  );
};
