import {
  ProConfigProvider,
  ProForm,
  ProFormMoney,
  ProProvider,
  createIntl,
  useStyle,
  zhTWIntl,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveProConfigHashed } from '../../src/provider';

afterEach(() => {
  cleanup();
});

describe('ProConfigProvider', () => {
  it('keeps a parent prefix when a nested provider adds value types', () => {
    const prefixes: string[] = [];
    const ReadPrefix = () => {
      const { token } = useContext(ProProvider);
      prefixes.push(token.proComponentsCls);
      return null;
    };

    render(
      <ProConfigProvider prefixCls="custom-pro">
        <ReadPrefix />
        <ProConfigProvider needDeps valueTypeMap={{}}>
          <ReadPrefix />
        </ProConfigProvider>
      </ProConfigProvider>,
    );

    expect(prefixes).toEqual(['.custom-pro', '.custom-pro']);
  });

  it('does not mutate the token exposed through context', () => {
    const ReadStyle = () => {
      const { token } = useContext(ProProvider);
      Object.freeze(token);
      useStyle('FrozenProviderToken', () => []);
      return null;
    };

    expect(() =>
      render(
        <ProConfigProvider>
          <ReadStyle />
        </ProConfigProvider>,
      ),
    ).not.toThrow();
  });

  it('🐛 #8473 preserves the parent ConfigProvider hashed setting', () => {
    expect(resolveProConfigHashed(undefined, undefined, '', true)).toBe(false);
    expect(
      resolveProConfigHashed(undefined, undefined, 'css-parent', true),
    ).toBe(true);
    expect(resolveProConfigHashed(false, undefined, 'css-parent', true)).toBe(
      false,
    );
  });

  it('token should be correct in useStyle', () => {
    const useDemoStyle = () => {
      return useStyle('ProCardActions', (token) => {
        expect(token.colorPrimary).toBe('var(--ant-color-primary)');
        expect(token.colorPrimaryBg).toBe('var(--ant-color-primary-bg)');
        expect(token.colorPrimaryBgHover).toBe(
          'var(--ant-color-primary-bg-hover)',
        );
        return [{}];
      });
    };
    const Demo = () => {
      const { token } = useContext(ProProvider);
      expect(token.colorPrimary).toBe('#ff0000');
      expect(token.colorPrimaryBg).toBe('#00ff00');
      expect(token.colorPrimaryBgHover).toBe('#0000ff');
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

  it('keeps explicit Pro token overrides ahead of antd CSS variables', () => {
    const Demo = () => {
      useStyle('ProTokenOverride', (token) => {
        expect(token.colorPrimary).toBe('#123456');
        expect(token.colorBgContainer).toBe('#654321');
        return [];
      });
      return null;
    };
    render(
      <ConfigProvider>
        <ProConfigProvider
          token={{ colorPrimary: '#123456', colorBgContainer: '#654321' }}
        >
          <Demo />
        </ProConfigProvider>
      </ConfigProvider>,
    );
  });

  it('normalizes a runtime cssVar false without creating an empty prefix', () => {
    const tokens: string[] = [];
    const Demo = () => {
      useStyle('CssVarFalse', (token) => {
        tokens.push(String(token.colorPrimary));
        expect(token.calc?.(token.padding).add(4).equal({ unit: true })).toBe(
          'calc(var(--ant-padding) + 4px)',
        );
        return [];
      });
      return null;
    };
    render(
      <ConfigProvider theme={{ cssVar: false } as any}>
        <ProConfigProvider>
          <Demo />
        </ProConfigProvider>
      </ConfigProvider>,
    );
    expect(tokens).toEqual(['var(--ant-color-primary)']);
  });

  it('uses the default ant prefix for calculations with cssVar enabled', () => {
    const Demo = () => {
      useStyle('CssVarDefaultPrefix', (token) => {
        expect(token.calc?.(token.padding).add(4).equal({ unit: true })).toBe(
          'calc(var(--ant-padding) + 4px)',
        );
        return [];
      });
      return null;
    };
    render(
      <ConfigProvider theme={{ cssVar: {} }}>
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

    const input = container.querySelector(
      'input[id$="_amount"]',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('!? 44.33');
  });

  it('uses Traditional Chinese glyphs for line actions', () => {
    expect(zhTWIntl.getMessage('deleteThisLine', '')).toBe('刪除此項');
    expect(zhTWIntl.getMessage('copyThisLine', '')).toBe('複製此項');
  });
});
