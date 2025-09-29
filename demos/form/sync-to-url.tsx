import { ProForm, ProFormDatePicker, ProFormDateRangePicker, ProFormSelect } from '@xxlabs/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      autoFocusFirstInput
      initialValues={{
        name: 'Ant Design Co., Ltd.',
        useMode: 'chapter',
      }}
      syncToUrl={(values, type) => {
        if (type === 'get') {
          // To cooperate with transform
          // startTime and endTime are combined into createTimeRanger
          return {
            ...values,
            createTimeRanger: values.startTime || values.endTime ? [values.startTime, values.endTime] : undefined,
          };
        }
        // expirationTime is not synchronized to the URL
        return {
          ...values,
          expirationTime: undefined,
        };
      }}
      onFinish={async () => {
        message.success('Submission successful');
      }}
    >
      <ProFormSelect
        label="Contract Agreed Effective Method"
        name="useMode"
        options={[
          {
            value: 'chapter',
            label: 'Effective after stamping',
          },
        ]}
        width="sm"
      />
      <ProFormDateRangePicker
        label="Contract Effective Time"
        name="createTimeRanger"
        transform={(values) => {
          return {
            startTime: values ? values[0] : undefined,
            endTime: values ? values[1] : undefined,
          };
        }}
        width="md"
      />
      <ProFormDatePicker label="Contract Expiration Time" name="expirationTime" width="md" />
    </ProForm>
  );
};
