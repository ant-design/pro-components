import { PageContainer, ProLayout } from '@ant-design/pro-components';

export default () => (
  <div style={{ height: 560, overflow: 'auto' }}>
    <ProLayout
      title="简洁页面"
      route={{ routes: [{ path: '/demo', name: '示例页' }] }}
      location={{ pathname: '/demo' }}
      token={{
        bgLayout: '#fff',
        pageContainer: { colorBgPageContainer: '#fff' },
      }}
    >
      <PageContainer title="统一页面背景">
        <div style={{ minHeight: 280, padding: 24 }}>
          布局与页面容器使用相同的白色背景。
        </div>
      </PageContainer>
    </ProLayout>
  </div>
);
