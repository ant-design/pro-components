import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ score: [20, 80] }}>
    <LightFilter.slider name="score" label="评分区间" range />
  </LightFilterExample>
);
