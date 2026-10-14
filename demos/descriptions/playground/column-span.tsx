import { ProDescriptions } from '@ant-design/pro-components';
import { descriptionData } from './data';

export default () => (
  <ProDescriptions
    column={2}
    dataSource={descriptionData}
    columns={[
      { title: '服务', dataIndex: 'name', span: 2 },
      { title: '负责人', dataIndex: 'owner' },
      { title: '状态', dataIndex: 'status' },
    ]}
  />
);
