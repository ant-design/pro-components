import { ProFormDatePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDatePicker.Month
      name="month"
      label="月份"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
