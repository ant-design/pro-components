import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Input, Space } from 'antd';
import { useState } from 'react';
import complexMenu from './complexMenu';

const filterByMenuData = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
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
        menuExtraRender={({ collapsed }) =>
          !collapsed && (
            <Space
              style={{
                marginBlockStart: 16,
              }}
              align="center"
            >
              <Input
                style={{
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.03)',
                }}
                prefix={
                  <SearchOutlined
                    style={{
                      color: 'rgba(0, 0, 0, 0.15)',
                    }}
                  />
                }
                placeholder="搜索方案"
                bordered={false}
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
        menuDataRender={() => loopMenuItem(complexMenu)}
        postMenuData={(menus) => filterByMenuData(menus || [], keyWord)}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
