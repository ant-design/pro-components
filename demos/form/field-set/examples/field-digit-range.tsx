import { ProForm, ProFormDigitRange } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ range: [2, 4] }}>
    <ProFormDigitRange
      name="range"
      label="价格区间"
      separator="-"
      placeholder={['最小', '最大']}
    />
  </ProForm>
);
