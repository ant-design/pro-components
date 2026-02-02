import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../mockData';

const { RangePicker } = DatePicker;

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const tableListDataSource = createTableDataSource({
  count: 50,
  namePrefix: 'AppName',
  withProgress: true,
  withCallNumber: true,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '调用次数',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status as 'close'],
    }),
  },
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    formItemRender: () => {
      return <RangePicker />;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '操作',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [<a key="link">链路</a>],
  },
];

const Demo = () => {
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [1],
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          console.log(selectedRowKeys, selectedRows);
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
              <span>{`容器数量: ${selectedRows.reduce(
                (pre, item) => pre + item.containers,
                0,
              )} 个`}</span>
              <span>{`调用量: ${selectedRows.reduce(
                (pre, item) => pre + item.callNumber,
                0,
              )} 次`}</span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          );
        }}
        dataSource={tableListDataSource}
        scroll={{ x: 1300 }}
        options={false}
        search={false}
        pagination={{
          pageSize: 5,
        }}
        rowKey="key"
        headerTitle="批量操作"
        toolBarRender={() => [<Button key="show">查看日志</Button>]}
      />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 批量操作 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>批量操作</strong>: 展示批量操作功能
          </li>
        </ul>
        <h4>ProTable 配置：</h4>
        <ul>
          <li>
            <strong>columns</strong>: 列配置
          </li>
          <li>
            <strong>rowSelection</strong>: 行选择配置
          </li>
          <li>
            <strong>tableAlertRender</strong>: 表格提醒渲染函数
          </li>
          <li>
            <strong>tableAlertOptionRender</strong>: 表格提醒操作渲染函数
          </li>
          <li>
            <strong>dataSource</strong>: 数据源
          </li>
          <li>
            <strong>scroll</strong>: 滚动配置
          </li>
          <li>
            <strong>pagination</strong>: 分页配置
          </li>
          <li>
            <strong>headerTitle</strong>: 表格标题
          </li>
          <li>
            <strong>toolBarRender</strong>: 工具栏渲染函数
          </li>
        </ul>
        <h4>批量操作特点：</h4>
        <ul>
          <li>
            <strong>行选择</strong>: 支持行选择功能
          </li>
          <li>
            <strong>批量提醒</strong>: 支持批量提醒
          </li>
          <li>
            <strong>批量操作</strong>: 支持批量操作
          </li>
          <li>
            <strong>统计信息</strong>: 支持统计信息展示
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据管理</strong>: 数据管理系统
          </li>
          <li>
            <strong>批量处理</strong>: 批量处理需求
          </li>
          <li>
            <strong>操作确认</strong>: 操作确认功能
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
