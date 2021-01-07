/** Uuid: da2b07c7 title: 固定表头 desc: 通过 `fixedHeader` 固定表头，只有在溢出容器时才会开始计算。 */
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

export default () => (
  <PageContainer
    fixedHeader
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
    tabList={[
      {
        tab: '已选择',
        key: '1',
      },
      {
        tab: '可点击',
        key: '2',
      },
      {
        tab: '禁用',
        key: '3',
        disabled: true,
      },
    ]}
  >
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard style={{ height: 200 }} />
      <ProCard gutter={16} ghost style={{ height: 200 }}>
        <ProCard colSpan={16} />
        <ProCard colSpan={8} />
      </ProCard>
    </ProCard>
  </PageContainer>
);
