import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { key: string; name: string };

const columns: ProColumns<Task>[] = [
  { title: '排序', dataIndex: 'sort', width: 110 },
  { title: '任务', dataIndex: 'name' },
];

const initialRows: Task[] = [
  { key: 'a', name: '设计' },
  { key: 'b', name: '开发' },
  { key: 'c', name: '测试' },
];

export default () => {
  const [rows, setRows] = useState(initialRows);

  return (
    <div style={{ padding: 12 }}>
      <DragSortTable<Task>
        rowKey="key"
        columns={columns}
        dataSource={rows}
        dragSortKey="sort"
        dragSortHandlerRender={(_row, index) => (
          <span style={{ cursor: 'grab', whiteSpace: 'nowrap' }}>
            <MenuOutlined /> 第 {index + 1} 项
          </span>
        )}
        onDragSortEnd={(_before, _after, nextRows) => setRows(nextRows)}
        search={false}
        options={false}
        pagination={false}
      />
    </div>
  );
};
