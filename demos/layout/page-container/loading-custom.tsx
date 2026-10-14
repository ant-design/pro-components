import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ padding: 12, background: '#f5f7fa' }}>
      <Button onClick={() => setLoading((current) => !current)}>
        {loading ? '显示内容' : '显示自定义加载'}
      </Button>
      <PageContainer
        title="自定义加载内容"
        loading={loading ? <div style={{ padding: 24 }}>正在准备页面…</div> : false}
      >
        <div style={{ padding: 16, background: '#fff' }}>页面已就绪</div>
      </PageContainer>
    </div>
  );
};
