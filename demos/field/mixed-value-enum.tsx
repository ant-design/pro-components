import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ status: 0 }}>
    <ProFormSelect
      name="status"
      label="数字与字符串枚举"
      valueEnum={
        new Map<string | number, React.ReactNode>([
          [0, '未开始'],
          ['1', '进行中'],
          [2, '已完成'],
        ])
      }
    />
  </ProForm>
);
