import { ProFormDatePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormDatePicker name="date" label="日期" rules={[{ required: true }]} />
  </DateFieldDemo>
);
