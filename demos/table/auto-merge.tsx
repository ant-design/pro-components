import { ProTable } from '@ant-design/pro-components';

type Row = {
  key: string;
  city: string;
  area: string;
  name: string;
  amount: number;
};

const dataSource: Row[] = [
  { key: '1', city: '上海', area: '浦东', name: '张三', amount: 100 },
  { key: '2', city: '上海', area: '浦东', name: '李四', amount: 200 },
  { key: '3', city: '上海', area: '闵行', name: '赵六', amount: 150 },
  { key: '4', city: '北京', area: '海淀', name: '王五', amount: 300 },
  { key: '5', city: '北京', area: '朝阳', name: '孙七', amount: 260 },
];

/**
 * 同值单元格纵向自动合并（#9770）：
 * - 列维度：ProColumns 上配置 autoMerge: true
 * - 表维度：mergeFields 按数组顺序多级依次合并（先城市、后区域）
 * 只合并当前页内连续同值，排序、筛选、分页切换后自动重算；
 * 手动 onCell 显式返回的 rowSpan 优先于自动合并结果。
 */
export default () => (
  <>
    <ProTable<Row>
      columns={[
        { title: '城市', dataIndex: 'city', autoMerge: true },
        { title: '区域', dataIndex: 'area' },
        { title: '姓名', dataIndex: 'name' },
        { title: '金额', dataIndex: 'amount' },
      ]}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
      headerTitle="列配置 autoMerge"
    />
    <ProTable<Row>
      columns={[
        { title: '城市', dataIndex: 'city' },
        { title: '区域', dataIndex: 'area' },
        { title: '姓名', dataIndex: 'name' },
        { title: '金额', dataIndex: 'amount' },
      ]}
      mergeFields={['city', 'area']}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
      headerTitle="mergeFields 多级合并"
    />
  </>
);
