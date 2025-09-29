import { cleanup, render } from '@testing-library/react';
import { createIntl, ProConfigProvider, ProForm, ProFormMoney, useStyle } from '@xxlabs/pro-components';
import { ConfigProvider } from 'antd';
import { afterEach, describe, expect, it } from 'vitest';

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

  it('custom translations should be respected', () => {
    const { container } = render(
      <ConfigProvider>
        <ProConfigProvider
          intl={createIntl('en', {
            moneySymbol: '!?',
          })}
        >
          <ProForm>
            <ProFormMoney initialValue={44.33} name="amount" />
          </ProForm>
        </ProConfigProvider>
      </ConfigProvider>,
    );

    const input = container.querySelector('input#amount') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('!? 44.33');
  });
});
