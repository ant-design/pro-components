import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
  status: number;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

const valueEnum = {
  all: { text: '全部' },
  付小小: { text: '付小小' },
  曲丽丽: { text: '曲丽丽' },
  林东东: { text: '林东东' },
  陈帅帅: { text: '陈帅帅' },
  兼某某: { text: '兼某某' },
};

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    status: Math.floor(Math.random() * 2),
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columnsMap: Record<string, ProColumns<TableListItem>[]> = {
  tab1: [
    {
      title: '名称',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      key: 'status1',
      dataIndex: 'status',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: '成功',
            value: 1,
          },
          {
            label: '失败',
            value: 0,
          },
        ]),
    },
    {
      title: '容器数量',
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 120,
      render: () => [
        <a key="link">链路</a>,
        <a key="warn">报警</a>,
        <a key="more">
          <EllipsisOutlined />
        </a>,
      ],
    },
  ],
  tab2: [
    {
      title: '应用名称',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      key: 'status2',
      dataIndex: 'status',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: '启用',
            value: 1,
          },
          {
            label: '停用',
            value: 0,
          },
        ]),
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      valueType: 'select',
      valueEnum,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 120,
      render: () => [
        <a key="link">链路</a>,
        <a key="warn">报警</a>,
        <a key="more">
          <EllipsisOutlined />
        </a>,
      ],
    },
  ],
};

export default () => {
  const [activeKey, setActiveKey] = useState<string>('tab1');

  return (
    <ProTable<TableListItem>
      columns={columnsMap[activeKey]}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        title: '标签',
        multipleLine: true,
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="响应日期" />
          </LightFilter>
        ),
        tabs: {
          activeKey,
          onChange: (key) => setActiveKey(key as string),
          items: [
            {
              key: 'tab1',
              tab: '标签一',
            },
            {
              key: 'tab2',
              tab: '标签二',
            },
          ],
        },
      }}
      rowKey="key"
      search={false}
    />
  );
};
