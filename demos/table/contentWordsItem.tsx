import { ProColumns, ProTable } from '@ant-design/pro-components';

type ContentWordsItem = {
  id: string;
  problemCause: string;
};

const getData = () => {
  const arr = Array.from({ length: 100 }).map((_, idx) => ({
    id: (idx + 1).toString(),
    problemCause: 'problemCause',
  }));
  return arr;
};

export default () => {
  const columns: ProColumns<ContentWordsItem>[] = [
    {
      disable: true,
      title: '问题标注',
      dataIndex: 'problemCause',
      editable: false,
      onFilter: false,
      ellipsis: true,
      search: true,
      valueType: 'select',
      width: 180,
    },
  ];

  return (
    <div>
      <ProTable<ContentWordsItem>
        rowKey="id"
        columns={columns}
        request={async () => {
          const data = getData();
          return {
            data: data,
            total: data.length,
            success: true,
          };
        }}
      />
    </div>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 内容词项 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>内容词项</strong>: 展示内容词项功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
    </ul>
    <h4>列配置特点：</h4>
    <ul>
      <li>
        <strong>disable</strong>: 禁用状态
      </li>
      <li>
        <strong>title</strong>: 列标题
      </li>
      <li>
        <strong>dataIndex</strong>: 数据索引
      </li>
      <li>
        <strong>editable</strong>: 可编辑状态
      </li>
      <li>
        <strong>onFilter</strong>: 过滤功能
      </li>
      <li>
        <strong>ellipsis</strong>: 省略号显示
      </li>
      <li>
        <strong>search</strong>: 搜索功能
      </li>
      <li>
        <strong>valueType</strong>: 值类型
      </li>
      <li>
        <strong>width</strong>: 列宽度
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>内容管理</strong>: 内容管理系统
      </li>
      <li>
        <strong>词汇标注</strong>: 词汇标注功能
      </li>
      <li>
        <strong>数据展示</strong>: 数据展示需求
      </li>
    </ul>
  </div>;
};
