import { LightFilter } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample
    initialValues={{
      timeRange: [
        dayjs('2024-01-15 13:30:00').valueOf(),
        dayjs('2024-01-15 14:30:00').valueOf(),
      ],
    }}
  >
    <LightFilter.timePickerRange name="timeRange" label="时间范围" />
  </LightFilterExample>
);
