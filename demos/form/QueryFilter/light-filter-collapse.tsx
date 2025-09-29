import { LightFilter, ProFormDateTimePicker, ProFormSelect } from '@xxlabs/pro-components';

export default () => {
  return (
    <LightFilter
      collapse
      initialValues={{
        sex: 'man',
      }}
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        showSearch
        label="性别"
        name="sex"
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <ProFormDateTimePicker label="时间" name="time" />
    </LightFilter>
  );
};
