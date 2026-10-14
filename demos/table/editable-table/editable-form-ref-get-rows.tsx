import type {
  EditableFormInstance,
  ProColumns,
} from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useRef, useState } from 'react';

type Task = { id: number; title: string };
const columns: ProColumns<Task>[] = [
  { title: '任务名称', dataIndex: 'title' },
  { title: '操作', valueType: 'option' },
];

export default () => {
  const editableFormRef = useRef<EditableFormInstance<Task>>();
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '优化首页加载速度' },
  ]);
  const [result, setResult] = useState('');

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Button
        onClick={() =>
          setResult(
            JSON.stringify(editableFormRef.current?.getRowsData?.() ?? []),
          )
        }
        style={{ marginBottom: 16 }}
      >
        读取编辑行数据
      </Button>
      {result && (
        <Alert type="info" message={result} style={{ marginBottom: 16 }} />
      )}
      <EditableProTable<Task>
        rowKey="id"
        columns={columns}
        scroll={{ x: 480 }}
        editableFormRef={editableFormRef}
        value={rows}
        onChange={setRows}
        recordCreatorProps={false}
        editable={{ editableKeys: [1] }}
      />
    </div>
  );
};
