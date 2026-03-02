import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, ConfigProvider, Dropdown, Space, Tag, theme } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

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

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    formItemRender: (_, { defaultRender }) => {
      return defaultRender(_);
    },
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
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
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
  const actionRef = useRef<ActionType>(undefined);
  const themeConfig = {
    token: {
      colorPrimary: 'red',
      borderRadius: 4,
    },
    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  };
  return (
    <div
      style={{
        backgroundColor: 'hsl(218,22%,7%)',
      }}
    >
      <ConfigProvider theme={themeConfig}>
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params, sort, filter) => {
            console.log(sort, filter);
            return request<{
              data: GithubIssueItem[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            });
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="高级表格"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
            <Dropdown
              key="menu"
              menu={{
                items: [
                  {
                    label: '1st item',
                    key: '1',
                  },
                  {
                    label: '2nd item',
                    key: '2',
                  },
                  {
                    label: '3rd item',
                    key: '3',
                  },
                ],
              }}
            >
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ]}
        />
      </ConfigProvider>
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
    <h4>ProTable 主题 Props 说明：</h4>
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
        <strong>Dropdown</strong>: 下拉菜单组件
      </li>
      <li>
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>Tag</strong>: 标签组件
      </li>
      <li>
        <strong>theme</strong>: 主题配置
      </li>
      <li>
        <strong>主题</strong>: 展示主题功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>actionRef</strong>: 操作引用
      </li>
      <li>
        <strong>cardBordered</strong>: 卡片边框
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>editable</strong>: 可编辑配置
      </li>
      <li>
        <strong>columnsState</strong>: 列状态配置
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>options</strong>: 选项配置
      </li>
      <li>
        <strong>form</strong>: 表单配置
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
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
    </ul>
    <h4>主题特点：</h4>
    <ul>
      <li>
        <strong>暗色主题</strong>: 支持暗色主题
      </li>
      <li>
        <strong>紧凑算法</strong>: 支持紧凑算法
      </li>
      <li>
        <strong>自定义颜色</strong>: 支持自定义颜色
      </li>
      <li>
        <strong>主题配置</strong>: 支持主题配置
      </li>
      <li>
        <strong>算法组合</strong>: 支持算法组合
      </li>
      <li>
        <strong>背景色</strong>: 支持背景色
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>主题定制</strong>: 主题定制需求
      </li>
      <li>
        <strong>暗色模式</strong>: 暗色模式应用
      </li>
      <li>
        <strong>品牌定制</strong>: 品牌定制需求
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
