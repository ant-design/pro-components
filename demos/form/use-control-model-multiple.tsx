import type { FormControlFC } from '@ant-design/pro-components';
import { ProForm, useControlModel } from '@ant-design/pro-components';
import { Checkbox, Input } from 'antd';
import { useState } from 'react';

const ReviewEditor: FormControlFC<object> = (props) => {
  const model = useControlModel(props, [
    { name: 'approved', valuePropName: 'checked' },
    { name: 'note' },
  ]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox {...model.approved}>审核通过</Checkbox>
      <Input {...model.note} placeholder="填写审核备注" />
    </div>
  );
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
        <ProForm.Item name="review" label="审核结果">
          <ReviewEditor />
        </ProForm.Item>
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
