import {
  ProForm,
  ProFormFieldSet,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <ProForm
    initialValues={{ time: ['09:00', '18:00'] }}
    onFinish={async (values) => {
      message.info(JSON.stringify(values));
    }}
  >
    <ProFormFieldSet
      name="time"
      label="工作时间"
      transform={(value: string[]) => ({
        startTime: value[0],
        endTime: value[1],
      })}
    >
      <ProFormText width="xs" placeholder="开始" />
      <ProFormText width="xs" placeholder="结束" />
    </ProFormFieldSet>
  </ProForm>
);
