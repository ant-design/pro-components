import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ keyword: '示例订单' }}>
    <LightFilter.input name="keyword" label="关键词" placeholder="搜索订单" />
  </LightFilterExample>
);
