import { LightFilter } from '@ant-design/pro-components';

export default () => (
  <LightFilter
    collapse
    collapseLabel="筛选"
    footerRender={false}
    initialValues={{ status: 'open' }}
  >
    <LightFilter.select
      name="status"
      label="状态"
      valueEnum={{ open: '待处理', closed: '已完成' }}
    />
  </LightFilter>
);
