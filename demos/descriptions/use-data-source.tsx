import { ProDescriptions } from '@ant-design/pro-components';

type Project = { name: string; owner: string };

export default () => (
  <ProDescriptions<Project>
    title="dataSource 映射字段"
    dataSource={{ name: '组件库', owner: '林青' }}
    columns={[
      { title: '项目', dataIndex: 'name' },
      { title: '负责人', dataIndex: 'owner' },
    ]}
  />
);
