import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ time: '14:30:00' }}>
    <LightFilter.time name="time" label="时间" />
  </LightFilterExample>
);
