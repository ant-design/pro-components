import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ padding: 12, background: '#f5f7fa' }}>
      <Button onClick={() => setLoading((current) => !current)}>
        {loading ? '结束加载' : '开始加载'}
      </Button>
      <PageContainer title="任务详情" loading={loading}>
        <div style={{ padding: 16, background: '#fff' }}>页面内容</div>
      </PageContainer>
    </div>
  );
};
