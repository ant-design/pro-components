import React, { useState, useEffect } from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import customMenuDate from './customMenu';

export default () => {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setMenuData([]);
    setLoading(true);
    setTimeout(() => {
      setMenuData(customMenuDate);
      setLoading(false);
    }, 2000);
  }, [index]);
  return (
    <>
      <Button
        onClick={() => setIndex(index + 1)}
        style={{
          margin: 8,
        }}
      >
        重新加载
      </Button>
      <ProLayout
        style={{
          height: '100vh',
          border: '1px solid #ddd',
        }}
        menu={{
          loading,
        }}
        location={{
          pathname: '/welcome/welcome',
        }}
        menuDataRender={() => menuData}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};
