import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Dropdown, Popconfirm, Space } from 'antd';
import React from 'react';

export type Member = {
  avatar: string;
  realName: string;
  nickName: string;
  email: string;
  outUserNo: string;
  phone: string;
  role: RoleType;
  permission?: string[];
};

export type RoleMapType = Record<
  string,
  {
    name: string;
    desc: string;
  }
>;

export type RoleType = 'admin' | 'operator';

const RoleMap: RoleMapType = {
  admin: {
    name: '管理员',
    desc: '仅拥有指定项目的权限',
  },
  operator: {
    name: '操作员',
    desc: '拥有所有权限',
  },
};

const tableListDataSource: Member[] = [];

const realNames = ['马巴巴', '测试', '测试2', '测试3'];
const nickNames = ['巴巴', '测试', '测试2', '测试3'];
const emails = [
  'baba@antfin.com',
  'test@antfin.com',
  'test2@antfin.com',
  'test3@antfin.com',
];
const phones = ['12345678910', '10923456789', '109654446789', '109223346789'];
const permissions = [[], ['权限点名称1', '权限点名称4'], ['权限点名称1'], []];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    outUserNo: `${102047 + i}`,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    role: i === 0 ? 'admin' : 'operator',
    realName: realNames[i % 4],
    nickName: nickNames[i % 4],
    email: emails[i % 4],
    phone: phones[i % 4],
    permission: permissions[i % 4],
  });
}

const MemberList: React.FC = () => {
  const renderRemoveUser = (text: string) => (
    <Popconfirm
      key="popconfirm"
      title={`确认${text}吗?`}
      okText="是"
      cancelText="否"
    >
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<Member>[] = [
    {
      dataIndex: 'avatar',
      title: '成员名称',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
          {record.nickName}
        </Space>
      ),
    },
    {
      dataIndex: 'email',
      title: '账号',
    },
    {
      dataIndex: 'role',
      title: '角色',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: '管理员',
                key: 'admin',
              },
              {
                label: '操作员',
                key: 'operator',
              },
            ],
          }}
        >
          <a>
            {RoleMap[record.role || 'admin'].name} <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
    {
      dataIndex: 'permission',
      title: '权限范围',
      render: (_, record) => {
        const { role, permission = [] } = record;
        if (role === 'admin') {
          return '所有权限';
        }
        return permission && permission.length > 0
          ? permission.join('、')
          : '无';
      },
    },
    {
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        let node = renderRemoveUser('退出');
        if (record.role === 'admin') {
          node = renderRemoveUser('移除');
        }
        return [<a key="edit">编辑</a>, node];
      },
    },
  ];

  return (
    <ProTable<Member>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        });
      }}
      rowKey="outUserNo"
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={false}
      search={false}
    />
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 无标题 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Dropdown</strong>: 下拉菜单组件
      </li>
      <li>
        <strong>Popconfirm</strong>: 气泡确认框组件
      </li>
      <li>
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>无标题</strong>: 展示无标题功能
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
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
    </ul>
    <h4>无标题特点：</h4>
    <ul>
      <li>
        <strong>头像显示</strong>: 支持头像显示
      </li>
      <li>
        <strong>角色管理</strong>: 支持角色管理
      </li>
      <li>
        <strong>权限控制</strong>: 支持权限控制
      </li>
      <li>
        <strong>下拉菜单</strong>: 支持下拉菜单
      </li>
      <li>
        <strong>确认操作</strong>: 支持确认操作
      </li>
      <li>
        <strong>简洁布局</strong>: 支持简洁布局
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>成员管理</strong>: 成员管理系统
      </li>
      <li>
        <strong>权限管理</strong>: 权限管理功能
      </li>
      <li>
        <strong>用户列表</strong>: 用户列表展示
      </li>
    </ul>
  </div>;
};

export default () => (
  <div style={{ padding: 24 }}>
    <MemberList />
  </div>
);
