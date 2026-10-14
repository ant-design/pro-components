import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

import { createEditableRowId } from '../../mockData';

type Task = { id: React.Key; title?: string };
const columns: ProColumns<Task>[] = [
  { title: '任务名称', dataIndex: 'title' },
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
  const actionRef = useRef<ActionType>();
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '优化首页加载速度' },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          actionRef.current?.addEditRecord?.({
            id: createEditableRowId(),
            title: '新建任务',
          })
        }
        style={{ marginBottom: 16 }}
      >
        新建并编辑
      </Button>
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        scroll={{ x: 500 }}
        actionRef={actionRef}
        value={rows}
        onChange={setRows}
        recordCreatorProps={false}
        editable={{ editableKeys, onChange: setEditableKeys }}
      />
    </>
  );
};
