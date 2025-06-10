import {
  WithControlPropsType,
  useControlModel,
} from '@ant-design/pro-components';
import { Button, Form, Input, Select } from 'antd';
import React from 'react';

export function PriceInput(
  props: WithControlPropsType<{
    // other props...
  }>,
) {
  const model = useControlModel(props, ['number', 'currency']);

  return (
    <span>
      <Input type="text" {...model.number} style={{ width: 100 }} />
      <Select {...model.currency} style={{ width: 80, margin: '0 8px' }}>
        <Select.Option value="rmb">RMB</Select.Option>
        <Select.Option value="dollar">Dollar</Select.Option>
      </Select>
    </span>
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
