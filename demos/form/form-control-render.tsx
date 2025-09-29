import { FormControlRender, pickControlPropsWithId } from '@xxlabs/pro-components';
import { Button, Checkbox, Form } from 'antd';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.validateFields();
  }, []);

  return (
    <Form form={form} onFinish={console.log}>
      <Form.Item label="文本框（没错误边框）" name="text1" rules={[{ required: true }]}>
        <textarea />
      </Form.Item>
      <Form.Item label="文本框（添加自定义的错误边框）" name="text2" rules={[{ required: true }]}>
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
      <Form.Item label="复选框" name="check" rules={[{ required: true }]} valuePropName="checked">
        <Checkbox>是否</Checkbox>
      </Form.Item>
      <Form.Item label="复选框" name="check2" rules={[{ required: true }]} valuePropName="checked">
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
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
