import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProForm onFinish={async (e) => console.log(e)}>
      <ProFormText name="name" label="姓名" />

      <ProFormList
        name="labels"
        label="用户信息"
        initialValue={[
          {
            value: '333',
            label: '333',
          },
        ]}
        copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此行到末尾' }}
        deleteIconProps={{
          Icon: CloseCircleOutlined,
          tooltipText: '不需要这行了',
        }}
      >
        <ProFormGroup key="group">
          <ProFormText name="value" label="值" />
          <ProFormText name="label" label="显示名称" />
        </ProFormGroup>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
