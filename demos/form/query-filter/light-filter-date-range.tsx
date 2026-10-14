import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample
    initialValues={{ dateRange: ['2024-01-15', '2024-01-22'] }}
  >
    <LightFilter.dateRange name="dateRange" label="日期范围" />
  </LightFilterExample>
);
