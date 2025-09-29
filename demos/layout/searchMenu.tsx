import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@xxlabs/pro-components';
import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import { Input, Space } from 'antd';
import { useState } from 'react';
import complexMenu from './complexMenu';

const filterByMenuData = (data: MenuDataItem[], keyWord: string): MenuDataItem[] =>
  data
    .map((item) => {
      if (item.name?.includes(keyWord)) {
        return { ...item };
      }
      const children = filterByMenuData(item.children || [], keyWord);
      if (children.length > 0) {
        return { ...item, children };
      }
      return undefined;
    })
    .filter((item) => item) as MenuDataItem[];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    children: routes && loopMenuItem(routes),
  }));

export default () => {
  const [keyWord, setKeyWord] = useState('');
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        menuDataRender={() => loopMenuItem(complexMenu)}
        menuExtraRender={({ collapsed }) =>
          !collapsed && (
            <Space
              align="center"
              style={{
                marginBlockStart: 16,
              }}
            >
              <Input
                placeholder="搜索方案"
                prefix={
                  <SearchOutlined
                    style={{
                      color: 'rgba(0, 0, 0, 0.15)',
                    }}
                  />
                }
                style={{
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }}
                variant="borderless"
                onPressEnter={(e) => {
                  setKeyWord((e.target as HTMLInputElement).value);
                }}
              />
              <PlusCircleFilled
                style={{
                  color: 'var(--ant-primary-color)',
                  fontSize: 24,
                }}
              />
            </Space>
          )
        }
        postMenuData={(menus) => filterByMenuData(menus || [], keyWord)}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
