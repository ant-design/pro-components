import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ tag: ['设计'] }}>
    <LightFilter.checkboxGroup
      name="tag"
      label="标签"
      options={['设计', '开发', '测试']}
    />
  </LightFilterExample>
);
