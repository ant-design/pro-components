import { ProFormDateMonthRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateMonthRangePicker
      name="monthRange"
      label="月份范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
