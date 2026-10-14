import { LightFilter } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample
    initialValues={{
      datetimeRange: [
        dayjs('2024-01-14 14:30:00').valueOf(),
        dayjs('2024-01-15 14:30:00').valueOf(),
      ],
    }}
  >
    <LightFilter.dateTimeRange name="datetimeRange" label="日期时间范围" />
  </LightFilterExample>
);
