import type { ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';

const HeartSvg = () => (
  <svg fill="currentColor" height="1em" viewBox="0 0 1024 1024" width="1em">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

export type TableListItem = {
  id: number;
  name: string;
  lastName: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    id: i,
    name: `John ${i}`,
    lastName: `Doe ${i}`,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: 'User First Name',
    dataIndex: 'name',
  },
  {
    title: 'User Last Name',
    dataIndex: 'surname',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      options={{
        search: true,
        setting: {
          children: <HeartSvg />,
        },
      }}
      request={() => Promise.resolve(tableListDataSource)}
      rowKey="id"
      search={false}
    />
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 列设置自定义图标 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>列设置自定义图标</strong>: 展示列设置自定义图标功能
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
        <strong>options</strong>: 选项配置
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
    </ul>
    <h4>列设置自定义图标特点：</h4>
    <ul>
      <li>
        <strong>自定义图标</strong>: 支持自定义图标
      </li>
      <li>
        <strong>列设置</strong>: 支持列设置功能
      </li>
      <li>
        <strong>搜索功能</strong>: 支持搜索功能
      </li>
      <li>
        <strong>SVG图标</strong>: 支持SVG图标
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>界面定制</strong>: 界面定制需求
      </li>
      <li>
        <strong>用户体验</strong>: 用户体验优化
      </li>
      <li>
        <strong>品牌展示</strong>: 品牌展示需求
      </li>
    </ul>
  </div>;
};
