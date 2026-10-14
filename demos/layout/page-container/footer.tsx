import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [saved, setSaved] = useState(false);

  return (
    <PageContainer
      title="项目设置"
      footer={[
        <Button key="save" type="primary" onClick={() => setSaved(true)}>
          保存设置
        </Button>,
      ]}
    >
      <ProCard>保存状态：{saved ? '已保存' : '未保存'}</ProCard>
    </PageContainer>
  );
};
