import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { BadgeProps } from 'antd';
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';

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
        createdAt: Date.now() - Math.floor(Math.random() * 10000),
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
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
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

export default Demo;
