/**
 * title: ProFormList 嵌套可编辑表格
 * description: 在 `ProFormList` 的每一行中嵌入 `EditableProTable`，用 render-prop 拿到行索引（`field.name`）拼接 name，即可实现列表行内的可编辑数组字段：`setFieldsValue`、提交与行编辑互相同步。
 * background: f5f5f5
 */
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProForm,
  ProFormList,
} from '@ant-design/pro-components';
import React from 'react';

type RowType = {
  id: number | string;
  title?: string;
};

const columns: ProColumns<RowType>[] = [
  { dataIndex: 'title', title: '任务名称' },
  { valueType: 'option' },
];

const Demo = () => {
  return (
    <ProForm
      initialValues={{
        groups: [
          {
            key: 'g1',
            name: '分组一',
            rows: [
              { id: 'a1', title: '需求评审' },
              { id: 'a2', title: '接口联调' },
            ],
          },
        ],
      }}
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormList
        name="groups"
        label="任务分组"
        creatorRecord={{ name: '新分组' }}
      >
        {(field) => (
          <ProForm.Item
            label="任务列表"
            name={[field.name, 'rows']}
            trigger="onValuesChange"
          >
            <EditableProTable<RowType>
              rowKey="id"
              columns={columns}
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({ id: Date.now() }),
              }}
              editable={{}}
            />
          </ProForm.Item>
        )}
      </ProFormList>
    </ProForm>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
