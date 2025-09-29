import { DefaultFooter, PageContainer, ProLayout } from '@xxlabs/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <ProLayout
    {...defaultProps}
    collapsed
    breakpoint={false}
    footerRender={() => (
      <DefaultFooter
        copyright="这是一条测试文案"
        links={[
          { key: 'test', title: 'layout', href: 'www.alipay.com' },
          { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
        ]}
      />
    )}
    location={{
      pathname: '/welcome',
    }}
    style={{
      height: '100vh',
    }}
  >
    <PageContainer content="欢迎使用">Hello World</PageContainer>
  </ProLayout>
);
