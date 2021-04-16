import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { LightFilter, ProFormSelect, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      bordered
      collapseLabel={<FilterOutlined />}
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
        placeholder="性别"
      />
      <ProFormRadio.Group
        name="radio"
        radioType="button"
        options={[
          {
            value: 'weekly',
            label: '每周',
          },
          {
            value: 'quarterly',
            label: '每季度',
          },
          {
            value: 'monthly',
            label: '每月',
          },
          {
            value: 'yearly',
            label: '每年',
          },
        ]}
      />
      <ProFormDatePicker name="time" placeholder="日期" />
    </LightFilter>
  );
};
