import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';

export function PriceInput() {
  return (
    <Space size={0}>
      <Form.Item noStyle name={['price', 'number']}>
        <Input type="text" style={{ width: 100 }} />
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
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item name="price" label="Price" rules={[{ validator: checkPrice }]}>
        <PriceInput />
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
