import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, Select, Space } from 'antd';
import caESIntl from 'antd/es/locale/ca_ES';
import enGBIntl from 'antd/es/locale/en_GB';
import enUSIntl from 'antd/es/locale/en_US';
import esESIntl from 'antd/es/locale/es_ES';
import frFRIntl from 'antd/es/locale/fr_FR';
import itITIntl from 'antd/es/locale/it_IT';
import jaJPIntl from 'antd/es/locale/ja_JP';
import msMYIntl from 'antd/es/locale/ms_MY';
import ptBRIntl from 'antd/es/locale/pt_BR';
import ruRUIntl from 'antd/es/locale/ru_RU';
import srRSIntl from 'antd/es/locale/sr_RS';
import viVNIntl from 'antd/es/locale/vi_VN';
import zhCNIntl from 'antd/es/locale/zh_CN';
import zhTWIntl from 'antd/es/locale/zh_TW';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const intlMap = {
  zhCNIntl,
  enUSIntl,
  enGBIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  srRSIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
};

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    order: 1,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
  {
    title: 'Created Time',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [intl, setIntl] = useState('zhCNIntl');
  return (
    <ConfigProvider locale={intlMap[intl]}>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
        rowSelection={{}}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle={
          <Space>
            <span>Basic Table</span>
            <Select<string>
              bordered={false}
              value={intl}
              onChange={(value) => {
                dayjs.locale(intlMap[value].locale);
                setIntl(value);
              }}
              options={Object.keys(intlMap).map((value) => ({ value, label: value }))}
            />
          </Space>
        }
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            New
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};
