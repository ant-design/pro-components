import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import dayjs from 'dayjs';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

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
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: `TradeCode ${i}`,
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    updatedAt:
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 1000),
    createdAt:
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
      dayjs('2019-11-16 12:50:26').valueOf() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

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
    title: '代码',
    key: 'code',
    width: 120,
    dataIndex: 'code',
    valueType: 'code',
  },
  {
    title: '头像',
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
          chenshuai2144
        </a>
      </Space>
    ),
  },
  {
    title: '图片',
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
        key="a"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => (
  <>
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
      
    />
    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>ProTable 值类型 Props 说明：</h4>
      <ul>
        <li>
          <strong>ProTable</strong>: 专业表格组件
        </li>
        <li>
          <strong>Space</strong>: 间距组件
        </li>
        <li>
          <strong>值类型</strong>: 展示值类型功能
        </li>
      </ul>
      <h4>ProTable 配置：</h4>
      <ul>
        <li>
          <strong>columns</strong>: 列配置
        </li>
        <li>
          <strong>request</strong>: 请求函数
        </li>
        <li>
          <strong>rowKey</strong>: 行键
        </li>
        <li>
          <strong>headerTitle</strong>: 表格标题
        </li>
      </ul>
      <h4>值类型特点：</h4>
      <ul>
        <li>
          <strong>序号</strong>: 支持序号
        </li>
        <li>
          <strong>边框序号</strong>: 支持边框序号
        </li>
        <li>
          <strong>代码</strong>: 支持代码
        </li>
        <li>
          <strong>头像</strong>: 支持头像
        </li>
        <li>
          <strong>图片</strong>: 支持图片
        </li>
        <li>
          <strong>自定义渲染</strong>: 支持自定义渲染
        </li>
      </ul>
      <h4>使用场景：</h4>
      <ul>
        <li>
          <strong>样式展示</strong>: 样式展示需求
        </li>
        <li>
          <strong>多媒体</strong>: 多媒体展示
        </li>
        <li>
          <strong>用户信息</strong>: 用户信息展示
        </li>
      </ul>
    </div>
  </>
);
