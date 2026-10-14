import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

type Contact = { channel: 'email' | 'phone'; address: string };

export default () => {
  const [submitted, setSubmitted] = useState<Contact>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Contact>
        initialValues={{ channel: 'email' }}
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormSelect
          name="channel"
          label="联系方式"
          options={[
            { label: '邮箱', value: 'email' },
            { label: '手机', value: 'phone' },
          ]}
        />
        <ProFormDependency name={['channel']}>
          {({ channel }) => (
            <ProFormText
              name="address"
              label={channel === 'phone' ? '手机号码' : '邮箱地址'}
              placeholder={
                channel === 'phone' ? '请输入手机号码' : '请输入邮箱地址'
              }
            />
          )}
        </ProFormDependency>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
