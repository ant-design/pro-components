import { EditableProTable } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useState } from 'react';

type Field = { name: string; dataType: string; description: string };
type DataTable = { name: string; fields: Field[] };

const initialTables: DataTable[] = [
  {
    name: '客户表',
    fields: [
      { name: 'customer_id', dataType: 'bigint', description: '客户编号' },
      { name: 'customer_name', dataType: 'text', description: '客户名称' },
    ],
  },
  {
    name: '订单表',
    fields: [
      { name: 'order_id', dataType: 'bigint', description: '订单编号' },
      { name: 'amount', dataType: 'decimal', description: '订单金额' },
    ],
  },
];

export default () => {
  const [tables, setTables] = useState(initialTables);
  const [activeKey, setActiveKey] = useState('客户表');
  const updateFields = (tableName: string, fields: readonly Field[]) => {
    setTables((current) =>
      current.map((table) =>
        table.name === tableName ? { ...table, fields: [...fields] } : table,
      ),
    );
  };

  return (
    <div style={{ maxWidth: '100%', padding: 16 }}>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tables.map((table) => ({
          key: table.name,
          label: table.name,
          children: (
            <EditableProTable<Field>
              rowKey="name"
              scroll={{ x: 520 }}
              columns={[
                { title: '字段名', dataIndex: 'name', editable: false },
                { title: '类型', dataIndex: 'dataType', editable: false },
                { title: '字段说明', dataIndex: 'description' },
              ]}
              value={table.fields}
              onChange={(fields) => updateFields(table.name, fields)}
              recordCreatorProps={false}
              editable={{
                editableKeys: table.fields.map((field) => field.name),
                onValuesChange: (_row, fields) =>
                  updateFields(table.name, fields),
              }}
            />
          ),
        }))}
      />
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(
          tables.find((table) => table.name === activeKey),
          null,
          2,
        )}
      </pre>
    </div>
  );
};
