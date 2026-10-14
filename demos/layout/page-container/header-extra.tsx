import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [refreshes, setRefreshes] = useState(0);

  return (
    <PageContainer
      title="项目概览"
      extra={
        <Button onClick={() => setRefreshes((value) => value + 1)}>
          刷新数据
        </Button>
      }
    >
      <ProCard>已刷新 {refreshes} 次</ProCard>
    </PageContainer>
  );
};
