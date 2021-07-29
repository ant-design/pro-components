import React from 'react';
import ProForm, { ProFormList, ProFormText, ProFormDependency } from '@ant-design/pro-form';

const Demo = () => {
  return (
    <ProForm>
      <ProFormText name="name" label="姓名" />
      <ProFormList
        name={['default', 'users']}
        label="用户信息"
        initialValue={[
          {
            name: '1111',
          },
        ]}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormText name="nickName" label="昵称" />
        <ProFormDependency name={['name']} ignoreFormListField>
          {({ name }) => {
            if (!name) {
              return null;
            }
            return <ProFormText name="remark" label="昵称详情" />;
          }}
        </ProFormDependency>
        <ProFormDependency name={['nickName']}>
          {({ nickName }) => {
            if (!nickName) {
              return null;
            }
            return <ProFormText name="names" label="昵称详情" />;
          }}
        </ProFormDependency>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
