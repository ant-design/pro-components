import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [activeKey, setActiveKey] = useState('summary');

  return (
    <PageContainer
      title="项目详情"
      tabList={[
        { tab: '概览', key: 'summary' },
        { tab: '成员', key: 'members' },
      ]}
      tabActiveKey={activeKey}
      onTabChange={setActiveKey}
    >
      <ProCard>
        {activeKey === 'summary' ? '项目概览内容' : '项目成员：林青、陈宁'}
      </ProCard>
    </PageContainer>
  );
};
