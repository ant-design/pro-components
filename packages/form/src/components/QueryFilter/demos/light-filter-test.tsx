import {
  LightFilter,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
} from '@ant-design/pro-components';
import { Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import moment from 'moment';
import React from 'react';

export default () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <LightFilter<{
        sex: string;
        company: string;
      }>
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          range: [20, 80],
          slider: 20,
          sex: [
            {
              value: 'open1',
              label: '打开',
            },
            {
              value: 'closed2',
              label: '关闭',
            },
          ],
          datetimeRanger: [
            moment('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            moment('2019-11-16 12:50:26').valueOf(),
          ],
          timeRanger: [
            moment('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
            moment('2019-11-16 12:50:26').valueOf(),
          ],
        }}
        size={size}
        onFinish={async (values) => console.log(values.sex)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          fieldProps={{
            labelInValue: true,
          }}
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
        <ProForm.Group label="范围组">
          <ProFormDigit name="count" label="数量" />
          <ProFormSlider name="range" label="范围" range />
          <ProFormSlider name="slider" label="范围" />
        </ProForm.Group>
        <ProFormText name="name1" label="名称" />
      </LightFilter>
    </div>
  );
};
