import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ minimum: 10 }}>
    <LightFilter.digit name="minimum" label="最低数量" min={0} max={100} />
  </LightFilterExample>
);
