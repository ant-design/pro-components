import {
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormFieldSet,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@xxlabs/pro-components';
import { ConfigProvider } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  return (
    <ConfigProvider componentSize="small">
      <ProFormRadio.Group
        fieldProps={{
          value: position,
          onChange: (e) => setPosition(e.target.value),
        }}
        options={[
          {
            label: '顶部',
            value: 'top',
          },
          {
            label: '底部',
            value: 'bottom',
          },
        ]}
      />
      <ProForm
        onFinish={async (values) => {
          console.log('Received values of form:', values);
        }}
      >
        <ProFormText label="主合同编号" name="id" width="sm" />
        <ProFormText initialValue="xxxx项目" label="项目名称" name="project" width="md" />
        <ProFormText initialValue="启途" label="商务经理" name="mangerName" width="xs" />
        <ProFormList
          creatorButtonProps={{
            position,
          }}
          creatorRecord={{
            name: 'test',
          }}
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
              age: 111,
              birth: '2021-02-18',
              sex: 'man',
              addrList: [{ addr: ['taiyuan', 'changfeng'] }],
            },
          ]}
          label="用户信息"
          name="users"
          rules={[
            {
              required: true,
              validator: async (_, value) => {
                console.log(value);
                if (value && value.length > 0) {
                  return;
                }
                throw new Error('至少要有一项！');
              },
            },
          ]}
        >
          <ProFormGroup key="group">
            <ProFormText
              label="姓名"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormDigit label="年龄" name="age" width="sm" />
            <ProFormSelect
              label="性别"
              name="sex"
              valueEnum={{
                man: '男性',
                woman: '女性',
              }}
              width="xs"
            />
            <ProFormDatePicker label="出生日期" name="birth" />
            <ProFormFieldSet label="地址" name="addr">
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
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </ConfigProvider>
  );
};

export default Demo;
