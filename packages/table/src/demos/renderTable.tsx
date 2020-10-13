import React, { useState, useEffect } from 'react';
import { Result, Card, Descriptions } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

export interface TableListItem {
  key: number;
  name: string;
  createdAt: number;
  progress: number;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },
  {
    title: '更新时间',
    key: 'since2',
    width: 120,
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',
    valueType: 'progress',
  },
];

export default () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDataSource(tableListDataSource);
    }, 5000);
  }, []);

  return (
    <ProTable<TableListItem>
      columns={columns}
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      tableRender={(_, dom) => (
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Result status="404" title="404" subTitle="404" />
          <div
            style={{
              flex: 1,
            }}
          >
            {dom}
          </div>
        </div>
      )}
      tableExtraRender={(_, data) => (
        <Card>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Row">{data.length}</Descriptions.Item>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>421421</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      loading={loading}
      dataSource={dataSource}
      options={{
        reload: () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        },
      }}
      dateFormatter="string"
      headerTitle="自定义 table"
    />
  );
};
