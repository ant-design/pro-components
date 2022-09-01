import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/data_hui/data_hui2',
      }}
      collapsed={false}
      collapsedButtonRender={false}
      route={{
        routes: complexMenu,
      }}
      menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
