import { ProFormDatePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDatePicker.Year
      name="year"
      label="年份"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
