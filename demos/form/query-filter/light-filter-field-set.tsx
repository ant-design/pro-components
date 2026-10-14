import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ person: ['张', '三'] }}>
    <LightFilter.fieldSet name="person" label="姓名">
      <LightFilter.input placeholder="姓" />
      <LightFilter.input placeholder="名" />
    </LightFilter.fieldSet>
  </LightFilterExample>
);
