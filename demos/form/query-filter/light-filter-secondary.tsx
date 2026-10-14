import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ status: 'open', owner: '张三' }}>
    <LightFilter.select
      name="status"
      label="状态"
      valueEnum={{ open: '待处理', closed: '已完成' }}
    />
    <LightFilter.input name="owner" label="负责人" secondary />
  </LightFilterExample>
);
