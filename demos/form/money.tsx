import type { ProFormInstance } from '@xxlabs/pro-components';
import { ProForm, ProFormMoney, ProFormSwitch } from '@xxlabs/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >(undefined);

  const [readonly, setReadonly] = useState(false);
  return (
    <>
      <ProFormSwitch
        checkedChildren="On"
        fieldProps={{
          onChange: setReadonly,
        }}
        label="Read Only"
        unCheckedChildren="Off"
      />
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        autoFocusFirstInput
        formKey="base-form-use-demo"
        formRef={formRef}
        params={{ id: '100' }}
        readonly={readonly}
        request={async () => {
          await waitTime(100);
          return {
            name: 'Ant Design Co., Ltd.',
            useMode: 'chapter',
          };
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          const val1 = await formRef.current?.validateFields();
          console.log('validateFields:', val1);
          const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
          console.log('validateFieldsReturnFormatValue:', val2);
          message.success('Submission successful');
        }}
      >
        <ProFormMoney
          fieldProps={{
            moneySymbol: false,
          }}
          initialValue={22.22}
          label="No Symbol"
          locale="en-US"
          min={0}
          name="amount0"
          width="lg"
        />
        <ProFormMoney initialValue={22.22} label="Width" locale="en-US" min={0} name="amount1" width="lg" />
        <ProFormMoney
          initialValue={22.22}
          label="Minimum Amount 0"
          locale="en-US"
          min={0}
          name="amount2"
          trigger="onBlur"
        />
        <ProFormMoney initialValue={22.22} label="No Limit" locale="en-GB" name="amount3" />
        <ProFormMoney initialValue={22.22} label="Follow Global Locale" name="amount4" />
        <ProFormMoney initialValue={-22.22} label="Locale ms-MY" locale="ms-MY" name="amount-ms-My" />
        <ProFormMoney initialValue={22.22} label="Locale zh-TW" locale="zh-TW" name="amount-zh-TW" />
        <ProFormMoney customSymbol="💰" initialValue={22.22} label="Custom Symbol" name="amount5" />
        <ProFormMoney
          customSymbol="💰"
          fieldProps={{ precision: 2 }}
          initialValue={2222222222.222222}
          label="Precision"
          name="amount6"
        />
        <ProFormMoney
          customSymbol="💰"
          fieldProps={{ precision: 0 }}
          initialValue={2222222222.222222}
          label="Precision 0"
          name="amount6"
        />
      </ProForm>
    </>
  );
};
