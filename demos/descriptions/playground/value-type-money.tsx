import { ProDescriptions } from '@ant-design/pro-components';
import { descriptionData } from './data';

export default () => (
  <ProDescriptions
    dataSource={descriptionData}
    columns={[{ title: '合同金额', dataIndex: 'amount', valueType: 'money' }]}
  />
);
