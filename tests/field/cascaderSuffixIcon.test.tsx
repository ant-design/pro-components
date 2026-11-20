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
    expect(lastProps.options).toMatchObject(options);
    expect(container.querySelector('.ant-cascader')).toBeTruthy();
    expect(
      container.querySelector('.ant-select-suffix .anticon-down'),
    ).toBeTruthy();

    fireEvent.mouseDown(container.querySelector('.ant-select')!);
    expect(await findByText('Zhejiang')).toBeTruthy();
  });

  it('passes LoadingOutlined suffixIcon while request is pending', async () => {
    render(
      <ProForm submitter={false}>
        <ProFormCascader
          name="area"
          request={() => new Promise<any[]>(() => {})}
        />
      </ProForm>,
    );

    await waitFor(() => {
      const lastProps = getLastCascaderProps();
      expect(React.isValidElement(lastProps?.suffixIcon)).toBe(true);
      expect((lastProps?.suffixIcon as React.ReactElement).type).toBe(
        LoadingOutlined,
      );
    });
  });

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
  });
});
