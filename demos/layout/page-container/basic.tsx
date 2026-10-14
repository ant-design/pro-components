import { PageContainer, ProCard } from '@ant-design/pro-components';

export default () => (
  <PageContainer
    title="项目概览"
    breadcrumb={{ items: [{ title: '工作台' }, { title: '项目概览' }] }}
  >
    <ProCard>当前项目：智慧零售平台</ProCard>
  </PageContainer>
);
