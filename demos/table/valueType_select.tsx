import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Radio, Space } from 'antd';
import { useState } from 'react';

/** 服务状态枚举 */
const statusEnum = {
  all: { text: '全部', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
};

/** 优先级枚举 */
const priorityEnum = {
  urgent: { text: '紧急', status: 'Error' },
  high: { text: '高', status: 'Warning' },
  medium: { text: '中', status: 'Processing' },
  low: { text: '低', status: 'Default' },
};

/** 技术栈级联选项 */
const techStackOptions = [
  {
    label: '前端',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
    ],
  },
  {
    label: '后端',
    value: 'backend',
    children: [
      { label: 'Java', value: 'java' },
      { label: 'Go', value: 'go' },
      { label: 'Node.js', value: 'nodejs' },
    ],
  },
  {
    label: '基础设施',
    value: 'infra',
    children: [
      { label: 'Kubernetes', value: 'k8s' },
      { label: 'Docker', value: 'docker' },
      { label: 'Terraform', value: 'terraform' },
    ],
  },
];

/** 部门树形选项 */
const departmentOptions = [
  {
    label: '技术研发部',
    value: 'tech',
    children: [
      { label: '前端开发组', value: 'tech-fe' },
      { label: '后端开发组', value: 'tech-be' },
      { label: '测试保障组', value: 'tech-qa' },
    ],
  },
  {
    label: '产品设计部',
    value: 'product',
    children: [
      { label: '产品策划组', value: 'product-pm' },
      { label: 'UX 设计组', value: 'product-ux' },
    ],
  },
];

type ValueTypeKey =
  | 'select'
  | 'radio'
  | 'radioButton'
  | 'checkbox'
  | 'cascader'
  | 'treeSelect';

const VALUE_TYPE_OPTIONS: { label: string; value: ValueTypeKey }[] = [
  { label: '下拉选择 select', value: 'select' },
  { label: '单选 radio', value: 'radio' },
  { label: '单选按钮 radioButton', value: 'radioButton' },
  { label: '多选 checkbox', value: 'checkbox' },
  { label: '级联 cascader', value: 'cascader' },
  { label: '树形 treeSelect', value: 'treeSelect' },
];

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  priority: string;
  techStack: string[];
  department: string[];
};

const tableListDataSource: TableListItem[] = [
  {
    key: 0,
    name: '用户认证服务',
    status: 'running',
    priority: 'high',
    techStack: ['frontend', 'react'],
    department: ['tech-fe'],
  },
  {
    key: 1,
    name: '订单处理中心',
    status: 'online',
    priority: 'urgent',
    techStack: ['backend', 'java'],
    department: ['tech-be'],
  },
  {
    key: 2,
    name: '支付网关',
    status: 'error',
    priority: 'medium',
    techStack: ['backend', 'go'],
    department: ['tech-be'],
  },
];

const Demo = () => {
  const [statusType, setStatusType] = useState<ValueTypeKey>('select');

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '应用名称',
      dataIndex: 'name',
      width: 140,
      search: false,
    },
    {
      title: `状态（${VALUE_TYPE_OPTIONS.find((o) => o.value === statusType)?.label}）`,
      dataIndex: 'status',
      valueType: statusType,
      initialValue: statusType === 'checkbox' ? ['all'] : 'all',
      width: 160,
      valueEnum: statusEnum,
    },
    {
      title: '优先级（select）',
      dataIndex: 'priority',
      valueType: 'select',
      width: 120,
      valueEnum: priorityEnum,
    },
    {
      title: '技术栈（cascader）',
      key: 'techStack',
      dataIndex: 'techStack',
      width: 160,
      valueType: 'cascader',
      fieldProps: {
        options: techStackOptions,
      },
    },
    {
      title: '所属部门（treeSelect）',
      key: 'department',
      dataIndex: 'department',
      width: 180,
      valueType: 'treeSelect',
      fieldProps: {
        options: departmentOptions,
        showSearch: true,
        filterTreeNode: true,
        multiple: true,
        treeNodeFilterProp: 'label',
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
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

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        });
      }}
      search={{
        defaultCollapsed: false,
        span: 12,
        labelWidth: 'auto',
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="key"
      headerTitle="枚举类型 valueType 切换"
      toolBarRender={() => [
        <Space key="switch">
          <span>状态列类型：</span>
          <Radio.Group
            optionType="button"
            size="small"
            value={statusType}
            onChange={(e) => setStatusType(e.target.value)}
            options={VALUE_TYPE_OPTIONS}
          />
        </Space>,
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
