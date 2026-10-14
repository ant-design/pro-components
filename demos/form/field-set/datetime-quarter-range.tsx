import { ProFormDateQuarterRangePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDateQuarterRangePicker
      name="quarterRange"
      label="季度范围"
      rules={[{ required: true }]}
    />
  </DateFieldDemo>
);
