import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@xxlabs/pro-components';
import { ProTable } from '@xxlabs/pro-components';
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
import thTHIntl from 'antd/es/locale/th_TH';
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
    renderText: () => (Math.random() * 100).toFixed(2),
  },
];

export default () => {
  const actionRef = useRef<ActionType>(undefined);
  const [intl, setIntl] = useState('zhCNIntl');
  return (
    <ConfigProvider locale={intlMap[intl as 'zhCNIntl']}>
      <ProTable<GithubIssueItem>
        actionRef={actionRef}
        columns={columns}
        dateFormatter="string"
        headerTitle={
          <Space>
            <span>Basic Table</span>
            <Select<string>
              options={Object.keys(intlMap).map((value) => ({
                value,
                label: value,
              }))}
              value={intl}
              variant="borderless"
              onChange={(value) => {
                dayjs.locale(intlMap[value as 'zhCNIntl'].locale);
                setIntl(value);
              }}
            />
          </Space>
        }
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
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            New
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
    <h4>ProTable 国际化 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>ConfigProvider</strong>: 配置提供者组件
      </li>
      <li>
        <strong>Select</strong>: 选择器组件
      </li>
      <li>
        <strong>Space</strong>: 间距组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>国际化</strong>: 展示国际化功能
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
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>rowSelection</strong>: 行选择配置
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
    <h4>国际化特点：</h4>
    <ul>
      <li>
        <strong>多语言支持</strong>: 支持多语言
      </li>
      <li>
        <strong>动态切换</strong>: 支持动态切换
      </li>
      <li>
        <strong>日期本地化</strong>: 支持日期本地化
      </li>
      <li>
        <strong>货币格式化</strong>: 支持货币格式化
      </li>
      <li>
        <strong>全局配置</strong>: 支持全局配置
      </li>
      <li>
        <strong>语言映射</strong>: 支持语言映射
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>多语言应用</strong>: 多语言应用需求
      </li>
      <li>
        <strong>国际化系统</strong>: 国际化系统
      </li>
      <li>
        <strong>本地化需求</strong>: 本地化需求
      </li>
    </ul>
  </div>;
};
