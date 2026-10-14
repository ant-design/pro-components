import { ProFormDateYearRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateYearRangePicker
      name="yearRange"
      label="年份范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
