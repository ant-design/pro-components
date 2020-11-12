import React from 'react';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormCheckbox,
} from '@ant-design/pro-form';

export default () => {
  return (
    <QueryFilter layout="vertical">
      <ProFormText name="name" label="这是一个超级超级长的名称" />
      <ProFormDatePicker name="birth" label="创建时间" />
      <ProFormText name="sex" label="应用状态" />
      <ProFormRadio.Group
        name="freq"
        label="查询频度"
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
      <ProFormCheckbox.Group
        name="checkbox"
        label="行业分布"
        options={['农业', '制造业', '互联网']}
      />
    </QueryFilter>
  );
};
