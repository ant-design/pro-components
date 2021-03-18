import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

export default () => (
  <div
    style={{
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
      height: '100vh',
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      ghost
      loading
      header={{
        title: '页面标题',
        breadcrumb: {
          routes: [
            {
              path: '',
              breadcrumbName: '一级页面',
            },
            {
              path: '',
              breadcrumbName: '二级页面',
            },
            {
              path: '',
              breadcrumbName: '当前页面',
            },
          ],
        },
      }}
    >
      <div
        style={{
          height: '100vh',
        }}
      >
        加载中这里不显示
      </div>
    </PageContainer>
  </div>
);
