import { ProFormDatePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDatePicker.Quarter
      name="quarter"
      label="季度"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
