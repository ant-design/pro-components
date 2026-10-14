import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

type Task = { id: number; title: string };

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
  const [mode, setMode] = useState<'single' | 'multiple'>('single');
  const [editableKeys, setEditableKeys] = useState<Key[]>([]);
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '设计首页' },
    { id: 2, title: '开发登录页' },
  ]);

  return (
    <div style={{ padding: 12 }}>
      <Segmented
        value={mode}
        options={[
          { label: '单行编辑', value: 'single' },
          { label: '多行编辑', value: 'multiple' },
        ]}
        onChange={(value) => {
          setMode(value as 'single' | 'multiple');
          setEditableKeys([]);
        }}
      />
      <p>
        正在编辑的行：{editableKeys.length ? editableKeys.join('、') : '无'}
      </p>
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        value={rows}
        onChange={(nextRows) =>
          setRows(nextRows.map(({ id, title }) => ({ id, title })))
        }
        recordCreatorProps={false}
        editable={{
          type: mode,
          editableKeys,
          onChange: setEditableKeys,
          actionRender: (_row, _config, actions) => [
            actions.save,
            actions.cancel,
          ],
        }}
      />
      <pre style={{ overflowX: 'auto' }}>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
};
