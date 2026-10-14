import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    { path: '/dashboard', name: '工作台' },
    { path: '/reports', name: '报表' },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/dashboard');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="暗色导航"
        navTheme="realDark"
        route={route}
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/dashboard');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer title="暗色导航主题">
          <div style={{ minHeight: 280, padding: 24, background: '#fff' }}>
            当前页面：{pathname}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
