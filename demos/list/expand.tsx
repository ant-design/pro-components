import { ProList } from '@ant-design/pro-components';
import type { Key } from 'react';
import { useState } from 'react';

type Task = { id: number; title: string; detail: string };

const tasks: Task[] = [
  { id: 1, title: '检查首页', detail: '确认小屏幕下的导航和卡片布局。' },
  { id: 2, title: '更新文档', detail: '补充查询和筛选的 API 说明。' },
];

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

  return (
    <ProList<Task>
      rowKey="id"
      headerTitle="展开查看任务详情"
      columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      dataSource={tasks}
      pagination={false}
      expandable={{
        expandedRowKeys,
        onExpandedRowsChange: setExpandedRowKeys,
        expandedRowRender: (task) => task.detail,
      }}
    />
  );
};
