import { PageContainer } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 12, background: '#f5f7fa' }}>
    <PageContainer
      title="内容间距"
      token={{ paddingInlinePageContainerContent: 16 }}
    >
      <div style={{ padding: 16, background: '#fff' }}>
        左右内容间距由 token.paddingInlinePageContainerContent 设置为 16。
      </div>
    </PageContainer>
  </div>
);
