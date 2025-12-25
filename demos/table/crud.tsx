import { PlusOutlined } from '@ant-design/icons';
import type {
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Space, Tabs, Tag, message } from 'antd';
import { useState } from 'react';
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
    title: '序号',
    dataIndex: 'index',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueType: 'select',
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
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    hideInTable: true,
    hideInDescriptions: true,
    dataIndex: 'direction',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 120,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row) => [
      <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        key="more"
        onSelect={(key) => message.info(key)}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const Demo = () => {
  const [type, setType] = useState('table');
  return (
    <ProCard>
      <Tabs
        activeKey={type}
        onChange={(e) => setType(e)}
        items={[
          { key: 'table', label: 'table' },
          { key: 'form', label: 'form' },
          { key: 'descriptions', label: 'descriptions' },
        ]}
      />
      {['table', 'form'].includes(type) && (
        <ProTable<GithubIssueItem>
          columns={columns}
          type={type as 'table'}
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
          dateFormatter="string"
          headerTitle="查询 Table"
          toolBarRender={() => [
            <Button key="3" type="primary">
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
      )}
      {type === 'descriptions' && (
        <ProDescriptions
          style={{
            background: '#fff',
          }}
          columns={columns as ProDescriptionsItemProps<GithubIssueItem>[]}
          request={async (params) => {
            const msg = await request<{
              data: GithubIssueItem[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            });
            return {
              ...msg,
              data: msg?.data[0],
            };
          }}
        />
      )}
    </ProCard>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable CRUD Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>ProCard</strong>: 专业卡片组件
      </li>
      <li>
        <strong>ProDescriptions</strong>: 专业描述组件
      </li>
      <li>
        <strong>TableDropdown</strong>: 表格下拉菜单组件
      </li>
      <li>
        <strong>Tabs</strong>: 标签页组件
      </li>
      <li>
        <strong>CRUD操作</strong>: 展示增删改查功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>type</strong>: 表格类型
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
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
    </ul>
    <h4>CRUD特点：</h4>
    <ul>
      <li>
        <strong>多视图切换</strong>: 支持表格、表单、描述视图
      </li>
      <li>
        <strong>动态列配置</strong>: 支持动态列配置
      </li>
      <li>
        <strong>标签过滤</strong>: 支持标签过滤
      </li>
      <li>
        <strong>状态管理</strong>: 支持状态管理
      </li>
      <li>
        <strong>操作集成</strong>: 支持操作集成
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>数据管理</strong>: 数据管理系统
      </li>
      <li>
        <strong>内容管理</strong>: 内容管理平台
      </li>
      <li>
        <strong>后台管理</strong>: 后台管理系统
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
