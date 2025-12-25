import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';

type GithubIssueItem = {
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: number;
  updated_at: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
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
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
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
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
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
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
];

export default () => {
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748504,
              number: 6689,
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
              labels: [
                {
                  name: 'bug',
                  color: 'error',
                },
              ],
              state: 'open',
              locked: false,
              comments: 1,
              created_at: 1590486176000,
              updated_at: 1590487382000,
              closed_at: null,
              author_association: 'NONE',
              user: 'chenshuai2144',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          ignoreRules: false,
        }}
        dateFormatter="string"
        
      />
      <ProTable<GithubIssueItem>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748504,
              number: 6689,
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
              labels: [
                {
                  name: 'bug',
                  color: 'error',
                },
              ],
              state: 'open',
              locked: false,
              comments: 1,
              created_at: 1590486176000,
              updated_at: 1590487382000,
              closed_at: null,
              author_association: 'NONE',
              user: 'chenshuai2144',
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        
      />
    </>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 开放规则 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>Tag</strong>: 标签组件
      </li>
      <li>
        <strong>开放规则</strong>: 展示开放规则功能
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
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>form</strong>: 表单配置
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
    </ul>
    <h4>开放规则特点：</h4>
    <ul>
      <li>
        <strong>表单验证</strong>: 支持表单验证
      </li>
      <li>
        <strong>必填校验</strong>: 支持必填校验
      </li>
      <li>
        <strong>标签显示</strong>: 支持标签显示
      </li>
      <li>
        <strong>复制功能</strong>: 支持复制功能
      </li>
      <li>
        <strong>省略号显示</strong>: 支持省略号显示
      </li>
      <li>
        <strong>状态过滤</strong>: 支持状态过滤
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>表单验证</strong>: 表单验证需求
      </li>
      <li>
        <strong>数据校验</strong>: 数据校验功能
      </li>
      <li>
        <strong>规则配置</strong>: 规则配置需求
      </li>
    </ul>
  </div>;
};
