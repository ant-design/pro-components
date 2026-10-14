import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Popconfirm, Typography } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string; status: 'open' | 'closed' };

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '更新组件文档', status: 'open' },
    { id: 2, title: '修复移动端布局', status: 'closed' },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<Task>[] = [
    {
      title: '任务',
      dataIndex: 'title',
      formItemProps: { rules: [{ required: true, message: '请输入任务名称' }] },
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
        <Popconfirm
          key="delete"
          title="删除这条任务？"
          onConfirm={() => setRows((current) => current.filter((item) => item.id !== row.id))}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <Typography.Paragraph>使用 recordCreatorProps 新建，editable 编辑，操作列删除。</Typography.Paragraph>
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        value={rows}
        onChange={setRows}
        scroll={{ x: 500 }}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({ id: Date.now(), title: '', status: 'open' }),
        }}
        editable={{ editableKeys, onChange: setEditableKeys }}
      />
    </>
  );
};
