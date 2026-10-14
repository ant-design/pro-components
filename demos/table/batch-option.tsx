import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

type Task = { id: number; name: string; status: 'pending' | 'done' };

const columns: ProColumns<Task>[] = [
  { title: '任务', dataIndex: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: { pending: '待处理', done: '已完成' },
  },
];

export default () => {
  const [rows, setRows] = useState<Task[]>([
    { id: 1, name: '检查表格', status: 'pending' },
    { id: 2, name: '更新文档', status: 'pending' },
    { id: 3, name: '修复布局', status: 'pending' },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <ProTable<Task>
      rowKey="id"
      headerTitle="选中任务后批量完成"
      columns={columns}
      dataSource={rows}
      search={false}
      options={false}
      pagination={false}
      rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      tableAlertRender={({ selectedRowKeys: keys }) => (
        <Space>已选 {keys.length} 项</Space>
      )}
      tableAlertOptionRender={() => (
        <Button
          type="link"
          onClick={() => {
            setRows((current) =>
              current.map((row) =>
                selectedRowKeys.includes(row.id)
                  ? { ...row, status: 'done' }
                  : row,
              ),
            );
            message.success(`已完成 ${selectedRowKeys.length} 项`);
            setSelectedRowKeys([]);
          }}
        >
          批量完成
        </Button>
      )}
    />
  );
};
