import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ city: ['beijing'] }}>
    <LightFilter.select
      name="city"
      label="城市"
      mode="multiple"
      valueEnum={{ beijing: '北京', shanghai: '上海', hangzhou: '杭州' }}
    />
  </LightFilterExample>
);
