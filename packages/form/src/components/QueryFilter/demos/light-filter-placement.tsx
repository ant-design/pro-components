import React from 'react';
import { LightFilter, ProFormSelect } from '@ant-design/pro-form';
import { Radio } from 'antd';
import { ProFormText } from '../..';

export default () => {
  const [mode, setMode] = React.useState<any>('topLeft');
  return (
    <div>
      <Radio.Group
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <LightFilter placement={mode}>
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormSelect
          name="area"
          label="地区"
          mode="multiple"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
      </LightFilter>

      <LightFilter placement={mode} collapse={true}>
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormSelect
          name="area"
          label="地区"
          mode="multiple"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
      </LightFilter>
    </div>
  );
};
