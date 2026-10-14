import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ region: ['zhejiang', 'hangzhou'] }}>
    <LightFilter.cascader
      name="region"
      label="区域"
      fieldProps={{
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [{ label: '杭州', value: 'hangzhou' }],
          },
        ],
      }}
    />
  </LightFilterExample>
);
