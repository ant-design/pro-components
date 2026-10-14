import { ProFormDateRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateRangePicker
      name="dateRange"
      label="日期范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
