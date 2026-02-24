import {
  LightFilter,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Space } from 'antd';

interface LightFilterSpaceValues {
  type?: string;
  type2?: string;
  value?: string;
  value2?: string;
}

const handleFinish = async (values: LightFilterSpaceValues) => {
  console.log('筛选提交:', values);
};

/**
 * LightFilter 支持 Space 和 Space.Compact 包裹的字段，
 * 可将多个筛选项组合在同一行展示，常用于搜索类型+关键词等场景。
 */
const LightFilterSpaceDemo = () => (
  <LightFilter
    initialValues={{
      type: 'username',
      type2: 'fullName',
    }}
    variant="borderless"
    onFinish={handleFinish}
  >
    <Space.Compact>
      <ProFormSelect
        name="type"
        options={[
          { value: 'username', label: '用户名' },
          { value: 'fullName', label: '姓名' },
          { value: 'email', label: '邮箱' },
        ]}
      />
      <ProFormText name="value" placeholder="请输入" />
    </Space.Compact>
    <Space>
      <ProFormSelect
        name="type2"
        options={[
          { value: 'username', label: '用户名' },
          { value: 'fullName', label: '姓名' },
          { value: 'email', label: '邮箱' },
        ]}
      />
      <ProFormText name="value2" placeholder="请输入" />
    </Space>
  </LightFilter>
);

const LightFilterSpacePage = () => (
  <div style={{ padding: 24 }}>
    <LightFilterSpaceDemo />
  </div>
);

export default LightFilterSpacePage;
