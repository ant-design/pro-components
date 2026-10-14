import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ score: 50 }}>
    <LightFilter.slider name="score" label="评分" />
  </LightFilterExample>
);
