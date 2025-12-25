import {
  LightFilter,
  ProFormDateTimePicker,
  ProFormSelect,
} from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      collapse
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        label="性别"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <ProFormDateTimePicker name="time" label="时间" />
    </LightFilter>
  
    </div>
  );
};
