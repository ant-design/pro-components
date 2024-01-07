import {
  FormControlRender,
  pickControlPropsWithId,
} from '@ant-design/pro-components';
import { Button, Checkbox, Form } from 'antd';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} onFinish={console.log}>
      <Form.Item
        name={'text1'}
        label="文本框（没错误边框）"
        rules={[{ required: true }]}
      >
        <textarea />
      </Form.Item>
      <Form.Item
        name="text2"
        label="文本框（添加自定义的错误边框）"
        rules={[{ required: true }]}
      >
        <FormControlRender>
          {(itemProps) => {
            return (
              <textarea
                style={{
                  borderColor: itemProps.status === 'error' ? 'red' : undefined,
                }}
                {...pickControlPropsWithId(itemProps)}
              />
            );
          }}
        </FormControlRender>
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="check"
        label="复选框"
        rules={[{ required: true }]}
      >
        <Checkbox>是否</Checkbox>
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="check2"
        label="复选框"
        rules={[{ required: true }]}
      >
        <FormControlRender>
          {(itemProps) => {
            return (
              <Checkbox
                {...itemProps}
                style={{
                  color: itemProps.status === 'error' ? 'red' : undefined,
                }}
              >
                是否
              </Checkbox>
            );
          }}
        </FormControlRender>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
