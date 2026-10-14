import {
  FormControlRender,
  pickControlPropsWithId,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <Form
        onFinish={(values) => setSubmitted(JSON.stringify(values, null, 2))}
      >
        <Form.Item
          name="description"
          label="说明"
          rules={[{ required: true, message: '请输入说明' }]}
        >
          <FormControlRender>
            {(itemProps) => (
              <textarea
                {...pickControlPropsWithId(itemProps)}
                rows={4}
                placeholder="输入说明后提交"
                style={{
                  width: '100%',
                  borderColor:
                    itemProps.status === 'error' ? '#ff4d4f' : undefined,
                }}
              />
            )}
          </FormControlRender>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
