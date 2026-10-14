import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: 'frontend' },
  { key: 2, name: '支付网关', value: 'backend' },
];

export default () => (
  <ProTable
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    dataSource={dataSource}
    columns={[
      { title: '应用名称', dataIndex: 'name' },
      {
        title: '所属部门',
        dataIndex: 'value',
        valueType: 'treeSelect',
        fieldProps: {
          treeData: [
            {
              title: '研发',
              value: 'development',
              children: [
                { title: '前端', value: 'frontend' },
                { title: '后端', value: 'backend' },
              ],
            },
          ],
        },
      },
    ]}
  />
);
