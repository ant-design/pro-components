import React from 'react';
import ProForm, {
  ProFormList,
  ProFormText,
  ProFormFieldSet,
  ProFormDigit,
  ProFormSelect,
  ProFormDatePicker,
} from '@ant-design/pro-form';

const Demo = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log('Received values of form:', values);
      }}
    >
      <ProFormList name="users">
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          name="name"
          label="姓名"
        />
        <ProFormText name="nickName" label="昵称" />
        <ProFormDigit name="age" label="年龄" />
        <ProFormSelect
          label="性别"
          name="sex"
          valueEnum={{
            man: '男性',
            woman: '女性',
          }}
        />
        <ProFormFieldSet name="addr" label="地址">
          <ProFormSelect
            valueEnum={{
              taiyuan: '山西',
              hangzhou: '杭州',
            }}
          />
          <ProFormSelect
            valueEnum={{
              changfeng: '长风街',
              gongzhuan: '工专路',
            }}
          />
        </ProFormFieldSet>
        <ProFormDatePicker name="birth" label="出生日期" />
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
