import { LightFilter, lightForm } from '@ant-design/pro-components';
import { message } from 'antd';

const Demo = () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      collapse
      onFinish={async () => {
        message.success('提交成功');
      }}
    >
      <lightForm.select
        name="sex"
        label="性别"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <lightForm.dateTime name="time" label="时间" />
    </LightFilter>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
