import { ProFormDateTimeRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateTimeRangePicker
      name="dateTimeRange"
      label="日期时间范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
