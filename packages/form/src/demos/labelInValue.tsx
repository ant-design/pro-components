import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={async () => {
        message.success('提交成功');
      }}
      onValuesChange={(v) => console.log(v)}
    >
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="sm"
        name="useMode"
        label="合同约定生效方式"
        fieldProps={{
          labelInValue: true,
        }}
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
      />
    </ProForm>
  );
};
