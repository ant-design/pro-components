import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Avatar, Space, Tag } from 'antd';

type ProjectItem = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'pending';
  owner: {
    name: string;
    avatar: string;
  };
  tags: string[];
  updatedAt: string;
};

const statusMap = {
  active: { text: '进行中', color: 'success' },
  archived: { text: '已归档', color: 'default' },
  pending: { text: '待启动', color: 'warning' },
};

const dataSource: ProjectItem[] = [
  {
    id: '1',
    name: 'Ant Design Pro',
    description: '开箱即用的中台前端/设计解决方案',
    status: 'active',
    owner: {
      name: '张三',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    tags: ['React', 'TypeScript', 'Ant Design'],
    updatedAt: '2024-02-09',
  },
  {
    id: '2',
    name: 'ProComponents',
    description: '专业级别的中后台组件库',
    status: 'active',
    owner: {
      name: '李四',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    tags: ['React', 'Components'],
    updatedAt: '2024-02-08',
  },
  {
    id: '3',
    name: 'UmiJS',
    description: '插件化的企业级前端应用框架',
    status: 'active',
    owner: {
      name: '王五',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    tags: ['Framework', 'React'],
    updatedAt: '2024-02-07',
  },
  {
    id: '4',
    name: 'Ant Design Mobile',
    description: '移动端设计规范和组件库',
    status: 'pending',
    owner: {
      name: '赵六',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    tags: ['Mobile', 'React'],
    updatedAt: '2024-02-06',
  },
  {
    id: '5',
    name: 'Ant Design Charts',
    description: '简单好用的 React 图表库',
    status: 'archived',
    owner: {
      name: '孙七',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
    tags: ['Charts', 'Visualization'],
    updatedAt: '2024-02-05',
  },
];

const columns: ProColumns<ProjectItem>[] = [
  {
    title: '项目名称',
    dataIndex: 'name',
    listSlot: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
    listSlot: 'description',
  },
  {
    title: '负责人',
    dataIndex: ['owner', 'avatar'],
    listSlot: 'avatar',
    render: (_, record) => (
      <Avatar src={record.owner.avatar} alt={record.owner.name} />
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    listSlot: 'subTitle',
    render: (_, record) => (
      <Tag color={statusMap[record.status].color}>
        {statusMap[record.status].text}
      </Tag>
    ),
  },
  {
    title: '标签',
    dataIndex: 'tags',
    listSlot: 'content',
    render: (_, record) => (
      <Space size={4} wrap>
        {record.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '操作',
    listSlot: 'actions',
    render: () => [
      <a key="view">查看</a>,
      <a key="edit">编辑</a>,
    ],
  },
];

export default () => (
  <ProList<ProjectItem>
    columns={columns}
    dataSource={dataSource}
    rowKey="id"
    headerTitle="项目列表"
    tooltip="这是一个基础的列表示例，展示了 ProList 的基本用法"
  />
);
