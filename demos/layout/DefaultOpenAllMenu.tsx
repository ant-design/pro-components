import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      collapsed={false}
      collapsedButtonRender={false}
      location={{
        pathname: '/data_hui/data_hui2',
      }}
      menu={{ defaultOpenAll: true, hideMenuWhenCollapsed: true }}
      route={{
        routes: complexMenu,
      }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
