import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@xxlabs/pro-components';
import { ProTable, TableDropdown } from '@xxlabs/pro-components';
import { Button, ConfigProvider, Space, Tag } from 'antd';
import arEGIntl from 'antd/es/locale/ar_EG';
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
          <Tag key={name} color={color}>
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
      <a key="link" href={record.url} rel="noopener noreferrer" target="_blank">
        رابط
      </a>,
      <a key="view" href={record.url} rel="noopener noreferrer" target="_blank">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: 'نسخ' },
          { key: 'delete', name: 'حذف' },
        ]}
        onSelect={() => action?.reload()}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>(undefined);

  return (
    <ConfigProvider direction="rtl" locale={arEGIntl}>
      <ProTable<GithubIssueItem>
        actionRef={actionRef}
        columns={columns}
        dateFormatter="string"
        headerTitle="نموذج احترافي"
        pagination={{
          pageSize: 5,
        }}
        request={async (params: Record<string, any> = {}) =>
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          })
        }
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            جديد
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
