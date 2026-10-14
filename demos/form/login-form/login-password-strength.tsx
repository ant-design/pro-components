import { LoginForm, ProFormText } from '@ant-design/pro-components';

export default () => (
  <div style={{ maxWidth: 440, margin: 'auto' }}>
    <LoginForm
      title="密码强度"
      contentStyle={{ width: '100%', minWidth: 0, maxWidth: 328 }}
    >
      <ProFormText.Password
        name="password"
        placeholder="输入至少 8 位密码"
        fieldProps={{
          statusRender: (value) => {
            if (!value) return null;
            return (
              <span>
                强度：
                {value.length >= 12 ? '强' : value.length >= 8 ? '中' : '弱'}
              </span>
            );
          },
        }}
      />
    </LoginForm>
  </div>
);
