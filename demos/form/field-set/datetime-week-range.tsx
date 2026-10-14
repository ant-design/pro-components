import { ProFormDateWeekRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateWeekRangePicker
      name="weekRange"
      label="周范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
