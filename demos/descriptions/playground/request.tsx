import { ProDescriptions } from '@ant-design/pro-components';
import { descriptionData } from './data';

export default () => (
  <ProDescriptions
    request={async () => ({ success: true, data: descriptionData })}
    columns={[
      { title: '服务', dataIndex: 'name' },
      { title: '负责人', dataIndex: 'owner' },
    ]}
  />
);
