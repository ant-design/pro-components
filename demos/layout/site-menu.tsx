import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    {
      path: '/projects',
      name: '项目',
      routes: [
        { path: '/projects/active', name: '进行中' },
        { path: '/projects/archive', name: '归档' },
      ],
    },
    {
      path: '/team',
      name: '团队',
      routes: [
        { path: '/team/members', name: '成员' },
        { path: '/team/roles', name: '角色' },
      ],
    },
  ],
};

export default () => {
  const [pathname, setPathname] = useState('/projects/active');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="分组导航"
        layout="mix"
        splitMenus
        menu={{ type: 'group' }}
        route={route}
        location={{ pathname }}
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/projects/active');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer title="顶栏与侧栏分组导航">
          <div style={{ minHeight: 280, padding: 24, background: '#fff' }}>
            当前路径：{pathname}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
