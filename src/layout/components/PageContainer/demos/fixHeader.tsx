import { PageContainer, ProCard } from '../../../../components';

export default () => (
  <div
    style={{
      background: '#F5F7FA',
    }}
  >
    <PageContainer
      fixedHeader
      header={{
        title: 'Page Title',
        breadcrumb: {
          items: [
            {
              path: '',
              title: 'Primary page',
            },
            {
              path: '',
              title: 'Secondary page',
            },
            {
              path: '',
              title: 'Current page',
            },
          ],
        },
      }}
      tabList={[
        {
          tab: 'Selected',
          key: '1',
        },
        {
          tab: 'Clickable',
          key: '2',
        },
        {
          tab: 'Disabled',
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
