import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [pathname] = useState('/list/sub-page/sub-sub-page1');

  return (
    <ProLayout
      collapsed={true}
      collapsedButtonRender={false}
      layout="side"
      route={{
        routes: [
          {
            path: '/welcome',
            name: '欢迎',
            icon: <SmileFilled />,
            component: './Welcome',
          },
          {
            path: '/admin',
            name: '管理',
            icon: <CrownFilled />,
            access: 'canAdmin',
            component: './Admin',
          },
          {
            path: '/list',
            name: '列表',
            icon: <TabletFilled />,
            access: 'canAdmin',
            component: './Admin',
          },
        ],
      }}
      location={{
        pathname,
      }}
      menu={{
        type: 'group',
        collapsedShowTitle: true,
      }}
    />
  );
};
