import {
  FormItemRender,
  ProForm,
  pickControlPropsWithId,
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
        <FormItemRender name="contact" label="联系人">
          {(itemProps) => (
            <Input
              {...pickControlPropsWithId(itemProps)}
              placeholder="输入联系人"
            />
          )}
        </FormItemRender>
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
