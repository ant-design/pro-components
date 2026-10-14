/**
 * title: ProFormList 嵌套可编辑表格
 * description: 用 `field.name` 定位每个分组的 rows，`trigger="onValuesChange"` 将表格编辑值同步给表单。
 * background: f5f5f5
 */
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProForm,
  ProFormList,
} from '@ant-design/pro-components';
import { useState } from 'react';

type RowType = {
  id: number | string;
  title?: string;
};

const columns: ProColumns<RowType>[] = [
  { dataIndex: 'title', title: '任务名称' },
  { valueType: 'option' },
];

const Demo = () => {
  const [result, setResult] = useState('');
  return (
    <>
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
          setResult(JSON.stringify(values.groups, null, 2));
          return true;
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
      {result && (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {result}
        </pre>
      )}
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
