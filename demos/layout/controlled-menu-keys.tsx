import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

/**
 * 受控 `selectedKeys` / `openKeys`，配合 `onSelect`、`onOpenChange`。
 * 业务侧可不完全依赖 `location.pathname` 推导选中项。
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
      path: '/list',
      name: '列表',
      icon: <UnorderedListOutlined />,
      routes: [
        { path: '/list/a', name: '项目 A' },
        { path: '/list/b', name: '项目 B' },
      ],
    },
  ],
};

export default () => {
  const [pathname] = useState('/welcome');
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/welcome']);
  const [openKeys, setOpenKeys] = useState<string[]>(['/list']);

  return (
    <ProLayout
      route={route}
      location={{ pathname }}
      breakpoint={false}
      style={{ height: 480 }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(keys) => {
        if (Array.isArray(keys)) setOpenKeys(keys);
      }}
      onSelect={(info) => setSelectedKeys(info.selectedKeys)}
      menu={{ locale: false }}
    >
      <PageContainer title="受控菜单">
        <Space wrap style={{ marginBottom: 12 }}>
          <Button
            type={selectedKeys[0] === '/welcome' ? 'primary' : 'default'}
            onClick={() => setSelectedKeys(['/welcome'])}
          >
            选中工作台
          </Button>
          <Button
            type={selectedKeys[0] === '/list/a' ? 'primary' : 'default'}
            onClick={() => {
              setOpenKeys((k) => (k.includes('/list') ? k : [...k, '/list']));
              setSelectedKeys(['/list/a']);
            }}
          >
            选中「项目 A」
          </Button>
          <Button onClick={() => setOpenKeys([])}>收起列表子菜单</Button>
          <Button onClick={() => setOpenKeys(['/list'])}>展开列表子菜单</Button>
        </Space>
        <br />
        当前 selectedKeys：<code>{JSON.stringify(selectedKeys)}</code>
        <br />
        当前 openKeys：<code>{JSON.stringify(openKeys)}</code>
      </PageContainer>
    </ProLayout>
  );
};
