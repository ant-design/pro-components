import { LoginFormPage, ProFormText } from '@ant-design/pro-components';

export default () => (
  <div style={{ height: 720 }}>
    <LoginFormPage
      title="视频背景"
      subTitle="backgroundVideoUrl"
      backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
    >
      <ProFormText name="username" placeholder="账号" />
      <ProFormText.Password name="password" placeholder="密码" />
    </LoginFormPage>
  </div>
);
