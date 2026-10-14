import { ProFormDatePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDatePicker.Week
      name="week"
      label="周"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
