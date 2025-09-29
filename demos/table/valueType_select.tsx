import type { ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';

const cascaderOptions = [
  {
    field: 'front end',
    value: 'fe',
    language: [
      {
        field: 'Javascript',
        value: 'js',
      },
      {
        field: 'Typescript',
        value: 'ts',
      },
    ],
  },
  {
    field: 'back end',
    value: 'be',
    language: [
      {
        field: 'Java',
        value: 'java',
      },
      {
        field: 'Go',
        value: 'go',
      },
    ],
  },
];

const valueEnumMap = {
  0: 'running',
  1: 'online',
  2: 'error',
};

export type TableListItem = {
  key: number;
  status: string | number;
  cascader: string[];
  treeSelect: string[];
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    status: valueEnumMap[((Math.floor(Math.random() * 10) % 3) + '') as '0'],
    cascader: ['fe', 'js'],
    treeSelect: ['fe', 'js'],
  });
}

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '状态',
    valueType: 'select',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueEnum,
  },
  {
    title: '单选状态',
    dataIndex: 'status',
    valueType: 'radio',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    title: '单选按钮状态',
    dataIndex: 'status',
    valueType: 'radioButton',
    initialValue: 'all',
    width: 100,
    valueEnum,
  },
  {
    title: '多选状态',
    dataIndex: 'status',
    initialValue: ['all'],
    width: 100,
    valueType: 'checkbox',
    valueEnum,
  },
  {
    title: '级联选择器',
    key: 'cascader',
    dataIndex: 'cascader',
    width: 100,
    fieldProps: {
      options: cascaderOptions,
      fieldNames: {
        children: 'language',
        label: 'field',
      },
    },
    valueType: 'cascader',
  },
  {
    title: '树形下拉框',
    key: 'treeSelect',
    dataIndex: 'treeSelect',
    width: 100,
    // request: async () => cascaderOptions,
    fieldProps: {
      options: cascaderOptions,
      fieldNames: {
        children: 'language',
        label: 'field',
      },
      showSearch: true,
      filterTreeNode: true,
      multiple: true,
      treeNodeFilterProp: 'field',
    },
    valueType: 'treeSelect',
  },
  {
    title: '时间范围',
    key: 'dateTimeRange',
    dataIndex: 'dateTimeRange',
    hideInTable: true,
    valueType: 'dateTimeRange',
    fieldProps: {
      // placeholder: []
    },
    formItemRender: (_, { type, defaultRender }) => {
      if (type === 'form') {
        return null;
      }

      return defaultRender(_);
    },
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
      editable={{
        type: 'multiple',
      }}
      headerTitle="样式类"
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      search={{
        defaultCollapsed: false,
        span: 12,
        labelWidth: 'auto',
      }}
    />
    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>ProTable 值类型选择 Props 说明：</h4>
      <ul>
        <li>
          <strong>ProTable</strong>: 专业表格组件
        </li>
        <li>
          <strong>值类型选择</strong>: 展示值类型选择功能
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
          <strong>editable</strong>: 可编辑配置
        </li>
        <li>
          <strong>rowKey</strong>: 行键
        </li>
        <li>
          <strong>headerTitle</strong>: 表格标题
        </li>
      </ul>
      <h4>值类型选择特点：</h4>
      <ul>
        <li>
          <strong>选择器</strong>: 支持选择器
        </li>
        <li>
          <strong>单选按钮</strong>: 支持单选按钮
        </li>
        <li>
          <strong>多选框</strong>: 支持多选框
        </li>
        <li>
          <strong>级联选择</strong>: 支持级联选择
        </li>
        <li>
          <strong>树形选择</strong>: 支持树形选择
        </li>
        <li>
          <strong>时间范围</strong>: 支持时间范围
        </li>
        <li>
          <strong>多行编辑</strong>: 支持多行编辑
        </li>
      </ul>
      <h4>使用场景：</h4>
      <ul>
        <li>
          <strong>表单选择</strong>: 表单选择需求
        </li>
        <li>
          <strong>数据筛选</strong>: 数据筛选功能
        </li>
        <li>
          <strong>复杂选择</strong>: 复杂选择需求
        </li>
      </ul>
    </div>
  </>
);
