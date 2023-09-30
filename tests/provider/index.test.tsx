import { ProConfigProvider, useStyle } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { ConfigProvider } from 'antd';

afterEach(() => {
  cleanup();
});

describe('ProConfigProvider', () => {
  it('token should be correct in useStyle', () => {
    const useDemoStyle = () => {
      return useStyle('ProCardActions', (token) => {
        expect(token.colorPrimary).toBe('#ff0000');
        expect(token.colorPrimaryBg).toBe('#00ff00');
        expect(token.colorPrimaryBgHover).toBe('#0000ff');
        return [{}];
      });
    };
    const Demo = () => {
      const { wrapSSR } = useDemoStyle();
      return wrapSSR(<div />);
    };
    render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff0000',
            colorPrimaryBg: '#00ff00',
            colorPrimaryBgHover: '#0000ff',
          },
        }}
      >
        <ProConfigProvider>
          <Demo />
        </ProConfigProvider>
      </ConfigProvider>,
    );
  });
});
