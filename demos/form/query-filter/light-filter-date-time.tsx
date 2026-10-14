import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ datetime: '2024-01-15 14:30:00' }}>
    <LightFilter.dateTime name="datetime" label="日期时间" />
  </LightFilterExample>
);
