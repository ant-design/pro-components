import { ProList } from '@ant-design/pro-components';

type Project = { id: number; title: string };
const projects: Project[] = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  title: `项目 ${index + 1}`,
}));

export default () => (
  <ProList<Project>
    rowKey="id"
    dataSource={projects}
    pagination={{ pageSize: 3, showSizeChanger: false }}
    columns={[{ dataIndex: 'title', listSlot: 'title' }]}
  />
);
