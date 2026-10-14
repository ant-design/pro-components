import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ enabled: true }}>
    <LightFilter.switch name="enabled" label="已启用" />
  </LightFilterExample>
);
