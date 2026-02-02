import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { BadgeProps } from 'antd';
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { FIXED_BASE_TIMESTAMP } from '../mockData';

type TableListItem = {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
};

type DetailListProps = {
  ip: string;
};

const DetailList: React.FC<DetailListProps> = (props) => {
  const { ip } = props;
  const [tableListDataSource, setTableListDataSource] = useState<
    TableListItem[]
  >([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '时间点',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '代码',
      key: 'code',
      width: 80,
      dataIndex: 'code',
      valueType: 'code',
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      valueType: 'option',
      render: () => [<a key="a">预警</a>],
    },
  ];

  useEffect(() => {
    const source = [];
    for (let i = 0; i < 15; i += 1) {
      source.push({
        createdAt: FIXED_BASE_TIMESTAMP - (i * 500 + 100),
        code: `const getData = async params => {
          const data = await getData(params);
          return { list: data.data, ...data };
        };`,
        key: i,
      });
    }

    setTableListDataSource(source);
  }, [ip]);

  return (
    <ProTable<TableListItem>
      columns={columns}
      dataSource={tableListDataSource}
      pagination={{
        pageSize: 3,
        showSizeChanger: false,
      }}
      rowKey="key"
      toolBarRender={false}
      search={false}
    />
  );
};

type statusType = BadgeProps['status'];

const valueEnum: statusType[] = ['success', 'error', 'processing', 'default'];

export type IpListItem = {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: statusType;
};

const ipListDataSource: IpListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: `106.14.98.1${i}4`,
    cpu: 10,
    mem: 20,
    status: valueEnum[i % 4],
    disk: 30,
  });
}

type IPListProps = {
  ip: string;
  onChange: (id: string) => void;
};

const IPList: React.FC<IPListProps> = (props) => {
  const { onChange } = props;

  const columns: ProColumns<IpListItem>[] = [
    {
      title: 'IP',
      key: 'ip',
      dataIndex: 'ip',
      render: (_, item) => {
        return <Badge status={item.status} text={item.ip} />;
      },
    },
    {
      title: 'CPU',
      key: 'cpu',
      dataIndex: 'cpu',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: 'Mem',
      key: 'mem',
      dataIndex: 'mem',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: 'Disk',
      key: 'disk',
      dataIndex: 'disk',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
  ];
  return (
    <ProTable<IpListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: ipListDataSource,
          success: true,
        });
      }}
      rowKey="ip"
      toolbar={{
        search: {
          onSearch: (value) => {
            alert(value);
          },
        },
        actions: [
          <Button key="list" type="primary">
            新建项目
          </Button>,
        ],
      }}
      options={false}
      pagination={false}
      search={false}
      onRow={(record) => {
        return {
          onClick: () => {
            if (record.ip) {
              onChange(record.ip);
            }
          },
        };
      }}
    />
  );
};

const Demo: React.FC = () => {
  const [ip, setIp] = useState('0.0.0.0');
  return (
    <ProCard split="vertical">
      <ProCard colSpan="384px" ghost>
        <IPList onChange={(cIp) => setIp(cIp)} ip={ip} />
      </ProCard>
      <ProCard title={ip}>
        <DetailList ip={ip} />
      </ProCard>
    </ProCard>
  );
};

const DemoWithDocs = () => {
  return (
    <>
      <Demo />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 分割表格 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>ProCard</strong>: 专业卡片组件
          </li>
          <li>
            <strong>Badge</strong>: 徽章组件
          </li>
          <li>
            <strong>Button</strong>: 按钮组件
          </li>
          <li>
            <strong>分割表格</strong>: 展示分割表格功能
          </li>
        </ul>
        <h4>ProTable 配置：</h4>
        <ul>
          <li>
            <strong>columns</strong>: 列配置
          </li>
          <li>
            <strong>dataSource</strong>: 数据源
          </li>
          <li>
            <strong>pagination</strong>: 分页配置
          </li>
          <li>
            <strong>rowKey</strong>: 行键
          </li>
          <li>
            <strong>toolBarRender</strong>: 工具栏渲染
          </li>
          <li>
            <strong>options</strong>: 选项配置
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>onRow</strong>: 行事件
          </li>
          <li>
            <strong>request</strong>: 请求函数
          </li>
          <li>
            <strong>toolbar</strong>: 工具栏配置
          </li>
        </ul>
        <h4>分割表格特点：</h4>
        <ul>
          <li>
            <strong>垂直分割</strong>: 支持垂直分割
          </li>
          <li>
            <strong>主从结构</strong>: 支持主从结构
          </li>
          <li>
            <strong>联动显示</strong>: 支持联动显示
          </li>
          <li>
            <strong>状态管理</strong>: 支持状态管理
          </li>
          <li>
            <strong>百分比显示</strong>: 支持百分比显示
          </li>
          <li>
            <strong>代码展示</strong>: 支持代码展示
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>监控系统</strong>: 监控系统需求
          </li>
          <li>
            <strong>详情展示</strong>: 详情展示功能
          </li>
          <li>
            <strong>主从界面</strong>: 主从界面需求
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <DemoWithDocs />
  </div>
);
