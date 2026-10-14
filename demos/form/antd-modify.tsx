import type { WithControlPropsType } from '@ant-design/pro-components';
import { useControlModel } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Select, Space } from 'antd';
import { useState } from 'react';

type Currency = 'rmb' | 'dollar';
type Price = { number: number; currency: Currency };
type Values = { price: Price };

function PriceInput(props: WithControlPropsType<{}>) {
  const model = useControlModel(props, ['number', 'currency']);

  return (
    <Space wrap>
      <InputNumber<number> aria-label="金额" min={0} {...model.number} />
      <Select<Currency>
        aria-label="币种"
        {...model.currency}
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
