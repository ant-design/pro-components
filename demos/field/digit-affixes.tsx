import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ amount: 128 }}>
    <ProFormDigit
      name="amount"
      label="带前后缀数字"
      fieldProps={{ prefix: '¥', addonAfter: '元' }}
    />
  </ProForm>
);
