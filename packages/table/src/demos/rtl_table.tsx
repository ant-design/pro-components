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
    tip: 'سيتم تقليص العنوان في حال كان طويل جدًا',
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
};
