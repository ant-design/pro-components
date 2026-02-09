import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import dayjs from 'dayjs';

import { DEMO_VALUE_ENUM } from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  status: string | number;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
  avatar: string;
  image: string;
};

const baseTime = dayjs('2024-01-15 10:30:00').valueOf();
const tableListDataSource: TableListItem[] = Array.from(
  { length: 2 },
  (_, i) => ({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: i === 0 ? '用户认证服务' : '支付网关',
    status: DEMO_VALUE_ENUM[(i % 4) as keyof typeof DEMO_VALUE_ENUM],
    updatedAt: baseTime - (i * 500 + 100),
    createdAt: baseTime - (i * 1000 + 200),
    createdAtRange: [baseTime - (i * 1000 + 300), baseTime - (i * 1000 + 400)],
    money: ((i * 3456 + 7890) % 50000) * 100,
    progress: ((i * 17 + 23) % 100) + 1,
    percent:
      i % 2 === 0
        ? ((i + 1) * 10 + 0.123).toFixed(3)
        : -((i + 1) * 10 + 0.456).toFixed(2),
    code: `const healthCheck = async (host) => {
  const res = await fetch(host + '/health');
  return { status: res.status };
};`,
  }),
);

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: 'border 序号',
    dataIndex: 'index',
    key: 'indexBorder',
    valueType: 'indexBorder',
  },
  {
    title: '部署脚本',
    key: 'code',
    width: 120,
    dataIndex: 'code',
    valueType: 'code',
  },
  {
    title: '负责人',
    dataIndex: 'avatar',
    key: 'avatar',
    valueType: 'avatar',
    width: 150,
    render: (dom) => (
      <Space>
        <span>{dom}</span>
        <a
          href="https://github.com/chenshuai2144"
          target="_blank"
          rel="noopener noreferrer"
        >
          张伟
        </a>
      </Space>
    ),
  },
  {
    title: '架构图',
    dataIndex: 'image',
    key: 'image',
    valueType: 'image',
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="edit"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const Demo = () => (
  <ProTable<TableListItem>
    columns={columns}
    request={() => {
      return Promise.resolve({
        total: 200,
        data: tableListDataSource,
        success: true,
      });
    }}
    rowKey="key"
    headerTitle="多值类型展示"
  />
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
