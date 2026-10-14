import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string };
const columns: ProColumns<Task>[] = [
  { title: '任务名称', dataIndex: 'title' },
  { title: '操作', valueType: 'option' },
];

export default () => {
  const [controlled, setControlled] = useState(false);
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '优化首页加载速度' },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([1]);
  const [changes, setChanges] = useState(0);

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div style={{ marginBottom: 16 }}>
        <Switch checked={controlled} onChange={setControlled} /> 编辑时触发
        onChange
      </div>
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        scroll={{ x: 480 }}
        value={rows}
        onChange={(nextRows) => {
          setRows(nextRows);
          setChanges((count) => count + 1);
        }}
        controlled={controlled}
        recordCreatorProps={false}
        editable={{ editableKeys, onChange: setEditableKeys }}
      />
      <div>onChange 调用次数：{changes}</div>
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(rows)}
      </pre>
    </div>
  );
};
