import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, ConfigProvider, Input, Space, Tag } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const nestedColumns = [
  {
    title: 'col without dataIndex',
    key: 'expand',
  },
  {
    title: 'normal col',
    dataIndex: 'key',
  },
];

const nestedData = [
  {
    key: 1,
    children: [
      {
        key: 11,
      },
    ],
  },
];

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    fixed: 'left',
    order: 1,
    copyable: true,
    ellipsis: true,
    hideInForm: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    copyable: true,
    ellipsis: true,
    onFilter: true,
    valueType: 'select',
    order: 2,
    fieldProps: {
      noStyle: true,
    },
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
    width: '10%',
  },
  {
    title: '动态表单',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    formItemProps: {
      noStyle: true,
    },
    ignoreFormItem: true,
    formItemRender: () => {
      return <Input />;
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: '10%',
    order: -1,
    colSize: 1.5,
    formItemProps: {
      noStyle: true,
    },
    formItemRender: (_, { defaultRender }) => defaultRender(_),
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'date',
    width: '20%',
    copyable: true,
    ellipsis: true,
    render: (value) => {
      return {
        children: value,
        props: { colSpan: 2 },
      };
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    // @ts-ignore
    valueType: () => undefined,
    width: '20%',
  },
  {
    title: '操作',
    valueType: 'option',
    fixed: 'right',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const Demo = () => {
  const actionRef = useRef<ActionType>();
  const staticTableActionRef = useRef<ActionType>();

  return (
    <ConfigProvider prefixCls="canvas">
      <ProTable<GithubIssueItem>
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        actionRef={actionRef}
        request={async () => ({
          data: [],
        })}
        type="form"
        rowKey="id"
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <ProTable columns={nestedColumns} dataSource={nestedData} />
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={staticTableActionRef}
        dataSource={[
          {
            id: 624748504,
            number: 6689,
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            state: 'open',
            comments: 1,
            created_at: '2020-05-26T09:42:56Z',
            updated_at: '2020-05-26T10:03:02Z',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          },
          {
            id: 624691229,
            number: 6688,
            title: '🐛 [BUG]无法创建工程npm create umi',
            labels: [{ name: 'bug', color: 'error' }],
            state: 'open',
            comments: 0,
            created_at: '2020-05-26T08:19:22Z',
            updated_at: '2020-05-26T08:19:22Z',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          },
          {
            id: 624674790,
            number: 6685,
            title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
            labels: [{ name: 'question', color: 'success' }],
            state: 'open',
            comments: 0,
            created_at: '2020-05-26T07:54:25Z',
            updated_at: '2020-05-26T07:54:25Z',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </ConfigProvider>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 单表格测试 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>TableDropdown</strong>: 表格下拉菜单组件
      </li>
      <li>
        <strong>ConfigProvider</strong>: 配置提供者组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>Input</strong>: 输入框组件
      </li>
      <li>
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>Tag</strong>: 标签组件
      </li>
      <li>
        <strong>单表格测试</strong>: 展示单表格测试功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>actionRef</strong>: 操作引用
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>type</strong>: 表格类型
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
      <li>
        <strong>dataSource</strong>: 数据源
      </li>
    </ul>
    <h4>单表格测试特点：</h4>
    <ul>
      <li>
        <strong>表单模式</strong>: 支持表单模式
      </li>
      <li>
        <strong>嵌套表格</strong>: 支持嵌套表格
      </li>
      <li>
        <strong>静态数据</strong>: 支持静态数据
      </li>
      <li>
        <strong>动态表单</strong>: 支持动态表单
      </li>
      <li>
        <strong>固定列</strong>: 支持固定列
      </li>
      <li>
        <strong>自定义渲染</strong>: 支持自定义渲染
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>测试验证</strong>: 测试验证需求
      </li>
      <li>
        <strong>复杂表单</strong>: 复杂表单功能
      </li>
      <li>
        <strong>开发调试</strong>: 开发调试工具
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
