import React from 'react';
import ProForm, { ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';

const Demo = () => {
  return (
    <ProForm onFinish={async (e) => console.log(e)}>
      <ProFormList
        name="users"
        label="用户信息"
        initialValue={[
          {
            name: '1111',
          },
        ]}
        creatorRecord={{
          name: '222',
        }}
        actionGuard={{
          beforeAddRow: async (defaultValue, insertIndex) => {
            return new Promise((resolve) => {
              console.log(defaultValue, insertIndex);
              setTimeout(() => resolve(true), 1000);
            });
          },
          beforeRemoveRow: async (index) => {
            return new Promise((resolve) => {
              if (index === 0) {
                message.error('这行不能删');
                resolve(false);
                return;
              }
              setTimeout(() => resolve(true), 1000);
            });
          },
        }}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.name}
              style={{
                marginBottom: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormGroup>
          <ProFormText name="name" label="姓名" />
          <ProFormText name="age" label="年龄" />
        </ProFormGroup>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
