import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
    >
      <PageContainer title="透明卡片容器">
        <div style={{ background: '#e8edf3', padding: 16 }}>
          <ProCard ghost>
            <ProCard title="服务状态" variant="outlined">
              正常运行。灰色背景透过父级卡片显示。
            </ProCard>
          </ProCard>
        </div>
      </PageContainer>
    </ProLayout>
  </div>
);
