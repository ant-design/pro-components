import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, Select, Space } from 'antd';
import caESIntl from 'antd/locale/ca_ES';
import enGBIntl from 'antd/locale/en_GB';
import enUSIntl from 'antd/locale/en_US';
import esESIntl from 'antd/locale/es_ES';
import frFRIntl from 'antd/locale/fr_FR';
import itITIntl from 'antd/locale/it_IT';
import jaJPIntl from 'antd/locale/ja_JP';
import msMYIntl from 'antd/locale/ms_MY';
import ptBRIntl from 'antd/locale/pt_BR';
import ruRUIntl from 'antd/locale/ru_RU';
import srRSIntl from 'antd/locale/sr_RS';
import thTHIntl from 'antd/locale/th_TH';
import viVNIntl from 'antd/locale/vi_VN';
import zhCNIntl from 'antd/locale/zh_CN';
import zhTWIntl from 'antd/locale/zh_TW';
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
  thTHIntl,
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
    renderText: () => '128000',
  },
];

const Demo = () => {
  const actionRef = useRef<ActionType>();
  const [intl, setIntl] = useState('zhCNIntl');
  return (
    <ConfigProvider locale={intlMap[intl as 'zhCNIntl']}>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: '企业版云服务套餐',
                createdAt: 1705286400000,
              },
            ],
            total: 1,
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
            <span>国际化示例</span>
            <Select<string>
              variant="borderless"
              value={intl}
              onChange={(value) => {
                dayjs.locale(intlMap[value as 'zhCNIntl'].locale);
                setIntl(value);
              }}
              options={Object.keys(intlMap).map((value) => ({
                value,
                label: value,
              }))}
            />
          </Space>
        }
        toolBarRender={() => [
          <Button key="new" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
