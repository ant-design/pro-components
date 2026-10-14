import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const routes = {
  path: '/',
  routes: [
    { path: '/welcome', name: '欢迎' },
    { path: '/orders', name: '订单' },
    { path: '/settings', name: '设置' },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/welcome');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="示例工作台"
        route={routes}
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer
          title={routes.routes.find((item) => item.path === pathname)?.name}
        >
          <div style={{ minHeight: 280, padding: 24, background: '#fff' }}>
            当前页面：{pathname}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
