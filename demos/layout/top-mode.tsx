import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    {
      path: '/dashboard',
      name: '概览',
      routes: [{ path: '/dashboard/analysis', name: '分析页' }],
    },
    {
      path: '/orders',
      name: '订单',
      routes: [{ path: '/orders/list', name: '订单列表' }],
    },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/dashboard/analysis');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="示例工作台"
        route={route}
        layout="top"
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/dashboard/analysis');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer title="顶部导航">
          <div style={{ minHeight: 280, padding: 24, background: '#fff' }}>
            当前页面：{pathname}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
