import { ProFormTimePicker } from '@ant-design/pro-components';
import DateFieldDemo from './_DateFieldDemo';

export default () => (
  <DateFieldDemo>
    <ProFormTimePicker name="time" label="时间" rules={[{ required: true }]} />
  </DateFieldDemo>
);
