import { HomeOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

/**
 * ProLayout `links`：渲染在侧栏菜单右下角的一排快捷链（与 DefaultFooter 的 links 不同）。
 */
const route = {
  path: '/',
  routes: [
    {
      path: '/welcome',
      name: '工作台',
      icon: <HomeOutlined />,
    },
  ],
};

export default () => (
  <ProLayout
    route={route}
    location={{ pathname: '/welcome' }}
    breakpoint={false}
    style={{ height: 480 }}
    menu={{ locale: false }}
    links={[
      <a key="antd" href="https://ant.design" target="_blank" rel="noreferrer">
        Ant Design
      </a>,
      <a
        key="pro"
        href="https://procomponents.ant.design"
        target="_blank"
        rel="noreferrer"
      >
        ProComponents
      </a>,
    ]}
  >
    <PageContainer title="侧栏 links">
      缩放侧栏到底部可看到 <code>links</code> 注入的快捷外链。
    </PageContainer>
  </ProLayout>
);
