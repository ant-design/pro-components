import React, { useState } from 'react';
import { Button } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';

interface DataSourceType {
  id: React.Key;
  title?: string;
  decs?: string;
  created_at?: string;
  children?: DataSourceType[];
}

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    decs: '这个活动真好玩！',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    decs: '这个活动真好玩！',
    created_at: '2020-05-26T08:19:22Z',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '活动名称',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: 220,
  },
  {
    title: '描述',
    dataIndex: 'decs',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProField
        mode="read"
        valueType="jsonCode"
        fieldProps={{
          style: {
            flex: 1,
          },
        }}
        text={JSON.stringify(dataSource)}
      />
      <div
        style={{
          flex: 2,
        }}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          toolBarRender={() => [
            <EditableProTable.RecordCreator<DataSourceType>
              record={{
                id: (Math.random() * 1000000).toFixed(0),
              }}
              key="addEditRecord"
              position="start"
            >
              <Button>向前增加一行</Button>
            </EditableProTable.RecordCreator>,
          ]}
          recordCreatorProps={{
            record: {
              id: (Math.random() * 1000000).toFixed(0),
            },
          }}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
          })}
          value={dataSource}
          onChange={setDataSource}
          editable={{
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </div>
    </div>
  );
};
