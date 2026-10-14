import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useState } from 'react';

type Service = {
  key: number;
  name: string;
  status: string;
};

const columns: ProColumns<Service>[] = [
  { title: '服务', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status' },
];

export default () => {
  const [polling, setPolling] = useState(2000);
  const [requestCount, setRequestCount] = useState(0);
  const request = useCallback(async () => {
    setRequestCount((count) => count + 1);
    return {
      data: [{ key: 1, name: '用户认证', status: '运行中' }],
      success: true,
      total: 1,
    };
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <ProTable<Service>
        rowKey="key"
        columns={columns}
        search={false}
        options={false}
        pagination={false}
        polling={polling}
        request={request}
        headerTitle={`请求次数：${requestCount}`}
        toolBarRender={() => [
          <Button
            key="polling"
            onClick={() => setPolling((interval) => (interval ? 0 : 2000))}
          >
            {polling ? '停止轮询' : '开始轮询'}
          </Button>,
        ]}
      />
    </div>
  );
};
