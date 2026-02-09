import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { BadgeProps } from 'antd';
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { FIXED_BASE_TIMESTAMP } from '../mockData';

type LogItem = {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
};

type ServerDetailProps = {
  ip: string;
};

const ServerDetail: React.FC<ServerDetailProps> = (props) => {
  const { ip } = props;
  const [logDataSource, setLogDataSource] = useState<LogItem[]>([]);

  const columns: ProColumns<LogItem>[] = [
    {
      title: '时间点',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '执行日志',
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
      render: () => [<a key="alert">告警</a>],
    },
  ];

  useEffect(() => {
    const source = [];
    for (let i = 0; i < 15; i += 1) {
      source.push({
        createdAt: FIXED_BASE_TIMESTAMP - (i * 500 + 100),
        code: `const healthCheck = async (host) => {
          const res = await fetch(host + '/health');
          return { status: res.status, latency: res.headers.get('x-latency') };
        };`,
        key: i,
      });
    }

    setLogDataSource(source);
  }, [ip]);

  return (
    <ProTable<LogItem>
      columns={columns}
      dataSource={logDataSource}
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

export type ServerItem = {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: statusType;
};

const serverListDataSource: ServerItem[] = [];

for (let i = 0; i < 10; i += 1) {
  serverListDataSource.push({
    ip: `10.0.${Math.floor(i / 3) + 1}.${(i * 11 + 100) % 256}`,
    cpu: ((i * 7 + 15) % 60) + 10,
    mem: ((i * 13 + 25) % 50) + 20,
    status: valueEnum[i % 4],
    disk: ((i * 11 + 30) % 40) + 15,
  });
}

type ServerListProps = {
  ip: string;
  onChange: (id: string) => void;
};

const ServerList: React.FC<ServerListProps> = (props) => {
  const { onChange } = props;

  const columns: ProColumns<ServerItem>[] = [
    {
      title: '服务器 IP',
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
      title: '内存',
      key: 'mem',
      dataIndex: 'mem',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
    {
      title: '磁盘',
      key: 'disk',
      dataIndex: 'disk',
      valueType: {
        type: 'percent',
        precision: 0,
      },
    },
  ];
  return (
    <ProTable<ServerItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: serverListDataSource,
          total: serverListDataSource.length,
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
          <Button key="add" type="primary">
            添加节点
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
  const [ip, setIp] = useState('10.0.1.100');
  return (
    <ProCard split="vertical">
      <ProCard colSpan="384px" ghost>
        <ServerList onChange={(cIp) => setIp(cIp)} ip={ip} />
      </ProCard>
      <ProCard title={ip}>
        <ServerDetail ip={ip} />
      </ProCard>
    </ProCard>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
