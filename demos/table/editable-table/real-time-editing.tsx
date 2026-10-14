import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; owner: string };

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    { id: 1, title: '检查首页', owner: '林青' },
    { id: 2, title: '更新文档', owner: '陈宁' },
  ]);

  return (
    <>
      <EditableProTable<Task>
        rowKey="id"
        columns={[
          { title: '任务', dataIndex: 'title' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
        value={rows}
        onChange={setRows}
        recordCreatorProps={false}
        editable={{
          editableKeys: [1, 2],
          onValuesChange: (_record, list) => setRows(list),
        }}
      />
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(rows, null, 2)}
      </pre>
    </>
  );
};
