import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Skeleton } from 'antd';

export default () => (
  <div style={{ padding: 24 }}>
    <ProForm
      request={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { name: 'pro components' };
      }}
      loadingRender={<Skeleton paragraph={{ rows: 4 }} />}
    >
      <ProFormText
        name="name"
        label="Name"
        placeholder="Please enter your name"
      />
    </ProForm>
  </div>
);
