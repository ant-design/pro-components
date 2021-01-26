import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

export default () => {
  const ref = useRef<FormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: 1602572994055,
            },
          ],
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          key="set"
          onClick={() => {
            if (ref.current) {
              ref.current.setFieldsValue({
                name: 'test-xxx',
              });
            }
          }}
        >
          赋值
        </Button>,
      ]}
      options={false}
      dateFormatter="string"
      headerTitle="表单赋值"
    />
  );
};
