import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, ConfigProvider, Space, Tag } from 'antd';
import arEGIntl from 'antd/lib/locale/ar_EG';
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
    title: 'العنوان',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: 'سيتم تقليص العنوان في حال كان طويل جدًا',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'هذا الحقل مطلوب',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: 'الحالة',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: 'الكل', status: 'Default' },
      open: {
        text: 'غير محلولة',
        status: 'Error',
      },
      closed: {
        text: 'تم حلها',
        status: 'Success',
      },
      processing: {
        text: 'نعمل عليها',
        status: 'Processing',
      },
    },
  },
  {
    title: 'التسمية',
    dataIndex: 'labels',
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
    title: 'التشغيل',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="link">
        رابط
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: 'نسخ' },
          { key: 'delete', name: 'حذف' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ConfigProvider locale={arEGIntl} direction="rtl">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {} as Record<string, any>) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="نموذج احترافي"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            جديد
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
    <h4>ProTable RTL 表格 Props 说明：</h4>
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
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>Tag</strong>: 标签组件
      </li>
      <li>
        <strong>RTL表格</strong>: 展示RTL表格功能
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
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>search</strong>: 搜索配置
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
    <h4>RTL表格特点：</h4>
    <ul>
      <li>
        <strong>RTL支持</strong>: 支持RTL布局
      </li>
      <li>
        <strong>阿拉伯语</strong>: 支持阿拉伯语
      </li>
      <li>
        <strong>国际化</strong>: 支持国际化
      </li>
      <li>
        <strong>方向控制</strong>: 支持方向控制
      </li>
      <li>
        <strong>本地化</strong>: 支持本地化
      </li>
      <li>
        <strong>多语言</strong>: 支持多语言
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>阿拉伯语应用</strong>: 阿拉伯语应用需求
      </li>
      <li>
        <strong>RTL布局</strong>: RTL布局需求
      </li>
      <li>
        <strong>国际化系统</strong>: 国际化系统
      </li>
    </ul>
  </div>;
};
