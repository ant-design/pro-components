import type { WithControlPropsType } from '@ant-design/pro-components';
import { ProForm, useControlModel } from '@ant-design/pro-components';
import { Input } from 'antd';
import { useState } from 'react';

const TextEditor = (props: WithControlPropsType<{ placeholder: string }>) => {
  const model = useControlModel(props);
  return <Input {...model} placeholder={props.placeholder} />;
};

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <ProForm
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
        }}
      >
        <ProForm.Item name="title" label="任务名称">
          <TextEditor placeholder="输入任务名称" />
        </ProForm.Item>
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
