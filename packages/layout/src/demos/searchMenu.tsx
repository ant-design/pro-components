import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Input, Space } from 'antd';
import { useState } from 'react';
import complexMenu from './complexMenu';

const filterByMenuDate = (data: MenuDataItem[], keyWord: string): MenuDataItem[] =>
  data
    .map((item) => {
      if (
        (item.name && item.name.includes(keyWord)) ||
        filterByMenuDate(item.routes || [], keyWord).length > 0
      ) {
        return {
          ...item,
          children: filterByMenuDate(item.children || [], keyWord),
          routes: filterByMenuDate(item.routes || [], keyWord),
        };
      }

      return undefined;
    })
    .filter((item) => item) as MenuDataItem[];

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
                marginTop: 16,
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
        menuDataRender={() => complexMenu}
        postMenuData={(menus) => filterByMenuDate(menus || [], keyWord)}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
