import React, { useState, useEffect } from 'react';
import ProLayout, { PageContainer, MenuDataItem } from '@ant-design/pro-layout';
import { Button, Spin } from 'antd';
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
          height: 400,
          border: '1px solid #ddd',
        }}
        menuContentRender={(_, dom) =>
          loading ? (
            <div
              style={{
                padding: '24px 0',
              }}
            >
              <Spin tip="菜单加载中">{dom}</Spin>
            </div>
          ) : (
            dom
          )
        }
        location={{
          pathname: '/welcome',
        }}
        menuDataRender={() => menuData}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};
