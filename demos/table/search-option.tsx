import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

type Service = { id: number; name: string };

const services: Service[] = [
  { id: 1, name: '云服务套餐' },
  { id: 2, name: '企业技术支持' },
];

export default () => (
  <ProTable<Service>
    rowKey="id"
    headerTitle="自定义搜索操作"
    columns={[{ title: '服务名称', dataIndex: 'name' }]}
    pagination={false}
    request={async ({ name }) => {
      const data = services.filter((item) => !name || item.name.includes(name));
      return { data, total: data.length, success: true };
    }}
    search={{
      labelWidth: 'auto',
      optionRender: (_, formProps, dom) => [
        ...dom,
        <Button
          key="example"
          onClick={() => formProps.form?.setFieldsValue({ name: '云服务' })}
        >
          填入示例
        </Button>,
      ],
    }}
  />
);
