import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import React, { useState } from 'react';

import { createEditableRowId, DEMO_TASK_STATUS_ENUM } from '../mockData';

type DataSourceType = {
  id: React.Key;
  title?: string;
  description?: string;
  status?: string;
  created_at?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '优化首页加载速度',
    description: '首页白屏时间超过 3s，需优化资源加载',
    status: 'open',
    created_at: 1705286400000,
  },
  {
    id: 624691229,
    title: '修复登录超时问题',
    description: '高峰期登录请求超时，需排查连接池',
    status: 'closed',
    created_at: 1705200000000,
  },
  {
    id: 624674560,
    title: '新增数据导出功能',
    description: '支持导出 Excel 和 CSV 格式',
    status: 'processing',
    created_at: 1705113600000,
  },
];

const Demo = () => {
  const [editableType, setEditableType] = useState<'single' | 'multiple'>('multiple');
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: DEMO_TASK_STATUS_ENUM,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => action?.startEditable?.(record.id)}>
          编辑
        </a>,
        <a
          key="delete"
          onClick={() =>
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div>
      <div style={{ marginBlockEnd: 16 }}>
        <span>editable.type 编辑模式：</span>
        <Segmented
          value={editableType}
          onChange={(v) => {
            setEditableType(v as any);
            setEditableRowKeys([]);
          }}
          options={[
            { label: '单行编辑 single', value: 'single' },
            { label: '多行编辑 multiple', value: 'multiple' },
          ]}
        />
      </div>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="编辑模式切换"
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: defaultData.length,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          position: 'bottom',
          record: () => ({ id: createEditableRowId() }),
          newRecordType: 'dataSource',
        }}
        editable={{
          type: editableType,
          editableKeys,
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{ style: { width: '100%' } }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
