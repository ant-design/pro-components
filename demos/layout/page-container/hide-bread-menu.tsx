import { PageContainer } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 24, background: '#f5f7fa' }}>
    <PageContainer
      title="项目详情"
      breadcrumbRender={false}
      header={{
        breadcrumb: {
          items: [
            { path: '/', title: '首页' },
            { path: '/projects', title: '项目' },
          ],
        },
      }}
    >
      面包屑已隐藏，页面标题仍保留。
    </PageContainer>
  </div>
);
