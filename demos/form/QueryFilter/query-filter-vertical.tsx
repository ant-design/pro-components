import { ProFormCheckbox, ProFormDatePicker, ProFormRadio, ProFormText, QueryFilter } from '@xxlabs/pro-components';

export default () => {
  return (
    <QueryFilter layout="vertical">
      <ProFormText label="这是一个超级超级长的名称" name="name" />
      <ProFormDatePicker label="创建时间" name="birth" />
      <ProFormText label="应用状态" name="sex" />
      <ProFormRadio.Group
        label="查询频度"
        name="freq"
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
      <ProFormCheckbox.Group label="行业分布" name="checkbox" options={['农业', '制造业', '互联网']} />
    </QueryFilter>
  );
};
