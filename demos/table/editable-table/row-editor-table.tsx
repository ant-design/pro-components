import type { ProColumns } from '@ant-design/pro-components';
import { RowEditorTable } from '@ant-design/pro-components';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  description?: string;
  status?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const taskNames = [
  '优化首页加载速度',
  '修复登录超时问题',
  '新增数据导出功能',
  '重构权限管理模块',
  '接入第三方支付 SDK',
];

const taskDescs = [
  '首页白屏时间超过 3s，需优化资源加载',
  '用户反馈高峰期登录请求超时',
  '支持将查询结果导出为 Excel 和 CSV',
  '现有权限模型不支持细粒度控制',
  '对接微信支付和支付宝当面付',
];

const defaultData: DataSourceType[] = taskNames.map((name, index) => ({
  id: (1705286400000 + index).toString(),
  title: name,
  description: taskDescs[index],
  status: index % 2 === 0 ? 'open' : 'closed',
  created_at: 1705286400000 - index * 86400000,
}));

const Demo = () => {
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 30,
            whitespace: true,
            message: '最长为 30 位',
          },
          {
            min: 4,
            whitespace: true,
            message: '最小为 4 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '待处理',
          status: 'Error',
        },
        closed: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ];

  return (
    <RowEditorTable<DataSourceType>
      headerTitle="任务管理（整行编辑）"
      columns={columns}
      rowKey="id"
      scroll={{
        x: 960,
      }}
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        record: () => ({
          id: Date.now(),
        }),
      }}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
