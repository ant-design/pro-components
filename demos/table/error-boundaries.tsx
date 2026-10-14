import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Result, Space } from 'antd';
import React, { useState } from 'react';

type Service = { key: number; name: string };

class CustomBoundary extends React.Component<
  React.PropsWithChildren,
  { error: string | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="自定义错误提示"
          subTitle={this.state.error}
        />
      );
    }
    return this.props.children;
  }
}

const Status = ({ crash }: { crash: boolean }) => {
  if (crash) throw new Error('状态列渲染失败');
  return <span>运行中</span>;
};

export default () => {
  const [crash, setCrash] = useState(false);
  const [version, setVersion] = useState(0);
  const columns: ProColumns<Service>[] = [
    { title: '服务', dataIndex: 'name' },
    { title: '状态', render: () => <Status crash={crash} /> },
  ];

  return (
    <div style={{ padding: 12 }}>
      <Space wrap style={{ marginBottom: 12 }}>
        <Button danger disabled={crash} onClick={() => setCrash(true)}>
          触发渲染错误
        </Button>
        <Button
          onClick={() => {
            setCrash(false);
            setVersion((current) => current + 1);
          }}
        >
          重置表格
        </Button>
      </Space>
      <ProTable<Service>
        key={version}
        rowKey="key"
        columns={columns}
        dataSource={[{ key: 1, name: '用户认证' }]}
        ErrorBoundary={CustomBoundary}
        search={false}
        options={false}
        pagination={false}
      />
    </div>
  );
};
