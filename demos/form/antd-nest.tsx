import { Button, Form, InputNumber, Select, Space } from 'antd';
import { useState } from 'react';

type Currency = 'rmb' | 'dollar';
type Price = { number: number; currency: Currency };
type Values = { price: Price };

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <Form<Values>
        layout="vertical"
        initialValues={{ price: { number: 100, currency: 'rmb' } }}
        onFinish={setSubmitted}
      >
        <Form.Item label="价格">
          <Space wrap>
            <Form.Item name={['price', 'number']} noStyle>
              <InputNumber<number> aria-label="金额" min={0} />
            </Form.Item>
            <Form.Item name={['price', 'currency']} noStyle>
              <Select<Currency>
                aria-label="币种"
                style={{ width: 120 }}
                options={[
                  { label: '人民币', value: 'rmb' },
                  { label: '美元', value: 'dollar' },
                ]}
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
