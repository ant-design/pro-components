import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={async () => {
        message.success('提交成功');
      }}
      syncToUrl={(values, type) => {
        if (type === 'get') {
          // 为了配合 transform
          // startTime 和 endTime 拼成 createTimeRanger
          return {
            ...values,
            createTimeRanger:
              values.startTime || values.endTime
                ? [values.startTime, values.endTime]
                : undefined,
          };
        }
        // expirationTime 不同步到 url
        return {
          ...values,
          expirationTime: undefined,
        };
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}
      autoFocusFirstInput
    >
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="sm"
        name="useMode"
        label="合同约定生效方式"
      />
      <ProFormDateRangePicker
        transform={(values) => {
          return {
            startTime: values ? values[0] : undefined,
            endTime: values ? values[1] : undefined,
          };
        }}
        width="md"
        name="createTimeRanger"
        label="合同生效时间"
      />
      <ProFormDatePicker
        width="md"
        name="expirationTime"
        label="合同失效时间"
      />
    </ProForm>
  );
};
