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
        message.success('Submission successful');
      }}
      syncToUrl={(values, type) => {
        if (type === 'get') {
          // To cooperate with transform
          // startTime and endTime are combined into createTimeRanger
          return {
            ...values,
            createTimeRanger:
              values.startTime || values.endTime
                ? [values.startTime, values.endTime]
                : undefined,
          };
        }
        // expirationTime is not synchronized to the URL
        return {
          ...values,
          expirationTime: undefined,
        };
      }}
      initialValues={{
        name: 'Ant Design Co., Ltd.',
        useMode: 'chapter',
      }}
      autoFocusFirstInput
    >
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: 'Effective after stamping',
          },
        ]}
        width="sm"
        name="useMode"
        label="Contract Agreed Effective Method"
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
        label="Contract Effective Time"
      />
      <ProFormDatePicker
        width="md"
        name="expirationTime"
        label="Contract Expiration Time"
      />
    </ProForm>
  );
};
