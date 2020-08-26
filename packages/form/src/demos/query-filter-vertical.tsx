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
      <ProFormRadio.Group label="查询频度">
        <ProFormRadio.Button value="weekly">每周</ProFormRadio.Button>
        <ProFormRadio.Button value="queterly">每季度</ProFormRadio.Button>
        <ProFormRadio.Button value="monthly">每月</ProFormRadio.Button>
        <ProFormRadio.Button value="yearly">每年</ProFormRadio.Button>
      </ProFormRadio.Group>
      <ProFormCheckbox.Group
        name="checkbox"
        label="行业分布"
        options={['农业', '制造业', '互联网']}
      />
    </QueryFilter>
  );
};
