import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Tag } from 'antd';

/**
 * `menuTextRender`：在默认文案外包一层 DOM（高亮、标记、Tooltip 等）。
 */
const route = {
  path: '/',
  routes: [
    {
      path: '/welcome',
      name: '工作台',
      icon: <HomeOutlined />,
    },
    {
      path: '/shop',
      name: '店铺',
      icon: <ShopOutlined />,
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
    menuTextRender={(item, text) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {text}
        {item.path === '/welcome' ? <Tag color="blue">默认</Tag> : null}
      </span>
    )}
  >
    <PageContainer title="menuTextRender">
      左侧菜单文案由 <code>menuTextRender</code>{' '}
      包了一层，并为「工作台」附加标签。
    </PageContainer>
  </ProLayout>
);
