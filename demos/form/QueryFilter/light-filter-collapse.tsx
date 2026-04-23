import { LightForm } from '@ant-design/pro-components';
import { message } from 'antd';

const Demo = () => {
  return (
    <LightForm
      initialValues={{
        sex: 'man',
      }}
      collapse
      onFinish={async () => {
        message.success('提交成功');
      }}
    >
      <LightForm.select
        name="sex"
        label="性别"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <LightForm.dateTime name="time" label="时间" />
    </LightForm>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
