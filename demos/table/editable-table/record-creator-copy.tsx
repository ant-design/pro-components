import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

import { createEditableRowId } from '../../mockData';

type Task = { id: React.Key; title: string };

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '优化首页加载速度' },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<Task>[] = [
    { title: '任务名称', dataIndex: 'title' },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row) => [
        <EditableProTable.RecordCreator
          key="copy"
          record={{ ...row, id: createEditableRowId() }}
        >
          <a>复制到末尾</a>
        </EditableProTable.RecordCreator>,
      ],
    },
  ];

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
