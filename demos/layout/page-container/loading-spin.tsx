import { PageContainer } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 12, background: '#f5f7fa' }}>
    <PageContainer
      title="自定义加载提示"
      loading={{ spinning: true, tip: '正在获取任务详情…' }}
    >
      <div style={{ minHeight: 120, padding: 16, background: '#fff' }}>
        页面内容
      </div>
    </PageContainer>
  </div>
);
