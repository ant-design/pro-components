import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProFormField help 显示（#9066，PR #9009 回归）', () => {
  it('📦 ProFormText 的 help 应渲染到页面上', () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="Username"
          placeholder="Please enter a name"
          extra="---extra---"
          help="---help1---"
        />
      </ProForm>,
    );

    expect(container.innerHTML).toContain('---help1---');
    expect(container.innerHTML).toContain('---extra---');
  });

  it('📦 formItemProps.help 也应生效', () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="Username"
          formItemProps={{ help: '---help2---' }}
        />
      </ProForm>,
    );

    expect(container.innerHTML).toContain('---help2---');
  });

  it('📦 help 为函数时应接收 errors/warnings 并渲染', async () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="Username"
          help={({ errors }) => (errors.length ? `错误:${errors[0]}` : '静态帮助')}
        />
      </ProForm>,
    );
    expect(container.innerHTML).toContain('静态帮助');
  });

  it('📦 ProFormSelect 的 help 同样生效', () => {
    const { container } = render(
      <ProForm>
        <ProFormSelect
          name="sel"
          label="Select"
          help="---select-help---"
          options={[{ label: 'A', value: 'a' }]}
        />
      </ProForm>,
    );
    expect(container.innerHTML).toContain('---select-help---');
  });

  it('📦 addonBefore/addonAfter 场景下 help 依然生效', () => {
    const { container } = render(
      <ProForm>
        <ProFormText
          name="name"
          label="Username"
          addonBefore="http://"
          help="---addon-help---"
        />
      </ProForm>,
    );
    expect(container.innerHTML).toContain('---addon-help---');
    expect(container.innerHTML).toContain('http://');
  });
});
