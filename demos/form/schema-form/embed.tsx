import type { ProFormColumnsType } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { owner: string; task: string };

const columns: ProFormColumnsType<Values>[] = [
  {
    title: '任务名称（由 Schema 生成）',
    dataIndex: 'task',
    formItemProps: {
      rules: [{ required: true, message: '请输入任务名称' }],
    },
  },
];

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Values>
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormText name="owner" label="负责人（普通表单项）" />
        <BetaSchemaForm<Values> layoutType="Embed" columns={columns} />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
