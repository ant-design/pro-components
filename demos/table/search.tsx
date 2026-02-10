import { ProTable } from '@ant-design/pro-components';

type ServiceItem = {
  key: number;
  name: string;
  createdAt: number;
};

const SearchTable = () => (
  <ProTable<ServiceItem>
    columns={[
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
      },
      {
        title: '服务名称',
        dataIndex: 'name',
        search: false,
      },
    ]}
    request={async (params) => {
      console.log(params);
      return {
        data: [
          {
            key: 1,
            name: '用户认证服务',
            createdAt: 1705286400000,
          },
          {
            key: 2,
            name: '订单处理中心',
            createdAt: 1705200000000,
          },
          {
            key: 3,
            name: '支付网关',
            createdAt: 1705113600000,
          },
        ],
        total: 3,
        success: true,
      };
    }}
    search={false}
    rowKey="key"
    options={{
      search: true,
    }}
    headerTitle="快速搜索服务"
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <SearchTable />
  </div>
);
