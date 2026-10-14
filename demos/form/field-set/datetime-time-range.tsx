import { ProFormTimePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormTimePicker.RangePicker
      name="timeRange"
      label="时间范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
