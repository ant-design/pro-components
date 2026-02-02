import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import React, { useState } from 'react';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../mockData';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const tableListDataSource = createTableDataSource({
  count: 5,
  namePrefix: 'AppName',
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">发布</a>,
      (record.status === 'running' || record.status === 'online') && (
        <a key="warn">停用</a>
      ),
      record.status === 'error' && <a key="republish">重新发布</a>,
      <a
        key="monitor"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        监控
      </a>,
    ],
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const Demo = () => {
  const [activeKey, setActiveKey] = useState<React.Key>('tab1');

  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        toolbar={{
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" label="响应日期" />
            </LightFilter>
          ),
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>应用{renderBadge(99, activeKey === 'tab1')}</span>,
              },
              {
                key: 'tab2',
                label: <span>项目{renderBadge(30, activeKey === 'tab2')}</span>,
              },
              {
                key: 'tab3',
                label: <span>文章{renderBadge(30, activeKey === 'tab3')}</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key as string);
            },
          },
          actions: [
            <Button key="primary" type="primary">
              新建应用
            </Button>,
          ],
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        options={{
          setting: {
            draggable: true,
            checkable: true,
            checkedReset: false,
            extra: [<a key="confirm">确认</a>],
          },
        }}
      />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 列表工具栏 Props 说明：</h4>
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
            <strong>Badge</strong>: 徽章组件
          </li>
          <li>
            <strong>Button</strong>: 按钮组件
          </li>
          <li>
            <strong>列表工具栏</strong>: 展示列表工具栏功能
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
            <strong>pagination</strong>: 分页配置
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>dateFormatter</strong>: 日期格式化
          </li>
          <li>
            <strong>options</strong>: 选项配置
          </li>
        </ul>
        <h4>列表工具栏特点：</h4>
        <ul>
          <li>
            <strong>过滤器</strong>: 支持过滤器
          </li>
          <li>
            <strong>菜单切换</strong>: 支持菜单切换
          </li>
          <li>
            <strong>徽章显示</strong>: 支持徽章显示
          </li>
          <li>
            <strong>操作按钮</strong>: 支持操作按钮
          </li>
          <li>
            <strong>状态管理</strong>: 支持状态管理
          </li>
          <li>
            <strong>列设置</strong>: 支持列设置
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>应用管理</strong>: 应用管理系统
          </li>
          <li>
            <strong>项目管理</strong>: 项目管理系统
          </li>
          <li>
            <strong>内容管理</strong>: 内容管理系统
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
