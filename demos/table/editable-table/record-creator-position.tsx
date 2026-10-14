import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

import { createEditableRowId } from '../../mockData';

type Task = { id: React.Key; title?: string };
const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    formItemProps: { rules: [{ required: true }] },
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
    { id: 1, title: '优化首页加载速度' },
  ]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  return (
    <>
      <Radio.Group
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        options={[
          { label: '顶部', value: 'top' },
          { label: '底部', value: 'bottom' },
          { label: '隐藏', value: 'hidden' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        scroll={{ x: 500 }}
        value={rows}
        onChange={setRows}
        recordCreatorProps={
          position === 'hidden'
            ? false
            : {
                position,
                record: () => ({ id: createEditableRowId(), title: '' }),
              }
        }
        editable={{ editableKeys, onChange: setEditableKeys }}
      />
    </>
  );
};
