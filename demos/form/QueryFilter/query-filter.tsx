import {
  ProForm,
  ProFormDateTimePicker,
  ProFormText,
} from '@ant-design/pro-components';

export default () => {
  return (
    <ProForm grid={true}>
      <ProForm.Group>
        <ProFormDateTimePicker
          label="下单时间"
          colProps={{ xl: 12 }}
          name="orderTime"
          required
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
        />
        <ProFormText
          disabled
          colProps={{ xl: 12 }}
          name="pay"
          label="支付方式"
        />
      </ProForm.Group>
    </ProForm>
  );
};
