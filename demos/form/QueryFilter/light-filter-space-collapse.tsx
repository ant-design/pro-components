import {
  LightFilter,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Space } from 'antd';

interface LightFilterSpaceCollapseValues {
  type?: string;
  type2?: string;
  value?: string;
  value2?: string;
}

const handleFinish = async (values: LightFilterSpaceCollapseValues) => {
  console.log('筛选提交:', values);
};

/**
 * 折叠模式下，Space 和 Space.Compact 包裹的字段会整体放入「更多筛选」弹层。
 */
const LightFilterSpaceCollapseDemo = () => (
  <LightFilter
    initialValues={{
      type: 'username',
      type2: 'fullName',
    }}
    variant="outlined"
    collapse
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

const LightFilterSpaceCollapsePage = () => (
  <div style={{ padding: 24 }}>
    <LightFilterSpaceCollapseDemo />
  </div>
);

export default LightFilterSpaceCollapsePage;
