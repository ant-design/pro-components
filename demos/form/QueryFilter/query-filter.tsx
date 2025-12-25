import {
  ProFormDateTimePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <QueryFilter>
      <ProFormDateTimePicker
        label="下单时间"
        colProps={{ xl: 12 }}
        name="orderTime"
        required
      />
      <ProFormText disabled colProps={{ xl: 12 }} name="pay" label="支付方式" />
    </QueryFilter>
  
    </div>
  );
};
