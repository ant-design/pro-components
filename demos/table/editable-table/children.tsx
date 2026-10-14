import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: string; title: string; children?: Task[] };

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    {
      id: 'parent',
      title: '发布新版本',
      children: [{ id: 'child', title: '检查发布说明' }],
    },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  return (
    <div style={{ maxWidth: '100%', padding: 16 }}>
      <EditableProTable<Task>
        rowKey="id"
        value={rows}
        onChange={setRows}
        columns={[
          { title: '任务名称', dataIndex: 'title' },
          {
            title: '操作',
            valueType: 'option',
            render: (_, record, __, action) => [
              <a key="edit" onClick={() => action?.startEditable?.(record.id)}>
                编辑
              </a>,
            ],
          },
        ]}
        expandable={{ defaultExpandAllRows: true }}
        recordCreatorProps={{
          position: 'bottom',
          newRecordType: 'dataSource',
          parentKey: () => 'parent',
          record: () => ({ id: crypto.randomUUID(), title: '新子任务' }),
        }}
        editable={{ editableKeys, onChange: setEditableKeys }}
      />
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(rows, null, 2)}
      </pre>
    </div>
  );
};
