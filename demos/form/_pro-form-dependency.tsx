import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <ProForm
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormList
          name="users"
          label="成员"
          initialValue={[
            { name: '张三', enabled: false },
            { name: '李四', enabled: true, note: '负责审核' },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormSwitch name="enabled" label="启用备注" />
          <ProFormDependency name={['enabled']}>
            {({ enabled }) =>
              enabled ? <ProFormText name="note" label="备注" /> : null
            }
          </ProFormDependency>
        </ProFormList>
      </ProForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
