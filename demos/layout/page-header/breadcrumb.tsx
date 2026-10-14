import { PageHeader } from '@ant-design/pro-components';

const items = [
  { path: '/', title: '首页' },
  { path: '/projects', title: '项目' },
  { path: '/projects/detail', title: '项目详情' },
];

export default () => (
  <div style={{ padding: 24 }}>
    <PageHeader title="项目详情" breadcrumb={{ items }} />
  </div>
);
