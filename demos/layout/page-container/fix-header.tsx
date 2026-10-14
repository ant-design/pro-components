import { PageContainer } from '@ant-design/pro-components';

export default () => (
  <div style={{ height: 420, overflow: 'auto', background: '#f5f7fa' }}>
    <PageContainer
      fixedHeader
      title="项目列表"
      content="向下滚动内容，标题会保持在容器顶部。"
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            style={{ background: '#fff', padding: 20, minHeight: 76 }}
          >
            项目 {index + 1}
          </div>
        ))}
      </div>
    </PageContainer>
  </div>
);
