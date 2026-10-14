import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';
import { useRef, useState } from 'react';

type Item = { id: number; title: string };
const columns: ProColumns<Item>[] = [
  { dataIndex: 'title', title: '标题', listSlot: 'title' },
];
export default () => {
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState('等待请求完成');
  return (
    <ProList<Item>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      pagination={{ pageSize: 2 }}
      request={async ({ current = 1, pageSize = 2 }) => ({
        success: true,
        total: 6,
        data: Array.from({ length: pageSize }, (_, index) => ({
          id: (current - 1) * pageSize + index + 1,
          title: `项目 ${(current - 1) * pageSize + index + 1}`,
        })),
      })}
      toolBarRender={() => [
        <Space key="page-info">
          <Button
            onClick={() =>
              setPageInfo(JSON.stringify(actionRef.current?.pageInfo))
            }
          >
            读取 pageInfo
          </Button>
          <Typography.Text code>{pageInfo}</Typography.Text>
        </Space>,
      ]}
    />
  );
};
