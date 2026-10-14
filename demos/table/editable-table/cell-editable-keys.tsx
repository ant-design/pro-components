import type { EditableFormInstance } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

type Person = { id: number; name: string; city: string };

export default () => {
  const editableFormRef = useRef<EditableFormInstance<Person>>();
  const [rows, setRows] = useState<readonly Person[]>([
    { id: 1, name: '张三', city: '杭州' },
    { id: 2, name: '李四', city: '北京' },
  ]);

  return (
    <>
      <Button
        onClick={() => {
          const name = editableFormRef.current?.getRowsData?.()?.[0]?.name;
          if (name) {
            setRows((current) =>
              current.map((row) =>
                row.id === 1 ? { ...row, name } : row,
              ),
            );
          }
        }}
        style={{ marginBottom: 12 }}
      >
        保存姓名
      </Button>
      <EditableProTable<Person>
        rowKey="id"
        columns={[
          { title: '姓名', dataIndex: 'name', key: 'name' },
          { title: '城市', dataIndex: 'city', key: 'city' },
        ]}
        value={rows}
        onChange={setRows}
        editableFormRef={editableFormRef}
        recordCreatorProps={false}
        // `${rowKey}:${dataIndex}` 只启用第一行的 name 单元格。
        editable={{ editableKeys: ['1:name'] }}
      />
      <div style={{ marginTop: 8 }}>第一行姓名：{rows[0]?.name}</div>
    </>
  );
};
