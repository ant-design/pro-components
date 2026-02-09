import { EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useState } from 'react';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../../mockData';

export type TableListItem = {
  key: number;
  name: string;
  status: number;
  containers: number;
  creator: string;
};

const baseData = createTableDataSource({
  count: 5,
}) as unknown as TableListItem[];
const tableListDataSource = baseData.map((item, i) => ({
  ...item,
  status: i % 2,
}));

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
      valueEnum: DEMO_CREATOR_VALUE_ENUM,
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
      valueEnum: DEMO_CREATOR_VALUE_ENUM,
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

const Demo = () => {
  const [activeKey, setActiveKey] = useState<string>('tab1');

  return (
    <>
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
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 标签工具栏 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>LightFilter</strong>: 轻量过滤器组件
          </li>
          <li>
            <strong>ProFormDatePicker</strong>: 专业表单日期选择器组件
          </li>
          <li>
            <strong>标签工具栏</strong>: 展示标签工具栏功能
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
            <strong>toolbar</strong>: 工具栏配置
          </li>
          <li>
            <strong>rowKey</strong>: 行键
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
        </ul>
        <h4>标签工具栏特点：</h4>
        <ul>
          <li>
            <strong>标签切换</strong>: 支持标签切换
          </li>
          <li>
            <strong>多行布局</strong>: 支持多行布局
          </li>
          <li>
            <strong>过滤器</strong>: 支持过滤器
          </li>
          <li>
            <strong>动态列</strong>: 支持动态列配置
          </li>
          <li>
            <strong>状态管理</strong>: 支持状态管理
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>分类展示</strong>: 分类展示需求
          </li>
          <li>
            <strong>多视图切换</strong>: 多视图切换功能
          </li>
          <li>
            <strong>数据分组</strong>: 数据分组管理
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
