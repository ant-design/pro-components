import { LightFilter } from '@ant-design/pro-components';
import LightFilterExample from './light-filter-examples/_LightFilterExample';

export default () => (
  <LightFilterExample initialValues={{ team: 'frontend' }}>
    <LightFilter.treeSelect
      name="team"
      label="团队"
      fieldProps={{
        treeData: [
          {
            title: '研发部',
            value: 'dev',
            children: [{ title: '前端组', value: 'frontend' }],
          },
        ],
      }}
    />
  </LightFilterExample>
);
