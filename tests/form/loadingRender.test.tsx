import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProForm loadingRender（#9679）', () => {
  const pendingRequest = async () => new Promise(() => {});

  it('📦 默认在 request loading 期间渲染 Spin', () => {
    const { container } = render(
      <ProForm request={pendingRequest}>
        <ProFormText name="name" />
      </ProForm>,
    );
    expect(container.querySelector('.ant-spin')).toBeTruthy();
  });

  it('📦 loadingRender 传入节点时替换默认 Spin', () => {
    const { container } = render(
      <ProForm request={pendingRequest} loadingRender={<Skeleton />}>
        <ProFormText name="name" />
      </ProForm>,
    );
    expect(container.querySelector('.ant-skeleton')).toBeTruthy();
    expect(container.querySelector('.ant-spin')).toBeFalsy();
  });

  it('📦 loadingRender 支持函数形式', () => {
    const { container } = render(
      <ProForm
        request={pendingRequest}
        loadingRender={() => <div data-testid="custom-loading">loading…</div>}
      >
        <ProFormText name="name" />
      </ProForm>,
    );
    expect(container.querySelector('[data-testid="custom-loading"]')).toBeTruthy();
    expect(container.querySelector('.ant-spin')).toBeFalsy();
  });

  it('📦 request 完成后正常渲染表单内容', async () => {
    const { container } = render(
      <ProForm request={async () => ({ name: 'pro' })} loadingRender={<Skeleton />}>
        <ProFormText name="name" />
      </ProForm>,
    );
    await waitFor(() => {
      expect(container.querySelector('input[id$="_name"]')).toBeTruthy();
    });
    expect(container.querySelector('.ant-skeleton')).toBeFalsy();
  });
});
