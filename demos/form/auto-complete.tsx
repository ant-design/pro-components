import { ProForm, ProFormAutoComplete } from '@ant-design/pro-components';
import { message, Switch } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="Read Only"
        unCheckedChildren="Edit"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        name="auto-complete-demo"
        initialValues={{
          email: 'pro@ant.design',
        }}
        onFinish={async (values) => {
          await waitTime();
          message.success(JSON.stringify(values));
        }}
      >
        <ProFormAutoComplete
          name="email"
          label="邮箱"
          width="md"
          placeholder="请输入邮箱"
          options={['@gmail.com', '@163.com', '@qq.com'].map((suffix) => ({
            value: `pro${suffix}`,
          }))}
        />
      </ProForm>
    </div>
  );
};

export default Demo;
