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
    request={async () => {
      const names = [
        '用户认证服务',
        '订单处理中心',
        '支付网关',
        '消息推送平台',
        '日志分析引擎',
        '配置管理中心',
        '文件存储服务',
        '任务调度系统',
        '数据同步网关',
        '监控告警平台',
      ];
      return {
        data: names.map((name, i) => ({
          key: i + 1,
          name,
          createdAt: 1705286400000 - i * 86400000,
        })),
        total: names.length,
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
