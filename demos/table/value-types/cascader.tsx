import { ProTable } from '@ant-design/pro-components';

const dataSource = [
  { key: 1, name: '用户认证服务', value: ['frontend', 'react'] },
  { key: 2, name: '支付网关', value: ['backend', 'node'] },
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
        title: '技术栈',
        dataIndex: 'value',
        valueType: 'cascader',
        fieldProps: {
          options: [
            {
              label: '前端',
              value: 'frontend',
              children: [{ label: 'React', value: 'react' }],
            },
            {
              label: '后端',
              value: 'backend',
              children: [{ label: 'Node.js', value: 'node' }],
            },
          ],
        },
      },
    ]}
  />
);
