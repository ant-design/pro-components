import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ date: '2024-01-15' }}>
    <LightFilter.date name="date" label="日期" />
  </LightFilterExample>
);
