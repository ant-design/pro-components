import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

const collectInputIds = (root: HTMLElement | Document = document) =>
  Array.from(root.querySelectorAll('input'))
    .map((input) => input.getAttribute('id'))
    .filter(Boolean) as string[];

describe('同名 ProFormText 重复 id（#9144）', () => {
  it('📦 两个独立 ProForm 中同名字段的 input id 不应重复', () => {
    const { container } = render(
      <div>
        <ProForm>
          <ProFormText name="alipay_username" label="用户名" />
        </ProForm>
        <ProForm>
          <ProFormText name="alipay_username" label="用户名" />
        </ProForm>
      </div>,
    );

    const ids = collectInputIds(container);
    expect(ids.length).toBe(2);
    expect(new Set(ids).size).toBe(2);
  });

  it('📦 不同字段名的 id 互不相同', () => {
    const { container } = render(
      <ProForm>
        <ProFormText name="alipay_username" label="用户名" />
        <ProFormText name="alipay_account" label="账号" />
      </ProForm>,
    );

    const ids = collectInputIds(container);
    expect(ids.length).toBe(2);
    expect(new Set(ids).size).toBe(2);
  });

  it('📦 label 的 htmlFor 与对应 input id 匹配', () => {
    const { container } = render(
      <ProForm>
        <ProFormText name="alipay_username" label="用户名" />
      </ProForm>,
    );

    const input = container.querySelector('input.ant-input');
    const label = container.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.id);
  });

  it('📦 用户显式传入 Form name 时以其为准生成 id', () => {
    const { container } = render(
      <ProForm name="my-form">
        <ProFormText name="field" label="A" />
      </ProForm>,
    );
    const input = container.querySelector('input.ant-input');
    // 显式 name 时 antd 使用 `${formName}_${fieldName}` 生成 id
    expect(input?.id).toBe('my-form_field');
  });

  it('📦 并排渲染的两个 ModalForm（如同时打开的场景）id 不重复', () => {
    render(
      <div>
        <ModalForm open name="modal-a">
          <ProFormText name="title" label="标题" />
        </ModalForm>
        <ModalForm open name="modal-b">
          <ProFormText name="title" label="标题" />
        </ModalForm>
      </div>,
    );

    // Modal 渲染到 body 下的 portal 中
    const ids = collectInputIds(document);
    expect(ids.length).toBe(2);
    expect(new Set(ids).size).toBe(2);
  });
});
