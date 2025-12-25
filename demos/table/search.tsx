import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'name',
    search: false,
  },
];

const SearchTable = () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async (params) => {
      console.log(params);
      return {
        data: [
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ],
        success: true,
      };
    }}
    search={false}
    rowKey="key"
    options={{
      search: true,
    }}
    headerTitle="toolbar 中搜索"
  />
);

const SearchTableWithDocs = () => {
  return (
    <>
      {SearchTable()}
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 搜索 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>搜索</strong>: 展示搜索功能
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
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>rowKey</strong>: 行键
          </li>
          <li>
            <strong>options</strong>: 选项配置
          </li>
          <li>
            <strong>headerTitle</strong>: 表格标题
          </li>
        </ul>
        <h4>搜索特点：</h4>
        <ul>
          <li>
            <strong>工具栏搜索</strong>: 支持工具栏搜索
          </li>
          <li>
            <strong>禁用表单搜索</strong>: 支持禁用表单搜索
          </li>
          <li>
            <strong>序号显示</strong>: 支持序号显示
          </li>
          <li>
            <strong>搜索配置</strong>: 支持搜索配置
          </li>
          <li>
            <strong>简洁界面</strong>: 支持简洁界面
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>快速搜索</strong>: 快速搜索需求
          </li>
          <li>
            <strong>简单查询</strong>: 简单查询功能
          </li>
          <li>
            <strong>工具栏集成</strong>: 工具栏集成需求
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchTableWithDocs;
