import { ProTable } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <ProTable
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    dataSource={[{ key: 1, name: '用户认证服务' }]}
    columns={[
      { title: '应用名称', dataIndex: 'name' },
      {
        title: '操作',
        valueType: 'option',
        render: () => [
          <a key="details" onClick={() => message.info('查看服务详情')}>
            查看详情
          </a>,
        ],
      },
    ]}
  />
);
