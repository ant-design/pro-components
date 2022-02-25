import React, { useState } from 'react';

import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Input, Button, Space } from 'antd';
import complexMenu from './complexMenu';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';

const filterByMenuDate = (data: MenuDataItem[], keyWord: string): MenuDataItem[] =>
  data
    .map((item) => {
      if (
        (item.name && item.name.includes(keyWord)) ||
        filterByMenuDate(item.routes || [], keyWord).length > 0
      ) {
        return {
          ...item,
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
        menuExtraRender={({ collapsed }) =>
          !collapsed && (
            <Space
              style={{
                marginTop: 16,
              }}
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
                  color: '#1677FF',
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
