import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormMoney,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  const [readonly, setReadonly] = useState(false);
  return (
    <>
      <ProFormSwitch
        checkedChildren="On"
        unCheckedChildren="Off"
        label="Read Only"
        fieldProps={{
          onChange: setReadonly,
        }}
      />
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        name="money-demo"
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          const val1 = await formRef.current?.validateFields();
          console.log('validateFields:', val1);
          const val2 =
            await formRef.current?.validateFieldsReturnFormatValue?.();
          console.log('validateFieldsReturnFormatValue:', val2);
          message.success('Submission successful');
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        readonly={readonly}
        request={async () => {
          await waitTime(100);
          return {
            name: 'Ant Design Co., Ltd.',
            useMode: 'chapter',
          };
        }}
        autoFocusFirstInput
      >
        <ProFormMoney
          label="No Symbol"
          name="amount0"
          fieldProps={{
            moneySymbol: false,
          }}
          locale="en-US"
          initialValue={22.22}
          min={0}
          width="lg"
        />
        <ProFormMoney
          label="Width"
          name="amount1"
          locale="en-US"
          initialValue={22.22}
          min={0}
          width="lg"
        />
        <ProFormMoney
          label="Minimum Amount 0"
          name="amount2"
          locale="en-US"
          initialValue={22.22}
          min={0}
          trigger="onBlur"
        />
        <ProFormMoney
          label="No Limit"
          name="amount3"
          locale="en-GB"
          initialValue={22.22}
        />
        <ProFormMoney
          label="Follow Global Locale"
          name="amount4"
          initialValue={22.22}
        />
        <ProFormMoney
          label="Locale ms-MY"
          name="amount-ms-My"
          locale="ms-MY"
          initialValue={-22.22}
        />
        <ProFormMoney
          label="Locale zh-TW"
          name="amount-zh-TW"
          locale="zh-TW"
          initialValue={22.22}
        />
        <ProFormMoney
          label="Custom Symbol"
          name="amount5"
          initialValue={22.22}
          customSymbol="💰"
        />
        <ProFormMoney
          label="Precision"
          name="amount6"
          initialValue={2222222222.222222}
          fieldProps={{ precision: 2 }}
          customSymbol="💰"
        />
        <ProFormMoney
          label="Precision 0"
          name="amount7"
          initialValue={2222222222.222222}
          fieldProps={{ precision: 0 }}
          customSymbol="💰"
        />
      </ProForm>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
