import {
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <ProForm
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormText
          name="dbName"
          label="数据库名称"
          placeholder="输入名称以显示更多迁移选项"
        />
        <ProFormDependency name={['dbName']}>
          {({ dbName }) => (
            <ProFormCheckbox.Group
              name="migrationType"
              label="迁移方式"
              options={
                dbName ? ['全量迁移', '增量迁移', '结构迁移'] : ['全量迁移']
              }
            />
          )}
        </ProFormDependency>
      </ProForm>
      {submitted && (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {submitted}
        </pre>
      )}
    </div>
  );
};
