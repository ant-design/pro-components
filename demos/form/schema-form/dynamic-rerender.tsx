import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

type FormValues = {
  mode?: 'editable' | 'locked';
  status?: 'open' | 'closed';
};

const columns: ProFormColumnsType<FormValues>[] = [
  {
    title: '编辑模式',
    dataIndex: 'mode',
    valueType: 'select',
    valueEnum: {
      editable: { text: '可编辑' },
      locked: { text: '已锁定' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      open: { text: '进行中' },
      closed: { text: '已完成' },
    },
    fieldProps: (form) => ({
      disabled: form.getFieldValue('mode') === 'locked',
    }),
  },
];

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<FormValues>
        layoutType="Form"
        shouldUpdate={(values, previous) => values.mode !== previous?.mode}
        initialValues={{ mode: 'editable' }}
        columns={columns}
        onFinish={async (values) =>
          setSubmitted(JSON.stringify(values, null, 2))
        }
      />
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
