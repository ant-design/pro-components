import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type ContentWidth = 'Fluid' | 'Fixed';

export default () => {
  const [contentWidth, setContentWidth] = useState<ContentWidth>('Fluid');

  return (
    <div style={{ height: 700, overflow: 'auto' }}>
      <ProLayout
        title="内容宽度"
        contentWidth={contentWidth}
        route={{ routes: [{ path: '/dashboard', name: '概览' }] }}
        location={{ pathname: '/dashboard' }}
      >
        <PageContainer title="contentWidth">
          <ProCard>
            <Segmented<ContentWidth>
              aria-label="内容宽度"
              value={contentWidth}
              onChange={setContentWidth}
              options={[
                { label: '流式 Fluid', value: 'Fluid' },
                { label: '定宽 Fixed', value: 'Fixed' },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0 }}>
              当前 contentWidth：{contentWidth}
            </p>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
