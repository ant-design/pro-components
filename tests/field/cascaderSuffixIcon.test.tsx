import { LoadingOutlined } from '@ant-design/icons';
import {
  LightFilter,
  ProForm,
  ProFormCascader,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { CascaderProps } from 'antd';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const cascaderPropsSpy = vi.hoisted(() =>
  vi.fn<(props: CascaderProps<any>) => void>(),
);
const antdVersionOverride = vi.hoisted(() => ({
  value: undefined as string | undefined,
}));

vi.mock('antd', async (importActual) => {
  const ReactMod = await import('react');
  const antd = await importActual<typeof import('antd')>();
  antd.theme.defaultConfig.hashed = false;
  const ActualCascader = antd.Cascader;
  const WrappedCascader = ReactMod.forwardRef<any, any>((props, ref) => {
    cascaderPropsSpy(props);
    return ReactMod.createElement(ActualCascader as any, { ...props, ref });
  });
  for (const [key, value] of Object.entries(ActualCascader)) {
    if (key !== '$$typeof' && key !== 'render') {
      (WrappedCascader as any)[key] = value;
    }
  }
  return {
    ...antd,
    Cascader: WrappedCascader,
    get version() {
      return antdVersionOverride.value ?? antd.version;
    },
  };
});

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{ value: 'hangzhou', label: 'Hangzhou' }],
  },
];

const getLastCascaderProps = () => {
  const calls = cascaderPropsSpy.mock.calls;
  return calls[calls.length - 1]?.[0];
};

describe('#9788 Cascader idle suffixIcon omission', () => {
  beforeEach(() => {
    cascaderPropsSpy.mockClear();
  });

  afterEach(() => {
    cleanup();
    antdVersionOverride.value = undefined;
  });

  it('omits suffixIcon when idle and preserves default arrow and options', async () => {
    const { container, findByText } = render(
      <ProForm submitter={false}>
        <ProFormCascader name="area" fieldProps={{ options }} />
      </ProForm>,
    );

    expect(cascaderPropsSpy).toHaveBeenCalled();
    const lastProps = getLastCascaderProps()!;
    expect('suffixIcon' in lastProps).toBe(false);
    expect('suffix' in lastProps).toBe(false);
    expect(lastProps.options).toMatchObject(options);
    expect(container.querySelector('.ant-cascader')).toBeTruthy();
    expect(
      container.querySelector('.ant-select-suffix .anticon-down'),
    ).toBeTruthy();

    fireEvent.mouseDown(container.querySelector('.ant-select')!);
    expect(await findByText('Zhejiang')).toBeTruthy();
  });

  const expectLoadingIcon = (node: unknown) => {
    expect(React.isValidElement(node)).toBe(true);
    expect((node as React.ReactElement).type).toBe(LoadingOutlined);
  };

  it.each([
    ['6.6.7', 'suffixIcon', 'suffix'],
    ['6.7.0', 'suffix', 'suffixIcon'],
    ['7.0.0', 'suffix', 'suffixIcon'],
  ] as const)(
    'on antd %s passes the loading icon via %s while request is pending',
    async (version, usedKey, absentKey) => {
      antdVersionOverride.value = version;
      render(
        <ProForm submitter={false}>
          <ProFormCascader
            name="area"
            request={() => new Promise<any[]>(() => {})}
          />
        </ProForm>,
      );

      await waitFor(() => {
        const lastProps = getLastCascaderProps() as Record<string, unknown>;
        expectLoadingIcon(lastProps?.[usedKey]);
        expect(absentKey in lastProps).toBe(false);
      });
    },
  );

  it.each([
    ['6.6.7', 'suffixIcon', 'suffix'],
    ['6.7.0', 'suffix', 'suffixIcon'],
  ] as const)(
    'on antd %s LightFilter.cascader passes the loading icon via %s while request is pending',
    async (version, usedKey, absentKey) => {
      antdVersionOverride.value = version;
      render(
        <LightFilter>
          <LightFilter.cascader
            name="area"
            label="区域"
            initialValue={['zhejiang', 'hangzhou']}
            request={() => new Promise<any[]>(() => {})}
          />
        </LightFilter>,
      );

      await waitFor(() => {
        const lastProps = getLastCascaderProps() as Record<string, unknown>;
        expectLoadingIcon(lastProps?.[usedKey]);
        expect(absentKey in lastProps).toBe(false);
      });
    },
  );

  it('respects caller fieldProps.suffixIcon (including null) when idle and loading', async () => {
    const customIcon = <span data-testid="custom-suffix">custom</span>;

    const idleCustom = render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          fieldProps={{ options, suffixIcon: customIcon }}
        />
      </ProForm>,
    );
    expect(getLastCascaderProps()?.suffixIcon).toBe(customIcon);
    idleCustom.unmount();

    cascaderPropsSpy.mockClear();
    const idleNull = render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          fieldProps={{ options, suffixIcon: null }}
        />
      </ProForm>,
    );
    expect('suffixIcon' in getLastCascaderProps()!).toBe(true);
    expect(getLastCascaderProps()?.suffixIcon).toBeNull();
    idleNull.unmount();

    cascaderPropsSpy.mockClear();
    const pendingCustomRequest = vi.fn(() => new Promise<any[]>(() => {}));
    const loadingCustom = render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          request={pendingCustomRequest}
          fieldProps={{ suffixIcon: customIcon }}
        />
      </ProForm>,
    );
    await waitFor(() => {
      expect(pendingCustomRequest).toHaveBeenCalled();
      expect(getLastCascaderProps()?.suffixIcon).toBe(customIcon);
    });
    loadingCustom.unmount();

    cascaderPropsSpy.mockClear();
    const pendingNullRequest = vi.fn(() => new Promise<any[]>(() => {}));
    const loadingNull = render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          request={pendingNullRequest}
          fieldProps={{ suffixIcon: null }}
        />
      </ProForm>,
    );
    await waitFor(() => {
      expect(pendingNullRequest).toHaveBeenCalled();
      expect('suffixIcon' in getLastCascaderProps()!).toBe(true);
      expect(getLastCascaderProps()?.suffixIcon).toBeNull();
    });
    loadingNull.unmount();
  });

  it('omits suffixIcon when LightFilter.cascader is idle', () => {
    render(
      <LightFilter>
        <LightFilter.cascader
          name="area"
          label="区域"
          initialValue={['zhejiang', 'hangzhou']}
          fieldProps={{ options }}
        />
      </LightFilter>,
    );

    expect(cascaderPropsSpy).toHaveBeenCalled();
    expect('suffixIcon' in getLastCascaderProps()!).toBe(false);
    expect('suffix' in getLastCascaderProps()!).toBe(false);
  });
});
