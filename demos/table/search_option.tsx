import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

type ServiceItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<ServiceItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '服务名称',
    dataIndex: 'name',
  },
  {
    title: '合同金额',
    dataIndex: 'title',
    width: 100,
    valueType: 'money',
    renderText: () => '128000',
  },
];

const Demo = () => (
  <ProTable<ServiceItem>
    columns={columns}
    request={async () => {
      return {
        data: [
          {
            key: 1,
            name: '企业版云服务套餐',
            createdAt: 1705286400000,
          },
        ],
        total: 1,
        success: true,
      };
    }}
    rowKey="key"
    dateFormatter="string"
    headerTitle="搜索选项自定义"
    search={{
      defaultCollapsed: false,
      labelWidth: 'auto',
      optionRender: (searchConfig, formProps, dom) => [
        ...dom.reverse(),
        <Button key="export" onClick={() => {}}>
          导出
        </Button>,
      ],
    }}
    toolBarRender={() => [
      <Button key="primary" type="primary">
        <PlusOutlined />
        新建
      </Button>,
    ]}
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
