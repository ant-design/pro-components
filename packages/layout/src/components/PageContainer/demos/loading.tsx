/** Uuid: 7f462cb4 title: 页面加载中 desc: 通过 `lodding` 属性配置页面加载。 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

export default () => (
  <div
    style={{
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
      background: '#F5F7FA',
      height: 400,
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
      <div>加载中这里不显示</div>
    </PageContainer>
  </div>
);
