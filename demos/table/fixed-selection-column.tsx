import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; owner: string; description: string };

const tasks: Task[] = [
  { id: 1, title: '设计首页', owner: '张三', description: '完成首页视觉稿' },
  { id: 2, title: '开发登录页', owner: '李四', description: '实现登录流程' },
  { id: 3, title: '编写文档', owner: '王五', description: '补充使用说明' },
];
const columns: ProColumns<Task>[] = [
  { title: '任务名称', dataIndex: 'title', width: 160, fixed: 'start' },
  { title: '负责人', dataIndex: 'owner', width: 200 },
  { title: '任务描述', dataIndex: 'description', width: 320 },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  return (
    <div style={{ padding: 24 }}>
      <ProTable<Task>
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        scroll={{ x: 740 }}
        rowSelection={{
          fixed: 'start',
          selectedRowKeys: selectedKeys,
          onChange: setSelectedKeys,
        }}
      />
      <p>已选任务 ID：{selectedKeys.join(', ') || '无'}</p>
    </div>
  );
};
