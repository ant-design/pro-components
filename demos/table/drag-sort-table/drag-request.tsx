import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { useCallback, useRef } from 'react';

type Task = { key: string; name: string };

const columns: ProColumns<Task>[] = [
  { title: '排序', dataIndex: 'sort', width: 72 },
  { title: '任务', dataIndex: 'name' },
];

const initialRows: Task[] = [
  { key: 'a', name: '设计' },
  { key: 'b', name: '开发' },
  { key: 'c', name: '测试' },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const savedRows = useRef(initialRows);
  const request = useCallback(
    async () => ({
      data: [...savedRows.current],
      total: savedRows.current.length,
      success: true,
    }),
    [],
  );

  return (
    <div style={{ padding: 12 }}>
      <DragSortTable<Task>
        rowKey="key"
        columns={columns}
        request={request}
        actionRef={actionRef}
        dragSortKey="sort"
        onDragSortEnd={async (_before, _after, nextRows) => {
          savedRows.current = nextRows;
          actionRef.current?.reload();
        }}
        search={false}
        options={false}
        pagination={false}
      />
    </div>
  );
};
