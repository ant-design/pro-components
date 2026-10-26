import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Divider } from 'antd';

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

/** 列配置 align: 'center' 让单元格内容水平居中(antd 原生列能力) */
const columns: ProColumns<Row>[] = [
  { title: '城市', dataIndex: 'city', align: 'center' },
  { title: '区域', dataIndex: 'area', align: 'center' },
  { title: '姓名', dataIndex: 'name', align: 'center' },
  { title: '金额', dataIndex: 'amount', align: 'center' },
];

/**
 * 同值单元格纵向自动合并（#9770）：
 * - 列维度：ProColumns 上配置 autoMerge: true
 * - 表维度：mergeFields 按数组顺序多级依次合并（先城市、后区域）
 * 只合并当前页内连续同值，排序、筛选、分页切换后自动重算；
 * 手动 onCell 显式返回的 rowSpan 优先于自动合并结果。
 *
 * 开启合并后表格默认启用全边框（合并区域无边框时视觉不完整），
 * 显式传入 bordered={false} 可关闭，见第三个示例。
 */
export default () => (
  <>
    <ProTable<Row>
      columns={columns.map((column) =>
        column.dataIndex === 'city' ? { ...column, autoMerge: true } : column,
      )}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
      headerTitle="列配置 autoMerge（合并时默认开启全边框）"
    />
    <Divider />
    <ProTable<Row>
      columns={columns}
      mergeFields={['city', 'area']}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
      headerTitle="mergeFields 多级合并"
    />
    <Divider />
    <ProTable<Row>
      columns={columns}
      mergeFields={['city', 'area']}
      dataSource={dataSource}
      rowKey="key"
      search={false}
      options={false}
      pagination={false}
      bordered={false}
      headerTitle="显式 bordered={false}：关闭默认全边框"
    />
  </>
);
