import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

type Project = { projectName: string; ownerName: string };

const columns: ProFormColumnsType<Project>[][] = [
  [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      formItemProps: { rules: [{ required: true }] },
    },
  ],
  [
    {
      title: '负责人',
      dataIndex: 'ownerName',
      formItemProps: { rules: [{ required: true }] },
    },
  ],
];

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 640, padding: 16 }}>
      <BetaSchemaForm<Project>
        layoutType="StepsForm"
        steps={[{ title: '项目' }, { title: '负责人' }]}
        columns={columns}
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          return true;
        }}
      />
      {submitted && (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {submitted}
        </pre>
      )}
    </div>
  );
};
