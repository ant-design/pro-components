import type { ProColumns } from '@ant-design/pro-components';
import { ProProvider, ProTable } from '@ant-design/pro-components';
import { Button, Select, Tag } from 'antd';
import { useContext, useState } from 'react';

type Task = {
  key: number;
  name: string;
  priority: 'low' | 'high';
};

const columns: ProColumns<Task, 'priority'>[] = [
  {
    title: '任务',
    dataIndex: 'name',
    editable: false,
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    valueType: 'priority',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, row, __, action) => [
      <Button
        key="edit"
        type="link"
        onClick={() => action?.startEditable(row.key)}
      >
        编辑
      </Button>,
    ],
  },
];

export default () => {
  const provider = useContext(ProProvider);
  const [rows, setRows] = useState<Task[]>([
    { key: 1, name: '用户认证', priority: 'low' },
  ]);

  return (
    <ProProvider.Provider
      value={{
        ...provider,
        valueTypeMap: {
          ...provider.valueTypeMap,
          priority: {
            render: (value) => (
              <Tag color={value === 'high' ? 'red' : 'blue'}>
                {value === 'high' ? '高' : '低'}
              </Tag>
            ),
            formItemRender: (_text, props) => (
              <Select
                {...props?.fieldProps}
                options={[
                  { label: '低', value: 'low' },
                  { label: '高', value: 'high' },
                ]}
                style={{ width: 100 }}
              />
            ),
          },
        },
      }}
    >
      <div style={{ padding: 12 }}>
        <ProTable<Task, Record<string, never>, 'priority'>
          rowKey="key"
          columns={columns}
          dataSource={rows}
          search={false}
          options={false}
          pagination={false}
          editable={{
            type: 'single',
            actionRender: (_row, _config, actions) => [
              actions.save,
              actions.cancel,
            ],
            onSave: async (key, row) => {
              setRows((current) =>
                current.map((item) => (item.key === key ? row : item)),
              );
            },
          }}
        />
      </div>
    </ProProvider.Provider>
  );
};
