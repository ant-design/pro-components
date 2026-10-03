import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProList } from '@ant-design/pro-components';
import { Alert, Button, Space, Typography } from 'antd';
import { useRef, useState } from 'react';

type Item = { id: number; title: string; description: string };

const columns: ProColumns<Item>[] = [
  { dataIndex: 'title', title: '标题', listSlot: 'title' },
  { dataIndex: 'description', title: '说明', listSlot: 'description' },
  {
    title: '操作',
    listSlot: 'actions',
    render: () => [<a key="edit">编辑</a>],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState('等待请求完成');

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <Alert
        type="info"
        showIcon
        message="ProList 展示与实时分页状态"
        description="覆盖操作区 hover、grid itemRender gutter 及 actionRef.pageInfo。"
      />
      <ProList<Item>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        showActions="hover"
        grid={{ column: 2, gutter: [16, 24] }}
        pagination={{ pageSize: 2 }}
        request={async () => ({
          success: true,
          total: 42,
          data: [
            { id: 1, title: '项目 A', description: '悬停显示操作区' },
            { id: 2, title: '项目 B', description: '卡片间距保持一致' },
          ],
        })}
        itemRender={(item, index, defaultDom) => (
          <ProCard title={`自定义 itemRender ${index + 1}`}>
            {defaultDom}
          </ProCard>
        )}
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
    </ProCard>
  );
};
