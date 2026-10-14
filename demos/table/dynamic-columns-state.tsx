import type { ColumnsState } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string; owner: string };

export default () => {
  const [columnsState, setColumnsState] = useState<Record<string, ColumnsState>>({
    owner: { show: true },
  });
  const ownerVisible = columnsState.owner?.show !== false;

  return (
    <ProTable<Task>
      rowKey="id"
      headerTitle={
        <Space wrap>
          <Button
            onClick={() =>
              setColumnsState((current) => ({
                ...current,
                owner: { ...current.owner, show: !ownerVisible },
              }))
            }
          >
            {ownerVisible ? '隐藏负责人列' : '显示负责人列'}
          </Button>
        </Space>
      }
      columns={[
        { title: '任务', dataIndex: 'title', key: 'title' },
        { title: '负责人', dataIndex: 'owner', key: 'owner' },
      ]}
      dataSource={[{ id: 1, title: '检查首页', owner: '林青' }]}
      search={false}
      pagination={false}
      columnsState={{ value: columnsState, onChange: setColumnsState }}
    />
  );
};
