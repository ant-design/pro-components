import {
  ProForm,
  ProFormItemRender,
  pickControlProps,
} from '@ant-design/pro-components';
import { Input } from 'antd';
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
        <ProFormItemRender name="projectName" label="项目名称">
          {(itemProps) => (
            <Input
              {...pickControlProps(itemProps)}
              placeholder="输入项目名称"
            />
          )}
        </ProFormItemRender>
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
