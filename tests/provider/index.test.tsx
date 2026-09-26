import {
  ProConfigProvider,
  ProForm,
  ProFormMoney,
  createIntl,
  useStyle,
  zhTWIntl,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveProConfigHashed } from '../../src/provider';

afterEach(() => {
  cleanup();
});

describe('ProConfigProvider', () => {
  it('🐛 #8473 preserves the parent ConfigProvider hashed setting', () => {
    expect(resolveProConfigHashed(undefined, undefined, '', true)).toBe(false);
    expect(resolveProConfigHashed(undefined, undefined, 'css-parent', true)).toBe(
      true,
    );
    expect(resolveProConfigHashed(false, undefined, 'css-parent', true)).toBe(
      false,
    );
  });

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
            <ProFormMoney name="amount" initialValue={44.33} />
          </ProForm>
        </ProConfigProvider>
      </ConfigProvider>,
    );

    const input = container.querySelector('input[id$="_amount"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('!? 44.33');
  });

  it('uses Traditional Chinese glyphs for line actions', () => {
    expect(zhTWIntl.getMessage('deleteThisLine', '')).toBe('刪除此項');
    expect(zhTWIntl.getMessage('copyThisLine', '')).toBe('複製此項');
  });
});
