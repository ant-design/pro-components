import { Button, Form, InputNumber, Select, Space } from 'antd';
import { useState } from 'react';

type Currency = 'rmb' | 'dollar';
type Price = { number: number; currency: Currency };
type Values = { price: Price };

function PriceInput({
  value = { number: 0, currency: 'rmb' },
  onChange,
}: {
  value?: Price;
  onChange?: (value: Price) => void;
}) {
  return (
    <Space wrap>
      <InputNumber<number>
        aria-label="金额"
        min={0}
        value={value.number}
        onChange={(number) => onChange?.({ ...value, number: number ?? 0 })}
      />
      <Select<Currency>
        aria-label="币种"
        value={value.currency}
        onChange={(currency) => onChange?.({ ...value, currency })}
        style={{ width: 120 }}
        options={[
          { label: '人民币', value: 'rmb' },
          { label: '美元', value: 'dollar' },
        ]}
      />
    </Space>
  );
}

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <Form<Values>
        layout="vertical"
        initialValues={{ price: { number: 100, currency: 'rmb' } }}
        onFinish={setSubmitted}
      >
        <Form.Item name="price" label="价格">
          <PriceInput />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
