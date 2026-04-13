import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

const Demo = () => (
  <ProLayout
    {...defaultProps}
    style={{
      height: '100vh',
    }}
    breakpoint={false}
    collapsed
    location={{
      pathname: '/welcome',
    }}
    footerRender={() => (
      <DefaultFooter
        links={[
          {
            key: 'procomponents',
            title: 'ProComponents',
            href: 'https://procomponents.ant.design/',
          },
          {
            key: 'antd',
            title: 'Ant Design',
            href: 'https://ant.design/',
          },
        ]}
        copyright="ProComponents 页脚示例"
      />
    )}
  >
    <PageContainer content="欢迎使用">Hello World</PageContainer>
  </ProLayout>
);

export default () => <Demo />;
