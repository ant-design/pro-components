import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';

export function PriceInput() {
  return (
    <Space size={0}>
      <Form.Item noStyle name={['price', 'number']}>
        <Input style={{ width: 100 }} type="text" />
      </Form.Item>
      <Form.Item noStyle name={['price', 'currency']}>
        <Select style={{ width: 80, margin: '0 8px' }}>
          <Select.Option value="rmb">RMB</Select.Option>
          <Select.Option value="dollar">Dollar</Select.Option>
        </Select>
      </Form.Item>
    </Space>
  );
}

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <Form
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
      layout="inline"
      name="customized_form_controls"
      onFinish={onFinish}
    >
      <Form.Item label="Price" name="price" rules={[{ validator: checkPrice }]}>
        <PriceInput />
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
