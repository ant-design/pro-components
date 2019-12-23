import React, { useState } from 'react';
import ProLayout, {
  PageHeaderWrapper,
  MenuDataItem,
} from '@ant-design/pro-layout';
import { Input } from 'antd';
import complexMenu from './complexMenu';

const filterByMenuDate = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
  data
    .map(item => {
      if (
        (item.name && item.name.includes(keyWord)) ||
        filterByMenuDate(item.children || [], keyWord).length > 0
      ) {
        return {
          ...item,
          children: filterByMenuDate(item.children || [], keyWord),
        };
      }

      return undefined;
    })
    .filter(item => item) as MenuDataItem[];

export default () => {
  const [keyWord, setKeyWord] = useState('');
  return (
    <div
      style={{
        height: 400,
        overflow: 'auto',
      }}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        menuHeaderRender={(logo, title, props = { collapsed: false }) => (
          <>
            <div
              style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              {logo}
              {title}
            </div>
            <Input.Search
              style={{
                width: props.collapsed ? 0 : '100%',
                transition: props.collapsed ? undefined : 'all 0.3s',
                opacity: props.collapsed ? 0 : 1,
              }}
              onSearch={e => {
                setKeyWord(e);
              }}
            />
          </>
        )}
        menuDataRender={() => filterByMenuDate(complexMenu, keyWord)}
      >
        <PageHeaderWrapper content="欢迎使用">
          <div>Hello World</div>
        </PageHeaderWrapper>
      </ProLayout>
    </div>
  );
};
