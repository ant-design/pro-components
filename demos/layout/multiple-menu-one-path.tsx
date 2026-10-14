import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    {
      path: '/products',
      name: '产品管理',
      routes: [
        {
          path: '/products/list',
          name: '产品列表',
          routes: [
            { path: '/products/list/new', component: 'ProductNew' },
            { path: '/products/list/detail', component: 'ProductDetail' },
          ],
        },
      ],
    },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/products/list/new');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="产品管理"
        route={route}
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/products/list');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer title="多个路由共用一个菜单项">
          <Space wrap>
            <Button onClick={() => setPathname('/products/list/new')}>
              新建页
            </Button>
            <Button onClick={() => setPathname('/products/list/detail')}>
              详情页
            </Button>
          </Space>
          <p role="status">当前路径：{pathname}</p>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
