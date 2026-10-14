import { ProForm, ProFormTimePicker } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: ['05:00:00', '11:00:00'] }}
  >
    <ProFormTimePicker.RangePicker name="value" label="时间区间" />
  </ProForm>
);
