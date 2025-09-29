import { LightFilter, ProForm, ProFormDigit, ProFormSelect, ProFormSlider, ProFormText } from '@xxlabs/pro-components';
import { Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';
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
          datetimeRanger: [dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()],
          timeRanger: [dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()],
        }}
        size={size}
        onFinish={async (values) => console.log(values.sex)}
      >
        <ProFormSelect
          showSearch
          allowClear={false}
          fieldProps={{
            labelInValue: true,
          }}
          label="性别"
          name="sex"
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormSelect
          label="地区"
          mode="multiple"
          name="area"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
        <ProForm.Group label="范围组">
          <ProFormDigit label="数量" name="count" />
          <ProFormSlider range label="范围" name="range" />
          <ProFormSlider label="范围" name="slider" />
        </ProForm.Group>
        <ProFormText label="名称" name="name1" />
      </LightFilter>
    </div>
  );
};
