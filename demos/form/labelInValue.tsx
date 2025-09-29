import { ProForm, ProFormSelect } from '@xxlabs/pro-components';
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
        fieldProps={{
          labelInValue: true,
        }}
        label="合同约定生效方式"
        name="useMode"
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
        width="sm"
      />
    </ProForm>
  );
};
