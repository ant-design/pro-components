import { ProFormDateTimePicker, ProFormText, QueryFilter } from '@xxlabs/pro-components';

export default () => {
  return (
    <QueryFilter>
      <ProFormDateTimePicker required colProps={{ xl: 12 }} label="下单时间" name="orderTime" />
      <ProFormText disabled colProps={{ xl: 12 }} label="支付方式" name="pay" />
    </QueryFilter>
  );
};
