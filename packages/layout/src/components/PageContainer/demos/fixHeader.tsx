import { PageContainer, ProCard } from '@ant-design/pro-components';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      fixedHeader
      header={{
        title: '页面标题',
        breadcrumb: {
          items: [
            {
              path: '',
              title: '一级页面',
            },
            {
              path: '',
              title: '二级页面',
            },
            {
              path: '',
              title: '当前页面',
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
        <ProCard gutter={16} ghost>
          <ProCard colSpan={16} style={{ height: 200 }} />
          <ProCard colSpan={8} style={{ height: 200 }} />
        </ProCard>
        <ProCard gutter={16} ghost>
          <ProCard colSpan={8} style={{ height: 200 }} />
          <ProCard colSpan={16} style={{ height: 200 }} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);
