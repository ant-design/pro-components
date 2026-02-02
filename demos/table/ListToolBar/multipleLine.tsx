import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../../mockData';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
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
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
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
];

const Demo = () => {
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
        headerTitle="两行的情况"
        toolbar={{
          multipleLine: true,
          search: {
            onSearch: (value: string) => {
              alert(value);
            },
          },
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" label="响应日期" />
            </LightFilter>
          ),
          actions: [
            <Dropdown
              key="overlay"
              menu={{
                items: [
                  {
                    label: '菜单',
                    key: '1',
                  },
                  {
                    label: '列表',
                    key: '2',
                  },
                  {
                    label: '表单',
                    key: '3',
                  },
                ],
                onClick: () => alert('menu click'),
              }}
            >
              <Button>
                移动自
                <DownOutlined
                  style={{
                    marginInlineStart: 8,
                  }}
                />
              </Button>
            </Dropdown>,
            <Button
              key="add"
              type="primary"
              onClick={() => {
                alert('add');
              }}
            >
              添加
            </Button>,
          ],
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
        <h4>ProTable 多行工具栏 Props 说明：</h4>
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
            <strong>Dropdown</strong>: 下拉菜单组件
          </li>
          <li>
            <strong>多行工具栏</strong>: 展示多行工具栏功能
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
            <strong>headerTitle</strong>: 表格标题
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
        <h4>多行工具栏特点：</h4>
        <ul>
          <li>
            <strong>多行布局</strong>: 支持多行布局
          </li>
          <li>
            <strong>搜索功能</strong>: 支持搜索功能
          </li>
          <li>
            <strong>过滤器</strong>: 支持过滤器
          </li>
          <li>
            <strong>下拉菜单</strong>: 支持下拉菜单
          </li>
          <li>
            <strong>操作按钮</strong>: 支持操作按钮
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>复杂操作</strong>: 复杂操作需求
          </li>
          <li>
            <strong>空间利用</strong>: 空间利用优化
          </li>
          <li>
            <strong>功能丰富</strong>: 功能丰富的表格
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
