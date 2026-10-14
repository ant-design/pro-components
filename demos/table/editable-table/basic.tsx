import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; status: 'open' | 'closed' };

const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    formItemProps: { rules: [{ required: true }] },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: { open: '待处理', closed: '已完成' },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, row, __, action) => [
      <a key="edit" onClick={() => action?.startEditable?.(row.id)}>
        编辑
      </a>,
    ],
  },
];

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '优化首页加载速度', status: 'open' },
    { id: 2, title: '修复登录超时问题', status: 'closed' },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  return (
    <EditableProTable<Task>
      rowKey="id"
      columns={columns}
      scroll={{ x: 500 }}
      value={rows}
      onChange={setRows}
      recordCreatorProps={false}
      editable={{ editableKeys, onChange: setEditableKeys }}
    />
  );
};
