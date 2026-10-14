import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    {
      path: '/projects',
      name: '项目',
      routes: [
        { path: '/projects/active', name: '进行中' },
        { path: '/projects/archive', name: '已归档' },
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
        title="子菜单导航"
        siderMenuType="sub"
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
        <div style={{ padding: 24 }}>当前路径：{pathname}</div>
      </ProLayout>
    </div>
  );
};
