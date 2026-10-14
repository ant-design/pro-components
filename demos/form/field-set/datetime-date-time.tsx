import { ProFormDateTimePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateTimePicker
      name="dateTime"
      label="日期时间"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
